from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Literal, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ----- Server-authoritative product catalog (prices in NPR) -----
CATALOG = {
    "gift-large": {"name": "Gift Box — Large", "price": 1199},
    "gift-small": {"name": "Gift Box — Small", "price": 699},
    "family-1kg": {"name": "Family Pack — 1kg", "price": 999},
    "regular-500": {"name": "Regular Pack — 500gm", "price": 499},
}
DELIVERY_FEE = {"valley": 0, "outside": 150}
PHONE = "9779849453348"


# ----- Models -----
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class CartItem(BaseModel):
    id: str
    qty: int = Field(ge=1, le=99)


class Customer(BaseModel):
    name: str
    phone: str
    address: str


class OrderCreate(BaseModel):
    items: List[CartItem]
    customer: Customer
    zone: Literal["valley", "outside"]
    payment_method: Literal["cod", "esewa", "khalti", "bank_transfer", "fonepay_qr"]
    note: Optional[str] = ""


# ----- Routes -----
@api_router.get("/")
async def root():
    return {"message": "Mithila.Foods API"}


@api_router.get("/catalog")
async def catalog():
    return CATALOG


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for c in rows:
        if isinstance(c.get('timestamp'), str):
            c['timestamp'] = datetime.fromisoformat(c['timestamp'])
    return rows


def _online_gateway_ready(method: str) -> bool:
    """Live gateway keys are wired later by the owner via env vars."""
    if method == "esewa":
        return bool(os.environ.get("ESEWA_SECRET_KEY") and os.environ.get("ESEWA_PRODUCT_CODE"))
    if method == "khalti":
        return bool(os.environ.get("KHALTI_SECRET_KEY"))
    return False


@api_router.post("/orders")
async def create_order(payload: OrderCreate):
    if not payload.items:
        raise HTTPException(400, "Cart is empty")

    line_items = []
    subtotal = 0
    for it in payload.items:
        prod = CATALOG.get(it.id)
        if not prod:
            raise HTTPException(400, f"Unknown product: {it.id}")
        line_total = prod["price"] * it.qty
        subtotal += line_total
        line_items.append({
            "id": it.id, "name": prod["name"], "price": prod["price"],
            "qty": it.qty, "line_total": line_total,
        })

    delivery_fee = DELIVERY_FEE[payload.zone]
    total = subtotal + delivery_fee

    method = payload.payment_method
    if method == "cod":
        status, payment_status = "confirmed", "cod_pending"
    elif method == "bank_transfer":
        status, payment_status = "pending", "awaiting_bank_transfer"
    else:  # esewa / khalti / fonepay_qr — online
        if _online_gateway_ready(method):
            status, payment_status = "pending", "awaiting_payment"
        else:
            status, payment_status = "pending", "awaiting_gateway"

    order_id = f"MF-{uuid.uuid4().hex[:8].upper()}"
    order = {
        "id": order_id,
        "items": line_items,
        "customer": payload.customer.model_dump(),
        "zone": payload.zone,
        "payment_method": method,
        "note": payload.note or "",
        "subtotal": subtotal,
        "delivery_fee": delivery_fee,
        "total": total,
        "status": status,
        "payment_status": payment_status,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.orders.insert_one(dict(order))
    return order


@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(404, "Order not found")
    return order


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

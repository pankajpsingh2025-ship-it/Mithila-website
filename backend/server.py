from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Literal, Optional
import uuid
from datetime import datetime, timezone, timedelta

EMERGENT_SESSION_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"


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


class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    email: str
    name: str = ""
    picture: str = ""


# ----- Auth helpers -----
def _get_session_token(request: Request) -> Optional[str]:
    token = request.cookies.get("session_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth.split(" ", 1)[1].strip()
    return token or None


async def get_current_user_optional(request: Request) -> Optional[dict]:
    token = _get_session_token(request)
    if not token:
        return None
    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        return None
    expires_at = session.get("expires_at")
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at is not None and expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at is not None and expires_at < datetime.now(timezone.utc):
        return None
    return await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})


async def require_user(request: Request) -> dict:
    user = await get_current_user_optional(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user


# ----- Routes -----
@api_router.get("/")
async def root():
    return {"message": "Mithila.Foods API"}


# ----- Auth routes (Emergent managed Google OAuth) -----
@api_router.post("/auth/session")
async def auth_session(request: Request, response: Response):
    session_id = request.headers.get("X-Session-ID")
    if not session_id:
        try:
            body = await request.json()
            session_id = body.get("session_id")
        except Exception:
            session_id = None
    if not session_id:
        raise HTTPException(status_code=400, detail="Missing session_id")

    async with httpx.AsyncClient(timeout=15) as http:
        r = await http.get(EMERGENT_SESSION_URL, headers={"X-Session-ID": session_id})
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    data = r.json()

    email = data.get("email")
    if not email:
        raise HTTPException(status_code=401, detail="No email in session data")

    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one(
            {"email": email},
            {"$set": {"name": data.get("name", existing.get("name", "")),
                      "picture": data.get("picture", existing.get("picture", ""))}},
        )
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id,
            "email": email,
            "name": data.get("name", ""),
            "picture": data.get("picture", ""),
            "created_at": datetime.now(timezone.utc).isoformat(),
        })

    session_token = data["session_token"]
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at.isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    response.set_cookie(
        key="session_token", value=session_token,
        httponly=True, secure=True, samesite="none", path="/",
        max_age=7 * 24 * 3600,
    )
    user = await db.users.find_one({"user_id": user_id}, {"_id": 0})
    return user


@api_router.get("/auth/me")
async def auth_me(request: Request):
    user = await get_current_user_optional(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user


@api_router.post("/auth/logout")
async def auth_logout(request: Request, response: Response):
    token = _get_session_token(request)
    if token:
        await db.user_sessions.delete_one({"session_token": token})
    response.delete_cookie("session_token", path="/")
    return {"ok": True}


@api_router.get("/my/orders")
async def my_orders(request: Request):
    user = await require_user(request)
    rows = await db.orders.find({"user_id": user["user_id"]}, {"_id": 0}).to_list(500)
    rows.sort(key=lambda o: o.get("created_at", ""), reverse=True)
    return rows


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
async def create_order(payload: OrderCreate, request: Request):
    if not payload.items:
        raise HTTPException(400, "Cart is empty")

    current_user = await get_current_user_optional(request)

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
        "user_id": current_user["user_id"] if current_user else None,
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


class NewsletterSignup(BaseModel):
    email: str
    source: Optional[str] = "footer"


@api_router.post("/newsletter")
async def newsletter_signup(payload: NewsletterSignup):
    email = payload.email.strip().lower()
    if "@" not in email or "." not in email.split("@")[-1] or len(email) > 254:
        raise HTTPException(400, "Please enter a valid email address")
    now = datetime.now(timezone.utc).isoformat()
    await db.newsletter_subscribers.update_one(
        {"email": email},
        {"$set": {"email": email, "source": payload.source, "updated_at": now},
         "$setOnInsert": {"created_at": now}},
        upsert=True,
    )
    return {"ok": True}


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

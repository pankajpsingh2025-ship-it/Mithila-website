import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { getOrder } from "../lib/api";
import { wa } from "../lib/site";

const STATUS_COPY = {
  cod_pending: { t: "Order confirmed — Cash on Delivery", d: "We'll hand-pack your khajuri and deliver it. Pay in cash when it arrives." },
  awaiting_bank_transfer: { t: "Order placed — Bank Transfer", d: "Send us the transfer using your order number as reference, then message us the details on WhatsApp." },
  awaiting_gateway: { t: "Order recorded", d: "Online payment (eSewa/Khalti) is being connected. We'll confirm your order with you directly on WhatsApp." },
  awaiting_payment: { t: "Order placed", d: "Complete your online payment to confirm the order." },
};

export default function OrderResult() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    getOrder(id).then(setOrder).catch(() => setErr("Order not found.")).finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div className="min-h-screen grid place-items-center bg-creamlight"><Loader2 className="h-8 w-8 animate-spin text-golddeep" /></div>;

  if (err || !order)
    return (
      <div className="min-h-screen grid place-items-center bg-creamlight px-6 text-center">
        <div>
          <p className="text-ink/70">{err || "Order not found."}</p>
          <Link to="/" className="mt-4 inline-block rounded-full bg-heritage px-6 py-3 text-sm text-paper">Back home</Link>
        </div>
      </div>
    );

  const copy = STATUS_COPY[order.payment_status] || STATUS_COPY.awaiting_gateway;
  const waLink = wa(`Hi! I'd like to confirm my order ${order.id} (total NPR ${order.total}).`);

  return (
    <div className="min-h-screen bg-creamlight pt-28 pb-24 px-5 sm:px-8" data-testid="order-result-page">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl bg-paper p-8 sm:p-10 ring-1 ring-maroon/10 shadow-[0_30px_70px_-32px_rgba(74,31,13,0.4)]">
          <CheckCircle2 className="h-12 w-12 text-heritage" />
          <h1 className="mt-4 font-heading text-3xl text-maroon" data-testid="order-status-title">{copy.t}</h1>
          <p className="mt-2 text-ink/70">{copy.d}</p>
          <p className="mt-4 text-sm text-ink/60">Order number: <span className="font-medium text-maroon" data-testid="order-id">{order.id}</span></p>

          <div className="mt-6 border-t border-maroon/10 pt-6 space-y-3">
            {order.items.map((it) => (
              <div key={it.id} className="flex justify-between text-sm">
                <span className="text-ink/75">{it.name} × {it.qty}</span>
                <span className="text-ink/60">NPR {it.line_total}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm pt-2 border-t border-maroon/10"><span className="text-ink/60">Delivery</span><span className="text-ink/60">{order.delivery_fee === 0 ? "Free" : `NPR ${order.delivery_fee}`}</span></div>
            <div className="flex justify-between font-heading text-lg text-maroon"><span>Total</span><span data-testid="order-total">NPR {order.total}</span></div>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-heritage px-6 py-3.5 text-sm font-medium text-paper hover:bg-maroon"
            data-testid="order-whatsapp-btn"
          >
            <MessageCircle className="h-4 w-4" /> Confirm on WhatsApp
          </a>
          <Link to="/" className="ml-3 text-sm text-maroon hover:text-golddeep">Continue shopping</Link>
        </div>
      </div>
    </div>
  );
}

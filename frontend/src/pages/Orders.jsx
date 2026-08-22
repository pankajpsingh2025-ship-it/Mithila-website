import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LogIn, PackageOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getMyOrders } from "../lib/api";

const STATUS_LABEL = {
  confirmed: "Confirmed",
  pending: "Pending",
};
const PAY_LABEL = {
  cod_pending: "Cash on Delivery",
  awaiting_bank_transfer: "Bank transfer — awaiting",
  awaiting_gateway: "Online — to be confirmed",
  awaiting_payment: "Awaiting payment",
  paid: "Paid",
};

export default function Orders() {
  const { user, loading, login } = useAuth();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!user) { setOrders([]); return; }
    getMyOrders().then(setOrders).catch(() => setOrders([]));
  }, [user, loading]);

  return (
    <div className="min-h-screen bg-creamlight pt-28 pb-24 px-5 sm:px-8" data-testid="orders-page">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-maroon hover:text-golddeep mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>
        <h1 className="font-heading text-maroon text-[clamp(2rem,5vw,3.2rem)] font-light mb-10">My orders</h1>

        {loading ? (
          <div className="rounded-3xl bg-paper p-10 text-center ring-1 ring-maroon/10 text-ink/60">Loading…</div>
        ) : !user ? (
          <div className="rounded-3xl bg-paper p-10 text-center ring-1 ring-maroon/10" data-testid="orders-signin-prompt">
            <p className="text-ink/70 mb-5">Sign in to see your order history.</p>
            <button onClick={login} className="inline-flex items-center gap-2 rounded-full bg-heritage px-6 py-3 text-sm text-paper hover:bg-maroon transition-colors" data-testid="orders-signin-btn">
              <LogIn className="h-4 w-4" /> Sign in with Google
            </button>
          </div>
        ) : orders === null ? (
          <div className="rounded-3xl bg-paper p-10 text-center ring-1 ring-maroon/10 text-ink/60">Loading your orders…</div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl bg-paper p-10 text-center ring-1 ring-maroon/10" data-testid="orders-empty">
            <PackageOpen className="h-10 w-10 mx-auto text-maroon/40 mb-3" />
            <p className="text-ink/70">No orders yet.</p>
            <Link to="/#shop" className="mt-4 inline-block rounded-full bg-heritage px-6 py-3 text-sm text-paper">Browse khajuri</Link>
          </div>
        ) : (
          <div className="space-y-5" data-testid="orders-list">
            {orders.map((o) => (
              <div key={o.id} className="rounded-3xl bg-paper p-6 ring-1 ring-maroon/10" data-testid={`order-row-${o.id}`}>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-maroon/10 pb-4">
                  <div>
                    <p className="font-heading text-lg text-maroon">{o.id}</p>
                    <p className="text-xs text-ink/50">{o.created_at ? new Date(o.created_at).toLocaleString() : ""}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] uppercase tracking-widest text-ink/45">Total</span>
                    <span className="font-heading text-xl text-golddeep">NPR {o.total}</span>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5">
                  {o.items.map((it) => (
                    <div key={it.id} className="flex justify-between text-sm text-ink/70">
                      <span>{it.name} × {it.qty}</span>
                      <span>NPR {it.line_total}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-full bg-heritage/10 text-heritage px-3 py-1">{STATUS_LABEL[o.status] || o.status}</span>
                  <span className="rounded-full bg-gold/15 text-golddeep px-3 py-1">{PAY_LABEL[o.payment_status] || o.payment_status}</span>
                  <span className="rounded-full bg-maroon/10 text-maroon px-3 py-1">{o.zone === "valley" ? "Inside Valley" : "Outside Valley"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

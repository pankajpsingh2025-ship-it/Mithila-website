import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../lib/api";
import { IMG } from "../lib/site";

const PAYMENTS = [
  { id: "cod", label: "Cash on Delivery", note: "Pay at your door" },
  { id: "esewa", label: "eSewa", note: "Online wallet" },
  { id: "khalti", label: "Khalti", note: "Online wallet" },
  { id: "bank_transfer", label: "Bank Transfer", note: "Manual confirmation" },
  { id: "fonepay_qr", label: "QR Code / Fonepay", note: "Scan & pay" },
];

export default function Checkout() {
  const { items, subtotal, setQty, removeItem, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [zone, setZone] = useState("valley");
  const [method, setMethod] = useState("cod");
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (user?.name) setForm((f) => (f.name ? f : { ...f, name: user.name }));
  }, [user]);

  const deliveryFee = zone === "valley" ? 0 : 150;
  const total = subtotal + deliveryFee;

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!items.length) { setErr("Your cart is empty."); return; }
    if (!form.name || !form.phone || !form.address) { setErr("Please fill in name, phone and address."); return; }
    setBusy(true);
    try {
      const order = await createOrder({
        items: items.map((i) => ({ id: i.id, qty: i.qty })),
        customer: { name: form.name, phone: form.phone, address: form.address },
        zone,
        payment_method: method,
        note: form.note,
      });
      clear();
      navigate(`/order/${order.id}`);
    } catch (e2) {
      setErr("Something went wrong placing your order. Please try again.");
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-creamlight pt-28 pb-24 px-5 sm:px-8" data-testid="checkout-page">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-maroon hover:text-golddeep mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>
        <h1 className="font-heading text-maroon text-[clamp(2rem,5vw,3.2rem)] font-light mb-10">Checkout</h1>

        {items.length === 0 ? (
          <div className="rounded-3xl bg-paper p-10 text-center ring-1 ring-maroon/10">
            <p className="text-ink/70">Your cart is empty.</p>
            <Link to="/" className="mt-4 inline-block rounded-full bg-heritage px-6 py-3 text-sm text-paper">Browse products</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="grid lg:grid-cols-5 gap-8">
            {/* details */}
            <div className="lg:col-span-3 space-y-8">
              <section className="rounded-3xl bg-paper p-6 sm:p-8 ring-1 ring-maroon/10">
                <h2 className="font-heading text-xl text-maroon mb-5">Delivery details</h2>
                <div className="space-y-4">
                  {[
                    { k: "name", ph: "Full name", type: "text" },
                    { k: "phone", ph: "Phone number (98XXXXXXXX)", type: "tel" },
                  ].map((f) => (
                    <input
                      key={f.k}
                      type={f.type}
                      placeholder={f.ph}
                      value={form[f.k]}
                      onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                      className="w-full rounded-xl border border-maroon/20 bg-creamlight px-4 py-3 text-sm outline-none focus:border-gold"
                      data-testid={`checkout-${f.k}`}
                    />
                  ))}
                  <textarea
                    placeholder="Full delivery address (tole, landmark, city)"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    rows={3}
                    className="w-full rounded-xl border border-maroon/20 bg-creamlight px-4 py-3 text-sm outline-none focus:border-gold"
                    data-testid="checkout-address"
                  />
                </div>

                <h3 className="font-heading text-lg text-maroon mt-7 mb-3">Delivery zone</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "valley", t: "Inside Kathmandu Valley", d: "Free • within 24h" },
                    { id: "outside", t: "Outside Valley", d: "NPR 150 • 1–3 days" },
                  ].map((z) => (
                    <button
                      type="button"
                      key={z.id}
                      onClick={() => setZone(z.id)}
                      className={`text-left rounded-2xl border p-4 transition-colors ${zone === z.id ? "border-gold bg-gold/10" : "border-maroon/15 bg-creamlight"}`}
                      data-testid={`checkout-zone-${z.id}`}
                    >
                      <span className="block text-sm font-medium text-maroon">{z.t}</span>
                      <span className="block text-xs text-ink/60 mt-1">{z.d}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl bg-paper p-6 sm:p-8 ring-1 ring-maroon/10">
                <h2 className="font-heading text-xl text-maroon mb-5">Payment method</h2>
                <div className="space-y-2.5">
                  {PAYMENTS.map((p) => (
                    <label
                      key={p.id}
                      className={`flex items-center gap-3 rounded-2xl border p-4 cursor-pointer transition-colors ${method === p.id ? "border-gold bg-gold/10" : "border-maroon/15"}`}
                      data-testid={`checkout-pay-${p.id}`}
                    >
                      <input type="radio" name="pay" checked={method === p.id} onChange={() => setMethod(p.id)} className="accent-heritage" />
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-maroon">{p.label}</span>
                        <span className="block text-xs text-ink/55">{p.note}</span>
                      </span>
                    </label>
                  ))}
                </div>
                {["esewa", "khalti", "fonepay_qr"].includes(method) && (
                  <p className="mt-3 text-xs text-golddeep bg-gold/10 rounded-xl px-3 py-2">
                    Online payment is being connected. Your order will be recorded and we'll confirm it with you directly.
                  </p>
                )}
              </section>
            </div>

            {/* summary */}
            <aside className="lg:col-span-2">
              <div className="rounded-3xl bg-maroon text-cream p-6 sm:p-8 sticky top-28">
                <h2 className="font-heading text-xl mb-5">Order summary</h2>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                  {items.map((it) => (
                    <div key={it.id} className="flex gap-3 items-center">
                      <img src={it.img} alt={it.name} className="h-14 w-14 rounded-lg object-cover" />
                      <div className="flex-1 text-sm">
                        <p className="text-cream leading-tight">{it.name}</p>
                        <div className="mt-1 flex items-center gap-2 text-cream/70">
                          <button type="button" onClick={() => setQty(it.id, it.qty - 1)} className="px-1.5 rounded bg-cream/10">−</button>
                          <span>{it.qty}</span>
                          <button type="button" onClick={() => setQty(it.id, it.qty + 1)} className="px-1.5 rounded bg-cream/10">+</button>
                          <button type="button" onClick={() => removeItem(it.id)} className="ml-2 text-cream/50 underline">remove</button>
                        </div>
                      </div>
                      <span className="text-sm text-goldbright">NPR {it.price * it.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-2 border-t border-cream/15 pt-4 text-sm">
                  <div className="flex justify-between text-cream/80"><span>Subtotal</span><span data-testid="summary-subtotal">NPR {subtotal}</span></div>
                  <div className="flex justify-between text-cream/80"><span>Delivery</span><span data-testid="summary-delivery">{deliveryFee === 0 ? "Free" : `NPR ${deliveryFee}`}</span></div>
                  <div className="flex justify-between font-heading text-lg pt-1"><span>Total</span><span data-testid="summary-total">NPR {total}</span></div>
                </div>
                {err && <p className="mt-4 text-sm text-goldbright" data-testid="checkout-error">{err}</p>}
                <button
                  type="submit"
                  disabled={busy}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-goldbright py-4 text-sm font-medium text-maroon transition-colors hover:bg-cream disabled:opacity-60"
                  data-testid="place-order-btn"
                >
                  {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Placing order…</> : `Place order • NPR ${total}`}
                </button>
              </div>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { Truck, Wallet, ArrowRight } from "lucide-react";
import { DELIVERY } from "../../lib/site";
import { Reveal } from "./motion";

const goFaq = () => {
  const el = document.getElementById("faq");
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 });
  else el.scrollIntoView({ behavior: "smooth" });
};

/**
 * Small practical reassurance, placed right after the final CTA (spec §19/§36).
 * Compact — a scannable confidence layer, not another large section. Only
 * operational payment methods are shown as active; gateways still being
 * integrated render as "Coming soon".
 */
export const DeliveryTrust = () => {
  return (
    <section className="relative bg-cream py-8 sm:py-10" data-testid="delivery-trust">
      <div className="mx-auto grid max-w-4xl gap-6 px-5 sm:grid-cols-2 sm:px-8">
        <Reveal>
          <div className="flex gap-3">
            <Truck className="mt-0.5 h-5 w-5 shrink-0 text-heritage" />
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-golddeep">Delivery</h3>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink/70">
                {DELIVERY.delivery.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="flex gap-3">
            <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-heritage" />
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-golddeep">How you can pay</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {DELIVERY.paymentsLive.map((p) => (
                  <span key={p} className="rounded-full bg-paper px-3 py-1 text-xs text-ink/75 ring-1 ring-maroon/12">
                    {p}
                  </span>
                ))}
                {DELIVERY.paymentsSoon.map((p) => (
                  <span key={p} className="rounded-full px-3 py-1 text-xs text-ink/40 ring-1 ring-maroon/10">
                    {p} <span className="text-ink/30">· soon</span>
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-ink/45">
                Cash on Delivery and Bank Transfer are confirmed with you in chat when your order is placed.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-4 max-w-4xl px-5 sm:px-8">
        <button
          onClick={goFaq}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-ink/50 transition-colors hover:text-maroon"
          data-testid="delivery-faq-link"
        >
          Have a question? View FAQs <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
};

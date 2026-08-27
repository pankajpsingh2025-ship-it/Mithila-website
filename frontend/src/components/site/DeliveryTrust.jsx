import React from "react";
import { Truck, Wallet } from "lucide-react";
import { DELIVERY } from "../../lib/site";
import { Reveal } from "./motion";

/**
 * Small practical reassurance, placed right after the final CTA (spec §36).
 * Truthful methods only; no gateway is claimed as "live" beyond what the
 * business already handles manually.
 */
export const DeliveryTrust = () => {
  return (
    <section className="relative bg-cream py-10" data-testid="delivery-trust">
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
                {DELIVERY.payments.map((p) => (
                  <span key={p} className="rounded-full bg-paper px-3 py-1 text-xs text-ink/70 ring-1 ring-maroon/10">
                    {p}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-ink/45">
                For anything other than Cash on Delivery, a team member confirms every payment in chat.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

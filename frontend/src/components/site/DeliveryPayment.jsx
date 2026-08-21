import React from "react";
import { Truck, Wallet } from "lucide-react";
import { DELIVERY } from "../../lib/site";
import { Reveal } from "./motion";

export const DeliveryPayment = () => {
  return (
    <section id="delivery" className="relative bg-creamlight py-24 sm:py-28" data-testid="delivery-section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Delivery */}
          <Reveal>
            <div className="h-full rounded-3xl bg-paper p-8 sm:p-10 ring-1 ring-maroon/10 shadow-[0_20px_50px_-30px_rgba(74,31,13,0.4)]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-heritage/12 text-heritage">
                <Truck className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-heading text-2xl text-maroon">Delivery</h3>
              <ul className="mt-5 space-y-4">
                {DELIVERY.delivery.map((d, i) => (
                  <li key={i} className="flex gap-3 text-sm sm:text-base leading-relaxed text-ink/75">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Payment */}
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl bg-maroon p-8 sm:p-10 text-cream shadow-[0_20px_50px_-30px_rgba(74,31,13,0.6)]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-goldbright/20 text-goldbright">
                <Wallet className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-heading text-2xl">Payment methods</h3>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {DELIVERY.payments.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-goldbright/30 bg-ink/30 px-4 py-2 text-sm text-cream/90"
                    data-testid={`payment-${p.replace(/\W+/g, "-").toLowerCase()}`}
                  >
                    {p}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-cream/60">
                A real team member checks every payment personally — for anything other than Cash on Delivery, just share a screenshot in chat.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { TRUST } from "../../lib/site";
import { SunFace } from "./Madhubani";

// Continuous editorial marquee of trust phrases.
export const TrustBar = () => {
  const items = [...TRUST, ...TRUST];
  return (
    <section className="relative bg-maroon py-5 overflow-hidden" data-testid="trust-bar">
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-6 px-8">
            <span className="font-heading text-goldbright/95 text-lg sm:text-2xl tracking-tight">{t}</span>
            <SunFace className="w-5 h-5 text-gold/60 shrink-0" strokeWidth={4} />
          </div>
        ))}
      </div>
    </section>
  );
};

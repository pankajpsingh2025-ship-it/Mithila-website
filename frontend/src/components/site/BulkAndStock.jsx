import React from "react";
import { Gift, Store, Check, ArrowUpRight } from "lucide-react";
import { CORPORATE, STOCKIST, IMG } from "../../lib/site";
import { Reveal } from "./motion";
import { TriangleBand } from "./Madhubani";

const Points = ({ items, tone = "maroon" }) => (
  <ul className="mt-6 space-y-3">
    {items.map((p, i) => (
      <li key={i} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed">
        <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${tone === "cream" ? "bg-goldbright text-maroon" : "bg-heritage text-paper"}`}>
          <Check className="h-3 w-3" />
        </span>
        <span className={tone === "cream" ? "text-cream/85" : "text-ink/75"}>{p}</span>
      </li>
    ))}
  </ul>
);

export const BulkAndStock = () => {
  return (
    <>
      {/* Corporate & Bulk Gifting */}
      <section className="relative bg-kraft/15 py-24 sm:py-32" data-testid="corporate-section">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-maroon/10 shadow-[0_30px_70px_-32px_rgba(74,31,13,0.5)]">
              <img src={IMG.giftbags} alt="Mithila art gift bags" className="h-[26rem] w-full object-cover" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-kraft/25 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-golddeep">
                <Gift className="h-4 w-4" /> Gifting
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-heading font-light text-maroon leading-[1.05] text-[clamp(1.9rem,4.4vw,3.2rem)]">
                {CORPORATE.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-ink/70">{CORPORATE.intro}</p>
            </Reveal>
            <Reveal delay={0.15}><Points items={CORPORATE.points} /></Reveal>
            <Reveal delay={0.2}>
              <a
                href={CORPORATE.href}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-heritage"
                data-testid="corporate-cta"
              >
                {CORPORATE.cta} <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stockist pitch */}
      <section id="stock" className="relative bg-heritage text-cream py-24 sm:py-32 overflow-hidden" data-testid="stockist-section">
        <div className="absolute inset-x-0 top-0 text-goldbright/25"><TriangleBand height={14} /></div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-goldbright">
                <Store className="h-4 w-4" /> For cafés & tea shops
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-heading font-light leading-[1.05] text-[clamp(1.9rem,4.4vw,3.2rem)]">
                {STOCKIST.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-cream/80">{STOCKIST.intro}</p>
            </Reveal>
            <Reveal delay={0.15}><Points items={STOCKIST.points} tone="cream" /></Reveal>
            <Reveal delay={0.2}>
              <a
                href={STOCKIST.href}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-goldbright px-6 py-3.5 text-sm font-medium text-maroon transition-colors hover:bg-cream"
                data-testid="stockist-cta"
              >
                {STOCKIST.cta} <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
          <Reveal className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-cream/15 shadow-2xl">
              <img src={IMG.pouches} alt="Khajuri pouches at the counter" className="h-[26rem] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

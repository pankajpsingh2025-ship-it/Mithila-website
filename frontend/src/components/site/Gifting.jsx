import React from "react";
import { Gift, Check, ArrowUpRight } from "lucide-react";
import { GIFTING, IMG } from "../../lib/site";
import { Reveal } from "./motion";

export const Gifting = () => {
  const { eyebrow, headline, body, points, cta, href } = GIFTING;
  return (
    <section id="gifting" className="relative bg-cream py-24 sm:py-32" data-testid="gifting-section">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-maroon/10 shadow-[0_30px_70px_-32px_rgba(74,31,13,0.5)]">
            <img
              src={IMG.giftHero}
              alt="Mithila.Foods Mithila-art gift bag with a kraft pouch and a plate of khajuri"
              className="h-[26rem] w-full object-cover sm:h-[30rem]"
              loading="lazy"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-kraft/20 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-golddeep">
              <Gift className="h-4 w-4" /> {eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-heading text-[clamp(1.9rem,4.4vw,3.2rem)] font-light leading-[1.05] text-maroon">
              {headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">{body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-ink/75 sm:text-base">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-heritage text-paper">
                    <Check className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-heritage"
              data-testid="gifting-cta"
            >
              {cta} <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

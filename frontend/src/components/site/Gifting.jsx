import React from "react";
import { motion } from "framer-motion";
import { Gift, ArrowUpRight } from "lucide-react";
import { GIFTING, IMG } from "../../lib/site";
import { Reveal, useParallax } from "./motion";

/** Short: one image, one headline, one line, one CTA. */
export const Gifting = () => {
  const { eyebrow, headline, cta, href } = GIFTING;
  const { ref, y } = useParallax(40);
  return (
    <section id="gifting" className="relative bg-cream py-16 sm:py-20" data-testid="gifting-section">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <div ref={ref} className="img-blend-soft relative overflow-hidden">
            <motion.img
              src={IMG.giftHero}
              alt="The Mithila-art gift bag with a kraft pouch and a plate of khajuri"
              style={{ y }}
              className="h-[22rem] w-full scale-110 object-cover sm:h-[26rem]"
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
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
              Wrapped in real Mithila art, with a story card and space for a hand-written note — for
              festivals, family, a thank-you, or a whole office.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mo-hover mt-7 inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3.5 text-sm font-medium text-paper hover:bg-heritage"
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

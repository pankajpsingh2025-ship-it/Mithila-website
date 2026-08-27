import React from "react";
import { motion } from "framer-motion";
import { LINEUP, IMG } from "../../lib/site";
import { Reveal, useParallax } from "./motion";

/**
 * Final product-family payoff. The supplied LINEUP image is shown large and
 * blended into the cream background — not treated as a shop card.
 */
export const Lineup = () => {
  const { ref, y } = useParallax(38);

  return (
    <section
      id="collection"
      className="relative overflow-hidden bg-creamlight py-20 sm:py-28"
      data-testid="lineup-section"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 text-center">
        <Reveal>
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-golddeep">{LINEUP.eyebrow}</p>
          <h2 className="mx-auto max-w-2xl font-heading text-[clamp(2rem,4.8vw,3.6rem)] font-light leading-[1.05] text-maroon">
            {LINEUP.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
            {LINEUP.body}
          </p>
        </Reveal>
      </div>

      <Reveal>
        {/* mobile: scroll the wide lineup at a readable height (every pack + its
            label stays legible) · sm+: full contain composition with a soft
            cream vignette so the edges melt into the page */}
        <div className="relative mt-10 sm:mt-12">
          <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block [background:radial-gradient(120%_120%_at_50%_50%,transparent_58%,#FAF1DE_100%)]" />
          <div
            ref={ref}
            className="mx-auto flex max-w-[100rem] snap-x overflow-x-auto px-4 sm:overflow-visible sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <motion.img
              src={IMG.finalLineup}
              alt="The full Mithila.Foods range — Regular, Family, Gift and Vendor packs together"
              style={{ y }}
              className="mx-auto h-[52vh] w-auto max-w-none rounded-[1.25rem] object-contain sm:h-auto sm:max-h-[72vh] sm:w-full"
              loading="lazy"
              data-testid="lineup-image"
            />
          </div>
          <p className="mt-3 text-center text-[11px] uppercase tracking-[0.16em] text-ink/40 sm:hidden">
            Swipe to see the full range →
          </p>
        </div>
      </Reveal>
    </section>
  );
};

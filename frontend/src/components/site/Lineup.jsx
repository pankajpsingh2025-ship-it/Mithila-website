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
        <div ref={ref} className="relative mx-auto mt-12 max-w-[100rem] px-4 sm:px-8">
          {/* soft cream vignette so the image edges melt into the page */}
          <div className="pointer-events-none absolute inset-0 z-10 [background:radial-gradient(120%_120%_at_50%_50%,transparent_58%,#FAF1DE_100%)]" />
          <motion.img
            src={IMG.finalLineup}
            alt="The full Mithila.Foods range — Regular, Family, Gift and Vendor packs together"
            style={{ y }}
            className="mx-auto max-h-[72vh] w-full rounded-[1.5rem] object-contain"
            loading="lazy"
            data-testid="lineup-image"
          />
        </div>
      </Reveal>
    </section>
  );
};

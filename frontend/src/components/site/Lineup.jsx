import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LINEUP, IMG } from "../../lib/site";
import { Reveal } from "./motion";

/**
 * Final product-family payoff. The supplied lineup image is shown large and
 * blended into the cream background — not treated as a shop card. Lazy by
 * default (loading="lazy") since it sits low on the page.
 */
export const Lineup = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section
      ref={ref}
      id="collection"
      className="relative overflow-hidden bg-creamlight py-24 sm:py-32"
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

      <Reveal delay={0.1}>
        <div className="relative mx-auto mt-12 max-w-[110rem] px-4 sm:px-8">
          {/* soft cream vignette so the image edges melt into the page */}
          <div className="pointer-events-none absolute inset-0 z-10 [background:radial-gradient(120%_120%_at_50%_50%,transparent_55%,#FAF1DE_100%)]" />
          <motion.img
            src={IMG.finalLineup}
            alt="The full Mithila.Foods range — everyday pouches, family pack, gift bag and café jar"
            style={{ y }}
            className="mx-auto max-h-[70vh] w-full rounded-[1.5rem] object-contain"
            loading="lazy"
            data-testid="lineup-image"
          />
        </div>
      </Reveal>
    </section>
  );
};

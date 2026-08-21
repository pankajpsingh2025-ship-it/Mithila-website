import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMG } from "../../lib/site";
import { MaskLines, Reveal } from "./motion";

export const Lifestyle = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative h-[90vh] min-h-[560px] overflow-hidden" data-testid="lifestyle-section">
      <motion.img
        src={IMG.chai}
        alt="Dipping khajuri into a hot glass of chai"
        style={{ y }}
        className="absolute inset-0 h-[124%] w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/35 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
        <div className="max-w-xl rounded-3xl bg-maroon/25 p-8 sm:p-10 backdrop-blur-md ring-1 ring-cream/15">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-goldbright">A daily ritual</p>
          <h2 className="font-heading font-light text-cream leading-[1.02] text-[clamp(2rem,4.8vw,3.8rem)]">
            <MaskLines lines={["Best enjoyed", "with a hot glass", "of chiya."]} lineClass="text-cream" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-cream/80">
              Crisp on the outside, tender within — khajuri was made for that first dip into
              a steaming cup of tea. This is the moment we make it for.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

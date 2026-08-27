import React from "react";
import { motion } from "framer-motion";
import { STORY, IMG } from "../../lib/site";
import { Reveal, MaskLines, useParallax } from "./motion";
import { Peacock } from "./Madhubani";

/**
 * One compact editorial section: heritage + "what is khajuri" + Chhath roots +
 * everyday relevance + purpose — written toward pride and belonging. No numbered
 * 01/02/03 block (Shape/Bake/Break + the sticky story already show the craft).
 */
export const Story = () => {
  const { ref, y } = useParallax(40);
  const head = useParallax(20);

  return (
    <section id="story" className="relative overflow-hidden bg-cream py-16 sm:py-24">
      <div className="pointer-events-none absolute right-4 top-10 text-maroon/[0.055]">
        <Peacock className="h-64 w-64" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-golddeep">{STORY.eyebrow}</p>
          </Reveal>
          <motion.h2
            ref={head.ref}
            style={{ y: head.y }}
            className="font-heading text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.03] text-maroon"
          >
            <MaskLines lines={[STORY.subheading]} />
          </motion.h2>
          <div className="mt-6 max-w-xl space-y-4">
            {STORY.paras.map((p, i) => (
              <Reveal key={i} delay={0.05 + i * 0.04}>
                <p className="text-base leading-relaxed text-ink/75 sm:text-lg">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12}>
            <p className="mt-6 font-heading text-lg italic text-maroon sm:text-xl">{STORY.line}</p>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal>
            <div ref={ref} className="img-blend-soft relative overflow-hidden">
              <motion.img
                src={IMG.lifestyle}
                alt="Khajuri with a glass of chiya"
                style={{ y }}
                className="h-[22rem] w-full scale-110 object-cover sm:h-[28rem]"
                data-testid="story-image"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { motion } from "framer-motion";
import { STORY, IMG } from "../../lib/site";
import { Reveal, MaskLines, useParallax } from "./motion";
import { Peacock } from "./Madhubani";

/**
 * "What is Khajuri?" + heritage, in one compact, balanced editorial section.
 * No wooden-mould photo (that lives in the Shape stage now); a finished-Khajuri
 * image instead. Copy is preserved from the brand voice.
 */
export const Story = () => {
  const { ref, y } = useParallax(38);

  return (
    <section id="story" className="relative overflow-hidden bg-cream py-16 sm:py-20" data-testid="story-section">
      <div className="pointer-events-none absolute -right-6 top-8 text-maroon/[0.05]">
        <Peacock className="h-60 w-60" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-golddeep">{STORY.eyebrow}</p>
          </Reveal>
          <h2 className="font-heading text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.05] text-maroon">
            <MaskLines lines={[STORY.subheading]} />
          </h2>
          <div className="mt-5 space-y-4">
            {STORY.paras.map((p, i) => (
              <Reveal key={i} delay={0.04 + i * 0.04}>
                <p className="max-w-lg text-base leading-relaxed text-ink/75 sm:text-lg">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-6 font-heading text-lg italic text-maroon sm:text-xl">{STORY.line}</p>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal>
            <div ref={ref} className="img-blend-soft relative overflow-hidden">
              <motion.img
                src={IMG.group}
                alt="A plate of freshly made khajuri"
                style={{ y }}
                className="h-[20rem] w-full scale-110 object-cover sm:h-[26rem]"
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

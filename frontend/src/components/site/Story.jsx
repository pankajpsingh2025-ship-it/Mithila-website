import React from "react";
import { motion } from "framer-motion";
import { STORY, IMG } from "../../lib/site";
import { Reveal, MaskLines, useParallax } from "./motion";
import { Peacock } from "./Madhubani";

/**
 * One compressed editorial section: the "Tradition shouldn't have a season"
 * banner, "What is Khajuri?", heritage, and the Mithila.Foods purpose —
 * written toward pride and belonging.
 */
export const Story = () => {
  const { ref, y } = useParallax(46);
  const head = useParallax(22);

  return (
    <section id="story" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div className="pointer-events-none absolute right-4 top-16 text-maroon/[0.06]">
        <Peacock className="h-72 w-72" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-golddeep">{STORY.eyebrow}</p>
            </Reveal>
            <motion.h2
              ref={head.ref}
              style={{ y: head.y }}
              className="font-heading text-[clamp(2.1rem,4.8vw,3.6rem)] font-light leading-[1.02] text-maroon"
            >
              <MaskLines lines={[STORY.subheading]} />
            </motion.h2>
            <div className="mt-7 max-w-xl space-y-5">
              {STORY.paras.map((p, i) => (
                <Reveal key={i} delay={0.05 + i * 0.04}>
                  <p className="text-base leading-relaxed text-ink/75 sm:text-lg">{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.12}>
              <p className="mt-7 font-heading text-lg italic text-maroon sm:text-xl">{STORY.line}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div
                ref={ref}
                className="relative overflow-hidden rounded-[2rem] shadow-[0_36px_80px_-28px_rgba(74,31,13,0.5)] ring-1 ring-maroon/10"
              >
                <motion.img
                  src={IMG.makeShape3}
                  alt="Khajuri pressed by hand in a traditional wooden mould"
                  style={{ y }}
                  className="h-[24rem] w-full scale-110 object-cover sm:h-[32rem]"
                  data-testid="story-image"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-maroon/12 pt-10 sm:mt-16 md:grid-cols-3">
          {STORY.chapters.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.07}>
              <div data-testid={`story-chapter-${c.n}`}>
                <span className="font-heading text-4xl leading-none text-gold/70 sm:text-5xl">{c.n}</span>
                <h3 className="mt-3 font-heading text-lg text-maroon">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

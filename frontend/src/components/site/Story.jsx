import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { STORY, IMG } from "../../lib/site";
import { Reveal, MaskLines } from "./motion";
import { Peacock } from "./Madhubani";

export const Story = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="story" ref={ref} className="relative bg-creamlight py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute top-16 right-4 text-maroon/[0.06]">
        <Peacock className="w-72 h-72" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* left: heading + paras */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-golddeep">Our Story</p>
            </Reveal>
            <h2 className="font-heading font-light text-maroon leading-[1.02] text-[clamp(2rem,4.6vw,3.6rem)]">
              <MaskLines lines={["A Terai tradition,", "carried into Kathmandu"]} />
            </h2>
            <div className="mt-8 max-w-xl space-y-6">
              {STORY.paras.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <p className="text-base sm:text-lg leading-relaxed text-ink/75">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* right: image */}
          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="relative blob-frame shadow-[0_36px_80px_-28px_rgba(74,31,13,0.5)] ring-1 ring-maroon/10">
                <motion.img
                  src={IMG.broken}
                  alt="A khajuri broken open, showing its crumbly interior"
                  style={{ y: imgY }}
                  className="h-[26rem] sm:h-[34rem] w-full object-cover scale-110"
                  data-testid="story-image"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* numbered chapters */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {STORY.chapters.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.12}>
              <div className="group relative border-t border-maroon/15 pt-6" data-testid={`story-chapter-${c.n}`}>
                <span className="font-heading text-5xl sm:text-6xl text-gold/70 leading-none">{c.n}</span>
                <h3 className="mt-4 font-heading text-xl text-maroon">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

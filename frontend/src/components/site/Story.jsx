import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { STORY, IMG } from "../../lib/site";
import { Reveal, MaskLines } from "./motion";
import { Peacock } from "./Madhubani";

export const Story = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="story" ref={ref} className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="pointer-events-none absolute right-4 top-16 text-maroon/[0.06]">
        <Peacock className="h-72 w-72" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-golddeep">Our story</p>
            </Reveal>
            <h2 className="font-heading text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.02] text-maroon">
              <MaskLines lines={["A Mithila tradition,", "made for every day"]} />
            </h2>
            <div className="mt-8 max-w-xl space-y-6">
              {STORY.paras.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <p className="text-base leading-relaxed text-ink/75 sm:text-lg">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-[2rem] shadow-[0_36px_80px_-28px_rgba(74,31,13,0.5)] ring-1 ring-maroon/10">
                <motion.img
                  src={IMG.rawMold}
                  alt="Khajuri shaped by hand in a traditional wooden mould"
                  style={{ y: imgY }}
                  className="h-[26rem] w-full scale-110 object-cover sm:h-[34rem]"
                  data-testid="story-image"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {STORY.chapters.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.12}>
              <div className="group relative border-t border-maroon/15 pt-6" data-testid={`story-chapter-${c.n}`}>
                <span className="font-heading text-5xl leading-none text-gold/70 sm:text-6xl">{c.n}</span>
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

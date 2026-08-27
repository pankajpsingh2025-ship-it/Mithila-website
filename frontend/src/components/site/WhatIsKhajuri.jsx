import React from "react";
import { WHAT_IS, IMG } from "../../lib/site";
import { Reveal, MaskLines } from "./motion";
import { SunDivider } from "./Madhubani";

export const WhatIsKhajuri = () => {
  return (
    <section id="what-is-khajuri" className="relative bg-creamlight py-20 sm:py-28" data-testid="what-is-khajuri">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-golddeep">{WHAT_IS.eyebrow}</p>
            </Reveal>
            <h2 className="font-heading text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.05] text-maroon">
              <MaskLines lines={["A festival food,", "made for every day."]} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">{WHAT_IS.lead}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">{WHAT_IS.body}</p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-7 font-heading text-xl italic text-golddeep sm:text-2xl">{WHAT_IS.line}</p>
            </Reveal>

            <Reveal delay={0.28}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {WHAT_IS.moments.map((m) => (
                  <li
                    key={m}
                    className="rounded-full border border-maroon/15 bg-paper/70 px-4 py-2 text-sm text-ink/70"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-[2rem] shadow-[0_36px_80px_-30px_rgba(74,31,13,0.45)] ring-1 ring-maroon/10">
                <img
                  src={IMG.lifestyle}
                  alt="Khajuri served with tea"
                  className="h-[24rem] w-full object-cover sm:h-[32rem]"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 text-gold/70">
          <SunDivider />
        </div>
      </div>
    </section>
  );
};

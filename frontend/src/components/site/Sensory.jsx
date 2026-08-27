import React from "react";
import { motion } from "framer-motion";
import { IMG } from "../../lib/site";
import { Reveal, MaskLines, useParallax } from "./motion";

/**
 * MODE 2 -> MODE 3 bridge: one compact appetite moment right before the shop.
 * Whole finished khajuri + a macro of the crumb, edges dissolved into the page.
 * Not a replay of the Break sequence — this is the "taste it" beat.
 */
export const Sensory = () => {
  const a = useParallax(40);
  const b = useParallax(28);

  return (
    <section className="relative overflow-hidden bg-creamlight py-14 sm:py-20" data-testid="sensory-section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-8 sm:grid-cols-12 sm:gap-10">
          <Reveal className="sm:col-span-5">
            <div ref={a.ref} className="img-blend relative overflow-hidden">
              <motion.img
                src={IMG.goldenWhole}
                alt="A whole handcrafted khajuri, deep golden, its pressed pattern crisp on top"
                style={{ y: a.y }}
                className="h-[16rem] w-full scale-110 object-cover sm:h-[24rem]"
                loading="lazy"
              />
            </div>
          </Reveal>

          <div className="sm:col-span-4">
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-golddeep">The first bite</p>
            <h2 className="font-heading text-[clamp(2rem,4.6vw,3.2rem)] font-light leading-[1.05] text-maroon">
              <MaskLines lines={["Golden outside."]} />
              <MaskLines lines={["Crumbly within."]} lineClass="italic text-golddeep" delay={0.08} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-4 text-base leading-relaxed text-ink/75">
                Crisp shell, tender handmade centre, whole nuts you can see.
              </p>
            </Reveal>
          </div>

          <Reveal className="sm:col-span-3">
            <div ref={b.ref} className="img-blend relative overflow-hidden">
              <motion.img
                src={IMG.makeBreak2}
                alt="Macro of khajuri crumb — dense, grainy, handmade"
                style={{ y: b.y }}
                className="h-[13rem] w-full scale-110 object-cover sm:h-[18rem]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

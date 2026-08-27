import React from "react";
import { motion } from "framer-motion";
import { IMG } from "../../lib/site";
import { Reveal, MaskLines, useParallax } from "./motion";

/**
 * One compact "taste it / live with it" beat right before the shop. Consolidates
 * the old texture line + "tea, coffee, sharing, gifting" + "the first bite" into
 * a single section: one crumb/whole macro + one tea-and-sharing image. It does
 * NOT reuse any Shape/Bake/Break frame.
 */
export const Sensory = () => {
  const a = useParallax(38);
  const b = useParallax(30);

  return (
    <section id="taste" className="relative overflow-hidden bg-creamlight py-14 sm:py-20" data-testid="sensory-section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-golddeep">The taste</p>
          <h2 className="font-heading text-[clamp(2rem,4.8vw,3.3rem)] font-light leading-[1.08] text-maroon">
            <MaskLines lines={["Golden outside. Rich and", "crumbly within."]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-4 text-base leading-relaxed text-ink/75 sm:text-lg">
              A crisp shell and a tender, handmade centre, with whole nuts you can see —
              made with real ghee and jaggery. Right alongside your morning tea or afternoon
              coffee, broken in half and shared, or boxed up as a gift sent home.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
          <Reveal>
            <div ref={a.ref} className="img-blend relative overflow-hidden">
              <motion.img
                src={IMG.goldenWhole}
                alt="A whole handcrafted khajuri, deep golden, whole nuts visible in the crumb"
                style={{ y: a.y }}
                className="h-[15rem] w-full scale-110 object-cover sm:h-[22rem]"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div ref={b.ref} className="img-blend relative overflow-hidden">
              <motion.img
                src={IMG.lifestyle}
                alt="Khajuri served with a cup of tea, ready to share"
                style={{ y: b.y }}
                className="h-[15rem] w-full scale-110 object-cover sm:h-[22rem]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { motion } from "framer-motion";
import { INGREDIENT_GROUPS, ALLERGEN, IMG } from "../../lib/site";
import { Reveal, useParallax } from "./motion";

export const IngredientStory = () => {
  const { ref, y } = useParallax(36);
  return (
    <section id="ingredients" className="relative bg-creamlight py-20 sm:py-24" data-testid="ingredients-section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* editorial flat-lay */}
          <Reveal className="lg:col-span-5">
            <div ref={ref} className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-32px_rgba(74,31,13,0.45)] ring-1 ring-maroon/10">
              <motion.img
                src={IMG.flatlay}
                alt="Every khajuri ingredient laid out — nuts, jaggery, ghee, coconut and spices"
                style={{ y }}
                className="h-[20rem] w-full scale-110 object-cover sm:h-[26rem]"
                loading="lazy"
              />
            </div>
          </Reveal>

          {/* grouped, scannable list */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-golddeep">What goes in</p>
              <h2 className="font-heading text-[clamp(1.9rem,4.2vw,3rem)] font-light leading-[1.05] text-maroon">
                Nothing here but <span className="italic text-golddeep">the real thing.</span>
              </h2>
            </Reveal>

            <div className="mt-6 divide-y divide-maroon/12">
              {INGREDIENT_GROUPS.map((g, gi) => (
                <Reveal key={g.title} delay={gi * 0.06}>
                  <div className="py-4">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-heading text-lg text-maroon">{g.title}</h3>
                      <p className="text-xs text-ink/55">{g.note}</p>
                    </div>
                    <ul className="mt-2.5 flex flex-wrap gap-2">
                      {g.items.map((it) => (
                        <li key={it} className="rounded-full bg-paper px-3.5 py-1.5 text-sm text-ink/75 ring-1 ring-maroon/10">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.08}>
              <p className="mt-5 text-xs tracking-wide text-ink/55" data-testid="allergen-note">{ALLERGEN}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

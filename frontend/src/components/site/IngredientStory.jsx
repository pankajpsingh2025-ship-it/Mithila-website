import React from "react";
import { INGREDIENT_GROUPS, ALLERGEN, IMG } from "../../lib/site";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { SunDivider } from "./Madhubani";

export const IngredientStory = () => {
  return (
    <section id="ingredients" className="relative bg-creamlight py-24 sm:py-32" data-testid="ingredients-section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-golddeep">What goes in</p>
          <h2 className="font-heading text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.05] text-maroon">
            Nothing here but <span className="italic text-golddeep">the real thing.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70 sm:text-lg">
            Eleven ingredients, no shortcuts. Real ghee and jaggery, whole nuts broken by hand,
            and a warm line of spice.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* editorial flat-lay */}
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-32px_rgba(74,31,13,0.45)] ring-1 ring-maroon/10">
              <img
                src={IMG.flatlay}
                alt="Every khajuri ingredient laid out — nuts, jaggery, ghee, coconut and spices"
                className="h-[24rem] w-full object-cover sm:h-full"
                loading="lazy"
              />
            </div>
          </Reveal>

          {/* grouped, scannable list */}
          <div className="lg:col-span-7">
            <Stagger className="space-y-8" gap={0.1}>
              {INGREDIENT_GROUPS.map((g) => (
                <StaggerItem key={g.title}>
                  <div className="border-t border-maroon/15 pt-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="font-heading text-2xl text-maroon">{g.title}</h3>
                      <p className="text-sm text-ink/55">{g.note}</p>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-2.5">
                      {g.items.map((it) => (
                        <li
                          key={it}
                          className="rounded-full bg-paper px-4 py-2 text-sm text-ink/75 ring-1 ring-maroon/10"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1}>
              <p className="mt-8 text-xs tracking-wide text-ink/55 sm:text-sm" data-testid="allergen-note">
                {ALLERGEN}
              </p>
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

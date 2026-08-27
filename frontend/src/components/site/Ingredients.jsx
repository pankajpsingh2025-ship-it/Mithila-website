import React, { useState } from "react";
import { INGREDIENT_GROUPS, ALLERGEN } from "../../lib/site";
import { Reveal } from "./motion";
import { SunDivider } from "./Madhubani";

/**
 * Compact "11 real ingredients" — four groups (base / richness / crunch /
 * warmth), each with its names. The allergen line is SAFETY-CRITICAL: it is a
 * single static text node, rendered outside any scroll/motion wrapper, with a
 * solid high-contrast treatment so it is always legible even with JS disabled.
 */
export const Ingredients = () => {
  const [active, setActive] = useState(-1);

  return (
    <section id="ingredients" className="relative bg-creamlight py-16 sm:py-20" data-testid="ingredients-section">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.24em] text-golddeep">What goes in</p>
          <h2 className="mt-3 font-heading text-[clamp(1.9rem,4vw,2.9rem)] font-light leading-[1.1] text-maroon">
            11 real ingredients.
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
            Real ghee and jaggery, whole nuts broken by hand, fresh coconut, and a quiet line of spice. Nothing else.
          </p>
        </Reveal>

        <div
          className="mt-8 grid gap-x-10 gap-y-2 sm:grid-cols-2"
          onMouseLeave={() => setActive(-1)}
        >
          {INGREDIENT_GROUPS.map((g, gi) => (
            <div
              key={g.title}
              onMouseEnter={() => setActive(gi)}
              className={`border-t border-maroon/12 py-4 transition-opacity duration-300 ${
                active !== -1 && active !== gi ? "opacity-50 sm:opacity-50" : "opacity-100"
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="font-heading text-lg text-maroon">{g.title}</h3>
                <p className="text-xs text-ink/50">{g.note}</p>
              </div>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-full bg-paper px-3 py-1.5 text-[13px] text-ink/80 ring-1 ring-maroon/12"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SAFETY-CRITICAL — static, no motion wrapper, solid contrast */}
        <div
          className="mt-8 rounded-lg border border-maroon/20 bg-paper px-4 py-3"
          data-testid="allergen-note"
        >
          <p className="text-sm font-medium leading-relaxed text-maroon">
            <span className="uppercase tracking-[0.18em] text-golddeep">Allergens · </span>
            {ALLERGEN}
          </p>
        </div>

        <div className="mt-10 flex justify-center text-maroon/25">
          <SunDivider className="h-8 w-40" />
        </div>
      </div>
    </section>
  );
};

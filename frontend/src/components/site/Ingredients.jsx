import React from "react";
import { motion } from "framer-motion";
import { INGREDIENTS, ALLERGEN } from "../../lib/site";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { SunDivider, TriangleBand } from "./Madhubani";

export const Ingredients = () => {
  return (
    <section id="ingredients" className="relative bg-maroon text-cream py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 text-gold/30"><TriangleBand height={16} /></div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] paper-texture" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-goldbright/80">The Recipe</p>
          <h2 className="font-heading font-light leading-[1.03] text-cream text-[clamp(2.1rem,5vw,4rem)]">
            Nothing here but <span className="italic text-goldbright">the real thing.</span>
          </h2>
          <div className="mt-8 text-gold"><SunDivider /></div>
        </Reveal>

        <Stagger className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-7" gap={0.08}>
          {INGREDIENTS.map((ing, i) => (
            <StaggerItem
              key={ing.name}
              className={i % 3 === 1 ? "md:mt-10" : i % 3 === 2 ? "md:mt-4" : ""}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl ring-1 ring-goldbright/15 bg-ink/40"
                data-testid={`ingredient-${i}`}
              >
                <div className="relative overflow-hidden">
                  <span className="absolute left-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-goldbright/90 font-heading text-sm text-maroon">
                    {i + 1}
                  </span>
                  <img
                    src={ing.img}
                    alt={ing.name}
                    className="h-40 sm:h-52 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/85 via-maroon/10 to-transparent" />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-heading text-lg sm:text-xl text-cream leading-tight">
                    {ing.name} {ing.sub && <span className="text-goldbright/70 text-sm italic">{ing.sub}</span>}
                  </h3>
                  {ing.note && <p className="mt-1 text-xs sm:text-sm text-cream/60 leading-snug">{ing.note}</p>}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p
            className="mt-12 text-center text-xs sm:text-sm text-goldbright/70 tracking-wide"
            data-testid="allergen-note"
          >
            {ALLERGEN}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

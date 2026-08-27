import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INGREDIENT_GROUPS, ALLERGEN, IMG } from "../../lib/site";
import { Reveal } from "./motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky product story (brief §14 + §15) — the ingredient section, told with
 * the Khajuri as a visual anchor.
 *
 * Desktop: the product image is sticky on the left; as the panels on the right
 * scroll past, a scrubbed GSAP timeline crossfades + drifts the image between
 * approved states. No pin (so no leftover viewport).
 * Mobile: a clean stack — each panel carries its own image inline.
 */
const PANELS = [
  {
    key: "craft",
    eyebrow: "The craft",
    h: "Made the traditional way.",
    body:
      "Pressed by hand into a carved wooden mould, one floret at a time — the way it's done in Mithila kitchens before Chhath.",
    img: IMG.makeShape3,
  },
  {
    key: "ingredients",
    eyebrow: "What goes in",
    h: "Real ingredients, nothing hidden.",
    body: "Eleven of them. Real ghee and jaggery, whole nuts broken by hand, a quiet line of spice.",
    img: IMG.flatlay,
    groups: true,
    showImgMobile: true,
  },
  {
    key: "bake",
    eyebrow: "The bake",
    h: "Baked, not rushed.",
    body: "Small batches, watched until they turn a deep, even gold and the edges go crisp.",
    img: IMG.makeBake4,
  },
  {
    key: "sensory",
    eyebrow: "The bite",
    h: "Golden outside. Crumbly within.",
    body:
      "A crisp golden shell over a tender, handmade centre — with whole nuts and coconut you can see, and a warm hit of cardamom and fennel.",
    img: IMG.goldenWhole,
    showImgMobile: true,
  },
];

const Groups = () => (
  <div className="mt-6 divide-y divide-maroon/12">
    {INGREDIENT_GROUPS.map((g) => (
      <div key={g.title} className="py-3.5">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h4 className="font-heading text-base text-maroon">{g.title}</h4>
          <p className="text-xs text-ink/50">{g.note}</p>
        </div>
        <ul className="mt-2 flex flex-wrap gap-2">
          {g.items.map((it) => (
            <li key={it} className="rounded-full bg-paper px-3 py-1.5 text-[13px] text-ink/75 ring-1 ring-maroon/10">
              {it}
            </li>
          ))}
        </ul>
      </div>
    ))}
    <p className="pt-3 text-xs tracking-wide text-ink/55" data-testid="allergen-note">{ALLERGEN}</p>
  </div>
);

export const StickyStory = () => {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const root = useRef(null);
  const panelsRef = useRef(null);
  const imgRefs = useRef([]);

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const imgs = imgRefs.current.filter(Boolean);
      if (imgs.length < 2) return;
      gsap.set(imgs, { opacity: 0, scale: 1.12, xPercent: 4 });
      gsap.set(imgs[0], { opacity: 1, scale: 1.04, xPercent: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: panelsRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // even slice per transition across the panels' scroll length
      const step = 1 / imgs.length;
      for (let i = 1; i < imgs.length; i++) {
        const at = step * i - step * 0.5;
        tl.to(imgs[i - 1], { opacity: 0, scale: 1.12, xPercent: -4, duration: step }, at);
        tl.to(imgs[i], { opacity: 1, scale: 1.04, xPercent: 0, duration: step }, at);
      }
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="craft" ref={root} className="relative bg-creamlight" data-testid="sticky-story">
      <div className={`mx-auto grid max-w-7xl px-5 sm:px-8 lg:gap-16 ${reduce ? "" : "lg:grid-cols-2"}`}>
        {/* sticky product anchor — desktop only, scrubbed motion only.
            Large, feathered into the cream page — no card frame. */}
        <div className={reduce ? "hidden" : "hidden lg:block"}>
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <div className="img-blend relative aspect-[4/5] w-full max-w-[34rem]">
              {PANELS.map((p, i) => (
                <img
                  key={p.key}
                  ref={(el) => (imgRefs.current[i] = el)}
                  src={p.img}
                  alt=""
                  aria-hidden="true"
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={i === 0 ? undefined : { opacity: 0 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* panels */}
        <div ref={panelsRef} className="py-2 lg:py-0">
          {PANELS.map((p, i) => (
            <div
              key={p.key}
              data-index={i}
              className="flex flex-col justify-center py-7 lg:min-h-screen lg:py-16"
            >
              {/* inline image on mobile — only where it adds new information
                  (ingredients flat-lay, finished bite); the shaping/baking
                  states are already shown large in the stage above. Desktop
                  reduced-motion shows every panel's image. Feathered, no frame. */}
              {(reduce || p.showImgMobile) && (
                <img
                  src={p.img}
                  alt={p.h}
                  loading="lazy"
                  className={`img-blend mb-3 aspect-[16/10] w-full object-cover ${reduce ? "max-w-xl" : "lg:hidden"}`}
                />
              )}
              <Reveal>
                <p className="text-[11px] uppercase tracking-[0.24em] text-golddeep">{p.eyebrow}</p>
                <h3 className="mt-3 font-heading text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-[1.1] text-maroon">
                  {p.h}
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/75 sm:text-lg">{p.body}</p>
                {p.groups && <Groups />}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

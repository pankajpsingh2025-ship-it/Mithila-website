import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INGREDIENT_GROUPS, ALLERGEN, IMG } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * The editorial sticky story — LEFT: one persistent, frameless, left-bleed
 * visual; RIGHT: the copy, which simply scrolls (never crossfaded, so it can't
 * ghost or double). A GSAP scrub crossfades only the pinned photo, using
 * `autoAlpha` so an inactive photo is both opacity:0 AND visibility:hidden.
 * FOUR concise states. Beat 2 carries the ingredient + allergen transparency;
 * the allergen line is a plain static node outside every animation wrapper.
 * Mobile / reduced-motion: no pin, each state stacks with its own inline image.
 */
const BEATS = [
  {
    key: "origin",
    eyebrow: "Our story",
    h: "What is Khajuri?",
    body:
      "A handcrafted food from the Mithila and Terai plains — a savoury-sweet floret pressed by hand at home for family, for guests, and for festivals like Chhath. Not the dried date; its own food, with its own name.",
    eyebrow2: "Heritage",
    h2: "Festival roots. Everyday enjoyment.",
    body2:
      "For most people it appears once a year. We make it in small batches all year, with the same real ghee, jaggery and whole nuts our elders used.",
    img: IMG.group,
  },
  {
    key: "ingredients",
    eyebrow: "What goes in",
    h: "11 real ingredients. Nothing hidden.",
    body:
      "Real ghee and jaggery, whole nuts broken by hand, fresh coconut, and a quiet line of spice. That's the whole list.",
    groups: true,
    img: IMG.flatlay,
  },
  {
    key: "texture",
    eyebrow: "The bite",
    h: "Golden outside. Rich and crumbly within.",
    body:
      "A crisp shell gives way to a dense, grainy, handmade centre — with whole nuts and coconut you can actually see.",
    img: IMG.goldenWhole,
  },
  {
    key: "everyday",
    eyebrow: "Every day",
    h: "Tea. Coffee. Sharing. Gifting.",
    body:
      "For the morning tea, the afternoon coffee, the road, a guest at the door, a box sent home — festival roots, made for more moments.",
    img: IMG.lifestyle,
  },
];

const Groups = () => (
  <div className="mt-5 grid gap-x-8 gap-y-1 sm:grid-cols-2">
    {INGREDIENT_GROUPS.map((g) => (
      <div key={g.title} className="border-t border-maroon/12 py-2.5">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h4 className="font-heading text-[15px] text-maroon">{g.title}</h4>
          <p className="text-xs text-ink/50">{g.note}</p>
        </div>
        <ul className="mt-1.5 flex flex-wrap gap-1.5">
          {g.items.map((it) => (
            <li key={it} className="rounded-full bg-paper px-2.5 py-1 text-[12px] text-ink/75 ring-1 ring-maroon/12">
              {it}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

/** SAFETY-CRITICAL — always rendered, never animated. */
const Allergen = () => (
  <div className="mt-4 rounded-lg border border-maroon/20 bg-paper px-4 py-3" data-testid="allergen-note">
    <p className="text-sm font-medium leading-relaxed text-maroon">
      <span className="uppercase tracking-[0.16em] text-golddeep">Allergens · </span>
      {ALLERGEN}
    </p>
  </div>
);

export const StickyStory = () => {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const root = useRef(null);
  const colRef = useRef(null);
  const stageRef = useRef(null);
  const [active, setActive] = useState(0);

  // pin the left visual; derive the active state from scroll progress through
  // the copy column. A half-segment bias means a state only takes over once its
  // block is genuinely centred — the photo never flips on partial entry.
  useLayoutEffect(() => {
    if (reduce) return;
    const N = BEATS.length;
    const mm = gsap.matchMedia(root);
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: colRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stageRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setActive(Math.max(0, Math.min(N - 1, Math.floor(self.progress * N))));
        },
      });
    });
    return () => mm.revert();
  }, [reduce]);

  // The photo crossfade is driven straight off `active` in render (below) via an
  // inline opacity + CSS transition — React state is the single source of truth,
  // so a re-render can never desync the image from the copy.

  // a soft, wide right-edge fade — no hard PHOTO | WEBSITE seam
  const RIGHT_FADE =
    "linear-gradient(to right, #000 48%, rgba(0,0,0,0.55) 74%, rgba(0,0,0,0.12) 92%, transparent 100%)";

  return (
    <section
      id="story"
      ref={root}
      className="relative overflow-x-clip bg-creamlight scroll-mt-24"
      data-testid="sticky-story"
    >
      {!reduce && (
        <div
          ref={stageRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-0 hidden h-screen w-[50vw] lg:block"
        >
          <div className="absolute inset-0" style={{ WebkitMaskImage: RIGHT_FADE, maskImage: RIGHT_FADE }}>
            {BEATS.map((b, i) => (
              <img
                key={b.key}
                src={b.img}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
                style={{ opacity: active === i ? 1 : 0 }}
              />
            ))}
          </div>
          <p className="absolute bottom-8 left-6 text-xs tracking-[0.24em] text-cream drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
            {String(active + 1).padStart(2, "0")} <span className="text-cream/55">/ 04</span>
          </p>
        </div>
      )}

      <div ref={colRef} className={`relative z-10 ${reduce ? "" : "lg:ml-[50vw] lg:w-[50vw]"}`}>
        {BEATS.map((b, i) => (
          <article
            key={b.key}
            className="py-7 lg:flex lg:min-h-[56vh] lg:flex-col lg:justify-center lg:py-5"
          >
            <img
              src={b.img}
              alt={b.h}
              loading="lazy"
              className={`mb-5 aspect-[16/10] w-full object-cover ${reduce ? "" : "lg:hidden"}`}
            />
            <div className="px-5 sm:px-8 lg:pl-16 lg:pr-10">
              {/* only the state that owns the viewport centre is at full
                  emphasis; the others recede hard (but stay in flow for a11y) */}
              <div
                className="transition-opacity duration-300"
                style={reduce ? undefined : { opacity: active === i ? 1 : 0.18 }}
              >
                <p className="text-[11px] uppercase tracking-[0.16em] text-golddeep">{b.eyebrow}</p>
                <h2 className="mt-2 font-heading text-[clamp(1.7rem,3.2vw,2.6rem)] font-light leading-[1.12] text-maroon">
                  {b.h}
                </h2>
                <p className="mt-3 max-w-[34rem] text-base leading-relaxed text-ink/75">{b.body}</p>

                {b.h2 && (
                  <div className="mt-6 border-t border-maroon/12 pt-5">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-golddeep">{b.eyebrow2}</p>
                    <h3 className="mt-2 font-heading text-[clamp(1.4rem,2.6vw,2rem)] font-light leading-[1.15] text-maroon">
                      {b.h2}
                    </h3>
                    <p className="mt-2 max-w-[34rem] text-base leading-relaxed text-ink/75">{b.body2}</p>
                  </div>
                )}

                {b.groups && <Groups />}
              </div>

              {/* allergen is never dimmed */}
              {b.groups && <Allergen />}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

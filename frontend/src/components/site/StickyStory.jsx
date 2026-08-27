import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INGREDIENT_GROUPS, ALLERGEN, IMG } from "../../lib/site";
import { Reveal } from "./motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * MODE 2 — the persistent product-story sequence (spec §18). Replaces the old
 * separate "story" + "ingredients" blocks with ONE sticky editorial run: the
 * Khajuri stays as a visual anchor on the left while the copy changes on the
 * right; a scrubbed GSAP timeline crossfades + drifts the anchor between
 * approved states (whole -> macro -> detail). No pin, so it releases cleanly.
 * Mobile: a compact stack with an inline image only where it adds new info.
 */
const STATES = [
  {
    key: "what",
    eyebrow: "Our story",
    h: "What is Khajuri?",
    body:
      "A handcrafted food from the Mithila and Terai plains — pressed by hand at home for family, for guests, and for celebrations like Chhath. Not the dried date; a savoury-sweet floret with its own name and its own history.",
    img: IMG.makeShape3,
    showImgMobile: true,
  },
  {
    key: "roots",
    eyebrow: "Heritage",
    h: "Festival roots. Everyday enjoyment.",
    body:
      "If you grew up in Mithila or the Terai, you already know the smell of the kitchen before Chhath — the aunties pressing floret after floret in a mould older than any of us. We didn't think a tradition this good should have to wait for a season.",
    img: IMG.makeShape1,
  },
  {
    key: "craft",
    eyebrow: "The craft",
    h: "Made the traditional way.",
    body:
      "Still handcrafted in small batches, in the same carved wooden mould, fried-to-order the way our elders did it. Nothing mass-produced, nothing rushed.",
    img: IMG.makeShape2,
  },
  {
    key: "ingredients",
    eyebrow: "What goes in",
    h: "11 real ingredients.",
    body: "Real ghee and jaggery, whole nuts broken by hand, fresh coconut, and a quiet line of spice.",
    img: IMG.flatlay,
    groups: true,
    showImgMobile: true,
  },
  {
    key: "texture",
    eyebrow: "The bite",
    h: "Crumbly within.",
    body:
      "Break one open and the inside is dense, grainy and handmade — rich, never fluffy. Not a cake, not a bread. A khajuri.",
    img: IMG.makeBreak2,
  },
  {
    key: "everyday",
    eyebrow: "Every day",
    h: "Tea. Coffee. Sharing. Gifting.",
    body:
      "For the morning cup, the afternoon coffee, the road, a guest at the door, a box sent home. Festival roots — made for more moments.",
    img: IMG.lifestyle,
    showImgMobile: true,
  },
];

const Groups = () => {
  const [active, setActive] = useState(-1);
  return (
    <div className="mt-6 divide-y divide-maroon/12" onMouseLeave={() => setActive(-1)}>
      {INGREDIENT_GROUPS.map((g, gi) => (
        <div
          key={g.title}
          onMouseEnter={() => setActive(gi)}
          onFocus={() => setActive(gi)}
          className={`py-3.5 transition-opacity duration-300 ${
            active !== -1 && active !== gi ? "opacity-45" : "opacity-100"
          }`}
        >
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h4 className="font-heading text-base text-maroon">{g.title}</h4>
            <p className="text-xs text-ink/50">{g.note}</p>
          </div>
          <ul className="mt-2 flex flex-wrap gap-2">
            {g.items.map((it) => (
              <li
                key={it}
                className={`rounded-full px-3 py-1.5 text-[13px] text-ink/75 ring-1 transition-colors ${
                  active === gi ? "bg-paper ring-maroon/25" : "bg-paper/70 ring-maroon/10"
                }`}
              >
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="pt-3 text-xs tracking-wide text-ink/55" data-testid="allergen-note">{ALLERGEN}</p>
    </div>
  );
};

export const StickyStory = () => {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const root = useRef(null);
  const panelsRef = useRef(null);
  const imgRefs = useRef([]);
  const bgRef = useRef(null);

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const imgs = imgRefs.current.filter(Boolean);
      if (imgs.length < 2) return;
      gsap.set(imgs, { opacity: 0, scale: 1.1, xPercent: 3 });
      gsap.set(imgs[0], { opacity: 1, scale: 1.03, xPercent: 0 });

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

      const step = 1 / imgs.length;
      for (let i = 1; i < imgs.length; i++) {
        const at = step * i - step * 0.5;
        tl.to(imgs[i - 1], { opacity: 0, scale: 1.1, xPercent: -3, duration: step }, at);
        tl.to(imgs[i], { opacity: 1, scale: 1.03, xPercent: 0, duration: step }, at);
      }
      // faint atmospheric plane drifts slower than the anchor
      if (bgRef.current) tl.fromTo(bgRef.current, { yPercent: -4 }, { yPercent: 4, duration: 1 }, 0);
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="craft" ref={root} className="relative overflow-hidden bg-creamlight" data-testid="sticky-story">
      {/* atmospheric plane */}
      {!reduce && (
        <img
          ref={bgRef}
          src={IMG.flatlay}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.05] blur-2xl"
        />
      )}

      <div className={`relative mx-auto grid max-w-7xl px-5 sm:px-8 lg:gap-16 ${reduce ? "" : "lg:grid-cols-2"}`}>
        {/* sticky product anchor — desktop, feathered into the page (no frame) */}
        <div className={reduce ? "hidden" : "hidden lg:block"}>
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <div className="img-blend relative aspect-[4/5] w-full max-w-[34rem]">
              {STATES.map((p, i) => (
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
          {STATES.map((p, i) => (
            <div
              key={p.key}
              data-index={i}
              className="flex flex-col justify-center py-6 lg:min-h-[68vh] lg:py-12"
            >
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

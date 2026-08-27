import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INGREDIENT_GROUPS, ALLERGEN, STORY, IMG } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * The restored editorial sticky story (spec Part C / SHORTTTT.MOV), rebuilt
 * frameless:
 *   - ONE pinned media area on the left, edges dissolved into the page with a
 *     radial mask (no card, no border, no rounded frame, no cream gutter)
 *   - the story text simply SCROLLS beside it — it is never itself crossfaded,
 *     so old and new lines can't overlap or smear (the old bug)
 *   - a GSAP scrub only crossfades the pinned photo between the five beats
 *   - an understated `01 / 05` progress marker
 *
 * Beat 3 carries the ingredient + allergen transparency. The allergen line is
 * a plain static node (never inside a motion/scroll wrapper) so it is always
 * legible, JS or no JS.
 *
 * Mobile / reduced-motion: no pin. Each beat stacks with its own inline image.
 */
const BEATS = [
  {
    key: "what",
    eyebrow: "Our story",
    h: "What is Khajuri?",
    body:
      "A handcrafted food from the Mithila and Terai plains — a savoury-sweet floret pressed by hand at home for family, for guests, and for festivals like Chhath. Not the dried date; its own food, with its own name and history.",
    img: IMG.group,
  },
  {
    key: "roots",
    eyebrow: "Heritage",
    h: "Festival roots. Everyday enjoyment.",
    body: STORY.paras[1],
    img: IMG.heroSingle,
  },
  {
    key: "ingredients",
    eyebrow: "What goes in",
    h: "11 real ingredients. Nothing hidden.",
    body:
      "Real ghee and jaggery, whole nuts broken by hand, fresh coconut, and a quiet line of spice. That's the whole list.",
    img: IMG.flatlay,
    groups: true,
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
      "For the morning cup, the afternoon coffee, the road, a guest at the door, a box sent home. Festival roots, made for more moments.",
    img: IMG.lifestyle,
  },
];

const Groups = () => (
  <div className="mt-6 grid gap-x-8 gap-y-1 sm:grid-cols-2">
    {INGREDIENT_GROUPS.map((g) => (
      <div key={g.title} className="border-t border-maroon/12 py-3">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h4 className="font-heading text-[15px] text-maroon">{g.title}</h4>
          <p className="text-xs text-ink/50">{g.note}</p>
        </div>
        <ul className="mt-2 flex flex-wrap gap-1.5">
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
  <div className="mt-5 rounded-lg border border-maroon/20 bg-paper px-4 py-3" data-testid="allergen-note">
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
  const imgRefs = useRef([]);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    if (reduce) return;
    // the pinned stage only exists at lg+ (it is display:none below that), so
    // scope the pin/scrub to that breakpoint — gsap.matchMedia re-runs cleanly
    // on resize across it, no reload needed
    const mm = gsap.matchMedia(root);
    mm.add("(min-width: 1024px)", () => {
      const imgs = imgRefs.current.filter(Boolean);
      if (imgs.length < 2) return;

      gsap.set(imgs, { opacity: 0 });
      gsap.set(imgs[0], { opacity: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: colRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: stageRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(BEATS.length - 1, Math.floor(self.progress * BEATS.length));
            setActive(i);
          },
        },
      });

      // crossfade photo i-1 -> i across each fifth of the scroll
      const seg = 1 / imgs.length;
      for (let i = 1; i < imgs.length; i++) {
        const at = seg * i - seg * 0.35;
        tl.to(imgs[i - 1], { opacity: 0, duration: seg * 0.7 }, at);
        tl.to(imgs[i], { opacity: 1, duration: seg * 0.7 }, at);
      }
    });
    return () => mm.revert();
  }, [reduce]);

  return (
    <section id="story" ref={root} className="relative overflow-hidden bg-creamlight" data-testid="sticky-story">
      <div className={`relative mx-auto max-w-7xl px-5 sm:px-8 ${reduce ? "" : "lg:grid lg:grid-cols-2 lg:gap-16"}`}>
        {/* pinned, frameless media — desktop only */}
        {!reduce && (
          <div className="hidden lg:block">
            <div ref={stageRef} className="flex h-screen items-center justify-center">
              <div className="img-blend relative aspect-[4/5] w-full max-w-[32rem]">
                {BEATS.map((b, i) => (
                  <img
                    key={b.key}
                    ref={(el) => (imgRefs.current[i] = el)}
                    src={b.img}
                    alt=""
                    aria-hidden="true"
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={i === 0 ? undefined : { opacity: 0 }}
                  />
                ))}
              </div>
              <p className="absolute bottom-8 left-0 text-xs tracking-[0.2em] text-ink/40">
                {String(active + 1).padStart(2, "0")} <span className="text-ink/25">/ 05</span>
              </p>
            </div>
          </div>
        )}

        {/* the story column — plain scroll, no text crossfade */}
        <div ref={colRef} className="py-12 lg:py-0">
          {BEATS.map((b) => (
            <article
              key={b.key}
              className="flex flex-col justify-center py-8 lg:min-h-[64vh] lg:py-10"
            >
              {/* inline image only on mobile / reduced-motion */}
              <img
                src={b.img}
                alt={b.h}
                loading="lazy"
                className={`img-blend mb-4 aspect-[16/11] w-full object-cover ${reduce ? "max-w-xl" : "lg:hidden"}`}
              />
              {/* plain text — never crossfaded, so it can't smear or depend on
                  an animation state to become readable */}
              <p className="text-[11px] uppercase tracking-[0.24em] text-golddeep">{b.eyebrow}</p>
              <h2 className="mt-3 font-heading text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-[1.12] text-maroon">
                {b.h}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/75 sm:text-lg">{b.body}</p>
              {b.groups && <Groups />}
              {b.groups && <Allergen />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

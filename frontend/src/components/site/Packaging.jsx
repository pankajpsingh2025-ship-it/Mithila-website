import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PACKAGING, IMG } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * "I understand the range" -> "I can receive this."
 * Compact pinned transition: golden khajuri -> sealed pouch pack -> gift bag.
 * Evenly spaced, linear crossfades (scrub: true) so it tracks the scroll 1:1.
 * Layout is a fixed three-row column (caption / stage / body) — the text zones
 * and the image zone never share space, so nothing can overlap.
 */
const STEPS = [
  { src: IMG.goldenWhole, alt: "A whole handcrafted khajuri, deep golden" },
  { src: IMG.packFamily, alt: "Khajuri sealed into its resealable window pouches" },
  { src: IMG.packGift, alt: "The Mithila-art gift bag, packed and ready to give" },
];

export const Packaging = () => {
  const root = useRef(null);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const stepRefs = useRef([]);

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const steps = stepRefs.current;
      gsap.set(steps, { opacity: 0, scale: 0.96 });
      gsap.set(steps[0], { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=1400",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const n = steps.length;
      const step = 0.9 / (n - 1);
      for (let i = 1; i < n; i++) {
        const at = 0.06 + step * (i - 1);
        tl.to(steps[i], { opacity: 1, scale: 1, duration: step }, at);
        tl.to(steps[i - 1], { opacity: 0, scale: 0.96, duration: step }, at);
      }
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  if (reduce) {
    return (
      <section id="packaging" className="relative bg-cream py-20" data-testid="packaging-section">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-golddeep/80">{PACKAGING.eyebrow}</p>
          <h2 className="mt-3 font-heading text-[clamp(1.9rem,4.4vw,3rem)] font-light text-maroon">
            {PACKAGING.headline}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {STEPS.map((s) => (
              <img key={s.src} src={s.src} alt={s.alt} className="h-56 w-full rounded-2xl object-cover" loading="lazy" />
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-md text-sm text-ink/60">{PACKAGING.body}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="packaging" ref={root} className="relative h-[100svh] bg-cream" data-testid="packaging-section">
      <div className="relative flex h-full flex-col items-center justify-between overflow-hidden px-6 py-[8vh] text-center paper-texture">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />

        {/* row 1 — caption */}
        <div className="relative z-10 shrink-0">
          <p className="text-[11px] uppercase tracking-[0.24em] text-golddeep/80">{PACKAGING.eyebrow}</p>
          <h2 className="mt-2 font-heading text-3xl font-light text-maroon sm:text-4xl">{PACKAGING.headline}</h2>
        </div>

        {/* row 2 — image stage (its own flex space; capped so it can't reach the text) */}
        <div className="relative z-10 min-h-0 w-full max-w-md flex-1 py-4">
          {STEPS.map((s, i) => (
            <img
              key={s.src}
              ref={(el) => (stepRefs.current[i] = el)}
              src={s.src}
              alt={s.alt}
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 m-auto h-full w-full object-contain drop-shadow-2xl"
              data-testid={`packaging-step-${i}`}
            />
          ))}
        </div>

        {/* row 3 — body */}
        <p className="relative z-10 max-w-md shrink-0 text-sm text-ink/60">{PACKAGING.body}</p>
      </div>
    </section>
  );
};

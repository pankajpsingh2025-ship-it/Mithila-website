import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PACKAGING, IMG } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * "I understand the range" -> "I can receive this."
 * Compact pinned transition: golden khajuri -> sealed pouch pack -> gift bag.
 * Evenly spaced, linear crossfades (scrub: true) so it tracks the scroll 1:1.
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
  const cap = useRef(null);

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const steps = stepRefs.current;
      gsap.set(steps, { opacity: 0, scale: 0.96 });
      gsap.set(steps[0], { opacity: 1, scale: 1 });
      gsap.set(cap.current, { opacity: 0, y: 14 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(cap.current, { opacity: 1, y: 0, duration: 0.12 }, 0.04);
      const n = steps.length;
      const step = 0.82 / (n - 1);
      for (let i = 1; i < n; i++) {
        const at = 0.1 + step * (i - 1);
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
        </div>
      </section>
    );
  }

  return (
    <section id="packaging" ref={root} className="relative h-[100svh] bg-cream" data-testid="packaging-section">
      <div className="flex h-full items-center justify-center overflow-hidden paper-texture">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-gold/18 blur-3xl" />
        <div className="relative flex w-full max-w-3xl flex-col items-center px-6">
          <p ref={cap} className="absolute top-[9%] text-center">
            <span className="block text-[11px] uppercase tracking-[0.24em] text-golddeep/80">
              {PACKAGING.eyebrow}
            </span>
            <span className="mt-2 block font-heading text-3xl text-maroon sm:text-4xl">
              {PACKAGING.headline}
            </span>
          </p>

          <div className="relative flex h-[min(58vh,28rem)] w-full items-center justify-center">
            {STEPS.map((s, i) => (
              <img
                key={s.src}
                ref={(el) => (stepRefs.current[i] = el)}
                src={s.src}
                alt={s.alt}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute h-full w-auto max-w-[86%] object-contain drop-shadow-2xl"
                data-testid={`packaging-step-${i}`}
              />
            ))}
          </div>

          <p className="absolute bottom-[9%] max-w-md text-center text-sm text-ink/60">
            {PACKAGING.body}
          </p>
        </div>
      </div>
    </section>
  );
};

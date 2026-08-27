import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PACKAGING, IMG } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * "I understand the range" -> "I can receive this."
 * Compact pinned transition: khajuri -> window pouch -> Mithila-art bag.
 * ~180vh total. Reduced-motion falls back to a simple 3-up strip.
 */
export const Packaging = () => {
  const root = useRef(null);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const a = useRef(null);
  const b = useRef(null);
  const c = useRef(null);
  const cap = useRef(null);

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.set(a.current, { opacity: 1, scale: 1 });
      gsap.set(b.current, { opacity: 0, scale: 0.92 });
      gsap.set(c.current, { opacity: 0, scale: 0.92 });
      gsap.set(cap.current, { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=1400",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });
      tl.to(cap.current, { opacity: 1, y: 0, duration: 0.4 }, 0.2)
        .to(a.current, { opacity: 0, scale: 0.92, duration: 0.7 }, 1.0)
        .to(b.current, { opacity: 1, scale: 1, duration: 0.7 }, 1.0)
        .to(b.current, { opacity: 0, scale: 0.92, duration: 0.7 }, 2.1)
        .to(c.current, { opacity: 1, scale: 1, duration: 0.7 }, 2.1);
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
            {[IMG.heroSingle, IMG.pouchWindow, IMG.giftBag].map((src) => (
              <img key={src} src={src} alt="" className="h-56 w-full rounded-2xl object-cover" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="packaging"
      ref={root}
      className="relative h-[100svh] bg-cream"
      data-testid="packaging-section"
    >
      <div className="flex h-full items-center justify-center overflow-hidden paper-texture">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative flex w-full max-w-3xl flex-col items-center px-6">
          <p ref={cap} className="absolute top-[8%] text-center">
            <span className="block text-[11px] uppercase tracking-[0.24em] text-golddeep/80">
              {PACKAGING.eyebrow}
            </span>
            <span className="mt-2 block font-heading text-3xl text-maroon sm:text-4xl">
              {PACKAGING.headline}
            </span>
          </p>

          <div className="relative flex h-[min(60vh,30rem)] w-full items-center justify-center">
            <img ref={a} src={IMG.heroSingle} alt="A single handcrafted khajuri" className="absolute w-[min(52vw,19rem)] rounded-[2rem] object-contain drop-shadow-2xl" />
            <img ref={b} src={IMG.pouchWindow} alt="Khajuri sealed in its resealable window pouch" className="absolute h-full w-auto max-w-[78%] object-contain drop-shadow-2xl" data-testid="packaging-pouch" />
            <img ref={c} src={IMG.giftBag} alt="The Mithila.Foods Mithila-art bag, ready to gift" className="absolute h-full w-auto max-w-[92%] object-contain drop-shadow-2xl" data-testid="packaging-bag" />
          </div>

          <p className="absolute bottom-[10%] max-w-md text-center text-sm text-ink/60">
            {PACKAGING.body}
          </p>
        </div>
      </div>
    </section>
  );
};

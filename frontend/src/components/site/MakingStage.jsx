import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * ONE continuous interactive stage: Shape -> Bake -> Break -> story hand-off.
 * The same cream stage, lighting and centre position stay constant; only the
 * product state and the very-low-opacity atmospheric background echo change.
 *
 * Pinned via GSAP ScrollTrigger. Total scroll ~200vh mobile / ~270vh desktop.
 */
export const MakingStage = () => {
  const root = useRef(null);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const moldRef = useRef(null);
  const rawRef = useRef(null);
  const bakedRef = useRef(null);
  const brokenRef = useRef(null);

  const bgShape = useRef(null);
  const bgBake = useRef(null);
  const bgBreak = useRef(null);

  const hShape = useRef(null);
  const hBake = useRef(null);
  const hBreak = useRef(null);
  const hStory = useRef(null);

  useLayoutEffect(() => {
    if (reduce) return;
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        const { isDesktop } = context.conditions;
        const distance = isDesktop ? 2200 : 1600;

        gsap.set(moldRef.current, { opacity: 1 });
        gsap.set([rawRef.current, bakedRef.current, brokenRef.current], { opacity: 0 });
        gsap.set(bgShape.current, { opacity: 0.09 });
        gsap.set([bgBake.current, bgBreak.current], { opacity: 0 });
        gsap.set([hShape.current, hBake.current, hBreak.current, hStory.current], { opacity: 0, y: 18 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=" + distance,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        // SHAPE
        tl.to(hShape.current, { opacity: 1, y: 0, duration: 0.4 }, 0.1)
          .to(moldRef.current, { opacity: 0, duration: 0.6 }, 1.0)
          .to(rawRef.current, { opacity: 1, duration: 0.6 }, 1.0)
          .to(hShape.current, { opacity: 0, y: -18, duration: 0.4 }, 1.7)
          .to(bgShape.current, { opacity: 0, duration: 0.8 }, 1.6)
          .to(bgBake.current, { opacity: 0.09, duration: 0.8 }, 1.6);

        // BAKE
        tl.to(hBake.current, { opacity: 1, y: 0, duration: 0.4 }, 1.9)
          .to(rawRef.current, { opacity: 0, duration: 0.9 }, 2.2)
          .to(bakedRef.current, { opacity: 1, duration: 0.9 }, 2.2)
          .to(hBake.current, { opacity: 0, y: -18, duration: 0.4 }, 3.6)
          .to(bgBake.current, { opacity: 0, duration: 0.8 }, 3.5)
          .to(bgBreak.current, { opacity: 0.09, duration: 0.8 }, 3.5);

        // BREAK
        tl.to(hBreak.current, { opacity: 1, y: 0, duration: 0.4 }, 3.9)
          .to(bakedRef.current, { opacity: 0, duration: 0.7 }, 4.2)
          .to(brokenRef.current, { opacity: 1, duration: 0.7 }, 4.2)
          .to(hBreak.current, { opacity: 0, y: -18, duration: 0.4 }, 5.1);

        // BREAK -> STORY hand-off
        tl.to(brokenRef.current, { scale: 0.78, yPercent: -8, duration: 0.8 }, 5.2)
          .to(bgBreak.current, { opacity: 0.05, duration: 0.6 }, 5.2)
          .to(hStory.current, { opacity: 1, y: 0, duration: 0.6 }, 5.5);

        return () => tl.kill();
      }
    );

    return () => mm.revert();
  }, [reduce]);

  if (reduce) {
    return (
      <section id="making" className="relative bg-creamlight py-24" data-testid="making-stage">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <img
            src={IMG.broken}
            alt="Handcrafted khajuri broken open, showing its crumbly interior"
            className="mx-auto w-[min(80vw,26rem)] rounded-[2rem] drop-shadow-2xl"
          />
          <div className="mt-10 space-y-6">
            {[
              ["Shape it", "Made the traditional way."],
              ["Bake it", "Watch tradition turn golden."],
              ["Break it open", "See what's inside."],
            ].map(([h, s]) => (
              <div key={h}>
                <h2 className="font-heading text-2xl text-maroon">{h}</h2>
                <p className="text-sm text-ink/60">{s}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 font-heading text-[clamp(1.8rem,5vw,3rem)] font-light text-maroon">
            Tradition shouldn't have a season.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="making"
      ref={root}
      className="relative h-[100svh] overflow-hidden bg-creamlight paper-texture"
      data-testid="making-stage"
    >
      {/* atmospheric background echoes — very low opacity, oversized, blurred */}
      <div className="pointer-events-none absolute inset-0">
        <img ref={bgShape} src={IMG.rawMold} alt="" aria-hidden="true" className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 object-cover blur-[3px]" />
        <img ref={bgBake} src={IMG.group} alt="" aria-hidden="true" className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 object-cover blur-[3px]" />
        <img ref={bgBreak} src={IMG.texture} alt="" aria-hidden="true" className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 object-cover blur-[3px]" />
        <div className="absolute inset-0 bg-creamlight/45" />
      </div>

      <div className="pointer-events-none absolute -top-24 -right-24 h-[32rem] w-[32rem] rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-heritage/10 blur-3xl" />

      {/* foreground product — centre position held constant across phases */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-[min(66vw,25rem)] w-[min(66vw,25rem)]">
          <img ref={moldRef} src={IMG.rawMold} alt="Khajuri shaped in a traditional wooden mould" className="absolute inset-0 h-full w-full rounded-[2rem] object-cover drop-shadow-2xl" data-testid="making-shape" />
          <img ref={rawRef} src={IMG.rawDough} alt="Raw, hand-pressed khajuri" className="absolute inset-0 h-full w-full rounded-[2rem] object-cover drop-shadow-2xl" data-testid="making-raw" />
          <img ref={bakedRef} src={IMG.heroSingle} alt="Golden, freshly baked khajuri" className="absolute inset-0 h-full w-full rounded-[2rem] object-cover drop-shadow-2xl" data-testid="making-baked" />
          <img ref={brokenRef} src={IMG.broken} alt="Khajuri broken open, showing its crumbly interior" className="absolute inset-0 h-full w-full rounded-[2rem] object-cover drop-shadow-2xl" data-testid="making-broken" />
        </div>
      </div>

      {/* headings — same slot, one at a time */}
      <div className="absolute inset-x-0 top-[12%] z-20 px-6 text-center">
        <div ref={hShape}>
          <p className="text-[11px] uppercase tracking-[0.26em] text-golddeep/80">Phase one</p>
          <h2 className="mt-2 font-heading text-4xl font-light text-maroon sm:text-5xl">Shape it</h2>
          <p className="mt-1 text-sm text-ink/60">Made the traditional way.</p>
        </div>
        <div ref={hBake} className="absolute inset-x-0 top-0">
          <p className="text-[11px] uppercase tracking-[0.26em] text-golddeep/80">Phase two</p>
          <h2 className="mt-2 font-heading text-4xl font-light text-maroon sm:text-5xl">Bake it</h2>
          <p className="mt-1 text-sm text-ink/60">Watch tradition turn golden.</p>
        </div>
        <div ref={hBreak} className="absolute inset-x-0 top-0">
          <p className="text-[11px] uppercase tracking-[0.26em] text-golddeep/80">Phase three</p>
          <h2 className="mt-2 font-heading text-4xl font-light text-maroon sm:text-5xl">Break it open</h2>
          <p className="mt-1 text-sm text-ink/60">See what's inside.</p>
        </div>
      </div>

      <div ref={hStory} className="absolute inset-x-0 bottom-[14%] z-20 px-6 text-center">
        <h2 className="mx-auto max-w-2xl font-heading text-[clamp(2rem,5.5vw,3.6rem)] font-light leading-[1.05] text-maroon">
          Tradition shouldn't have a season.
        </h2>
      </div>
    </section>
  );
};

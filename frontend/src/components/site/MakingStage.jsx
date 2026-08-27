import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * ONE continuous interactive stage: Shape -> Bake -> Break -> story hand-off.
 * Same cream stage, same centre position, same lighting throughout — only the
 * product state and a very-low-opacity atmospheric background echo change.
 *
 * - nine ordered frames, evenly spaced, linear crossfades (scrub:true) so a
 *   small scroll always moves the product a small, even amount
 * - exactly ONE phase heading is visible at any time: each fades fully out and
 *   leaves a short gap before the next fades in (no stacking / overlap)
 */
const FRAMES = [
  { src: IMG.makeShape1, phase: 0, alt: "A ball of khajuri dough on a carved wooden mould" },
  { src: IMG.makeShape2, phase: 0, alt: "Pressing the dough into a traditional Khajuri mould" },
  { src: IMG.makeShape3, phase: 0, alt: "The finished raw khajuri, hand-pressed with its pattern" },
  { src: IMG.makeBake1, phase: 1, alt: "Raw khajuri, pale, ready for the oven" },
  { src: IMG.makeBake2, phase: 1, alt: "Khajuri part-baked, turning pale gold" },
  { src: IMG.makeBake3, phase: 1, alt: "Khajuri baked to a warm gold" },
  { src: IMG.makeBake4, phase: 1, alt: "Khajuri fully baked, deep golden" },
  { src: IMG.makeBreak1, phase: 2, alt: "Golden khajuri with a first crack across the middle" },
  { src: IMG.makeBreak2, phase: 2, alt: "Khajuri broken open, showing its crumbly interior" },
];

const PHASES = [
  { k: "Phase one", h: "Shape it", s: "Made the traditional way.", win: [0.0, 0.27] },
  { k: "Phase two", h: "Bake it", s: "Watch tradition turn golden.", win: [0.34, 0.6] },
  { k: "Phase three", h: "Break it open", s: "See what's inside.", win: [0.67, 0.84] },
];

const FADE = 0.035; // fraction of the timeline used for each heading fade

export const MakingStage = () => {
  const root = useRef(null);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const frameRefs = useRef([]);
  const bgRefs = useRef([]);
  const headRefs = useRef([]);
  const storyRef = useRef(null);

  useLayoutEffect(() => {
    if (reduce) return;
    const mm = gsap.matchMedia();

    mm.add(
      { isMobile: "(max-width: 767px)", isDesktop: "(min-width: 768px)" },
      (context) => {
        const { isDesktop } = context.conditions;
        // total Shape+Bake+Break scroll: ~250vh desktop / ~200vh mobile
        const distance = isDesktop ? 2200 : 1650;

        const frames = frameRefs.current;
        const bgs = bgRefs.current;
        const heads = headRefs.current;
        const N = frames.length;

        gsap.set(frames, { opacity: 0 });
        gsap.set(frames[0], { opacity: 1 });
        gsap.set(bgs, { opacity: 0 });
        gsap.set(bgs[0], { opacity: 0.08 });
        gsap.set(heads, { opacity: 0, y: 12 });
        gsap.set(storyRef.current, { opacity: 0, y: 18 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=" + distance,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // ---- product frames: even, continuous crossfade across 0 -> 0.86 ----
        const seqEnd = 0.86;
        const step = seqEnd / (N - 1);
        for (let i = 1; i < N; i++) {
          const at = step * i - step * 0.5;
          tl.to(frames[i], { opacity: 1, duration: step }, at);
          tl.to(frames[i - 1], { opacity: 0, duration: step }, at);
          const p = FRAMES[i].phase;
          const pp = FRAMES[i - 1].phase;
          if (p !== pp) {
            tl.to(bgs[pp], { opacity: 0, duration: step * 1.6 }, at);
            tl.to(bgs[p], { opacity: 0.08, duration: step * 1.6 }, at);
          }
        }

        // ---- phase headings: strictly one at a time, with a gap between ----
        PHASES.forEach((ph, i) => {
          const [inAt, outAt] = ph.win;
          tl.fromTo(
            heads[i],
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: FADE },
            inAt
          );
          tl.to(heads[i], { opacity: 0, y: -12, duration: FADE }, outAt);
        });

        // ---- break -> story hand-off (last ~14%): the broken khajuri sinks
        // back to a soft ghost, the headline takes the centre. This IS the
        // transition beat — the pin releases straight into the Story section. ----
        tl.to(frames[N - 1], { scale: 1.15, opacity: 0.12, yPercent: 0, duration: 0.14 }, seqEnd);
        tl.to(bgs[2], { opacity: 0.05, duration: 0.14 }, seqEnd);
        tl.fromTo(
          storyRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.1 },
          0.88
        );

        return () => tl.kill();
      }
    );

    return () => mm.revert();
  }, [reduce]);

  if (reduce) {
    return (
      <section id="making" className="relative bg-creamlight py-20" data-testid="making-stage">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <img
            src={IMG.makeBreak2}
            alt="Handcrafted khajuri broken open, showing its crumbly interior"
            className="mx-auto w-[min(80vw,24rem)] rounded-[2rem] drop-shadow-2xl"
          />
          <div className="mt-10 space-y-6">
            {PHASES.map((p) => (
              <div key={p.h}>
                <h2 className="font-heading text-2xl text-maroon">{p.h}</h2>
                <p className="text-sm text-ink/60">{p.s}</p>
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
        {[IMG.makeShape2, IMG.makeBake4, IMG.makeBreak2].map((src, i) => (
          <img
            key={src}
            ref={(el) => (bgRefs.current[i] = el)}
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 object-cover blur-[4px]"
          />
        ))}
        <div className="absolute inset-0 bg-creamlight/55" />
      </div>

      <div className="pointer-events-none absolute -top-24 -right-24 h-[30rem] w-[30rem] rounded-full bg-gold/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-heritage/10 blur-3xl" />

      {/* foreground product — centre position held constant across every frame */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-[min(72vw,26rem)] w-[min(72vw,26rem)]">
          {FRAMES.map((f, i) => (
            <img
              key={f.src}
              ref={(el) => (frameRefs.current[i] = el)}
              src={f.src}
              alt={f.alt}
              loading={i < 2 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full rounded-[2rem] object-cover drop-shadow-2xl"
              data-testid={`making-frame-${i}`}
            />
          ))}
        </div>
      </div>

      {/* phase headings — all share one slot; the timeline shows exactly one */}
      <div className="absolute inset-x-0 top-[10%] z-20 h-24 px-6 text-center">
        {PHASES.map((p, i) => (
          <div
            key={p.h}
            ref={(el) => (headRefs.current[i] = el)}
            className="absolute inset-x-0 top-0"
            style={{ opacity: 0 }}
          >
            <p className="text-[11px] uppercase tracking-[0.26em] text-golddeep/80">{p.k}</p>
            <h2 className="mt-2 font-heading text-4xl font-light text-maroon sm:text-5xl">{p.h}</h2>
            <p className="mt-1 text-sm text-ink/60">{p.s}</p>
          </div>
        ))}
      </div>

      <div
        ref={storyRef}
        className="absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-6 text-center"
        style={{ opacity: 0 }}
      >
        <h2 className="mx-auto max-w-3xl font-heading text-[clamp(2.2rem,6vw,4rem)] font-light leading-[1.05] text-maroon">
          Tradition shouldn't have a season.
        </h2>
      </div>
    </section>
  );
};

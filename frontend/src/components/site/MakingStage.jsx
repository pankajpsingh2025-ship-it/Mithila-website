import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * ONE continuous interactive stage: Shape -> Bake -> Break -> story hand-off.
 * The same cream stage, lighting and centre position stay constant; only the
 * product state and a very-low-opacity atmospheric background echo change.
 *
 * The nine product frames are evenly spaced across the pinned scroll and
 * crossfaded linearly (scrub: true, ease "none") so a small scroll always
 * moves the product a small, even amount — never "nothing, nothing, jump".
 */

// ordered frames + which phase each belongs to
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
  { k: "Phase one", h: "Shape it", s: "Made the traditional way." },
  { k: "Phase two", h: "Bake it", s: "Watch tradition turn golden." },
  { k: "Phase three", h: "Break it open", s: "See what's inside." },
];

export const MakingStage = () => {
  const root = useRef(null);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const frameRefs = useRef([]);
  const bgRefs = useRef([]); // 3 echoes
  const headRefs = useRef([]); // 3 phase headings
  const storyRef = useRef(null);

  useLayoutEffect(() => {
    if (reduce) return;
    const mm = gsap.matchMedia();

    mm.add(
      { isMobile: "(max-width: 767px)", isDesktop: "(min-width: 768px)" },
      (context) => {
        const { isDesktop } = context.conditions;
        const distance = isDesktop ? 2600 : 1950;

        const frames = frameRefs.current;
        const bgs = bgRefs.current;
        const heads = headRefs.current;
        const N = frames.length;

        gsap.set(frames, { opacity: 0 });
        gsap.set(frames[0], { opacity: 1 });
        gsap.set(bgs, { opacity: 0 });
        gsap.set(bgs[0], { opacity: 0.08 });
        gsap.set(heads, { opacity: 0, y: 14 });
        gsap.set(heads[0], { opacity: 1, y: 0 });
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

        // total timeline is 1 unit; reserve the last 12% for the story hand-off
        const seqEnd = 0.86;
        const step = seqEnd / (N - 1); // even spacing between frames

        for (let i = 1; i < N; i++) {
          const at = step * i - step * 0.5; // start the crossfade slightly before the mark
          tl.to(frames[i], { opacity: 1, duration: step }, at);
          tl.to(frames[i - 1], { opacity: 0, duration: step }, at);

          // background echo follows the phase of the frame we're arriving at
          const phase = FRAMES[i].phase;
          const prevPhase = FRAMES[i - 1].phase;
          if (phase !== prevPhase) {
            tl.to(bgs[prevPhase], { opacity: 0, duration: step * 1.4 }, at);
            tl.to(bgs[phase], { opacity: 0.08, duration: step * 1.4 }, at);
            // headings crossfade on the same beat
            tl.to(heads[prevPhase], { opacity: 0, y: -14, duration: step }, at);
            tl.to(heads[phase], { opacity: 1, y: 0, duration: step }, at);
          }
        }

        // Break -> story: broken khajuri eases back + up, headline fades in
        tl.to(frames[N - 1], { scale: 0.8, yPercent: -6, duration: 0.14 }, seqEnd);
        tl.to(heads[2], { opacity: 0, y: -14, duration: 0.08 }, seqEnd + 0.02);
        tl.to(bgs[2], { opacity: 0.04, duration: 0.14 }, seqEnd);
        tl.to(storyRef.current, { opacity: 1, y: 0, duration: 0.12 }, seqEnd + 0.04);

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
        <div className="relative h-[min(68vw,24rem)] w-[min(68vw,24rem)]">
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

      {/* phase headings — same slot, one visible at a time */}
      <div className="absolute inset-x-0 top-[11%] z-20 px-6 text-center">
        {PHASES.map((p, i) => (
          <div
            key={p.h}
            ref={(el) => (headRefs.current[i] = el)}
            className={i === 0 ? "" : "absolute inset-x-0 top-0"}
          >
            <p className="text-[11px] uppercase tracking-[0.26em] text-golddeep/80">{p.k}</p>
            <h2 className="mt-2 font-heading text-4xl font-light text-maroon sm:text-5xl">{p.h}</h2>
            <p className="mt-1 text-sm text-ink/60">{p.s}</p>
          </div>
        ))}
      </div>

      <div ref={storyRef} className="absolute inset-x-0 bottom-[13%] z-20 px-6 text-center">
        <h2 className="mx-auto max-w-2xl font-heading text-[clamp(2rem,5.5vw,3.6rem)] font-light leading-[1.05] text-maroon">
          Tradition shouldn't have a season.
        </h2>
      </div>
    </section>
  );
};

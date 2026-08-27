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
  { src: IMG.makeBake2, phase: 1, alt: "Khajuri part-baked, turning pale gold" },
  { src: IMG.makeBake4, phase: 1, alt: "Khajuri fully baked, deep golden" },
  { src: IMG.makeBreak1, phase: 2, alt: "Golden khajuri with a first crack across the middle" },
  { src: IMG.makeBreak2, phase: 2, alt: "Khajuri broken open, showing its crumbly interior" },
];

const PHASES = [
  { k: "Phase one", h: "Shape it", s: "Made the traditional way.", win: [0.0, 0.30] },
  { k: "Phase two", h: "Bake it", s: "Watch tradition turn golden.", win: [0.37, 0.58] },
  { k: "Phase three", h: "Break it open", s: "See what's inside.", win: [0.66, 0.86] },
];

const FADE = 0.035; // fraction of the timeline used for each heading fade

export const MakingStage = () => {
  const root = useRef(null);
  const stageRef = useRef(null);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const frameRefs = useRef([]);
  const bgRefs = useRef([]);
  const headRefs = useRef([]);
  const storyRef = useRef(null);

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      {
        const frames = frameRefs.current;
        const bgs = bgRefs.current;
        const heads = headRefs.current;
        const N = frames.length;

        gsap.set(frames, { opacity: 0, scale: 1.06 });
        gsap.set(frames[0], { opacity: 1, scale: 1 });
        gsap.set(bgs, { opacity: 0 });
        gsap.set(bgs[0], { opacity: 0.06 });
        gsap.set(heads, { opacity: 0, y: 12 });
        gsap.set(storyRef.current, { opacity: 0, y: 18 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            pin: stageRef.current,
            pinSpacing: false,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // ---- product frames: even, continuous crossfade; the final broken
        // frame is fully held before the story hand-off begins ----
        const seqEnd = 0.82;
        const step = seqEnd / (N - 1);
        for (let i = 1; i < N; i++) {
          const at = step * i - step * 0.5;
          tl.to(frames[i], { opacity: 1, scale: 1, duration: step }, at);
          tl.to(frames[i - 1], { opacity: 0, scale: 1.06, duration: step }, at);
          const p = FRAMES[i].phase;
          const pp = FRAMES[i - 1].phase;
          if (p !== pp) {
            tl.to(bgs[pp], { opacity: 0, duration: step * 1.6 }, at);
            tl.to(bgs[p], { opacity: 0.06, duration: step * 1.6 }, at);
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

        // ---- break -> story hand-off (last ~12%): the broken khajuri (held
        // fully from ~0.7 to ~0.86) sinks back to a soft ghost while the
        // headline takes the centre. The pin releases straight into Story. ----
        tl.to(frames[N - 1], { scale: 1.18, opacity: 0.12, duration: 0.12 }, 0.88);
        tl.to(bgs[2], { opacity: 0.05, duration: 0.12 }, 0.88);
        tl.fromTo(
          storyRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.1 },
          0.9
        );

        return () => tl.kill();
      }
    }, root);

    return () => ctx.revert();
  }, [reduce]);

  if (reduce) {
    const stills = [
      { src: IMG.makeShape3, ...PHASES[0] },
      { src: IMG.makeBake4, ...PHASES[1] },
      { src: IMG.makeBreak2, ...PHASES[2] },
    ];
    return (
      <section id="making" className="relative bg-creamlight py-16" data-testid="making-stage">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {stills.map((s) => (
              <figure key={s.h} className="text-center">
                <img src={s.src} alt={s.h} className="mx-auto w-full rounded-[1.5rem] object-cover drop-shadow-xl" />
                <figcaption className="mt-4">
                  <h2 className="font-heading text-xl text-maroon">{s.h}</h2>
                  <p className="text-sm text-ink/60">{s.s}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-12 text-center font-heading text-[clamp(1.8rem,5vw,3rem)] font-light text-maroon">
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
      className="relative h-[175vh] bg-creamlight md:h-[240vh]"
      data-testid="making-stage"
    >
     <div ref={stageRef} className="relative h-[100svh] overflow-hidden">
      {/* LAYER A — atmospheric echo: oversized, blurred, ~6% */}
      <div className="pointer-events-none absolute inset-0">
        {[IMG.makeShape2, IMG.makeBake4, IMG.makeBreak2].map((src, i) => (
          <img
            key={src}
            ref={(el) => (bgRefs.current[i] = el)}
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[135%] w-[135%] -translate-x-1/2 -translate-y-1/2 object-cover blur-[10px]"
          />
        ))}
      </div>

      {/* LAYER B — the product, full-frame, edges dissolved into the cream page.
          A radial mask feathers the image to transparent; a cream vignette +
          top/bottom fades finish the blend so there's no visible frame. */}
      <div className="absolute left-1/2 top-1/2 z-10 h-[54vh] w-[94vw] -translate-x-1/2 -translate-y-1/2 sm:h-[62vh] sm:w-[min(88vw,60rem)]">
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 82% 82% at 50% 50%, #000 42%, rgba(0,0,0,0.55) 66%, transparent 88%)",
            maskImage:
              "radial-gradient(ellipse 82% 82% at 50% 50%, #000 42%, rgba(0,0,0,0.55) 66%, transparent 88%)",
          }}
        >
          {FRAMES.map((f, i) => (
            <img
              key={f.src}
              ref={(el) => (frameRefs.current[i] = el)}
              src={f.src}
              alt={f.alt}
              loading={i < 2 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover"
              data-testid={`making-frame-${i}`}
            />
          ))}
        </div>
        {/* cream vignette that eats into the edges */}
        <div
          className="pointer-events-none absolute -inset-8"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 38%, rgba(250,241,222,0.65) 72%, #FAF1DE 92%)",
          }}
        />
      </div>

      {/* full-width cream fades top & bottom so the stage bleeds into the page */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-40 bg-gradient-to-b from-creamlight via-creamlight/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-44 bg-gradient-to-t from-creamlight via-creamlight/75 to-transparent" />

      {/* phase headings — one slot, exactly one visible, sat over the fade */}
      <div className="absolute inset-x-0 top-[7%] z-30 h-24 px-6 text-center">
        {PHASES.map((p, i) => (
          <div
            key={p.h}
            ref={(el) => (headRefs.current[i] = el)}
            className="absolute inset-x-0 top-0"
            style={{ opacity: 0 }}
          >
            <p className="text-[11px] uppercase tracking-[0.26em] text-golddeep/80">{p.k}</p>
            <h2 className="mt-2 font-heading text-[clamp(2rem,5vw,3.25rem)] font-light text-maroon">{p.h}</h2>
            <p className="mt-1 text-sm text-ink/65">{p.s}</p>
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
     </div>
    </section>
  );
};

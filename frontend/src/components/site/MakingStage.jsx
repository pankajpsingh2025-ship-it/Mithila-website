import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * ONE continuous, TRUE full-bleed stage: Shape -> Bake -> Break -> story hand-off.
 * The photograph IS the section — it covers the whole viewport under the nav,
 * edge to edge, object-fit:cover, no wrapper box, no mask, no vignette, no card.
 * Only a single full-section gradient sits over it for text contrast; the phase
 * text is composed inside that same canvas. Frames crossfade in place; the last
 * frame + the scrim fade out together for the "Tradition shouldn't have a
 * season." beat, then the pin releases into the story.
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

// object-position so the subject stays in frame when the photo is cropped to
// whatever the viewport shape is
const FOCUS = "center 45%";

export const MakingStage = () => {
  const root = useRef(null);
  const stageRef = useRef(null);
  const scrimRef = useRef(null);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const frameRefs = useRef([]);
  const headRefs = useRef([]);
  const storyRef = useRef(null);

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const frames = frameRefs.current;
      const heads = headRefs.current;
      const N = frames.length;

      gsap.set(frames, { opacity: 0, scale: 1.04 });
      gsap.set(frames[0], { opacity: 1, scale: 1 });
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

      // ---- product frames: even, continuous crossfade inside the one canvas ----
      const seqEnd = 0.82;
      const step = seqEnd / (N - 1);
      for (let i = 1; i < N; i++) {
        const at = step * i - step * 0.5;
        tl.to(frames[i], { opacity: 1, scale: 1, duration: step }, at);
        tl.to(frames[i - 1], { opacity: 0, scale: 1.04, duration: step }, at);
      }

      // ---- phase headings: strictly one at a time, with a gap between ----
      PHASES.forEach((ph, i) => {
        const [inAt, outAt] = ph.win;
        tl.fromTo(heads[i], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: FADE }, inAt);
        tl.to(heads[i], { opacity: 0, y: -12, duration: FADE }, outAt);
      });

      // ---- break -> story hand-off: the broken khajuri STAYS visible — it eases
      // ~12% smaller and shifts left, the scrim softens, negative space opens on
      // the right, and the closing line fades in there. No blank viewport. ----
      tl.to(frames[N - 1], { scale: 0.88, xPercent: -12, opacity: 1, duration: 0.14 }, 0.86);
      tl.to(scrimRef.current, { opacity: 0.35, duration: 0.14 }, 0.86);
      tl.fromTo(storyRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.12 }, 0.9);
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
      <section id="making" className="bg-creamlight" data-testid="making-stage">
        {stills.map((s) => (
          <div key={s.h} className="relative h-[72svh] w-full overflow-hidden">
            <img src={s.src} alt={s.h} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: FOCUS }} />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(26,10,4,0.62), rgba(26,10,4,0.12) 45%, rgba(26,10,4,0.34))" }}
            />
            <div className="absolute inset-x-0 bottom-[10%] px-6 text-center">
              <p className="text-[11px] uppercase tracking-[0.26em] text-goldbright">{s.k}</p>
              <h2 className="mt-2 font-heading text-[clamp(2rem,6vw,3.25rem)] font-light text-paper">{s.h}</h2>
              <p className="mt-2 text-sm text-cream/85">{s.s}</p>
            </div>
          </div>
        ))}
        <div className="bg-creamlight py-10 text-center">
          <p className="font-heading text-[clamp(1.7rem,4.4vw,2.6rem)] font-light text-maroon">
            Tradition shouldn't have a season.
          </p>
          <p className="mt-2 text-sm text-ink/65">Festival roots. Everyday enjoyment.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="making"
      ref={root}
      className="relative h-[160vh] overflow-x-clip bg-creamlight md:h-[205vh]"
      data-testid="making-stage"
    >
      <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden bg-creamlight">
        {/* the photograph — full canvas, edge to edge, no wrapper, no mask */}
        {FRAMES.map((f, i) => (
          <img
            key={f.src}
            ref={(el) => (frameRefs.current[i] = el)}
            src={f.src}
            alt={f.alt}
            loading={i < 2 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: FOCUS }}
            data-testid={`making-frame-${i}`}
          />
        ))}

        {/* one full-section gradient for text contrast — covers the whole
            viewport, never reads as its own rectangle */}
        <div
          ref={scrimRef}
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(26,10,4,0.66), rgba(26,10,4,0.14) 46%, rgba(26,10,4,0.36))" }}
        />

        {/* phase text — composed inside the canvas */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[9%] z-10 h-28 px-6 text-center">
          {PHASES.map((p, i) => (
            <div
              key={p.h}
              ref={(el) => (headRefs.current[i] = el)}
              className="absolute inset-x-0 bottom-0 px-6"
              style={{ opacity: 0 }}
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-goldbright">{p.k}</p>
              <h2 className="mt-2 font-heading text-[clamp(2rem,5.5vw,3.5rem)] font-light text-paper drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
                {p.h}
              </h2>
              <p className="mt-2 text-sm text-cream/85 sm:text-base">{p.s}</p>
            </div>
          ))}
        </div>

        {/* closing line — sits in the negative space that opens on the right as
            the broken khajuri eases smaller and left. Never a blank viewport. */}
        <div
          ref={storyRef}
          className="pointer-events-none absolute right-[6%] top-1/2 z-10 -translate-y-1/2 px-2 text-right sm:right-[8%]"
          style={{ opacity: 0 }}
        >
          <h2 className="ml-auto max-w-[15rem] font-heading text-[clamp(1.8rem,4.4vw,3rem)] font-light leading-[1.06] text-maroon sm:max-w-sm">
            Tradition shouldn't have a season.
          </h2>
          <p className="mt-3 text-xs text-ink/70 sm:text-sm">Festival roots. Everyday enjoyment.</p>
        </div>
      </div>
    </section>
  );
};

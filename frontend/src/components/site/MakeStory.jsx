import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAKE_STORY } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// one continuous stage: 9 frames, 3 phases
const FRAMES = [
  ...MAKE_STORY.shape.map((f) => ({ ...f, phase: 0 })),
  ...MAKE_STORY.bake.map((f) => ({ ...f, phase: 1 })),
  ...MAKE_STORY.breakOpen.map((f) => ({ ...f, phase: 2 })),
];
const PHASES = [
  { kicker: "Shape it", heading: "Made the traditional way", echo: "/story/shape1.png" },
  { kicker: "Bake it", heading: "Watch tradition turn golden", echo: "/story/bake3.png" },
  { kicker: "Break it open", heading: "See what's inside", echo: "/story/break3.png" },
];

export const MakeStory = () => {
  const root = useRef(null);
  const imgs = useRef([]);
  const caps = useRef([]);
  const heads = useRef([]);
  const echoes = useRef([]);
  const reduced = reducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      window.__lenis && window.__lenis.on("scroll", ScrollTrigger.update);
      gsap.set(imgs.current, { opacity: 0, scale: 1.02 });
      gsap.set(imgs.current[0], { opacity: 1, scale: 1 });
      gsap.set(caps.current, { opacity: 0, y: 8 });
      gsap.set(caps.current[0], { opacity: 1, y: 0 });
      gsap.set(heads.current, { opacity: 0, y: 12 });
      gsap.set(heads.current[0], { opacity: 1, y: 0 });
      gsap.set(echoes.current, { opacity: 0 });
      gsap.set(echoes.current[0], { opacity: 0.08 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.7 },
      });

      for (let i = 1; i < FRAMES.length; i++) {
        tl.to(imgs.current[i], { opacity: 1, scale: 1, duration: 0.8 }, i)
          .to(imgs.current[i - 1], { opacity: 0, scale: 0.99, duration: 0.8 }, i)
          .to(caps.current[i], { opacity: 1, y: 0, duration: 0.5 }, i)
          .to(caps.current[i - 1], { opacity: 0, y: -8, duration: 0.5 }, i);
        // phase change on entering frame 3 and 6
        if (FRAMES[i].phase !== FRAMES[i - 1].phase) {
          const p = FRAMES[i].phase;
          tl.to(heads.current[p], { opacity: 1, y: 0, duration: 0.6 }, i)
            .to(heads.current[p - 1], { opacity: 0, y: -12, duration: 0.6 }, i)
            .to(echoes.current[p], { opacity: 0.08, duration: 0.8 }, i)
            .to(echoes.current[p - 1], { opacity: 0, duration: 0.8 }, i);
        }
      }
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <section id="shape" className="bg-creamlight paper-texture py-20" data-testid="make-story">
        <div className="mx-auto max-w-4xl px-6 grid sm:grid-cols-3 gap-6">
          {[MAKE_STORY.shape[2], MAKE_STORY.bake[2], MAKE_STORY.breakOpen[2]].map((f, i) => (
            <div key={f.src} className="text-center">
              <p className="text-[11px] uppercase tracking-[0.22em] text-golddeep/80">{PHASES[i].kicker}</p>
              <img src={f.src} alt={f.cap} className="mt-3 rounded-2xl drop-shadow-xl" />
            </div>
          ))}
        </div>
        <div id="bake" /><div id="break" />
      </section>
    );
  }

  const mobile = typeof window !== "undefined" && window.innerWidth < 640;
  const height = mobile ? "210vh" : "290vh";

  return (
    <section id="shape" ref={root} className="relative bg-creamlight" style={{ height }} data-testid="make-story">
      <span id="bake" className="absolute" style={{ top: "34%" }} />
      <span id="break" className="absolute" style={{ top: "67%" }} />
      <div className="sticky top-0 h-screen overflow-hidden paper-texture flex items-center justify-center">
        {/* subtle atmospheric echo (only in this stage) */}
        {PHASES.map((p, i) => (
          <img key={p.echo} ref={(el) => (echoes.current[i] = el)} src={p.echo} alt="" aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover scale-125 blur-sm" />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-creamlight/70" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-[36rem] w-[36rem] rounded-full bg-white/40 blur-3xl" />

        {/* phase headings */}
        <div className="absolute inset-x-0 top-[13%] z-20 text-center px-6">
          {PHASES.map((p, i) => (
            <div key={p.kicker} ref={(el) => (heads.current[i] = el)} className="absolute inset-x-0">
              <p className="text-[11px] uppercase tracking-[0.26em] text-golddeep/80">{p.kicker}</p>
              <h2 className="mt-2 font-heading font-light text-maroon text-[clamp(2rem,5.5vw,3.6rem)]">{p.heading}</h2>
            </div>
          ))}
        </div>

        {/* the single evolving product */}
        <div className="relative z-10 h-[min(56vh,30rem)] w-full max-w-3xl">
          {FRAMES.map((f, i) => (
            <img key={f.src + i} ref={(el) => (imgs.current[i] = el)} src={f.src} alt={f.cap}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(72vw,27rem)] rounded-[2rem] drop-shadow-2xl" />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-[15%] z-20 h-8 text-center px-6">
          {FRAMES.map((f, i) => (
            <p key={f.src + i} ref={(el) => (caps.current[i] = el)} className="absolute inset-x-0 text-sm text-ink/65">{f.cap}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

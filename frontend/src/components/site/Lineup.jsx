import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LINEUP, IMG } from "../../lib/site";
import { Reveal } from "./motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * MODE 3 climax. A short controlled hand-off (§32): a single pack drifts to
 * centre and scales, a second pack crossfades in, then the composition RESOLVES
 * into the supplied final lineup image — "one product -> the whole family".
 * Scrubbed, not pinned. Then the lineup is held large, blended into the cream.
 */
export const Lineup = () => {
  const root = useRef(null);
  const handoffRef = useRef(null);
  const p1 = useRef(null);
  const p2 = useRef(null);
  const full = useRef(null);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      // the lineup image is always present; the two packs drift in front of it
      // then dissolve away, "resolving" into the full family.
      gsap.set(p1.current, { opacity: 1, xPercent: -16, scale: 0.8 });
      gsap.set(p2.current, { opacity: 0, xPercent: 18, scale: 0.8 });
      gsap.set(full.current, { scale: 1.05 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: handoffRef.current,
          start: "top 88%",
          end: "top 20%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tl.to(p1.current, { xPercent: -3, scale: 0.98, duration: 0.4 }, 0)
        .to(p2.current, { opacity: 1, xPercent: 3, scale: 0.98, duration: 0.4 }, 0.28)
        .to([p1.current, p2.current], { opacity: 0, scale: 1.08, duration: 0.32 }, 0.6)
        .to(full.current, { scale: 1, duration: 0.4 }, 0.6);
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      id="collection"
      ref={root}
      className="relative overflow-hidden bg-creamlight py-16 sm:py-24"
      data-testid="lineup-section"
    >
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-golddeep">{LINEUP.eyebrow}</p>
          <h2 className="mx-auto max-w-2xl font-heading text-[clamp(2rem,4.8vw,3.6rem)] font-light leading-[1.05] text-maroon">
            {LINEUP.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">{LINEUP.body}</p>
        </Reveal>
      </div>

      {/* the hand-off + resolve */}
      <div ref={handoffRef} className="relative mx-auto mt-10 max-w-[100rem] sm:mt-12">
        {!reduce && (
          <div className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center sm:flex">
            <img ref={p1} src={IMG.packRegular} alt="" aria-hidden="true" className="img-blend absolute h-[46vh] w-auto object-contain" />
            <img ref={p2} src={IMG.packFamily} alt="" aria-hidden="true" className="img-blend absolute h-[46vh] w-auto object-contain" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block [background:radial-gradient(120%_120%_at_50%_50%,transparent_58%,#FAF1DE_100%)]" />
        <div className="mx-auto flex snap-x overflow-x-auto px-4 sm:overflow-visible sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <img
            ref={full}
            src={IMG.finalLineup}
            alt="The full Mithila.Foods range — Regular, Family and Gift packs, with the café Vendor jar"
            className="mx-auto h-[52vh] w-auto max-w-none object-contain sm:h-auto sm:max-h-[72vh] sm:w-full"
            loading="lazy"
            data-testid="lineup-image"
          />
        </div>
        <p className="mt-3 text-center text-[11px] uppercase tracking-[0.16em] text-ink/40 sm:hidden">
          Swipe to see the full range →
        </p>
      </div>
    </section>
  );
};

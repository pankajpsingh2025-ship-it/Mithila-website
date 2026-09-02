import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LINEUP, IMG, WA } from "../../lib/site";
import { Reveal } from "./motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lower-page visual climax: a controlled product hand-off that resolves into the
 * one approved full-range photograph — "one pouch → the whole Mithila.Foods
 * family". Scrubbed (not pinned). The photo is always present; two consumer
 * pouches drift in front of it and dissolve, then the composition settles.
 * The image is edge-blended into the cream so it never reads as a pasted-in
 * rectangle, and it is shown `object-contain` so no packaging is cropped.
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
      gsap.set(p1.current, { opacity: 1, xPercent: -14, scale: 0.82 });
      gsap.set(p2.current, { opacity: 0, xPercent: 16, scale: 0.82 });
      gsap.set(full.current, { scale: 1.02 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: handoffRef.current,
          start: "top 85%",
          end: "top 30%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tl.to(p1.current, { xPercent: -3, scale: 0.98, duration: 0.4 }, 0)
        .to(p2.current, { opacity: 1, xPercent: 3, scale: 0.98, duration: 0.4 }, 0.28)
        .to([p1.current, p2.current], { opacity: 0, scale: 1.06, duration: 0.32 }, 0.62)
        .to(full.current, { scale: 1, duration: 0.4 }, 0.62);
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      id="collection"
      ref={root}
      className="relative overflow-hidden bg-creamlight pt-12 pb-5 scroll-mt-28 sm:pt-14 sm:pb-5"
      data-testid="lineup-section"
    >
      <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-golddeep">{LINEUP.eyebrow}</p>
          <h2 className="mx-auto font-heading text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.05] text-maroon">
            {LINEUP.headline}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/65">{LINEUP.body}</p>
        </Reveal>
      </div>

      {/* hand-off + resolve — the photo dominates, edges feathered into cream */}
      <div ref={handoffRef} className="relative mx-auto mt-4 w-[min(90vw,1320px)] sm:mt-5">
        {!reduce && (
          <div className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center sm:flex">
            <img ref={p1} src={IMG.packRegular} alt="" aria-hidden="true" className="absolute h-[42vh] w-auto object-contain" />
            <img ref={p2} src={IMG.packFamily} alt="" aria-hidden="true" className="absolute h-[42vh] w-auto object-contain" />
          </div>
        )}

        {/* cream feather so the photo dissolves into the page, no hard rectangle */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(120% 115% at 50% 50%, transparent 55%, rgba(250,241,222,0.5) 80%, #FAF1DE 100%)",
          }}
        />
        <img
          ref={full}
          src={IMG.finalLineup}
          alt="The full Mithila.Foods range together — the Regular and Family pouches, the Mithila-art gift bag and loose khajuri, with the café / wholesale jar set behind"
          className="mx-auto h-[54vh] w-full object-contain sm:h-[78vh]"
          data-testid="lineup-image"
        />
      </div>

      <p className="mx-auto mt-4 max-w-3xl px-5 text-center text-xs text-ink/45 sm:px-8">
        The tall jar is our <a href={WA.wholesale} target="_blank" rel="noreferrer" className="text-maroon underline underline-offset-2">café &amp; wholesale</a> pack — the pouches and gift bag are what you order at home.
      </p>
    </section>
  );
};

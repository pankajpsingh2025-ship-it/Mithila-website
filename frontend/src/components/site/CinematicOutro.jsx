import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

export const CinematicOutro = () => {
  const root = useRef(null);
  const cookieRef = useRef(null);
  const pouchRef = useRef(null);
  const bagRef = useRef(null);
  const l1 = useRef(null);
  const l2 = useRef(null);
  const l3 = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      window.__lenis && window.__lenis.on("scroll", ScrollTrigger.update);

      gsap.set(cookieRef.current, { opacity: 0, scale: 0.85, y: -40 });
      gsap.set(pouchRef.current, { opacity: 0, scale: 0.8, y: 120 });
      gsap.set(bagRef.current, { opacity: 0, scale: 0.86, y: 40 });
      gsap.set([l1.current, l2.current, l3.current], { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.7 },
      });

      // 12 restoration: whole khajuri returns
      tl.to(cookieRef.current, { opacity: 1, scale: 1, y: -40, duration: 0.8, ease: "back.out(1.3)" }, 0.1)
        .to(l1.current, { opacity: 1, y: 0, duration: 0.5 }, 0.5)
        // 13 khajuri moves down
        .to(cookieRef.current, { y: 40, duration: 0.9, ease: "power1.in" }, 1.2)
        .to(l1.current, { opacity: 0, y: -16, duration: 0.4 }, 1.2)
        // 14 inner pouch opening appears, khajuri enters
        .to(pouchRef.current, { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power2.out" }, 1.5)
        .to(cookieRef.current, { y: 120, scale: 0.42, opacity: 0, duration: 0.9, ease: "power2.in" }, 1.7)
        // 16 pouch fills / completes
        .to(l2.current, { opacity: 1, y: 0, duration: 0.5 }, 2.5)
        .to(l2.current, { opacity: 0, y: -16, duration: 0.4 }, 3.3)
        // 17 pouch transitions into branded bag
        .to(pouchRef.current, { opacity: 0, scale: 0.9, y: -30, duration: 0.8, ease: "power2.in" }, 3.4)
        .to(bagRef.current, { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "power2.out" }, 3.5)
        // 18 branded bag hero moment
        .to(l3.current, { opacity: 1, y: 0, duration: 0.6 }, 4.2);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[360vh] bg-cream" data-testid="cinematic-outro">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center paper-texture">
        <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[26rem] w-[26rem] rounded-full bg-gold/20 blur-3xl" />

        <div className="relative z-10 flex h-full w-full max-w-3xl flex-col items-center justify-center px-6">
          <p className="absolute top-[10%] text-[11px] uppercase tracking-[0.24em] text-golddeep/80">From our kitchen, sealed fresh</p>

          <div className="relative h-[min(58vh,30rem)] w-full flex items-center justify-center">
            <img ref={cookieRef} src={IMG.heroSingle} alt="Whole khajuri" className="absolute w-[min(56vw,20rem)] rounded-[2rem] drop-shadow-2xl z-20" />
            <img ref={pouchRef} src={IMG.pouchWindow} alt="Khajuri sealed in its pouch" className="absolute h-full w-auto max-w-[80%] object-contain drop-shadow-2xl z-10" data-testid="outro-pouch" />
            <img ref={bagRef} src={IMG.giftBag} alt="Mithila.Foods branded gift bag" className="absolute h-full w-auto max-w-[92%] object-contain drop-shadow-2xl z-10" data-testid="outro-bag" />
          </div>

          <div ref={l1} className="absolute bottom-[14%] text-center">
            <h2 className="font-heading text-3xl sm:text-4xl text-maroon">Whole again</h2>
            <p className="mt-1 text-sm text-ink/60">Every piece, hand-packed with care.</p>
          </div>
          <div ref={l2} className="absolute bottom-[14%] text-center">
            <h2 className="font-heading text-3xl sm:text-4xl text-maroon">Into the pouch</h2>
            <p className="mt-1 text-sm text-ink/60">A resealable window pouch that keeps them crisp.</p>
          </div>
          <div ref={l3} className="absolute bottom-[12%] text-center">
            <p className="text-[11px] uppercase tracking-[0.24em] text-golddeep/80 mb-1">Ready to gift</p>
            <h2 className="font-heading text-3xl sm:text-5xl text-maroon">The Mithila gift bag</h2>
            <p className="mt-2 text-sm text-ink/60 max-w-sm mx-auto">Wrapped in real Mithila art — a story worth handing over.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

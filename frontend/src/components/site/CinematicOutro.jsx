import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { IMG } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

export const CinematicOutro = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      window.__lenis && window.__lenis.on("scroll", ScrollTrigger.update);

      gsap.set(".mfo-whole", { opacity: 0, scale: 0.9 });
      gsap.set(".mfo-pouch", { opacity: 0, scale: 0.85, y: 40 });
      gsap.set(".mfo-gift", { opacity: 0, scale: 0.85, y: 40 });
      gsap.set(".mfo-cta", { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });

      // reform: halves come together
      tl.fromTo(".mfo-half-l", { x: -48, rotate: -10 }, { x: 0, rotate: 0, duration: 1 }, 0)
        .fromTo(".mfo-half-r", { x: 48, rotate: 10 }, { x: 0, rotate: 0, duration: 1 }, 0)
        .to(".mfo-crack", { opacity: 0, duration: 0.4 }, 1.0)
        .to(".mfo-whole", { opacity: 1, scale: 1, duration: 0.5 }, 1.0)
        // into pouch
        .to(".mfo-whole", { scale: 0.5, y: -30, opacity: 0, duration: 0.8 }, 1.8)
        .to(".mfo-pouch", { opacity: 1, scale: 1, y: 0, duration: 0.9 }, 1.9)
        // into gift bag
        .to(".mfo-pouch", { opacity: 0, scale: 0.9, y: -30, duration: 0.7 }, 3.0)
        .to(".mfo-gift", { opacity: 1, scale: 1, y: 0, duration: 0.9 }, 3.1)
        // craving CTA
        .to(".mfo-cta", { opacity: 1, y: 0, duration: 0.8 }, 4.2);
    }, root);
    return () => ctx.revert();
  }, []);

  const scrollToShop = () => {
    const el = document.getElementById("shop");
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={root} className="relative h-[300vh] bg-maroon" data-testid="cinematic-outro">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center paper-texture">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[30rem] w-[30rem] rounded-full bg-golddeep/20 blur-3xl" />

        {/* stage */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="relative h-[min(52vh,26rem)] w-[min(70vw,26rem)] flex items-center justify-center">
            {/* cracked reforming */}
            <div className="mfo-crack absolute inset-0 flex items-center justify-center">
              <div className="relative w-full">
                <img src={IMG.cookieCracked} alt="" className="mfo-half-l w-full drop-shadow-2xl" style={{ clipPath: "inset(0 50% 0 0)" }} />
                <img src={IMG.cookieCracked} alt="" className="mfo-half-r absolute inset-0 w-full drop-shadow-2xl" style={{ clipPath: "inset(0 0 0 50%)" }} />
              </div>
            </div>
            <img src={IMG.cookieWhole} alt="Whole khajuri" className="mfo-whole absolute w-[86%] drop-shadow-2xl" />
            {/* pouch */}
            <div className="mfo-pouch absolute h-full w-[78%] rounded-3xl overflow-hidden ring-1 ring-cream/20 shadow-2xl">
              <img src={IMG.pouches} alt="Khajuri pouch" className="h-full w-full object-cover" />
            </div>
            {/* gift bag */}
            <div className="mfo-gift absolute h-full w-[86%] rounded-3xl overflow-hidden ring-1 ring-cream/20 shadow-2xl">
              <img src={IMG.chai} alt="Mithila gift bag" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="mfo-cta mt-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-goldbright/80 mb-3">From our kitchen to your table</p>
            <h2 className="font-heading font-light text-cream leading-[1] text-[clamp(2.4rem,7vw,4.8rem)]">Craving one?</h2>
            <button onClick={scrollToShop} className="mt-7 inline-flex items-center gap-2 rounded-full bg-goldbright px-8 py-4 text-sm font-medium text-maroon hover:bg-cream transition-colors" data-testid="outro-shop-btn">
              Shop the khajuri <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

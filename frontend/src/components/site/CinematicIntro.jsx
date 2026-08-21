import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, ChevronDown } from "lucide-react";
import { IMG, WA } from "../../lib/site";
import { SunFace } from "./Madhubani";

gsap.registerPlugin(ScrollTrigger);

const CHIPS = [
  { img: "/gen/ing_semolina.jpg", x: -320, y: -180 },
  { img: "/gen/ing_ghee.jpg", x: 300, y: -210 },
  { img: "/gen/ing_jaggery.jpg", x: -380, y: 60 },
  { img: "/gen/ing_coconut.jpg", x: 360, y: 90 },
  { img: "/gen/ing_peanuts.jpg", x: -220, y: 230 },
  { img: "/gen/ing_almonds.jpg", x: 220, y: 250 },
  { img: "/gen/ing_cashew.jpg", x: 20, y: -280 },
];

export const CinematicIntro = () => {
  const root = useRef(null);
  const copyRef = useRef(null);
  const chipsRef = useRef([]);
  const wholeRef = useRef(null);
  const crackRef = useRef(null);
  const crumbsRef = useRef([]);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      window.__lenis && window.__lenis.on("scroll", ScrollTrigger.update);

      gsap.set(wholeRef.current, { scale: 0.2, opacity: 0 });
      gsap.set(crackRef.current, { opacity: 0 });
      gsap.set(chipsRef.current, { opacity: 0 });
      gsap.set(crumbsRef.current, { opacity: 0, scale: 0 });
      chipsRef.current.forEach((c, i) => gsap.set(c, { x: CHIPS[i].x, y: CHIPS[i].y, scale: 0.9 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      tl.to(copyRef.current, { opacity: 0, y: -60, duration: 0.8 }, 0.05)
        .to(chipsRef.current, { opacity: 1, duration: 0.6, stagger: 0.04 }, 0.1)
        .to(chipsRef.current, { x: 0, y: 0, scale: 0.35, duration: 1.4, ease: "power2.in", stagger: 0.03 }, 0.9)
        .to(chipsRef.current, { opacity: 0, duration: 0.5 }, 2.0)
        .to(wholeRef.current, { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.4)" }, 1.9)
        .to(wholeRef.current, { opacity: 0, duration: 0.4 }, 3.4)
        .to(crackRef.current, { opacity: 1, duration: 0.4 }, 3.5)
        .fromTo(".mf-half-l", { x: 0, rotate: 0 }, { x: -48, rotate: -10, duration: 1 }, 3.6)
        .fromTo(".mf-half-r", { x: 0, rotate: 0 }, { x: 48, rotate: 10, duration: 1 }, 3.6)
        .to(crumbsRef.current, { opacity: 1, scale: 1, y: (i) => 30 + i * 12, x: (i) => (i % 2 ? 1 : -1) * (20 + i * 10), duration: 1, stagger: 0.03 }, 3.7);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative h-[320vh] bg-creamlight" data-testid="cinematic-intro">
      <div className="sticky top-0 h-screen overflow-hidden paper-texture">
        {/* ambient */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-[34rem] w-[34rem] rounded-full bg-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-maroon/[0.05]">
          <SunFace className="w-[40rem] h-[40rem]" strokeWidth={2} />
        </div>

        {/* hero copy */}
        <div ref={copyRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-maroon/20 bg-paper/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-maroon">
            <span className="h-1.5 w-1.5 rounded-full bg-heritage" />
            The only heritage Mithila brand in Kathmandu
          </p>
          <h1 className="font-heading font-light text-maroon leading-[0.95] text-[clamp(2.6rem,8vw,6rem)] max-w-4xl">
            Handcrafted khajuri,<br />
            <span className="italic text-golddeep">made the traditional Terai way.</span>
          </h1>
          <p className="mt-6 max-w-md text-base sm:text-lg text-ink/70">Real ghee, real jaggery, a generous handful of nuts. Scroll to see how it's made.</p>
          <div className="mt-8 flex items-center gap-4">
            <a href={WA.order} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-heritage px-7 py-4 text-sm font-medium text-paper hover:bg-maroon transition-colors" data-testid="intro-order-btn">
              <MessageCircle className="w-5 h-5" /> Order on WhatsApp
            </a>
          </div>
          <div className="mt-10 flex items-center gap-2 text-maroon/60 text-xs uppercase tracking-[0.2em] animate-bounce">
            <ChevronDown className="w-4 h-4" /> Scroll
          </div>
        </div>

        {/* ingredient chips */}
        {CHIPS.map((c, i) => (
          <div
            key={i}
            ref={(el) => (chipsRef.current[i] = el)}
            className="absolute left-1/2 top-1/2 -ml-12 -mt-12 h-24 w-24 rounded-full overflow-hidden ring-2 ring-paper shadow-xl z-10"
          >
            <img src={c.img} alt="" className="h-full w-full object-cover" />
          </div>
        ))}

        {/* whole cookie */}
        <img ref={wholeRef} src={IMG.cookieWhole} alt="Khajuri" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(60vw,26rem)] z-10 drop-shadow-2xl" data-testid="intro-cookie" />

        {/* cracked cookie (two halves via CSS clip) */}
        <div ref={crackRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(60vw,26rem)] z-10">
          <img src={IMG.cookieCracked} alt="" className="mf-half-l w-full drop-shadow-2xl" style={{ clipPath: "inset(0 50% 0 0)" }} />
          <img src={IMG.cookieCracked} alt="" className="mf-half-r absolute inset-0 w-full drop-shadow-2xl" style={{ clipPath: "inset(0 0 0 50%)" }} />
        </div>

        {/* crumbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} ref={(el) => (crumbsRef.current[i] = el)} className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-golddeep z-10" />
        ))}
      </div>
    </section>
  );
};

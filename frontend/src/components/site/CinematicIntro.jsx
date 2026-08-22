import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, ChevronDown, ShoppingBag } from "lucide-react";
import { IMG, WA, INGREDIENTS } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

// scattered start positions for the ingredient chips
const POS = [
  { x: -340, y: -170 }, { x: 320, y: -200 }, { x: -400, y: 40 },
  { x: 380, y: 70 }, { x: -250, y: 210 }, { x: 250, y: 230 },
  { x: 30, y: -290 }, { x: -120, y: -230 }, { x: 150, y: -250 }, { x: 0, y: 250 },
];

export const CinematicIntro = () => {
  const root = useRef(null);
  const copyRef = useRef(null);
  const chipsRef = useRef([]);
  const sphereRef = useRef(null);
  const rawRef = useRef(null);
  const bakedRef = useRef(null);
  const brokenRef = useRef(null);
  const rawLabel = useRef(null);
  const bakedLabel = useRef(null);

  const chips = INGREDIENTS.slice(0, 10);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      window.__lenis && window.__lenis.on("scroll", ScrollTrigger.update);

      gsap.set(chipsRef.current, { opacity: 0, scale: 0.9 });
      chipsRef.current.forEach((c, i) => gsap.set(c, { x: POS[i].x, y: POS[i].y }));
      gsap.set(sphereRef.current, { opacity: 0, scale: 0.4 });
      gsap.set(rawRef.current, { opacity: 0, scale: 0.7 });
      gsap.set(bakedRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(brokenRef.current, { opacity: 0, scale: 0.95 });
      gsap.set([rawLabel.current, bakedLabel.current], { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.7 },
      });

      // 1 hero copy leaves
      tl.to(copyRef.current, { opacity: 0, y: -70, duration: 0.7 }, 0.15)
        // 2 ingredients appear scattered
        .to(chipsRef.current, { opacity: 1, duration: 0.5, stagger: 0.03 }, 0.3)
        // 3 convergence to centre + shrink
        .to(chipsRef.current, { x: 0, y: 0, scale: 0.34, duration: 1.3, ease: "power2.inOut", stagger: 0.02 }, 1.1)
        // 4 glass sphere gathers them
        .to(sphereRef.current, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }, 1.9)
        // 5 formation -> raw khajuri
        .to(chipsRef.current, { opacity: 0, scale: 0.2, duration: 0.5 }, 2.9)
        .to(sphereRef.current, { scale: 0.55, opacity: 0, duration: 0.8, ease: "power2.in" }, 2.9)
        .to(rawRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.3)" }, 3.0)
        // 6 raw moment
        .to(rawLabel.current, { opacity: 1, y: 0, duration: 0.5 }, 3.5)
        .to(rawLabel.current, { opacity: 0, y: -16, duration: 0.4 }, 4.3)
        // 7 baking transformation in place
        .to(bakedRef.current, { opacity: 1, scale: 1, duration: 0.9, ease: "power1.inOut" }, 4.2)
        .to(rawRef.current, { opacity: 0, duration: 0.7 }, 4.4)
        // 8 finished hero moment
        .to(bakedLabel.current, { opacity: 1, y: 0, duration: 0.5 }, 4.9)
        // 9 break
        .to(bakedRef.current, { opacity: 0, scale: 1.02, duration: 0.5 }, 5.7)
        .to(bakedLabel.current, { opacity: 0, y: -16, duration: 0.4 }, 5.7)
        .to(brokenRef.current, { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.2)" }, 5.8);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative h-[540vh] bg-creamlight" data-testid="cinematic-intro">
      <div className="sticky top-0 h-screen overflow-hidden paper-texture">
        <div className="pointer-events-none absolute -top-24 -right-24 h-[34rem] w-[34rem] rounded-full bg-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-[30rem] w-[30rem] rounded-full bg-heritage/10 blur-3xl" />

        {/* hero copy */}
        <div ref={copyRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-maroon/20 bg-paper/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-maroon">
            <span className="h-1.5 w-1.5 rounded-full bg-heritage" />
            The only heritage Mithila brand in Kathmandu
          </p>
          <h1 className="font-heading font-light text-maroon leading-[0.95] text-[clamp(2.6rem,8vw,6rem)] max-w-4xl">
            Handcrafted khajuri,<br />
            <span className="italic text-golddeep">made the traditional Terai way.</span>
          </h1>
          <p className="mt-6 max-w-md text-base sm:text-lg text-ink/70">Real ghee, real jaggery, cardamom, cloves &amp; fennel. Scroll to see how it's made.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#shop" className="inline-flex items-center gap-2 rounded-full bg-heritage px-7 py-4 text-sm font-medium text-paper hover:bg-maroon transition-colors" data-testid="intro-shop-btn">
              <ShoppingBag className="w-5 h-5" /> Shop the khajuri
            </a>
            <a href={WA.order} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-maroon/25 px-7 py-4 text-sm font-medium text-maroon hover:bg-maroon hover:text-paper transition-colors" data-testid="intro-order-btn">
              <MessageCircle className="w-5 h-5" /> Order on WhatsApp
            </a>
          </div>
          <div className="mt-10 flex items-center gap-2 text-maroon/60 text-xs uppercase tracking-[0.2em] animate-bounce">
            <ChevronDown className="w-4 h-4" /> Scroll
          </div>
        </div>

        {/* ingredient chips */}
        {chips.map((ing, i) => (
          <div
            key={ing.name}
            ref={(el) => (chipsRef.current[i] = el)}
            className="absolute left-1/2 top-1/2 -ml-12 -mt-12 h-24 w-24 rounded-full overflow-hidden ring-2 ring-paper shadow-xl z-[24]"
            title={ing.name}
          >
            <img src={ing.img} alt={ing.name} className="h-full w-full object-cover" />
          </div>
        ))}

        {/* glass sphere */}
        <div ref={sphereRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-[min(60vw,24rem)] w-[min(60vw,24rem)] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 34% 30%, rgba(255,255,255,0.55), rgba(255,246,230,0.14) 42%, rgba(150,110,70,0.10) 72%, rgba(90,60,35,0.16))",
            boxShadow: "inset 0 -30px 60px rgba(120,80,45,0.25), inset 22px 20px 50px rgba(255,255,255,0.5), 0 30px 60px -25px rgba(74,31,13,0.4)",
            backdropFilter: "blur(2px)",
          }}>
          <span className="absolute left-[22%] top-[16%] h-16 w-10 rounded-full bg-white/60 blur-md" />
        </div>

        {/* raw / baked / broken (real photos) */}
        <img ref={rawRef} src={IMG.rawDough} alt="Raw, unbaked khajuri" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[min(72vw,30rem)] rounded-[2rem] drop-shadow-2xl" data-testid="intro-raw" />
        <img ref={bakedRef} src={IMG.heroSingle} alt="Freshly baked khajuri" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[min(72vw,30rem)] rounded-[2rem] drop-shadow-2xl" data-testid="intro-baked" />
        <img ref={brokenRef} src={IMG.broken} alt="Crisp khajuri broken in two" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[min(74vw,32rem)] rounded-[2rem] drop-shadow-2xl" data-testid="intro-broken" />

        {/* labels */}
        <div ref={rawLabel} className="absolute inset-x-0 top-[15%] z-30 text-center px-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-golddeep/80">Step one</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-maroon">Hand-pressed, unbaked</h2>
          <p className="mt-1 text-sm text-ink/60">Shaped in a traditional wooden mould, one at a time.</p>
        </div>
        <div ref={bakedLabel} className="absolute inset-x-0 top-[15%] z-30 text-center px-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-golddeep/80">Fresh from the oven</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-maroon">Golden, crisp, ready</h2>
          <p className="mt-1 text-sm text-ink/60">Crumbly, buttery, made in small batches.</p>
        </div>
      </div>
    </section>
  );
};

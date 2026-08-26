import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, ShoppingBag, ChevronDown } from "lucide-react";
import { IMG, WA } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

export const ScrollCinematic = () => {
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = useRef(null);
  const copyRef = useRef(null);
  const doughRef = useRef(null);
  const rawRef = useRef(null);
  const goldRef = useRef(null);
  const texRef = useRef(null);
  const l1 = useRef(null);
  const l2 = useRef(null);
  const l3 = useRef(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      window.__lenis && window.__lenis.on("scroll", ScrollTrigger.update);
      gsap.set(doughRef.current, { opacity: 1, scale: 1, y: 0 });
      gsap.set([rawRef.current, goldRef.current, texRef.current], { opacity: 0, scale: 0.98 });
      gsap.set([l1.current, l2.current, l3.current], { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.7 },
      });

      // dough lifts, hero copy leaves
      tl.to(copyRef.current, { opacity: 0, y: -60, duration: 0.6 }, 0.1)
        .to(doughRef.current, { scale: 1.08, y: -10, duration: 0.8 }, 0.2)
        // dough -> raw shaped khajuri
        .to(rawRef.current, { opacity: 1, scale: 1, duration: 0.9, ease: "power1.inOut" }, 1.2)
        .to(doughRef.current, { opacity: 0, duration: 0.7 }, 1.3)
        .to(l1.current, { opacity: 1, y: 0, duration: 0.5 }, 1.7)
        .to(l1.current, { opacity: 0, y: -16, duration: 0.4 }, 2.4)
        // raw -> golden finished
        .to(goldRef.current, { opacity: 1, scale: 1, duration: 0.9, ease: "power1.inOut" }, 2.5)
        .to(rawRef.current, { opacity: 0, duration: 0.7 }, 2.6)
        .to(l2.current, { opacity: 1, y: 0, duration: 0.5 }, 3.0)
        .to(l2.current, { opacity: 0, y: -16, duration: 0.4 }, 3.7)
        // golden -> broken texture
        .to(texRef.current, { opacity: 1, scale: 1, duration: 0.9, ease: "power1.inOut" }, 3.8)
        .to(goldRef.current, { opacity: 0, duration: 0.7 }, 3.9)
        .to(l3.current, { opacity: 1, y: 0, duration: 0.6 }, 4.3);
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imgCls = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-[2rem] drop-shadow-2xl";

  // Reduced-motion: simple static hero
  if (reduced) {
    return (
      <section id="top" className="relative bg-creamlight paper-texture py-24 min-h-screen flex items-center" data-testid="scroll-cinematic">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-heading font-light text-maroon leading-[0.95] text-[clamp(2.4rem,6vw,4.5rem)]">
              Handcrafted khajuri,<br /><span className="italic text-golddeep">the traditional Terai way.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink/70">Real ghee, real jaggery, cardamom, cloves &amp; fennel — made in small batches.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#shop" className="inline-flex items-center gap-2 rounded-full bg-heritage px-7 py-4 text-sm font-medium text-paper"><ShoppingBag className="w-5 h-5" /> Shop the khajuri</a>
              <a href={WA.order} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-maroon/25 px-7 py-4 text-sm font-medium text-maroon"><MessageCircle className="w-5 h-5" /> Order on WhatsApp</a>
            </div>
          </div>
          <img src={IMG.heroSingle} alt="Golden khajuri" className="rounded-[2rem] drop-shadow-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section ref={root} id="top" className="relative h-[520vh] bg-creamlight" data-testid="scroll-cinematic">
      <div className="sticky top-0 h-screen overflow-hidden paper-texture">
        <div className="pointer-events-none absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-full bg-white/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-16 h-[30rem] w-[30rem] rounded-full bg-gold/15 blur-3xl" />

        {/* hero copy (integrated, not deleted) */}
        <div ref={copyRef} className="absolute inset-x-0 top-[13%] z-30 text-center px-6">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-maroon/20 bg-paper/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-maroon">
            <span className="h-1.5 w-1.5 rounded-full bg-heritage" /> Tradition shouldn't have a season
          </p>
          <h1 className="font-heading font-light text-maroon leading-[0.95] text-[clamp(2.2rem,6.5vw,5rem)]">
            Handcrafted khajuri,<br /><span className="italic text-golddeep">made the traditional Terai way.</span>
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="#shop" className="inline-flex items-center gap-2 rounded-full bg-heritage px-7 py-4 text-sm font-medium text-paper hover:bg-maroon transition-colors" data-testid="hero-shop-btn">
              <ShoppingBag className="w-5 h-5" /> Shop the khajuri
            </a>
            <a href={WA.order} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-maroon/25 px-7 py-4 text-sm font-medium text-maroon hover:bg-maroon hover:text-paper transition-colors">
              <MessageCircle className="w-5 h-5" /> Order on WhatsApp
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-maroon/60 text-xs uppercase tracking-[0.2em] animate-bounce">
            <ChevronDown className="w-4 h-4" /> Scroll
          </div>
        </div>

        {/* transformation stack (seamless from the autoplay dough) */}
        <img ref={doughRef} src="/particles/dough.png" alt="fresh khajuri dough" className={`${imgCls} w-[min(52vw,20rem)]`} data-testid="sc-dough" />
        <img ref={rawRef} src={IMG.rawDough} alt="raw, hand-pressed khajuri" className={`${imgCls} w-[min(72vw,30rem)]`} data-testid="sc-raw" />
        <img ref={goldRef} src={IMG.heroSingle} alt="golden, crisp khajuri" className={`${imgCls} w-[min(72vw,30rem)]`} data-testid="sc-gold" />
        <img ref={texRef} src={IMG.broken} alt="khajuri broken open, crumbly within" className={`${imgCls} w-[min(74vw,32rem)]`} data-testid="sc-tex" />

        {/* labels */}
        <div ref={l1} className="absolute inset-x-0 top-[15%] z-30 text-center px-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-golddeep/80">Shaped by hand</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-maroon">The signature flower ridges</h2>
        </div>
        <div ref={l2} className="absolute inset-x-0 top-[15%] z-30 text-center px-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-golddeep/80">Fresh from the oven</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-maroon">Golden. Crisp. Ready.</h2>
        </div>
        <div ref={l3} className="absolute inset-x-0 top-[15%] z-30 text-center px-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-golddeep/80">One honest bite</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-maroon">Crisp outside, rich and crumbly within</h2>
        </div>
      </div>
    </section>
  );
};

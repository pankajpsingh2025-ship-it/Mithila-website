import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Store } from "lucide-react";
import { IMG, WA } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

const ENVS = [
  { img: IMG.cafeJanakpur, name: "Janakpur Junction", tag: "Tea shop • Janakpur" },
  { img: IMG.cafeChiyaSamaj, name: "Chiya Samaj", tag: "Community tea house • Kathmandu" },
  { img: IMG.cafeOotalo, name: "Ootalo Café", tag: "Sip. Stay. Belong." },
  { img: IMG.cafeChiyaExpress, name: "Chiya Express", tag: "Tea shop • Kathmandu" },
  { img: IMG.cafeAkhiJhyal, name: "Akhi Jhyal Café", tag: "Heritage café • Patan" },
];

export const Vendors = () => {
  const root = useRef(null);
  const envRefs = useRef([]);
  const nameRefs = useRef([]);
  const jarRef = useRef(null);
  const introRef = useRef(null);
  const ctaRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      window.__lenis && window.__lenis.on("scroll", ScrollTrigger.update);

      gsap.set(envRefs.current, { opacity: 0 });
      gsap.set(nameRefs.current, { opacity: 0, y: 12 });
      gsap.set(jarRef.current, { opacity: 0, scale: 0.78, rotateY: -20 });
      gsap.set(introRef.current, { opacity: 1, y: 0 });
      gsap.set(ctaRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.8 },
      });

      // PHASE A — jar hero on neutral backdrop, subtle rotation
      tl.to(jarRef.current, { opacity: 1, scale: 1, rotateY: 0, duration: 0.7, ease: "power2.out" }, 0.35)
        .to(jarRef.current, { rotateY: 16, duration: 0.5, ease: "sine.inOut" }, 0.9)
        .to(jarRef.current, { rotateY: -16, duration: 0.5, ease: "sine.inOut" }, 1.4)
        .to(introRef.current, { opacity: 0, y: -40, duration: 0.5 }, 1.7)
        .to(jarRef.current, { opacity: 0, scale: 0.9, rotateY: 0, duration: 0.6, ease: "power2.in" }, 1.9);

      // PHASE B — the same jar, seen in real vendor environments (each photo already holds the jar in-situ)
      const start = 2.1;
      const seg = 0.9;
      tl.to(envRefs.current[0], { opacity: 1, duration: 0.6 }, start)
        .to(nameRefs.current[0], { opacity: 1, y: 0, duration: 0.5 }, start + 0.1);
      for (let i = 1; i < ENVS.length; i++) {
        const at = start + i * seg;
        tl.to(envRefs.current[i], { opacity: 1, duration: seg * 0.7 }, at)
          .to(envRefs.current[i - 1], { opacity: 0, duration: seg * 0.7 }, at)
          .to(nameRefs.current[i], { opacity: 1, y: 0, duration: seg * 0.5 }, at)
          .to(nameRefs.current[i - 1], { opacity: 0, y: -12, duration: seg * 0.5 }, at);
      }

      // PHASE C — B2B CTA
      const end = start + ENVS.length * seg;
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7 }, end);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="vendors" className="relative h-[460vh] bg-ink" data-testid="vendors-section">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: "1400px" }}>
        {/* neutral warm backdrop (phase A) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#241611] via-[#2c1c14] to-[#1c120d]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-golddeep/20 blur-3xl" />

        {/* environment backdrops (phase B) */}
        {ENVS.map((e, i) => (
          <div key={e.name} ref={(el) => (envRefs.current[i] = el)} className="absolute inset-0">
            <img src={e.img} alt={`Khajuri at ${e.name}`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/45" />
          </div>
        ))}

        {/* intro line */}
        <div ref={introRef} className="absolute inset-x-0 top-[14%] z-20 text-center px-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-goldbright/90">Trusted across Kathmandu</p>
          <h2 className="mt-3 font-heading font-light text-cream leading-[1.02] text-[clamp(2rem,5.5vw,4rem)]">
            Loved by <span className="italic text-goldbright">35+ cafés</span> &amp; tea shops
          </h2>
        </div>

        {/* rotating jar hero (phase A only) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <img ref={jarRef} src={IMG.jarHero} alt="Mithila.Foods khajuri jar" className="h-[min(62vh,32rem)] w-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" style={{ transformStyle: "preserve-3d" }} data-testid="vendor-jar" />
        </div>

        {/* environment name labels */}
        <div className="absolute inset-x-0 bottom-[22%] z-20 h-16 text-center px-6">
          {ENVS.map((e, i) => (
            <div key={e.name} ref={(el) => (nameRefs.current[i] = el)} className="absolute inset-x-0">
              <p className="font-heading text-2xl sm:text-3xl text-cream drop-shadow-lg">{e.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-cream/70 mt-1">{e.tag}</p>
            </div>
          ))}
        </div>

        {/* B2B CTA */}
        <div ref={ctaRef} className="absolute inset-x-0 bottom-[11%] z-30 text-center px-6">
          <p className="font-heading text-2xl sm:text-3xl text-cream mb-4 drop-shadow-lg">Could your counter be next?</p>
          <a href={WA.stockist} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-goldbright bg-goldbright/15 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-goldbright backdrop-blur-sm hover:bg-goldbright hover:text-ink transition-colors" data-testid="become-vendor-btn">
            <Store className="h-4 w-4" /> Become a vendor <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

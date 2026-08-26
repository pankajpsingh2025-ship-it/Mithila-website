import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { IMG, WA } from "../../lib/site";

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const HeroVideo = () => {
  const vidRef = useRef(null);
  const [cue, setCue] = useState(false);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => { const p = v.play?.(); if (p && p.catch) p.catch(() => {}); };
    tryPlay();
    // pause when hero leaves viewport, resume when it returns (performance)
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) tryPlay(); else v.pause(); },
      { threshold: 0.15 }
    );
    io.observe(v);
    const t = setTimeout(() => setCue(true), 5200);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  return (
    <section id="top" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-creamlight" data-testid="hero-video">
      <video
        ref={vidRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={IMG.heroVideo}
        poster={IMG.heroPoster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
      />
      {/* top ivory wash — nav legibility + extra safety over any embedded mark */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-creamlight/90 to-transparent" />
      {/* bottom warm wash for copy */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-creamlight via-creamlight/70 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-maroon/20 bg-paper/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-maroon">
            <span className="h-1.5 w-1.5 rounded-full bg-heritage" /> Tradition shouldn't have a season
          </p>
          <h1 className="font-heading font-light text-maroon leading-[0.95] text-[clamp(2.4rem,7vw,5.2rem)]">
            Handcrafted Khajuri.<br /><span className="italic text-golddeep">Rooted in tradition.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-ink/70">A heritage recipe, made for everyday sharing.</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => scrollToId("shape")} className="inline-flex items-center gap-2 rounded-full bg-heritage px-7 py-4 text-sm font-medium text-paper hover:bg-maroon transition-colors" data-testid="hero-shop-btn">
              <ShoppingBag className="w-5 h-5" /> Discover Khajuri
            </button>
            <a href={WA.order} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-maroon/25 px-7 py-4 text-sm font-medium text-maroon hover:bg-maroon hover:text-paper transition-colors">
              <MessageCircle className="w-5 h-5" /> Order on WhatsApp
            </a>
          </div>
          <button onClick={() => scrollToId("shape")} className={`mt-9 inline-flex flex-col items-center gap-1 text-maroon/70 transition-opacity duration-700 ${cue ? "opacity-100" : "opacity-0"}`} data-testid="hero-shape-cue">
            <span className="text-xs uppercase tracking-[0.24em]">Shape it</span>
            <span className="animate-bounce">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
};

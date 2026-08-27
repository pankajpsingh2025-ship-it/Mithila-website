import React, { useEffect, useRef } from "react";
import { MessageCircle, ArrowDown } from "lucide-react";
import { HERO_VIDEO, WA } from "../../lib/site";

/**
 * Hero — "Make It".
 * Approved Cloudinary video (transparent bowl -> ingredients -> dough).
 * - autoplay, muted, playsinline, loops
 * - IntersectionObserver pauses it when scrolled away, resumes when back
 * - the video's baked-in "Mithila.Foods" logo sits near the top of the frame,
 *   so the media is scaled up and pushed down (object-position) to crop it out.
 *
 * Entrance uses CSS (.rise-in) so the copy is never left invisible if a
 * scripted animation stalls.
 */
export const HeroVideo = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    const sec = sectionRef.current;
    if (!v || !sec) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    v.muted = true;
    const tryPlay = () => {
      if (reduce) return;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else v.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(sec);
    tryPlay();

    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-creamlight"
      data-testid="hero-video"
    >
      {/* video layer — scaled + shifted down to crop the baked-in logo band */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          style={{ objectPosition: "50% 78%", transform: "scale(1.08)" }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_VIDEO.poster}
        >
          <source src={HERO_VIDEO.mp4} type="video/mp4" />
          <source src={HERO_VIDEO.mov} type="video/quicktime" />
        </video>
        {/* warm wash so the copy stays readable + a top fade that also keeps
            the embedded-logo band reading as clean cream */}
        <div className="absolute inset-0 bg-gradient-to-b from-creamlight/70 via-creamlight/15 to-creamlight/70" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-creamlight via-creamlight/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-creamlight to-transparent" />
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 pt-24 pb-28 text-center">
        <p className="rise-in rise-in-1 mb-6 inline-flex items-center gap-2 rounded-full border border-maroon/20 bg-paper/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-maroon backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-heritage" />
          Handcrafted Mithila khajuri
        </p>

        <h1 className="font-heading text-[clamp(2.6rem,8vw,5.4rem)] font-light leading-[0.98] text-maroon">
          <span className="rise-in rise-in-1 block">Handcrafted Khajuri.</span>
          <span className="rise-in rise-in-2 block italic text-golddeep">Rooted in tradition.</span>
        </h1>

        <p className="rise-in rise-in-3 mt-6 max-w-md text-base text-ink/70 sm:text-lg">
          A heritage recipe, made for everyday sharing.
        </p>

        <div className="rise-in rise-in-3 mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => document.getElementById("making")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full bg-heritage px-7 py-4 text-sm font-medium text-paper transition-colors hover:bg-maroon"
            data-testid="hero-discover-btn"
          >
            Discover Khajuri
          </button>
          <a
            href={WA.order}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-maroon/25 bg-paper/50 px-7 py-4 text-sm font-medium text-maroon backdrop-blur-sm transition-colors hover:bg-maroon hover:text-paper"
            data-testid="hero-whatsapp-btn"
          >
            <MessageCircle className="h-5 w-5" /> Order on WhatsApp
          </a>
        </div>
      </div>

      {/* subtle "Shape it" invitation at the base of the hero */}
      <button
        onClick={() => document.getElementById("making")?.scrollIntoView({ behavior: "smooth" })}
        className="rise-in rise-in-4 absolute inset-x-0 bottom-8 z-10 mx-auto flex w-max flex-col items-center gap-1 text-maroon/60"
        aria-label="Scroll to shape it"
      >
        <span className="text-[11px] uppercase tracking-[0.28em]">Shape it</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  );
};

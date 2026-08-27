import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowDown } from "lucide-react";
import { HERO_VIDEO, WA } from "../../lib/site";
import { MaskLines } from "./motion";

/**
 * Hero — "Make It".
 * Approved Cloudinary video (transparent bowl -> ingredients -> dough).
 * - autoplay, muted, playsinline, loops
 * - IntersectionObserver pauses it when scrolled away, resumes when back
 * - the video's baked-in "Mithila.Foods" logo sits near the top of the frame,
 *   so the media is scaled up and pushed down (object-position) to crop it out.
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
          style={{ objectPosition: "50% 82%", transform: "scale(1.18)" }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/brief/a13.png"
        >
          <source src={HERO_VIDEO.mp4} type="video/mp4" />
          <source src={HERO_VIDEO.mov} type="video/quicktime" />
        </video>
        {/* warm wash so the copy stays readable, plus a top fade that also
            guarantees the embedded logo area reads as clean cream */}
        <div className="absolute inset-0 bg-gradient-to-b from-creamlight/85 via-creamlight/35 to-creamlight/80" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-creamlight to-transparent" />
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 pt-24 pb-28 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-maroon/20 bg-paper/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-maroon backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-heritage" />
          Handcrafted Mithila khajuri
        </motion.p>

        <h1 className="font-heading font-light leading-[0.98] text-maroon text-[clamp(2.6rem,8vw,5.4rem)]">
          <MaskLines animate delay={0.3} lines={["Handcrafted Khajuri."]} />
          <MaskLines animate delay={0.45} lineClass="italic text-golddeep" lines={["Rooted in tradition."]} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 max-w-md text-base sm:text-lg text-ink/70"
        >
          A heritage recipe, made for everyday sharing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
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
        </motion.div>
      </div>

      {/* subtle "Shape it" invitation at the base of the hero */}
      <motion.button
        onClick={() => document.getElementById("making")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-max flex-col items-center gap-1 text-maroon/60"
        aria-label="Scroll to shape it"
      >
        <span className="text-[11px] uppercase tracking-[0.28em]">Shape it</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.button>
    </section>
  );
};

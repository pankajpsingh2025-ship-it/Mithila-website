import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ArrowDown } from "lucide-react";
import { IMG, WA } from "../../lib/site";
import { MaskLines } from "./motion";
import { SunFace, TriangleBand } from "./Madhubani";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const sunY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const sunRotate = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen overflow-hidden bg-creamlight paper-texture pt-28 sm:pt-32">
      {/* soft warm glows */}
      <div className="pointer-events-none absolute -top-32 -right-24 h-[36rem] w-[36rem] rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-[30rem] w-[30rem] rounded-full bg-kraft/10 blur-3xl" />

      {/* background madhubani sun */}
      <motion.div style={{ y: sunY, rotate: sunRotate }} className="pointer-events-none absolute -top-10 right-[-6rem] text-maroon/[0.07]">
        <SunFace className="w-[36rem] h-[36rem]" strokeWidth={2} />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center min-h-[calc(100vh-8rem)]">
        {/* copy */}
        <motion.div style={{ y: textY }} className="lg:col-span-6 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-maroon/20 bg-paper/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-maroon"
            data-testid="hero-eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-heritage" />
            The only heritage Mithila brand in Kathmandu
          </motion.p>

          <h1 className="font-heading text-maroon font-light leading-[0.95] text-[clamp(2.6rem,7vw,5.4rem)]" data-testid="hero-heading">
            <MaskLines
              animate
              delay={0.35}
              lines={["Handcrafted khajuri,", "carried from Mithila"]}
            />
            <MaskLines
              animate
              delay={0.6}
              lineClass="italic text-golddeep"
              lines={["to your Kathmandu table."]}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-7 max-w-md text-base sm:text-lg text-ink/70 leading-relaxed"
            data-testid="hero-sub"
          >
            A traditional Terai fried snack, made in small batches with real ghee,
            real jaggery, and a generous handful of nuts — never rushed, never mass-produced.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={WA.order}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-heritage px-7 py-4 text-sm font-medium text-paper transition-all duration-300 hover:bg-maroon hover:shadow-[0_18px_40px_-12px_rgba(74,31,13,0.5)]"
              data-testid="hero-order-btn"
            >
              <MessageCircle className="w-5 h-5" />
              Order on WhatsApp
            </a>
            <button
              onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 text-sm font-medium text-maroon hover:text-golddeep transition-colors"
              data-testid="hero-shop-btn"
            >
              Explore the packs
              <ArrowDown className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>

        {/* imagery */}
        <div className="lg:col-span-6 relative h-[52vh] sm:h-[62vh] lg:h-[78vh]">
          <motion.div
            style={{ y: heroY }}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-4 top-0 bottom-8 arch-frame shadow-[0_40px_90px_-30px_rgba(74,31,13,0.55)] ring-1 ring-maroon/10"
          >
            <motion.img
              src={IMG.hero}
              alt="Handcrafted khajuri on a brass plate"
              style={{ y: bgY }}
              className="h-[118%] w-full object-cover"
              data-testid="hero-image"
            />
          </motion.div>

          {/* floating real product polaroid */}
          <motion.div
            style={{ y: cardY }}
            initial={{ opacity: 0, y: 40, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-2 -left-2 sm:left-0 w-36 sm:w-48 rounded-2xl bg-paper p-2.5 shadow-[0_24px_50px_-18px_rgba(74,31,13,0.5)] ring-1 ring-maroon/10"
          >
            <div className="overflow-hidden rounded-xl">
              <img src={IMG.khajuriSingle} alt="A single khajuri" className="h-28 sm:h-36 w-full object-cover" />
            </div>
            <p className="pt-2 text-center font-heading text-[11px] sm:text-xs text-maroon">Fried fresh, to order</p>
          </motion.div>

          {/* small badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="absolute -top-3 right-2 grid place-items-center h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-maroon text-goldbright shadow-xl"
          >
            <div className="text-center leading-tight">
              <span className="block font-heading text-lg sm:text-xl">Small</span>
              <span className="block text-[9px] uppercase tracking-[0.18em]">batches</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative text-gold/50 mt-2">
        <TriangleBand height={12} />
      </div>
    </section>
  );
};

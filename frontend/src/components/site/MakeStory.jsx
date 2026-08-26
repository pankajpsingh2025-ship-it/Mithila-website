import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAKE_STORY } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ScrollStage = ({ id, kicker, heading, frames, hint }) => {
  const root = useRef(null);
  const imgs = useRef([]);
  const caps = useRef([]);
  const reduced = prefersReduced();

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      window.__lenis && window.__lenis.on("scroll", ScrollTrigger.update);
      gsap.set(imgs.current, { opacity: 0, scale: 1.02 });
      gsap.set(imgs.current[0], { opacity: 1, scale: 1 });
      gsap.set(caps.current, { opacity: 0, y: 10 });
      gsap.set(caps.current[0], { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.7 },
      });
      const seg = 1;
      for (let i = 1; i < frames.length; i++) {
        const at = 0.4 + (i - 1) * seg;
        tl.to(imgs.current[i], { opacity: 1, scale: 1, duration: seg * 0.8 }, at)
          .to(imgs.current[i - 1], { opacity: 0, scale: 0.99, duration: seg * 0.8 }, at)
          .to(caps.current[i], { opacity: 1, y: 0, duration: seg * 0.5 }, at)
          .to(caps.current[i - 1], { opacity: 0, y: -10, duration: seg * 0.5 }, at);
      }
    }, root);
    return () => ctx.revert();
  }, [frames.length, reduced]);

  const height = reduced ? "auto" : `${frames.length * 100 + 30}vh`;

  if (reduced) {
    const last = frames[frames.length - 1];
    return (
      <section id={id} className="relative bg-creamlight paper-texture py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-golddeep/80">{kicker}</p>
          <h2 className="font-heading font-light text-maroon text-[clamp(2rem,5vw,3.4rem)] mb-8">{heading}</h2>
          <img src={last.src} alt={last.cap} className="mx-auto w-[min(70vw,26rem)] rounded-[2rem] drop-shadow-2xl" />
          <p className="mt-4 text-sm text-ink/60">{last.cap}</p>
        </div>
      </section>
    );
  }

  return (
    <section id={id} ref={root} className="relative bg-creamlight" style={{ height }} data-testid={`stage-${id}`}>
      <div className="sticky top-0 h-screen overflow-hidden paper-texture flex items-center justify-center">
        <div className="pointer-events-none absolute -top-24 -left-24 h-[36rem] w-[36rem] rounded-full bg-white/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-[28rem] w-[28rem] rounded-full bg-gold/15 blur-3xl" />

        <div className="absolute inset-x-0 top-[13%] z-20 text-center px-6">
          <p className="text-[11px] uppercase tracking-[0.26em] text-golddeep/80">{kicker}</p>
          <h2 className="mt-2 font-heading font-light text-maroon text-[clamp(2rem,5.5vw,3.6rem)]">{heading}</h2>
        </div>

        <div className="relative h-[min(56vh,30rem)] w-full max-w-3xl">
          {frames.map((f, i) => (
            <img key={f.src} ref={(el) => (imgs.current[i] = el)} src={f.src} alt={f.cap}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(72vw,28rem)] rounded-[2rem] drop-shadow-2xl" />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-[16%] z-20 h-10 text-center px-6">
          {frames.map((f, i) => (
            <p key={f.src} ref={(el) => (caps.current[i] = el)} className="absolute inset-x-0 text-sm text-ink/65">{f.cap}</p>
          ))}
        </div>

        {hint && (
          <div className="absolute inset-x-0 bottom-[7%] text-center text-xs uppercase tracking-[0.24em] text-maroon/55">
            {hint} <span className="inline-block animate-bounce">↓</span>
          </div>
        )}
      </div>
    </section>
  );
};

export const MakeStory = () => {
  return (
    <>
      <ScrollStage id="shape" kicker="Shape it" heading="Made the traditional way" frames={MAKE_STORY.shape} hint="Scroll to bake" />
      <ScrollStage id="bake" kicker="Bake it" heading="Golden, in small batches" frames={MAKE_STORY.bake} hint="Scroll to break it open" />
      <ScrollStage id="break" kicker="Break it open" heading="One honest bite" frames={MAKE_STORY.breakOpen} />

      {/* bridge into the brand story */}
      <section className="relative bg-cream paper-texture py-28 sm:py-36 text-center overflow-hidden" data-testid="tagline">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-6">
          <p className="text-[11px] uppercase tracking-[0.26em] text-golddeep/80 mb-4">What you just made</p>
          <h2 className="font-heading font-light text-maroon leading-[1.02] text-[clamp(2.4rem,7vw,5rem)]">
            Tradition shouldn't<br /><span className="italic text-golddeep">have a season.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-ink/65">
            A festival favourite from the Terai, made for everyday tea, sharing and gifting — handcrafted in small batches.
          </p>
        </div>
      </section>
    </>
  );
};

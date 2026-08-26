import React, { useRef, useLayoutEffect, useState, useMemo, useCallback } from "react";
import gsap from "gsap";
import { POUR_GROUPS } from "../../lib/site";

const STAGE = 560; // fixed design canvas; scaled to fit viewport
const BOWL = { x: 90, y: 210, w: 380, h: 250 }; // interior box within stage

const rand = (a, b) => a + Math.random() * (b - a);

// Deterministic-ish particle plan built once
function buildParticles(mobile) {
  const parts = [];
  POUR_GROUPS.forEach((g) => {
    const count = mobile ? Math.round(g.count * 0.55) : g.count;
    for (let i = 0; i < count; i++) {
      const sw = g.swatches[i % g.swatches.length];
      const size = rand(g.size[0], g.size[1]);
      // resting spot inside bowl, biased to lower half (accumulation)
      const rx = BOWL.x + rand(0.12, 0.88) * BOWL.w;
      const ry = BOWL.y + rand(0.42, 0.9) * BOWL.h;
      parts.push({
        id: `${g.key}-${i}`,
        img: `/particles/p_${sw}_${i % 3}.png`,
        size,
        rx,
        ry,
        startX: rx + rand(-24, 24),
        rot: rand(-40, 40),
        at: g.at + i * (mobile ? 0.03 : 0.024) + rand(0, 0.12),
      });
    }
  });
  return parts;
}

export const AutoplayIntro = ({ onDone }) => {
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = typeof window !== "undefined" && window.innerWidth < 640;

  // Decide ONCE at first mount whether to play (avoids StrictMode/remount skipping it).
  const [shouldPlay] = useState(
    () => !reduced && (typeof window === "undefined" || sessionStorage.getItem("mf_intro_played") !== "1")
  );

  const [phase, setPhase] = useState("play"); // play -> ready -> gone
  const rootRef = useRef(null);
  const stageWrap = useRef(null);
  const pRefs = useRef([]);
  const doughRef = useRef(null);
  const labelRef = useRef(null);
  const tlRef = useRef(null);
  const finishedRef = useRef(false);

  const particles = useMemo(() => (!shouldPlay ? [] : buildParticles(mobile)), [shouldPlay, mobile]);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (typeof window !== "undefined") sessionStorage.setItem("mf_intro_played", "1");
    const done = () => {
      document.body.style.overflow = "";
      if (window.__lenis) window.__lenis.start();
      setPhase("gone");
      onDone && onDone();
    };
    gsap.to(rootRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut", onComplete: done });
  }, [onDone]);

  // fit the fixed stage into the viewport
  useLayoutEffect(() => {
    const fit = () => {
      if (!stageWrap.current) return;
      const s = Math.min(1, (window.innerWidth * 0.94) / STAGE, (window.innerHeight * 0.74) / STAGE);
      stageWrap.current.style.transform = `scale(${s})`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useLayoutEffect(() => {
    if (!shouldPlay) {
      // skip: no lock, hand straight to page
      document.body.style.overflow = "";
      setPhase("gone");
      onDone && onDone();
      return;
    }
    // lock scroll + go to top
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();

    const ctx = gsap.context(() => {
      gsap.set(pRefs.current, { opacity: 0 });
      gsap.set(doughRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(labelRef.current, { opacity: 0, y: 10 });

      const tl = gsap.timeline({ onComplete: () => setPhase("ready") });
      tlRef.current = tl;

      particles.forEach((p, i) => {
        const el = pRefs.current[i];
        if (!el) return;
        gsap.set(el, { x: p.startX, y: -30, opacity: 0, rotate: 0 });
        tl.to(el, { opacity: 1, duration: 0.12 }, p.at)
          .to(el, { x: p.rx, y: p.ry, rotate: p.rot, duration: 0.85, ease: "power1.in" }, p.at)
          .to(el, { y: p.ry + 3, duration: 0.18, ease: "power1.out" }, p.at + 0.85);
      });

      // group labels
      POUR_GROUPS.forEach((g) => {
        tl.call(() => { if (labelRef.current) labelRef.current.textContent = g.label; }, null, g.at)
          .to(labelRef.current, { opacity: 1, y: 0, duration: 0.3 }, g.at)
          .to(labelRef.current, { opacity: 0, y: -8, duration: 0.3 }, g.at + 0.75);
      });

      // dough formation over the settled pile
      const doughAt = 5.9;
      tl.to(pRefs.current, { opacity: 0.35, duration: 0.6 }, doughAt)
        .to(doughRef.current, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }, doughAt)
        .to(pRefs.current, { opacity: 0, duration: 0.5 }, doughAt + 0.6);
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
      if (window.__lenis) window.__lenis.start();
    };
  }, []);

  // scroll / interaction intent -> hand over
  useLayoutEffect(() => {
    if (!shouldPlay) return;
    const onIntent = () => {
      if (phase === "ready") {
        finish();
      } else if (phase === "play") {
        // fast-forward the intro on strong intent
        if (tlRef.current) tlRef.current.timeScale(3);
      }
    };
    window.addEventListener("wheel", onIntent, { passive: true });
    window.addEventListener("touchmove", onIntent, { passive: true });
    window.addEventListener("keydown", onIntent);
    return () => {
      window.removeEventListener("wheel", onIntent);
      window.removeEventListener("touchmove", onIntent);
      window.removeEventListener("keydown", onIntent);
    };
  }, [phase, finish, shouldPlay]);

  if (!shouldPlay || phase === "gone") return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[70] overflow-hidden bg-creamlight paper-texture" data-testid="autoplay-intro">
      {/* warm diffused key light, upper-left */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-[42rem] w-[42rem] rounded-full bg-white/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-[34rem] w-[34rem] rounded-full bg-gold/15 blur-3xl" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={stageWrap} style={{ width: STAGE, height: STAGE, transformOrigin: "center center" }} className="relative">
          {/* ambient contact shadow under bowl */}
          <div className="absolute rounded-[50%] bg-[#4a1f0d]/15 blur-xl" style={{ left: BOWL.x + 10, top: BOWL.y + BOWL.h - 26, width: BOWL.w - 20, height: 46 }} />

          {/* bowl back wall (glass) */}
          <div className="absolute" style={{ left: BOWL.x, top: BOWL.y, width: BOWL.w, height: BOWL.h }}>
            <div className="absolute inset-0" style={{
              borderRadius: "18% 18% 48% 48% / 12% 12% 92% 92%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(210,180,150,0.10) 55%, rgba(150,110,75,0.14))",
              boxShadow: "inset 0 -16px 34px rgba(120,80,45,0.16)",
            }} />
          </div>

          {/* particles + dough clipped to bowl interior */}
          <div className="absolute overflow-hidden" style={{ left: BOWL.x, top: BOWL.y, width: BOWL.w, height: BOWL.h, borderRadius: "18% 18% 48% 48% / 12% 12% 92% 92%" }}>
            {/* offset children so their stage-coords map inside this clip box */}
            <div className="absolute" style={{ left: -BOWL.x, top: -BOWL.y, width: STAGE, height: STAGE }}>
              <img ref={doughRef} src="/particles/dough.png" alt="fresh khajuri dough"
                style={{ position: "absolute", left: BOWL.x + BOWL.w / 2 - 150, top: BOWL.y + BOWL.h - 150, width: 300 }} />
              {particles.map((p, i) => (
                <img key={p.id} ref={(el) => (pRefs.current[i] = el)} src={p.img} alt=""
                  style={{ position: "absolute", left: 0, top: 0, width: p.size, height: p.size, willChange: "transform" }} />
              ))}
            </div>
          </div>

          {/* front glass rim + highlight (over contents = "inside the bowl") */}
          <div className="absolute pointer-events-none" style={{ left: BOWL.x, top: BOWL.y, width: BOWL.w, height: BOWL.h }}>
            <div className="absolute inset-0" style={{
              borderRadius: "18% 18% 48% 48% / 12% 12% 92% 92%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0) 30%)",
              boxShadow: "inset 22px 16px 40px rgba(255,255,255,0.35), inset -18px -10px 30px rgba(120,80,45,0.10)",
              border: "1px solid rgba(255,255,255,0.35)",
            }} />
            {/* rim ellipse */}
            <div className="absolute" style={{ left: 6, top: -6, width: BOWL.w - 12, height: 34, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.45)", background: "linear-gradient(180deg, rgba(255,255,255,0.25), rgba(255,255,255,0))" }} />
            <span className="absolute" style={{ left: 40, top: 40, width: 40, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.5)", filter: "blur(8px)" }} />
          </div>
        </div>
      </div>

      {/* group label */}
      <p ref={labelRef} className="absolute inset-x-0 bottom-[20%] text-center text-sm uppercase tracking-[0.22em] text-golddeep/90" />

      {/* scroll hint (after autoplay) */}
      {phase === "ready" && (
        <div className="absolute inset-x-0 bottom-[9%] flex flex-col items-center gap-2 text-maroon animate-pulse" data-testid="intro-scroll-hint">
          <p className="text-xs uppercase tracking-[0.24em]">Scroll to see it made</p>
          <span className="h-8 w-5 rounded-full border-2 border-maroon/40 flex items-start justify-center p-1">
            <span className="h-1.5 w-1.5 rounded-full bg-maroon animate-bounce" />
          </span>
        </div>
      )}

      {/* skip */}
      <button onClick={finish} className="absolute top-6 right-6 text-[11px] uppercase tracking-[0.2em] text-maroon/60 hover:text-maroon" data-testid="intro-skip">
        Skip intro
      </button>
    </div>
  );
};

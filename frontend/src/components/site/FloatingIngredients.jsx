import React, { useEffect, useRef, useState } from "react";
import { INGREDIENTS, ALLERGEN } from "../../lib/site";
import { Reveal } from "./motion";
import { SunDivider, TriangleBand } from "./Madhubani";

export const FloatingIngredients = () => {
  const boxRef = useRef(null);
  const nodeRefs = useRef([]);
  const state = useRef([]);
  const pointer = useRef({ x: -9999, y: -9999, active: false });
  const raf = useRef(null);
  const [active, setActive] = useState(0); // hovered/selected ingredient index for caption

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const layout = () => {
      const w = box.clientWidth;
      const h = box.clientHeight;
      const cols = w < 640 ? 3 : 5;
      const rows = Math.ceil(INGREDIENTS.length / cols);
      const size = nodeRefs.current[0]?.offsetWidth || 96;
      state.current = INGREDIENTS.map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cellW = w / cols;
        const cellH = h / rows;
        const hx = cellW * col + cellW / 2 - size / 2 + (Math.random() - 0.5) * 18;
        const hy = cellH * row + cellH / 2 - size / 2 + (Math.random() - 0.5) * 18;
        const prev = state.current[i];
        return {
          hx, hy,
          x: prev ? prev.x : hx,
          y: prev ? prev.y : hy,
          vx: 0, vy: 0, angle: prev ? prev.angle : 0, av: 0, size,
        };
      });
    };
    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    const move = (cx, cy) => {
      const r = box.getBoundingClientRect();
      pointer.current = { x: cx - r.left, y: cy - r.top, active: true };
    };
    const onMouse = (e) => move(e.clientX, e.clientY);
    const onTouch = (e) => { if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY); };
    const onLeave = () => (pointer.current.active = false);
    box.addEventListener("mousemove", onMouse);
    box.addEventListener("touchmove", onTouch, { passive: true });
    box.addEventListener("mouseleave", onLeave);
    box.addEventListener("touchend", onLeave);

    if (reduce) {
      state.current.forEach((s, i) => {
        const el = nodeRefs.current[i];
        if (el) el.style.transform = `translate(${s.hx}px, ${s.hy}px)`;
      });
      return () => { window.removeEventListener("resize", onResize); };
    }

    const tick = () => {
      const w = box.clientWidth;
      const h = box.clientHeight;
      const p = pointer.current;
      state.current.forEach((s, i) => {
        // spring home
        s.vx += (s.hx - s.x) * 0.012;
        s.vy += (s.hy - s.y) * 0.012;
        // idle drift
        s.vx += (Math.random() - 0.5) * 0.15;
        s.vy += (Math.random() - 0.5) * 0.15;
        // pointer repel
        if (p.active) {
          const cx = s.x + s.size / 2, cy = s.y + s.size / 2;
          const dx = cx - p.x, dy = cy - p.y;
          const dist = Math.hypot(dx, dy);
          const R = 150;
          if (dist < R && dist > 0.1) {
            const force = (1 - dist / R) * 3.2;
            s.vx += (dx / dist) * force;
            s.vy += (dy / dist) * force;
          }
        }
        // damping
        s.vx *= 0.9; s.vy *= 0.9;
        s.x += s.vx; s.y += s.vy;
        s.angle += s.av; s.av *= 0.92;
        // bounce off edges
        const max = s.size;
        if (s.x < 0) { s.x = 0; s.vx = Math.abs(s.vx) * 0.6; }
        if (s.y < 0) { s.y = 0; s.vy = Math.abs(s.vy) * 0.6; }
        if (s.x > w - max) { s.x = w - max; s.vx = -Math.abs(s.vx) * 0.6; }
        if (s.y > h - max) { s.y = h - max; s.vy = -Math.abs(s.vy) * 0.6; }

        const el = nodeRefs.current[i];
        if (el) el.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.angle}deg)`;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
      box.removeEventListener("mousemove", onMouse);
      box.removeEventListener("touchmove", onTouch);
      box.removeEventListener("mouseleave", onLeave);
      box.removeEventListener("touchend", onLeave);
    };
  }, []);

  const scatter = (i) => {
    const s = state.current[i];
    if (!s) return;
    const a = Math.random() * Math.PI * 2;
    const power = 22;
    s.vx += Math.cos(a) * power;
    s.vy += Math.sin(a) * power;
    s.av += (Math.random() - 0.5) * 40;
    setActive(i);
  };

  return (
    <section id="ingredients" className="relative bg-maroon text-cream py-24 sm:py-28 overflow-hidden" data-testid="ingredients-section">
      <div className="absolute inset-x-0 top-0 text-gold/30"><TriangleBand height={16} /></div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-goldbright/80">The Recipe</p>
          <h2 className="font-heading font-light leading-[1.03] text-cream text-[clamp(2.1rem,5vw,4rem)]">
            Nothing here but <span className="italic text-goldbright">the real thing.</span>
          </h2>
          <p className="mt-4 text-sm text-cream/60">Give them a nudge — hover, or tap to send one spinning.</p>
          <div className="mt-6 text-gold"><SunDivider /></div>
        </Reveal>

        {/* physics playground */}
        <div
          ref={boxRef}
          className="relative mt-10 h-[440px] sm:h-[520px] rounded-[2rem] ring-1 ring-goldbright/15 bg-ink/30 overflow-hidden"
          data-testid="ingredients-playground"
        >
          {INGREDIENTS.map((ing, i) => (
            <button
              key={ing.name}
              ref={(el) => (nodeRefs.current[i] = el)}
              onClick={() => scatter(i)}
              onMouseEnter={() => setActive(i)}
              style={{ willChange: "transform" }}
              className="absolute left-0 top-0 h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden ring-2 ring-goldbright/40 shadow-xl group"
              data-testid={`ingredient-chip-${i}`}
              aria-label={ing.name}
            >
              <img src={ing.img} alt={ing.name} className="h-full w-full object-cover pointer-events-none" />
              <span className="absolute inset-x-0 bottom-0 bg-maroon/70 text-[9px] sm:text-[10px] text-cream text-center py-0.5 leading-tight">{ing.name}</span>
            </button>
          ))}
        </div>

        {/* caption for active ingredient */}
        <div className="mt-8 text-center min-h-[3.5rem]">
          <h3 className="font-heading text-2xl text-goldbright" data-testid="ingredient-caption-name">
            {INGREDIENTS[active].name} {INGREDIENTS[active].sub && <span className="italic text-cream/60 text-lg">{INGREDIENTS[active].sub}</span>}
          </h3>
          {INGREDIENTS[active].note && <p className="mt-1 text-sm text-cream/70">{INGREDIENTS[active].note}</p>}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-xs sm:text-sm text-goldbright/70 tracking-wide" data-testid="allergen-note">{ALLERGEN}</p>
        </Reveal>
      </div>
    </section>
  );
};

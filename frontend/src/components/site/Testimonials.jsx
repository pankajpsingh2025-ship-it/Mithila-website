import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "./motion";
import { railTestimonials, initialsOf } from "../../lib/testimonials";

const LANG_LABEL = { ne: "Nepali", mai: "Maithili", en: "English" };

const Card = ({ t }) => (
  <figure className="flex w-[19rem] shrink-0 flex-col bg-paper/80 px-6 py-6 ring-1 ring-maroon/12 sm:w-[22rem]">
    <blockquote className="flex-1 text-[15px] leading-relaxed text-ink/80">
      <span lang={t.language}>{t.quote}</span>
    </blockquote>
    <figcaption className="mt-5 flex items-center gap-3 border-t border-maroon/12 pt-4">
      <span
        aria-hidden="true"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-kraft/20 font-heading text-sm text-maroon"
      >
        {initialsOf(t.displayName)}
      </span>
      <span className="min-w-0">
        <span className="block font-heading text-[15px] text-maroon">{t.displayName}</span>
        <span className="block text-[11px] uppercase tracking-[0.14em] text-ink/45">
          {[t.location, t.repeatCustomer ? "Repeat customer" : t.verifiedOrder ? "Verified order" : null]
            .filter(Boolean)
            .join(" · ")}
        </span>
      </span>
      {t.language && (
        <span className="ml-auto shrink-0 text-[10px] uppercase tracking-[0.14em] text-ink/35">
          {LANG_LABEL[t.language]}
        </span>
      )}
    </figcaption>
  </figure>
);

/**
 * One calm, continuously drifting testimonial rail (spec Part G).
 * - a rAF loop nudges scrollLeft ~18px/s; the list is rendered twice so the
 *   wrap-around is seamless
 * - pauses on hover, on keyboard focus within the rail, and while the user is
 *   touching / dragging it; resumes gently ~2s after the last interaction
 * - native horizontal scroll = free swipe / drag / trackpad, no hijacking
 * - prefers-reduced-motion: no auto-motion, just a normal scrollable row
 */
export const Testimonials = () => {
  const reduce = useReducedMotion();
  const items = railTestimonials();
  const scroller = useRef(null);
  const paused = useRef(false);
  const resumeAt = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const el = scroller.current;
    if (!el) return;
    let raf;
    const SPEED = 18; // px per second
    let last = performance.now();

    const half = () => el.scrollWidth / 2;

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!paused.current && now >= resumeAt.current) {
        el.scrollLeft += SPEED * dt;
        if (el.scrollLeft >= half()) el.scrollLeft -= half();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // keep scrollLeft inside the first copy when the user drags past a boundary
  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft < 0) el.scrollLeft += half;
  };

  const hold = () => { paused.current = true; };
  const release = () => {
    paused.current = false;
    resumeAt.current = performance.now() + 2000;
  };

  const rendered = reduce ? items : [...items, ...items];

  return (
    <section id="reviews" className="relative overflow-hidden bg-cream py-16 sm:py-24" data-testid="testimonials-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-golddeep">From tea tables across Nepal</p>
          <h2 className="font-heading text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.05] text-maroon">
            Loved <span className="italic text-golddeep">beyond the festival.</span>
          </h2>
        </Reveal>
      </div>

      <div
        ref={scroller}
        onScroll={onScroll}
        onMouseEnter={hold}
        onMouseLeave={release}
        onFocusCapture={hold}
        onBlurCapture={release}
        onPointerDown={hold}
        onPointerUp={release}
        onPointerCancel={release}
        onTouchStart={hold}
        onTouchEnd={release}
        className="mt-10 flex items-center gap-4 overflow-x-auto px-5 pb-2 sm:mt-12 sm:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: reduce ? "x proximity" : "none" }}
        aria-label="Customer testimonials"
        tabIndex={0}
      >
        {rendered.map((t, i) => (
          <div
            key={`${t.displayName}-${i}`}
            className="scroll-snap-align-start"
            style={{ scrollSnapAlign: reduce ? "start" : "none" }}
            aria-hidden={!reduce && i >= items.length ? "true" : undefined}
          >
            <Card t={t} />
          </div>
        ))}
      </div>

      <p className="mx-auto mt-4 max-w-7xl px-5 text-[11px] uppercase tracking-[0.16em] text-ink/35 sm:px-8">
        Hover to pause · drag to explore
      </p>
    </section>
  );
};

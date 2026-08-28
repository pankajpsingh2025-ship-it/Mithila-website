import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "./motion";
import { railTestimonials, initialsOf } from "../../lib/testimonials";

/**
 * A single testimonial, floating directly on the section background — no border,
 * outline, card fill, shadow or fixed height. Just the quote, a short hairline,
 * an initials marker, the name and the location. The quote's own script (Nepali
 * / English) is left to speak for itself; no language label is rendered.
 */
const Quote = ({ t, offset }) => (
  <figure
    className="w-[17rem] shrink-0 bg-transparent sm:w-[20rem]"
    style={{ marginTop: offset }}
  >
    <blockquote className="font-heading text-[17px] font-light leading-snug text-ink/85 sm:text-lg">
      <span lang={t.language}>{t.quote}</span>
    </blockquote>
    <span aria-hidden="true" className="mt-5 block h-px w-8 bg-maroon/30" />
    <figcaption className="mt-3 flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-kraft/15 font-heading text-[13px] text-maroon"
      >
        {initialsOf(t.displayName)}
      </span>
      <span className="min-w-0 text-[13px]">
        <span className="text-maroon">{t.displayName}</span>
        <span className="text-ink/45">
          {" — "}
          {t.location}
        </span>
      </span>
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
    <section id="reviews" className="relative overflow-hidden bg-cream py-14 scroll-mt-24 sm:py-20" data-testid="testimonials-section">
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
        className="mt-10 flex items-start gap-10 overflow-x-auto px-5 pb-6 pt-6 sm:mt-12 sm:gap-14 sm:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: reduce ? "x proximity" : "none" }}
        aria-label="Customer testimonials"
        tabIndex={0}
      >
        {rendered.map((t, i) => (
          <div
            key={`${t.displayName}-${i}`}
            style={{ scrollSnapAlign: reduce ? "start" : "none" }}
            aria-hidden={!reduce && i >= items.length ? "true" : undefined}
          >
            {/* gentle, controlled vertical stagger so the rail reads as drifting
                voices rather than a row of aligned boxes */}
            <Quote t={t} offset={i % 3 === 1 ? "2.5rem" : i % 3 === 2 ? "1.25rem" : "0rem"} />
          </div>
        ))}
      </div>

      <p className="mx-auto mt-2 max-w-7xl px-5 text-[11px] uppercase tracking-[0.16em] text-ink/35 sm:px-8">
        Hover to pause · drag to explore
      </p>
    </section>
  );
};

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
const Quote = ({ t }) => (
  <figure className="w-[78vw] shrink-0 snap-start bg-transparent sm:w-[22rem]">
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
 * Gentle auto-advancing testimonial carousel.
 * - scroll-snap with a real page gutter (scroll-padding-inline), so a card is
 *   never left half-clipped at a viewport edge
 * - auto-advances one card every ~5s; wraps cleanly at the end
 * - pauses on hover / keyboard focus / touch; resumes ~4s after the last touch
 * - native horizontal scroll = free drag / swipe / trackpad
 * - prefers-reduced-motion: no auto-advance, just a normal snap-scroll row
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

    const step = () => {
      if (paused.current || performance.now() < resumeAt.current) return;
      const cards = el.querySelectorAll("figure");
      if (!cards.length) return;
      const cw = cards[0].getBoundingClientRect().width + 40; // card + gap
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + cw, behavior: "smooth" });
    };
    const id = setInterval(step, 5000);
    return () => clearInterval(id);
  }, [reduce]);

  const hold = () => { paused.current = true; };
  const release = () => {
    paused.current = false;
    resumeAt.current = performance.now() + 4000;
  };

  return (
    <section id="reviews" className="relative overflow-hidden bg-cream py-10 scroll-mt-28 sm:py-14" data-testid="testimonials-section">
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
        onMouseEnter={hold}
        onMouseLeave={release}
        onFocusCapture={hold}
        onBlurCapture={release}
        onPointerDown={hold}
        onPointerUp={release}
        onPointerCancel={release}
        onTouchStart={hold}
        onTouchEnd={release}
        className="mt-7 flex snap-x snap-mandatory gap-10 overflow-x-auto px-[6vw] py-4 sm:mt-9 sm:px-[7vw] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollPaddingInline: "6vw" }}
        aria-label="Customer testimonials"
        tabIndex={0}
      >
        {items.map((t) => (
          <Quote key={t.displayName} t={t} />
        ))}
      </div>

      <p className="mx-auto mt-2 max-w-7xl px-5 text-[11px] uppercase tracking-[0.16em] text-ink/35 sm:px-8">
        Hover to pause · drag to explore
      </p>
    </section>
  );
};

import React from "react";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "../../lib/site";
import { Reveal } from "./motion";

const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export const Testimonials = () => {
  return (
    <section id="reviews" className="relative bg-creamlight paper-texture py-24 sm:py-32 overflow-hidden" data-testid="testimonials">
      <div className="pointer-events-none absolute -top-24 right-0 h-[26rem] w-[26rem] rounded-full bg-gold/15 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.26em] text-golddeep/80">Loved across Nepal</p>
            <h2 className="mt-3 font-heading font-light text-maroon leading-[1.02] text-[clamp(2rem,5.5vw,3.6rem)]">
              Loved by customers <span className="italic text-golddeep">across Nepal</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink/65">Made for sharing. Loved beyond the festival.</p>
          </div>
        </Reveal>

        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.06}>
              <figure className="mb-6 break-inside-avoid rounded-3xl bg-paper p-6 ring-1 ring-maroon/10 shadow-sm" data-testid={`review-${i}`}>
                <Quote className="h-5 w-5 text-gold" />
                <blockquote className="mt-3 text-[15px] leading-relaxed text-ink/80">{t.quote}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-heritage/10 text-heritage text-sm font-semibold">{initials(t.name)}</span>
                  <span>
                    <span className="block text-sm font-medium text-maroon">{t.name}</span>
                    <span className="block text-xs text-ink/50">{t.city}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

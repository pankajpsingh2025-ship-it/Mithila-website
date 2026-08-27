import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../lib/site";
import { Reveal } from "./motion";

const Card = ({ t }) => (
  <div className="flex h-full flex-col rounded-[1.75rem] bg-paper p-7 ring-1 ring-maroon/10 shadow-[0_20px_50px_-32px_rgba(74,31,13,0.4)]">
    <Quote className="h-6 w-6 text-gold/70" />
    <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/80">{t.quote}</p>
    <div className="mt-6 border-t border-maroon/10 pt-4">
      <p className="font-heading text-lg text-maroon">{t.name}</p>
      <p className="text-xs uppercase tracking-[0.16em] text-ink/45">{t.place}</p>
    </div>
  </div>
);

export const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <section id="reviews" className="relative bg-cream py-20 sm:py-28" data-testid="testimonials-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-golddeep">Loved across Nepal</p>
            <h2 className="font-heading text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.05] text-maroon">
              Made for sharing. <span className="italic text-golddeep">Loved beyond the festival.</span>
            </h2>
          </Reveal>

          <div className="hidden gap-2 sm:flex">
            <button
              onClick={scrollPrev}
              aria-label="Previous testimonials"
              className="grid h-11 w-11 place-items-center rounded-full border border-maroon/20 text-maroon transition-colors hover:bg-maroon hover:text-paper"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next testimonials"
              className="grid h-11 w-11 place-items-center rounded-full border border-maroon/20 text-maroon transition-colors hover:bg-maroon hover:text-paper"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="min-w-0 shrink-0 grow-0 basis-[86%] pl-5 sm:basis-1/2 lg:basis-1/3"
              >
                <Card t={t} />
              </div>
            ))}
          </div>
        </div>

        {/* dots (mobile-friendly) */}
        <div className="mt-8 flex justify-center gap-2 sm:hidden">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => emblaApi && emblaApi.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === selected ? "w-6 bg-maroon" : "w-1.5 bg-maroon/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import { WA, PHONE_DISPLAY } from "../../lib/site";
import { MaskLines, Reveal } from "./motion";
import { SunFace } from "./Madhubani";

export const ClosingCTA = () => {
  return (
    <section id="order" className="relative bg-ink text-cream py-28 sm:py-36 overflow-hidden" data-testid="closing-cta">
      <div className="pointer-events-none absolute -right-24 -top-16 text-goldbright/[0.06]">
        <SunFace className="w-[34rem] h-[34rem]" strokeWidth={2} />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-golddeep/15 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <h2 className="font-heading font-light leading-[1] text-[clamp(2.4rem,7vw,5rem)]">
          <MaskLines lines={["Ready for your", "first pack?"]} lineClass="text-cream" />
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-cream/70">
            Message us directly — we'll walk you through pricing, delivery, and payment in under a minute.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <a
              href={WA.order}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-goldbright px-8 py-4 text-base font-medium text-maroon transition-all duration-300 hover:bg-cream hover:shadow-[0_18px_50px_-12px_rgba(244,184,74,0.5)]"
              data-testid="closing-order-btn"
            >
              <MessageCircle className="h-5 w-5" /> Order on WhatsApp
            </a>
            <a
              href={`tel:+${PHONE_DISPLAY.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-2 text-cream/80 transition-colors hover:text-goldbright"
              data-testid="closing-phone"
            >
              <Phone className="h-5 w-5" />
              <span className="font-heading text-xl">{PHONE_DISPLAY}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

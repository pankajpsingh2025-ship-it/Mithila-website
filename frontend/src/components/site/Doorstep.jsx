import React from "react";
import { ShoppingBag, MessageCircle, Facebook, Instagram } from "lucide-react";
import { DOORSTEP, WA, CONTACT } from "../../lib/site";
import { MaskLines, Reveal } from "./motion";
import { Peacock } from "./Madhubani";

const scrollToShop = () => {
  const el = document.getElementById("shop");
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 });
  else el.scrollIntoView({ behavior: "smooth" });
};

/**
 * The one true final CTA — comes straight after the product lineup, before the
 * delivery reassurance and FAQ (spec §16–§18). Compact: an emotional conclusion
 * plus a clear action. No second promotional CTA follows this anywhere.
 */
export const Doorstep = () => {
  return (
    <section
      id="order"
      className="relative overflow-hidden bg-creamlight pt-4 pb-10 text-ink scroll-mt-28 sm:pt-5 sm:pb-12 paper-texture"
      data-testid="doorstep-cta"
    >
      {/* subtle Mithila peacock motif drawn from the brand pattern */}
      <div className="pointer-events-none absolute -right-16 top-4 text-maroon/[0.05] sm:-right-12">
        <Peacock className="h-52 w-52 sm:h-64 sm:w-64" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/12 blur-3xl" />

      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="font-heading text-lg italic text-golddeep sm:text-xl">{DOORSTEP.handoff}</p>
        </Reveal>
        <h2 className="mt-2 font-heading text-[clamp(2rem,5.4vw,3.4rem)] font-light leading-[1.04] text-maroon">
          <MaskLines lines={["Tradition, delivered", "to your doorstep."]} lineClass="text-maroon" />
        </h2>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-ink/65 sm:text-lg">{DOORSTEP.body}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={scrollToShop}
              className="mo-hover inline-flex items-center gap-3 rounded-full bg-heritage px-8 py-4 text-base font-semibold uppercase tracking-[0.12em] text-paper duration-300 hover:bg-maroon hover:shadow-[0_20px_50px_-12px_rgba(74,31,13,0.5)]"
              data-testid="doorstep-primary"
            >
              <ShoppingBag className="h-5 w-5" /> {DOORSTEP.primary}
            </button>
            <button
              onClick={scrollToShop}
              className="mo-hover inline-flex items-center gap-2 rounded-full border border-maroon/25 px-6 py-4 text-sm font-medium text-maroon hover:bg-maroon hover:text-paper"
              data-testid="doorstep-secondary"
            >
              {DOORSTEP.secondary}
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.28}>
          <a
            href={WA.order}
            target="_blank"
            rel="noreferrer"
            aria-label={CONTACT.whatsappA11y}
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink/55 transition-colors hover:text-golddeep"
            data-testid="doorstep-whatsapp"
          >
            <MessageCircle className="h-4 w-4" /> {DOORSTEP.whatsapp}
          </a>
        </Reveal>
        <Reveal delay={0.34}>
          <div className="mt-4 flex items-center justify-center gap-5 text-xs text-ink/50">
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label={CONTACT.facebookA11y}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-maroon"
              data-testid="doorstep-facebook"
            >
              <Facebook className="h-4 w-4" /> {CONTACT.facebookLabel}
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label={CONTACT.instagramA11y}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-maroon"
              data-testid="doorstep-instagram"
            >
              <Instagram className="h-4 w-4" /> {CONTACT.instagramLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

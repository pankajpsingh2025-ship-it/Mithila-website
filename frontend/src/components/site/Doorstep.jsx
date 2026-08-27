import React from "react";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { DOORSTEP, PACKAGING, WA, IMG } from "../../lib/site";
import { MaskLines, Reveal } from "./motion";
import { SunFace } from "./Madhubani";

const scrollToShop = () => {
  const el = document.getElementById("shop");
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 });
  else el.scrollIntoView({ behavior: "smooth" });
};

/**
 * The single ending: a short ownership beat ("Made by hand. Packed with care.")
 * flowing straight into the one true final CTA. No promotional content after.
 */
export const Doorstep = () => {
  return (
    <section
      id="order"
      className="relative overflow-hidden bg-creamlight py-16 text-ink sm:py-24 paper-texture"
      data-testid="doorstep-cta"
    >
      <div className="pointer-events-none absolute -right-24 -top-16 text-maroon/[0.05]">
        <SunFace className="h-[34rem] w-[34rem]" strokeWidth={2} />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        {/* ownership beat */}
        <Reveal>
          <img
            src={IMG.packGift}
            alt="Mithila.Foods khajuri in its Mithila-art bag, packed and ready"
            className="mx-auto mb-6 w-[min(56vw,18rem)] object-contain [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_55%,transparent_92%)]"
            loading="lazy"
          />
          <p className="font-heading text-xl italic text-golddeep sm:text-2xl">{PACKAGING.headline}</p>
        </Reveal>

        {/* final CTA */}
        <h2 className="mt-6 font-heading text-[clamp(2.2rem,6.5vw,4.2rem)] font-light leading-[1.03] text-maroon">
          <MaskLines lines={["Tradition, delivered", "to your doorstep."]} lineClass="text-maroon" />
        </h2>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink/65 sm:text-lg">{DOORSTEP.body}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={scrollToShop}
              className="mo-hover inline-flex items-center gap-3 rounded-full bg-heritage px-9 py-5 text-base font-semibold uppercase tracking-[0.12em] text-paper duration-300 hover:bg-maroon hover:shadow-[0_20px_50px_-12px_rgba(74,31,13,0.5)]"
              data-testid="doorstep-primary"
            >
              <ShoppingBag className="h-5 w-5" /> {DOORSTEP.primary}
            </button>
            <button
              onClick={scrollToShop}
              className="mo-hover inline-flex items-center gap-2 rounded-full border border-maroon/25 px-7 py-5 text-sm font-medium text-maroon hover:bg-maroon hover:text-paper"
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
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink/55 transition-colors hover:text-golddeep"
            data-testid="doorstep-whatsapp"
          >
            <MessageCircle className="h-4 w-4" /> {DOORSTEP.whatsapp}
          </a>
        </Reveal>
      </div>
    </section>
  );
};

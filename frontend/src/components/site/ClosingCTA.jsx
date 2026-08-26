import React from "react";
import { ShoppingBag } from "lucide-react";
import { IMG } from "../../lib/site";
import { MaskLines, Reveal } from "./motion";
import { SunFace } from "./Madhubani";

const scrollToShop = () => {
  const el = document.getElementById("shop");
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const ClosingCTA = () => {
  return (
    <section id="order" className="relative bg-creamlight text-ink py-28 sm:py-40 overflow-hidden paper-texture" data-testid="closing-cta">
      <div className="pointer-events-none absolute -right-24 -top-16 text-maroon/[0.05]">
        <SunFace className="w-[34rem] h-[34rem]" strokeWidth={2} />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
        {/* final product composition: khajuri + jar + bag + pouch */}
        <Reveal>
          <img
            src={IMG.giftSet}
            alt="Mithila.Foods khajuri — jar, gift bag and pouch"
            className="mx-auto mb-12 w-[min(78vw,34rem)] rounded-[2rem] drop-shadow-[0_40px_70px_-30px_rgba(74,31,13,0.5)]"
          />
        </Reveal>

        <h2 className="font-heading font-light leading-[1] text-maroon text-[clamp(2.4rem,7vw,5rem)]">
          <MaskLines lines={["Tradition, delivered", "to your doorstep."]} lineClass="text-maroon" />
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-md text-base sm:text-lg leading-relaxed text-ink/65">
            Handcrafted khajuri, made with heritage — ready for your everyday.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-10">
            <button
              onClick={scrollToShop}
              className="group inline-flex items-center gap-3 rounded-full bg-heritage px-10 py-5 text-base font-semibold uppercase tracking-[0.14em] text-paper transition-all duration-300 hover:bg-maroon hover:shadow-[0_20px_50px_-12px_rgba(74,31,13,0.5)]"
              data-testid="closing-shop-btn"
            >
              <ShoppingBag className="h-5 w-5" /> Order Khajuri
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

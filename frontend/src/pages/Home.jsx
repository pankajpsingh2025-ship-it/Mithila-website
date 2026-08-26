import React from "react";
import { HeroVideo } from "../components/site/HeroVideo";
import { MakeStory } from "../components/site/MakeStory";
import { Story } from "../components/site/Story";
import { FloatingIngredients } from "../components/site/FloatingIngredients";
import { Products } from "../components/site/Products";
import { Testimonials } from "../components/site/Testimonials";
import { TrustBar } from "../components/site/TrustBar";
import { Vendors } from "../components/site/Vendors";
import { BulkAndStock } from "../components/site/BulkAndStock";
import { CinematicOutro } from "../components/site/CinematicOutro";
import { ClosingCTA } from "../components/site/ClosingCTA";
import { FAQ } from "../components/site/FAQ";
import { Footer } from "../components/site/Footer";
import { IMG } from "../lib/site";
import { Reveal } from "../components/site/motion";

const Tagline = () => (
  <section className="relative bg-cream paper-texture py-24 sm:py-32 text-center overflow-hidden" data-testid="tagline">
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />
    <div className="relative mx-auto max-w-3xl px-6">
      <p className="text-[11px] uppercase tracking-[0.26em] text-golddeep/80 mb-4">What you just made</p>
      <h2 className="font-heading font-light text-maroon leading-[1.02] text-[clamp(2.4rem,7vw,5rem)]">
        Tradition shouldn't<br /><span className="italic text-golddeep">have a season.</span>
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-ink/65">Festival roots. Everyday enjoyment.</p>
    </div>
  </section>
);

const Lineup = () => (
  <section id="collection" className="relative bg-creamlight paper-texture py-24 sm:py-32 overflow-hidden" data-testid="lineup">
    <div className="pointer-events-none absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-gold/12 blur-3xl" />
    <div className="relative mx-auto max-w-6xl px-5 sm:px-8 text-center">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.26em] text-golddeep/80">The Mithila.Foods collection</p>
        <h2 className="mt-3 font-heading font-light text-maroon leading-[1.02] text-[clamp(2rem,5.5vw,3.6rem)]">
          Tradition, <span className="italic text-golddeep">packed for every occasion.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-ink/65">
          Everyday packs, family sharing, gifting and café-ready Khajuri — one heritage, made for more moments.
        </p>
      </Reveal>
      <Reveal delay={0.12}>
        <img
          src={IMG.lineup}
          alt="The complete Mithila.Foods range — Regular, Family, Gift and Vendor packs"
          loading="lazy"
          className="mx-auto mt-12 w-full max-w-4xl rounded-[2rem] drop-shadow-[0_40px_70px_-30px_rgba(74,31,13,0.45)]"
        />
      </Reveal>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="bg-creamlight text-ink font-body antialiased">
      <main>
        {/* MAKE IT — cinematic hero video */}
        <HeroVideo />
        {/* SHAPE -> BAKE -> BREAK (one continuous pinned stage) */}
        <MakeStory />
        {/* bridge into the story */}
        <Tagline />
        {/* What is Khajuri / heritage */}
        <Story />
        {/* Ingredients */}
        <FloatingIngredients />
        {/* SHOP — individual packs */}
        <Products />
        {/* Personal customer testimonials */}
        <Testimonials />
        {/* Business / café trust */}
        <TrustBar />
        <Vendors />
        {/* Gifting */}
        <BulkAndStock />
        {/* Full product family payoff */}
        <Lineup />
        {/* PACK IT — whole -> pouch -> branded bag */}
        <CinematicOutro />
        {/* Doorstep conversion */}
        <ClosingCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

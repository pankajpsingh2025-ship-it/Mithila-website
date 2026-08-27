import React from "react";
import { HeroVideo } from "../components/site/HeroVideo";
import { MakingStage } from "../components/site/MakingStage";
import { Story } from "../components/site/Story";
import { StickyStory } from "../components/site/StickyStory";
import { Products } from "../components/site/Products";
import { Testimonials } from "../components/site/Testimonials";
import { VendorTrust } from "../components/site/VendorTrust";
import { Gifting } from "../components/site/Gifting";
import { Lineup } from "../components/site/Lineup";
import { Doorstep } from "../components/site/Doorstep";
import { FAQ } from "../components/site/FAQ";
import { Footer } from "../components/site/Footer";

/**
 * Three visual modes:
 *  CINEMATIC — hero + one Shape/Bake/Break stage
 *  EDITORIAL — story, then the sticky product story (craft, ingredients, bite)
 *  COMMERCE  — shop, testimonials, vendor trust, gifting, lineup, final CTA
 */
export default function Home() {
  return (
    <div className="bg-creamlight text-ink font-body antialiased">
      <main>
        {/* ── CINEMATIC ── */}
        <HeroVideo />
        <MakingStage />

        {/* ── EDITORIAL ── */}
        <Story />
        <StickyStory />

        {/* ── COMMERCE ── */}
        <Products />
        <Testimonials />
        <VendorTrust />
        <Gifting />
        <Lineup />
        <Doorstep />

        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

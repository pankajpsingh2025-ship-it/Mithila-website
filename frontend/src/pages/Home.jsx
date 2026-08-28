import React from "react";
import { HeroVideo } from "../components/site/HeroVideo";
import { MakingStage } from "../components/site/MakingStage";
import { StickyStory } from "../components/site/StickyStory";
import { Products } from "../components/site/Products";
import { Testimonials } from "../components/site/Testimonials";
import { VendorTrust } from "../components/site/VendorTrust";
import { Gifting } from "../components/site/Gifting";
import { Lineup } from "../components/site/Lineup";
import { Doorstep } from "../components/site/Doorstep";
import { DeliveryTrust } from "../components/site/DeliveryTrust";
import { FAQ } from "../components/site/FAQ";
import { Footer } from "../components/site/Footer";

/**
 * One continuous Mithila.Foods environment (spec §36):
 *   hero / make
 *   → full-view Shape → Bake → Break
 *   → story reveal + persistent heritage / ingredient / sensory story
 *   → shop
 *   → customer trust → café & vendor trust → gifting
 *   → product hand-off → full product lineup
 *   → "Made by hand. Packed with care." → final doorstep CTA
 *   → compact delivery / payment reassurance
 *   → collapsed FAQ
 *   → footer
 */
export default function Home() {
  return (
    <div className="bg-creamlight text-ink font-body antialiased">
      <main>
        <HeroVideo />
        <MakingStage />
        <StickyStory />

        <Products />
        <Testimonials />
        <VendorTrust />
        <Gifting />

        <Lineup />
        <Doorstep />
        <DeliveryTrust />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

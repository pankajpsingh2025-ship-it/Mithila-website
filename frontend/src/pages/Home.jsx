import React from "react";
import { HeroVideo } from "../components/site/HeroVideo";
import { MakingStage } from "../components/site/MakingStage";
import { StickyStory } from "../components/site/StickyStory";
import { Products } from "../components/site/Products";
import { Testimonials } from "../components/site/Testimonials";
import { VendorTrust } from "../components/site/VendorTrust";
import { Gifting } from "../components/site/Gifting";
import { DeliveryTrust } from "../components/site/DeliveryTrust";
import { FAQ } from "../components/site/FAQ";
import { Doorstep } from "../components/site/Doorstep";
import { Footer } from "../components/site/Footer";

/**
 * One continuously unfolding story (spec Part 3):
 *   hero
 *   → Shape / Bake / Break immersive sequence (+ "Tradition shouldn't have a season")
 *   → restored sticky Khajuri story + ingredient / allergen narrative
 *   → product pack selector
 *   → floating testimonial rail
 *   → café & wholesale social proof
 *   → gifting
 *   → delivery & payment reassurance
 *   → FAQ
 *   → one closing CTA
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

        <DeliveryTrust />
        <FAQ />
        <Doorstep />
      </main>
      <Footer />
    </div>
  );
}

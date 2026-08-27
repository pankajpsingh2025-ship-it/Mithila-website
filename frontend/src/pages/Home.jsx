import React from "react";
import { HeroVideo } from "../components/site/HeroVideo";
import { MakingStage } from "../components/site/MakingStage";
import { Story } from "../components/site/Story";
import { Ingredients } from "../components/site/Ingredients";
import { Sensory } from "../components/site/Sensory";
import { Products } from "../components/site/Products";
import { Testimonials } from "../components/site/Testimonials";
import { VendorTrust } from "../components/site/VendorTrust";
import { Gifting } from "../components/site/Gifting";
import { DeliveryTrust } from "../components/site/DeliveryTrust";
import { FAQ } from "../components/site/FAQ";
import { Doorstep } from "../components/site/Doorstep";
import { Footer } from "../components/site/Footer";

/**
 * Final consolidated homepage order:
 *   hero video
 *   → Shape / Bake / Break (+ "Tradition shouldn't have a season")
 *   → what is Khajuri + heritage        (Story)
 *   → 11 real ingredients + allergen    (Ingredients)
 *   → taste it / everyday use           (Sensory)
 *   → pack selector                     (Products)
 *   → testimonials → café & vendor proof
 *   → gifting
 *   → delivery & payment → FAQ
 *   → one closing CTA                   (Doorstep)
 *   → footer
 */
export default function Home() {
  return (
    <div className="bg-creamlight text-ink font-body antialiased">
      <main>
        <HeroVideo />
        <MakingStage />

        <Story />
        <Ingredients />
        <Sensory />

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

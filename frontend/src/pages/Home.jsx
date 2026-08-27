import React from "react";
import { HeroVideo } from "../components/site/HeroVideo";
import { MakingStage } from "../components/site/MakingStage";
import { StickyStory } from "../components/site/StickyStory";
import { Sensory } from "../components/site/Sensory";
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
 * Three visual modes (spec §3):
 *   IMMERSIVE  — hero + one Shape/Bake/Break stage
 *   EDITORIAL  — the persistent product-story sequence + one sensory beat
 *   COMMERCE   — shop, customer proof, vendor proof, gifting, lineup, CTA
 */
export default function Home() {
  return (
    <div className="bg-creamlight text-ink font-body antialiased">
      <main>
        {/* ── IMMERSIVE ── */}
        <HeroVideo />
        <MakingStage />

        {/* ── EDITORIAL ── */}
        <StickyStory />
        <Sensory />

        {/* ── COMMERCE ── */}
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

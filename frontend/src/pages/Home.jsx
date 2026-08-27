import React from "react";
import { HeroVideo } from "../components/site/HeroVideo";
import { MakingStage } from "../components/site/MakingStage";
import { Story } from "../components/site/Story";
import { StickyStory } from "../components/site/StickyStory";
import { Sensory } from "../components/site/Sensory";
import { Products } from "../components/site/Products";
import { Testimonials } from "../components/site/Testimonials";
import { VendorTrust } from "../components/site/VendorTrust";
import { Gifting } from "../components/site/Gifting";
import { Lineup } from "../components/site/Lineup";
import { Packaging } from "../components/site/Packaging";
import { Doorstep } from "../components/site/Doorstep";
import { FAQ } from "../components/site/FAQ";
import { Footer } from "../components/site/Footer";

export default function Home() {
  return (
    <div className="bg-creamlight text-ink font-body antialiased">
      <main>
        {/* 01 — hero (video) */}
        <HeroVideo />

        {/* 02 + 03 — one continuous Shape -> Bake -> Break, releasing on
            "Tradition shouldn't have a season." */}
        <MakingStage />

        {/* 04 — what is khajuri / heritage (compressed) */}
        <Story />

        {/* 05 — sticky product story + ingredients */}
        <StickyStory />

        {/* 06 — sensory product moment */}
        <Sensory />

        {/* 07 — shop (supplied pack images) */}
        <Products />

        {/* 08 — customer love */}
        <Testimonials />

        {/* 09 — vendor / café trust (merged) */}
        <VendorTrust />

        {/* 10 — gifting (short) */}
        <Gifting />

        {/* 11 — final product lineup */}
        <Lineup />

        {/* 12 — ownership / packaging transition */}
        <Packaging />

        {/* 13 — final CTA */}
        <Doorstep />

        {/* 14 — FAQ */}
        <FAQ />
      </main>

      {/* 15 — footer */}
      <Footer />
    </div>
  );
}

import React from "react";
import { HeroVideo } from "../components/site/HeroVideo";
import { MakingStage } from "../components/site/MakingStage";
import { WhatIsKhajuri } from "../components/site/WhatIsKhajuri";
import { Story } from "../components/site/Story";
import { IngredientStory } from "../components/site/IngredientStory";
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
        {/* 1 — hero: watch it being made */}
        <HeroVideo />

        {/* 2 — one continuous stage: shape -> bake -> break -> story hand-off */}
        <MakingStage />

        {/* 3 — what it is */}
        <WhatIsKhajuri />

        {/* 4 — heritage / brand story */}
        <Story />

        {/* 5 — ingredient story */}
        <IngredientStory />

        {/* 6 — sensory showcase (appetite peak) */}
        <Sensory />

        {/* 7 — shop: individual packs */}
        <Products />

        {/* 8 — customer trust */}
        <Testimonials />

        {/* 9 — vendor / café trust */}
        <VendorTrust />

        {/* 10 — gifting */}
        <Gifting />

        {/* 11 — full product family */}
        <Lineup />

        {/* 12 — packaging / ownership transition */}
        <Packaging />

        {/* 13 — final doorstep conversion */}
        <Doorstep />

        {/* 14 — FAQ */}
        <FAQ />
      </main>

      {/* 15 — footer */}
      <Footer />
    </div>
  );
}

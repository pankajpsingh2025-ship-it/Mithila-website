import React from "react";
import { HeroVideo } from "../components/site/HeroVideo";
import { MakeStory } from "../components/site/MakeStory";
import { Story } from "../components/site/Story";
import { FloatingIngredients } from "../components/site/FloatingIngredients";
import { Products } from "../components/site/Products";
import { TrustBar } from "../components/site/TrustBar";
import { Vendors } from "../components/site/Vendors";
import { BulkAndStock } from "../components/site/BulkAndStock";
import { Lifestyle } from "../components/site/Lifestyle";
import { CinematicOutro } from "../components/site/CinematicOutro";
import { DeliveryPayment } from "../components/site/DeliveryPayment";
import { ClosingCTA } from "../components/site/ClosingCTA";
import { FAQ } from "../components/site/FAQ";
import { Footer } from "../components/site/Footer";

export default function Home() {
  return (
    <div className="bg-creamlight text-ink font-body antialiased">
      <main>
        {/* MAKE IT — cinematic hero video (bowl -> ingredients -> dough) */}
        <HeroVideo />
        {/* SHAPE IT -> BAKE IT -> BREAK IT + "Tradition shouldn't have a season" */}
        <MakeStory />
        {/* WHAT IS KHAJURI / heritage story */}
        <Story />
        {/* Ingredients / craftsmanship */}
        <FloatingIngredients />
        {/* SHOP */}
        <Products />
        {/* Social proof */}
        <TrustBar />
        {/* Café / wholesale */}
        <Vendors />
        {/* Gifting / corporate */}
        <BulkAndStock />
        <Lifestyle />
        {/* PACK IT — whole -> pouch -> branded bag */}
        <CinematicOutro />
        {/* Delivery / payments / trust */}
        <DeliveryPayment />
        {/* Final doorstep CTA */}
        <ClosingCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

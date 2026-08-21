import React from "react";
import { CinematicIntro } from "../components/site/CinematicIntro";
import { TrustBar } from "../components/site/TrustBar";
import { Story } from "../components/site/Story";
import { FloatingIngredients } from "../components/site/FloatingIngredients";
import { CinematicOutro } from "../components/site/CinematicOutro";
import { Products } from "../components/site/Products";
import { Lifestyle } from "../components/site/Lifestyle";
import { BulkAndStock } from "../components/site/BulkAndStock";
import { DeliveryPayment } from "../components/site/DeliveryPayment";
import { FAQ } from "../components/site/FAQ";
import { ClosingCTA } from "../components/site/ClosingCTA";
import { Footer } from "../components/site/Footer";

export default function Home() {
  return (
    <div className="bg-creamlight text-ink font-body antialiased">
      <main>
        <CinematicIntro />
        <TrustBar />
        <Story />
        <FloatingIngredients />
        <CinematicOutro />
        <Products />
        <Lifestyle />
        <BulkAndStock />
        <DeliveryPayment />
        <FAQ />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}

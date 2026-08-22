import React from "react";
import { CinematicIntro } from "../components/site/CinematicIntro";
import { TrustBar } from "../components/site/TrustBar";
import { Products } from "../components/site/Products";
import { FloatingIngredients } from "../components/site/FloatingIngredients";
import { Story } from "../components/site/Story";
import { CinematicOutro } from "../components/site/CinematicOutro";
import { Vendors } from "../components/site/Vendors";
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
        {/* 1-9 : ingredients -> sphere -> raw -> baked -> break */}
        <CinematicIntro />
        <TrustBar />
        {/* 10 : product information / pricing (shop stays easy to reach) */}
        <Products />
        <FloatingIngredients />
        {/* 11 : brand foundation */}
        <Story />
        {/* 12-18 : restoration -> inner pouch -> branded bag */}
        <CinematicOutro />
        {/* 19-22 : vendors + 360 jar + become a vendor */}
        <Vendors />
        <Lifestyle />
        <BulkAndStock />
        <DeliveryPayment />
        <FAQ />
        {/* 23-24 : final composition + one emotional consumer CTA */}
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}

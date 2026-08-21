import React from "react";
import { Nav } from "../components/site/Nav";
import { Hero } from "../components/site/Hero";
import { TrustBar } from "../components/site/TrustBar";
import { Story } from "../components/site/Story";
import { Ingredients } from "../components/site/Ingredients";
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
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Story />
        <Ingredients />
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

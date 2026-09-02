import React, { useEffect } from "react";
import { Products } from "../components/site/Products";
import { Footer } from "../components/site/Footer";

/**
 * Dedicated /shop route — just the pack selector. The full product-family
 * lineup lives on the homepage lower journey (spec §10–§15), not here.
 */
export default function Shop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-creamlight text-ink font-body antialiased">
      <main className="pt-16">
        <Products />
      </main>
      <Footer />
    </div>
  );
}

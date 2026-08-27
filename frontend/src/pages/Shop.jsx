import React, { useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { Products } from "../components/site/Products";
import { Footer } from "../components/site/Footer";
import { Reveal } from "../components/site/motion";
import { IMG, WA } from "../lib/site";

/**
 * Dedicated shop route. The homepage keeps the pack selector; this page also
 * carries the "full range" family photo that used to sit mid-homepage (spec
 * §13) — shown once, after the pack grid, clearly not "one bundle every
 * customer receives", with the café/wholesale jar called out as wholesale-only.
 */
export default function Shop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-creamlight text-ink font-body antialiased">
      <main className="pt-16">
        <Products />

        <section className="relative overflow-hidden bg-creamlight py-16 sm:py-24" data-testid="full-range">
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
            <Reveal>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-golddeep">The collection</p>
              <h2 className="mx-auto max-w-2xl font-heading text-[clamp(2rem,4.8vw,3.4rem)] font-light leading-[1.05] text-maroon">
                See the Full Mithila.Foods Range.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
                Everyday packs, family sharing and gift boxes — choose the one you need above.
                This is the range side by side, not a single bundle.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <img
                src={IMG.finalLineup}
                alt="The Mithila.Foods range shown together: the black window pouch, the white/cream pouch and the yellow Mithila-art gift bag, with loose khajuri"
                className="mx-auto mt-10 max-h-[68vh] w-full max-w-3xl object-contain"
                loading="lazy"
                data-testid="full-range-image"
              />
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mx-auto mt-6 max-w-md rounded-lg border border-maroon/20 bg-paper px-4 py-3 text-sm text-ink/75">
                The tall jar in this photo is our <strong>café &amp; wholesale</strong> pack — it is
                not sold as a normal retail pack.{" "}
                <a
                  href={WA.wholesale}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-maroon underline underline-offset-4"
                  data-testid="full-range-wholesale"
                >
                  <MessageCircle className="h-4 w-4" /> For Cafés &amp; Wholesale only
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

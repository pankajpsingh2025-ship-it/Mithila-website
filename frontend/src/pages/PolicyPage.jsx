import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Footer } from "../components/site/Footer";

/**
 * Shared shell for the three policy pages. Reuses the site header (rendered
 * globally in App), the site typography scale and the site footer. Content is
 * passed in as children; anything that needs the business owner to confirm a
 * specific practice is marked inline with <Confirm> so it is never presented as
 * a settled legal claim.
 */
export const Confirm = ({ children }) => (
  <mark className="rounded bg-gold/25 px-1 py-0.5 text-ink/80" data-testid="needs-confirmation">
    {children} <span className="text-[11px] uppercase tracking-wide text-golddeep">[owner to confirm]</span>
  </mark>
);

export const PolicyPage = ({ title, lastUpdated, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-creamlight text-ink font-body antialiased">
      <main className="mx-auto max-w-3xl px-5 pb-20 pt-28 sm:px-8 sm:pt-32">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-ink/60 transition-colors hover:text-maroon"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <h1 className="mt-6 font-heading text-[clamp(2rem,5vw,3rem)] font-light leading-tight text-maroon">
          {title}
        </h1>
        <p className="mt-2 text-sm text-ink/55" data-testid="last-updated">Last updated: {lastUpdated}</p>

        <div className="policy-body mt-8 space-y-6 text-[15px] leading-relaxed text-ink/80">
          {children}
        </div>

        <p className="mt-12 border-t border-maroon/12 pt-6 text-sm text-ink/60">
          Questions about this page? Reach us at Bouddha-6, Kathmandu, or on{" "}
          <Link to="/#order" className="text-maroon underline underline-offset-4">
            WhatsApp / the contact details in the footer
          </Link>
          .
        </p>
      </main>
      <Footer />
    </div>
  );
};

/** Small helpers so each page reads cleanly. */
export const H2 = ({ children }) => (
  <h2 className="pt-2 font-heading text-xl text-maroon">{children}</h2>
);

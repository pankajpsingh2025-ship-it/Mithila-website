import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { VENDOR_TRUST, IMG } from "../../lib/site";
import { Reveal, useParallax } from "./motion";

export const VendorTrust = () => {
  const { eyebrow, headline, body, vendors, cta, href } = VENDOR_TRUST;
  const { ref, y } = useParallax(34);
  return (
    <section id="vendors" className="relative bg-creamlight py-12 scroll-mt-28 sm:py-16" data-testid="vendors-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-golddeep">{eyebrow}</p>
            <h2 className="font-heading text-[clamp(1.9rem,4.4vw,3.2rem)] font-light leading-[1.05] text-maroon">
              {headline}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">{body}</p>
            <div ref={ref} className="mt-7 overflow-hidden rounded-[1.5rem] ring-1 ring-maroon/10">
              <motion.img
                src={IMG.vendorJar}
                alt="The Mithila.Foods café-ready khajuri jar beside a cup of chiya"
                style={{ y }}
                className="h-56 w-full scale-110 object-cover sm:h-64"
                loading="lazy"
              />
            </div>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-maroon/25 px-6 py-3 text-sm font-medium text-maroon transition-colors hover:bg-maroon hover:text-paper"
              data-testid="vendor-cta"
            >
              {cta} <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>

          <div className="lg:col-span-7">
            {/* staggered mosaic — the first café reads as the featured location,
                tight 8px gutters, the rest arranged around it */}
            <div className="grid auto-rows-[8.25rem] grid-cols-2 gap-2 sm:auto-rows-[8.75rem] sm:grid-cols-3">
              {vendors.map((v, i) => (
                <figure
                  key={v.name}
                  className={`group relative overflow-hidden rounded-xl ring-1 ring-maroon/10 ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <img
                    src={v.img}
                    alt={`Mithila.Foods khajuri at ${v.name}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 px-3 py-2.5">
                    <p className={`font-heading leading-tight text-paper ${i === 0 ? "text-lg" : "text-sm"}`}>{v.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-paper/70">{v.tag}</p>
                  </figcaption>
                </figure>
              ))}
              <div className="flex flex-col items-center justify-center rounded-xl bg-maroon/5 px-3 text-center ring-1 ring-dashed ring-maroon/20">
                <span className="font-heading text-2xl text-maroon">35+</span>
                <span className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink/50">
                  cafés &amp; tea shops
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

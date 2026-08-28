import React, { useState } from "react";
import { ArrowUpRight, ShoppingBag, Minus, Plus } from "lucide-react";
import { PRODUCTS } from "../../lib/site";
import { Reveal } from "./motion";
import { useCart } from "../../context/CartContext";

/**
 * Static, normal-document-flow product card — no 3D tilt / spring (which made
 * the small text shimmer and "ghost" during motion). A plain CSS hover-lift
 * only. Fixed row structure so IMAGE / NAME+WEIGHT / DESCRIPTION / PRICE+QTY /
 * ADD TO CART / WhatsApp align across all four cards.
 */
const ProductCard = ({ p }) => {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-maroon/10 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_rgba(74,31,13,0.5)]"
      data-testid={`product-card-${p.id}`}
    >
      {/* full-bleed packaging image — flush to the card's top and side edges,
          its own warm background merging with the card's; never cropped */}
      <div className="relative h-60 shrink-0 overflow-hidden bg-cream sm:h-64">
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{ background: "linear-gradient(to top, rgba(42,22,8,0.5), transparent)" }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-maroon/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-paper/90">
          {p.tag}
        </span>
        <h3 className="absolute inset-x-3 bottom-2.5 font-heading text-lg leading-tight text-paper drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
          {p.name}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          {p.size && <p className="text-[11px] uppercase tracking-[0.14em] text-ink/45">{p.size}</p>}
          <span className="shrink-0 font-heading text-lg text-golddeep">
            <span className="text-[10px] uppercase tracking-widest text-ink/45">NPR </span>{p.price}
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{p.desc}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center rounded-full border border-maroon/20">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 text-maroon" data-testid={`product-dec-${p.id}`}><Minus className="w-3.5 h-3.5" /></button>
            <span className="w-8 text-center text-sm" data-testid={`product-qty-${p.id}`}>{qty}</span>
            <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} className="p-2 text-maroon" data-testid={`product-inc-${p.id}`}><Plus className="w-3.5 h-3.5" /></button>
          </div>
          <span className="text-xs text-ink/50">NPR {p.priceNum * qty}</span>
        </div>

        <button
          onClick={() => addItem(p, qty)}
          className="mo-hover mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-5 py-3 text-sm font-medium text-paper duration-300 hover:bg-[#3a1708]"
          data-testid={`product-add-${p.id}`}
        >
          <ShoppingBag className="w-4 h-4" /> Add to Cart
        </button>
        <a
          href={p.href}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs text-heritage transition-colors hover:text-maroon"
          data-testid={`product-order-${p.id}`}
        >
          or order on WhatsApp
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export const Products = () => {
  return (
    <section id="shop" className="relative bg-cream py-10 scroll-mt-28 sm:py-14">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <h2 className="font-heading text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.05] text-maroon">
              One khajuri, <span className="italic text-golddeep">four ways to bring it home.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-xs text-sm leading-relaxed text-ink/60">
              The same handcrafted recipe — from a first taste, to a full kilo for the house, to a heritage gift.
            </p>
          </Reveal>
        </div>

        {/* mobile: horizontal snap carousel (swipe for more) · sm+: grid */}
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="w-[78%] shrink-0 snap-start sm:w-auto sm:shrink">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] uppercase tracking-[0.16em] text-ink/40 sm:hidden">
          Swipe for more packs →
        </p>
      </div>
    </section>
  );
};

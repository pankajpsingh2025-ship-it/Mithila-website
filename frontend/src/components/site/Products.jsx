import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ShoppingBag, Minus, Plus } from "lucide-react";
import { PRODUCTS } from "../../lib/site";
import { Reveal } from "./motion";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ p, index }) => {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 9);
    rx.set(-py * 9);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <Reveal delay={index * 0.08} className={index % 2 === 1 ? "lg:mt-12" : ""}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-maroon/10 shadow-[0_24px_60px_-30px_rgba(74,31,13,0.5)]"
        data-testid={`product-card-${p.id}`}
      >
        {/* uniform cream stage so every pack reads as one family
            (real packaging colours are preserved — only the surround is unified) */}
        <div className="relative h-56 overflow-hidden bg-cream sm:h-60">
          <img
            src={p.img}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${p.kraft ? "bg-kraft text-paper" : "bg-heritage text-paper"}`}>
            {p.tag}
          </span>
        </div>

        <div className="flex flex-1 flex-col border-t border-maroon/10 p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-2xl leading-tight text-maroon">{p.name}</h3>
            <div className="shrink-0 text-right">
              <span className="block text-[10px] uppercase tracking-widest text-ink/45">NPR</span>
              <span className="font-heading text-2xl text-golddeep">{p.price}</span>
            </div>
          </div>
          {p.size && <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink/45">{p.size}</p>}
          <p className="mt-3 text-sm leading-relaxed text-ink/65">{p.desc}</p>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="flex items-center rounded-full border border-maroon/20">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 text-maroon" data-testid={`product-dec-${p.id}`}><Minus className="w-3.5 h-3.5" /></button>
              <span className="w-8 text-center text-sm" data-testid={`product-qty-${p.id}`}>{qty}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} className="p-2 text-maroon" data-testid={`product-inc-${p.id}`}><Plus className="w-3.5 h-3.5" /></button>
            </div>
            <span className="text-xs text-ink/50">NPR {p.priceNum * qty}</span>
          </div>

          <button
            onClick={() => addItem(p, qty)}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-5 py-3.5 text-sm font-medium text-paper transition-colors duration-300 hover:bg-heritage"
            data-testid={`product-add-${p.id}`}
          >
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs text-ink/55 hover:text-golddeep transition-colors"
            data-testid={`product-order-${p.id}`}
          >
            or order on WhatsApp
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </Reveal>
  );
};

export const Products = () => {
  return (
    <section id="shop" className="relative bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal><p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-golddeep">Choose your pack</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-heading text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.03] text-maroon">
                One khajuri, <span className="italic text-golddeep">four ways to bring it home</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-ink/60">
              The same handcrafted recipe — from a first taste, to a full kilo for the house, to a heritage gift.
            </p>
          </Reveal>
        </div>

        {/* mobile: horizontal snap carousel (swipe for more) · sm+: grid */}
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <div key={p.id} className="w-[78%] shrink-0 snap-start sm:w-auto sm:shrink">
              <ProductCard p={p} index={i} />
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

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "../../lib/site";
import { Reveal } from "./motion";

const ProductCard = ({ p, index }) => {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

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
        <div className="relative h-60 sm:h-64 overflow-hidden">
          <img
            src={p.img}
            alt={p.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
          <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${p.kraft ? "bg-kraft text-paper" : "bg-heritage text-paper"}`}>
            {p.tag}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-2xl text-maroon leading-tight">{p.name}</h3>
            <div className="text-right shrink-0">
              <span className="block text-[10px] uppercase tracking-widest text-ink/45">NPR</span>
              <span className="font-heading text-2xl text-golddeep">{p.price}</span>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink/65">{p.desc}</p>
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-between gap-2 rounded-full bg-maroon px-5 py-3.5 text-sm font-medium text-paper transition-colors duration-300 hover:bg-heritage"
            data-testid={`product-order-${p.id}`}
          >
            Order on WhatsApp
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </Reveal>
  );
};

export const Products = () => {
  return (
    <section id="shop" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <Reveal><p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-golddeep">The Shop</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-heading font-light text-maroon leading-[1.03] text-[clamp(2rem,4.6vw,3.6rem)]">
                Pick your <span className="italic text-golddeep">khajuri</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm text-ink/60 leading-relaxed">
              One product, made with care — in four honest sizes, from a first taste to a full heritage gift.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

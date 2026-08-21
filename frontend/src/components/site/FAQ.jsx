import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "../../lib/site";
import { Reveal } from "./motion";
import { SunDivider } from "./Madhubani";

const Item = ({ f, isOpen, onToggle, i }) => (
  <div className="border-b border-maroon/12" data-testid={`faq-item-${i}`}>
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-6 py-6 text-left"
      data-testid={`faq-question-${i}`}
    >
      <span className="font-heading text-lg sm:text-2xl text-maroon leading-snug">{f.q}</span>
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-maroon/8 text-golddeep"
      >
        <Plus className="h-5 w-5" />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <p className="pb-6 pr-12 text-sm sm:text-base leading-relaxed text-ink/70" data-testid={`faq-answer-${i}`}>
            {f.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative bg-cream py-24 sm:py-32" data-testid="faq-section">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-golddeep">Good to know</p>
          <h2 className="font-heading font-light text-maroon leading-[1.03] text-[clamp(2rem,4.6vw,3.4rem)]">
            Questions, answered
          </h2>
          <div className="mt-7 text-gold"><SunDivider /></div>
        </Reveal>

        <div className="mt-10">
          {FAQS.map((f, i) => (
            <Item key={i} f={f} i={i} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

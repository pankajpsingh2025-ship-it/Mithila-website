import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "../../lib/site";
import { Reveal } from "./motion";

const Item = ({ f, isOpen, onToggle, i }) => (
  <div className="border-b border-maroon/12" data-testid={`faq-item-${i}`}>
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-6 py-4 text-left sm:py-5"
      data-testid={`faq-question-${i}`}
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${i}`}
    >
      <span className="font-heading text-base text-maroon leading-snug sm:text-xl">{f.q}</span>
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-maroon/8 text-golddeep"
      >
        <Plus className="h-4 w-4" />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <p id={`faq-answer-${i}`} className="pb-5 pr-10 text-sm leading-relaxed text-ink/70" data-testid={`faq-answer-${i}`}>
            {f.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/**
 * Compact, collapsed-by-default accordion (spec §22–§25). Secondary information
 * placed after the main CTA and delivery reassurance — never a cinematic
 * full-screen section. One answer open at a time; all closed on load.
 */
export const FAQ = () => {
  const [open, setOpen] = useState(-1);
  return (
    <section id="faq" className="relative bg-cream py-12 scroll-mt-24 sm:py-16" data-testid="faq-section">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.24em] text-golddeep">Good to know</p>
          <h2 className="mt-2 font-heading font-light text-maroon leading-[1.05] text-[clamp(1.7rem,3.6vw,2.4rem)]">
            Questions, answered.
          </h2>
        </Reveal>

        <div className="mt-6">
          {FAQS.map((f, i) => (
            <Item key={i} f={f} i={i} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

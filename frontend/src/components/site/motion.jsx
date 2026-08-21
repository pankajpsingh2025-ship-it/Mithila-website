import React from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

// Simple fade + rise reveal on scroll into view.
export const Reveal = ({ children, delay = 0, y = 30, className = "", once = true }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: "-80px" }}
    transition={{ duration: 0.85, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

// Staggered container helpers.
export const Stagger = ({ children, className = "", delay = 0, gap = 0.1 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
    variants={{ show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = "", y = 28 }) => (
  <motion.div
    className={className}
    variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } }}
    transition={{ duration: 0.8, ease: EASE }}
  >
    {children}
  </motion.div>
);

// Line-by-line masked reveal for big headings.
export const MaskLines = ({ lines, className = "", lineClass = "", delay = 0, animate = false }) => {
  const anim = animate
    ? { animate: { y: "0%" } }
    : { whileInView: { y: "0%" }, viewport: { once: true, margin: "-60px" } };
  return (
    <span className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClass}`}
            initial={{ y: "115%" }}
            {...anim}
            transition={{ duration: 0.95, delay: delay + i * 0.12, ease: EASE }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

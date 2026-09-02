import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// One easing curve for the whole site.
export const EASE = [0.22, 1, 0.36, 1];

// Reveals start while the element is still ~15% below the fold and finish
// quickly, so by the time it's comfortably in view the motion is already
// done — smooth on any scroll speed, never a late "pop", never left hidden.
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px", amount: 0.15 };

export const Reveal = ({ children, delay = 0, y = 22, className = "" }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

export const Stagger = ({ children, className = "" }) => <div className={className}>{children}</div>;

export const StaggerItem = ({ children, className = "", y = 20, delay = 0 }) => (
  <Reveal className={className} y={y} delay={delay}>
    {children}
  </Reveal>
);

/** Line-by-line masked reveal for big headings. */
export const MaskLines = ({ lines, className = "", lineClass = "", delay = 0, animate = false }) => {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          {reduce || animate ? (
            <span className={`${animate ? "rise-in " : ""}block ${lineClass}`}>{l}</span>
          ) : (
            <motion.span
              className={`block ${lineClass}`}
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: delay + i * 0.08, ease: EASE }}
            >
              {l}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
};

/**
 * Shared parallax. Every feature image across the site moves through the same
 * gentle range in the same direction — one parallax rhythm for the whole page.
 * `range` = total travel in px across its scroll pass. Degrades to no motion
 * for reduced-motion users.
 */
export const useParallax = (range = 40) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range / 2, -range / 2]);
  return { ref, y: reduce ? 0 : y };
};

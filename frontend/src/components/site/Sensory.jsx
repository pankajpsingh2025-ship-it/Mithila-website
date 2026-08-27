import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IMG } from "../../lib/site";
import { Reveal, MaskLines } from "./motion";

export const Sensory = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-creamlight py-24 sm:py-32" data-testid="sensory-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-golddeep">The first bite</p>
          <h2 className="font-heading text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.02] text-maroon">
            <MaskLines lines={["Golden outside."]} />
            <MaskLines lines={["Crumbly within."]} lineClass="italic text-golddeep" delay={0.12} />
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-12 sm:gap-6">
          <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-maroon/10 shadow-[0_30px_70px_-34px_rgba(74,31,13,0.45)] sm:col-span-7 sm:row-span-2">
            <motion.img
              src={IMG.broken}
              alt="A khajuri broken open, crisp golden shell over a pale, crumbly centre"
              style={{ y: y1 }}
              className="h-[22rem] w-full scale-110 object-cover sm:h-[40rem]"
              loading="lazy"
            />
          </div>
          <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-maroon/10 shadow-[0_30px_70px_-34px_rgba(74,31,13,0.45)] sm:col-span-5">
            <motion.img
              src={IMG.texture}
              alt="Extreme close-up of khajuri crumb and crisp edge"
              style={{ y: y2 }}
              className="h-[18rem] w-full scale-110 object-cover sm:h-[19.2rem]"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center rounded-[2rem] bg-maroon p-8 text-cream sm:col-span-5">
            <p className="font-heading text-xl leading-snug sm:text-2xl">
              Crisp shell, rich golden finish, a tender handmade centre — with whole nuts you can
              see and a warm hit of cardamom and fennel.
            </p>
            <button
              onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-6 inline-flex w-max items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-goldbright transition-colors hover:text-cream"
              data-testid="sensory-cta"
            >
              See what makes it special
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { IMG, WA } from "../../lib/site";

const LINKS = [
  { label: "Our Story", id: "story" },
  { label: "Ingredients", id: "ingredients" },
  { label: "Shop", id: "shop" },
  { label: "Stockists", id: "stock" },
  { label: "FAQ", id: "faq" },
];

const goTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-creamlight/85 backdrop-blur-xl border-b border-maroon/10 py-3" : "bg-transparent py-5"
      }`}
      data-testid="site-nav"
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between">
        <button onClick={() => goTo("top")} className="flex items-center gap-2" data-testid="nav-logo">
          <img src={IMG.logo} alt="Mithila.Foods" className="h-8 sm:h-9 w-auto logo-multiply" />
        </button>

        <div className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => goTo(l.id)}
              className="text-[13px] uppercase tracking-[0.16em] text-ink/70 hover:text-maroon transition-colors duration-300"
              data-testid={`nav-link-${l.id}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={WA.order}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-heritage px-5 py-2.5 text-[13px] font-medium text-paper hover:bg-maroon transition-colors duration-300"
            data-testid="nav-order-btn"
          >
            <MessageCircle className="w-4 h-4" /> Order on WhatsApp
          </a>
          <button
            className="lg:hidden text-maroon p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            data-testid="nav-menu-toggle"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:hidden overflow-hidden bg-creamlight/95 backdrop-blur-xl border-t border-maroon/10"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => { setOpen(false); goTo(l.id); }}
                  className="text-left text-base text-ink/80 hover:text-maroon font-heading"
                  data-testid={`nav-mobile-${l.id}`}
                >
                  {l.label}
                </button>
              ))}
              <a
                href={WA.order}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-heritage px-5 py-3 text-sm font-medium text-paper"
                data-testid="nav-mobile-order"
              >
                <MessageCircle className="w-4 h-4" /> Order on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

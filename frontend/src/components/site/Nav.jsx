import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, ShoppingBag, LogIn, LogOut, User, PackageOpen } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { IMG, WA } from "../../lib/site";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const LINKS = [
  { label: "Shop", id: "shop" },
  { label: "Our Story", id: "craft" },
  { label: "Gifting", id: "gifting" },
  { label: "For Cafés", id: "vendors" },
];

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cart = useCart();
  const { user, loading, login, logout } = useAuth();
  const [userMenu, setUserMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = (id) => {
    if (pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToId(id), 450);
    } else {
      scrollToId(id);
    }
  };

  return (
    <header
      className={`rise-in fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-creamlight/85 backdrop-blur-xl border-b border-maroon/10 py-2.5" : "bg-transparent py-4"
      }`}
      data-testid="site-nav"
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between">
        <button onClick={() => (pathname !== "/" ? navigate("/") : scrollToId("top"))} className="flex items-center" data-testid="nav-logo">
          <img src={IMG.logo} alt="Mithila.Foods" className="h-9 sm:h-11 w-auto" />
        </button>

        <div className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => nav(l.id)}
              className="text-[13px] uppercase tracking-[0.16em] text-ink/70 transition-all duration-300 hover:-translate-y-px hover:text-maroon"
              data-testid={`nav-link-${l.id}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => cart.setOpen(true)}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-maroon/20 text-maroon hover:bg-maroon hover:text-paper transition-colors"
            data-testid="nav-cart-btn"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cart.count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-heritage px-1 text-[10px] font-medium text-paper" data-testid="nav-cart-count">
                {cart.count}
              </span>
            )}
          </button>

          {!loading && (user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenu((v) => !v)}
                className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-maroon/20 text-maroon hover:bg-maroon hover:text-paper transition-colors"
                data-testid="nav-user-btn"
                aria-label="Account"
              >
                {user.picture ? (
                  <img src={user.picture} alt={user.name || "Account"} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </button>
              <AnimatePresence>
                {userMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl border border-maroon/10 bg-creamlight p-2 shadow-xl z-50"
                    data-testid="nav-user-menu"
                  >
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-maroon truncate">{user.name || "Account"}</p>
                      <p className="text-xs text-ink/50 truncate">{user.email}</p>
                    </div>
                    <button onClick={() => { setUserMenu(false); navigate("/orders"); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-ink/80 hover:bg-maroon/5" data-testid="nav-my-orders">
                      <PackageOpen className="h-4 w-4" /> My orders
                    </button>
                    <button onClick={async () => { setUserMenu(false); await logout(); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-maroon hover:bg-maroon/5" data-testid="nav-logout">
                      <LogOut className="h-4 w-4" /> Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={login}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-maroon/25 px-4 py-2 text-[13px] font-medium text-maroon hover:bg-maroon hover:text-paper transition-colors"
              data-testid="nav-signin-btn"
            >
              <LogIn className="h-4 w-4" /> Sign in
            </button>
          ))}

          <a
            href={WA.order}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-heritage px-5 py-2.5 text-[13px] font-medium text-paper hover:bg-maroon transition-colors duration-300"
            data-testid="nav-order-btn"
          >
            <MessageCircle className="w-4 h-4" /> Order on WhatsApp
          </a>
          <button className="lg:hidden text-maroon p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu" data-testid="nav-menu-toggle">
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
                  onClick={() => { setOpen(false); nav(l.id); }}
                  className="text-left text-base text-ink/80 hover:text-maroon font-heading"
                  data-testid={`nav-mobile-${l.id}`}
                >
                  {l.label}
                </button>
              ))}
              <a href={WA.order} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-heritage px-5 py-3 text-sm font-medium text-paper" data-testid="nav-mobile-order">
                <MessageCircle className="w-4 h-4" /> Order on WhatsApp
              </a>
              {!loading && (user ? (
                <>
                  <button onClick={() => { setOpen(false); navigate("/orders"); }} className="inline-flex items-center justify-center gap-2 rounded-full border border-maroon/25 px-5 py-3 text-sm font-medium text-maroon" data-testid="nav-mobile-orders">
                    <PackageOpen className="w-4 h-4" /> My orders
                  </button>
                  <button onClick={async () => { setOpen(false); await logout(); }} className="inline-flex items-center justify-center gap-2 rounded-full border border-maroon/25 px-5 py-3 text-sm font-medium text-maroon" data-testid="nav-mobile-logout">
                    <LogOut className="w-4 h-4" /> Log out
                  </button>
                </>
              ) : (
                <button onClick={() => { setOpen(false); login(); }} className="inline-flex items-center justify-center gap-2 rounded-full border border-maroon/25 px-5 py-3 text-sm font-medium text-maroon" data-testid="nav-mobile-signin">
                  <LogIn className="w-4 h-4" /> Sign in with Google
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

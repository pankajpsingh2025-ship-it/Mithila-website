import React, { useState } from "react";
import { MapPin, Phone, MessageCircle, Facebook, Instagram, Sparkles, Check } from "lucide-react";
import { IMG, WA, SOCIAL, PHONE_DISPLAY } from "../../lib/site";
import { subscribeNewsletter } from "../../lib/api";
import { TriangleBand } from "./Madhubani";

const TikTok = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9V10c-1.3.1-2.5-.3-3.6-1v6.7c0 3.9-2.9 6.3-6.3 5.8-3-.4-5.1-3.2-4.6-6.3.4-2.6 2.6-4.5 5.2-4.4.4 0 .8 0 1.2.1v3.2a3 3 0 0 0-1.4-.2 2.5 2.5 0 1 0 2.7 2.5V3h3.9Z" />
  </svg>
);

const shopLinks = [
  { label: "Gift Box — Large", href: WA.giftLarge },
  { label: "Gift Box — Small", href: WA.giftSmall },
  { label: "Family Pack — 1kg", href: WA.pack1kg },
  { label: "Regular Pack — 500gm", href: WA.pack500 },
];

const navLinks = [
  { label: "Our story", id: "craft" },
  { label: "Shop", id: "shop" },
  { label: "Cafés & wholesale", id: "vendors" },
  { label: "Gifting", id: "gifting" },
  { label: "FAQ", id: "faq" },
];

const socials = [
  { label: "Facebook", href: SOCIAL.facebook, Icon: Facebook },
  { label: "Instagram", href: SOCIAL.instagram, Icon: Instagram },
  { label: "TikTok", href: SOCIAL.tiktok, Icon: TikTok },
];

const go = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
};

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | done | error
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (state === "loading") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setMsg("Please enter a valid email address.");
      return;
    }
    setState("loading");
    try {
      await subscribeNewsletter(email.trim(), "footer");
      setState("done");
      setMsg("You're on the list — we'll be in touch when a fresh batch is ready.");
      setEmail("");
    } catch (err) {
      setState("error");
      setMsg("Couldn't sign you up just now. Please try again in a moment.");
    }
  };

  return (
    <div>
      <h4 className="text-[11px] uppercase tracking-[0.2em] text-goldbright/70">Stay in the loop</h4>
      {state === "done" ? (
        <p className="mt-4 flex items-center gap-2 text-sm text-cream/85" data-testid="newsletter-done">
          <Check className="h-4 w-4 text-goldbright" /> {msg}
        </p>
      ) : (
        <form onSubmit={submit} className="mt-4" data-testid="newsletter-form">
          <div className="flex max-w-sm overflow-hidden rounded-full border border-cream/25 bg-ink/20">
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
              placeholder="your@email.com"
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
              data-testid="newsletter-email"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="shrink-0 bg-goldbright px-4 py-2.5 text-sm font-medium text-maroon transition-colors hover:bg-cream disabled:opacity-60"
              data-testid="newsletter-submit"
            >
              {state === "loading" ? "…" : "Join"}
            </button>
          </div>
          {state === "error" && (
            <p className="mt-2 text-xs text-goldbright/90" data-testid="newsletter-error">{msg}</p>
          )}
          <p className="mt-2 text-xs text-cream/45">Occasional emails — fresh batches, offers around real festivals. No spam.</p>
        </form>
      )}

      <a
        href={WA.vip}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-sm text-cream/80 transition-colors hover:text-goldbright"
        data-testid="footer-vip"
      >
        <Sparkles className="h-4 w-4 text-goldbright" /> Or get fresh-batch alerts on WhatsApp
      </a>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="relative bg-maroon text-cream" data-testid="site-footer">
      <div className="text-goldbright/30">
        <TriangleBand height={14} flip />
      </div>
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={IMG.logo} alt="Mithila.Foods" className="h-9 w-auto rounded-md bg-cream p-1.5" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
              Handcrafted khajuri from the Mithila tradition — real ghee, real jaggery, whole nuts.
              Festival roots, everyday enjoyment.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-goldbright hover:bg-goldbright hover:text-maroon"
                  data-testid={`footer-social-${label.toLowerCase()}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <NewsletterForm />
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-goldbright/70">Explore</h4>
            <ul className="mt-4 space-y-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="text-left text-sm text-cream/80 transition-colors hover:text-goldbright"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-cream/15 pt-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-goldbright/70">Order a pack</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-cream/80 transition-colors hover:text-goldbright"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-7">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-goldbright/70">Contact</h4>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm text-cream/80">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-goldbright" /> Bouddha-6, Kathmandu
              </li>
              <li>
                <a href={`tel:+${PHONE_DISPLAY.replace(/\D/g, "")}`} className="flex items-center gap-2 transition-colors hover:text-goldbright">
                  <Phone className="h-4 w-4 text-goldbright" /> {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={WA.order} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-goldbright" data-testid="footer-whatsapp">
                  <MessageCircle className="h-4 w-4 text-goldbright" /> Order on WhatsApp
                </a>
              </li>
              <li>
                <a href={WA.wholesale} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-goldbright" data-testid="footer-wholesale">
                  <MessageCircle className="h-4 w-4 text-goldbright" /> Cafés &amp; wholesale
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-cream/15 pt-6">
          <p className="text-xs leading-relaxed text-cream/50">
            © 2026 Mithila.Foods — Pawan Mithila Foods Pvt. Ltd. | Handcrafted in Bouddha-6, Kathmandu
          </p>
        </div>
      </div>
    </footer>
  );
};

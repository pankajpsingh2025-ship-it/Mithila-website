import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, MessageCircle, Facebook, Instagram, Sparkles } from "lucide-react";
import { IMG, WA, SOCIAL, PHONE_DISPLAY } from "../../lib/site";

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
  { label: "Our story", id: "story" },
  { label: "Shop", id: "shop" },
  { label: "Cafés & wholesale", id: "vendors" },
  { label: "Gifting", id: "gifting" },
  { label: "FAQ", id: "faq" },
];

const policyLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms-of-service" },
  { label: "Shipping & Returns", to: "/shipping-returns" },
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

/**
 * Fresh-batch alerts run through WhatsApp — the channel the business actually
 * uses. No email capture, since there is no connected mailing system.
 */
const FreshBatchAlerts = () => (
  <div>
    <h4 className="text-[12px] uppercase tracking-[0.16em] text-goldbright/75">Stay in the loop</h4>
    <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/70">
      We make in small batches. Get a message when the next one is ready — around real festivals, no spam.
    </p>
    <a
      href={WA.vip}
      target="_blank"
      rel="noreferrer"
      className="mt-4 inline-flex items-center gap-2 rounded-full bg-goldbright px-5 py-2.5 text-sm font-medium text-maroon transition-colors hover:bg-cream"
      data-testid="footer-vip"
    >
      <Sparkles className="h-4 w-4" /> Fresh-batch alerts on WhatsApp
    </a>
  </div>
);

export const Footer = () => {
  return (
    <footer className="relative bg-ink text-cream" data-testid="site-footer">
      {/* clean, understated top edge */}
      <div className="mx-auto h-px max-w-7xl bg-goldbright/20" />
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
            <FreshBatchAlerts />
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

        <div className="mt-10 flex flex-col gap-4 border-t border-cream/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] leading-relaxed text-cream/55">
            © 2026 Mithila.Foods — Pawan Mithila Foods Pvt. Ltd. | Handcrafted in Bouddha-6, Kathmandu
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
            {policyLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-cream/65 underline-offset-4 transition-colors hover:text-goldbright hover:underline"
                  data-testid={`footer-policy-${l.to.slice(1)}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

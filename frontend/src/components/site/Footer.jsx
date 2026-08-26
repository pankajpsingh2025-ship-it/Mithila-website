import React from "react";
import { MapPin, Phone, MessageCircle, Facebook, Instagram } from "lucide-react";
import { IMG, WA, PHONE_DISPLAY, SOCIAL } from "../../lib/site";
import { TriangleBand } from "./Madhubani";

const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M16.5 3c.3 2.1 1.6 3.7 3.7 4v2.7c-1.4.1-2.7-.3-3.9-1v5.9c0 3.2-2.4 5.6-5.5 5.6A5.5 5.5 0 0 1 5.3 14.7c0-3 2.3-5.4 5.3-5.5.4 0 .8 0 1.2.1v2.8c-.4-.1-.8-.2-1.2-.2-1.5 0-2.7 1.2-2.7 2.8 0 1.6 1.2 2.8 2.7 2.8 1.6 0 2.8-1.2 2.8-3V3h3.1z" />
  </svg>
);

const ICONS = { facebook: Facebook, instagram: Instagram, tiktok: TikTokIcon };

const Socials = ({ className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`} data-testid="social-links">
    {SOCIAL.map((s) => {
      const Icon = ICONS[s.key];
      return (
        <a
          key={s.key}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          title={s.label}
          className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-goldbright hover:bg-goldbright hover:text-maroon"
          data-testid={`social-${s.key}`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      );
    })}
  </div>
);

const shopLinks = [
  { label: "Gift Box — Large", href: WA.giftLarge },
  { label: "Gift Box — Small", href: WA.giftSmall },
  { label: "1kg Pack", href: WA.pack1kg },
  { label: "500gm Pack", href: WA.pack500 },
];

export const Footer = () => {
  return (
    <footer className="relative bg-maroon text-cream" data-testid="site-footer">
      <div className="text-goldbright/30"><TriangleBand height={14} flip /></div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* brand */}
          <div className="md:col-span-5">
            <img src={IMG.logo} alt="Mithila.Foods" className="h-9 w-auto bg-cream rounded-md p-1.5" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
              Mithila.Foods — The only heritage Mithila brand in Kathmandu. Handcrafted khajuri, made the traditional Terai way.
            </p>
            <Socials className="mt-6" />
          </div>

          {/* shop */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-goldbright/70">Shop</h4>
            <ul className="mt-5 space-y-3">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-cream/80 transition-colors hover:text-goldbright"
                    data-testid={`footer-shop-${l.label.replace(/\W+/g, "-").toLowerCase()}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-goldbright/70">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm text-cream/80">
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-goldbright" /> Bouddha-6, Kathmandu</li>
              <li>
                <a href={`tel:+${PHONE_DISPLAY.replace(/\D/g, "")}`} className="flex items-center gap-3 transition-colors hover:text-goldbright">
                  <Phone className="h-4 w-4 text-goldbright" /> {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={WA.order} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition-colors hover:text-goldbright" data-testid="footer-whatsapp">
                  <MessageCircle className="h-4 w-4 text-goldbright" /> Order on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/15 pt-6">
          <p className="text-xs leading-relaxed text-cream/50">
            © 2026 Mithila.Foods — Pawan Mithila Foods Pvt. Ltd. | Handcrafted in Bouddha-6, Kathmandu
          </p>
        </div>
      </div>
    </footer>
  );
};

# Mithila.Foods — Product Requirements (PRD)

## Original Problem Statement
Build a single-page, cinematic scrolling marketing website for **Mithila.Foods** (the only heritage Mithila brand in Kathmandu; product = handcrafted *khajuri*, a traditional Terai fried savory-sweet snack). Exact copy/prices/colors/fonts per the official brief. Warm, earthy, cream/gold/maroon heritage-craft aesthetic — never dark or moody. Award-worthy (Awwwards-level) motion: on-load masked hero reveal, subtle parallax/3D, staggered reveals, an editorial marquee, smooth momentum scrolling.

## User Choices
- AI-generate all imagery initially; user will supply real photos → **user later provided real product photos + official logo**, now used across the site (AI used only for the 9 ingredient macros).
- Follow brief exactly; improve where sensible; "3D aesthetic".

## Architecture
- **Frontend only** (React 19 + CRA/craco + Tailwind). No backend, no auth, no DB.
- Motion: `framer-motion` (reveals, masked hero lines, 3D tilt product cards, scroll parallax) + `lenis` (momentum smooth scroll, initialized in `App.js`, exposed as `window.__lenis`).
- Fonts: Fraunces (headings) + Work Sans (body) via Google Fonts in `public/index.html`.
- Brand colors added to `tailwind.config.js` (maroon, ink, gold, goldbright, golddeep, kraft, cream, creamlight, heritage, paper).
- Content/constants centralized in `src/lib/site.js` (copy, prices, WhatsApp deep-links, image paths, FAQs).
- Sections in `src/components/site/`; assembled in `src/pages/Home.jsx`.
- Madhubani accents rendered as inline SVG (`Madhubani.jsx`: sun face, triangle band, peacock, sun divider).
- Images served from `public/real/*.jpg` (real photos) and `public/gen/ing_*.jpg` (AI ingredient macros).

## Key Facts (fixed — do not alter)
- Order line only: 9849453348 → https://wa.me/9779849453348 (all CTAs deep-link with prefilled text).
- Products: Gift Box Large NPR 1,199 / Gift Box Small NPR 699 / Family Pack 1kg NPR 999 / Regular Pack 500gm NPR 499.
- Pouches = matte black stand-up with clear window (never "kraft"); kraft = outer gift bags only.
- 9 ingredients; allergen: contains nuts, dairy, gluten; NO egg. Exactly 5 FAQs. No social links.

## Implemented (2026-06)
- Full single-page site: Nav, Kinetic Hero (masked reveal + parallax + floating product + Madhubani sun), Trust marquee, Our Story (numbered chapters), Ingredients scroll-through (9 macros + allergen), Products (4 tilt cards), Lifestyle chai parallax, Corporate & Bulk gifting, Café/Stockist pitch, Delivery & Payment, FAQ accordion (5), Closing CTA, Footer.
- Real photos wired: hero/products/gift bags/pouches/chai-dip/logo. AI only for ingredient macros.
- Verified by testing agent (iteration_1): 100% frontend — all sections render, 21/21 images load, real photos confirmed, WA links + params correct, FAQ toggle, smooth scroll, correct prices, 0 console errors.

## Backlog / Next
- P1: Swap in user's final logo.png when provided (currently uses shared logo image with multiply blend).
- P2: Add mobile-nav data-testid parity (nav-link-* mirror) — cosmetic for tests.
- P2: Optional OG/meta tags + favicon for sharing.

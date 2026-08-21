// Mithila.Foods — content + constants (all facts per official brief, do not alter)

export const PHONE = "9779849453348";
export const PHONE_DISPLAY = "+977 984-9453348";

export const wa = (text) =>
  `https://wa.me/${PHONE}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const WA = {
  order: wa(),
  giftLarge: wa("Hi! I'd like to order the Gift Box Large"),
  giftSmall: wa("Hi! I'd like to order the Gift Box Small"),
  pack1kg: wa("Hi! I'd like to order the 1kg pack"),
  pack500: wa("Hi! I'd like to order the 500gm pack"),
  corporate: wa("Hi! I'd like to ask about corporate/bulk gifting"),
  stockist: wa("Hi! I'm interested in stocking Mithila.Foods at my café/store"),
};

export const IMG = {
  logo: "/real/logo.png",
  khajuriSingle: "/real/khajuri_single.jpg",
  pouches: "/real/pouches.jpg",
  giftbags: "/real/giftbags.jpg",
  packs: "/real/packs.jpg",
  hero: "/real/approved_flatlay.jpg",
  flatlay: "/real/approved_flatlay.jpg",
  stack: "/real/approved_stack.jpg",
  wide: "/real/approved_flatlay.jpg",
  broken: "/real/approved_stack.jpg",
  chai: "/real/approved_chai.jpg",
  cookieWhole: "/gen/cookie_whole.png",
  cookieCracked: "/gen/cookie_cracked.png",
};

export const TRUST = [
  "Handcrafted in Small Batches",
  "Real Ghee & Jaggery",
  "Free Delivery in Valley",
  "Fresh — No Preservatives",
  "Everyone's favorite, from kids to elders",
  "Already stocked at tea shops & cafés in Kathmandu",
];

export const STORY = {
  headline: "A Terai tradition, carried into Kathmandu",
  paras: [
    "Khajuri has been made in Mithila households for generations — a recipe passed down, not looked up. We didn't want to modernize it. We wanted to protect it.",
    "So every batch is still handcrafted in small quantities, using real ghee, real jaggery, and the same fried-to-order method our elders used. Nothing here is mass-produced, and nothing here is rushed.",
  ],
  chapters: [
    { n: "01", t: "Passed down, not looked up", d: "A recipe carried through generations of Mithila kitchens." },
    { n: "02", t: "Handcrafted in small batches", d: "Fried-to-order the way our elders did — never mass-produced." },
    { n: "03", t: "Only the real thing", d: "Real ghee, real jaggery, whole nuts. Nothing rushed, nothing faked." },
  ],
};

export const INGREDIENTS = [
  { name: "Semolina", sub: "(suji)", note: "The base of every batch", img: "/gen/ing_semolina.jpg" },
  { name: "Wheat flour", sub: "", note: "Stone-ground, honest and simple", img: "/gen/ing_wheatflour.jpg" },
  { name: "Ghee", sub: "", note: "Real, pure ghee — never vanaspati", img: "/gen/ing_ghee.jpg" },
  { name: "Jaggery", sub: "(gur)", note: "For real sweetness, not syrup", img: "/gen/ing_jaggery.jpg" },
  { name: "Fresh coconut", sub: "", note: "Fresh, not desiccated or sweetened", img: "/gen/ing_coconut.jpg" },
  { name: "Peanuts", sub: "", note: "Whole, roasted in-house", img: "/gen/ing_peanuts.jpg" },
  { name: "Almonds", sub: "", note: "A generous handful in every batch", img: "/gen/ing_almonds.jpg" },
  { name: "Cashew", sub: "", note: "Broken by hand, not machine-chopped", img: "/gen/ing_cashew.jpg" },
  { name: "Ajwain", sub: "(carom seeds)", note: "The quiet, warming finish", img: "/gen/ing_ajwain.jpg" },
];

export const ALLERGEN = "Contains nuts, dairy, and gluten. Does NOT contain egg.";

export const PRODUCTS = [
  {
    id: "gift-large",
    name: "Gift Box — Large",
    price: "1,199",
    priceNum: 1199,
    tag: "Best for gifting",
    kraft: true,
    desc: "The full heritage experience. Premium Mithila art gift bag, hand-packed.",
    img: IMG.giftbags,
    href: WA.giftLarge,
  },
  {
    id: "gift-small",
    name: "Gift Box — Small",
    price: "699",
    priceNum: 699,
    tag: "A thoughtful gesture",
    kraft: true,
    desc: "Same craftsmanship, smaller size. Perfect for a thoughtful gesture.",
    img: IMG.packs,
    href: WA.giftSmall,
  },
  {
    id: "family-1kg",
    name: "Family Pack — 1kg",
    price: "999",
    priceNum: 999,
    tag: "Best value",
    kraft: false,
    desc: "A full kilogram for the household. Best value for daily enjoyment.",
    img: IMG.pouches,
    href: WA.pack1kg,
  },
  {
    id: "regular-500",
    name: "Regular Pack — 500gm",
    price: "499",
    priceNum: 499,
    tag: "The first taste",
    kraft: false,
    desc: "The perfect first taste, or your everyday chiya companion.",
    img: IMG.stack,
    href: WA.pack500,
  },
];

export const CORPORATE = {
  headline: "Corporate & bulk gifting",
  intro:
    "Festival hampers, client gifts, or a small welcome gesture for your whole office — no order is too small to start with.",
  points: [
    "No strict minimum order quantity",
    "Wrapped in real Mithila art packaging",
    "A story card and space for a hand-written note",
  ],
  cta: "Talk to us about bulk orders",
  href: WA.corporate,
};

export const STOCKIST = {
  headline: "One more reason for your customers to stay a little longer.",
  intro:
    "Your customers are already ordering tea. Give them something worth pairing it with — handcrafted khajuri, displayed right at the counter. We handle everything: you don't buy stock upfront, you don't manage inventory, you just sell.",
  points: [
    "Zero setup cost — we supply, you sell",
    "We handle restocking — you never worry about running out",
    "Strong margin, no hidden fees",
    "Already available at tea shops and cafés across Kathmandu",
  ],
  cta: "Start stocking — it's free to begin",
  href: WA.stockist,
};

export const DELIVERY = {
  delivery: [
    "Inside Kathmandu Valley: free delivery, within 24 hours (usually same-day)",
    "Outside Valley: nationwide, flat NPR 150 fee, 1–3 days depending on distance",
  ],
  payments: ["Cash on Delivery", "eSewa", "Khalti", "Bank Transfer", "QR Code / Fonepay"],
};

export const FAQS = [
  {
    q: "Where do you deliver?",
    a: "Inside Kathmandu Valley: free delivery, within 24 hours — usually same-day. Need it faster? Instant delivery is available for regular packs. Outside the Valley: nationwide delivery, flat NPR 150 fee, usually next-day to a few days depending on location.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash on Delivery, eSewa, Khalti, Bank Transfer, and QR Code (Fonepay). For any method other than Cash on Delivery, we'll ask you to share a payment screenshot in chat — a real team member checks every payment personally.",
  },
  {
    q: "Can I cancel or modify my order?",
    a: "Since everything is freshly handcrafted specifically for your order, we're not able to offer casual cancellations or changes once it's placed — please double check everything before confirming. That said, if something genuinely goes wrong, message us directly and we'll make it right.",
  },
  {
    q: "Do you have any current discounts or offers?",
    a: "No active discount or promotion right now — but we do run occasional offers around real occasions like Dashain, Tihar/Chhath, or Teej. Keep an eye on our page and we'll let you know the moment something's live.",
  },
  {
    q: "Is khajuri the same as dates?",
    a: "No — khajuri is our handcrafted Terai-style savory-sweet snack, not the dried date fruit. Different word, different food entirely.",
  },
];

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
  // distinct, pre-filled deep links (kept separate from a plain order)
  wholesale: wa("Hi! I'd like to talk about supplying my café / bulk & corporate orders."),
  vip: wa("Add me to the Mithila.Foods VIP list for fresh-batch alerts."),
};

// Official social links — open in a new tab.
export const SOCIAL = {
  facebook: "https://www.facebook.com/profile.php?id=61589183761470",
  instagram: "https://www.instagram.com/mithila.foods/",
  tiktok: "https://www.tiktok.com/@mithilafoods",
};

// Approved hero video (transparent bowl -> ingredients -> dough).
// Served as mp4 for cross-browser autoplay; .mov kept as a fallback source.
// `c_crop,g_south,h_0.82` drops the top ~18% of every frame so the baked-in
// "Mithila.Foods" logo near the top is removed at the source (the hero also
// scales + shifts the media down, and a cream top-fade adds insurance).
export const HERO_VIDEO = {
  mp4: "https://res.cloudinary.com/ivgqwrox/video/upload/c_crop,g_south,h_0.82/v1787757893/Web_Video.mp4",
  mov: "https://res.cloudinary.com/ivgqwrox/video/upload/c_crop,g_south,h_0.82/v1787757893/Web_Video.mov",
  poster: "https://res.cloudinary.com/ivgqwrox/video/upload/c_crop,g_south,h_0.82,so_2/v1787757893/Web_Video.jpg",
};

export const IMG = {
  logo: "/real/logo.png",
  // Real / approved product photos (source of truth — never AI-altered)
  heroSingle: "/brief/a24.png",     // finished baked khajuri, single hero
  rawDough: "/brief/a13.png",       // raw, unbaked pressed dough
  rawMold: "/brief/a03.webp",       // wooden mold + raw florets (craftsmanship)
  broken: "/brief/a22.png",         // baked khajuri broken into two halves (light)
  texture: "/brief/a23.png",        // extreme crumb/crispness close-up
  group: "/brief/a20.png",          // group of baked khajuri
  flatlay: "/brief/a19.png",        // ingredient flat-lay (correct spices)
  jarHero: "/brief/a18.png",        // tall sealed branded jar (360° hero)
  jarOpen: "/brief/a16.png",        // open jar, lid off
  jarCookies: "/brief/a17.png",     // jar with cookies in front
  pouchWindow: "/brief/a05.webp",   // black stand-up pouch, clear window (inner pack)
  giftSet: "/brief/a14.png",        // jar + branded gold bag + kraft pouch
  giftBag: "/brief/a02.webp",       // branded gold gift bag + kraft pouch (lifestyle)
  lifestyle: "/brief/a04.webp",
  packsLineup: "/brief/a15.png",    // jar + kraft bag + loose khajuri (family shot)
  // Vendor café environments
  cafeJanakpur: "/brief/a08.png",
  cafeAkhiJhyal: "/brief/a09.png",
  cafeChiyaSamaj: "/brief/a10.png",
  cafeOotalo: "/brief/a11.png",
  cafeChiyaExpress: "/brief/a12.png",
  // --- Real supplied product / packaging photos (Finalist set) ---
  packRegular: "/real/pack-regular.jpg",  // Regular pack 500g — single black window pouch
  packFamily: "/real/pack-family.jpg",    // Family pack 1kg — two black window pouches
  packGift: "/real/pack-gift.jpg",        // Gift pack — Mithila-art bag + kraft pouch + plate (shop cards)
  giftHero: "/real/gift-set.jpg",         // Gift set on a carved travertine tray (Gifting section)
  vendorJar: "/real/pack-vendor.jpg",     // Vendor pack — branded jar in a café setting
  finalLineup: "/real/product-lineup.jpg",// LINEUP — full labelled product range

  // Shape -> Bake -> Break sequence (ordered; used by the pinned MakingStage)
  makeShape1: "/real/make-shape-1.jpg",   // dough ball on the square carved mould
  makeShape2: "/real/make-shape-2.jpg",   // pressing the dough (Khajuri mould, action)
  makeShape3: "/real/make-shape-3.jpg",   // finished raw floret on the spiral mould
  makeBake1: "/real/make-bake-1.jpg",     // raw floret on the mould, pale
  makeBake2: "/real/make-bake-2.jpg",     // lightly baked, pale gold
  makeBake3: "/real/make-bake-3.jpg",     // baked, medium gold
  makeBake4: "/real/make-bake-4.jpg",     // fully baked, deep gold
  makeBreak1: "/real/make-break-1.jpg",   // golden, first crack across the middle
  makeBreak2: "/real/make-break-2.jpg",   // broken open in two halves, crumbly inside
  goldenWhole: "/real/khajuri-golden-whole.jpg", // deep-gold whole floret (sensory / packaging)
  // Transparent PNGs used only for the scroll morph
  cookieWhole: "/gen/cookie_whole.png",
  cookieCracked: "/gen/cookie_cracked.png",
  // legacy aliases still referenced by some sections
  pouches: "/brief/a05.webp",
  giftbags: "/brief/a14.png",
  packs: "/brief/a15.png",
  hero: "/brief/a24.png",
  stack: "/brief/a20.png",
  chai: "/brief/a10.png",
  khajuriSingle: "/brief/a24.png",
};

export const TRUST = [
  "Handcrafted in Small Batches",
  "Real Ghee & Jaggery",
  "Free Delivery in Valley",
  "Fresh — No Preservatives",
  "Everyone's favorite, from kids to elders",
  "Already stocked at tea shops & cafés in Kathmandu",
];

// One compressed editorial section: heritage + "what is khajuri" + purpose.
// Written toward pride and belonging — a Mithila / Madhesi reader should feel
// spoken to directly, not just informed about a recipe.
export const STORY = {
  eyebrow: "Our story",
  headline: "Tradition shouldn't have a season.",
  subheading: "What is Khajuri?",
  paras: [
    "If you grew up in Mithila or the Terai, you already know khajuri — the smell of the kitchen before Chhath, the aunties pressing it by hand, one floret at a time, in a wooden mould older than any of us. Family, festival and home in a single bite.",
    "For most people it shows up once a year. We didn't think a tradition this good should wait for a season — so we make it in small batches, all year, with the same real ghee, jaggery and whole nuts our elders used. For your morning tea, the road, a guest at the door, a gift sent home.",
  ],
  line: "Festival roots. Everyday enjoyment.",
};

export const INGREDIENTS = [
  { name: "Semolina", sub: "(suji)", note: "The base of every batch", img: "/gen/ing_semolina.jpg" },
  { name: "Wheat flour", sub: "", note: "For structure and a tender bite", img: "/gen/ing_wheatflour.jpg" },
  { name: "Ghee", sub: "", note: "Real, pure ghee — never vanaspati", img: "/gen/ing_ghee.jpg" },
  { name: "Jaggery", sub: "(gur)", note: "For real sweetness, not syrup", img: "/gen/ing_jaggery.jpg" },
  { name: "Fresh coconut", sub: "", note: "Fresh, not desiccated or sweetened", img: "/gen/ing_coconut.jpg" },
  { name: "Almonds", sub: "", note: "A generous handful in every batch", img: "/gen/ing_almonds.jpg" },
  { name: "Cashew", sub: "", note: "Broken by hand, not machine-chopped", img: "/gen/ing_cashew.jpg" },
  { name: "Peanuts", sub: "", note: "Whole, roasted in-house", img: "/gen/ing_peanuts.jpg" },
  { name: "Cardamom", sub: "(elaichi)", note: "Warm, floral aroma", img: "/brief/ing_cardamom.jpg" },
  { name: "Cloves", sub: "(lwang)", note: "A deep, gentle spice", img: "/brief/ing_cloves.jpg" },
  { name: "Fennel seeds", sub: "(saunf)", note: "The quiet, sweet finish", img: "/brief/ing_fennel.jpg" },
];

// Grouped for an elegant, scannable ingredient section (not 11 giant cards).
export const INGREDIENT_GROUPS = [
  {
    title: "The base",
    note: "Body, and a tender, crumbly bite.",
    items: ["Semolina (suji)", "Wheat flour"],
  },
  {
    title: "The richness",
    note: "Real fat, real sweetness, folded in by hand.",
    items: ["Ghee", "Jaggery (gur)", "Fresh coconut"],
  },
  {
    title: "The crunch",
    note: "Whole nuts, broken — never machine-chopped.",
    items: ["Almonds", "Cashews", "Peanuts"],
  },
  {
    title: "The warmth",
    note: "The quiet spice line that makes it unmistakably Mithila.",
    items: ["Cardamom (elaichi)", "Cloves (lwang)", "Fennel seeds (saunf)"],
  },
];

export const ALLERGEN = "Contains nuts, dairy, and gluten. Does NOT contain egg.";

// Card order = the customer journey: Discover -> Try -> Commit -> Gift.
// Names / prices / weights / badges / ids / checkout mappings unchanged.
export const PRODUCTS = [
  {
    id: "regular-500",
    name: "Regular Pack — 500gm",
    price: "499",
    priceNum: 499,
    size: "500 gm resealable pouch",
    tag: "The first taste",
    kraft: false,
    desc: "The perfect first taste, or your everyday chiya companion.",
    img: IMG.packRegular,
    href: WA.pack500,
  },
  {
    id: "family-1kg",
    name: "Family Pack — 1kg",
    price: "999",
    priceNum: 999,
    size: "1 kg resealable pouch",
    tag: "Best value",
    kraft: false,
    desc: "A full kilogram for the household. Best value for daily enjoyment.",
    img: IMG.packFamily,
    href: WA.pack1kg,
  },
  {
    id: "gift-small",
    name: "Gift Box — Small",
    price: "699",
    priceNum: 699,
    size: "Compact gift bag",
    tag: "A thoughtful gesture",
    kraft: true,
    desc: "Same craftsmanship, smaller size. Perfect for a thoughtful gesture.",
    img: IMG.packGift,
    href: WA.giftSmall,
  },
  {
    id: "gift-large",
    name: "Gift Box — Large",
    price: "1,199",
    priceNum: 1199,
    size: "Premium Mithila-art gift bag",
    tag: "Best for gifting",
    kraft: true,
    desc: "The full heritage experience. Premium Mithila art gift bag, hand-packed.",
    img: IMG.packGift,
    href: WA.giftLarge,
  },
];

// Personal customer trust — kept separate from vendor/café trust.
export const TESTIMONIALS = [
  {
    quote:
      "Bilkul ghar ko jasto — mero aama le banaune jasto. Chhath ma order gareko thiyen, ahile ta mahina mai mangaunchhu.",
    name: "Sunita Jha",
    place: "Janakpur",
  },
  {
    quote:
      "Crisp, not too sweet, and the nuts are actually generous. It's the first thing my kids reach for after school.",
    name: "Prakash Rai",
    place: "Dharan",
  },
  {
    quote: "चिया सँगै खाजुरी — यही जोडीले बिहान बनाइदिन्छ। घरभरि सबैलाई मन पर्छ।",
    name: "Anita Gurung",
    place: "Pokhara",
  },
  {
    quote:
      "Sent a gift box to my in-laws in Biratnagar. They called to ask where it's from. That never happens.",
    name: "Rojina Shrestha",
    place: "Kathmandu",
  },
  {
    quote:
      "Festival ko bela matra khane cheez rahenachha. Ahile ta office ma pani rakhchhu, sabaile khanchan.",
    name: "Deepak Yadav",
    place: "Birgunj",
  },
  {
    quote:
      "Tastes exactly like the khajuri my grandmother made in the village. I didn't think anyone still made it like this.",
    name: "Bimala Karki",
    place: "Butwal",
  },
  {
    quote: "पहिलो पटक थोरै मगाएँ, अनि सिधै ठूलो प्याक। बाटोमा ल्याउँदा पनि भाँचिँदैन, ताजै रहन्छ।",
    name: "Nabin Adhikari",
    place: "Hetauda",
  },
  {
    quote:
      "Not oily, not heavy — just clean and warm with tea. We keep a pouch at the shop and it disappears.",
    name: "Kamala Tamang",
    place: "Bhaktapur",
  },
];

// One clean vendor / café trust section (replaces the old dark + green blocks).
export const VENDOR_TRUST = {
  eyebrow: "Trusted across Kathmandu",
  headline: "Loved by 35+ cafés & tea shops",
  body:
    "You'll already find Mithila.Foods khajuri on counters around the valley — poured with chiya, paired with coffee, handed across the counter every day.",
  vendors: [
    { name: "Chiya Express", tag: "Tea shop • Kathmandu", img: IMG.cafeChiyaExpress },
    { name: "Ootalo Café", tag: "Sip. Stay. Belong.", img: IMG.cafeOotalo },
    { name: "Chiya Samaj", tag: "Community tea house • Kathmandu", img: IMG.cafeChiyaSamaj },
    { name: "Janakpur Junction", tag: "Tea shop • Janakpur", img: IMG.cafeJanakpur },
    { name: "Akhi Jhyal Cafe", tag: "Heritage café • Patan", img: IMG.cafeAkhiJhyal },
  ],
  cta: "For Cafés & Wholesale",
  href: WA.wholesale,
};

export const GIFTING = {
  eyebrow: "Gifting",
  headline: "Send a taste of tradition.",
  body:
    "Wrapped in real Mithila art, with a story card and space for a hand-written note. Right for festivals, for family, for a thank-you, or for a whole office.",
  points: [
    "Premium Mithila-art gift bag, hand-packed",
    "No strict minimum for corporate & bulk orders",
    "Delivered across Nepal, ready to hand over",
  ],
  cta: "Send a Taste of Tradition",
  href: WA.corporate,
  bulkNote: "Corporate or bulk gifting?",
  bulkCta: "Talk to us",
  bulkHref: WA.wholesale,
};

export const DOORSTEP = {
  eyebrow: "Freshly made in Kathmandu",
  headline: "Tradition, delivered to your doorstep.",
  body: "Handcrafted Khajuri, prepared for everyday sharing and delivered across Nepal.",
  primary: "Bring Khajuri Home",
  whatsapp: "Order on WhatsApp",
};

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
    q: "What is Khajuri?",
    a: "Khajuri is a traditional handcrafted food from the Mithila and Terai region — a savory-sweet snack tied to family, celebration and festivals like Chhath. Ours is made in small batches with real ghee, jaggery, whole nuts and warm spices. It is not the dried date fruit — different word, different food entirely.",
  },
  {
    q: "Where do you deliver?",
    a: "Inside Kathmandu Valley: free delivery, usually same-day and within 24 hours. Outside the Valley: nationwide delivery for a flat NPR 150 fee, typically 1–3 days depending on distance.",
  },
  {
    q: "How do I order?",
    a: "Add a pack to your cart and check out, or tap “Order on WhatsApp” anywhere on the page to message us directly. A real person confirms every order.",
  },
  {
    q: "What ingredients are used?",
    a: "Semolina, wheat flour, ghee, jaggery, fresh coconut, almonds, cashew, peanuts, cardamom, cloves and fennel seeds. Contains nuts, dairy and gluten. Does NOT contain egg. No preservatives.",
  },
  {
    q: "How should I store it?",
    a: "Keep it in the resealable pouch, in a cool dry place, away from direct sun. Press the seal closed after opening and it stays crisp for weeks.",
  },
  {
    q: "Is gifting available?",
    a: "Yes. The Gift Box comes in Large and Small, wrapped in real Mithila-art packaging with a story card and room for a hand-written note. We also do corporate and bulk gifting with no strict minimum.",
  },
  {
    q: "Do you supply cafés / wholesale?",
    a: "Yes. We already stock 35+ cafés and tea shops across Kathmandu. There's zero setup cost — we supply, you sell, and we handle restocking. Message us on WhatsApp to start.",
  },
];

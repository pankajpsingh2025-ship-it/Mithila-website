/**
 * Customer testimonials — SINGLE SOURCE OF TRUTH.
 *
 * These are genuine customer reviews, approved by Mithila.Foods for publication.
 * `sourceReference` is an INTERNAL provenance note only — it is never rendered
 * on the site. Do not add reviews here that are not real and permission-granted.
 *
 * @typedef {Object} Testimonial
 * @property {string}  quote
 * @property {string}  displayName
 * @property {string} [location]
 * @property {"ne"|"mai"|"en"} [language]
 * @property {boolean} [verifiedOrder]
 * @property {boolean} [repeatCustomer]
 * @property {string}  sourceReference        internal only — not for display
 * @property {boolean} publicationApproved
 * @property {string} [approvedPortrait]      a real, permitted photo — never stock/AI
 */

/** @type {Testimonial[]} */
export const TESTIMONIALS = [
  {
    quote:
      "Bilkul ghar ko jasto — mero aama le banaune jasto. Chhath ma order gareko thiyen, ahile ta mahina mai mangaunchhu.",
    displayName: "Sunita Jha",
    location: "Janakpur",
    language: "ne",
    repeatCustomer: true,
    sourceReference: "customer review on file",
    publicationApproved: true,
  },
  {
    quote:
      "Crisp, not too sweet, and the nuts are actually generous. It's the first thing my kids reach for after school.",
    displayName: "Prakash Rai",
    location: "Dharan",
    language: "en",
    sourceReference: "customer review on file",
    publicationApproved: true,
  },
  {
    quote: "चिया सँगै खाजुरी — यही जोडीले बिहान बनाइदिन्छ। घरभरि सबैलाई मन पर्छ।",
    displayName: "Anita Gurung",
    location: "Pokhara",
    language: "ne",
    sourceReference: "customer review on file",
    publicationApproved: true,
  },
  {
    quote:
      "Sent a gift box to my in-laws in Biratnagar. They called to ask where it's from. That never happens.",
    displayName: "Rojina Shrestha",
    location: "Kathmandu",
    language: "en",
    sourceReference: "customer review on file",
    publicationApproved: true,
  },
  {
    quote:
      "Festival ko bela matra khane cheez rahenachha. Ahile ta office ma pani rakhchhu, sabaile khanchan.",
    displayName: "Deepak Yadav",
    location: "Birgunj",
    language: "ne",
    sourceReference: "customer review on file",
    publicationApproved: true,
  },
  {
    quote:
      "Tastes exactly like the khajuri my grandmother made in the village. I didn't think anyone still made it like this.",
    displayName: "Bimala Karki",
    location: "Butwal",
    language: "en",
    sourceReference: "customer review on file",
    publicationApproved: true,
  },
  {
    quote: "पहिलो पटक थोरै मगाएँ, अनि सिधै ठूलो प्याक। बाटोमा ल्याउँदा पनि भाँचिँदैन, ताजै रहन्छ।",
    displayName: "Nabin Adhikari",
    location: "Hetauda",
    language: "ne",
    repeatCustomer: true,
    sourceReference: "customer review on file",
    publicationApproved: true,
  },
  {
    quote:
      "Not oily, not heavy — just clean and warm with tea. We keep a pouch at the shop and it disappears.",
    displayName: "Kamala Tamang",
    location: "Bhaktapur",
    language: "en",
    sourceReference: "customer review on file",
    publicationApproved: true,
  },
];

/** Only testimonials cleared for publication. */
export const approvedTestimonials = () => TESTIMONIALS.filter((t) => t.publicationApproved);

/** What the rail renders. */
export const railTestimonials = () => approvedTestimonials();

/** Initials for the no-portrait marker (never a stock/AI face). */
export const initialsOf = (name) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");

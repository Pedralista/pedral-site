export interface CollectionVariant {
  name: string;
  stripePriceId: string;
  stock: number;
  description?: string;
  image?: string;
}

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  hook: string;
  description: string;
  descriptionExtra?: string;
  designerNote: string;
  year: number;
  tier: "signature" | "limited";
  price: number;
  stock: number;
  maxStock: number;
  edition: string;
  badge: string;
  urgencyTag: string;
  specsTitle: string;
  specs: Record<string, string>;
  boxContents: string[];
  valueAnchor: string;
  valueComparePrice: string;
  detailStrip: {
    eyebrow: string;
    title: string;
    text: string;
  };
  testimonials: {
    quote: string;
    name: string;
    bio: string;
  }[];
  testimonialsLabel?: string;
  newsletterTitle: string;
  newsletterSub: string;
  image: string;
  heroImage?: string;
  detailImage?: string;
  galleryImages?: string[];
  variants?: CollectionVariant[];
  isPreOrder?: boolean;
  depositAmount?: number;
  comingSoonEditions?: { name: string; description: string; image?: string }[];
}

export const collections: Collection[] = [
  {
    slug: "maestro",
    name: "Maestro",
    tagline: "Limited Allocation",
    hook: "The person who notices this watch already understands it.",
    description:
      "At 37mm, the monobloc tonneau case and fluted bezel frame a textured sunburst dial where lumed Roman numerals meet a diagonal time display. A detail most will pass over.",
    descriptionExtra:
      "Hexagonal bracelet links follow the wrist's natural curve. The watch does not announce itself.",
    designerNote:
      "Maestro is a dress watch for people who don't need to be told it's a dress watch. The tonneau case, the diagonal display, the hexagonal bracelet. Each decision has a reason. None of them are decorative.",
    year: 2025,
    tier: "signature",
    price: 1300,
    stock: 7,
    maxStock: 20,
    edition: "Frosted Flex",
    badge: "Limited Allocation",
    urgencyTag: "Limited pieces remaining",
    specsTitle: "Swiss precision. Stockholm soul.",
    specs: {
      Movement: "Sellita SW200-1b — Swiss automatic, 38-hour power reserve",
      Case: "37mm monobloc tonneau, stainless steel, HV1200 coating",
      Dial: "Two-tier guilloché: rhombus centre, angular rooftops, sunburst outer ring",
      Crystal: "Flat sapphire with internal Super-AR coating",
      Bracelet: "Integrated hexagonal links, follows the wrist's natural curve",
      Lume: "Swiss Super-LumiNova® BGW9 on hands and indices",
      "Water Resist.": "100 meters / 330 feet",
    },
    boxContents: [
      "Maestro timepiece",
      "Strap adapter tool",
      "Artisanal leather travel roll",
      "Polishing cloth",
      "Butterfly clasp",
      "12-month warranty card",
      "€20 bespoke strap credit",
      "Personal note from Kevin",
    ],
    valueAnchor:
      "Dress watches with Swiss Sellita movements, sapphire crystal, and integrated bracelet from established houses start at €2,800+. Without the retail margin, the difference stays in the watch.",
    valueComparePrice: "€2,800+",
    detailStrip: {
      eyebrow: "The Diagonal Display",
      title: "A principle, not a detail.",
      text: "The diagonal time display is a driving watch principle. Read the time without turning your wrist. It is one of those decisions that, once understood, makes everything else seem obvious.",
    },
    testimonials: [
      {
        quote:
          "The Maestro reflects a clear design position. The diagonal display and tonneau architecture are resolved decisions. With time, the logic becomes evident.",
        name: "Adrien L.",
        bio: "Investment Analyst · Lyon · Maestro Owner",
      },
      {
        quote:
          "At 37mm with that tonneau case, it wears like something that cost five times more. The diagonal display is one of those details you don't notice until you do. Then you can't unsee it.",
        name: "Pieter V.",
        bio: "Photographer · Amsterdam · Second Pedral purchase",
      },
    ],
    variants: [
      {
        name: "Lapis No.1",
        stripePriceId: "price_1T4Tw7CfxE1lSBKRY9zmQqHV",
        stock: 5,
        description: "Deep lapis lazuli blue. A dial that commands the room. The sunburst guilloché catches the light differently with every angle.",
        image: "/images/maestro-lapis.jpg",
      },
      {
        name: "Frosted Flex",
        stripePriceId: "price_1T4TvBCfxE1lSBKRfCkEqWVd",
        stock: 18,
        description: "A frosted, architectural surface with a quiet confidence. Less is more. Until the light hits.",
        image: "/images/maestro-frosted.jpg",
      },
      {
        name: "Cosmic Tlt",
        stripePriceId: "",
        stock: 0,
        description: "The diagonal time display expression. A driving watch principle: read the time without turning your wrist.",
        image: "/images/maestro-cosmic-tlt.jpg",
      },
      {
        name: "Laguna View",
        stripePriceId: "",
        stock: 0,
        description: "The classic expression of the Maestro. Same architecture, traditional time display.",
        image: "/images/maestro-laguna-view.jpg",
      },
    ],
    newsletterTitle: "Priority access for the next Maestro edition.",
    newsletterSub: "Collectors on the list hear first.",
    image: "/images/maestro.jpg",
    heroImage: "/images/maestro-hero2.jpg",
    detailImage: "/images/maestro-detail.jpg",
    galleryImages: [
      "/images/maestro-angle-1.jpg",
      "/images/maestro-angle-2.jpg",
      "/images/maestro-angle-3.jpg",
    ],
  },
  {
    slug: "triomphe",
    name: "Triomphe",
    tagline: "Current Drop",
    hook: "8.8mm. Disappears under the cuff. Present when the light finds it.",
    description:
      "The Triomphe is a single architecture, expressed through an evolving series of dial editions. 38mm wide, 8.8mm thin. Each release is limited, allocation-based, and built for those who know exactly what they want.",
    descriptionExtra:
      "Two dial expressions. The guilloché: Carreau Tissé centre, satinée circulaire and sauté piqué borders, Vagues de Lumière moiré frame. Three recessed rings reference the Arc de Triomphe. The stone dial: each one unrepeatable. When an edition closes, it closes.",
    designerNote:
      "The Triomphe started with a constraint: how thin before you lose presence? 8.8mm is the answer. At that thickness, the watch disappears on the wrist and the dial becomes everything. Each new edition does not change the watch. It deepens it.",
    year: 2025,
    tier: "limited",
    price: 1500,
    stock: 2,
    maxStock: 20,
    edition: "Tempest Stone / Émeraude Vert",
    badge: "Current Drop",
    urgencyTag: "Current edition · Closing",
    specsTitle: "8.8mm. Considered restraint.",
    specs: {
      Movement: "Sellita SW210-1B · Swiss hand-wound · Regulated ±5 s/day in 5 positions",
      Case: "38mm · 8.8mm thin · 38mm lug-to-lug · 316L marine-grade steel · 50m / 164ft",
      Dial: "Multi-layer guilloché (Carreau Tissé · sauté piqué · Vagues de Lumière) or natural stone — edition-dependent",
      Crystal: "Sapphire with Super-AR coating",
      Strap: "Hand-stitched Epsom leather · 20mm quick-swap",
      Hands: "Diamond-cut · Applied Roman numerals · Hebrew & Eastern Arabic numerals available made to order",
      Edition: "20 pieces per dial variant · No restocks · Allocation-based",
    },
    boxContents: [
      "Triomphe timepiece (current dial edition)",
      "Epsom leather strap (fitted)",
      "Leather travel roll",
      "Polishing cloth",
      "12-month warranty card",
      "Edition certificate with serial number",
      "Personal note from Kevin",
    ],
    valueAnchor:
      "Hand-wound dress watches under 9mm with multi-layer guilloché dials from established houses start at €3,500+. Without the retail margin, that difference stays in the watch.",
    valueComparePrice: "€3,500+",
    detailStrip: {
      eyebrow: "The Dial",
      title: "Layers that take time to see.",
      text: "Carreau Tissé centre. Sauté piqué border. Vagues de Lumière frame. Each layer visible only under the right light. At 8.8mm, the watch sits close to the wrist. The dial is what remains.",
    },
    testimonials: [
      {
        quote:
          "At 8.8mm, the Triomphe sits close to the wrist and maintains its balance on a slimmer hand. The proportions are disciplined. It feels neither overtly masculine nor feminine.",
        name: "Elena V.",
        bio: "Creative Director · Milan · Collector since 2023",
      },
      {
        quote:
          "The Hermès-grade Epsom strap at this price point is remarkable. The materials tell you everything about the priorities here. Quality over margin, every time. As a collector, that earns trust.",
        name: "Henrik S.",
        bio: "Tech founder · Stockholm · Triomphe Noir Profond (Pièce Unique)",
      },
    ],
    variants: [
      {
        name: "Tempest Stone",
        stripePriceId: "price_1T4TsqCfxE1lSBKRFBCRLukn",
        stock: 3,
        description: "Dark, stormy tones drawn from natural stone. No two dials are identical. Yours is the only one like it in the world.",
        image: "/images/triomphe-tempest.jpg",
      },
      {
        name: "Émeraude Vert",
        stripePriceId: "price_1T4TpQCfxE1lSBKR6aJh8nbb",
        stock: 1,

        description: "A multi-layer guilloché dial in deep emerald green. Carreau Tissé centre, Vagues de Lumière border. Layers that reward every glance.",
        image: "/images/triomphe-emeraude.jpg",
      },
    ],
    newsletterTitle: "Notified first when the next dial edition opens.",
    newsletterSub: "Allocation-based. Priority to the list.",
    image: "/images/triomphe-emeraude.jpg",
    heroImage: "/images/triomphe-hero.jpg",
    detailImage: "/images/triomphe-detail.jpg",
    galleryImages: [
      "/images/triomphe-angle-1.jpg",
      "/images/triomphe-angle-2.jpg",
      "/images/triomphe-angle-3.jpg",
    ],
    comingSoonEditions: [
      {
        name: "Saphir Azur",
        description: "A deep, luminous blue. The colour of a clear sky at altitude. Natural stone, no two pieces identical.",
        image: "/images/triomphe-saphir-azur.jpg",
      },
      {
        name: "Ember Stone",
        description: "Warm amber tones drawn from the earth. A dial that glows under candlelight and commands attention in daylight.",
        image: "/images/triomphe-ember.jpg",
      },
    ],
  },
  {
    slug: "okapi",
    name: "Okapi Classique",
    tagline: "The Original",
    hook: "The one that started everything.",
    description:
      "The Okapi is defined by balance and restraint. Its 37mm cushion case combines rounded contours with precise architectural lines. A silhouette that reads as neither vintage nor modern.",
    descriptionExtra:
      "The frosted blue dial sits behind a coin-edge fluted flange. A slim chapter ring with lacquer-filled markings, guilloché small seconds at six, spear-shaped hands. Powered by the Swiss ETA 7001. Nothing added without reason.",
    designerNote:
      "Okapi was not my first prototype. It was the first that felt inevitable. A balance of curve and edge, softness held in precision. The language wasn't planned. It surfaced. The new dial does not transform it. It clarifies what was always there.",
    year: 2015,
    tier: "signature",
    price: 2000,
    stock: 0,
    maxStock: 20,
    edition: "Coming Soon",
    badge: "The Original",
    urgencyTag: "Pre-order · Register Interest",
    isPreOrder: true,
    depositAmount: 500,
    specsTitle: "Built to outlast everything.",
    specs: {
      Movement: "Swiss-made ETA 7001 — hand-wound, precise, enduring",
      Case: "37mm cushion-shaped, stainless steel, HV1200 scratch-resistant coating",
      Dial: "Deep blue frosted finish, coin-edge fluted flange, guilloché small seconds at 6 o'clock",
      "Chapter Ring": "Slim steel with fine lacquer-filled markings",
      Hands: "Slender spear-shaped — clarity without excess",
      Crystal: "Sapphire with anti-reflective coating",
      "Water Resist.": "5 ATM / 50 meters",
      Strap: "18mm quick-release — leather with butterfly clasp or integrated steel bracelet",
      Caseback: 'Engraved "Designed in Sweden" — sapphire exhibition window',
    },
    boxContents: [
      "Okapi Classique – Kivu timepiece",
      "Quick-release leather strap (fitted)",
      "Pedral leather travel roll",
      "Soft polishing cloth",
      "Butterfly deployment clasp",
      "12-month international warranty card",
      "Handwritten note from Kevin",
      "€20 credit toward a bespoke strap",
    ],
    valueAnchor:
      "Sapphire crystal, Swiss hand-wound movement, scratch-resistant coating, guilloché dial work. At any established house, this starts at €3,000+. Without the markup, that difference is in the watch.",
    valueComparePrice: "€3,000+",
    detailStrip: {
      eyebrow: "The Dial",
      title: "Nothing placed without reason.",
      text: "The guilloché small seconds at six catches light differently with every angle. The coin-edge flange frames the dial without competing with it. Details that take time to notice. They don't leave once you have.",
    },
    testimonials: [
      {
        quote:
          "I bought the original Okapi in 2018. It still gets more attention than anything else I own. Whatever this new version brings, I'm already on the list.",
        name: "Marcus E.",
        bio: "Architect · Berlin · Original Okapi owner since 2018",
      },
      {
        quote:
          "The original fumé sunburst dial had a precision and restraint that few pieces at any price achieve. The move to a frosted finish is an interesting evolution. I'm watching this closely.",
        name: "Dr. Kenji N.",
        bio: "Surgeon & watch collector · Tokyo · Original Okapi owner",
      },
    ],
    testimonialsLabel: "Those Who Wore the Original",
    newsletterTitle: "First access when Okapi opens.",
    newsletterSub: "On the list. No noise.",
    image: "/images/okapi.jpg",
    heroImage: "/images/okapi-hero.jpg",
    detailImage: "/images/okapi-detail.jpg",
    galleryImages: [
      "/images/okapi-angle-1.jpg",
      "/images/okapi-angle-2.jpg",
      "/images/okapi-angle-3.jpg",
    ],
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

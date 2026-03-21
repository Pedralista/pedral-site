export interface CollectionVariant {
  name: string;
  stripePriceId: string;
  stock: number;
  description?: string;
  image?: string;
  numeralOptions?: string[];
  numeralImages?: Record<string, string>;
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
  isEnquiryOnly?: boolean;
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
    stock: 5,
    maxStock: 20,
    edition: "Frosted Flex",
    badge: "Limited Allocation",
    urgencyTag: "Limited pieces remaining",
    specsTitle: "Swiss precision. Stockholm soul.",
    specs: {
      Movement: "Sellita SW200-1b, Swiss automatic, 38-hour power reserve",
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
      "24-month warranty card",
      "Personal note from Kevin",
    ],
    valueAnchor:
      "Dress watches with Swiss Sellita movements, sapphire crystal, and an integrated bracelet. At the established houses: €2,800+. Without the overhead cost, the showroom, the retail chain, the advertising: €1,300. Edition of 20. The difference didn't disappear. It remains in the watch.",
    valueComparePrice: "€2,800+",
    detailStrip: {
      eyebrow: "The Diagonal Display",
      title: "A principle, not a detail.",
      text: "The diagonal time display is a driving watch principle. Read the time without turning your wrist. It is one of those decisions that, once understood, makes everything else seem obvious.",
    },
    testimonials: [
      {
        quote:
          "Honestly, the diagonal display seemed like a gimmick to me at first. Then I wore it for a week and couldn't go back to a normal layout. It just makes sense once your wrist gets used to it.",
        name: "Pieter V.",
        bio: "Photographer · Amsterdam · Second Pedral purchase",
      },
      {
        quote:
          "I wasn't sure about 37mm. I usually wear 40. But the tonneau shape carries the size differently. It wears bigger than you'd expect. The whole thing is more considered than the price suggests.",
        name: "Adrien L.",
        bio: "Investment Analyst · Lyon",
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
        stock: 5,
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
      "The Triomphe started with a constraint: how thin before you lose presence? 8.8mm is the answer. At that thickness, the watch disappears on the wrist and the dial becomes everything. Each new edition doesn't change the watch. It deepens it. Every Triomphe owner wears the same architecture, but no two of them wear the same dial.",
    year: 2025,
    tier: "limited",
    price: 1500,
    stock: 3,
    maxStock: 20,
    edition: "Saphir Azur / Ember Stone",
    badge: "New Drop",
    urgencyTag: "New editions · 5 pieces each",
    specsTitle: "8.8mm. Considered restraint.",
    specs: {
      Movement: "Sellita SW210-1B · Swiss hand-wound · Regulated ±5 s/day in 5 positions",
      Case: "38mm · 8.8mm thin · 38mm lug-to-lug · 316L marine-grade steel · 50m / 164ft",
      Dial: "Multi-layer guilloché (Carreau Tissé · sauté piqué · Vagues de Lumière) or natural stone, edition-dependent",
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
      "24-month warranty card",
      "Edition certificate with serial number",
      "Personal note from Kevin",
    ],
    valueAnchor:
      "Hand-wound dress watches under 9mm with multi-layer guilloché dials. At the established houses: €3,500+. Without the overhead cost: €1,500. Edition of 20. The difference isn't absorbed. It remains in the materials, the movement, and the finishing.",
    valueComparePrice: "€3,500+",
    detailStrip: {
      eyebrow: "The Dial",
      title: "Layers that take time to see.",
      text: "Carreau Tissé centre. Sauté piqué border. Vagues de Lumière frame. Each layer visible only under the right light. At 8.8mm, the watch sits close to the wrist. The dial is what remains.",
    },
    testimonials: [
      {
        quote:
          "I have smaller wrists, so a lot of dress watches feel like they're wearing me. The Triomphe at 8.8mm just sits right. It's balanced in a way I haven't found at this size before.",
        name: "Elena V.",
        bio: "Creative Director · Milan · Collector since 2023",
      },
      {
        quote:
          "The strap is Hermès-grade Epsom leather. At this price. That tells you where the money goes. I've bought from houses that charge three times more and cut corners on exactly that kind of detail.",
        name: "Henrik S.",
        bio: "Tech founder · Stockholm · Triomphe Noir Profond (Pièce Unique)",
      },
    ],
    variants: [
      {
        name: "Saphir Azur",
        stripePriceId: "price_1T9xa2CfxE1lSBKR4hPpmnPR",
        stock: 3,
        description: "A multi-layer guilloché dial in deep sapphire blue. Carreau Tissé centre, Vagues de Lumière border. Layers that reward every glance.",
        image: "/images/triomphe-saphir-roman.jpg",
        numeralOptions: ["Roman", "Eastern Arabic", "Hebrew"],
        numeralImages: {
          "Roman": "/images/triomphe-saphir-roman.jpg",
          "Eastern Arabic": "/images/triomphe-saphir-arabic.jpg",
          "Hebrew": "/images/triomphe-saphir-hebrew.jpg",
        },
      },
      {
        name: "Ember Stone",
        stripePriceId: "price_1T9xbUCfxE1lSBKR5IDT0QJ1",
        stock: 3,
        description: "Warm amber tones drawn from the earth. A natural stone dial that deepens in low light and commands attention in daylight.",
        image: "/images/triomphe-ember.jpg",
      },
      {
        name: "Tempest Stone",
        stripePriceId: "price_1T4TsqCfxE1lSBKRFBCRLukn",
        stock: 0,
        description: "Dark, stormy tones drawn from natural stone. No two dials are identical. Yours is the only one like it in the world.",
        image: "/images/triomphe-tempest.jpg",
      },
      {
        name: "Émeraude Vert",
        stripePriceId: "price_1T4TpQCfxE1lSBKR6aJh8nbb",
        stock: 0,
        description: "A multi-layer guilloché dial in deep emerald green. Carreau Tissé centre, Vagues de Lumière border. Layers that reward every glance.",
        image: "/images/triomphe-emeraude.jpg",
      },
    ],
    newsletterTitle: "Notified first when the next dial edition opens.",
    newsletterSub: "Allocation-based. Priority to the list.",
    image: "/images/triomphe-saphir-roman.jpg",
    heroImage: "/images/triomphe-hero-2.jpg",
    detailImage: "/images/triomphe-detail.png",
    galleryImages: [
      "/images/triomphe-wrist-hebrew.jpg",
      "/images/triomphe-angle-2.jpg",
      "/images/triomphe-ember-wrist.png",
      "/images/triomphe-angle-3.jpg",
      "/images/triomphe-wrist-arabic.jpg",
    ],
    comingSoonEditions: [],
  },
  {
    slug: "okapi",
    name: "Okapi Classique",
    tagline: "The Original",
    hook: "The one that started everything.",
    description:
      "The Okapi is defined by balance and restraint. Its 37mm cushion case combines rounded contours with precise architectural lines — a silhouette that reads as neither vintage nor modern. The watch that began the studio.",
    descriptionExtra:
      "The frosted blue dial sits behind a coin-edge fluted flange. A slim chapter ring with lacquer-filled markings, guilloché small seconds at six, spear-shaped hands. Powered by the LJP7380. Nothing placed without reason. Nothing removed that should remain.",
    designerNote:
      "Okapi was not my first prototype. It was the first that felt inevitable. A balance of curve and edge, softness held in precision. The language wasn't planned — it surfaced. Ten years later, I understand it better. The new version doesn't transform it. It clarifies what was always there.",
    year: 2015,
    tier: "signature",
    price: 2000,
    stock: 0,
    maxStock: 20,
    edition: "20 pieces · Allocation only",
    badge: "Allocation Only",
    urgencyTag: "By enquiry · Not all requests confirmed",
    isEnquiryOnly: true,
    specsTitle: "Built to outlast everything.",
    specs: {
      Movement: "La Joux-Perret LJP7380 · Swiss hand-wound · La Chaux-de-Fonds manufacture · The same movement family trusted by independent watchmakers across the industry — chosen here because it runs honest and lasts longer than trends",
      Case: "37mm cushion-shaped, stainless steel, HV1200 scratch-resistant coating",
      Dial: "Deep blue frosted finish, coin-edge fluted flange, guilloché small seconds at 6 o'clock",
      "Chapter Ring": "Slim steel with fine lacquer-filled markings",
      Hands: "Slender, spear-shaped. Clarity without excess.",
      Crystal: "Sapphire with anti-reflective coating",
      "Water Resist.": "5 ATM / 50 meters",
      Strap: "18mm quick-release, leather with butterfly clasp or integrated steel bracelet",
      Caseback: 'Engraved "Designed in Sweden", sapphire exhibition window',
    },
    boxContents: [
      "Okapi Classique – Kivu timepiece",
      "Quick-release leather strap (fitted)",
      "Pedral leather travel roll",
      "Soft polishing cloth",
      "Butterfly deployment clasp",
      "24-month international warranty card",
      "Handwritten note from Kevin",
    ],
    valueAnchor:
      "Sapphire crystal. Swiss hand-wound movement. HV1200 scratch-resistant coating. Guilloché dial work. At any established house: €3,000+. Without the overhead cost: €2,000. Twenty pieces.",
    valueComparePrice: "€3,000+",
    detailStrip: {
      eyebrow: "The Dial",
      title: "Nothing placed without reason.",
      text: "The guilloché small seconds at six catches light differently with every angle. The coin-edge flange frames the dial without competing with it. Details that take time to notice. They don't leave once you have.",
    },
    testimonials: [
      {
        quote:
          "I bought the original in 2018. Seven years later, it's still the one I reach for when I want something on my wrist that feels like mine. Not like everyone else's. I'm on the list for the new one, obviously.",
        name: "Marcus E.",
        bio: "Architect · Berlin · Original Okapi owner since 2018",
      },
      {
        quote:
          "The original fumé sunburst had this restraint that I've struggled to find elsewhere, even at three or four times the price. Curious to see what the frosted dial does to it.",
        name: "Dr. Kenji N.",
        bio: "Surgeon & watch collector · Tokyo",
      },
    ],
    testimonialsLabel: "Those Who Wore the Original",
    newsletterTitle: "Be considered for an allocation.",
    newsletterSub: "Those on the list are reviewed first. No announcements. No noise.",
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

export interface CollectionVariant {
  name: string;
  stripePriceId: string;
  stock: number;
  price?: number;
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
  wristFit?: {
    caseDiameter: string;
    thickness?: string;
    lugToLug?: string;
    lugWidth?: string;
    wristRange?: string;
    note: string;
  };
  newsletterTitle: string;
  newsletterSub: string;
  image: string;
  heroImage?: string;
  heroFit?: "cover" | "contain";
  detailImage?: string;
  galleryImages?: string[];
  variants?: CollectionVariant[];
  isPreOrder?: boolean;
  depositAmount?: number;
  nonRefundable?: boolean; // true only for custom/made-to-order pieces (EU Art. 16(c) exemption)
  isEnquiryOnly?: boolean;
  hidden?: boolean; // true = not shown publicly, page returns 404
  hidePriceOnCard?: boolean;
  variantLabel?: string;
  valuePerspectiveTitle?: string;
  comingSoonEditions?: { name: string; description: string; image?: string }[];
}

export const collections: Collection[] = [
  {
    slug: "maestro-petite-seconde",
    name: "Maestro Petite Seconde",
    tagline: "Q2 2026",
    hook: "The Maestro, taken one step further.",
    description:
      "Same tonneau case, same considered architecture. A guilloché dial, proprietary Roman numerals, and a subsidiary seconds at six o'clock. Powered by the Sellita SW260 automatic movement.",
    descriptionExtra:
      "Two dials: Céleste in sky blue, Solaire in gold. Each capped at twenty pieces. When a dial closes, it does not return.",
    designerNote:
      "The Petite Seconde is the Maestro at its most complete. The small seconds complication adds a layer of visual depth without disrupting the dial's clarity. Three dials, three characters — the same architecture underneath each one.",
    year: 2026,
    tier: "signature",
    price: 1600,
    stock: 20,
    maxStock: 20,
    edition: "Céleste / Solaire",
    badge: "Q2 2026",
    urgencyTag: "Three dials · 20 pieces each",
    specsTitle: "Swiss automatic. Stockholm soul.",
    specs: {
      Movement: "Sellita SW260 · Swiss automatic · 38-hour power reserve",
      Case: "37mm tonneau · 316L stainless steel · HV1200 scratch-resistant coating",
      Dial: "Guilloché · Proprietary Roman numerals · Small seconds at 6 o'clock",
      Crystal: "Sapphire front & back · AR coating",
      Bracelet: "Integrated hexagonal links · Quick-release",
      Strap: "Customised Epsom leather strap included",
      Lume: "Swiss Super-LumiNova® BGW9",
      "Water Resist.": "100 meters / 330 feet",
      Warranty: "24-month international coverage",
      Edition: "20 pieces per dial · No restocks · No reissues",
    },
    boxContents: [
      "Maestro Petite Seconde timepiece",
      "Strap adapter tool",
      "Artisanal leather travel roll",
      "Polishing cloth",
      "Butterfly clasp",
      "24-month warranty card",
      "Personal note from Kevin",
    ],
    valueAnchor:
      "Swiss automatic dress watches with guilloché dials and small seconds complications. At the established houses: €3,000+. At Pedral: €1,600. Edition of 20. The difference remains in the watch.",
    valueComparePrice: "€3,000+",
    detailStrip: {
      eyebrow: "The Small Seconds",
      title: "A complication that earns its place.",
      text: "The subsidiary seconds at six adds visual depth without disturbing the dial's hierarchy. It is there for the people who notice it — and perfectly legible to those who don't.",
    },
    testimonials: [],
    wristFit: {
      caseDiameter: "37mm",
      thickness: "9.8mm",
      lugToLug: "47.5mm",
      lugWidth: "20mm",
      wristRange: "15–20cm",
      note: "The same tonneau case as the Maestro. Owners who typically wear 38–40mm describe it as wearing larger than expected. The integrated bracelet follows the natural curve of the arm.",
    },
    newsletterTitle: "Be first when Maestro Petite Seconde opens.",
    newsletterSub: "Three dials. 20 pieces each. Collectors on the list are notified first.",
    image: "/images/maestro-ps-hero-2.png",
    heroImage: "/images/maestro-ps-hero-2.png",
    heroFit: "contain",
    detailImage: "/images/maestro-ps-solaire-2.png",
    galleryImages: [
      "/images/maestro-ps-celeste-2.png",
      "/images/maestro-ps-solaire-2.png",
    ],
    isEnquiryOnly: true,
    hidden: true,
    variants: [
      {
        name: "Céleste",
        stripePriceId: "",
        stock: 20,
        description: "Sky blue guilloché dial. Light and depth in the same surface. The colour of something just out of reach.",
        image: "/images/maestro-ps-celeste-2.png",
      },
      {
        name: "Solaire",
        stripePriceId: "",
        stock: 20,
        description: "Gold and warmth. A dial that commands without asking. The sun caught in a guilloché pattern.",
        image: "/images/maestro-ps-solaire-2.png",
      },
    ],
  },
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
    price: 1450,
    stock: 5,
    maxStock: 20,
    edition: "Frosted Flex",
    badge: "Limited Allocation",
    urgencyTag: "Limited pieces remaining",
    specsTitle: "Swiss precision. Stockholm soul.",
    specs: {
      Movement: "Sellita SW200-1b · Swiss automatic · 38-hour power reserve",
      Case: "37mm tonneau · 9.8mm slim · 47.5mm lug-to-lug · 316L stainless steel · HV1200 scratch-resistant coating",
      Dial: "Angled driver's dial — two-tier guilloché: rhombus centre, angular rooftops, sunburst outer ring · Classic non-angled dial with Roman numerals available",
      Crystal: "Sapphire front & back · 5× internal AR coating · scratch-resistant",
      Bracelet: "Integrated hexagonal links · 22.5mm at lugs, tapers to 18mm · HV1200 coating · quick-release",
      Strap: "Customised Epsom leather strap included · 20mm",
      Lume: "Swiss Super-LumiNova® BGW9 on hands and indices",
      "Water Resist.": "100 meters / 330 feet",
      Warranty: "12 months international coverage for workmanship defects",
      VAT: "Included for EU orders · Duties and taxes outside EU not included",
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
      "Dress watches with Swiss Sellita movements, sapphire crystal, and an integrated bracelet. At the established houses: €2,800+. Without the overhead cost, the showroom, the retail chain, the advertising: €1,450. Edition of 20. The difference didn't disappear. It remains in the watch.",
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
        stripePriceId: "price_1TOwepCfxE1lSBKRI7sNBLcW",
        stock: 5,
        description: "Deep lapis lazuli blue. A dial that commands the room. The sunburst guilloché catches the light differently with every angle.",
        image: "/images/maestro-lapis.jpg",
      },
      {
        name: "Frosted Flex",
        stripePriceId: "price_1TOwodCfxE1lSBKRaUZJ0s7O",
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
    wristFit: {
      caseDiameter: "37mm",
      thickness: "9.8mm",
      lugToLug: "47.5mm",
      lugWidth: "20mm",
      wristRange: "15–20cm",
      note: "The tonneau case carries differently from a round watch. Owners who typically wear 38–40mm describe it as wearing larger than expected. At 47.5mm lug-to-lug and 9.8mm thin, it sits flat and balanced on the wrist. The integrated bracelet follows the natural curve of the arm — it doesn't gap or shift.",
    },
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
    price: 1750,
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
      "Hand-wound dress watches under 9mm with multi-layer guilloché dials. At the established houses: €3,500+. Without the overhead cost: €1,750. Edition of 20. The difference isn't absorbed. It remains in the materials, the movement, and the finishing.",
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
        stripePriceId: "price_1TOxPMCfxE1lSBKRFQfT9aRT",
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
        stripePriceId: "price_1TOxO4CfxE1lSBKR8hiQjgiE",
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
    wristFit: {
      caseDiameter: "38mm",
      thickness: "8.8mm",
      lugToLug: "38mm",
      lugWidth: "20mm",
      wristRange: "15–20cm",
      note: "At 8.8mm, the Triomphe sits flush and close to the wrist. Works across most wrist sizes — particularly comfortable on slimmer wrists where standard dress watches often feel overwhelming. The short 38mm lug-to-lug means it never overhangs.",
    },
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
    price: 2800,
    stock: 20,
    maxStock: 20,
    edition: "20 pieces · Allocation only",
    badge: "Allocation Only",
    urgencyTag: "20 pieces · First run now open",
    hidePriceOnCard: true,
    nonRefundable: true, // made-to-order pre-order — qualifies under EU Art. 16(c)
    variantLabel: "Movement",
    valuePerspectiveTitle: "What this specification tends to represent elsewhere.",
    specsTitle: "Built to outlast everything.",
    specs: {
      Movement: "ETA 7001 or La Joux-Perret LJP7380 · Swiss hand-wound · La Chaux-de-Fonds manufacture · Choice of calibre at reservation",
      Case: "37mm cushion-shaped · 7mm thin · 47mm lug-to-lug · 18mm lug width · 316L stainless steel · HV1200 scratch-resistant coating",
      Dial: "Deep blue frosted finish · Coin-edge fluted flange · Guilloché small seconds at 6 o'clock",
      "Chapter Ring": "Slim steel with fine lacquer-filled markings",
      Hands: "Slender, spear-shaped. Clarity without excess.",
      Crystal: "Sapphire with anti-reflective coating",
      "Water Resist.": "5 ATM / 50 meters",
      Strap: "18mm quick-release leather with butterfly clasp · Integrated steel bracelet option",
      Caseback: 'Engraved "Designed in Sweden" · Sapphire exhibition window',
      Edition: "20 pieces · First run · Allocation-based · 3–6 months delivery",
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
      "The LJP7380 is set at €3,900. A high-grade, decorated calibre from La Chaux-de-Fonds, typically found in watches positioned significantly higher. The ETA 7001 is set at €2,800. A classic, proven movement, executed here with the same level of care. Both sit below where the conventional pricing structure would place them. The difference isn't in the watch. It's in everything built around it elsewhere. This is simply where it felt right to place them.",
    valueComparePrice: "",
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
    wristFit: {
      caseDiameter: "37mm",
      lugToLug: "47mm",
      lugWidth: "18mm",
      wristRange: "15–19cm",
      note: "Cushion cases typically wear larger than their stated diameter. This one doesn't. The curved case back follows the wrist rather than sitting flat against it, and the weight is distributed across a wider surface. Owners consistently describe it as wearing smaller and lighter than the 37mm suggests — which, given the shape, is not what most expect.",
    },
    newsletterTitle: "Be considered for an allocation.",
    newsletterSub: "Those on the list are reviewed first. No announcements. No noise.",
    image: "/images/okapi-classique.png",
    heroImage: "/images/okapi-hero.jpg",
    detailImage: "/images/okapi-detail.jpg",
    galleryImages: [
      "/images/okapi-angle-1.jpg",
      "/images/okapi-angle-2.jpg",
      "/images/okapi-angle-3.jpg",
    ],
    variants: [
      {
        name: "ETA 7001",
        stripePriceId: "price_1TKw2kCfxE1lSBKRLqfS1Lvb",
        stock: 5,
        price: 2800,
        description: "Swiss hand-wound. Slim, direct, reliable. The honest choice — everything in its right place.",
        image: "/images/okapi-classique.png",
      },
      {
        name: "LJP7380",
        stripePriceId: "price_1TKw7wCfxE1lSBKRcFLiQiu6",
        stock: 3,
        price: 3900,
        description: "La Joux-Perret LJP7380. High-grade decorated. La Chaux-de-Fonds manufacture. The movement independent watchmakers choose when they refuse to compromise.",
        image: "/images/okapi-classique.png",
      },
    ],
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function isHidden(c: Collection): boolean {
  return !!c.hidden && process.env.NODE_ENV === "production";
}

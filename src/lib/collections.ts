export interface CollectionVariant {
  name: string;
  stripePriceId: string;
  stock: number;
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
  newsletterTitle: string;
  newsletterSub: string;
  image: string;
  variants?: CollectionVariant[];
  isPreOrder?: boolean;
  comingSoonEditions?: { name: string; description: string }[];
}

export const collections: Collection[] = [
  {
    slug: "maestro",
    name: "Maestro",
    tagline: "Limited Allocation",
    hook: "The person who notices this watch already understands it.",
    description:
      "Maestro rewards the eye that lingers. At 37mm, the monobloc tonneau case and fluted bezel frame a textured sunburst dial where lumed Roman numerals intersect a diagonal time display — a detail most will miss. You won't.",
    descriptionExtra:
      "Hexagonal bracelet links trace a slender curve along your wrist. This is not a watch that announces itself. It's a watch that waits to be discovered.",
    designerNote:
      "Maestro is the watch I designed for the moments between moments. The meeting that's actually a conversation. The dinner that becomes a memory. It's a dress watch, but not a formal one — it's for people who dress deliberately.",
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
      "Dress watches with Swiss Sellita movements, sapphire crystal, and integrated bracelet from established houses typically start at €2,800+. Without corporate overhead, Kevin delivers the same quality — directly to you.",
    valueComparePrice: "€2,800+",
    detailStrip: {
      eyebrow: "The Diagonal Display",
      title: "Not decoration — intention.",
      text: "The diagonal time display isn't decoration — it's a driving watch principle. Read the time without turning your wrist from the wheel. It separates someone who looked at this watch from someone who understood it.",
    },
    testimonials: [
      {
        quote:
          "The diagonal display — most people don't even notice it. But the moment you explain why it's there, you see the respect change in their eyes.",
        name: "Thomas L.",
        bio: "Automotive engineer · Copenhagen — Bought as a 40th birthday piece",
      },
      {
        quote:
          "At 37mm with that tonneau case, it wears like something that cost five times more. Kevin's pricing is almost unfair to other brands.",
        name: "Pieter V.",
        bio: "Photographer · Amsterdam — Second Pedral purchase",
      },
    ],
    variants: [
      { name: "Lapis No.1", stripePriceId: "price_1T4Tw7CfxE1lSBKRY9zmQqHV", stock: 3 },
      { name: "Frosted Flex", stripePriceId: "price_1T4TvBCfxE1lSBKRfCkEqWVd", stock: 4 },
    ],
    newsletterTitle: "Don't miss the next Maestro drop.",
    newsletterSub: "Priority access for collectors. No spam.",
    image: "/images/maestro.jpg",
  },
  {
    slug: "triomphe",
    name: "Triomphe",
    tagline: "Current Drop",
    hook: "8.8mm thin. Vanishes beneath your cuff. Commands the room when it appears.",
    description:
      "The Triomphe is a single canvas expressed through an evolving series of dial editions. Impossibly slim at 38mm wide and just 8.8mm thin, it vanishes beneath your cuff yet commands attention the moment light finds its dial. Each release is limited, allocation-based, and built for the collector who understands that the most meaningful pieces are the ones you had to be there for.",
    descriptionExtra:
      "Two expressions. The guilloché dial: a woven Carreau Tissé centre, precision-stamped from a CNC-machined mold, surrounded by satinée circulaire and sauté piqué textures that shift under every light. Les Anneaux Triomphaux — three recessed rings channelling the Arc de Triomphe — frame a flowing Vagues de Lumière moiré border. The stone dial: each one unrepeatable, nature's own fingerprint on your wrist. When a dial edition sells out, it doesn't return.",
    designerNote:
      "The Triomphe was born from a constraint: how thin can you go before you lose presence? The answer is 8.8mm. At that thickness, the watch disappears on the wrist but the dial becomes everything. The rotating editions keep it alive — each one is a new conversation with the same architecture.",
    year: 2025,
    tier: "limited",
    price: 1500,
    stock: 2,
    maxStock: 20,
    edition: "Tempest Stone / Émeraude Vert",
    badge: "Current Drop",
    urgencyTag: "Dial rotation closes soon",
    specsTitle: "8.8mm of considered restraint.",
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
      "Hand-wound dress watches under 9mm with multi-layer guilloché dials from established houses start at €3,500+. Without the retail markup, the Triomphe delivers the same craft — directly from the designer.",
    valueComparePrice: "€3,500+",
    detailStrip: {
      eyebrow: "The Dial",
      title: "Layers that reward the eye.",
      text: "The guilloché layers — Carreau Tissé, sauté piqué, Vagues de Lumière — they reward close inspection. At 8.8mm, the watch disappears on the wrist but the dial becomes everything. This is a watch you discover over time.",
    },
    testimonials: [
      {
        quote:
          "At 8.8mm it simply disappears under a cuff. Then someone catches the guilloché in the light and the questions start. That's the magic of this piece.",
        name: "Elena V.",
        bio: "Creative director · Milan — Collector since 2023",
      },
      {
        quote:
          "The Hermès-grade Epsom strap at this price point is remarkable. Kevin clearly prioritises material quality over margin. As a collector, that earns trust.",
        name: "Henrik S.",
        bio: "Tech founder · Stockholm — Triomphe Noir Profond (Sold Out Edition)",
      },
    ],
    variants: [
      { name: "Tempest Stone", stripePriceId: "price_1T4TsqCfxE1lSBKRFBCRLukn", stock: 1 },
      { name: "Émeraude Vert", stripePriceId: "price_1T4TpQCfxE1lSBKR6aJh8nbb", stock: 1 },
    ],
    newsletterTitle: "Get notified when the next Triomphe dial drops.",
    newsletterSub: "Allocations fill fast. Priority goes to the list.",
    image: "/images/triomphe.jpg",
    comingSoonEditions: [
      {
        name: "Saphir Azur",
        description: "A deep, luminous blue — the colour of a clear sky at altitude. Natural stone, no two pieces identical.",
      },
      {
        name: "Ember Stone",
        description: "Warm amber tones drawn from the earth. A dial that glows under candlelight and commands attention in daylight.",
      },
    ],
  },
  {
    slug: "okapi",
    name: "Okapi Classique",
    tagline: "The Original",
    hook: "The one that started everything.",
    description:
      "The Okapi is defined by balance and restraint. Its 37 mm cushion-shaped case combines softly rounded contours with crisp architectural lines, creating a silhouette that feels both vintage-inspired and quietly modern.",
    descriptionExtra:
      "The deep blue frosted dial is framed by a coin-edge inspired fluted flange beneath the crystal, adding subtle depth. A slim steel chapter ring with fine lacquer-filled markings encircles the dial, echoed by the guilloché small seconds register at six o'clock. Slender spear-shaped hands ensure clarity without excess. Powered by the Swiss-made ETA 7001, Okapi reflects a considered approach to watchmaking — precise, composed, and enduring.",
    designerNote:
      "Okapi was my first real watch. Not the first prototype — the first one I looked at and thought: this is what I was trying to make. The cushion case, the way light moves across the frosted surfaces, the balance between soft and sharp — I didn't plan a design language. Okapi revealed it.",
    year: 2015,
    tier: "signature",
    price: 2000,
    stock: 0,
    maxStock: 20,
    edition: "Coming Soon",
    badge: "The Original",
    urgencyTag: "Pre-order — register your interest",
    isPreOrder: true,
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
      "Watches with sapphire crystal, Swiss hand-wound movements, scratch-resistant coatings, and guilloché dial work from established brands typically start at €3,000+. The Okapi delivers the same craft without the corporate markup.",
    valueComparePrice: "€3,000+",
    detailStrip: {
      eyebrow: "The Dial",
      title: "Every detail earns its place.",
      text: "The guilloché small seconds register at six o'clock catches light from every angle — a quiet signature of craft that rewards those who look closely. The coin-edge inspired fluted flange frames the frosted blue dial, adding a layer of depth visible only in person. This is a dial designed for the second glance. The details that matter most are the ones you discover over time.",
    },
    testimonials: [
      {
        quote:
          "Nobody recognises it. And that's precisely the point. Every time someone asks 'what watch is that?' — that's the conversation I wanted.",
        name: "Marcus E.",
        bio: "Architect · Berlin — Collector since 2022",
      },
      {
        quote:
          "I've handled watches at triple the price that don't match the Okapi's dial work. The frosted blue finish and guilloché small seconds — it's quietly extraordinary.",
        name: "Dr. Kenji N.",
        bio: "Surgeon & watch collector · Tokyo — 40+ piece collection",
      },
    ],
    newsletterTitle: "Join 1,200+ collectors who see new editions first.",
    newsletterSub: "Priority access. No spam. Just watches.",
    image: "/images/okapi.jpg",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export interface CollectionVariant {
  name: string;
  stripePriceId: string;
  stock: number;
  price?: number;
  description?: string;
  image?: string;
  // Full-bleed hero background for this variant — used to crossfade the
  // product hero between variants (e.g. showing each dial in turn) with the
  // price/name/CTA text staying in sync, since both read from the same
  // selectedVariant. Falls back to the collection-level heroImage/image when
  // unset.
  heroImage?: string;
  color?: string;
  numeralOptions?: string[];
  numeralImages?: Record<string, string>;
  soldOutNumerals?: string[];
  numeralStock?: Record<string, number>;
  // Overrides stripePriceId per numeral/dial choice, for cases where each
  // sub-choice is its own separately-tracked Stripe price (not just a
  // cosmetic variant of the same SKU). Falls back to stripePriceId when a
  // choice has no entry here.
  numeralPriceIds?: Record<string, string>;
  // Overrides the displayed/charged price per numeral/dial choice, for cases
  // where a sub-choice costs more than the parent variant's base price (e.g.
  // a gold-plated case option). Falls back to the variant's price when a
  // choice has no entry here.
  numeralPrices?: Record<string, number>;
  // Full-bleed hero background per numeral/dial choice — lets the
  // auto-cycling hero give a sub-choice (e.g. a gold-case dial) its own
  // hero moment instead of only the parent variant's heroImage.
  numeralHeroImages?: Record<string, string>;
  // Collection slug this variant's live stock counter lives under, when it
  // differs from the product's own — e.g. Soul Blue / Aura Gold, carried
  // over from the former "maestro-petite-seconde" line into Maestro, keep
  // reading and decrementing their existing Redis counters.
  stockSlug?: string;
  // Counter name within stockSlug, when it differs from the variant's own
  // slugified name — e.g. Silhouette's Aventurine reads Contour's former
  // "hand-wound-39mm-aventurine" counter so its live count carries over.
  stockPart?: string;
  // Group heading shown above this variant in the dial picker when it starts
  // a new group (e.g. Maestro: "Petite Seconde · Small seconds · €1,600").
  // Keep same-group variants next to each other in the array.
  group?: string;
}

export interface Collection {
  slug: string;
  name: string;
  metaTitle?: string;
  metaDescription?: string;
  tagline: string;
  hook: string;
  description: string;
  descriptionExtra?: string;
  /** Heading for the description section ("The Watch"). Falls back to detailStrip.title when unset — set explicitly to avoid sharing a heading with the separate Detail Strip section further down the page. */
  descriptionTitle?: string;
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
    noteExtra?: string;
    // Dedicated arching background shot for the "How it wears" section.
    // Falls back to detailImage/heroImage/image when unset.
    image?: string;
  };
  newsletterTitle: string;
  newsletterSub: string;
  image: string;
  heroImage?: string;
  heroFit?: "cover" | "contain";
  detailImage?: string;
  galleryImages?: string[];
  // Shape of each gallery panel (CSS aspect-ratio, e.g. "16 / 9") when the
  // gallery shots share one shape — shows them whole instead of cropping
  // them into the default fixed-height strip.
  galleryAspect?: string;
  variants?: CollectionVariant[];
  isPreOrder?: boolean;
  /** Per-product opt-in for checkout add-ons (straps / engraving). Gated together with ADDONS_ENABLED in src/lib/addons.ts. Defaults off. */
  addOnsEnabled?: boolean;
  depositAmount?: number;
  // Expected dispatch window shown near the buy CTA, e.g. "Ships end of November".
  shipsBy?: string;
  /** In stock and ready to ship (not a pre-order) — replaces the "Pre-order · Full payment secures your allocation" line with shipsBy. */
  shipsImmediately?: boolean;
  nonRefundable?: boolean; // true only for custom/made-to-order pieces (EU Art. 16(c) exemption)
  isEnquiryOnly?: boolean;
  hidden?: boolean; // true = not shown publicly, page returns 404
  /** Previous product names — matched by the Stripe webhook so a checkout started under an old name (before a merge/rename deployed) still decrements stock. */
  formerNames?: string[];
  /** Hide the single "Edition of N" / "N left of M" framing — for a line whose dials are separate editions (e.g. merged Maestro), where one total edition size would be misleading. Cards show "N remaining" instead. */
  hideEditionSize?: boolean;
  /** "compact" = one image window plus dial buttons (grouped by variant.group) that switch it, sold-out variants left out — instead of one card with its own photo per variant. */
  variantPicker?: "cards" | "compact";
  /** Variant featured on the collection/homepage card: its image and its own remaining count are shown instead of the product image and the line's total (e.g. Maestro: Aura Gold — a single dial's count is clearer than a total across dials). */
  cardVariant?: string;
  standalone?: boolean; // true = fully live (page, sitemap, feed) but excluded from the /collections grid and homepage showcase — e.g. a one-off capsule reached only via its own direct link
  /** Keep out of /feed.xml (Meta / Google Shopping catalogue) — e.g. the Étiquette numeral editions, reachable only by direct link. */
  excludeFromFeed?: boolean;
  /** Show a "Community code" box by the buy button (see src/lib/community-codes.ts). */
  communityCodes?: boolean;
  /** Numbered edition where the buyer picks their own number (1…N) from a grid before checkout — e.g. Étiquette Famille Royale, 21. */
  editionNumbers?: number;
  /** Show the Pedral Owners Club WhatsApp invite (owners-only pages). */
  ownersClubInvite?: boolean;
  hidePriceOnCard?: boolean;
  variantLabel?: string;
  valuePerspectiveTitle?: string;
  /** Optional heading/intro overrides for the comingSoonEditions section (defaults: "Coming Next" / "The next dial editions." / not-yet-available copy). */
  comingSoonEditionsHeading?: { eyebrow: string; title: string; text: string; portrait?: boolean };
  /** Overrides the four-line reassurance strip under the product hero (the default is product-neutral: sapphire, warranty, direct contact, shipping). */
  reassurance?: string[];
  comingSoonEditions?: { name: string; description: string; image?: string; badge?: string }[];
  /** Prototype / in-development model — no price, no checkout yet. Use together with isEnquiryOnly (which already removes price, stock, checkout, feed listing and JSON-LD offers); this additionally swaps edition-size, returns/shipping and "allocation" copy for development-stage copy. `status` shows in the hero and as the closing line; `cardStatus` is the short line under the card on the collections grid. */
  inDevelopment?: { status: string; cardStatus: string };
  /** Journal article slugs relevant to this product (inverse of Article.relatedCollectionSlug). */
  relatedArticleSlugs?: string[];
  /** Label shown above a variant's sub-choice picker (e.g. dial color). Defaults to "Numeral Style" to preserve existing Triomphe behavior. */
  numeralOptionsLabel?: string;
  /** Overrides the "Reserve Allocation" checkout button label for products that aren't a curated/reviewed allocation (e.g. plain first-come-first-served pre-order). Defaults to "Reserve Allocation". */
  reserveButtonLabel?: string;
  /** Capsule/collab credit shown near the hero — e.g. a partner boutique co-releasing a limited run. `bio` (optional) renders a full section about the partner further down the page. */
  collaboration?: { name: string; url: string; bio?: string };
  /** Optional story section shown right after the description — cultural/heritage background for an edition (e.g. Étiquette Bangla). */
  /** Paragraph strings support **bold** and *italic*; a `{ heading }` entry starts a sub-section (e.g. "Why only twenty-one"). */
  story?: { eyebrow: string; title: string; paragraphs: (string | { heading: string })[] };
  /** Appended to the generic "Before You Commit" FAQ list — for product-specific questions (materials, sizing quirks) that don't apply to every collection. */
  extraFaqs?: { q: string; a: string }[];
}

export const collections: Collection[] = [
  {
    // One Maestro line (Oct 2026, Kevin's request): the former separate
    // "Maestro Petite Seconde" product is merged in as two more dials, so
    // the same tonneau case is sold as one product with a dial choice —
    // each dial card carries its own movement and price (one tap, no
    // sub-choice). Old /collections/maestro-petite-seconde links redirect
    // here (next.config.ts); Soul Blue / Aura Gold keep their existing
    // live stock counters via stockSlug.
    slug: "maestro",
    name: "Maestro",
    formerNames: ["Maestro Petite Seconde"],
    metaTitle: "Pedral Maestro — Swiss Automatic Tonneau Dress Watch, Central or Small Seconds | Pedral",
    metaDescription: "A 37mm tonneau dress watch with a Sellita Swiss automatic movement — central seconds from €1,450, or the Petite Seconde with small seconds at €1,600. Stockholm-designed by an independent Swedish maker. No restocks.",
    tagline: "Limited Allocation",
    hook: "The person who notices this watch already understands it.",
    description:
      "At 37mm, the monobloc tonneau case and fluted bezel frame the dial. A detail most will pass over. The same architecture comes in two expressions: the classic Maestro, with a textured sunburst dial, lumed Roman numerals and central seconds — and the Petite Seconde, with a guilloché dial, proprietary Roman numerals and a subsidiary seconds at six o'clock.",
    descriptionTitle: "One case, two expressions.",
    descriptionExtra:
      "Hexagonal bracelet links follow the wrist's natural curve. The watch does not announce itself. The classic dials run the Sellita SW200-1b; the Petite Seconde runs the Sellita SW260. Earlier editions included a driver's dial — a diagonal time display built around a driving watch principle. When a dial closes, it does not return.",
    designerNote:
      "Maestro is a dress watch for people who don't need to be told it's a dress watch. The tonneau case, the classic dial, the hexagonal bracelet. Each decision has a reason. None of them are decorative. The Petite Seconde is the Maestro at its most complete — the small seconds adds a layer of visual depth without disrupting the dial's clarity.",
    year: 2025,
    tier: "signature",
    price: 1450,
    stock: 19, // static fallback: sum of the variant stocks below (live counts come from Redis)
    maxStock: 20,
    hideEditionSize: true,
    variantPicker: "compact",
    cardVariant: "Aura Gold",
    heroFit: "contain",
    // Maestro pieces are numbered; Triomphe's are not (Kevin, 2026-10-29).
    reassurance: [
      "Each piece individually numbered",
      "Sapphire crystal · Swiss automatic movement · 24-month warranty",
      "Direct communication with Kevin — not a support team",
      "Free insured express shipping",
    ],
    shipsImmediately: true, // all Maestro dials in stock (Kevin, Oct 2026)
    shipsBy: "In stock · Ships immediately · Tracked & insured",
    edition: "Soul Blue · Aura Gold · Lapis No.1",
    badge: "",
    urgencyTag: "Limited pieces remaining",
    variantLabel: "Dial",
    specsTitle: "Swiss precision. Stockholm soul.",
    specs: {
      Movement: "Classic dials: Sellita SW200-1b · Petite Seconde: Sellita SW260 with small seconds · Swiss automatic · 38-hour power reserve",
      Case: "37mm tonneau · 9.8mm slim · 47.5mm lug-to-lug · 316L stainless steel · HV1200 scratch-resistant coating",
      Dial: "Lapis No.1: sunburst guilloché, Roman numerals, central seconds · Soul Blue & Aura Gold (Petite Seconde): guilloché, proprietary Roman numerals, small seconds at 6 o'clock",
      Crystal: "Sapphire front & back · 5× internal AR coating · scratch-resistant",
      Bracelet: "Integrated hexagonal links · 22.5mm at lugs, tapers to 18mm · HV1200 coating · quick-release",
      Strap: "Customised Epsom leather strap included · 20mm",
      Lume: "Swiss Super-LumiNova® BGW9 on hands and indices (classic dials)",
      "Water Resist.": "100 meters / 330 feet",
      Warranty: "24-month international coverage",
      Edition: "Limited per dial · Each piece individually numbered · No restocks · No reissues",
      VAT: "Included for EU orders · Duties and taxes outside EU not included",
    },
    boxContents: [
      "Maestro timepiece",
      "Customised Epsom leather strap (20mm)",
      "Polishing cloth",
      "Butterfly clasp",
      "24-month warranty card",
      "Personal note from Kevin",
    ],
    // No price comparison with other brands (Kevin, 2026-10-29: it reads as cheap).
    valueAnchor: "",
    valueComparePrice: "",
    detailStrip: {
      eyebrow: "The Classic Expression",
      title: "Everything in its place.",
      text: "The Maestro's tonneau case and hexagonal bracelet are designed to disappear when worn and reappear when noticed. The classic dial keeps the time readable. Nothing more, nothing less.",
    },
    testimonials: [
      {
        quote:
          "In retrospect, I would have been willing to pay significantly more.",
        name: "Erik",
        bio: "Maestro Petite Seconde owner · Wisconsin, USA · WatchCrunch review, 4.2 / 5",
      },
      {
        quote:
          "I wasn't sure about 37mm. I usually wear 40. But the tonneau shape carries the size differently. It wears bigger than you'd expect. The whole thing is more considered than the price suggests.",
        name: "Adrien L.",
        bio: "Investment Analyst · Lyon",
      },
      {
        // Real survey quote (April 2026 customer survey), verbatim — same as
        // on the homepage. Don't add reworded quotes: only customers' own words.
        quote:
          "Not following trends but being a trend setter. For me, I have to connect with the owner of the brand. Then it's the watch.",
        name: "D.H.",
        bio: "Watch enthusiast · Maestro owner",
      },
    ],
    variants: [
      {
        name: "Soul Blue",
        stripePriceId: "price_1TPWFUCfxE1lSBKRrOHlguJc",
        stock: 7,
        price: 1600,
        stockSlug: "maestro-petite-seconde",
        heroImage: "/images/maestro-ps-celeste-2.png",
        color: "Blue",
        group: "Petite Seconde · Small seconds · Sellita SW260 · €1,600",
        description: "Sky blue guilloché dial with small seconds at six. Light and depth in the same surface. The colour of something just out of reach.",
        image: "/images/maestro-ps-celeste-2.png",
      },
      {
        name: "Aura Gold",
        stripePriceId: "price_1TPWI7CfxE1lSBKR6eBgMdJl",
        stock: 9,
        price: 1600,
        stockSlug: "maestro-petite-seconde",
        heroImage: "/images/maestro-ps-solaire-2.png",
        color: "Gold",
        group: "Petite Seconde · Small seconds · Sellita SW260 · €1,600",
        description: "Gold guilloché dial with small seconds at six. Warmth that commands without asking. The sun caught in a guilloché pattern.",
        image: "/images/maestro-ps-solaire-2.png",
      },
      {
        name: "Lapis No.1",
        stripePriceId: "price_1TOwepCfxE1lSBKRI7sNBLcW",
        stock: 3,
        price: 1450,
        heroImage: "/images/maestro-lapis.jpg",
        color: "Blue",
        group: "Classic · Central seconds · Sellita SW200-1b · €1,450",
        description: "Deep lapis lazuli blue. A dial that commands the room. The sunburst guilloché catches the light differently with every angle.",
        image: "/images/maestro-lapis.jpg",
      },
      {
        name: "Frosted Flex",
        group: "Classic · Central seconds · Sellita SW200-1b · €1,450",
        stripePriceId: "price_1TOwodCfxE1lSBKRaUZJ0s7O",
        stock: 0,
        color: "Silver",
        description: "A frosted, architectural surface with a quiet confidence. Less is more. Until the light hits.",
        image: "/images/maestro-frosted.jpg",
      },
      {
        name: "Cosmic Tilt",
        group: "Classic · Central seconds · Sellita SW200-1b · €1,450",
        stripePriceId: "",
        stock: 0,
        color: "Black",
        description: "The diagonal time display expression. A driving watch principle: read the time without turning your wrist.",
        image: "/images/maestro-cosmic-tlt.jpg",
      },
      {
        name: "Laguna View",
        group: "Classic · Central seconds · Sellita SW200-1b · €1,450",
        stripePriceId: "",
        stock: 0,
        color: "Blue",
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
    image: "/images/maestro-ps-solaire-2.png",
    // Hero auto-cycles the buyable dials (each variant's heroImage) — the
    // old lifestyle hero showed a dial no longer for sale.
    heroImage: "/images/maestro-ps-celeste-2.png",
    detailImage: "/images/maestro-detail.jpg",
    galleryImages: [
      "/images/maestro-angle-1.jpg",
      "/images/maestro-ps-celeste-2.png",
      "/images/maestro-angle-2.jpg",
      "/images/maestro-ps-solaire-2.png",
      "/images/maestro-angle-3.jpg",
    ],
    relatedArticleSlugs: ["maestro-boris-pjanic-collab"],
  },
  {
    slug: "triomphe",
    name: "Triomphe",
    metaTitle: "Pedral Triomphe — Ultra-Thin Swiss Hand-Wound, Limited to 20 | Pedral",
    metaDescription: "An 8.8mm ultra-thin dress watch with a Sellita Swiss hand-wound movement. Stockholm-designed by an independent Swedish maker. Editions of 20, no restocks.",
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
    badge: "",
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
      "Polishing cloth",
      "24-month warranty card",
      "Edition certificate with serial number",
      "Personal note from Kevin",
    ],
    // No price comparison with other brands (Kevin, 2026-10-29: it reads as cheap).
    valueAnchor: "",
    valueComparePrice: "",
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
        stock: 5,
        color: "Blue",
        description: "A multi-layer guilloché dial in deep sapphire blue. Carreau Tissé centre, Vagues de Lumière border. Layers that reward every glance.",
        image: "/images/triomphe-saphir-roman.jpg",
        numeralOptions: ["Roman", "Eastern Arabic", "Hebrew"],
        soldOutNumerals: ["Hebrew"],
        numeralStock: { "Roman": 2, "Eastern Arabic": 3, "Hebrew": 0 },
        numeralImages: {
          "Roman": "/images/triomphe-saphir-roman.jpg",
          "Eastern Arabic": "/images/triomphe-saphir-arabic.jpg",
          "Hebrew": "/images/triomphe-saphir-hebrew.jpg",
        },
      },
      {
        name: "Ember Stone",
        stripePriceId: "price_1TOxO4CfxE1lSBKR8hiQjgiE",
        stock: 0,
        color: "Amber",
        description: "Warm amber tones drawn from the earth. A natural stone dial that deepens in low light and commands attention in daylight.",
        image: "/images/triomphe-ember.jpg",
      },
      {
        name: "Tempest Stone",
        stripePriceId: "price_1T4TsqCfxE1lSBKRFBCRLukn",
        stock: 0,
        color: "Gray",
        description: "Dark, stormy tones drawn from natural stone. No two dials are identical. Yours is the only one like it in the world.",
        image: "/images/triomphe-tempest.jpg",
      },
      {
        name: "Émeraude Vert",
        stripePriceId: "price_1T4TpQCfxE1lSBKR6aJh8nbb",
        stock: 0,
        color: "Green",
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
    relatedArticleSlugs: ["triomphe-numerals-heritage", "triomphe-guilloche-dial", "hand-wound-vs-automatic"],
  },
  {
    slug: "okapi",
    name: "Okapi Classique",
    metaTitle: "Pedral Okapi Classique — Swiss Hand-Wound, Limited to 20 | Pedral",
    metaDescription: "A 37mm cushion dress watch. ETA 7001 or La Joux-Perret LJP7380 Swiss hand-wound. Stockholm-designed, independent Swedish maker. Edition of 20.",
    tagline: "The Original",
    hook: "The one that started everything.",
    description:
      "The Okapi is defined by balance and restraint. Its 37mm cushion case combines rounded contours with precise architectural lines — a silhouette that reads as neither vintage nor modern. The watch that began the studio.",
    descriptionExtra:
      "The frosted blue dial sits behind a coin-edge fluted flange. A slim chapter ring with lacquer-filled markings, guilloché small seconds at six, spear-shaped hands. Powered by the LJP7380. Nothing placed without reason. Nothing removed that should remain.",
    designerNote:
      "Okapi was not my first prototype. It was the first that felt inevitable. A balance of curve and edge, softness held in precision. The language wasn't planned — it surfaced. Ten years later, I understand it better. The new version doesn't transform it. It clarifies what was always there.",
    year: 2018,
    tier: "signature",
    price: 2800,
    stock: 4, // static fallback (3 ETA 7001 + 1 LJP7380) — live counts come from Redis
    maxStock: 20,
    edition: "ETA 7001 · LJP7380",
    badge: "Available Now",
    urgencyTag: "Pieces remaining",
    // Buyable online since 2026-10-29 (Kevin); still made to order, 3–6 months.
    reserveButtonLabel: "Pre-Order Now",
    shipsBy: "Made to order · Delivery in 3–6 months",
    nonRefundable: true, // made-to-order pre-order — qualifies under EU Art. 16(c)
    variantLabel: "Movement",
    valuePerspectiveTitle: "Where the price goes.",
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
      "Soft polishing cloth",
      "Butterfly deployment clasp",
      "24-month international warranty card",
      "Handwritten note from Kevin",
    ],
    valueAnchor:
      "The LJP7380 is set at €3,900: a high-grade, decorated calibre from La Chaux-de-Fonds. The ETA 7001 is set at €2,800: a classic, proven movement, executed here with the same level of care. Same case, same dial, same twenty-piece edition. The choice is the movement you want to wind every morning.",
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
        stock: 3,
        color: "Blue",
        price: 2800,
        description: "Swiss hand-wound. Slim, direct, reliable. The honest choice — everything in its right place.",
        image: "/images/okapi-classique.png",
      },
      {
        name: "LJP7380",
        stripePriceId: "price_1TKw7wCfxE1lSBKRcFLiQiu6",
        stock: 1,
        color: "Blue",
        price: 3900,
        description: "La Joux-Perret LJP7380. High-grade decorated. La Chaux-de-Fonds manufacture. The movement independent watchmakers choose when they refuse to compromise.",
        image: "/images/okapi-classique.png",
      },
    ],
    relatedArticleSlugs: ["okapi-returns"],
  },
  {
    slug: "contour",
    name: "Contour",
    metaTitle: "Pedral Contour — Integrated Bracelet, Quartz & Hand-Wound | Pedral",
    metaDescription:
      "Contour: a 35mm, 6.9mm integrated-bracelet watch. €895 quartz, €1,000 Aurum, €1,950 hand-wound Onyx. Stockholm-designed. Third drop now available.",
    tagline: "Third Drop",
    hook: "Not a watch. A presence.",
    descriptionTitle: "Designed as a watch. Built like jewellery.",
    description:
      "The Contour doesn't sit on the wrist. It wraps it. Hundreds of articulated links move like fabric, finished with the care of a fine bracelet and shaped to form one continuous line from clasp to dial. Something meant to be touched as much as read.",
    descriptionExtra:
      "In the 1970s, a handful of makers understood that a watch could carry itself like jewellery — worn low on the wrist, catching the light before it told you anything about the time. That instinct gradually gave way to decades of tool watch thinking. The Contour brings it back deliberately: 35mm across, 6.9mm thin, close enough to the skin to move like a bracelet, substantial enough to be felt in the room. Available in stainless steel and gold plated stainless steel. It doesn't ask to be noticed. It simply is.",
    designerNote:
      "I didn't want to build another watch that behaved like a tool. I wanted the quiet confidence of good jewelry — weight, warmth, a presence that doesn't need explaining. Onyx keeps it simplest — a single sheet of black, letting the hands do all the talking. Aurum carries its own sky — natural lapis flecked with gold, no two dials alike. Wear it on either wrist, crown in or out. It was built for people who don't ask permission to be noticed. Call it aura, if you need a word for it — the sense that something walked into the room before you did.",
    year: 2026,
    tier: "limited",
    // Base/entry price (quartz). Hand-wound is €1,950 — see specs.Price below.
    price: 895,
    // Oct 2026: the 39mm case (Aventurine, Ituri) moved out into its own
    // product, Silhouette — Contour is the 35mm line only. maxStock drops
    // by those 20 pieces (140 → 120); their live counters stay under the
    // "contour" slug and Silhouette reads them via stockSlug/stockPart.
    //
    // Third drop: Nacre is now fully sold out (was 20 remaining, now 0).
    // Aurum (10) and Onyx (20) carry over unchanged at 35mm on the
    // original integrated scale-bracelet. Two new hand-wound dials join
    // at a larger 39mm case with a woven bracelet pattern:
    // Aventurine + moissanite baguette indices, and an Okapi cloisonné
    // enamel dial on a gold-plated case — both on the LJP D101 (a modern,
    // 50h-power-reserve successor to the Peseux 7001/ETA 7001, not a
    // higher grade than it — see valueAnchor). 10 pieces each, confirmed
    // by Kevin (20 total for the third drop). maxStock is the cumulative
    // edition size across all three drops: 140 total, confirmed by Kevin
    // (up from the 60 documented after the second drop alone — that
    // number undercounted the first drop, not this addition).
    stock: 40,
    maxStock: 120,
    edition: "Third drop",
    badge: "",
    urgencyTag: "Third drop · Pieces remaining",
    // Real checkout is live (Stripe variants below), so this is no longer an
    // enquiry-gated product — pricing, stock, and the standard Reserve CTA
    // all show normally now, same as Maestro/Triomphe.
    variantLabel: "Movement",
    numeralOptionsLabel: "Dial",
    // First-come-first-served pre-order, not a curated/reviewed allocation.
    reserveButtonLabel: "Pre-Order Now",
    shipsBy: "Ships end of Q1 2027",
    extraFaqs: [
      {
        q: "Is the Onyx dial real stone, or glass?",
        a: "Real stone — genuine black onyx, a natural quartz mineral (chalcedony), not glass or a printed imitation. It's denser than glass, stays cool to the touch longer, and carries the faint internal character of a real mineral rather than the too-perfect uniformity of a cast substitute.",
      },
      {
        q: "Is the Aurum case solid gold?",
        a: "No — it's a gold-plated finish over the same 316L stainless steel case as the rest of the Contour line, not solid gold. The Lapis dial is genuine natural stone, so the gold flecking you see in it is real pyrite, not paint. A solid gold version is planned for the future — write to Kevin directly for pricing.",
      },
      {
        q: "Where is the 39mm version?",
        a: "The larger 39mm case is now its own watch: Silhouette — the same integrated idea in a new proportion, on the Nyoka weave bracelet.",
      },
    ],
    specsTitle: "Presence, not permission.",
    specs: {
      Price: "€895 quartz · €1,000 Aurum · €1,950 hand-wound",
      Movement:
        "Ronda 1063, Swiss-made quartz — or ETA 7001, Swiss hand-wound, 2.5mm calibre height",
      Case: "35mm · 6.9mm thin · fully integrated scale-bracelet construction · 316L stainless steel (Aurum: gold-plated 316L stainless steel)",
      Dial:
        "Quartz: Aurum, natural lapis lazuli flecked with gold pyrite, no two dials alike. Hand-Wound: Onyx — a single sheet of genuine black onyx stone, cut in the same squarcle silhouette.",
      Bracelet: "Fully integrated, hundreds of brushed scales, no visible lugs",
      Crystal: "Sapphire",
      "Water Resist.": "5 ATM / 50 meters",
      Edition: "Third drop · Nacre now fully allocated. Aurum and Onyx carry over from the second drop. The 39mm dials continue as Silhouette.",
    },
    boxContents: [
      "Contour timepiece",
      "Polishing cloth",
      "24-month warranty card",
      "A note from Kevin",
    ],
    valuePerspectiveTitle: "Two ways to own it.",
    valueAnchor:
      "€895 for the Ronda 1063, Swiss-made quartz — the same silhouette, nothing to think about. €1,950 for the ETA 7001 hand-wound — a 2.5mm calibre chosen to stay honest to the case's height. The same ETA 7001 also powers Okapi Classique, at a higher price there — a larger case, built around a separate strap. Here it sits inside a fully integrated, hand-finished bracelet in a smaller case. Different construction. Different price.",
    valueComparePrice: "",
    detailStrip: {
      eyebrow: "The Dials",
      title: "Real stone. No two alike.",
      text: "Aurum carries natural lapis lazuli, flecked with genuine gold pyrite. Onyx is a single sheet of genuine black stone, cut in the same squarcle silhouette. Every dial across the line is a slice of real material or real craft, so no two pieces ever come out quite the same.",
    },
    testimonials: [],
    wristFit: {
      caseDiameter: "35mm",
      thickness: "6.9mm",
      wristRange: "13.5–20cm (5.3–7.9\")",
      note: "There are no traditional lugs to measure. The bracelet is fully integrated into the case, so fit comes down to bracelet length rather than case proportion. At 35mm across and 6.9mm thin, it sits close and settles flat rather than standing off the wrist.",
      noteExtra: "The bracelet closes with a slide adjustment clasp. Release the lock, place it exactly where your wrist wants it, and close it again. The fit is continuous rather than stepped, so there are no holes to compromise between and no links to remove. It fits wrists from around 13.5cm to 20cm (5.3\" to 7.9\").",
      image: "/images/contour-wristfit-arch.jpg",
    },
    newsletterTitle: "Stay close to the studio.",
    newsletterSub: "Updates on Contour and future editions. No noise.",
    image: "/images/contour-aurum-product-v2.jpg",
    heroImage: "/images/contour-wristfit-arch.jpg",
    detailImage: "/images/contour-onyx-product-angle2.jpg",
    galleryImages: [
      "/images/contour-aurum-product-v2.jpg",
      "/images/contour-onyx-product-angle2.jpg",
      "/images/contour-onyx-product-v2.jpg",
    ],
    heroFit: "contain",
    variants: [
      {
        // Second drop: same Ronda quartz platform, updated to the 1063.
        // Restructured to a single "Quartz" variant with a dial picker
        // (Nacre / Aurum), matching Triomphe's numeral-style pattern —
        // plus the first run's sold-out Solaire for anyone curious
        // what came before. Each live dial keeps its own dedicated Stripe
        // price via numeralPriceIds since they're priced/tracked
        // separately, not just cosmetic variants of one SKU. The hero
        // crossfade uses a dedicated "pose" batch (numeralHeroImages) from
        // one shared render session — same lighting/surface/framing across
        // all three dials — separate from the product-card shots.
        name: "Quartz",
        stripePriceId: "price_1U16isCfxE1lSBKRSMBWzhCO",
        stock: 30,
        color: "Black/White",
        price: 895,
        description: "Ronda 1063, Swiss-made quartz. Aurum, natural lapis lazuli flecked with genuine gold pyrite. Nacre is now fully allocated.",
        image: "/images/contour-aurum-product-v2.jpg",
        heroImage: "/images/contour-aurum-hero-v4.jpg",
        numeralOptions: ["Nacre", "Aurum", "Solaire"],
        soldOutNumerals: ["Nacre", "Solaire"],
        numeralStock: { "Nacre": 0, "Aurum": 10, "Solaire": 0 },
        numeralImages: {
          "Nacre": "/images/contour-nacre-product-v2.jpg",
          "Aurum": "/images/contour-aurum-product-v2.jpg",
          "Solaire": "/images/contour-orange-agate-product-v2.jpg",
        },
        numeralHeroImages: {
          "Nacre": "/images/contour-nacre-hero-v4.jpg",
          "Aurum": "/images/contour-aurum-hero-v4.jpg",
        },
        numeralPriceIds: {
          "Nacre": "price_1U16isCfxE1lSBKRSMBWzhCO",
          "Aurum": "price_1U3blkCfxE1lSBKR3ZwxlQ60",
        },
        numeralPrices: {
          "Aurum": 1000,
        },
      },
      {
        // First run's Hand-Wound MOP dials are included as sold-out
        // options for anyone curious what came before Onyx.
        name: "Hand-Wound",
        stripePriceId: "price_1U0sqHCfxE1lSBKRl7VPZnh7",
        stock: 20, // Confirmed 20/20/10 split with Kevin
        color: "Black",
        price: 1950,
        description: "ETA 7001, Swiss hand-wound. Onyx dial — a single sheet of genuine black onyx stone, cut in the same squarcle silhouette as Nacre.",
        image: "/images/contour-onyx-product-v2.jpg",
        heroImage: "/images/contour-onyx-hero-v4.jpg",
        numeralOptions: ["Onyx", "Nébuleuse", "Lumière"],
        soldOutNumerals: ["Nébuleuse", "Lumière"],
        numeralStock: { "Onyx": 20, "Nébuleuse": 0, "Lumière": 0 },
        numeralImages: {
          "Onyx": "/images/contour-onyx-product-v2.jpg",
          "Nébuleuse": "/images/contour-black-mop-product-v2.jpg",
          "Lumière": "/images/contour-white-mop-product-v2.jpg",
        },
        numeralHeroImages: {
          "Onyx": "/images/contour-onyx-hero-v4.jpg",
        },
      },
    ],
    relatedArticleSlugs: ["contour-three-drops"],
  },
  {
    // Silhouette (Oct 2026): Contour's former 39mm case, now its own watch —
    // same prices, same live Stripe prices, same stock. Aventurine's live
    // counter is the one it had under Contour (stock:contour:
    // hand-wound-39mm-aventurine), read via stockSlug + stockPart. Ituri is
    // fully allocated for now (Kevin), so it deliberately has no carried-over
    // counter — its old one still holds a stale 10.
    //
    // Held back (from the Contour days): an Aventurine quartz version at
    // €1,150 (Ronda 1063, same case) — needs a real Stripe price + stock
    // before it can be added as a variant.
    //
    // Ophion (purple) added 2026-10-28: woven dial echoing the Nyoka
    // bracelet, with a movement choice like Étiquette — Swiss LJP D101 €2,200
    // or Japanese Miyota 9015 converted to hand-wound €1,500. 20 pieces,
    // shared between the two movements. Name, prices, stock and case
    // thickness (unchanged at 7.3mm) confirmed by Kevin. A gold sister dial,
    // Ladon, was dropped before launch (Kevin, 2026-10-29); its Stripe
    // prices exist but aren't wired in.
    slug: "silhouette",
    name: "Silhouette",
    metaTitle: "Pedral Silhouette — 39mm Integrated Bracelet, Swiss Hand-Wound | Pedral",
    metaDescription:
      "Silhouette: a 39mm integrated-bracelet watch on the Nyoka weave, 7.3mm thin. New woven dial Ophion, hand-wound — Japanese €1,500, Swiss LJP D101 €2,200. Aventurine with hand-set moissanite, €2,200. Stockholm-designed.",
    tagline: "New",
    hook: "The line, reshaped.",
    descriptionTitle: "One continuous form.",
    description:
      "Silhouette carries the same idea as Contour: a case and bracelet built as one continuous form, with no break in the line from lug to crown. Here it comes in a new proportion and a new weave. 39mm in diameter and 47.5mm lug to lug, it has a larger, more present footprint than Contour, and at 7.3mm thin the slimness that defines the line carries over. Built in 316L stainless steel, with the same integrated collar fusing case to bracelet.",
    descriptionExtra:
      "Where Contour wears articulated scales, Silhouette moves in Nyoka, a tighter, more fluid link that catches the light in a single continuous ripple rather than a grid. The name comes from nyoka, the Lingala word for snake. The resemblance is intentional: the same logic that drew the integrated-bracelet watches of the 1970s toward reptilian textures, reworked for how we build today.",
    designerNote:
      "I let myself go further on a slightly larger case: Aventurine set with hand-cut moissanite, and Ituri — the studio's own Okapi motif, fired into gold enamel by hand rather than printed, named for the rainforest the animal actually comes from. Then I wanted the weave itself on the dial. Ophion carries the Nyoka pattern from the bracelet straight across the face, with nothing else on it — no indices, no logo.",
    year: 2026,
    tier: "limited",
    price: 1500, // "From" price on cards: Ophion with the Japanese movement
    stock: 24, // static fallback (sum of variant fallbacks) — live counts come from Redis
    maxStock: 40, // 10 Aventurine + 10 Ituri + 20 Ophion
    edition: "Ophion · Aventurine · Ituri",
    badge: "New",
    urgencyTag: "Pieces remaining",
    variantLabel: "Dial",
    numeralOptionsLabel: "Movement",
    reserveButtonLabel: "Pre-Order Now",
    shipsBy: "Ships end of Q1 2027",
    story: {
      eyebrow: "Ophion",
      title: "Unmistakable from across a room.",
      paragraphs: [
        "I wanted Ophion to sit closer to high jewellery than to watchmaking as usual. The pieces I keep coming back to are the ones you recognise from across a room before you can make out a single detail: a bracelet, a texture, a colour. I wanted something unmistakable in that way, a watch you know by its silhouette alone.",
        { heading: "One surface, wrist to dial" },
        "So the weave doesn't stop at the case. The Nyoka pattern runs from the bracelet straight across the dial, in a deep **purple** that falls to near-black where the weave turns into shadow. No indices, no logo, only two slender hands, so case, bracelet and dial read as one continuous surface.",
        { heading: "Worn like jewellery, built like a watch" },
        "Underneath, it is still a proper hand-wound watch: the Swiss La Joux-Perret LJP D101, or a Japanese Miyota 9015 that Pedral converts from automatic to hand-winding. Twenty pieces.",
      ],
    },
    extraFaqs: [
      {
        q: "Which movement should I choose for Ophion?",
        a: "Both are hand-wound, and the case stays 7.3mm thin either way. The Japanese version (€1,500) runs on a Miyota 9015 that Pedral converts from automatic to hand-winding. The Swiss version (€2,200) runs on the La Joux-Perret LJP D101, with a 50-hour power reserve. The twenty pieces are shared between the two movements, first come, first served.",
      },
      {
        q: "How is Silhouette different from Contour?",
        a: "Same idea — case and bracelet as one continuous form — in a larger 39mm case, 47.5mm lug to lug, on the Nyoka weave bracelet instead of Contour's articulated scales. At 7.3mm thin, it's only a touch thicker than Contour's 6.9mm.",
      },
      {
        q: "Is the Ituri dial hand-painted or printed?",
        a: "Neither — it's genuine cloisonné enamel. Thin gold wire is hand-bent into the outline of the Okapi motif, the resulting cells are filled with enamel powder, and the dial is fired in a kiln multiple times until the colour sets. It's one of the most labour-intensive techniques in watchmaking, which is why no two dials fire identically.",
      },
      {
        q: "Why is it called Ituri?",
        a: "The Ituri Rainforest, in the Democratic Republic of Congo, is the okapi's actual native habitat — the animal this dial depicts, and the studio's namesake. It felt more honest than naming the dial after the technique alone.",
      },
      {
        q: "Why is it called Nyoka?",
        a: "Nyoka is the Lingala word for snake. The weave catches the light in a single continuous ripple, the way a snake's scales do — the same instinct that drew the integrated-bracelet watches of the 1970s toward reptilian textures.",
      },
    ],
    specsTitle: "The line, reshaped.",
    specs: {
      Price: "Ophion: €1,500 Japanese · €2,200 Swiss · €2,200 Aventurine · €5,000 Ituri (fully allocated)",
      Movement: "Hand-wound · Swiss: La Joux-Perret LJP D101, 50-hour power reserve · Japanese (Ophion only): Miyota 9015 converted by Pedral from automatic to hand-winding",
      Case: "39mm · 47.5mm lug to lug · 7.3mm thin · 316L stainless steel (Ituri: gold-plated) · integrated collar fusing case to bracelet",
      Bracelet: "Integrated, Nyoka weave",
      Dial: "Ophion (purple): the Nyoka weave carried across the dial, no indices, no logo · Aventurine: natural stone with hand-set moissanite baguette indices · Ituri: hand-fired gold cloisonné enamel carrying the Okapi motif",
      Crystal: "Sapphire",
      "Water Resist.": "5 ATM / 50 meters",
      Warranty: "24-month international coverage",
    },
    boxContents: [
      "Silhouette timepiece",
      "Polishing cloth",
      "24-month warranty card",
      "A note from Kevin",
    ],
    valuePerspectiveTitle: "Where the price goes.",
    valueAnchor:
      "The LJP D101 is a modern successor to the Peseux/ETA 7001 family with a longer 50-hour reserve, not a higher-grade movement. So what sets the price is the dial: hand-set moissanite stone-setting on Aventurine, and hand-fired gold cloisonné enamel — the studio's namesake motif — on Ituri. On Ophion you choose the movement: the Swiss D101, or the Japanese Miyota 9015 converted to hand-winding, which brings the same case, bracelet and dial in at €1,500.",
    valueComparePrice: "",
    detailStrip: {
      eyebrow: "The Bracelet",
      title: "Nyoka weave.",
      text: "A tighter, more fluid link that catches the light in a single continuous ripple rather than a grid. Named for nyoka, the Lingala word for snake — the reptilian texture the integrated-bracelet watches of the 1970s reached for, reworked for how we build today.",
    },
    testimonials: [],
    wristFit: {
      caseDiameter: "39mm",
      thickness: "7.3mm",
      lugToLug: "47.5mm",
      note: "39mm in diameter and 47.5mm lug to lug: a larger, more present footprint than Contour, and at 7.3mm thin the slimness that defines the line carries over. The Nyoka weave is integrated into the case, so it follows the wrist as one continuous form.",
    },
    newsletterTitle: "Stay close to the studio.",
    newsletterSub: "Updates on Silhouette and future editions. No noise.",
    image: "/images/silhouette-ophion-v1.jpg",
    heroImage: "/images/silhouette-aventurine-v1.jpg",
    heroFit: "contain",
    detailImage: "/images/contour-ituri-wrist-v1.jpg",
    galleryImages: [
      "/images/silhouette-ophion-leather-v1.jpg",
      "/images/silhouette-ophion-flatlay-v1.jpg",
    ],
    galleryAspect: "16 / 9", // landscape leather shots, shown whole (Kevin)
    variants: [
      {
        name: "Ophion",
        stripePriceId: "", // unused — every movement choice has its own ID in numeralPriceIds
        stock: 20, // shared between both movements
        price: 1500,
        color: "Purple",
        description: "Purple woven dial carrying the Nyoka pattern across the face, no indices, no logo.",
        image: "/images/silhouette-ophion-v1.jpg",
        heroImage: "/images/silhouette-ophion-v1.jpg",
        numeralOptions: ["Japanese Hand-Wound", "Swiss Hand-Wound"],
        numeralPrices: { "Swiss Hand-Wound": 2200 },
        numeralPriceIds: {
          "Japanese Hand-Wound": "price_1UVadbCfxE1lSBKRn5qrUnUI", // Silhouette — Ophion · Japanese Hand-Wound (€1,500)
          "Swiss Hand-Wound": "price_1UVaclCfxE1lSBKRrfhLXk3D", // Silhouette — Ophion · Swiss Hand-Wound (€2,200)
        },
      },
      {
        name: "Aventurine",
        stripePriceId: "price_1UBz4bCfxE1lSBKRxoKbUr0w",
        stock: 4, // 4 left (Kevin, Oct 2026) — live count in Redis
        price: 2200,
        stockSlug: "contour",
        stockPart: "hand-wound-39mm-aventurine",
        color: "Blue",
        description: "Natural aventurine stone with hand-set moissanite baguette indices. LJP D101, Swiss hand-wound.",
        image: "/images/silhouette-aventurine-v1.jpg",
        heroImage: "/images/silhouette-aventurine-v1.jpg",
      },
      {
        name: "Ituri",
        stripePriceId: "price_1UBz7uCfxE1lSBKRLZGUEFVq",
        stock: 0, // fully allocated for now (Kevin, Oct 2026)
        price: 5000,
        color: "Gold",
        description: "Hand-fired gold cloisonné enamel carrying the studio's Okapi motif, on a gold-plated case. Named for the Ituri Rainforest, the okapi's native habitat.",
        image: "/images/silhouette-ituri-v1.jpg",
        heroImage: "/images/silhouette-ituri-v1.jpg",
      },
    ],
    relatedArticleSlugs: ["contour-three-drops"],
  },
  {
    // New model, opened for full-payment pre-order Oct 2026 while still at
    // prototype stage (prototype late Q4 2026 / early Q1 2027, estimated
    // delivery late Q1 / early Q2 2027, first come first served — confirmed
    // by Kevin 2026-10-25). Two
    // movements: Automatic (modified Miyota 9015, €1,100) and Swiss
    // hand-wound LJP D101 (€1,800) — prices confirmed by Kevin. Group-of-10 prices
    // (€950 / €1,550) are private and deliberately NOT on the site. The
    // purple dial (10 pieces) is owners-only and reserved through Kevin
    // directly, so it's not in the checkout. Copy is Kevin's own launch
    // text; case dimensions 27 × 43.7mm (golden ratio), 7.7mm max, confirmed
    // by Kevin 2026-10-25, as is 5 ATM water resistance.
    //
    // Structure: the four public dials are the variants (5 pieces each,
    // shared across movements — Edition of 20, confirmed by Kevin); the
    // movement is the sub-choice, each dial+movement its own Stripe price
    // so receipts and Stripe reports name both. (A Triomphe-style
    // colour → numerals → movement picker was tried and rejected by Kevin
    // as too complex — keep the purchase flow to two simple choices.) Famille Royale (purple) is sold
    // via Stripe payment links Kevin sends owners, not this checkout.
    //
    // Real live Stripe price IDs wired in (read from Kevin's Stripe
    // dashboard 2026-10-25), also allow-listed in VALID_PRICE_IDS in
    // src/app/api/checkout/route.ts.
    slug: "etiquette",
    name: "Étiquette",
    metaTitle: "Pedral Étiquette — Art Deco Rectangular Dress Watch, 27 × 43.7mm | Pedral",
    metaDescription:
      "Étiquette: a 27 × 43.7mm golden-ratio rectangular dress watch, 7.7mm max, with concentric CNC-machined grooves and custom distorted Roman numerals. Hand-wound: Japanese €1,100, Swiss €1,800. Pre-order now.",
    tagline: "Pre-order",
    hook: "Good taste. Questionable manners.",
    descriptionTitle: "A study in proportion. An exercise in irreverence.",
    description:
      "There are certain rules in watchmaking. Rules of proportion, symmetry, restraint and good taste. Étiquette acknowledges them — then politely ignores a few. Drawing from the architectural elegance of the Art Deco era, it reimagines the rectangular dress watch through exaggerated proportions, sculptural detailing and a healthy disregard for convention. At 27 × 43.7 mm, built on the golden ratio, and no more than 7.7 mm thick, its silhouette is deliberately unconventional: slim, elegant and slightly eccentric.",
    descriptionExtra:
      "Within the case, custom Roman numerals — familiar, yet deliberately distorted — stretch across the dial with theatrical confidence, balanced by Pedral's signature inner dial frame. A faceted geodesic crown provides the finishing touch, while a finely tapered leather strap reinforces the watch's slender, vintage-inspired proportions. Restrained in dimensions, expressive in character. Rooted in tradition, yet entirely uninterested in following it too closely.",
    designerNote:
      "Good design, much like good manners, is knowing the rules. And knowing precisely when to break them.",
    year: 2026,
    tier: "signature",
    price: 1100,
    stock: 20, // sum of the variant (dial) stocks below
    maxStock: 20, // Edition of 20, consistent with Maestro / Triomphe / Okapi (Kevin, Oct 2026)
    edition: "Pre-order · First run",
    badge: "New",
    urgencyTag: "Pre-order open",
    reserveButtonLabel: "Pre-order",
    shipsBy: "Estimated delivery: late Q1 / early Q2 2027 · Delivered in order of purchase",
    variantLabel: "Dial",
    numeralOptionsLabel: "Movement",
    reassurance: [
      "Pre-order · Full payment secures your allocation",
      "Sapphire crystal · 316L steel · Hand-wound: modified Miyota 9015 or Swiss LJP D101",
      "Direct communication with Kevin — not a support team",
      "Tracked & insured shipping",
    ],
    specsTitle: "Not for everyone.",
    specs: {
      Price: "€1,100 Japanese hand-wound · €1,800 Swiss hand-wound",
      Movement: "Hand-wound · Hours and minutes · Japanese: Pedral-modified Miyota 9015, converted from automatic to manual winding, rectangular 27 × 20.6 × 3.5mm · Swiss: La Joux-Perret LJP D101, 50-hour power reserve",
      Case: "27 × 43.7mm · Golden ratio proportions · 7.7mm maximum thickness · Curved to follow the wrist · Subtly asymmetrical rectangle · 316L stainless steel",
      "Case Detail": "Concentric CNC-machined grooves · Brushed surfaces, polished bevels",
      Dial: "Pedral signature inner dial frame · Soirée (black onyx, gold numerals) and Bourgogne: custom distorted Roman numerals · Nocturne (black onyx) and Ambiance: musical-note indices · Famille Royale (Royal Aubergine lacquer, champagne-gold numerals) reserved for existing owners",
      Hands: "Polished dress-watch hands",
      Crown: "Pedral signature geodesic crown",
      Crystal: "Sapphire with anti-reflective coating",
      Caseback: "Solid stainless steel",
      "Water Resist.": "5 ATM / 50 metres",
      Strap: "Premium leather, lizard-pattern or Epsom · 20mm tapering to 18mm · Custom-fitted concealed lugs · Polished pin buckle",
      Status: "Pre-order · Estimated delivery late Q1 / early Q2 2027, in order of purchase · Final specifications subject to prototype development",
    },
    boxContents: [],
    valueAnchor: "",
    valueComparePrice: "",
    detailStrip: {
      eyebrow: "The Case",
      title: "Architecture in miniature.",
      text: "The case is gently curved, so it follows the line of the wrist instead of sitting flat on top of it. Multiple concentric grooves are CNC-machined into the stainless steel, following its elongated rectangular contours and softly rounded corners. Alternating brushed surfaces and polished bevels create subtle variations in reflection, so the case reveals different details as it moves with the wrist.",
    },
    testimonials: [],
    wristFit: {
      caseDiameter: "27 × 43.7mm",
      thickness: "7.7mm max",
      lugWidth: "20 → 18mm",
      note: "At 27 mm wide and 43.7 mm long, Étiquette is built on the golden ratio, giving the case a balance that feels right before you know why. Curved to follow the wrist, its slender profile, no more than 7.7 mm, sits discreetly beneath a cuff, while a custom-fitted leather strap tapering from 20 mm to 18 mm completes its refined silhouette.",
    },
    extraFaqs: [
      {
        q: "What will it cost?",
        a: "Both versions are hand-wound. The Japanese version, powered by a Miyota 9015 that Pedral has converted from automatic to manual winding and reworked into a rectangular movement (27 × 20.6 × 3.5 mm), is €1,100. The Swiss version, powered by the La Joux-Perret LJP D101, is €1,800.",
      },
      {
        q: "When will it be delivered?",
        a: "Delivery is expected between late Q1 and early Q2 2027, following prototype development in late Q4 2026 / early Q1 2027. Pieces are delivered in the order they were purchased — first come, first served. Final specifications, materials and availability are subject to prototype development.",
      },
      {
        q: "Can I get Famille Royale?",
        a: "Famille Royale — Royal Aubergine lacquer with champagne-gold numerals — is reserved exclusively for existing Pedral owners — just 21 numbered pieces, with no public allocation, and owners choose their own number. If you already own a Pedral, write to Kevin directly to reserve yours.",
      },
    ],
    newsletterTitle: "Follow Étiquette from prototype to wrist.",
    newsletterSub: "Prototype updates and studio news. No noise.",
    image: "/images/etiquette-soiree-gold.jpg",
    heroImage: "/images/etiquette-bourgogne.jpg",
    heroFit: "contain",
    detailImage: "/images/etiquette-soiree-gold.jpg",
    galleryImages: [
      "/images/etiquette-soiree-gold.jpg",
      "/images/etiquette-bourgogne.jpg",
      "/images/etiquette-nocturne.jpg",
      "/images/etiquette-ambiance.jpg",
    ],
    variants: [
      {
        name: "Soirée",
        stripePriceId: "", // unused — every movement choice has its own ID in numeralPriceIds
        stock: 5,
        price: 1100,
        description: "Black onyx dial, custom distorted Roman numerals and hands in gold. The black-tie one.",
        image: "/images/etiquette-soiree-gold.jpg",
        heroImage: "/images/etiquette-soiree-gold.jpg",
        numeralOptions: ["Japanese Hand-Wound", "Swiss Hand-Wound"],
        numeralPrices: { "Swiss Hand-Wound": 1800 },
        numeralPriceIds: {
          "Japanese Hand-Wound": "price_1UUF1JCfxE1lSBKRMKslTe28", // Étiquette — Soirée · Japanese Hand-Wound (€1,100)
          "Swiss Hand-Wound": "price_1UUF2bCfxE1lSBKRY27YyEDf", // Étiquette — Soirée · Swiss Hand-Wound (€1,800)
        },
      },
      {
        name: "Bourgogne",
        stripePriceId: "", // unused — every movement choice has its own ID in numeralPriceIds
        stock: 5,
        price: 1100,
        description: "Burgundy dial, custom distorted Roman numerals in silver.",
        image: "/images/etiquette-bourgogne.jpg",
        heroImage: "/images/etiquette-bourgogne.jpg",
        numeralOptions: ["Japanese Hand-Wound", "Swiss Hand-Wound"],
        numeralPrices: { "Swiss Hand-Wound": 1800 },
        numeralPriceIds: {
          "Japanese Hand-Wound": "price_1UUF4ACfxE1lSBKRaBgmkl77", // Étiquette — Bourgogne · Japanese Hand-Wound (€1,100)
          "Swiss Hand-Wound": "price_1UUF5hCfxE1lSBKRu70dLbhe", // Étiquette — Bourgogne · Swiss Hand-Wound (€1,800)
        },
      },
      {
        name: "Nocturne",
        stripePriceId: "", // unused — every movement choice has its own ID in numeralPriceIds
        stock: 5,
        price: 1100,
        description: "Black onyx dial with ivory musical-note indices.",
        image: "/images/etiquette-nocturne.jpg",
        heroImage: "/images/etiquette-nocturne.jpg",
        numeralOptions: ["Japanese Hand-Wound", "Swiss Hand-Wound"],
        numeralPrices: { "Swiss Hand-Wound": 1800 },
        numeralPriceIds: {
          "Japanese Hand-Wound": "price_1UUF7cCfxE1lSBKRNbpTOgfk", // Étiquette — Nocturne · Japanese Hand-Wound (€1,100)
          "Swiss Hand-Wound": "price_1UUF8YCfxE1lSBKRMREPi5B7", // Étiquette — Nocturne · Swiss Hand-Wound (€1,800)
        },
      },
      {
        name: "Ambiance",
        stripePriceId: "", // unused — every movement choice has its own ID in numeralPriceIds
        stock: 5,
        price: 1100,
        description: "Ivory dial with colourful musical-note indices and blue hands. The one with questionable manners.",
        image: "/images/etiquette-ambiance.jpg",
        heroImage: "/images/etiquette-ambiance.jpg",
        numeralOptions: ["Japanese Hand-Wound", "Swiss Hand-Wound"],
        numeralPrices: { "Swiss Hand-Wound": 1800 },
        numeralPriceIds: {
          "Japanese Hand-Wound": "price_1UUFARCfxE1lSBKREzsyJnrM", // Étiquette — Ambiance · Japanese Hand-Wound (€1,100)
          "Swiss Hand-Wound": "price_1UUFCICfxE1lSBKRHBF1I95p", // Étiquette — Ambiance · Swiss Hand-Wound (€1,800)
        },
      },
    ],
    comingSoonEditionsHeading: {
      eyebrow: "Owners Only",
      title: "One kept in the family.",
      text: "As a small gesture of appreciation to those who have supported Pedral over the years, Famille Royale — Royal Aubergine lacquer with champagne-gold appliqués — is reserved exclusively for existing Pedral owners. A quiet thank-you to those who believed in the brand before everyone else.",
      portrait: true,
    },
    comingSoonEditions: [
      {
        name: "Famille Royale",
        description: "Royal Aubergine lacquer, custom distorted Roman numerals as champagne-gold appliqués. Just 21 numbered pieces — owners choose their own number. No public allocation. Existing owners: write to Kevin directly to reserve yours.",
        image: "/images/etiquette-famille-royale.jpg",
        badge: "Owners Only · 21 Pieces",
      },
    ],
  },
  {
    // Étiquette Famille Royale (Oct 2026, Kevin's request): the purple dial, for
    // existing Pedral owners only — a standalone page reached by the link
    // Kevin sends owners, never listed on the site or in the feed. 21
    // numbered pieces; the buyer picks their number from a grid
    // (editionNumbers — held during checkout, marked sold by the webhook).
    // Live Stripe prices (2026-10-26); owners' codes ROYALE950 / ROYALE1500
    // (€150 / €300 off, until 3 Nov) are entered at Stripe checkout.
    slug: "etiquette-famille-royale",
    name: "Étiquette Famille Royale",
    metaTitle: "Pedral Étiquette Famille Royale — For Pedral Owners, 21 Numbered Pieces | Pedral",
    metaDescription:
      "Étiquette Famille Royale: Royal Aubergine lacquer with champagne-gold appliqués, reserved for existing Pedral owners. 21 numbered pieces — choose your own number.",
    tagline: "Owners Only",
    hook: "One kept in the family.",
    descriptionTitle: "For the Pedral Owners Club.",
    description:
      "Étiquette Famille Royale is the one dial that will never be sold publicly. It is reserved for existing Pedral owners — the Pedral Owners Club — as a thank-you to the people who believed in the studio before anyone else did. A Royal Aubergine lacquer dial, with custom Roman numerals — familiar yet deliberately distorted — as champagne-gold appliqués. Inside a 27 × 43.7 mm case built on the golden ratio, no more than 7.7 mm thick.",
    designerNote:
      "Every Pedral owner took a chance on an independent studio before there was a reason to. This one is for them. Good design, much like good manners, is knowing the rules — and knowing whom to thank.",
    year: 2026,
    tier: "limited",
    price: 1100,
    stock: 21,
    maxStock: 21,
    edition: "Owners only · Choose your number",
    badge: "Owners Only · 21 Pieces",
    urgencyTag: "Owners only · Choose your number",
    reserveButtonLabel: "Pre-order",
    shipsBy: "Estimated delivery: late Q1 / early Q2 2027 · Delivered in order of purchase",
    variantLabel: "Dial",
    numeralOptionsLabel: "Movement",
    standalone: true,
    excludeFromFeed: true, // owners only — not in the Instagram/Google catalogue
    ownersClubInvite: true,
    editionNumbers: 21,
    reassurance: [
      "Owners only · 21 numbered pieces · Choose your number",
      "Sapphire crystal · 316L steel · Hand-wound: modified Miyota 9015 or Swiss LJP D101",
      "Direct communication with Kevin — not a support team",
      "Tracked & insured shipping",
    ],
    story: {
      eyebrow: "Famille Royale",
      title: "Kept in the family.",
      paragraphs: [
        "Famille Royale exists for one reason: **to thank the people who were here first.** Every Pedral owner took a chance on an independent studio in Stockholm before there was a waiting list, a press page or a reason to. This dial is reserved for them — the Pedral Owners Club — and it will never be sold publicly.",
        { heading: "Why purple" },
        "For most of history, purple was the colour you couldn't simply buy. **Tyrian purple** took thousands of sea snails to dye a single garment, and Roman emperors kept it for themselves; in Byzantium, a child born to a reigning emperor was said to be *born in the purple*. A colour that had to be earned.",
        "On Étiquette, that purple deepens into **Royal Aubergine lacquer**, with **custom distorted Roman numerals as champagne-gold appliqués** — more understated and regal than bright violet and saturated gold. The same theatrical numerals as the rest of the collection, in a colour kept for family.",
        { heading: "Why only twenty-one" },
        "**Twenty-one watches. Twenty-one numbers.** Each piece is individually numbered, and **you choose yours** — a birthday, an anniversary, the year you bought your first Pedral, or simply the number that feels right. Once a number is taken, it is gone.",
        "When all twenty-one are spoken for, Famille Royale is closed. **There will be no second batch.**",
        "More than a dial, Famille Royale is a thank-you — **from the studio, to the people who made it possible.**",
      ],
    },
    specsTitle: "Kept in the family.",
    specs: {
      Movement: "Hand-wound · Hours and minutes · Japanese: Pedral-modified Miyota 9015, converted from automatic to manual winding, rectangular 27 × 20.6 × 3.5mm · Swiss: La Joux-Perret LJP D101, 50-hour power reserve",
      Case: "27 × 43.7mm · Golden ratio proportions · 7.7mm maximum thickness · Curved to follow the wrist · Subtly asymmetrical rectangle · 316L stainless steel",
      "Case Detail": "Concentric CNC-machined grooves · Brushed surfaces, polished bevels",
      Dial: "Famille Royale · Royal Aubergine lacquer · Custom distorted Roman numerals as champagne-gold appliqués, matching hands · Pedral signature inner dial frame",
      Hands: "Polished dress-watch hands",
      Crown: "Pedral signature geodesic crown",
      Crystal: "Sapphire with anti-reflective coating",
      Caseback: "Solid stainless steel",
      "Water Resist.": "5 ATM / 50 metres",
      Strap: "Premium leather, lizard-pattern or Epsom · 20mm tapering to 18mm · Custom-fitted concealed lugs · Polished pin buckle",
      Edition: "21 numbered pieces · Your choice of number · Reserved for existing Pedral owners",
      Status: "Pre-order · Estimated delivery late Q1 / early Q2 2027, in order of purchase · Final specifications subject to prototype development",
    },
    boxContents: [],
    valueAnchor: "",
    valueComparePrice: "",
    detailStrip: {
      eyebrow: "The Case",
      title: "Architecture in miniature.",
      text: "The case is gently curved, so it follows the line of the wrist instead of sitting flat on top of it. Multiple concentric grooves are CNC-machined into the stainless steel, following its elongated rectangular contours and softly rounded corners. Alternating brushed surfaces and polished bevels create subtle variations in reflection, so the case reveals different details as it moves with the wrist.",
    },
    testimonials: [],
    wristFit: {
      caseDiameter: "27 × 43.7mm",
      thickness: "7.7mm max",
      lugWidth: "20 → 18mm",
      note: "At 27 mm wide and 43.7 mm long, Étiquette is built on the golden ratio, giving the case a balance that feels right before you know why. Curved to follow the wrist, its slender profile, no more than 7.7 mm, sits discreetly beneath a cuff, while a custom-fitted leather strap tapering from 20 mm to 18 mm completes its refined silhouette.",
    },
    extraFaqs: [
      {
        q: "Who can order Famille Royale?",
        a: "Famille Royale is reserved for existing Pedral owners — it will never be sold publicly. If you've received this page, it's because you're part of the family.",
      },
      {
        q: "How does choosing my number work?",
        a: "There are 21 pieces, numbered 01 to 21. Pick any number that's still available; once you continue to checkout it's held for you for 30 minutes, and when your order is paid it's yours. Taken numbers are crossed out.",
      },
      {
        q: "When will it be delivered?",
        a: "Delivery is expected between late Q1 and early Q2 2027. Pieces are delivered in the order they were purchased. Final specifications are subject to prototype development.",
      },
    ],
    newsletterTitle: "Follow Étiquette from prototype to wrist.",
    newsletterSub: "Prototype updates and studio news. No noise.",
    image: "/images/etiquette-famille-royale.jpg",
    heroImage: "/images/etiquette-famille-royale.jpg",
    heroFit: "contain",
    detailImage: "/images/etiquette-famille-royale.jpg",
    galleryImages: ["/images/etiquette-famille-royale.jpg", "/images/etiquette-movement.jpg"],
    variants: [
      {
        name: "Famille Royale",
        stripePriceId: "", // unused — every movement choice has its own ID in numeralPriceIds
        stock: 21,
        price: 1100,
        description: "Royal Aubergine lacquer dial with custom distorted Roman numerals as champagne-gold appliqués. For existing Pedral owners only.",
        image: "/images/etiquette-famille-royale.jpg",
        heroImage: "/images/etiquette-famille-royale.jpg",
        numeralOptions: ["Japanese Hand-Wound", "Swiss Hand-Wound"],
        numeralPrices: { "Swiss Hand-Wound": 1800 },
        numeralPriceIds: {
          "Japanese Hand-Wound": "price_1UUl4sCfxE1lSBKREY3afrAq", // Étiquette Famille Royale · Japanese Hand-Wound (€1,100)
          "Swiss Hand-Wound": "price_1UUl5lCfxE1lSBKRRJDXaq90", // Étiquette Famille Royale · Swiss Hand-Wound (€1,800)
        },
      },
    ],
  },
  {
    // Étiquette numeral edition (Oct 2026, Kevin's request): its own
    // standalone landing page — live by direct link only, never listed on
    // /collections, the homepage carousel or the nav. Same case, movements,
    // prices and delivery as Étiquette (Japanese or Swiss hand-wound); edition
    // of 10, made to order. Live Stripe prices wired in 2026-10-25.
    slug: "etiquette-hebrew",
    name: "Étiquette Hebrew",
    metaTitle: "Pedral Étiquette Hebrew — Hebrew Numeral Dress Watch, Ten of Each Dial | Pedral",
    metaDescription:
      "Étiquette Hebrew: a 27 × 43.7mm golden-ratio rectangular case, 7.7mm max, with custom distorted Hebrew numerals, in ivory or blue. Ten of each dial, made to order. Hand-wound: Japanese €1,100, Swiss €1,800.",
    tagline: "Pre-order · Made to order",
    hook: "Good taste. Spoken in Hebrew.",
    descriptionTitle: "The same rules. A different alphabet.",
    description:
      "Étiquette takes the rules of the rectangular dress watch — proportion, symmetry, restraint — and politely ignores a few. This edition goes one step further and tells the time in Hebrew. Custom Hebrew numerals, familiar yet deliberately distorted, stretch across the lacquered dial — blue on ivory, or ivory on deep blue — balanced by Pedral's signature inner dial frame. At 27 × 43.7 mm, built on the golden ratio, and no more than 7.7 mm thick, the case is slim, elegant and slightly eccentric.",
    descriptionExtra:
      "Ten of each dial, made to order. For a Bar or Bat Mitzvah, a wedding, a parent, a child — or for yourself, after years of wearing watches that spoke only in someone else's tradition. A faceted geodesic crown and a finely tapered leather strap finish it. Restrained in dimensions, expressive in character.",
    designerNote:
      "Some people have spent years wearing watches that were beautiful, but not entirely theirs. A numeral is the first thing you read on a dial. It should be able to speak your language.",
    year: 2026,
    tier: "limited",
    price: 1100,
    stock: 18, // 9 Tchelet + 9 Layla remaining (Kevin, Oct 2026)
    maxStock: 20, // ten of each dial
    edition: "Hebrew numerals",
    badge: "Ten of Each Dial",
    urgencyTag: "Made to order · Ten of each dial",
    reserveButtonLabel: "Pre-order",
    shipsBy: "Estimated delivery: late Q1 / early Q2 2027 · Delivered in order of purchase",
    variantLabel: "Dial",
    numeralOptionsLabel: "Movement",
    standalone: true,
    excludeFromFeed: true, // Kevin: not in the Instagram/Google catalogue
    nonRefundable: true, // made to order — EU Art. 16(c), like the Triomphe numeral editions
    reassurance: [
      "Made to order · Full payment secures your piece",
      "Sapphire crystal · 316L steel · Hand-wound: modified Miyota 9015 or Swiss LJP D101",
      "Direct communication with Kevin — not a support team",
      "Tracked & insured shipping",
    ],
    story: {
      eyebrow: "The Story",
      title: "Written with respect.",
      paragraphs: [
        "Hebrew is one of the oldest written languages still read every day, and its letters have always doubled as numbers. Aleph is one, Bet is two, Yud is ten. The same letters counted the years on coins struck in Jerusalem two thousand years ago, and they still number the days of the Hebrew calendar today. Watches with Hebrew dials have existed for well over a century, made for families who wanted to read the hours in their own script.",
        "The Jewish community has been an integral part of Pedral's evolution. Some of the most personal commissions I have ever made came from it — a father looking for something to give his son at his Bar Mitzvah, a daughter wanting a watch that held something of her mother, collectors who had spent years wearing watches that spoke only in someone else's tradition. The Triomphe in Hebrew numerals grew out of those conversations, and it has sold out. Much of what Pedral is today was shaped by them.",
        "A script this old deserves care. Distort it carelessly and a numeral turns into a costume — a caricature of a culture rather than a tribute to it. That was never going to happen here. These numerals weren't drawn in Stockholm alone: they were developed together with members of the Jewish Enthusiasts Watch Society (J.E.W.S), a global community of watchmakers and collectors, who reviewed and refined them with me until every letter was right — playful in the Étiquette way, but never at the expense of what it means.",
        "Two dials — Tchelet, sky blue on ivory, and Layla, ivory on night blue. Japanese or Swiss hand-wound. Ten of each, made to order. Thank you to everyone who helped make it.",
      ],
    },
    specsTitle: "Not for everyone.",
    specs: {
      Price: "€1,100 Japanese hand-wound · €1,800 Swiss hand-wound",
      Movement: "Hand-wound · Hours and minutes · Japanese: Pedral-modified Miyota 9015, converted from automatic to hand-wound, rectangular 27 × 20.6 × 3.5mm · Swiss: La Joux-Perret LJP D101, 50-hour power reserve",
      Case: "27 × 43.7mm · Golden ratio proportions · 7.7mm maximum thickness · Curved to follow the wrist · Subtly asymmetrical rectangle · 316L stainless steel",
      "Case Detail": "Concentric CNC-machined grooves · Brushed surfaces, polished bevels",
      Dial: "Lacquered · Ivory with custom distorted Hebrew numerals in blue, or blue with ivory numerals · Pedral signature inner dial frame",
      Hands: "Polished dress-watch hands",
      Crown: "Pedral signature geodesic crown",
      Crystal: "Sapphire with anti-reflective coating",
      Caseback: "Solid stainless steel",
      "Water Resist.": "5 ATM / 50 metres",
      Strap: "Premium leather, lizard-pattern or Epsom · 20mm tapering to 18mm · Custom-fitted concealed lugs · Polished pin buckle",
      Edition: "Ten of each dial · Made to order · Not part of the standard Étiquette run",
      Status: "Pre-order · Estimated delivery late Q1 / early Q2 2027, in order of purchase · Final specifications subject to prototype development",
    },
    boxContents: [],
    valueAnchor: "",
    valueComparePrice: "",
    detailStrip: {
      eyebrow: "The Movement",
      title: "Shaped for the case.",
      text: "The Japanese version runs on a Miyota 9015 that Pedral has converted from automatic to manual winding and reworked into a rectangular movement measuring 27 × 20.6 × 3.5 mm. A round movement in a rectangular case leaves empty space; this one follows the shape of the watch. Without a rotor it stays at 3.5 mm, which is part of how the case stays at 7.7 mm. You wind it by the crown — the small ritual that comes with a hand-wound watch. Only the Japanese movement is shaped to the case. Prefer Swiss? Tchelet and Layla are also available with the La Joux-Perret LJP D101 — a conventional Swiss hand-wound calibre with a 50-hour power reserve.",
    },
    testimonials: [],
    wristFit: {
      caseDiameter: "27 × 43.7mm",
      thickness: "7.7mm max",
      lugWidth: "20 → 18mm",
      note: "At 27 mm wide and 43.7 mm long, Étiquette is built on the golden ratio, giving the case a balance that feels right before you know why. Curved to follow the wrist, its slender profile, no more than 7.7 mm, sits discreetly beneath a cuff, while a custom-fitted leather strap tapering from 20 mm to 18 mm completes its refined silhouette.",
      image: "/images/etiquette-hebrew.jpg",
    },
    extraFaqs: [
      {
        q: "What will it cost?",
        a: "Both versions are hand-wound. The Japanese version, powered by a Miyota 9015 that Pedral has converted to manual winding and reworked into a rectangular movement (27 × 20.6 × 3.5 mm), is €1,100. The Swiss version, powered by the La Joux-Perret LJP D101, is €1,800.",
      },
      {
        q: "When will it be delivered?",
        a: "Delivery is expected between late Q1 and early Q2 2027, following prototype development in late Q4 2026 / early Q1 2027. Pieces are delivered in the order they were purchased — first come, first served. Final specifications, materials and availability are subject to prototype development.",
      },
      {
        q: "Can I return it?",
        a: "The Hebrew edition is made to order for each buyer, so it can't be returned under the EU custom-goods exemption (Art. 16(c) of the Consumer Rights Directive). Your statutory warranty still applies in full. If you have any doubts about size or dial before ordering, write to Kevin directly — he responds personally.",
      },
      {
        q: "Why Hebrew numerals?",
        a: "Because the numerals on a dial can carry something of who you are. The Hebrew edition grew out of conversations with collectors looking for a watch that held their heritage — often as a gift, for a moment that matters — and its numerals were developed together with members of the Jewish Enthusiasts Watch Society (J.E.W.S). Ten of each dial only, made to order.",
      },
    ],
    newsletterTitle: "Follow Étiquette from prototype to wrist.",
    newsletterSub: "Prototype updates and studio news. No noise.",
    image: "/images/etiquette-hebrew.jpg",
    heroImage: "/images/etiquette-hebrew.jpg",
    heroFit: "contain",
    detailImage: "/images/etiquette-movement.jpg",
    galleryImages: ["/images/etiquette-hebrew.jpg", "/images/etiquette-movement.jpg", "/images/etiquette-hebrew-blue.jpg"],
    variants: [
      {
        name: "Tchelet",
        stripePriceId: "", // unused — every movement choice has its own ID in numeralPriceIds
        stock: 9,
        price: 1100,
        description: "Tchelet — Hebrew for sky blue. Lacquered ivory dial with custom distorted Hebrew numerals and hands in blue.",
        image: "/images/etiquette-hebrew.jpg",
        heroImage: "/images/etiquette-hebrew.jpg",
        numeralOptions: ["Japanese Hand-Wound", "Swiss Hand-Wound"],
        numeralPrices: { "Swiss Hand-Wound": 1800 },
        numeralPriceIds: {
          "Japanese Hand-Wound": "price_1UUOovCfxE1lSBKRZltUibsZ", // Étiquette Hebrew — Tchelet · Japanese Hand-Wound (€1,100)
          "Swiss Hand-Wound": "price_1UUOqaCfxE1lSBKRZ0PFXRKD", // Étiquette Hebrew — Tchelet · Swiss Hand-Wound (€1,800)
        },
      },
      {
        name: "Layla",
        stripePriceId: "", // unused — every movement choice has its own ID in numeralPriceIds
        stock: 9,
        price: 1100,
        description: "Layla — Hebrew for night. Lacquered deep blue dial with custom distorted Hebrew numerals in ivory.",
        image: "/images/etiquette-hebrew-blue.jpg",
        heroImage: "/images/etiquette-hebrew-blue.jpg",
        numeralOptions: ["Japanese Hand-Wound", "Swiss Hand-Wound"],
        numeralPrices: { "Swiss Hand-Wound": 1800 },
        numeralPriceIds: {
          "Japanese Hand-Wound": "price_1UUOsdCfxE1lSBKRzIQMNG8X", // Étiquette Hebrew — Layla · Japanese Hand-Wound (€1,100)
          "Swiss Hand-Wound": "price_1UUOtmCfxE1lSBKRpwNV6Bpc", // Étiquette Hebrew — Layla · Swiss Hand-Wound (€1,800)
        },
      },
    ],
  },
  {
    // Étiquette numeral edition (Oct 2026, Kevin's request): its own
    // standalone landing page — live by direct link only, never listed on
    // /collections, the homepage carousel or the nav. Same case, movements,
    // delivery as Étiquette, but hand-wound: Japanese (Pedral-modified Miyota 9015, rectangular, €1,100)
    // or Swiss LJP D101 (€1,800, Hebrew only — Kevin, Oct 2026), with
    // a lacquered dial (Kevin, Oct 2026); edition of 10, made to order.
    // TODO: one Stripe price per dial — until filled in (and added to
    // VALID_PRICE_IDS) the Pre-order button stays disabled.
    slug: "etiquette-eastern-arabic",
    name: "Étiquette Eastern Arabic",
    metaTitle: "Pedral Étiquette Eastern Arabic — Eastern Arabic Numeral Dress Watch, Edition of 10 | Pedral",
    metaDescription:
      "Étiquette Eastern Arabic: a 27 × 43.7mm golden-ratio rectangular case, 7.7mm max, with custom distorted Eastern Arabic numerals in gold on black onyx. Edition of 10, made to order. Modified Miyota 9015, hand-wound, €1,100.",
    tagline: "Pre-order · Made to order",
    hook: "Good taste. Spoken in Eastern Arabic.",
    descriptionTitle: "The same rules. A different alphabet.",
    description:
      "Étiquette takes the rules of the rectangular dress watch — proportion, symmetry, restraint — and politely ignores a few. This edition tells the time in Eastern Arabic numerals. Custom numerals, familiar yet deliberately distorted, stretch in gold across a lacquered black onyx dial, framed by Pedral's signature inner dial frame. At 27 × 43.7 mm, built on the golden ratio, and no more than 7.7 mm thick, the case is slim, elegant and slightly eccentric.",
    descriptionExtra:
      "Ten pieces, made to order. For those whose families counted in this script — across the Arab world and, in a closely related form, across Persian-speaking countries. A faceted geodesic crown and a finely tapered leather strap finish it. Restrained in dimensions, expressive in character.",
    designerNote:
      "A numeral is the first thing you read on a dial. It should be able to speak your language.",
    year: 2026,
    tier: "limited",
    price: 1100,
    stock: 10,
    maxStock: 10,
    edition: "Eastern Arabic numerals",
    badge: "Edition of 10",
    urgencyTag: "Made to order · 10 pieces",
    reserveButtonLabel: "Pre-order",
    shipsBy: "Estimated delivery: late Q1 / early Q2 2027 · Delivered in order of purchase",
    variantLabel: "Dial",
    standalone: true,
    excludeFromFeed: true, // Kevin: not in the Instagram/Google catalogue
    nonRefundable: true, // made to order — EU Art. 16(c), like the Triomphe numeral editions
    reassurance: [
      "Made to order · Full payment secures your piece",
      "Sapphire crystal · 316L steel · Modified Miyota 9015, hand-wound",
      "Direct communication with Kevin — not a support team",
      "Tracked & insured shipping",
    ],
    specsTitle: "Not for everyone.",
    specs: {
      Price: "€1,100",
      Movement: "Pedral-modified Miyota 9015 · Converted from automatic to hand-wound · Rectangular movement, 27 × 20.6 × 3.5mm · Hours and minutes",
      Case: "27 × 43.7mm · Golden ratio proportions · 7.7mm maximum thickness · Curved to follow the wrist · Subtly asymmetrical rectangle · 316L stainless steel",
      "Case Detail": "Concentric CNC-machined grooves · Brushed surfaces, polished bevels",
      Dial: "Lacquered · Black onyx with custom distorted Eastern Arabic numerals in gold · Pedral signature inner dial frame",
      Hands: "Polished dress-watch hands",
      Crown: "Pedral signature geodesic crown",
      Crystal: "Sapphire with anti-reflective coating",
      Caseback: "Solid stainless steel",
      "Water Resist.": "5 ATM / 50 metres",
      Strap: "Premium leather, lizard-pattern or Epsom · 20mm tapering to 18mm · Custom-fitted concealed lugs · Polished pin buckle",
      Edition: "10 pieces · Made to order · Not part of the standard Étiquette run",
      Status: "Pre-order · Estimated delivery late Q1 / early Q2 2027, in order of purchase · Final specifications subject to prototype development",
    },
    boxContents: [],
    valueAnchor: "",
    valueComparePrice: "",
    detailStrip: {
      eyebrow: "The Movement",
      title: "Shaped for the case.",
      text: "Inside is a Miyota 9015 that Pedral has converted from automatic to manual winding and reworked into a rectangular movement measuring 27 × 20.6 × 3.5 mm. A round movement in a rectangular case leaves empty space; this one follows the shape of the watch. Without a rotor it stays at 3.5 mm, which is part of how the case stays at 7.7 mm. You wind it by the crown — the small ritual that comes with a hand-wound watch.",
    },
    testimonials: [],
    wristFit: {
      caseDiameter: "27 × 43.7mm",
      thickness: "7.7mm max",
      lugWidth: "20 → 18mm",
      note: "At 27 mm wide and 43.7 mm long, Étiquette is built on the golden ratio, giving the case a balance that feels right before you know why. Curved to follow the wrist, its slender profile, no more than 7.7 mm, sits discreetly beneath a cuff, while a custom-fitted leather strap tapering from 20 mm to 18 mm completes its refined silhouette.",
      image: "/images/etiquette-eastern-arabic.jpg",
    },
    extraFaqs: [
      {
        q: "What will it cost?",
        a: "€1,100. This edition is hand-wound only, powered by a Pedral-modified Miyota 9015 — reworked into a rectangular movement (27 × 20.6 × 3.5 mm) that follows the shape of the case.",
      },
      {
        q: "When will it be delivered?",
        a: "Delivery is expected between late Q1 and early Q2 2027, following prototype development in late Q4 2026 / early Q1 2027. Pieces are delivered in the order they were purchased — first come, first served. Final specifications, materials and availability are subject to prototype development.",
      },
      {
        q: "Can I return it?",
        a: "The Eastern Arabic edition is made to order for each buyer, so it can't be returned under the EU custom-goods exemption (Art. 16(c) of the Consumer Rights Directive). Your statutory warranty still applies in full. If you have any doubts about size or dial before ordering, write to Kevin directly — he responds personally.",
      },
      {
        q: "Why Eastern Arabic numerals?",
        a: "Because the numerals on a dial can carry something of who you are. Eastern Arabic is the script many families across the Arab world counted in — and, in a closely related form, across Persian-speaking countries. Ten pieces only, made to order.",
      },
    ],
    newsletterTitle: "Follow Étiquette from prototype to wrist.",
    newsletterSub: "Prototype updates and studio news. No noise.",
    image: "/images/etiquette-eastern-arabic.jpg",
    heroImage: "/images/etiquette-eastern-arabic.jpg",
    heroFit: "contain",
    detailImage: "/images/etiquette-movement.jpg",
    galleryImages: ["/images/etiquette-eastern-arabic.jpg", "/images/etiquette-movement.jpg"],
    variants: [
      {
        name: "Noor",
        stripePriceId: "", // TODO: Stripe price (€1,100) — Pre-order stays disabled until filled
        stock: 10,
        price: 1100,
        description: "Noor — light, in Arabic, Persian and Urdu. Lacquered black onyx dial with custom distorted Eastern Arabic numerals and hands in gold.",
        image: "/images/etiquette-eastern-arabic.jpg",
        heroImage: "/images/etiquette-eastern-arabic.jpg",
      },
    ],
  },
  {
    // Étiquette numeral edition (Oct 2026, Kevin's request): its own
    // standalone landing page — live by direct link only, never listed on
    // /collections, the homepage carousel or the nav. Same case, movements,
    // delivery as Étiquette, but hand-wound only (Pedral-modified Miyota 9015, rectangular, €1,100) with
    // a lacquered dial (Kevin, Oct 2026); edition of 10, made to order.
    // Live Stripe prices wired in 2026-10-25.
    slug: "etiquette-bangla",
    name: "Étiquette Bangla",
    metaTitle: "Pedral Étiquette Bangla — Bangla (Bengali) Numeral Dress Watch, Ten of Each Dial | Pedral",
    metaDescription:
      "Étiquette Bangla: a 27 × 43.7mm golden-ratio rectangular case, 7.7mm max, with custom distorted Bangla (Bengali) numerals on a lacquered dial in green and red, or black onyx and gold. For Bangladesh, India and beyond. Ten of each dial, made to order. Modified Miyota 9015, hand-wound, €1,100.",
    tagline: "Pre-order · Made to order",
    hook: "Good taste. Spoken in Bangla.",
    descriptionTitle: "The same rules. A different alphabet.",
    description:
      "Étiquette takes the rules of the rectangular dress watch — proportion, symmetry, restraint — and politely ignores a few. This edition tells the time in Bangla (Bengali) numerals. Custom numerals, familiar yet deliberately distorted, sweep across a lacquered dial — in silver on green with a red centre, or in gold on black onyx — held by Pedral's signature inner dial frame. At 27 × 43.7 mm, built on the golden ratio, and no more than 7.7 mm thick, the case is slim, elegant and slightly eccentric.",
    descriptionExtra:
      "Ten of each dial, made to order. For those who grew up counting in Bangla — in Bangladesh, in West Bengal, Tripura and Assam, or a long way from any of them. A faceted geodesic crown and a finely tapered leather strap finish it. Restrained in dimensions, expressive in character.",
    designerNote:
      "A numeral is the first thing you read on a dial. It should be able to speak your language.",
    year: 2026,
    tier: "limited",
    price: 1100,
    stock: 20, // 10 Ekushey + 10 Sondhya (Kevin, Oct 2026)
    maxStock: 20, // ten of each dial
    edition: "Bangla numerals",
    badge: "Ten of Each Dial",
    urgencyTag: "Made to order · Ten of each dial",
    reserveButtonLabel: "Pre-order",
    shipsBy: "Estimated delivery: late Q1 / early Q2 2027 · Delivered in order of purchase",
    variantLabel: "Dial",
    standalone: true,
    excludeFromFeed: true, // Kevin: not in the Instagram/Google catalogue
    nonRefundable: true, // made to order — EU Art. 16(c), like the Triomphe numeral editions
    reassurance: [
      "Made to order · Full payment secures your piece",
      "Sapphire crystal · 316L steel · Modified Miyota 9015, hand-wound",
      "Direct communication with Kevin — not a support team",
      "Tracked & insured shipping",
    ],
    story: {
      eyebrow: "The Story",
      title: "Counted in Bangla.",
      paragraphs: [
        "Across several releases, some of Pedral's most loyal support has come from the Indian and Bengali community — in India, in Bangladesh and far beyond. After the Triomphe found its audience in Eastern Arabic and Hebrew numerals, the same question started arriving from them: when would there be one in Bangla? I've always been fascinated by Bengal — its language, its literature, its art — so the answer was never really in doubt. This watch is for the people who asked for it.",
        "Bangla is spoken by more than 250 million people — in Bangladesh, where it is the national language, and across India, where it is an official language of West Bengal and Tripura, is spoken throughout Assam's Barak Valley, and is one of the country's 22 scheduled languages. Few scripts are read by more people every day. Almost none of them have ever appeared on a fine watch.",
        "It is a language that has shaped the world's culture. Rabindranath Tagore wrote in Bangla, became the first non-European to win the Nobel Prize in Literature in 1913, and wrote the songs that became the national anthems of both India and Bangladesh. Kolkata gave the world the films of Satyajit Ray, generations of poets, painters and musicians, and Durga Puja — now recognised by UNESCO as intangible cultural heritage. And every 21 February — Ekushey — the whole world celebrates International Mother Language Day, a day that began with Bangla.",
        "The numerals themselves descend from the same ancient Indian numerals that gave the world the decimal place-value system — the counting every watch dial quietly relies on. Étiquette Bangla brings them back to the dial, in two versions: Ekushey, in green and red, and Sondhya — evening — in black onyx and gold. Ten of each, made to order.",
      ],
    },
    specsTitle: "Not for everyone.",
    specs: {
      Price: "€1,100",
      Movement: "Pedral-modified Miyota 9015 · Converted from automatic to hand-wound · Rectangular movement, 27 × 20.6 × 3.5mm · Hours and minutes",
      Case: "27 × 43.7mm · Golden ratio proportions · 7.7mm maximum thickness · Curved to follow the wrist · Subtly asymmetrical rectangle · 316L stainless steel",
      "Case Detail": "Concentric CNC-machined grooves · Brushed surfaces, polished bevels",
      Dial: "Lacquered · Ekushey: green with a red centre, Bangla numerals in silver · Sondhya: black onyx, Bangla numerals and hands in gold · Custom distorted numerals · Pedral signature inner dial frame",
      Hands: "Polished dress-watch hands",
      Crown: "Pedral signature geodesic crown",
      Crystal: "Sapphire with anti-reflective coating",
      Caseback: "Solid stainless steel",
      "Water Resist.": "5 ATM / 50 metres",
      Strap: "Premium leather, lizard-pattern or Epsom · 20mm tapering to 18mm · Custom-fitted concealed lugs · Polished pin buckle",
      Edition: "Ten of each dial · Made to order · Not part of the standard Étiquette run",
      Status: "Pre-order · Estimated delivery late Q1 / early Q2 2027, in order of purchase · Final specifications subject to prototype development",
    },
    boxContents: [],
    valueAnchor: "",
    valueComparePrice: "",
    detailStrip: {
      eyebrow: "The Movement",
      title: "Shaped for the case.",
      text: "Inside is a Miyota 9015 that Pedral has converted from automatic to manual winding and reworked into a rectangular movement measuring 27 × 20.6 × 3.5 mm. A round movement in a rectangular case leaves empty space; this one follows the shape of the watch. Without a rotor it stays at 3.5 mm, which is part of how the case stays at 7.7 mm. You wind it by the crown — the small ritual that comes with a hand-wound watch.",
    },
    testimonials: [],
    wristFit: {
      caseDiameter: "27 × 43.7mm",
      thickness: "7.7mm max",
      lugWidth: "20 → 18mm",
      note: "At 27 mm wide and 43.7 mm long, Étiquette is built on the golden ratio, giving the case a balance that feels right before you know why. Curved to follow the wrist, its slender profile, no more than 7.7 mm, sits discreetly beneath a cuff, while a custom-fitted leather strap tapering from 20 mm to 18 mm completes its refined silhouette.",
      image: "/images/etiquette-bangla.jpg",
    },
    extraFaqs: [
      {
        q: "What will it cost?",
        a: "€1,100. This edition is hand-wound only, powered by a Pedral-modified Miyota 9015 — reworked into a rectangular movement (27 × 20.6 × 3.5 mm) that follows the shape of the case.",
      },
      {
        q: "When will it be delivered?",
        a: "Delivery is expected between late Q1 and early Q2 2027, following prototype development in late Q4 2026 / early Q1 2027. Pieces are delivered in the order they were purchased — first come, first served. Final specifications, materials and availability are subject to prototype development.",
      },
      {
        q: "Can I return it?",
        a: "The Bangla edition is made to order for each buyer, so it can't be returned under the EU custom-goods exemption (Art. 16(c) of the Consumer Rights Directive). Your statutory warranty still applies in full. If you have any doubts about size or dial before ordering, write to Kevin directly — he responds personally.",
      },
      {
        q: "Why Bangla numerals?",
        a: "Because you asked. The Indian and Bengali community has supported Pedral across several releases, and after the Triomphe's Eastern Arabic and Hebrew numeral editions, many of you asked for a watch in your own numerals. Bangla numerals — also called Bengali numerals — are read every day by hundreds of millions of people in Bangladesh and India, from Dhaka to Kolkata, Agartala and Assam, and across the diaspora. Yet they almost never appear on a fine watch. Ten of each dial, made to order.",
      },
    ],
    newsletterTitle: "Follow Étiquette from prototype to wrist.",
    newsletterSub: "Prototype updates and studio news. No noise.",
    image: "/images/etiquette-bangla.jpg",
    heroImage: "/images/etiquette-bangla.jpg",
    heroFit: "contain",
    detailImage: "/images/etiquette-movement.jpg",
    galleryImages: ["/images/etiquette-bangla.jpg", "/images/etiquette-movement.jpg", "/images/etiquette-bangla-unishe.jpg"],
    variants: [
      {
        name: "Ekushey",
        stripePriceId: "price_1UUPTrCfxE1lSBKRy4L1h1fg", // Étiquette Bangla — Ekushey (€1,100)
        stock: 10,
        price: 1100,
        description: "Ekushey — twenty-one, in Bangla. Lacquered green dial with a red centre and custom distorted Bangla numerals in silver.",
        image: "/images/etiquette-bangla.jpg",
        heroImage: "/images/etiquette-bangla.jpg",
      },
      {
        name: "Sondhya",
        stripePriceId: "price_1UUPNOCfxE1lSBKR7Zr4TfjN", // Étiquette Bangla — Sondhya (€1,100)
        stock: 10,
        price: 1100,
        description: "Sondhya — evening, in Bangla. Lacquered black onyx dial with custom distorted Bangla numerals and hands in gold.",
        image: "/images/etiquette-bangla-unishe.jpg",
        heroImage: "/images/etiquette-bangla-unishe.jpg",
      },
    ],
  },
  {
    // Capsule collaboration with Seconds Society (https://www.secondssociety.com/):
    // the Contour Quartz platform in a Sodalite dial, 15 pieces only, €895
    // (same price as the standard Contour Quartz — confirmed by Kevin, not a
    // typo). Live as of launch — real Stripe price wired in.
    slug: "contour-seconds-society",
    name: "Contour × Seconds Society",
    metaTitle: "Pedral Contour × Seconds Society — Sodalite Capsule, 15 Pieces | Pedral",
    metaDescription:
      "A 15-piece capsule collaboration with Seconds Society. Contour's integrated-bracelet quartz platform in a Sodalite dial. €895. Stockholm-designed.",
    tagline: "Capsule Collaboration",
    hook: "The same presence. A different stone.",
    description:
      "Sodalite reads almost black until the light finds it — then it opens into a royal blue, mottled with white calcite the way marble is veined. Ruby-red synthetic moissanite baguettes mark the hours, cut and set rather than printed. No two dials cut from this stone carry the same pattern. It sits inside the same Contour case: 35mm across, 6.9mm thin, the bracelet fully integrated so the watch moves like fabric rather than sitting bolted to a strap. A different stone, the same instinct — jewelry that happens to tell time.",
    descriptionExtra:
      "This one is made with Seconds Society, not by Pedral alone. Fifteen pieces, no more. When they're gone, this dial doesn't come back — not as a restock, not as a future Contour expression. It exists once, for the people who see it in time.",
    designerNote:
      "Every so often a stone shows up that changes how you think about a case you already know well. Sodalite did that. Seconds Society saw the same thing in it I did, and a fifteen-piece run felt like the right size for something this specific — small enough to stay rare, real enough to actually make.",
    year: 2026,
    tier: "limited",
    price: 895,
    stock: 15,
    maxStock: 15,
    edition: "15 pieces only",
    badge: "Capsule · 15 Pieces",
    urgencyTag: "Capsule release · 15 pieces only",
    reserveButtonLabel: "Reserve Now",
    specsTitle: "Presence, not permission.",
    specs: {
      Price: "€895",
      Movement: "Ronda 1063, Swiss-made quartz",
      Case: "35mm · 6.9mm thin · fully integrated scale-bracelet construction · 316L stainless steel",
      Dial: "Sodalite natural stone — royal blue, mottled with white calcite veining — with ruby-red synthetic moissanite baguette indices. Each dial is unrepeatable.",
      Bracelet: "Fully integrated, hundreds of brushed scales, no visible lugs",
      Crystal: "Sapphire",
      "Water Resist.": "5 ATM / 50 meters",
      Warranty: "24-month international coverage",
      Edition: "15 pieces total · a collaboration with Seconds Society, not part of the standard Contour run.",
    },
    boxContents: [
      "Contour timepiece",
      "Polishing cloth",
      "24-month warranty card",
      "A note from Kevin",
    ],
    valuePerspectiveTitle: "Same price. Rarer stone.",
    valueAnchor:
      "€895 — the same as the standard Contour Quartz. No premium for the rarer material; Seconds Society wanted this capsule priced like the line it comes from, not gated behind a markup. What's different is scarcity: fifteen pieces, each dial genuinely one of one, made once in partnership with Seconds Society.",
    valueComparePrice: "",
    detailStrip: {
      eyebrow: "The Stone",
      title: "No two alike.",
      text: "Sodalite is cut, not printed — the mottling in each dial is whatever the stone happened to carry at that slice. Buy this piece and you're buying the one dial that came out of that cut, not a pattern that can be repeated on the next.",
    },
    testimonials: [],
    wristFit: {
      caseDiameter: "35mm",
      thickness: "6.9mm",
      wristRange: "13.5–20cm (5.3–7.9\")",
      note: "There are no traditional lugs to measure — the bracelet is fully integrated into the case, so fit comes down to bracelet length rather than case-to-wrist proportion. At 35mm across and 6.9mm thin, it sits close and settles flat rather than sitting high off the wrist.",
      noteExtra: "The bracelet closes with a slide adjustment clasp. Release the lock, place it exactly where your wrist wants it, and close it again. The fit is continuous rather than stepped, so there are no holes to compromise between and no links to remove. It fits wrists from around 13.5cm to 20cm (5.3\" to 7.9\").",
    },
    newsletterTitle: "Stay close to the studio.",
    newsletterSub: "Updates on this capsule and future collaborations. No noise.",
    collaboration: {
      name: "Seconds Society",
      url: "https://www.secondssociety.com/",
      bio: "Seconds Society is a collector-led watch studio founded by Wahhaj, Ash, and Ray, built on a simple idea: some of the best watches come from collectors working directly with independent makers, not from a boardroom. Past releases include a Mercury-inspired sector dial with Isotope, the Brunswick 40.5 Jump Hour reimagined in blue with FEARS, a one-of-one piece with independent watchmaker Boyu Tang, and The Twelve: Watch Collectors Edition with Christopher Ward. The pairing with Pedral runs on the same instinct that carries through both studios — small, collector-facing, and more interested in making fifteen pieces once than a thousand pieces twice.",
    },
    image: "/images/contour-seconds-society-sodalite.jpg",
    heroImage: "/images/contour-seconds-society-hero-v2.jpg",
    detailImage: "/images/contour-seconds-society-macro.png",
    galleryImages: [
      "/images/contour-seconds-society-hero-v2.jpg",
      "/images/contour-seconds-society-angle-v2.jpg",
      "/images/contour-seconds-society-macro.png",
    ],
    heroFit: "contain",
    hidden: false,
    // A standalone capsule, not part of the core lineup — reachable only
    // via its own direct link (Instagram, Seconds Society, etc.), not
    // listed on /collections or the homepage showcase.
    standalone: true,
    variants: [
      {
        name: "Sodalite",
        stripePriceId: "price_1TyJgICfxE1lSBKRRyl9DzAp",
        stock: 15,
        color: "Blue",
        price: 895,
        description: "Ronda 1063, Swiss-made quartz. Sodalite dial — royal blue, mottled with white calcite — with ruby-red synthetic moissanite baguette indices.",
        image: "/images/contour-seconds-society-angle.png",
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

// Spells out a small collection count for headline copy (e.g. "Five watches.
// One designer.") so it never drifts out of sync with the actual catalog —
// used instead of a hardcoded number that has to be remembered and updated
// by hand every time a product is added or removed.
const COUNT_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
export function collectionCountWord(count: number): string {
  return COUNT_WORDS[count] ?? String(count);
}

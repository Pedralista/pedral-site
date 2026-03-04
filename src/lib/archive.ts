export interface ArchivedWatch {
  slug: string;
  name: string;
  year: number;
  soldYear: number;
  price: number;
  editionSize: number;
  editionLabel?: string;
  hook: string;
  description: string;
  images: string[];
  dialNames?: string[];
}

export const archivedWatches: ArchivedWatch[] = [
  {
    slug: "artefact",
    name: "Artefact",
    year: 2025,
    soldYear: 2022,
    price: 1499,
    editionSize: 20,
    editionLabel: "Limited Edition",
    hook: "Our interpretation on the quintessential luxury sports watch.",
    description:
      "Crafted in 39mm stainless steel, 11mm thick, with a 47.5mm lug-to-lug and integrated bracelet for balanced wearability. Dials are carved from rare stones—each naturally unique—or based on original artwork, faithfully brought to life through 3D printing. Powering it is the Miyota Cal. 9039, regulated to ±10s/day for Swiss-level precision. Diamond-cut skeleton hands offer sharp legibility and refined aesthetics. Bespoke straps are paired to each dial, elevating the individuality of every piece.",
    images: [
      "/images/archive/Artefact - Boris Blue.png",
      "/images/archive/Artefact - Driving Home.png",
      "/images/archive/Artefact - Geometry In Play.png",
      "/images/archive/Artefact - Kingfisher Blue.png",
      "/images/archive/Artefact - Perpetual Autumn.png",
      "/images/archive/Artefact - Raw Malachite.png",
      "/images/archive/Artefact - Shimmy Stardust.png",
      "/images/archive/Artefact - Shine Bright Like A Diamond.png",
    ],
    dialNames: [
      "Boris Blue",
      "Driving Home",
      "Geometry In Play",
      "Kingfisher Blue",
      "Perpetual Autumn",
      "Raw Malachite",
      "Shimmy Stardust",
      "Shine Bright Like A Diamond",
    ],
  },
  {
    slug: "okapi-gmt",
    name: "Okapi GMT",
    year: 2021,
    soldYear: 2023,
    price: 1800,
    editionSize: 20,
    hook: "Two cities. One wrist. No compromise.",
    description:
      "The Okapi GMT extended the cushion-case language into dual-timezone territory. A 24-hour hand and bidirectional bezel. The same restraint as the original, now with a practical purpose.",
    images: [
      "/images/archive/Okapi GMT - Ituri Forrest, Green Strap.png",
      "/images/archive/Okapi GMT-Cabinda Coast.png",
      "/images/archive/Okapi GMT-Moscow Midnight.png",
      "/images/archive/Okapi GMT-Parisian Pearl.png",
    ],
    dialNames: [
      "Ituri Forrest",
      "Cabinda Coast",
      "Moscow Midnight",
      "Parisian Pearl",
    ],
  },
  {
    slug: "okapi",
    name: "Okapi",
    year: 2015,
    soldYear: 2020,
    price: 1100,
    editionSize: 20,
    hook: "The one that started everything.",
    description:
      "The original Okapi. A fumé sunburst dial behind a coin-edge fluted flange. Swiss ETA 7001, hand-wound. The watch that defined the Pedral language. Sold through in 2020. It will not return.",
    images: [],
  },
];

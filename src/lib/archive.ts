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
    soldYear: 2025,
    price: 1499,
    editionSize: 20,
    editionLabel: "Limited Edition",
    hook: "Rare stone. Original art. 39mm of intent.",
    description:
      "An integrated bracelet that disappears on the wrist. Dials carved from rare stone — each one unrepeatable — or born from original artwork through precision 3D printing. Miyota Cal. 9039, ±10s. Diamond-cut skeleton hands. A bespoke strap matched to every dial. The difference between owning a watch and owning a piece.",
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
    year: 2023,
    soldYear: 2023,
    price: 1800,
    editionSize: 20,
    editionLabel: "Limited Drop",
    hook: "Two time zones. One watch that earns both.",
    description:
      "The Okapi case — refined, restrained — now tracking two cities at once. A 24-hour hand reads the second zone without interrupting the first. Bidirectional bezel. No extra bulk. The same quiet confidence, now with somewhere to be.",
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
    hook: "Where it began. Where it ended. Neither is coming back.",
    description:
      "A fumé sunburst dial behind a coin-edge fluted flange. Swiss ETA 7001, hand-wound. The watch that made everything after it possible — and the one that made us realise what Pedral was. Twenty pieces. Sold in 2020. The language it set is still the one we speak.",
    images: [],
  },
];

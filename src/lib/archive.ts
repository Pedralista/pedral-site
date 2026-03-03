export interface ArchivedWatch {
  slug: string;
  name: string;
  year: number;
  soldYear: number;
  price: number;
  editionSize: number;
  hook: string;
  description: string;
  image: string;
}

export const archivedWatches: ArchivedWatch[] = [
  {
    slug: "artefact",
    name: "Artefact",
    year: 2020,
    soldYear: 2022,
    price: 1200,
    editionSize: 20,
    hook: "An object before it is a watch.",
    description:
      "The Artefact was an exercise in reduction. Every surface, every line questioned until only the essential remained. A watch that asks you to look longer before you understand it.",
    image: "/images/archive/artefact.jpg",
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
    image: "/images/archive/okapi-gmt.jpg",
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
    image: "/images/archive/okapi.jpg",
  },
];

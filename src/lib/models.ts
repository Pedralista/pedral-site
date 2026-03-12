export interface StudioPiece {
  id: string;
  title: string;    // e.g. "Dial Study — Orange Agate"
  caption: string;  // e.g. "Material exploration developed during the Triomphe design phase."
  image?: string;
  darken?: boolean;
}

export const studioPieces: StudioPiece[] = [
  {
    id: "charity-time-to-give",
    title: "Auction Piece — Time to Give",
    caption: "Part of 'Time to Give' — a charity auction devoted entirely to Nordic watchmaking, organised by Stockholm Time. A gold sunburst outer dial, deep black centre, small seconds at six, on a hand-stitched yellow leather strap. Every bid goes directly to the Jonte Foundation's work supporting families in need. No buyer's commission. One watch. One chance.",
    image: "/images/Piece Unique/Study- Charity.jpeg",
    darken: true,
  },
  {
    id: "okapi-two-tone",
    title: "Dial Study — Okapi Two-Tone",
    caption: "A split-tone dial in amber and burnt orange — champagne sunburst upper field, deep amber lower, small seconds at six. The Okapi cushion case in brushed steel on a hand-stitched brown leather strap. An exploration of tonal contrast within a single colour family.",
    image: "/images/Piece Unique/Study- Okapi Two tone.jpg",
    darken: true,
  },
  {
    id: "betsy-ross",
    title: "Dial Study — Betsy Ross",
    caption: "Thirteen stars on a deep-blue guilloché centre. One for each original colony. Developed in 2026 — the year the United States marks 250 years of independence — as a quiet acknowledgement of a founding moment, not a souvenir of it.",
    image: "/images/Piece Unique/study-Betsy Ross.jpeg",
    darken: true,
  },
  {
    id: "pink-guilloche",
    title: "Dial Study — Pink Guilloché",
    caption: "Exploration in contrast — a salmon-rose guilloché dial paired with heat-blued hands and a dark DLC case.",
    image: "/images/Piece Unique/study-pink-guilloche.jpg",
    darken: true,
  },
  {
    id: "tantalum",
    title: "Material Study — Tantalum",
    caption: "Tantalum case. Multi-layer guilloché dial — copper damier centre, blued wave engine-turning, silver chapter ring with Roman numerals. Small seconds at six, powered by the LJP7380. One of the rarest case materials in watchmaking, chosen for how it ages.",
    image: "/images/Piece Unique/study-Tantalum.jpeg",
    darken: true,
  },
  {
    id: "lumos",
    title: "Material Study — Lumos",
    caption: "An exploration of lumicast as dial material — not as an accent, but as the dial itself. In darkness, the entire surface becomes light. Developed to understand what a watch looks like when lume is the design decision, not the detail.",
    image: "/images/Piece Unique/Study- Okapi Lumos.jpg",
    darken: true,
  },
  {
    id: "triomphe-ceramic",
    title: "Dial Study — Triomphe Ceramic",
    caption: "The Triomphe case in white ceramic — a departure from steel. Orange guilloché dial in Carreau Tissé, silver chapter ring with Roman numerals, paired with a bespoke sky-blue FKM rubber strap. A study in how far the Triomphe platform can stretch without losing itself.",
    image: "/images/Piece Unique/Study- Triomphe Ceramic Case.jpg",
    darken: true,
  },
  {
    id: "rymd-gmt",
    title: "Complication Study — Rymd GMT",
    caption: "The first GMT complication explored under the Pedral name. A world map dial beneath a 24-hour inner bezel — two time zones, one glance. Introducing the new tonneau case in full brushed steel.",
    image: "/images/Piece Unique/Study- Rymd GMT.jpg",
    darken: true,
  },
  {
    id: "zaire",
    title: "Dial Study — Zaire",
    caption: "A flag rendered in sunburst. Emerald green outer dial, gold centre, a red small seconds at six — three colours that carry the weight of a nation's history. Heritage as a design language, not decoration.",
    image: "/images/Piece Unique/Study- Okapi Zaire.jpg",
    darken: true,
  },
  {
    id: "florida-gator",
    title: "Dial Study — University Blue",
    caption: "Built for a client who wanted to carry his daughter's university colours on his wrist. Royal blue sunburst dial, orange small seconds — her colours, his watch. A commission where the brief was pride.",
    image: "/images/Piece Unique/Study- Okapi- Florida gator inspired dial.jpg",
    darken: true,
  },
  {
    id: "okapi-genesis",
    title: "Prototype Study — Okapi Genesis",
    caption: "The design that bridged the first Okapi and what followed. A deep emerald green sunburst dial with small seconds at six — the original cushion case carrying the language of a new generation. The transition, not the arrival.",
    image: "/images/Piece Unique/Study- Okapi Genesis verde.jpeg",
    darken: true,
  },
];

import { collections } from "@/lib/collections";

// Shared by the homepage sections and the /reviews page so they never drift.

// Real, published coverage only (outlet name, article URL, optional pull-quote). Do not fabricate entries.
export const PRESS_MENTIONS: { outlet: string; url: string; quote?: string; detail?: string }[] = [
  {
    outlet: "WatchCrunch",
    url: "https://www.watchcrunch.com/squabeee/reviews/pedral-maestro-petite-seconde-soul-blue-review-1423612",
    quote: "Unique and elevated take on a classic form, finished impeccably with quality materials.",
    detail: "Maestro Petite Seconde review · 4.2 / 5 · Recommended",
  },
  {
    outlet: "Mainspring",
    url: "https://www.mainspring.watch/review/pedral-maestro-royal-purple-review",
    quote: "I would be hard-pressed to find such an exquisite and singular design.",
    detail: "Maestro review · Vincent Deschamps · 2025",
  },
  {
    outlet: "12&60",
    url: "https://12and60.com/hands-on-with-the-unconventional-pedral-artefact/",
    quote: "Charming, baffling and intriguing all at the same time.",
    detail: "Artefact hands-on · Guy Parker · 2024",
  },
];

// Written reviews beyond the pull-quotes above, for the /reviews page.
export const MORE_ARTICLES: { outlet: string; title: string; url: string; detail: string }[] = [
  {
    outlet: "Mainspring",
    title: "Pedral Rymd Solar and Meridian GMT: The Good Kind of Avant-Gardism in Watch Design",
    url: "https://www.mainspring.watch/review/pedral-rymd-solar-and-meridian-gmt-swedish-brand-review",
    detail: "Vincent Deschamps · June 2026",
  },
];

// YouTube reviews found 2026-10-29. `friend` = the creator says on camera he is
// a friend of the brand, so these aren't presented as independent.
export const VIDEO_REVIEWS: { channel: string; title: string; url: string; friend?: boolean }[] = [
  { channel: "Zero Polish", title: "Pedral Triomphe Is Not for Everyone — And That's the Point", url: "https://www.youtube.com/watch?v=_kRwRzSU8Ec", friend: true },
  { channel: "Zero Polish", title: "FINALLY! Pedral Maestro Review", url: "https://www.youtube.com/watch?v=4EJrfFGGYQc", friend: true },
  { channel: "Happy Horologists", title: "Pedral x MIC Triomphe Collaboration", url: "https://www.youtube.com/watch?v=n1Gx4pEG4kY" },
  { channel: "Happy Horologists", title: "Pedral Rymd Brings The Retro Futuristic Vibe to Your Wrist", url: "https://www.youtube.com/watch?v=3kUBqMq9OF0" },
  { channel: "Blanchy Talks Watches", title: "Pedral Okapi Review — One of the best watches you've probably never heard of", url: "https://www.youtube.com/watch?v=YaodNC1DfDQ" },
  { channel: "Walkaround Watches", title: "Pedral Artefact Review + Walkaround at Chester, England", url: "https://www.youtube.com/watch?v=qN6GUSYQBko" },
  { channel: "DutchWatchChannel", title: "Pedral Artefact — Review", url: "https://www.youtube.com/watch?v=1kscqMMNbWg" },
  { channel: "Zero Polish", title: "Best microbrand release of 2024 | Pedral Artefact Aventurine review", url: "https://www.youtube.com/watch?v=JY65b0Y0yG4", friend: true },
];

// Owner quotes shown on the homepage. Real owners only — never invent one.
export const OWNER_TESTIMONIALS: { quote: string; author: string; detail: string }[] = [
  {
    quote:
      "Somehow, the watch feels alive. It's incredibly elegant and feels like a part of me. Kevin simply cannot help but do what is in his heart and mind.",
    author: "R.C.",
    detail: "Writer · Switzerland · Okapi owner",
  },
  {
    quote:
      "Your designs stand out. They have an understated elegance and exude quality far above the price point. The combination was unbelievable.",
    author: "M.S.",
    detail: "Collector · Triomphe owner",
  },
  {
    quote:
      "Not following trends but being a trend setter. For me, I have to connect with the owner of the brand. Then it's the watch.",
    author: "D.H.",
    detail: "Watch enthusiast · Maestro owner",
  },
  {
    quote:
      "I've got watches people recognise immediately. This one they don't. That's what starts the conversation.",
    author: "Swen A.",
    detail: "Architect · Hamburg · Collector since 2022",
  },
  {
    quote:
      "I emailed Kevin and he called me back the same afternoon. We ended up talking for half an hour. Try getting that from Tissot or Longines.",
    author: "David M.",
    detail: "Creative Director · Brussels · Triomphe owner",
  },
  {
    quote:
      "I own blue dials from the usual names. The Émeraude Vert is different. On the wrist, in actual light, it has this depth that surprised me.",
    author: "Anthony A.",
    detail: "Artist · France",
  },
];

/** Every owner quote on the site — homepage ones plus each product page's —
 * without duplicates, for the /reviews page. */
export function allOwnerQuotes() {
  const seen = new Set<string>();
  const out: { quote: string; author: string; detail: string; product?: { name: string; slug: string } }[] = [];
  for (const t of OWNER_TESTIMONIALS) {
    if (seen.has(t.quote)) continue;
    seen.add(t.quote);
    out.push(t);
  }
  for (const c of collections) {
    if (c.hidden) continue;
    for (const t of c.testimonials ?? []) {
      if (seen.has(t.quote)) continue;
      seen.add(t.quote);
      out.push({ quote: t.quote, author: t.name, detail: t.bio, product: { name: c.name, slug: c.slug } });
    }
  }
  return out;
}

export interface Article {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  body: string[];
}

export const articles: Article[] = [
  {
    slug: "why-twenty-pieces",
    date: "February 2026",
    category: "Philosophy",
    title: "Why Twenty Pieces? The Case for Radical Limitation",
    excerpt:
      "In an industry obsessed with growth, Pedral caps every edition at twenty. Not because we can't make more — but because limitation is the point.",
    readTime: "5 min read",
    body: [
      "The watch industry runs on scale. More units, more revenue, more brand awareness. It's a formula that works — until it doesn't. Until the thing you made becomes indistinguishable from everything else on the shelf.",
      "At Pedral, every edition is capped at twenty pieces. Not because we can't produce more. Not because of some manufactured scarcity play. Twenty is the number where Kevin can still personally inspect every watch. It's the number where each owner knows: there are only nineteen others.",
      "This isn't a business strategy. It's a design constraint. The same way a sonnet has fourteen lines — the limitation isn't a weakness. It's the structure that gives the work its shape.",
      "When a Pedral dial sells out, it doesn't come back. There's no second production run. No \"due to popular demand\" reissue. The people who own edition #7 of 20 know that the dial on their wrist exists in exactly that quantity. That knowledge changes how you wear it.",
      "We've had people email asking us to make more. We understand the frustration. But reopening an edition would betray the twenty people who already own it. Their watch would become something different — something less — the moment we printed dial twenty-one.",
      "Radical limitation means saying no to revenue. It means watching a waitlist grow and choosing not to fill it. It means every design decision carries weight, because you can't iterate your way out of a mistake across thousands of units.",
      "Twenty pieces. When they're gone, they're gone. That's the promise.",
    ],
  },
  {
    slug: "swiss-movement-independent-price",
    date: "January 2026",
    category: "Craft",
    title: "Swiss Movements at an Independent Price: How We Do It",
    excerpt:
      "Every Pedral watch runs on a Swiss movement — Sellita, ETA, or hand-wound calibres selected for each collection. But we don't charge what the big houses charge.",
    readTime: "7 min read",
    body: [
      "There's a persistent myth in watchmaking: Swiss movements require Swiss prices. That a Sellita SW200-1 inside a case somehow demands a four-figure premium just because the dial says something prestigious.",
      "Every Pedral watch runs on a Swiss movement. The Okapi uses an ETA 7001 hand-wound calibre. The Maestro houses a Sellita SW200-1 automatic. The Triomphe runs on a Swiss hand-wound movement selected specifically for its 8.8mm case height. These aren't compromises — they're deliberate choices.",
      "So how does a one-person operation in Stockholm offer Swiss-movement watches at prices that undercut established brands by 60-70%? The answer isn't a secret. It's just a different model.",
      "First: no middlemen. Kevin designs each watch, selects components directly from suppliers, and works with a single trusted assembly partner. There's no sales team, no regional distributors, no retail partners taking their cut.",
      "Second: no retail markup. A watch that reaches you through a boutique has typically been marked up 2-3x from wholesale. Pedral sells direct. The price you pay is the price of making the watch, plus a margin that keeps a one-person studio running.",
      "Third: no marketing department. The watches speak for themselves. Word of mouth, a small Instagram following, and the occasional feature in a watch publication. No Super Bowl ads. No Formula 1 sponsorships.",
      "The result: a Swiss-movement watch, designed in Stockholm, limited to twenty pieces, for a price that respects both the craft and the collector. It's not magic. It's math.",
    ],
  },
  {
    slug: "triomphe-guilloche-dial",
    date: "December 2025",
    category: "Design",
    title: "The Triomphe Guilloché Dial: Anatomy of 8.8mm",
    excerpt:
      "At 8.8mm thin, the Triomphe is the thinnest watch Pedral has ever made. Its rotating guilloché dial transforms a single canvas into twenty unique expressions.",
    readTime: "6 min read",
    body: [
      "Thin watches are a statement. They whisper instead of shout. They vanish beneath a cuff and reappear when you want them to. The Triomphe, at 8.8mm, is Kevin's most ambitious exploration of this idea.",
      "The challenge of building thin is that every fraction of a millimetre matters. The movement selection dictates the case height. The crystal profile adds thickness. Even the crown design affects how the watch sits on the wrist.",
      "For the Triomphe, Kevin selected a Swiss hand-wound movement specifically for its low profile. Hand-wound movements are inherently thinner than automatics — they don't need the rotor mechanism that adds bulk. This choice wasn't just about dimensions. It was about ritual: the daily act of winding your watch, connecting with the mechanism.",
      "The guilloché dial is the Triomphe's signature. Each edition features a different pattern — sunburst, barley, clous de Paris — applied to the dial surface. The patterns catch light differently depending on the angle, making the watch appear to change throughout the day.",
      "With only twenty pieces per dial variation, each guilloché pattern is genuinely rare. When a dial sells out, that specific pattern doesn't return. The Triomphe becomes a rotating canvas: same case, same movement, but a different visual language each time.",
      "At 8.8mm, the Triomphe disappears under a shirt cuff. At €1,500, it disappears the assumptions about what an independent watchmaker can achieve.",
    ],
  },
  {
    slug: "okapi-returns",
    date: "November 2025",
    category: "Collection",
    title: "The Okapi Returns: Reimagining the Watch That Started Everything",
    excerpt:
      "In 2018, the Okapi launched on Kickstarter and sold out. Now it returns with a new Swiss movement, a refined case, and the same stubborn spirit.",
    readTime: "8 min read",
    body: [
      "The Okapi was never supposed to be perfect. It was supposed to be real.",
      "In 2018, Kevin launched the first Pedral watch on Kickstarter. He was twenty-two, self-taught, and working out of a small apartment in Stockholm. The Okapi was raw — ambitious in concept, honest in execution. It sold out. And then it was gone.",
      "Now, eight years later, the Okapi returns. Not as a nostalgia play. Not as a reissue. As a reimagining.",
      "The new Okapi runs on an ETA 7001 hand-wound Swiss movement — a significant upgrade from the original. The case has been refined: same DNA, better proportions. The finishing is where eight years of obsessive learning shows most clearly.",
      "What hasn't changed is the philosophy. The Okapi is still limited to twenty pieces. It still carries the name that started everything — a reference to the elusive, beautiful animal that few have seen in the wild.",
      "Kevin talks about the original Okapi the way a musician talks about their first album: proud of its honesty, aware of its rough edges, grateful for what it taught. The new version is what happens when that same person has spent nearly a decade refining their craft.",
      "The Okapi returns at €2,000. Twenty pieces. The Kivu Edition. When it sells out — and it will — it won't come back. Not again. Not like this.",
      "Some things are worth waiting eight years for.",
    ],
  },
  {
    slug: "what-is-a-microbrand",
    date: "October 2025",
    category: "Industry",
    title: "What Is a Watch Microbrand? And Why Should You Care?",
    excerpt:
      "Microbrands — small, independent, often one-person operations — offer something different: direct access to the designer and transparent pricing.",
    readTime: "6 min read",
    body: [
      "The watch industry is dominated by a handful of conglomerates. Swatch Group owns Omega, Longines, Tissot, and a dozen others. LVMH holds TAG Heuer, Hublot, and Zenith. Richemont controls Cartier, IWC, and Jaeger-LeCoultre. These groups produce beautiful watches — but they produce them at scale, through layers of management, marketing, and distribution.",
      "A microbrand is something different entirely. It's typically one person — sometimes two or three — designing, producing, and selling watches directly. No conglomerate parent. No retail network. No marketing department with a Super Bowl budget.",
      "What microbrands offer isn't necessarily better. It's different. Direct access to the person who designed your watch. Transparent pricing without retail markups. Limited production that means your watch isn't one of fifty thousand.",
      "The trade-off is real: microbrands don't have the service networks, brand recognition, or resale infrastructure of established houses. You're buying into a person's vision, not a century of heritage.",
      "For some collectors, that's exactly the point. They've owned the Rolex. They've worn the Omega. Now they want something that connects them directly to a maker — someone who can tell them exactly why the dial is that shade of blue, why the case curves that way, why the edition stopped at twenty.",
      "Pedral is a microbrand. One designer. Kevin Pedral. Stockholm. Twenty pieces per edition. That's the whole story. Whether that matters to you depends on what you're looking for in a watch.",
    ],
  },
  {
    slug: "maestro-boris-pjanic-collab",
    date: "April 2025",
    category: "Collaboration",
    title: "Watches and Art: Best of Both Worlds — The Boris Pjanić Capsule",
    excerpt:
      "When contemporary artist Boris Pjanić and Kevin Pedral met in Stockholm, they discovered a shared obsession: making things that reward attention.",
    readTime: "5 min read",
    body: [
      "The collaboration happened the way most good things happen — by accident.",
      "Kevin and Boris met through a mutual friend in Stockholm. Boris, a contemporary artist known for work that blends geometric precision with organic forms, had never thought about watches. Kevin had never collaborated with another artist. They had coffee. Then dinner. Then a six-month conversation about what happens when horology meets contemporary art.",
      "The result was 'Watches and Art: Best of Both Worlds' — a capsule collection built around the Maestro platform. Boris contributed dial designs that reimagined his gallery work at 40mm scale. Kevin handled the technical execution, translating brushstrokes and textures into printable dial art.",
      "The capsule sold out on release. Not because of hype — because the watches were genuinely different from anything either of them had made alone.",
      "What made the collaboration work was a shared belief: that the things worth making are the things that reward close attention. A Boris Pjanić painting reveals new details the longer you look. A Pedral watch does the same. Combining them wasn't a stretch — it was inevitable.",
      "The capsule was limited, of course. Twenty pieces. They're gone now. But the relationship between Pedral and the art world isn't. More collaborations are coming. Different artists, different approaches, same conviction: the best of both worlds.",
    ],
  },
  {
    slug: "designing-in-stockholm",
    date: "March 2025",
    category: "Studio",
    title: "Designing Watches in Stockholm: Light, Silence, and Obsession",
    excerpt:
      "Stockholm's long winters and endless summer light shape everything Kevin designs. The city's design tradition runs through every Pedral watch.",
    readTime: "4 min read",
    body: [
      "Stockholm is not a watchmaking city. Switzerland has the Vallée de Joux. Germany has Glashütte. Japan has the Seiko campus in Shiojiri. Stockholm has IKEA, H&M, and a design tradition built on functionalism, restraint, and quiet confidence.",
      "That tradition runs through every Pedral watch, whether Kevin intends it or not. The clean lines. The deliberate negative space. The refusal to add elements that don't serve a purpose. These aren't conscious design choices — they're the result of growing up in a city where less has always been more.",
      "Kevin works from a small studio in Södermalm. The space is spare: a desk, a loupe, reference watches, and shelves of prototypes that didn't make the cut. Natural light is everything — Stockholm's long summer days and dark winters both shape the design process.",
      "In summer, the light is endless. The city doesn't sleep. Designs tend toward brightness, openness, optimism. In winter, the opposite: the studio is lit by desk lamps at 3pm, and the work turns inward. Darker dials. More texture. More attention to how a watch face catches limited light.",
      "There's something about designing watches in a city that isn't known for them. No tradition to lean on. No established way of doing things. Just one person, a studio, and the stubborn belief that Stockholm has something to add to the conversation.",
    ],
  },
  {
    slug: "hand-wound-vs-automatic",
    date: "February 2025",
    category: "Craft",
    title: "Hand-Wound vs. Automatic: Why the Triomphe Chose Differently",
    excerpt:
      "Automatic movements are convenient. Hand-wound movements are intentional. For the Triomphe — a watch built around thinness and ritual — the choice was obvious.",
    readTime: "5 min read",
    body: [
      "Most modern mechanical watches are automatic. A rotor on the back of the movement spins with your wrist motion, winding the mainspring as you go about your day. It's convenient. It's clever. And for the Triomphe, it was wrong.",
      "The Triomphe is built around two ideas: thinness and ritual. At 8.8mm, it needed every fraction of a millimetre. An automatic movement's rotor adds roughly 2-3mm to a movement's height. Remove the rotor, and you get a hand-wound movement that can sit in a dramatically thinner case.",
      "But the choice wasn't purely dimensional. A hand-wound watch asks something of its wearer. Every morning — or every couple of days — you pick up the watch, turn the crown, and feel the mainspring tighten. It's a small act. A few seconds. But it creates a connection between you and the mechanism that an automatic never quite achieves.",
      "There's a philosophical dimension too. An automatic watch runs itself. A hand-wound watch runs because you decided it should. It's a small distinction with a big implication: this watch exists because you choose to engage with it. When you stop winding, it stops ticking.",
      "Kevin chose hand-wound for the Triomphe because the watch is about intention. Intentionally thin. Intentionally limited. Intentionally demanding of the person who wears it. Not in a burdensome way — in a rewarding one.",
      "The crown on the Triomphe is designed for this ritual. Slightly larger than typical for a dress watch, with just enough grip texture to make the winding action satisfying. Twenty turns. Two days of power reserve. A small daily ceremony that connects you to what's on your wrist.",
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

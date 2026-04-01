export interface Article {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  body: string[];
  featuredImage?: string;
  cta?: { label: string; href: string };
}

export const articles: Article[] = [
  {
    slug: "artefact-terminal",
    date: "April 2026",
    category: "Studio",
    title: "Terminal: Why I'm Closing the Artefact Line",
    excerpt:
      "Artefact started as an experiment. It became something people still write to me about. Final Frontier closes it — not because it failed, but because it's done. Here's what that means.",
    readTime: "5 min read",
    body: [
      "Every line has a closing chapter. This is Artefact's.",
      "When Artefact released, it sold out fast. More editions followed, each finding their people before most had time to look. The Boris Pjanić collaboration brought in collectors who had never encountered Pedral before and stayed. Something grew around it that I didn't design for — a community of people who came through Kickstarter, backed the work before it existed, and kept showing up.",
      "Terrain and Sector are my take on a field watch. Two dials, one case, one set. Grounded, material, built to go anywhere without announcing itself. This 39mm case will not exist again after Final Frontier. The next iteration of the field watch concept will sit in a different bracket entirely — different movement, different price, different standard. This one was built as a collector's value proposition: the Pedral approach to a genre I care deeply about, at a price that makes it accessible.",
      "Thirteen sets remain. When they're gone, this case is gone with them.",
      "What I'm working on next is the field watch I've always wanted to make — without constraints. More on that when it's ready.",
    ],
    cta: { label: "Reserve the Final Set", href: "/artefact-final-frontier" },
  },
  {
    slug: "triomphe-numerals-heritage",
    date: "March 2026",
    category: "Design",
    title: "Three Scripts, One Watch: Why the Triomphee Speaks in Roman, Hebrew and Eastern Arabic",
    excerpt:
      "A watch dial is the most personal canvas in design. The Triomphee is available in Roman, Hebrew and Eastern Arabic numerals — not as a customisation option, but as a statement about identity, heritage and who you give a watch to.",
    readTime: "3 min read",
    body: [
      "A watch dial is the most intimate piece of design most people will ever own. You see it dozens of times a day. Whatever is on it becomes part of how you move through the world. The guilloché, the layered finishing — that's the craft. But the numerals are the voice. And a voice should speak in the language of the person wearing it.",
      "When I introduced the original Triomphee with Émeraude Vert guilloché, I chose Roman numerals. It felt right — classical, grounded, connected to every grand complication made in Geneva, every dress watch passed across a table with two hands. But after the December release, collectors from different parts of the world asked a natural question: what if the numerals spoke their language? I listened.",
      "The Saphir Azur dial now comes in three numeral versions: Roman, Eastern Arabic, and Hebrew. There's a particularity worth noting — the Eastern Arabic and Hebrew numerals are oriented toward the centre of the dial, creating a distinctly different visual rhythm than the traditional outward-facing approach. The numeral becomes part of the dial's composition, not merely an overlay. These aren't the same watch with different fonts. They're three versions of the same idea, each one resolved on its own terms.",
      "The non-Roman versions exist in particularly limited production and are made to order. I wanted it this way. Not to manufacture scarcity, but because these editions carry a different kind of weight — they are chosen with intention, for a specific person, at a specific moment. Keeping them limited honours that. Hebrew numerals came from a specific kind of conversation: a father looking for something to give his son at his Bar Mitzvah, a daughter wanting a watch that held something of who her mother is, a collector who had spent years wearing watches that spoke only in Swiss tradition — beautiful, yes, but not entirely his. Eastern Arabic carries the same weight for those whose families counted in that script — across the Arab world and in a closely related form across Persian-speaking countries.",
      "The Triomphee is a watch people give at moments that matter. Bar Mitzvahs. A parent's milestone birthday. A retirement gift from children who spent years looking for something worthy. These are the moments where a watch stops being an object and becomes a record. The numerals are part of that record. They say: I thought about who you are.",
      "Three scripts. One movement. One case. Three entirely different statements about identity and belonging. That's not a product range. That's a design philosophy.",
    ],
    cta: { label: "Reserve the Triomphee", href: "/collections/triomphe" },
  },
  {
    slug: "when-twenty-is-not-enough",
    date: "March 2026",
    category: "Philosophy",
    title: "When Twenty Isn't Enough: Why Pedral Sometimes Goes Beyond the Edition Limit",
    excerpt:
      "Pedral is built on twenty-piece editions. But it wasn't always that way — and for some designs, it still isn't. Here's why an independent watchmaker sometimes breaks his own rules, and why that's the most honest thing he can do.",
    readTime: "6 min read",
    body: [
      "I've built Pedral around limitation. Twenty pieces per edition. When they're gone, they're gone. I wrote an entire journal post defending that number — and I stand by every word of it.",
      "But it wasn't always like this.",
      "In the early days, I did what most independent watchmakers do: I tried to make everyone happy. Longer runs. More options. A wider net. If someone wanted it, I wanted to be able to say yes. That instinct came from a good place — a genuine desire to put the work in as many hands as possible. But it cost me something I didn't immediately recognise I was losing: clarity. The watches became less deliberate. The decisions felt less weighted. When you can always make more, nothing you make feels final.",
      "The shift to twenty pieces wasn't a marketing strategy. It was a confrontation with the truth of what I was actually doing. Limitation forced every design decision to matter. It made me ask, before committing anything to production: is this worth being one of twenty things that will exist in the world in this exact form? That question changed everything. Because the people I design for aren't looking for what everyone else has. They're looking for something that most people will never own, never notice, never even know exists — and that's precisely what makes it theirs.",
      "But rules exist to serve a purpose. When the purpose is better served by breaking them, you break them.",
      "Design is at the centre of everything I do at Pedral. Not design as decoration — design as a way of thinking, of solving, of feeling. Every proportion I choose, every material I select, every detail I let survive the editing process: it's all in service of something that should move the person wearing it. That's the only standard I hold myself to. Does it move you? Does it say something that couldn't be said any other way?",
      "Some designs answer yes so completely that I don't know what to do with them.",
      "There are sketches and prototypes in my Stockholm studio that have been sitting for years. Not because they're unfinished — but because they're too right for twenty pieces and too considered for a standard launch. Designs where the case geometry, the guilloché dial texture, the hand profile all arrived together, fully formed, like the watch already existed and I was just the one transcribing it. Those are the ones that keep me up at night. Those are the ones I can't shelve.",
      "Occasionally I design something that doesn't fit the limited-edition model. Not because I ran out of ideas within the edition — but because the design itself demands a wider audience. Some watches feel like they were made for a specific kind of collector: the person who already knows what a guilloché dial is, who can read a case finishing at a glance. Others feel like they were made for anyone who has ever looked at a watch and felt something without knowing why. When a design lands in the second category, twenty starts to feel like the wrong answer.",
      "Some of those designs will only ever exist on Kickstarter. They won't appear on pedral.eu. They won't carry an edition number. They live in a different space entirely — conceived for the campaign, fulfilled through it, and gone when it closes. If you only follow the site, you'll miss them. That's not accidental. Kickstarter has its own energy, its own kind of believer. Some designs belong there and nowhere else. The scarcity is different — not twenty, but time-limited. Back it or don't. The window closes.",
      "I launched the original Okapi on Kickstarter in 2018. The design had been sitting with me for three years — refined, reconsidered, second-guessed. I finally took the leap of faith. And I needed to know: did strangers believe in the same thing I did? They did. That experience — watching people put real money behind a watch that didn't exist yet — changed how I think about who a Pedral is for.",
      "There's also a pricing reality I can't ignore, and I'd rather say it plainly than package it as something else. At €1,500 and up, Pedral editions are accessible — but not to everyone. I think about this more than people might expect. Some of the most genuine watch enthusiasm I've encountered comes from people for whom that price point is simply out of reach — not because they don't feel the design, not because they don't understand what they're looking at, but because life doesn't always align with want. That's not a failure of taste. That's just the world.",
      "A Kickstarter campaign lets me design toward a different price point without dismantling what makes a Pedral a Pedral. What changes is the economics — and with that, the freedom to explore. On Kickstarter I can offer something premium but accessible: non-Swiss movements paired with fumé dials, guilloché finishing, or materials I rarely get to work with at the standard edition price point. The craft is still there. The obsession over detail is still there. The watch just reaches someone who would otherwise never get the chance to own one.",
      "The clearest proof of this is Artefact. I launched it on Kickstarter and it became something people are still asking about today. A quintessential sports watch — versatile, considered, the kind of thing you reach for without thinking. A true GADA. It will never appear on pedral.eu. That's intentional. It belongs to a different chapter of the studio, one that lives outside the edition model entirely. But the people who found it still message me. That doesn't happen with forgettable work.",
      "The Boris Pjanić capsule collection proved something similar from a different angle. That collaboration drew collectors from across the world — people who had never heard of Pedral before but responded to the design on instinct. That's what good work does. It finds its people regardless of the channel it travels through.",
      "Good design shouldn't only exist for people who can pay a premium for scarcity. A watch that moves you doesn't become less considered because more people can hold it. That's not a compromise — that's the point.",
      "Twenty pieces is a promise I make when twenty is the honest answer. For the designs that are too alive to contain — I'd rather put them in more hands than let them sit in a drawer, waiting for a right moment that never comes.",
    ],
  },
  {
    slug: "why-twenty-pieces",
    date: "February 2026",
    category: "Philosophy",
    title: "Why Twenty Pieces? The Case for Radical Limitation",
    featuredImage: "/images/hero-lifestyle.jpg",
    excerpt:
      "In an industry obsessed with growth, I cap every edition at twenty. Not because I can't make more — but because limitation is the point.",
    readTime: "5 min read",
    body: [
      "The watch industry runs on scale. More units, more revenue, more brand awareness. It's a formula that works — until it doesn't. Until the thing you made becomes indistinguishable from everything else on the shelf.",
      "Every Pedral edition is capped at twenty pieces. Not because I can't produce more. Not because of some manufactured scarcity play. Twenty is the number where I can still personally inspect every watch. It's the number where each owner knows: there are only nineteen others.",
      "This isn't a business strategy. It's a design constraint. The same way a sonnet has fourteen lines — the limitation isn't a weakness. It's the structure that gives the work its shape.",
      "When a Pedral dial sells out, it doesn't come back. There's no second production run. No \"due to popular demand\" reissue. The people who own edition #7 of 20 know that the dial on their wrist exists in exactly that quantity. That knowledge changes how you wear it.",
      "I've had people email asking me to make more. I understand the frustration. But reopening an edition would betray the twenty people who already own it. Their watch would become something different — something less — the moment I printed dial twenty-one.",
      "Radical limitation means saying no to revenue. It means watching a waitlist grow and choosing not to fill it. It means every design decision carries weight, because you can't iterate your way out of a mistake across thousands of units.",
      "Twenty pieces. When they're gone, they're gone. That's the promise.",
    ],
  },
  {
    slug: "swiss-movement-independent-price",
    date: "January 2026",
    category: "Craft",
    title: "Swiss Movements at an Independent Price: How I Do It",
    excerpt:
      "Every Pedral watch runs on a Swiss movement — Sellita, ETA, or hand-wound calibres selected for each collection. But I don't charge what the big houses charge.",
    readTime: "7 min read",
    body: [
      "There's a persistent myth in watchmaking: Swiss movements require Swiss prices. That a Sellita SW200-1 inside a case somehow demands a four-figure premium just because the dial says something prestigious.",
      "Every Pedral watch runs on a Swiss movement. The Okapi uses an ETA 7001 hand-wound calibre. The Maestro houses a Sellita SW200-1 automatic. The Triomphe runs on a Swiss hand-wound movement selected specifically for its 8.8mm case height. These aren't compromises — they're deliberate choices.",
      "So how does a one-person operation in Stockholm offer Swiss-movement watches at prices that undercut established brands by 60–70%? The answer isn't a secret. It's just a different model.",
      "First: no middlemen. I design each watch, select components directly from suppliers, and work with a single trusted assembly partner. There's no sales team, no regional distributors, no retail partners taking their cut.",
      "Second: no retail markup. A watch that reaches you through a boutique has typically been marked up 2–3x from wholesale. I sell direct. The price you pay is the price of making the watch, plus a margin that keeps a one-person studio running.",
      "Third: no marketing department. The watches speak for themselves. Word of mouth, a small Instagram following, and the occasional feature in a watch publication. No Super Bowl ads. No Formula 1 sponsorships.",
      "The result: a Swiss-movement watch, designed in Stockholm, limited to twenty pieces, at a price that respects both the craft and the collector. Not magic. Just a different model.",
    ],
  },
  {
    slug: "triomphe-guilloche-dial",
    date: "December 2025",
    category: "Design",
    title: "The Triomphe Guilloché Dial: Anatomy of 8.8mm",
    excerpt:
      "At 8.8mm thin, the Triomphe is the thinnest watch I've ever made. Its rotating guilloché dial transforms a single canvas into twenty unique expressions.",
    readTime: "6 min read",
    body: [
      "Thin watches are a statement. They whisper instead of shout. They vanish beneath a cuff and reappear when you want them to. The Triomphe, at 8.8mm, is my most ambitious exploration of this idea.",
      "The challenge of building thin is that every fraction of a millimetre matters. The movement selection dictates the case height. The crystal profile adds thickness. Even the crown design affects how the watch sits on the wrist.",
      "For the Triomphe, I selected a Swiss hand-wound movement specifically for its low profile. Hand-wound movements are inherently thinner than automatics — they don't need the rotor mechanism that adds bulk. This choice wasn't just about dimensions. It was about ritual: the daily act of winding your watch, connecting with the mechanism.",
      "The guilloché dial is the Triomphe's signature. Each edition features a different pattern — Carreau Tissé, sauté piqué, Vagues de Lumière — applied in layers to the dial surface. The patterns catch light differently depending on the angle, making the watch appear to change throughout the day.",
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
      "In 2018, the Okapi launched on Kickstarter and sold out. It's coming back — with a new Swiss movement, a refined case, and the same stubborn spirit.",
    readTime: "8 min read",
    body: [
      "The Okapi was never supposed to be perfect. It was supposed to be real.",
      "In 2018, I launched my first watch on Kickstarter. I was twenty-two, self-taught, and working out of a small apartment in Stockholm. The Okapi was raw — ambitious in concept, honest in execution. It sold out. And then it was gone.",
      "I've spent a long time thinking about whether to bring it back. Not a reissue. Not nostalgia. A reimagining — what the Okapi would be if I built it today, with everything I've learned since.",
      "The new Okapi will run on an ETA 7001 hand-wound Swiss movement — a significant upgrade from the original. The case has been refined: same DNA, better proportions. The finishing is where eight years of obsessive learning shows most clearly.",
      "What won't change is the philosophy. Still limited to twenty pieces. Still carrying the name that started everything — a reference to the elusive, beautiful animal that few have seen in the wild.",
      "I talk about the original Okapi the way a musician talks about their first album: proud of its honesty, aware of its rough edges, grateful for what it taught. This version is what happens when that same person has spent nearly a decade refining their craft.",
      "The Okapi returns at €2,000. Twenty pieces. Register your interest now — when it drops, it won't be announced publicly until it's sold out.",
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
      "Pedral is a microbrand. One designer. Me. Stockholm. Twenty pieces per edition. That's the whole story. Whether that matters to you depends on what you're looking for in a watch.",
    ],
  },
  {
    slug: "maestro-boris-pjanic-collab",
    date: "April 2025",
    category: "Collaboration",
    title: "Watches and Art: Best of Both Worlds — The Boris Pjanić Capsule",
    excerpt:
      "When I met Boris Pjanić in Stockholm, we discovered a shared obsession: making things that reward attention.",
    readTime: "5 min read",
    body: [
      "The collaboration happened the way most good things happen — by accident.",
      "I met Boris through a mutual friend in Stockholm. Boris, a contemporary artist known for work that blends geometric precision with organic forms, had never thought about watches. I had never collaborated with another artist. We had coffee. Then dinner. Then a six-month conversation about what happens when horology meets contemporary art.",
      "The result was 'Watches and Art: Best of Both Worlds' — a capsule collection built around the Maestro platform. Boris contributed dial designs that reimagined his gallery work at 40mm scale. I handled the technical execution, translating brushstrokes and textures into printable dial art.",
      "The capsule sold out on release. Not because of hype — because the watches were genuinely different from anything either of us had made alone.",
      "What made the collaboration work was a shared belief: that the things worth making are the things that reward close attention. A Boris Pjanić painting reveals new details the longer you look. A Pedral watch does the same. Combining them wasn't a stretch — it was inevitable.",
      "The capsule was limited, of course. Twenty pieces. They're gone now. But my relationship with the art world isn't. More collaborations are coming. Different artists, different approaches, same conviction: the best of both worlds.",
    ],
  },
  {
    slug: "designing-in-stockholm",
    date: "March 2025",
    category: "Studio",
    title: "Designing Watches in Stockholm: Light, Silence, and Obsession",
    excerpt:
      "Stockholm's long winters and endless summer light shape everything I design. The city's design tradition runs through every Pedral watch.",
    readTime: "4 min read",
    body: [
      "Stockholm is not a watchmaking city. Switzerland has the Vallée de Joux. Germany has Glashütte. Japan has the Seiko campus in Shiojiri. Stockholm has IKEA, H&M, and a design tradition built on functionalism, restraint, and quiet confidence.",
      "That tradition runs through every watch I make, whether I intend it or not. The clean lines. The deliberate negative space. The refusal to add elements that don't serve a purpose. These aren't always conscious design choices — they're the result of growing up in a city where less has always been more.",
      "I work from a small studio in Södermalm. The space is spare: a desk, a loupe, reference watches, and shelves of prototypes that didn't make the cut. Natural light is everything — Stockholm's long summer days and dark winters both shape my design process.",
      "In summer, the light is endless. The city doesn't sleep. My designs tend toward brightness, openness, optimism. In winter, the opposite: the studio is lit by desk lamps at 3pm, and the work turns inward. Darker dials. More texture. More attention to how a watch face catches limited light.",
      "There's something about designing watches in a city that isn't known for them. No tradition to lean on. No established way of doing things. Just me, a studio, and the stubborn belief that Stockholm has something to add to the conversation.",
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
      "The Triomphe is built around two ideas: thinness and ritual. At 8.8mm, I needed every fraction of a millimetre. An automatic movement's rotor adds roughly 2–3mm to a movement's height. Remove the rotor, and you get a hand-wound movement that can sit in a dramatically thinner case.",
      "But the choice wasn't purely dimensional. A hand-wound watch asks something of its wearer. Every morning — or every couple of days — you pick up the watch, turn the crown, and feel the mainspring tighten. It's a small act. A few seconds. But it creates a connection between you and the mechanism that an automatic never quite achieves.",
      "There's a philosophical dimension too. An automatic watch runs itself. A hand-wound watch runs because you decided it should. It's a small distinction with a big implication: this watch exists because you choose to engage with it. When you stop winding, it stops ticking.",
      "I chose hand-wound for the Triomphe because the watch is about intention. Intentionally thin. Intentionally limited. Intentionally demanding of the person who wears it. Not in a burdensome way — in a rewarding one.",
      "The crown on the Triomphe is designed for this ritual. Slightly larger than typical for a dress watch, with just enough grip texture to make the winding action satisfying. Twenty turns. Two days of power reserve. A small daily ceremony that connects you to what's on your wrist.",
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

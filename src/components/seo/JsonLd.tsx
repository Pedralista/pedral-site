export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pedral Watches",
    url: "https://www.pedral.eu",
    logo: "https://www.pedral.eu/images/hero-lifestyle.jpg",
    description:
      "Stockholm-based watch microbrand blending retro-futurism with Scandinavian design. Limited editions, unlimited conviction.",
    foundingDate: "2015",
    founder: {
      "@type": "Person",
      name: "Kevin Pedral",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Stockholm",
      addressCountry: "SE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@pedral.watch",
      contactType: "customer service",
    },
    sameAs: [
      "https://www.instagram.com/pedralwatches",
      "https://facebook.com/pedralwatches",
      "https://youtube.com/@pedralwatches",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ProductJsonLdProps {
  name: string;
  description: string;
  image: string;
  slug: string;
  year: number;
  price: number;
  stock: number;
  testimonials?: { quote: string; name: string }[];
}

export function ProductJsonLd({ name, description, image, slug, year, price, stock, testimonials }: ProductJsonLdProps) {
  const availability =
    stock === 0
      ? "https://schema.org/OutOfStock"
      : stock <= 5
      ? "https://schema.org/LimitedAvailability"
      : "https://schema.org/InStock";

  const reviews = testimonials && testimonials.length > 0
    ? testimonials.map((t) => ({
        "@type": "Review",
        reviewBody: t.quote,
        author: { "@type": "Person", name: t.name },
        reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
      }))
    : undefined;

  const aggregateRating = testimonials && testimonials.length > 0
    ? {
        "@type": "AggregateRating",
        ratingValue: 5,
        reviewCount: testimonials.length,
        bestRating: 5,
      }
    : undefined;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Pedral ${name}`,
    description,
    image: `https://www.pedral.eu${image}`,
    url: `https://www.pedral.eu/collections/${slug}`,
    brand: {
      "@type": "Brand",
      name: "Pedral",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Pedral Watches",
    },
    releaseDate: `${year}-01-01`,
    offers: {
      "@type": "Offer",
      url: `https://www.pedral.eu/collections/${slug}`,
      availability,
      priceCurrency: "EUR",
      price: price.toFixed(2),
      priceValidUntil: `${year + 2}-12-31`,
    },
  };

  if (reviews) schema.review = reviews;
  if (aggregateRating) schema.aggregateRating = aggregateRating;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  date: string;
}

export function ArticleJsonLd({ title, description, slug, date }: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `https://www.pedral.eu/journal/${slug}`,
    datePublished: date,
    author: {
      "@type": "Person",
      name: "Kevin Pedral",
    },
    publisher: {
      "@type": "Organization",
      name: "Pedral Watches",
      url: "https://www.pedral.eu",
    },
    isPartOf: {
      "@type": "Blog",
      name: "The Rounded Square",
      url: "https://www.pedral.eu/journal",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://www.pedral.eu${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

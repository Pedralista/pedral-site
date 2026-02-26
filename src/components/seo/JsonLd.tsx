export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pedral Watches",
    url: "https://pedral.watch",
    logo: "https://pedral.watch/og-image.jpg",
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
}

export function ProductJsonLd({ name, description, image, slug, year }: ProductJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Pedral ${name}`,
    description,
    image: `https://pedral.watch${image}`,
    url: `https://pedral.watch/collections/${slug}`,
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
      url: "https://shop.pedral.eu",
      availability: "https://schema.org/LimitedAvailability",
      priceCurrency: "EUR",
    },
  };

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
    url: `https://pedral.watch/journal/${slug}`,
    datePublished: date,
    author: {
      "@type": "Person",
      name: "Kevin Pedral",
    },
    publisher: {
      "@type": "Organization",
      name: "Pedral Watches",
      url: "https://pedral.watch",
    },
    isPartOf: {
      "@type": "Blog",
      name: "The Rounded Square",
      url: "https://pedral.watch/journal",
    },
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
      item: `https://pedral.watch${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

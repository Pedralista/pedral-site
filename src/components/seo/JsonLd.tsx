export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pedral Watches",
    url: "https://pedral.eu",
    logo: "https://pedral.eu/og-image.jpg",
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
      email: "info@pedral.eu",
      contactType: "customer service",
    },
    sameAs: [
      "https://instagram.com/pedralwatches",
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
    image: `https://pedral.eu${image}`,
    url: `https://pedral.eu/collections/${slug}`,
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

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://pedral.eu${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

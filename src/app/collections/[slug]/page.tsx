import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, getCollection, isHidden } from "@/lib/collections";
import CollectionDetail from "@/components/pages/CollectionDetail";
import { ProductJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return collections.filter((c) => !isHidden(c)).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Not Found" };
  const metaTitle = collection.metaTitle ?? `${collection.name} — Pedral`;
  const metaDescription = collection.metaDescription ?? collection.description;
  return {
    title: collection.metaTitle ?? collection.name,
    description: metaDescription,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `/collections/${collection.slug}`,
      images: [{ url: collection.image, width: 1200, height: 630, alt: `Pedral ${collection.name} watch` }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [collection.image],
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection || isHidden(collection)) notFound();
  return (
    <>
      <ProductJsonLd
        name={collection.name}
        description={collection.description}
        image={collection.image}
        slug={collection.slug}
        year={collection.year}
        price={collection.price}
        stock={collection.stock}
        testimonials={collection.testimonials}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Collections", url: "/collections" },
          { name: collection.name, url: `/collections/${collection.slug}` },
        ]}
      />
      <FaqJsonLd items={[
        { q: "I've never heard of Pedral before.", a: "Kevin has been designing watches in Stockholm since 2015. Over 400 pieces delivered to collectors in 30+ countries. Reviewed by independent watch media and recommended by collectors who own dozens of other watches." },
        { q: "What if it doesn't work on my wrist?", a: "Every piece ships with a 14-day return window after delivery. Case dimensions are listed in full. If you have doubts about sizing, write to Kevin directly — he responds personally." },
        { q: "What about production delays?", a: "Timeline updates are sent directly from Kevin throughout production — not automated emails. If something changes, you hear it from the person responsible." },
        { q: "I can't see it in person before buying.", a: "Most owners say the watch is better in person than in photos. High-resolution images and full specifications are available for every edition. The 14-day return policy exists precisely for this reason." },
      ]} />
      <CollectionDetail collection={collection} />
    </>
  );
}

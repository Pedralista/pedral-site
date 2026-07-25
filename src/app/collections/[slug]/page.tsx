import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, getCollection, isHidden } from "@/lib/collections";
import CollectionDetail from "@/components/pages/CollectionDetail";
import { ProductJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import ViewItemTracker from "@/components/analytics/ViewItemTracker";
import { getLiveStock, slugifyPart } from "@/lib/stock";

// Live stock changes when an order completes — revalidate this page
// periodically instead of serving the build-time snapshot forever.
export const revalidate = 30;

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
  const canonical = `/collections/${collection.slug}`;
  return {
    title: { absolute: metaTitle },
    description: metaDescription,
    alternates: {
      canonical,
      languages: { en: canonical, "x-default": canonical },
    },
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
  const staticCollection = getCollection(slug);
  if (!staticCollection || isHidden(staticCollection)) notFound();

  // Overlay live stock (from Redis, seeded from the static numbers) so every
  // sold-out check, disabled button, and JSON-LD availability signal reflects
  // real remaining inventory instead of the build-time snapshot.
  const liveBase = await getLiveStock(staticCollection.slug, "base", staticCollection.stock);
  const liveVariants = staticCollection.variants
    ? await Promise.all(
        staticCollection.variants.map(async (v) => {
          const liveVariantStock = await getLiveStock(staticCollection.slug, slugifyPart(v.name), v.stock);
          let liveNumeralStock = v.numeralStock;
          if (v.numeralStock) {
            const entries = await Promise.all(
              Object.entries(v.numeralStock).map(async ([dial, fallback]) => [
                dial,
                await getLiveStock(staticCollection.slug, `${slugifyPart(v.name)}-${slugifyPart(dial)}`, fallback),
              ] as const)
            );
            liveNumeralStock = Object.fromEntries(entries);
          }
          return { ...v, stock: liveVariantStock, numeralStock: liveNumeralStock };
        })
      )
    : undefined;
  const collection = { ...staticCollection, stock: liveBase, variants: liveVariants };

  return (
    <>
      {/* Open Graph Product tags — read by Instagram's "Link a product" (paste
          a URL, no separate catalog needed) and similar tools. Must use
          `property=`, not `name=` — Next's metadata `other` field only emits
          `name=`, which OG parsers ignore, so these are rendered directly.
          Omitted for enquiry-only/no-fixed-price products. Note: exposes only
          the base/entry price for multi-variant products (e.g. Contour's
          cheaper Quartz option) — a real limitation of this lightweight
          tagging flow, not something a single meta tag can fix. */}
      {!collection.isEnquiryOnly && (
        <>
          <meta property="product:price:amount" content={String(collection.price)} />
          <meta property="product:price:currency" content="EUR" />
          <meta property="product:availability" content={collection.stock > 0 ? "in stock" : "out of stock"} />
        </>
      )}
      <ProductJsonLd
        name={collection.name}
        description={collection.description}
        image={collection.image}
        slug={collection.slug}
        year={collection.year}
        price={collection.price}
        stock={collection.stock}
        testimonials={collection.testimonials}
        isEnquiryOnly={collection.isEnquiryOnly}
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
      {/* Fires GA4 view_item + Pixel ViewContent without touching CollectionDetail. */}
      <ViewItemTracker
        item={{
          item_id: collection.slug,
          item_name: collection.name,
          price: collection.price,
          quantity: 1,
        }}
        value={collection.price}
      />
    </>
  );
}

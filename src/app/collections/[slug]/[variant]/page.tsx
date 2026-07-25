import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, getCollection, isHidden } from "@/lib/collections";
import CollectionDetail from "@/components/pages/CollectionDetail";
import { ProductJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import ViewItemTracker from "@/components/analytics/ViewItemTracker";
import { getLiveStock, slugifyPart } from "@/lib/stock";

// Same rationale as the parent product page: live stock changes on order
// completion, so this can't be served as a permanent build-time snapshot.
export const revalidate = 30;

// This route exists so a single watch variant can have a URL that is
// genuinely, unambiguously about ONE product — no query string, no shared
// canonical. It's needed for Instagram/Meta's "Add product" link feature:
// pasting the base /collections/[slug] URL (which legitimately shows every
// variant to real shoppers) gets flagged as "more than one product," and a
// ?variant= query param doesn't fix that because this site's own canonical
// tag on the base page points crawlers straight back to the shared URL —
// so any per-variant metadata on a query-string URL was invisible to a
// crawler that respects canonicals. A distinct path can carry its own,
// self-referencing canonical instead.
export function generateStaticParams() {
  return collections
    .filter((c) => !isHidden(c) && c.variants && c.variants.length > 0)
    .flatMap((c) =>
      (c.variants ?? []).map((v) => ({
        slug: c.slug,
        variant: v.name.toLowerCase().replace(/\s+/g, "-"),
      }))
    );
}

function findVariant(slug: string, variantSlug: string) {
  const collection = getCollection(slug);
  if (!collection) return null;
  const variant = collection.variants?.find(
    (v) => v.name.toLowerCase().replace(/\s+/g, "-") === variantSlug
  );
  if (!variant) return null;
  return { collection, variant };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; variant: string }>;
}): Promise<Metadata> {
  const { slug, variant: variantSlug } = await params;
  const match = findVariant(slug, variantSlug);
  if (!match) return { title: "Not Found" };
  const { collection, variant } = match;
  const metaTitle = `${collection.name} — ${variant.name} — Pedral`;
  const metaDescription = variant.description ?? collection.metaDescription ?? collection.description;
  const canonical = `/collections/${collection.slug}/${variantSlug}`;
  const ogImage = variant.image || collection.image;
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
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `Pedral ${collection.name} — ${variant.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
}

export default async function CollectionVariantPage({
  params,
}: {
  params: Promise<{ slug: string; variant: string }>;
}) {
  const { slug, variant: variantSlug } = await params;
  const staticMatch = findVariant(slug, variantSlug);
  if (!staticMatch || isHidden(staticMatch.collection)) notFound();
  const { collection: staticCollection } = staticMatch;

  // Same live-stock overlay as the parent product page.
  const liveBase = await getLiveStock(staticCollection.slug, "base", staticCollection.stock);
  const liveVariants = await Promise.all(
    (staticCollection.variants ?? []).map(async (v) => {
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
  );
  const collection = { ...staticCollection, stock: liveBase, variants: liveVariants };
  const variant = collection.variants!.find(
    (v) => v.name.toLowerCase().replace(/\s+/g, "-") === variantSlug
  )!;

  return (
    <>
      {!collection.isEnquiryOnly && (
        <>
          <meta property="product:price:amount" content={String(variant.price ?? collection.price)} />
          <meta property="product:price:currency" content="EUR" />
          <meta property="product:availability" content={variant.stock > 0 ? "in stock" : "out of stock"} />
        </>
      )}
      <ProductJsonLd
        name={`${collection.name} — ${variant.name}`}
        description={variant.description ?? collection.description}
        image={variant.image || collection.image}
        slug={collection.slug}
        year={collection.year}
        price={variant.price ?? collection.price}
        stock={variant.stock}
        testimonials={collection.testimonials}
        isEnquiryOnly={collection.isEnquiryOnly}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Collections", url: "/collections" },
          { name: collection.name, url: `/collections/${collection.slug}` },
          { name: variant.name, url: `/collections/${collection.slug}/${variantSlug}` },
        ]}
      />
      <FaqJsonLd items={[
        { q: "I've never heard of Pedral before.", a: "Kevin has been designing watches in Stockholm since 2015. Over 400 pieces delivered to collectors in 30+ countries. Reviewed by independent watch media and recommended by collectors who own dozens of other watches." },
        { q: "What if it doesn't work on my wrist?", a: "Every piece ships with a 14-day return window after delivery. Case dimensions are listed in full. If you have doubts about sizing, write to Kevin directly — he responds personally." },
        { q: "What about production delays?", a: "Timeline updates are sent directly from Kevin throughout production — not automated emails. If something changes, you hear it from the person responsible." },
        { q: "I can't see it in person before buying.", a: "Most owners say the watch is better in person than in photos. High-resolution images and full specifications are available for every edition. The 14-day return policy exists precisely for this reason." },
      ]} />
      <CollectionDetail collection={collection} initialVariantSlug={variantSlug} />
      <ViewItemTracker
        item={{
          item_id: `${collection.slug}-${variantSlug}`,
          item_name: `${collection.name} — ${variant.name}`,
          price: variant.price ?? collection.price,
          quantity: 1,
        }}
        value={variant.price ?? collection.price}
      />
    </>
  );
}

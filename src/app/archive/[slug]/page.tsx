import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { archivedWatches } from "@/lib/archive";
import ArchiveDetailContent from "@/components/pages/ArchiveDetailContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

function getArchivedWatch(slug: string) {
  return archivedWatches.find((w) => w.slug === slug);
}

export function generateStaticParams() {
  return archivedWatches.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const watch = getArchivedWatch(slug);
  if (!watch) return { title: "Not Found" };

  // Root layout template "%s — Pedral" appends the brand once — do not suffix it here.
  const title = `${watch.name} — Sold Out Archive`;
  const description = `Pedral ${watch.name} (${watch.year}) — ${watch.hook} A sold-out edition of ${watch.editionSize}, closed in ${watch.soldYear}. It won't return.`;
  const image = watch.images[0] ?? "/images/okapi-classique.png";

  return {
    title,
    description,
    alternates: { canonical: `/archive/${watch.slug}` },
    openGraph: {
      title,
      description,
      url: `/archive/${watch.slug}`,
      images: [{ url: image, width: 1200, height: 630, alt: `Pedral ${watch.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArchiveDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const watch = getArchivedWatch(slug);
  if (!watch) notFound();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Archive", url: "/archive" },
          { name: watch.name, url: `/archive/${watch.slug}` },
        ]}
      />
      <ArchiveDetailContent watch={watch} />
    </>
  );
}

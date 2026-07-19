import type { MetadataRoute } from "next";
import { collections, isHidden } from "@/lib/collections";
import { articles } from "@/lib/journal";
import { archivedWatches } from "@/lib/archive";

const siteUrl = "https://www.pedral.eu";

// Manually-maintained "last content update" date for pages and products that
// have no per-item timestamp of their own. Bump this BY HAND when static page
// copy or product content meaningfully changes. We deliberately avoid calling
// new Date() at build/request time — that stamps every URL with an identical
// "now" on every deploy, which search engines treat as a red flag.
const SITE_CONTENT_UPDATED = "2026-07-19";

// Journal article dates are stored as human strings ("April 2026"). Convert to
// an ISO date (YYYY-MM-DD) for lastModified; fall back to the site date if the
// string can't be parsed.
function articleLastModified(date: string): string {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime())
    ? SITE_CONTENT_UPDATED
    : parsed.toISOString().split("T")[0];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const collectionRoutes = collections.filter((c) => !isHidden(c)).map((c) => ({
    url: `${siteUrl}/collections/${c.slug}`,
    // No per-product "updated" field exists — use the manually-maintained date.
    lastModified: SITE_CONTENT_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const archiveRoutes = archivedWatches.map((w) => ({
    url: `${siteUrl}/archive/${w.slug}`,
    // Sold-out editions last changed the year they closed.
    lastModified: `${w.soldYear}-01-01`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${siteUrl}/journal/${a.slug}`,
    // Real per-article publish date.
    lastModified: articleLastModified(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/collections`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...collectionRoutes,
    {
      url: `${siteUrl}/bespoke-pieces`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/archive`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...archiveRoutes,
    {
      url: `${siteUrl}/story`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/journal`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articleRoutes,
    {
      // Manually-included static HTML page (public/artefact-final-frontier).
      url: `${siteUrl}/artefact-final-frontier`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/shipping`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/returns`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/warranty`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/cookies`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteUrl}/withdrawal`,
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

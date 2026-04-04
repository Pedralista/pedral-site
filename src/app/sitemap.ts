import type { MetadataRoute } from "next";
import { collections } from "@/lib/collections";
import { articles } from "@/lib/journal";
import { archivedWatches } from "@/lib/archive";

const siteUrl = "https://pedral.eu";

export default function sitemap(): MetadataRoute.Sitemap {
  const collectionRoutes = collections.map((c) => ({
    url: `${siteUrl}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const archiveRoutes = archivedWatches.map((w) => ({
    url: `${siteUrl}/archive#${w.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${siteUrl}/journal/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...collectionRoutes,
    {
      url: `${siteUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...archiveRoutes,
    {
      url: `${siteUrl}/story`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articleRoutes,
    {
      url: `${siteUrl}/artefact-final-frontier`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/shipping`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteUrl}/withdrawal`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

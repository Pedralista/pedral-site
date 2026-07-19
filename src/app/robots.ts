import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout", "/account", "/order/"],
    },
    sitemap: "https://www.pedral.eu/sitemap.xml",
  };
}

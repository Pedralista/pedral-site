import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import CookieBanner from "@/components/layout/CookieBanner";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import MetaPixel from "@/components/analytics/MetaPixel";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://www.pedral.eu";
const siteDescription =
  "Stockholm-based watch microbrand blending retro-futurism with Scandinavian design. Limited editions, unlimited conviction.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pedral — Not For Everyone",
    template: "%s — Pedral",
  },
  description: siteDescription,
  keywords: [
    "Pedral",
    "watches",
    "microbrand",
    "Stockholm",
    "Swedish design",
    "luxury watches",
    "limited edition watches",
    "Scandinavian watches",
    "retro-futurism",
  ],
  authors: [{ name: "Pedral Watches" }],
  creator: "Pedral Watches",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Pedral Watches",
    title: "Pedral — Not For Everyone",
    description: siteDescription,
    images: [
      {
        url: "/images/hero-lifestyle.jpg",
        width: 1200,
        height: 630,
        alt: "Pedral Watches — Not For Everyone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedral — Not For Everyone",
    description: siteDescription,
    images: ["/images/hero-lifestyle.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "mfStinMfbViK6AVnBbU3LeT2MMQq1vBynAtB1lt0AVc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${outfit.variable} antialiased`}>
        <OrganizationJsonLd />
        <ClientLayout>{children}</ClientLayout>
        <CookieBanner />
        <MetaPixel />
      </body>
    </html>
  );
}

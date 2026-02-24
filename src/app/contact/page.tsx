import type { Metadata } from "next";
import ContactContent from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Pedral Watches. Based in Stockholm, Sweden. Inquiries, collaborations, and press.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Pedral",
    description: "Get in touch with Pedral Watches. Based in Stockholm, Sweden.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}

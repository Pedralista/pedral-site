import type { Metadata } from "next";
import AccountContent from "@/components/pages/AccountContent";

export const metadata: Metadata = {
  title: "My Account — Pedral",
  description: "View your Pedral orders, invoices and shipping details.",
};

export default function AccountPage() {
  return <AccountContent />;
}

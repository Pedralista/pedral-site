import type { Metadata } from "next";
import StockholmPayContent from "@/components/pages/StockholmPayContent";

export const metadata: Metadata = {
  title: "Betala — Stockholm Time 2026",
  robots: { index: false, follow: false },
};

export default function StockholmPaySvPage() {
  return <StockholmPayContent locale="sv" />;
}

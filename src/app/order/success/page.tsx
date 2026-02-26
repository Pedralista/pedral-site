import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed — Pedral",
  description: "Your Pedral allocation is secured.",
  robots: { index: false, follow: false },
};

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const isPreOrder = params.type === "preorder";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="mb-4 text-[11px] font-normal tracking-[4px] uppercase text-accent">
        {isPreOrder ? "Reservation Confirmed" : "Order Confirmed"}
      </p>
      <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-light text-foreground">
        {isPreOrder ? "Your place is secured." : "Your piece is reserved."}
      </h1>
      <div className="mx-auto mt-6 h-px w-[60px] bg-accent" />
      <p className="mt-6 max-w-[520px] text-[15px] font-light leading-[1.85] text-foreground-muted">
        {isPreOrder
          ? "Your deposit has been received. You're in the production queue for the Okapi Classique. Kevin will be in touch personally before the remaining balance is due — ahead of your piece being built."
          : "A confirmation has been sent to your email. Kevin will personally confirm your allocation within 24 hours. Every Pedral is built to order — thank you for your patience."}
      </p>
      <Link
        href="/collections"
        className="mt-10 inline-block rounded-[2px] border border-accent/30 px-8 py-3 text-[11px] font-normal tracking-[2.5px] uppercase text-accent transition-colors hover:bg-accent hover:text-background"
      >
        Back to Collections
      </Link>
    </main>
  );
}

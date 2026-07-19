import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import PurchaseTracker from "@/components/analytics/PurchaseTracker";
import type { AnalyticsItem } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your Pedral allocation is secured.",
  robots: { index: false, follow: false },
};

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; session_id?: string }>;
}) {
  const params = await searchParams;
  const isPreOrder = params.type === "preorder";
  const sessionId = params.session_id;

  // Retrieve the completed session server-side so the client tracker fires
  // purchase with the real amount/currency/items. Any failure (missing session,
  // Stripe unset) simply skips client tracking — the page still renders.
  let purchase: { value: number; currency: string; items: AnalyticsItem[] } | null = null;
  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2026-01-28.clover",
      });
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid" || session.status === "complete") {
        const value = (session.amount_total ?? 0) / 100;
        const currency = (session.currency ?? "eur").toUpperCase();
        const productName =
          session.metadata?.product ?? session.metadata?.collection ?? "Pedral";
        const itemId = session.metadata?.product ?? session.metadata?.collection ?? "pedral";
        purchase = {
          value,
          currency,
          items: [
            {
              item_id: itemId,
              item_name: productName,
              price: value,
              quantity: 1,
              item_variant: session.metadata?.variant || undefined,
            },
          ],
        };
      }
    } catch {
      // Retrieval failed — skip client purchase tracking, keep the page working.
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      {sessionId && purchase && (
        <PurchaseTracker
          sessionId={sessionId}
          value={purchase.value}
          currency={purchase.currency}
          items={purchase.items}
        />
      )}
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
        className="mt-10 inline-block rounded-lg border border-accent/30 px-8 py-3 text-[11px] font-normal tracking-[2.5px] uppercase text-accent transition-colors hover:bg-accent hover:text-background"
      >
        Back to Collections
      </Link>
      {purchase?.items[0]?.item_name && (
        <div className="mt-16 max-w-[440px] border-t border-accent/[0.08] pt-8">
          <p className="text-[13px] font-light leading-[1.8] text-foreground-muted/70">
            Your {purchase.items[0].item_name} is one of twenty. The next step is one of one.
          </p>
          <Link
            href="/bespoke-pieces"
            className="mt-3 inline-block text-[11px] font-normal tracking-[1px] text-accent underline underline-offset-2 hover:text-accent-hover"
          >
            Explore bespoke commissions →
          </Link>
        </div>
      )}
    </main>
  );
}

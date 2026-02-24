import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { collections } from "@/lib/collections";
import CheckoutForm from "@/components/pages/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — Pedral",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string; variant?: string }>;
}) {
  const { slug, variant: variantName } = await searchParams;

  const collection = collections.find((c) => c.slug === slug);
  if (!collection || !collection.variants) notFound();

  const variant = collection.variants.find((v) => v.name === variantName);
  if (!variant) notFound();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-accent/[0.06] px-6 py-5 md:px-12">
        <div className="mx-auto flex max-w-[900px] items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Pedral"
              width={420}
              height={56}
              className="h-[20px] w-auto invert"
            />
          </Link>
          <span className="text-[11px] tracking-[2px] uppercase text-foreground-muted/50">
            Secure Checkout
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[900px] px-6 py-12 md:px-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">

          {/* Order Summary */}
          <div>
            <p className="mb-4 text-[11px] tracking-[3px] uppercase text-accent">
              Your Order
            </p>
            <div className="rounded-[2px] border border-accent/10 bg-background-alt p-6">
              <p className="font-serif text-[22px] font-light text-foreground">
                {collection.name}
              </p>
              <p className="mt-1 text-[13px] font-light text-foreground-muted">
                {variant.name}
              </p>
              <div className="my-5 h-px bg-accent/10" />
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] tracking-[1px] uppercase text-foreground-muted">
                  Total
                </span>
                <span className="font-serif text-[28px] font-light text-foreground">
                  €{collection.price.toLocaleString()}
                </span>
              </div>
              <div className="my-5 h-px bg-accent/10" />
              <ul className="space-y-2">
                {collection.boxContents.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] font-light text-foreground-muted"
                  >
                    <span className="mt-0.5 text-[9px] text-accent">&#10022;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-y-3">
              {[
                "Ships in 4–6 weeks",
                "Insured worldwide shipping",
                "14-day return policy",
                "12-month warranty",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-[12px] font-light text-foreground-muted">
                  <span className="font-semibold text-accent">&#10003;</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <p className="mb-4 text-[11px] tracking-[3px] uppercase text-accent">
              Payment
            </p>
            <CheckoutForm collection={collection} variant={variant} />
          </div>
        </div>
      </div>
    </main>
  );
}

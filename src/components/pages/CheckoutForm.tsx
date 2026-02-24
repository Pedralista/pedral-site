"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { Collection, CollectionVariant } from "@/lib/collections";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PaymentForm({
  collection,
  variant,
  email,
  setEmail,
  clientSecret,
}: {
  collection: Collection;
  variant: CollectionVariant;
  email: string;
  setEmail: (e: string) => void;
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${origin}/order/success`,
        receipt_email: email,
      },
    });

    if (stripeError) {
      setError(stripeError.message ?? "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-[11px] tracking-[2px] uppercase text-accent">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full rounded-[2px] border border-accent/20 bg-background px-4 py-3 text-[14px] font-light text-foreground placeholder:text-foreground-muted/40 focus:border-accent focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] tracking-[2px] uppercase text-accent">
          Payment Details
        </label>
        <div className="rounded-[2px] border border-accent/20 bg-background px-4 py-3">
          <PaymentElement
            options={{
              layout: "tabs",
              fields: { billingDetails: { address: "auto" } },
            }}
          />
        </div>
      </div>

      {error && (
        <p className="text-[13px] font-light text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full rounded-[2px] bg-accent py-4 text-[12px] font-medium tracking-[3px] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {loading ? "Processing…" : `Confirm — €${collection.price.toLocaleString()}`}
      </button>

      <p className="text-center text-[11px] font-light tracking-[0.5px] text-foreground-muted/60">
        Secured by Stripe · 14-day return · 12-month warranty
      </p>
    </form>
  );
}

export default function CheckoutForm({
  collection,
  variant,
}: {
  collection: Collection;
  variant: CollectionVariant;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    setClientSecret(null);
    setInitError(null);
    fetch("/api/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: collection.slug,
        variantName: variant.name,
        email: email || undefined,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.clientSecret) {
          setClientSecret(d.clientSecret);
        } else {
          setInitError(d.error ?? "Could not initialise payment. Please try again.");
        }
      })
      .catch(() => setInitError("Network error. Please check your connection."));
  }, [collection.slug, variant.name]);

  if (initError) {
    return (
      <div className="py-10 text-center">
        <p className="text-[13px] font-light text-red-400">{initError}</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-16">
        <span className="text-[12px] tracking-[2px] uppercase text-accent/50">
          Loading…
        </span>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#c9a84c",
            colorBackground: "#050a0c",
            colorText: "#f5f0e8",
            colorTextSecondary: "#9a8e7a",
            borderRadius: "2px",
            fontFamily: "inherit",
          },
        },
      }}
    >
      <PaymentForm
        collection={collection}
        variant={variant}
        email={email}
        setEmail={setEmail}
        clientSecret={clientSecret}
      />
    </Elements>
  );
}

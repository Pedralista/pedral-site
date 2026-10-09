"use client";

import { useState } from "react";

const ITEMS = {
  artefact: { label: "Artefact", amountSek: 5500 },
  okapiQuartz: { label: "Okapi — Quartz", amountSek: 2500 },
} as const;

// Both together is a flat discounted bundle, not the sum of the two.
const BUNDLE_AMOUNT_SEK = 7000;

type ItemKey = keyof typeof ITEMS;

export default function StockholmPayContent() {
  const [selected, setSelected] = useState<Set<ItemKey>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total =
    selected.size === 2
      ? BUNDLE_AMOUNT_SEK
      : [...selected].reduce((sum, key) => sum + ITEMS[key].amountSek, 0);

  function toggle(key: ItemKey) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  async function handlePay() {
    if (selected.size === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout-stockholm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [...selected] }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.url;
    } catch {
      setError("Something went wrong — try again, or take payment another way.");
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-20">
      <div className="w-full max-w-[420px]">
        <p className="mb-1 text-center text-[11px] font-normal tracking-[3px] uppercase text-accent/70">
          Pedral · Stockholm Time 2026
        </p>
        <h1 className="text-center font-serif text-[28px] font-light text-foreground">
          Pay at the Table
        </h1>

        <div className="mt-8 flex flex-col gap-3">
          {(Object.keys(ITEMS) as ItemKey[]).map((key) => {
            const item = ITEMS[key];
            const checked = selected.has(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggle(key)}
                className={`flex items-center justify-between rounded-lg border px-5 py-4 text-left transition-colors ${
                  checked ? "border-accent bg-accent/10" : "border-accent/20 bg-background-alt hover:border-accent/40"
                }`}
              >
                <span className="text-[16px] font-light text-foreground">{item.label}</span>
                <span className="text-[15px] font-light text-foreground-muted">
                  {item.amountSek.toLocaleString()} SEK
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-accent/15 pt-5">
          <span className="text-[13px] font-light uppercase tracking-[1px] text-foreground-muted/70">Total</span>
          <span className="font-serif text-2xl font-light text-foreground">
            {total.toLocaleString()} SEK
          </span>
        </div>

        <button
          type="button"
          onClick={handlePay}
          disabled={selected.size === 0 || loading}
          className="mt-6 w-full rounded-lg bg-accent px-8 py-4 text-center text-[11px] font-medium tracking-[2.5px] uppercase text-background transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Redirecting…" : "Pay Now"}
        </button>

        {error && <p className="mt-4 text-center text-[13px] font-light text-accent-secondary">{error}</p>}

        <p className="mt-6 text-center text-[13px] font-light leading-[1.7] text-foreground-muted/60">
          Swish payment via Stripe. Confirm the watch is in hand before paying.
        </p>
      </div>
    </section>
  );
}

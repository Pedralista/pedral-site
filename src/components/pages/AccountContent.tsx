"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AccountContent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/customer-portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    window.location.href = data.url;
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
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
          <Link
            href="/collections"
            className="text-[11px] tracking-[2px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Collections
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-[420px]">
          <p className="mb-4 text-[11px] tracking-[4px] uppercase text-accent">
            My Account
          </p>
          <h1 className="font-serif text-[clamp(28px,4vw,40px)] font-light text-foreground">
            View your orders.
          </h1>
          <div className="mt-5 h-px w-[60px] bg-accent" />
          <p className="mt-5 text-[14px] font-light leading-[1.8] text-foreground-muted">
            Enter the email address you used when placing your order. We&apos;ll open your personal portal where you can view orders, download invoices and track shipments.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-[11px] tracking-[2px] uppercase text-accent">
                Email Address
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

            {error && (
              <p className="text-[13px] font-light text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[2px] bg-accent py-4 text-[11px] font-medium tracking-[3px] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {loading ? "Opening portal…" : "Access My Account →"}
            </button>
          </form>

          <p className="mt-6 text-center text-[12px] font-light text-foreground-muted/60">
            No account? Your profile is created automatically when you place an order.
          </p>
        </div>
      </div>
    </main>
  );
}

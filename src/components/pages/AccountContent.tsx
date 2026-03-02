"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Subscriber = {
  status: string;
  since: string | null;
  firstName: string | null;
};

type PortalData = {
  isCustomer: boolean;
  stripePortalUrl: string | null;
  isSubscriber: boolean;
  subscriber: Subscriber | null;
};

type View = "form" | "portal" | "unsubscribed";

const PERKS = [
  {
    title: "Early Edition Access",
    desc: "You're notified 48 hours before the public when a new edition opens.",
  },
  {
    title: "Priority Allocation",
    desc: "Your reservation is processed before the general waitlist.",
  },
  {
    title: "Collector Correspondence",
    desc: "Direct insight from the studio — making-of, materials, and intent.",
  },
];

function Header() {
  return (
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
  );
}

export default function AccountContent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [portalData, setPortalData] = useState<PortalData | null>(null);
  const [view, setView] = useState<View>("form");
  const [unsubscribeLoading, setUnsubscribeLoading] = useState(false);
  const [showUnsubscribeConfirm, setShowUnsubscribeConfirm] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/account-lookup", {
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

    // Order-only customers go straight to Stripe portal
    if (data.isCustomer && !data.isSubscriber) {
      window.location.href = data.stripePortalUrl;
      return;
    }

    setPortalData(data);
    setView("portal");
    setLoading(false);
  }

  async function handleUnsubscribe() {
    setUnsubscribeLoading(true);
    const res = await fetch("/api/subscriber-update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, action: "unsubscribe" }),
    });
    if (res.ok) {
      setView("unsubscribed");
    }
    setUnsubscribeLoading(false);
  }

  const memberSince =
    portalData?.subscriber?.since
      ? new Date(portalData.subscriber.since).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        })
      : null;

  if (view === "unsubscribed") {
    return (
      <main className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="w-full max-w-[420px] text-center">
            <p className="mb-4 text-[11px] tracking-[4px] uppercase text-accent">Unsubscribed</p>
            <h1 className="font-serif text-[clamp(24px,3.5vw,36px)] font-light text-foreground">
              You&apos;ve been removed.
            </h1>
            <div className="mx-auto mt-5 h-px w-[60px] bg-accent" />
            <p className="mt-5 text-[14px] font-light leading-[1.8] text-foreground-muted">
              You&apos;ll no longer receive priority access emails from Pedral. We&apos;re sorry to see you go.
            </p>
            <Link
              href="/"
              className="mt-8 inline-block rounded-[2px] border border-accent/30 px-8 py-3.5 text-[11px] font-medium tracking-[3px] uppercase text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            >
              Back to Pedral
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (view === "portal" && portalData) {
    return (
      <main className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="mx-auto w-full max-w-[620px] px-6 py-14 md:py-20">

          {/* Greeting */}
          <p className="mb-2 text-[11px] tracking-[4px] uppercase text-accent">My Account</p>
          <h1 className="font-serif text-[clamp(26px,4vw,38px)] font-light text-foreground">
            {portalData.subscriber?.firstName
              ? `Welcome, ${portalData.subscriber.firstName}.`
              : "Welcome back."}
          </h1>
          <div className="mt-4 h-px w-[60px] bg-accent" />

          {/* Subscription status */}
          {portalData.isSubscriber && portalData.subscriber && (
            <div className="mt-10">
              <p className="mb-4 text-[11px] tracking-[3px] uppercase text-foreground-muted">
                Subscription
              </p>
              <div className="rounded-[2px] border border-accent/15 bg-white/[0.02] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-light text-foreground">Priority Collector</p>
                    {memberSince && (
                      <p className="mt-1 text-[12px] font-light text-foreground-muted">
                        Member since {memberSince}
                      </p>
                    )}
                  </div>
                  <span className="rounded-[2px] bg-accent/10 px-3 py-1 text-[10px] tracking-[2px] uppercase text-accent">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Perks */}
          {portalData.isSubscriber && (
            <div className="mt-8">
              <p className="mb-4 text-[11px] tracking-[3px] uppercase text-foreground-muted">
                Your Benefits
              </p>
              <div className="space-y-3">
                {PERKS.map((perk) => (
                  <div
                    key={perk.title}
                    className="flex gap-4 rounded-[2px] border border-accent/[0.08] bg-white/[0.02] px-5 py-4"
                  >
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <div>
                      <p className="text-[13px] font-light text-foreground">{perk.title}</p>
                      <p className="mt-0.5 text-[12px] font-light text-foreground-muted">
                        {perk.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Order portal */}
          {portalData.isCustomer && portalData.stripePortalUrl && (
            <div className="mt-8">
              <p className="mb-4 text-[11px] tracking-[3px] uppercase text-foreground-muted">
                Orders
              </p>
              <div className="rounded-[2px] border border-accent/15 bg-white/[0.02] p-6">
                <p className="text-[13px] font-light text-foreground">
                  View your order history, download invoices and track shipments.
                </p>
                <a
                  href={portalData.stripePortalUrl}
                  className="mt-4 inline-block rounded-[2px] bg-accent px-6 py-3 text-[11px] font-medium tracking-[3px] uppercase text-background transition-colors hover:bg-accent-hover"
                >
                  Open Order Portal →
                </a>
              </div>
            </div>
          )}

          {/* Email preferences / unsubscribe */}
          {portalData.isSubscriber && (
            <div className="mt-12 border-t border-accent/[0.06] pt-8">
              <p className="mb-2 text-[11px] tracking-[3px] uppercase text-foreground-muted">
                Email Preferences
              </p>
              <p className="text-[13px] font-light text-foreground-muted">
                You&apos;re currently receiving priority access notifications and collector correspondence.
              </p>

              {!showUnsubscribeConfirm ? (
                <button
                  onClick={() => setShowUnsubscribeConfirm(true)}
                  className="mt-4 text-[12px] font-light text-foreground-muted/50 underline underline-offset-4 transition-colors hover:text-foreground-muted"
                >
                  Unsubscribe from all emails
                </button>
              ) : (
                <div className="mt-4 rounded-[2px] border border-red-900/30 bg-red-950/10 p-5">
                  <p className="text-[13px] font-light text-foreground-muted">
                    Are you sure? You&apos;ll lose your priority collector status and early edition access.
                  </p>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={handleUnsubscribe}
                      disabled={unsubscribeLoading}
                      className="rounded-[2px] border border-red-700/40 px-5 py-2.5 text-[11px] font-medium tracking-[2px] uppercase text-red-400 transition-colors hover:border-red-600 hover:text-red-300 disabled:opacity-50"
                    >
                      {unsubscribeLoading ? "Removing…" : "Yes, unsubscribe"}
                    </button>
                    <button
                      onClick={() => setShowUnsubscribeConfirm(false)}
                      className="px-5 py-2.5 text-[11px] font-medium tracking-[2px] uppercase text-foreground-muted transition-colors hover:text-foreground"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    );
  }

  // Email form (default view)
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-[420px]">
          <p className="mb-4 text-[11px] tracking-[4px] uppercase text-accent">My Account</p>
          <h1 className="font-serif text-[clamp(28px,4vw,40px)] font-light text-foreground">
            View your orders.
          </h1>
          <div className="mt-5 h-px w-[60px] bg-accent" />
          <p className="mt-5 text-[14px] font-light leading-[1.8] text-foreground-muted">
            Enter the email address you used when placing your order or subscribing. We&apos;ll open
            your personal portal where you can view orders, download invoices, track shipments and
            manage your subscription.
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

            {error && <p className="text-[13px] font-light text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[2px] bg-accent py-4 text-[11px] font-medium tracking-[3px] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {loading ? "Looking up…" : "Access My Account →"}
            </button>
          </form>

          <p className="mt-6 text-center text-[12px] font-light text-foreground-muted/60">
            No account? Your profile is created automatically when you place an order or subscribe.
          </p>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This page doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="mb-4 text-[11px] font-normal tracking-[4px] uppercase text-accent">
        404
      </p>
      <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-light text-foreground">
        This page doesn&apos;t exist.
      </h1>
      <div className="mx-auto mt-6 h-px w-[60px] bg-accent" />
      <p className="mt-6 max-w-[520px] text-[15px] font-light leading-[1.85] text-foreground-muted">
        Some things at Pedral don&apos;t come back — this page shouldn&apos;t have been one of
        them.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
        <Link
          href="/collections"
          className="text-[11px] font-normal tracking-[2px] uppercase text-accent transition-colors hover:text-accent-hover"
        >
          View Collections
        </Link>
        <span className="text-foreground-muted/20">·</span>
        <Link
          href="/journal"
          className="text-[11px] font-normal tracking-[2px] uppercase text-accent transition-colors hover:text-accent-hover"
        >
          Read the Journal
        </Link>
      </div>
    </main>
  );
}

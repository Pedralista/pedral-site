import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { PRESS_MENTIONS, MORE_ARTICLES, VIDEO_REVIEWS, allOwnerQuotes } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Reviews & Media",
  description:
    "Independent reviews of Pedral watches and words from the people who wear them. Press and review requests go directly to Kevin Pedral in Stockholm.",
  alternates: { canonical: "/reviews" },
};

const WATCHCRUNCH = PRESS_MENTIONS.find((m) => m.outlet === "WatchCrunch");

export default function ReviewsPage() {
  const owners = allOwnerQuotes();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Reviews & Media", url: "/reviews" }]} />

      <section className="border-b border-accent/[0.06] bg-background pb-14 pt-28 text-center md:pt-36">
        <div className="mx-auto max-w-[720px] px-6 md:px-12">
          <p className="mb-4 text-[11px] font-normal tracking-[4px] uppercase text-accent">Reviews &amp; Media</p>
          <h1 className="font-serif text-[clamp(32px,4vw,48px)] font-light text-foreground">
            What reviewers and owners say.
          </h1>
          <p className="mx-auto mt-5 max-w-[520px] text-[16px] font-light leading-[1.8] text-foreground-muted">
            Every quote on this page comes from a published review or a real Pedral owner.
          </p>
        </div>
      </section>

      {WATCHCRUNCH && (
        <section className="bg-background-alt py-16 md:py-24">
          <div className="mx-auto max-w-[900px] px-6 md:px-12">
            <p className="mb-3 text-[11px] font-normal tracking-[4px] uppercase text-accent">Independent review</p>
            <h2 className="font-serif text-[clamp(26px,3vw,38px)] font-light text-foreground">
              Maestro Petite Seconde, reviewed on WatchCrunch
            </h2>
            <div className="mt-6 h-px w-[60px] bg-accent" />
            <div className="mt-8 grid gap-10 md:grid-cols-[1fr_200px] md:items-start">
              <div>
                <p className="border-l-2 border-accent/30 pl-6 font-serif text-[22px] font-light italic leading-[1.6] text-foreground">
                  &ldquo;{WATCHCRUNCH.quote}&rdquo;
                </p>
                <p className="mt-4 pl-6 text-[15px] tracking-[1px] text-foreground-muted">
                  Erik · Wisconsin, USA · owner of the Soul Blue dial
                </p>
                <p className="mt-8 text-[16px] font-light leading-[1.85] text-foreground-muted">
                  A long, independent review from an owner of fourteen watches, covering the design, the
                  guilloché dial, the bracelet and how it wears. He compares it with the Bulova Super
                  Seville he was also considering, and writes that he would have been willing to pay
                  significantly more.
                </p>
                <a
                  href={WATCHCRUNCH.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium tracking-[2px] uppercase text-accent transition-colors hover:text-accent-hover"
                >
                  Read the full review on WatchCrunch &rarr;
                </a>
              </div>
              <div className="rounded-lg border border-accent/20 p-6 text-center">
                <p className="font-serif text-[48px] font-light leading-none text-foreground">4.2</p>
                <p className="mt-2 text-[13px] tracking-[1.5px] uppercase text-foreground-muted">out of 5</p>
                <div className="my-5 h-px bg-accent/10" />
                <p className="text-[13px] tracking-[1.5px] uppercase text-accent">Would recommend</p>
                <p className="mt-1 font-serif text-[22px] font-light text-foreground">Yes</p>
                <Link
                  href="/collections/maestro"
                  className="mt-6 inline-block text-[12px] font-medium tracking-[2px] uppercase text-accent hover:text-accent-hover"
                >
                  See Maestro &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1000px] px-6 md:px-12">
          <p className="mb-3 text-[11px] font-normal tracking-[4px] uppercase text-accent">In the press</p>
          <h2 className="font-serif text-[clamp(26px,3vw,38px)] font-light text-foreground">Written reviews</h2>
          <div className="mt-6 h-px w-[60px] bg-accent" />
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {PRESS_MENTIONS.filter((m) => m.outlet !== "WatchCrunch").map((m) => (
              <a key={m.url} href={m.url} target="_blank" rel="noopener noreferrer" className="group block border-l-2 border-accent/20 py-1 pl-6">
                <p className="text-[13px] tracking-[2px] uppercase text-accent">{m.outlet}</p>
                <p className="mt-3 font-serif text-[18px] font-light italic leading-[1.6] text-foreground">&ldquo;{m.quote}&rdquo;</p>
                <p className="mt-3 text-[14px] font-light text-foreground-muted">{m.detail}</p>
                <p className="mt-2 text-[12px] tracking-[2px] uppercase text-accent group-hover:text-accent-hover">Read &rarr;</p>
              </a>
            ))}
            {MORE_ARTICLES.map((m) => (
              <a key={m.url} href={m.url} target="_blank" rel="noopener noreferrer" className="group block border-l-2 border-accent/20 py-1 pl-6">
                <p className="text-[13px] tracking-[2px] uppercase text-accent">{m.outlet}</p>
                <p className="mt-3 font-serif text-[18px] font-light leading-[1.6] text-foreground">{m.title}</p>
                <p className="mt-3 text-[14px] font-light text-foreground-muted">{m.detail}</p>
                <p className="mt-2 text-[12px] tracking-[2px] uppercase text-accent group-hover:text-accent-hover">Read &rarr;</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-accent/[0.06] bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-[1000px] px-6 md:px-12">
          <p className="mb-3 text-[11px] font-normal tracking-[4px] uppercase text-accent">On YouTube</p>
          <h2 className="font-serif text-[clamp(26px,3vw,38px)] font-light text-foreground">Video reviews</h2>
          <div className="mt-6 h-px w-[60px] bg-accent" />
          <ul className="mt-10 divide-y divide-accent/10">
            {VIDEO_REVIEWS.map((v) => (
              <li key={v.url}>
                <a href={v.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="text-[16px] font-light leading-[1.6] text-foreground group-hover:text-accent">{v.title}</span>
                  <span className="shrink-0 text-[13px] tracking-[1px] text-foreground-muted">
                    {v.channel}{v.friend ? " · friend of the brand" : ""} &rarr;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-accent/[0.06] bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1000px] px-6 md:px-12">
          <p className="mb-3 text-[11px] font-normal tracking-[4px] uppercase text-accent">From the people who wear them</p>
          <h2 className="font-serif text-[clamp(26px,3vw,38px)] font-light text-foreground">Owners</h2>
          <div className="mt-6 h-px w-[60px] bg-accent" />
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {owners.map((t) => (
              <figure key={t.quote} className="border-l-2 border-accent/20 py-1 pl-6">
                <blockquote className="font-serif text-[18px] font-light italic leading-[1.6] text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4">
                  <p className="text-[15px] tracking-[1.5px] text-accent">{t.author}</p>
                  <p className="mt-0.5 text-[14px] font-light text-foreground-muted">{t.detail}</p>
                  {t.product && (
                    <Link
                      href={`/collections/${t.product.slug}`}
                      className="mt-1 inline-block text-[13px] tracking-[1px] text-foreground-muted/70 underline underline-offset-2 hover:text-accent"
                    >
                      {t.product.name}
                    </Link>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-accent/[0.06] bg-background-alt py-16 md:py-24">
        <div className="mx-auto flex max-w-[900px] flex-col gap-8 px-6 md:flex-row md:items-center md:gap-12 md:px-12">
          <Image
            src="/images/kevin-portrait.jpeg"
            alt="Kevin Pedral"
            width={160}
            height={200}
            className="h-[200px] w-[160px] shrink-0 rounded-lg object-cover"
          />
          <div>
            <p className="mb-3 text-[11px] font-normal tracking-[4px] uppercase text-accent">Press &amp; reviewers</p>
            <h2 className="font-serif text-[clamp(24px,2.6vw,34px)] font-light text-foreground">
              Writing about Pedral?
            </h2>
            <p className="mt-4 max-w-[520px] text-[16px] font-light leading-[1.85] text-foreground-muted">
              Images, specifications, review requests and interviews go straight to Kevin. There is no
              agency in between.
            </p>
            <a
              href="mailto:info@pedral.watch?subject=Press%20%2F%20review%20request"
              className="mt-6 inline-block rounded-lg bg-accent px-10 py-4 text-[11px] font-medium tracking-[3px] uppercase text-background transition-colors hover:bg-accent-hover"
            >
              Email Kevin
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

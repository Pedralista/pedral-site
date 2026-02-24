"use client";

import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import type { Collection } from "@/lib/collections";
import Newsletter from "@/components/sections/Newsletter";

function ImagePlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-[linear-gradient(135deg,rgba(201,168,76,0.06)_0%,rgba(201,168,76,0.02)_50%,rgba(201,168,76,0.08)_100%)] ${className}`}
    >
      <span className="text-center text-[10px] tracking-[3px] uppercase text-accent/30">
        {label}
      </span>
    </div>
  );
}

export default function CollectionDetail({ collection }: { collection: Collection }) {
  const c = collection;
  const isSoldOut = c.stock === 0;

  return (
    <>
      {/* Product Hero — Full-bleed with overlay */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImagePlaceholder label={`${c.name}\nHero / Lifestyle Image`} className="h-full w-full" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,10,12,0.88)_0%,rgba(5,10,12,0.35)_50%,rgba(5,10,12,0.7)_100%)]" />
        </div>
        <div className="relative z-10 max-w-[700px] px-6 py-20 sm:py-24 md:py-32 md:px-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-5 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent"
          >
            {isSoldOut
              ? `The Original — Since ${c.year}`
              : `Limited Edition — 20 Pieces`}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif text-[clamp(32px,7vw,56px)] font-light leading-[1.15] text-foreground"
          >
            {c.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-3 font-serif text-[24px] font-light italic text-accent-hover"
          >
            {c.hook}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-4 font-serif text-[28px] font-light text-foreground"
          >
            &euro;{c.price.toLocaleString()}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-5 flex w-fit items-center gap-3 border border-accent/25 px-4 py-2 rounded-[2px]"
          >
            <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-accent" />
            <span className="text-[11px] tracking-[1.5px] uppercase text-accent">
              Edition of {c.maxStock} &middot; {c.edition}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6"
          >
            <button className="w-full rounded-[2px] bg-accent px-8 py-4 text-[12px] font-medium tracking-[2px] uppercase text-background transition-colors hover:bg-accent-hover sm:w-auto sm:px-12 sm:text-[11px] sm:tracking-[3px]">
              {isSoldOut ? "Join Waitlist" : `Reserve Your ${c.name.split(" ")[0]} →`}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-background-alt py-20 md:py-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="mb-3 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent">
              The Watch
            </p>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-light text-foreground">
              {c.detailStrip.title.replace(/\.$/, "")}
            </h2>
            <div className="mt-6 h-px w-[60px] bg-accent" />
            <p className="mt-6 text-[15px] font-light leading-[1.85] text-foreground-muted">
              {c.description}
            </p>
            {c.descriptionExtra && (
              <p className="mt-5 text-[15px] font-light leading-[1.85] text-foreground-muted">
                {c.descriptionExtra}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Detail Strip — Image + Text */}
      <section className="grid md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInLeft}
        >
          <ImagePlaceholder
            label={`${c.name}\nDial Detail / Macro`}
            className="h-[400px] w-full md:h-[500px]"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRight}
          className="flex flex-col justify-center px-6 py-12 md:px-16"
        >
          <p className="mb-3 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent">
            {c.detailStrip.eyebrow}
          </p>
          <h3 className="font-serif text-[26px] font-light text-foreground">
            {c.detailStrip.title}
          </h3>
          <div className="mt-4 h-px w-[60px] bg-accent" />
          <p className="mt-5 text-[14px] font-light leading-[1.8] text-foreground-muted">
            {c.detailStrip.text}
          </p>
        </motion.div>
      </section>

      {/* Designer Note */}
      <section className="relative bg-background py-16 md:py-24">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="mb-3 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent">
              Kevin&apos;s Note
            </p>
            <div className="mt-4 h-px w-[60px] bg-accent" />
            <p className="mt-6 border-l-2 border-accent/30 pl-6 font-serif text-[22px] font-light italic leading-[1.6] text-foreground">
              &ldquo;{c.designerNote}&rdquo;
            </p>
            <p className="mt-4 pl-6 text-[12px] tracking-[2px] text-foreground-muted">
              — Kevin Pedral, Stockholm
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="grid grid-cols-1 gap-[2px] md:grid-cols-3">
        {["Angle 1", "Angle 2", "Angle 3"].map((label) => (
          <ImagePlaceholder
            key={label}
            label={`${c.name}\n${label}`}
            className="h-[250px] w-full transition-transform duration-500 hover:scale-[1.02] md:h-[380px]"
          />
        ))}
      </section>

      {/* Specifications */}
      <section className="bg-background-alt py-20 md:py-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="mb-3 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent">
              Specifications
            </p>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-light text-foreground">
              {c.specsTitle}
            </h2>
            <div className="mt-6 h-px w-[60px] bg-accent" />
          </motion.div>

          <motion.table
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-8 w-full border-collapse"
          >
            <tbody>
              {Object.entries(c.specs).map(([label, value]) => (
                <motion.tr
                  key={label}
                  variants={fadeInUp}
                  className="border-b border-accent/10"
                >
                  <td className="w-[120px] py-3.5 pr-4 align-top text-[11px] font-medium tracking-[1.5px] uppercase text-accent sm:w-[180px] sm:pr-6 sm:tracking-[2.5px]">
                    {label}
                  </td>
                  <td className="py-3.5 text-[14px] font-light text-foreground-muted">
                    {value}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </section>

      {/* What's in the Box */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="rounded-[2px] border border-accent/10 bg-surface/50 p-8 md:p-10"
          >
            <p className="mb-2 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent">
              Complete Package
            </p>
            <h3 className="font-serif text-[20px] font-light text-foreground">
              What&apos;s in the Box
            </h3>
            <div className="mt-4 h-px w-[60px] bg-accent" />
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {c.boxContents.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-[14px] font-light text-foreground-muted"
                >
                  <span className="text-[9px] text-accent">&#10022;</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Perspective */}
      {c.valueAnchor && (
        <section className="bg-background-alt py-16 md:py-24">
          <div className="mx-auto max-w-[900px] px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <p className="mb-3 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent">
                Value Perspective
              </p>
              <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-light text-foreground">
                What this specification actually costs elsewhere.
              </h2>
              <div className="mt-6 h-px w-[60px] bg-accent" />
              <p className="mt-6 text-[15px] font-light italic leading-[1.85] text-foreground-muted">
                {c.valueAnchor}
              </p>
              <div className="mt-6 flex items-baseline gap-5">
                <span className="font-serif text-[24px] font-light text-foreground-muted line-through">
                  {c.valueComparePrice}
                </span>
                <span className="text-[12px] tracking-[1.5px] uppercase text-foreground-muted">
                  Established Brands &rarr;
                </span>
                <span className="font-serif text-[36px] font-normal text-accent">
                  &euro;{c.price.toLocaleString()}
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Price CTA */}
      <section className="bg-[linear-gradient(180deg,var(--background)_0%,var(--background-alt)_100%)] py-16 text-center md:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="mb-3 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent">
            Edition of {c.maxStock} &middot; {c.edition}
          </p>
          <p className="font-serif text-[48px] font-light text-foreground">
            &euro;{c.price.toLocaleString()}
          </p>
          <button className="mt-6 w-full max-w-[300px] rounded-[2px] bg-accent px-8 py-4 text-[12px] font-medium tracking-[2px] uppercase text-background transition-colors hover:bg-accent-hover sm:w-auto sm:px-12 sm:text-[11px] sm:tracking-[3px]">
            {isSoldOut ? "Join Waitlist" : `Reserve Your ${c.name.split(" ")[0]}`}
          </button>
          <p className="mt-3 text-[12px] font-light tracking-[0.5px] text-foreground-muted">
            Pre-order &middot; Full payment secures your allocation &middot; Ships in 4–6 weeks
          </p>
          <div className="mx-auto mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-8">
            {[
              "Cancel anytime before dispatch",
              "14-day return after delivery",
              "12-month warranty",
              "Insured shipping",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[11px] tracking-[1px] uppercase text-foreground-muted"
              >
                <span className="font-semibold text-accent">&#10003;</span>
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Product Testimonials */}
      {c.testimonials.length > 0 && (
        <section className="border-l-[3px] border-accent/20 bg-background py-16 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeInUp}
                className="mb-6 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent"
              >
                From {c.name} Owners
              </motion.p>
              {c.testimonials.map((t, i) => (
                <motion.div key={t.name} variants={fadeInUp}>
                  {i > 0 && (
                    <div className="my-8 h-px w-10 bg-accent/30" />
                  )}
                  <p className="font-serif text-[18px] font-light italic leading-[1.6] text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-2 text-[12px] font-normal tracking-[1.5px] text-accent">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-[11px] font-light text-foreground-muted">
                    {t.bio}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <Newsletter
        title={c.newsletterTitle}
        subtitle={c.newsletterSub}
      />
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";

const upcoming = [
  {
    label: "Maestro · Petite Seconde",
    title: "The Maestro. Now with a small seconds.",
    desc: "Same tonneau case, same considered architecture. A guilloché dial, proprietary Roman numerals, a subsidiary seconds at six, and a Sellita SW260 automatic movement. Two dials: Céleste and Solaire.",
    eta: "Q2 2026 · €1,600",
    href: "/collections/maestro-petite-seconde",
  },
  {
    label: "Artefact · Final Frontier",
    title: "The last Artefact. Resolved and complete.",
    desc: "Artefact is being discontinued. Final Frontier closes it — two dials, one set. Versatile enough to go anywhere, resolved enough to belong everywhere. Friends of the brand get priority access before any public release.",
    eta: "20 sets remaining · €1,000 · No reissue",
    href: "/artefact-final-frontier",
  },
  {
    label: "Triomphe",
    title: "A new dial. The same architecture.",
    desc: "The Triomphe continues — same 8.8mm case, new expression. Each edition closes when it closes. No restocks, no second run. Friends of the brand hear before any public announcement. Allocation-based, as always.",
    eta: "Available Now",
    href: "/collections/triomphe",
  },
];

export default function ComingSoon() {
  return (
    <section className="bg-background-alt py-16 md:py-24 lg:py-[120px]">
      <div className="mx-auto max-w-[1100px] px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeInUp}
            className="mb-3.5 text-[11px] font-normal tracking-[4px] uppercase text-accent"
          >
            Coming
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-[clamp(32px,3.5vw,48px)] font-light text-foreground"
          >
            What&apos;s next from the studio.
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="mt-12 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {upcoming.map((item) => {
              const inner = (
                <>
                  <div>
                    <p className="mb-3 text-[10px] font-normal tracking-[3px] uppercase text-accent/60">
                      {item.label}
                    </p>
                    <h3 className="font-serif text-[20px] md:text-[26px] font-light text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-[15px] font-light leading-[1.85] text-foreground-muted">
                      {item.desc}
                    </p>
                  </div>
                  <p className="mt-8 text-[11px] font-normal tracking-[2px] uppercase text-accent">
                    {item.eta}
                    {item.href && <span className="ml-2">&rarr;</span>}
                  </p>
                </>
              );

              return (
                <motion.div key={item.title} variants={fadeInUp}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex flex-col justify-between rounded-lg border border-accent/[0.08] bg-background p-5 md:p-8 lg:p-10 transition-all duration-300 hover:border-accent/30 hover:-translate-y-[2px]"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="flex flex-col justify-between rounded-lg border border-accent/[0.08] bg-background p-5 md:p-8 lg:p-10">
                      {inner}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 border-t border-accent/[0.08] pt-10">
            <p className="text-[15px] font-light leading-[1.85] text-foreground-muted">
              Collectors on the list hear first — before any public announcement.
            </p>
            <Link
              href="/#newsletter"
              className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium tracking-[2px] uppercase text-accent transition-colors hover:text-accent-hover"
            >
              Join the list &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

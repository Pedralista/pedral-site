"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}

export default function LegalPage({ eyebrow, title, updated, children }: LegalPageProps) {
  return (
    <>
      <section className="border-b border-accent/[0.06] bg-background pb-14 pt-28 text-center md:pt-36">
        <div className="mx-auto max-w-[720px] px-6 md:px-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p
              variants={fadeInUp}
              className="mb-4 text-[11px] font-normal tracking-[4px] uppercase text-accent"
            >
              {eyebrow}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-[clamp(32px,4vw,48px)] font-light text-foreground"
            >
              {title}
            </motion.h1>
            {updated && (
              <motion.p
                variants={fadeInUp}
                className="mt-4 text-[13px] font-light text-foreground-muted"
              >
                {updated}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-10 md:py-14 lg:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="legal-content mx-auto max-w-[820px] px-6 md:px-12"
        >
          {children}
        </motion.div>
      </section>

      <style jsx global>{`
        .legal-content h2 {
          font-family: var(--font-cormorant), serif;
          font-size: 28px;
          font-weight: 400;
          color: var(--foreground);
          margin: 48px 0 16px;
          padding-top: 24px;
          border-top: 1px solid rgba(201, 168, 76, 0.08);
        }
        .legal-content h2:first-of-type {
          margin-top: 0;
          border-top: none;
          padding-top: 0;
        }
        .legal-content h3 {
          font-size: 15px;
          font-weight: 500;
          color: var(--accent);
          margin: 28px 0 10px;
          letter-spacing: 0.5px;
        }
        .legal-content p {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.8;
          color: var(--foreground-muted);
          margin-bottom: 16px;
        }
        .legal-content strong {
          color: var(--foreground);
          font-weight: 500;
        }
        .legal-content a {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .legal-content a:hover {
          color: var(--accent-hover);
        }
        .legal-content ul,
        .legal-content ol {
          margin: 12px 0 20px 24px;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.8;
          color: var(--foreground-muted);
        }
        .legal-content li {
          margin-bottom: 6px;
        }
        .legal-content li::marker {
          color: var(--accent);
        }
        @media (max-width: 640px) {
          .legal-content h2 {
            font-size: 22px;
            margin-top: 36px;
            padding-top: 18px;
          }
          .legal-content h3 {
            font-size: 14px;
          }
          .legal-content ul,
          .legal-content ol {
            margin-left: 16px;
          }
        }
      `}</style>
    </>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { studioPieces } from "@/lib/models";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// What a commission can include. Only what Kevin offers (confirmed Oct 2026):
// stone dials, custom numerals, engraving + gem setting, movement choice,
// case materials (gold, tantalum; ceramic and DLC from past studies), dial craft.
// Kevin designs each piece; specialist workshops make the parts.
const OFFERINGS = [
  {
    title: "Stone Dials",
    sub: "From the earth",
    body: "Lapis lazuli, aventurine, agate, sodalite: natural stone cut into a dial, so no two are ever alike. Name the stone, or let me find the one that suits the idea.",
  },
  {
    title: "Custom Numerals",
    sub: "A script, or a secret",
    body: "Roman, Hebrew, Eastern Arabic, Bangla or Amharic numerals: a commission can carry the script that means something to you, or a detail only you will know is there: a birth month in a different colour, a date hidden in plain sight.",
  },
  {
    title: "Engraving & Stones",
    sub: "Inside and out",
    body: "A name, a date or a few words engraved on the caseback. Diamonds or moissanite set where they earn their place, as quietly or as boldly as you like.",
  },
  {
    title: "Case Materials",
    sub: "Beyond steel",
    body: "Gold for warmth and weight. Tantalum, one of the rarest metals in watchmaking, dense and blue-grey. White ceramic, or steel in black DLC. The case can be as unusual as the idea behind it. Steel commissions begin at €7,000; precious and rare metals are quoted individually.",
  },
  {
    title: "Dial Craft",
    sub: "Techniques, not prints",
    body: "Guilloché engine-turning, hand-fired cloisonné enamel, deep lacquer. The techniques behind Triomphe, Ituri and Famille Royale, applied to a dial that exists only once.",
  },
  {
    title: "The Movement",
    sub: "The heart of it",
    body: "Swiss or Japanese, automatic or hand-wound, central seconds, small seconds or a second time zone. The calibre is chosen with you, for the way you will wear the watch.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "The Idea",
    sub: "Something you can't find",
    body: "It begins with something you can't find. A colour from memory. A material you've always wanted on your wrist. Or simply the feeling that nothing existing is quite right. Tell me by email, call or message; there is no commitment at this stage.",
  },
  {
    n: "02",
    title: "The Conversation",
    sub: "Every detail agreed",
    body: "We talk. You share references; sketches are made, discarded, refined. Dial, numerals, stones, case and movement are settled together. Once the brief feels inevitable, a deposit secures your place and production is scheduled.",
  },
  {
    n: "03",
    title: "The Making",
    sub: "Made by specialists, followed by me",
    body: "Components are sourced. The dial is developed. Each part is made by the specialist workshops I work with, to the design we agreed, and every detail is confirmed before a single part is ordered. There is no rushing this step: typically six to eight months from first conversation to finished watch.",
  },
  {
    n: "04",
    title: "The Watch",
    sub: "One watch, one owner",
    body: "It arrives as a finished object — not a configured product, but a watch that did not exist before you asked for it. Insured, with its 24-month warranty. The balance is settled before delivery. Made once, for you, and never repeated.",
  },
];

const FREEDOM = ["Complete freedom", "A clear idea, open to yours", "I know exactly what I want"];
const BUDGETS = ["€7,000 – €10,000", "€10,000 – €20,000", "€20,000 – €40,000", "Above €40,000", "Not sure yet"];

export default function UniquePiecesContent() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="relative bg-background pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(17,29,32,0.6)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[720px] px-6 text-center md:px-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p
              variants={fadeInUp}
              className="mb-4 text-[11px] font-normal tracking-[4px] uppercase text-accent"
            >
              Bespoke Commissions
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-[clamp(26px,4.5vw,54px)] font-light leading-[1.15] text-foreground"
            >
              Some watches begin long before they are made.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-5 text-[15px] font-light leading-[1.8] text-foreground-muted"
            >
              With a material. With a dial. Or simply with an idea.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-3 text-[15px] font-light leading-[1.8] text-foreground-muted"
            >
              This is the work I love most: taking an idea that belongs to one person, a stone, a script, a date that matters, and designing the single watch it was always meant to be. If you are considering something particular, you are welcome to write. Many of the most interesting watches begin exactly that way.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-4 text-[15px] font-light tracking-[0.5px] text-foreground-muted/50"
            >
              Commissions in steel from €7,000 · Gold and tantalum on request · Six to eight months from idea to wrist
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#begin"
                className="inline-block w-full rounded-lg bg-accent px-8 py-3.5 text-center text-[11px] font-medium tracking-[2.5px] uppercase text-background transition-colors hover:bg-accent-hover sm:w-auto"
              >
                Begin a Commission
              </a>
              <a
                href="#commissions"
                className="inline-block w-full rounded-lg border border-accent/30 px-8 py-3.5 text-center text-[11px] font-medium tracking-[2.5px] uppercase text-accent transition-colors hover:border-accent sm:w-auto"
              >
                Past Commissions
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Past commissions and studies ── */}
      <section id="commissions" className="scroll-mt-24 border-t border-accent/[0.08] bg-background-alt pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-[720px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-12 text-center md:mb-16"
          >
            <motion.p variants={fadeInUp} className="mb-3 text-[11px] font-normal tracking-[4px] uppercase text-accent">
              From the Studio
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-[clamp(26px,3vw,38px)] font-light text-foreground"
            >
              Commissions and studies.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mx-auto mt-4 text-[15px] font-light leading-[1.8] text-foreground-muted">
              Each of these was created once, never as part of a collection, and has already found its owner.
            </motion.p>
          </motion.div>
          <div className="space-y-14 md:space-y-24">
            {studioPieces.map((piece) => (
              <StudyEntry key={piece.id} piece={piece} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. How I work ── */}
      <section className="bg-background py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-[640px] px-6 text-center md:px-12"
        >
          <motion.p variants={fadeInUp} className="mb-3 text-[11px] font-normal tracking-[4px] uppercase text-accent">
            How I Work
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-[clamp(26px,3vw,38px)] font-light text-foreground"
          >
            Bring an idea, not a specification.
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-6 text-[15px] font-light leading-[1.85] text-foreground-muted">
            I design every commission myself, from the first sketch to the last detail of the dial. The parts are then made by the specialist workshops I work with, and I follow the watch until it is finished.
          </motion.p>
          <motion.p variants={fadeInUp} className="mt-4 text-[15px] font-light leading-[1.85] text-foreground-muted">
            The more freedom you give me, the better the watch tends to be. A feeling, a memory, a photograph is enough to begin. We will work out the rest together.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 4. What a commission can include ── */}
      <section className="border-t border-accent/[0.08] bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.p
              variants={fadeInUp}
              className="mb-3 text-center text-[11px] font-normal tracking-[4px] uppercase text-accent"
            >
              The Possibilities
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="mb-12 text-center font-serif text-[clamp(26px,3vw,38px)] font-light text-foreground md:mb-16"
            >
              What a commission can hold.
            </motion.h2>
            <div className="grid gap-px overflow-hidden rounded-md border border-accent/[0.08] bg-accent/[0.08] sm:grid-cols-2 lg:grid-cols-3">
              {OFFERINGS.map((o) => (
                <motion.div key={o.title} variants={fadeInUp} className="bg-background p-8 md:p-10">
                  <p className="font-serif text-[24px] font-light text-foreground">{o.title}</p>
                  <p className="mt-1 text-[11px] font-normal tracking-[3px] uppercase text-accent/80">{o.sub}</p>
                  <p className="mt-4 text-[15px] font-light leading-[1.8] text-foreground-muted">{o.body}</p>
                </motion.div>
              ))}
            </div>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-12 max-w-[560px] text-center font-serif text-[clamp(18px,2vw,22px)] font-light italic leading-[1.6] text-foreground-muted"
            >
              Not every enquiry becomes a watch. But every watch began as one.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── 5. The process ── */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.p
              variants={fadeInUp}
              className="mb-3 text-center text-[11px] font-normal tracking-[4px] uppercase text-accent"
            >
              From First Word to Wrist
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="mb-12 text-center font-serif text-[clamp(26px,3vw,38px)] font-light text-foreground md:mb-16"
            >
              The Bespoke Journey
            </motion.h2>
            <div className="grid gap-10 sm:grid-cols-2 md:gap-16 lg:grid-cols-4 lg:gap-10">
              {STEPS.map((step) => (
                <motion.div key={step.n} variants={fadeInUp}>
                  <p className="font-serif text-[clamp(40px,5vw,60px)] font-light leading-none text-accent/30">{step.n}</p>
                  <p className="mt-3 text-[13px] font-medium tracking-[2px] uppercase text-foreground">{step.title}</p>
                  <p className="mt-1 text-[13px] font-light italic text-accent/80">{step.sub}</p>
                  <p className="mt-3 text-[15px] font-light leading-[1.8] text-foreground-muted">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. Enquiry ── */}
      <section id="begin" className="scroll-mt-24 border-t border-accent/[0.08] bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-[620px] px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.p
              variants={fadeInUp}
              className="mb-3 text-center text-[11px] font-normal tracking-[4px] uppercase text-accent"
            >
              Begin a Commission
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-center font-serif text-[clamp(26px,3vw,38px)] font-light text-foreground"
            >
              Tell me what you have in mind.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mx-auto mt-4 text-center text-[15px] font-light leading-[1.8] text-foreground-muted">
              A short note is enough. I read every message personally and respond within 24 hours. Commissions in steel begin at €7,000.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <EnquiryForm />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 7. Closing ── */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <div className="grid gap-10 text-center sm:grid-cols-3">
            {[
              { t: "One of One", d: "Your watch is made once and never repeated." },
              { t: "By Conversation", d: "Every detail agreed with you before anything is made." },
              { t: "Designed in Stockholm", d: "Every commission is drawn by Kevin Pedral." },
            ].map((x) => (
              <div key={x.t}>
                <p className="text-[12px] font-medium tracking-[3px] uppercase text-accent">{x.t}</p>
                <p className="mt-2 text-[15px] font-light leading-[1.7] text-foreground-muted">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-14 max-w-[560px] text-center font-serif text-[clamp(20px,2.4vw,28px)] font-light text-foreground">
            If something here stayed with you, that is usually where it begins.
          </p>
        </div>
      </section>
    </>
  );
}

const fieldClass =
  "w-full rounded-lg border border-accent/15 bg-white/[0.04] px-5 py-3.5 text-[15px] font-light text-foreground outline-none placeholder:text-foreground-muted/50 focus:border-accent/50";
const labelClass = "mb-2 block text-[11px] font-medium tracking-[2px] uppercase text-foreground-muted";

// No mail backend on the site, so the enquiry opens the visitor's own email
// app with everything filled in, addressed to Kevin.
function EnquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [freedom, setFreedom] = useState("");
  const [budget, setBudget] = useState("");
  const [idea, setIdea] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Bespoke commission${name ? ` · ${name}` : ""}`;
    const details = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      freedom && `Freedom: ${freedom}`,
      budget && `Budget: ${budget}`,
    ].filter(Boolean);
    const body = `${details.join("\n")}\n\n${idea}`;
    window.location.href = `mailto:info@pedral.watch?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="bespoke-name" className={labelClass}>Your name</label>
          <input id="bespoke-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="What should I call you?" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="bespoke-email" className={labelClass}>Email</label>
          <input id="bespoke-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="bespoke-phone" className={labelClass}>Phone <span className="normal-case tracking-normal text-foreground-muted/50">(optional, if you prefer a call)</span></label>
        <input id="bespoke-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={fieldClass} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="bespoke-freedom" className={labelClass}>How much freedom?</label>
          <select id="bespoke-freedom" value={freedom} onChange={(e) => setFreedom(e.target.value)} className={`${fieldClass} [&_option]:bg-[#111]`}>
            <option value="">Choose one</option>
            {FREEDOM.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="bespoke-budget" className={labelClass}>Rough budget</label>
          <select id="bespoke-budget" value={budget} onChange={(e) => setBudget(e.target.value)} className={`${fieldClass} [&_option]:bg-[#111]`}>
            <option value="">Choose a range</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="bespoke-idea" className={labelClass}>Your idea</label>
        <textarea
          id="bespoke-idea"
          required
          rows={6}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="The story, the stone, the date, the meaning. Anything that should live in this watch. Links are welcome."
          className={fieldClass}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="inline-block w-full rounded-lg bg-accent px-10 py-4 text-[11px] font-medium tracking-[2.5px] uppercase text-background transition-colors hover:bg-accent-hover sm:w-auto"
        >
          Send to Kevin
        </button>
        <p className="mt-4 text-[14px] font-light text-foreground-muted/60">
          {sent
            ? "Your email app should now be open with your message ready. If it didn't open, write to info@pedral.watch."
            : "This opens your email with your message ready to send to info@pedral.watch."}
        </p>
      </div>
    </form>
  );
}

function StudyEntry({ piece }: { piece: import("@/lib/models").StudioPiece }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={staggerContainer}
    >
      {/* Image */}
      <motion.div
        variants={fadeInUp}
        className="relative w-full overflow-hidden bg-[#111]"
        style={{ aspectRatio: "4/3" }}
      >
        {piece.image ? (
          <>
            <Image
              src={piece.image}
              alt={piece.title}
              fill
              className="object-cover"
            />
            {piece.darken && (
              <div className="absolute inset-0 bg-black/40" />
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-serif text-[28px] font-light text-accent/[0.10]">
              {piece.title}
            </span>
          </div>
        )}
      </motion.div>

      {/* Caption */}
      <motion.div variants={fadeInUp} className="mt-5 border-l border-accent/20 pl-5">
        <p className="font-serif text-[20px] font-light text-foreground">
          {piece.title}
        </p>
        <p className="mt-2 text-[15px] font-light leading-[1.75] text-foreground-muted">
          {piece.caption}
        </p>
      </motion.div>
    </motion.div>
  );
}

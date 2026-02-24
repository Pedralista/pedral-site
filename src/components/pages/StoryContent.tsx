"use client";

import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import Button from "@/components/ui/Button";
import Testimonials from "@/components/sections/Testimonials";
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

const timeline = [
  {
    year: "2015",
    title: "The Beginning",
    text: "I applied to Sweden's only watchmaking school. Born in the Democratic Republic of Congo, raised in Stockholm — I didn't have the background they expected. The rejection letter was polite. My response was a decade of work.",
  },
  {
    year: "2018",
    title: "Okapi Launches via Kickstarter",
    text: "My first watch goes live on Kickstarter — and sells out. The Okapi Classique, with its cushion-shaped case and frosted blue dial, finds collectors across 12 countries. Every piece spoken for. The edition remains limited to this day.",
  },
  {
    year: "2024",
    title: "Artefact Launches via Kickstarter",
    text: "My second collection goes live on Kickstarter — and sells out. Artefact pushes the design language further, a new expression built on the same uncompromising philosophy. Like every Pedral edition: once it's gone, it's gone.",
  },
  {
    year: "Apr 2025",
    title: "Watches and Art: Best of Both Worlds",
    text: "I collaborate with horological dream maker Boris Pjanić on \"Watches and Art: Best of Both Worlds\" — a capsule collection bridging fine horology and contemporary art. Released in April 2025, it sells out.",
  },
  {
    year: "2025",
    title: "Maestro Launches via Kickstarter",
    text: "Later that year, Maestro — the refined tonneau dress watch with hexagonal bracelet links and diagonal time display — goes live on Kickstarter and sells out. A watch for those who already know.",
  },
  {
    year: "Dec 2025",
    title: "Triomphe Arrives",
    text: "In December 2025, I collaborate with the Micro Indy collective to launch Triomphe — the ultra-thin dress watch at 8.8mm, Swiss hand-wound, with rotating guilloché dial editions. A single canvas expressed through an evolving series of dials. Each limited to 20 pieces. When a dial edition sells out, it doesn't return.",
  },
  {
    year: "Now",
    title: "Okapi Returns",
    text: "The watch that started everything is coming back — reimagined with a new movement, a better case, and the lessons of every collection that came after it. The Okapi Classique, evolved. Same soul. Higher standard.",
  },
];

export default function StoryContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background-alt px-6 pb-14 pt-28 sm:pt-32 md:px-24 md:pt-44 md:pb-20">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeInUp}
            className="mb-4 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent"
          >
            Brand Story
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="max-w-[700px] font-serif text-[clamp(36px,4vw,48px)] font-light leading-[1.25] text-foreground"
          >
            They said no. I said watch me.
          </motion.h1>
          <motion.div variants={fadeInUp} className="mt-6 h-px w-[60px] bg-accent" />
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-[700px] text-[16px] font-light leading-[1.85] text-foreground-muted"
          >
            In 2015, I applied to Sweden&apos;s only watchmaking school. Born
            in the Democratic Republic of Congo, raised in Stockholm — I
            didn&apos;t have the background they expected. The rejection letter
            was polite. My response was a decade of work.
          </motion.p>
        </motion.div>
      </section>

      {/* Timeline — KEPT FROM ORIGINAL */}
      <section className="bg-background py-16 md:py-28 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12 text-center md:mb-20"
          >
            <p className="mb-3.5 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent">
              Timeline
            </p>
            <h2 className="mt-6 font-serif text-[clamp(32px,4vw,52px)] font-light text-foreground">
              The Journey <em className="italic text-accent-hover">So Far</em>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-accent/[0.12] md:left-1/2" />

            <div className="space-y-12 md:space-y-24">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  className={`relative flex items-start gap-8 md:gap-16 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background md:left-1/2" />

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <span className="font-serif text-[28px] font-light text-accent">{item.year}</span>
                    <h3 className="mt-2 font-serif text-2xl font-normal text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm font-light leading-[1.7] text-foreground-muted">{item.text}</p>
                  </div>

                  {/* Spacer for alternation */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Gallery */}
      <section className="grid grid-cols-1 gap-[2px] md:grid-cols-3">
        <ImagePlaceholder label="Kevin\nWorkshop Shot" className="h-[250px] w-full md:h-[380px]" />
        <ImagePlaceholder label="Kevin\nPortrait" className="h-[250px] w-full md:h-[380px]" />
        <ImagePlaceholder label="Kevin\nAt Work / Detail" className="h-[250px] w-full md:h-[380px]" />
      </section>

      {/* Design Ethos Quote */}
      <section className="border-y border-accent/[0.06] bg-background-alt py-14 text-center md:py-20 lg:py-28">
        <div className="mx-auto max-w-[800px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="font-serif text-[clamp(20px,5vw,28px)] font-light italic leading-[1.5] text-foreground">
              &ldquo;Pedral is not made for everyone. It is made for those who
              already understand.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      <Testimonials />

      <Newsletter
        title="Join 1,200+ collectors."
        subtitle="Be first when the next edition drops."
      />
    </>
  );
}

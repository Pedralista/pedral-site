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
    text: "Kevin Pedral applied to Sweden's only watchmaking school. Born in the Democratic Republic of Congo, raised in Stockholm — he didn't have the background they expected. The rejection letter was polite. Kevin's response was a decade of work.",
  },
  {
    year: "2017",
    title: "First Collectors",
    text: "Word spreads through watch forums and social media. Collectors in 10+ countries begin seeking out Pedral's limited runs. The Okapi cushion case earns its first cult following.",
  },
  {
    year: "2021",
    title: "Maestro Launches",
    text: "The refined tonneau dress watch with hexagonal bracelet links. A quieter statement that speaks volumes about craftsmanship.",
  },
  {
    year: "2023",
    title: "Triomphe Arrives",
    text: "Swiss hand-wound movement meets coin-edge detailing. Hebrew, Eastern Arabic, and Pietersite stone dial variants push boundaries further.",
  },
];

export default function StoryContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background-alt px-6 pb-16 pt-40 md:px-24 md:pt-44 md:pb-20">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeInUp}
            className="mb-4 text-[11px] font-normal tracking-[4px] uppercase text-accent"
          >
            Brand Story
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="max-w-[700px] font-serif text-[clamp(36px,4vw,48px)] font-light leading-[1.25] text-foreground"
          >
            They said no. He said watch me.
          </motion.h1>
          <motion.div variants={fadeInUp} className="mt-6 h-px w-[60px] bg-accent" />
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-[700px] text-[16px] font-light leading-[1.85] text-foreground-muted"
          >
            In 2015, Kevin Pedral applied to Sweden&apos;s only watchmaking
            school. Born in the Democratic Republic of Congo, raised in
            Stockholm, he didn&apos;t have the background they expected. The
            rejection letter was polite. Kevin&apos;s response was a decade of
            work.
          </motion.p>
        </motion.div>
      </section>

      {/* Timeline — KEPT FROM ORIGINAL */}
      <section className="bg-background py-28 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-20 text-center"
          >
            <p className="mb-3.5 text-[11px] font-normal tracking-[4px] uppercase text-accent">
              Timeline
            </p>
            <h2 className="mt-6 font-serif text-[clamp(32px,4vw,52px)] font-light text-foreground">
              The Journey <em className="italic text-accent-hover">So Far</em>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-accent/[0.12] md:left-1/2" />

            <div className="space-y-16 md:space-y-24">
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
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
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
      <section className="border-y border-accent/[0.06] bg-background-alt py-20 text-center md:py-28">
        <div className="mx-auto max-w-[800px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="font-serif text-[28px] font-light italic leading-[1.5] text-foreground">
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

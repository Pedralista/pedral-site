"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import Newsletter from "@/components/sections/Newsletter";

const timeline = [
  {
    year: "2015",
    title: "The rejection",
    text: "I applied to Sweden's only watchmaking school. They said no. So I taught myself — obsessive research, hundreds of failed prototypes, three years of evenings nobody saw. In 2017 I nearly stopped. I didn't.",
  },
  {
    year: "2018",
    title: "Okapi sells out",
    text: "The first watch went live on Kickstarter. Every piece spoken for. Collectors in 12 countries. Proof that the obsession wasn't just mine.",
  },
  {
    year: "2024",
    title: "Artefact",
    text: "A new collection. A different design language. The same conviction: when it's gone, it's gone. Sold out.",
  },
  {
    year: "Apr 2025",
    title: "Watches and Art",
    text: "A collaboration with Boris Pjanić bridging fine horology and contemporary art. Released April 2025. Sold out.",
  },
  {
    year: "2025",
    title: "Maestro",
    text: "The refined tonneau dress watch with hexagonal bracelet links and diagonal time display. Sold out.",
  },
  {
    year: "Dec 2025",
    title: "Triomphe",
    text: "Ultra-thin at 8.8mm, Swiss hand-wound, guilloché dials. Each edition capped at 20. When a dial closes, it does not return.",
  },
  {
    year: "Now",
    title: "Maestro Petite Seconde",
    text: "SW260 automatic movement, guilloché dial, proprietary Roman numerals, small seconds at six. Two dials: Céleste and Solaire. The most considered Maestro yet.",
  },
  {
    year: "Late 2026",
    title: "Okapi returns",
    text: "The watch that started everything — reimagined with a new movement, a better case, and the lessons of every collection that came after it. Same soul. Higher standard.",
  },
];

export default function StoryContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background-alt px-6 pb-14 pt-28 sm:pt-32 md:px-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-[820px]">
          <div className="grid items-center gap-4 md:grid-cols-[1fr_auto] md:gap-6">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.p
                variants={fadeInUp}
                className="mb-4 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent"
              >
                Brand Story
              </motion.p>
              <motion.h1
                variants={fadeInUp}
                className="font-serif text-[clamp(24px,3.5vw,42px)] font-light leading-[1.25] text-foreground whitespace-nowrap"
              >
                They said no. I said watch me.
              </motion.h1>
              <motion.div variants={fadeInUp} className="mt-6 h-px w-[60px] bg-accent" />
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-[16px] font-light leading-[1.85] text-foreground-muted"
              >
                In 2015, I applied to Sweden&apos;s only watchmaking school. Born in
                the Democratic Republic of Congo, raised in Stockholm. I didn&apos;t
                have the background they expected — or the steady hands, or the
                eyesight. What I had was resourcefulness. The rejection letter was
                polite. My response was a decade of work.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative aspect-[3/4] w-[220px] overflow-hidden rounded-lg md:w-[260px]">
                <Image
                  src="/images/kevin-portrait.jpeg"
                  alt="Kevin Pedral"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
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
                  <div className="absolute left-8 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background md:left-1/2" />
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <span className="font-serif text-[28px] font-light text-accent">{item.year}</span>
                    <h3 className="mt-2 font-serif text-2xl font-normal text-foreground">{item.title}</h3>
                    <p className="mt-3 text-[15px] font-light leading-[1.85] text-foreground-muted">{item.text}</p>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Gallery */}
      <section className="grid grid-cols-1 gap-4 px-6 py-6 md:grid-cols-3 md:px-12">
        <div className="relative h-[220px] w-full overflow-hidden rounded-lg md:h-[400px]">
          <Image src="/images/kevin-early-work.jpg" alt="Kevin early work" fill className="object-cover" />
        </div>
        <div className="relative h-[220px] w-full overflow-hidden rounded-lg md:h-[400px]">
          <Image src="/images/kevin-design-studio.jpg" alt="Pedral Stockholm studio" fill className="object-cover" />
        </div>
        <div className="relative h-[220px] w-full overflow-hidden rounded-lg md:h-[400px]">
          <Image src="/images/kevin-workshop.jpg" alt="Kevin in the workshop" fill className="object-cover" />
        </div>
      </section>

      {/* Quote */}
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
            <p className="mt-5 text-[12px] font-light tracking-[2px] uppercase text-foreground-muted/50">
              Kevin Pedral, Stockholm
            </p>
          </motion.div>
        </div>
      </section>


      {/* CTA */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid gap-8 md:grid-cols-2 md:gap-16"
          >
            <div>
              <p className="mb-3 text-[11px] font-normal tracking-[4px] uppercase text-accent">
                Now Available
              </p>
              <h2 className="font-serif text-[clamp(24px,3vw,34px)] font-light text-foreground">
                Every watch in this story sold out. A few pieces remain.
              </h2>
              <div className="mt-5 h-px w-[60px] bg-accent" />
              <p className="mt-5 text-[15px] font-light leading-[1.85] text-foreground-muted">
                The current collection follows the same rule — 20 pieces, no reissue. When it closes, it joins the archive permanently.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Link
                href="/collections"
                className="inline-block rounded-lg bg-accent px-8 py-4 text-center text-[11px] font-medium tracking-[3px] uppercase text-background transition-colors hover:bg-accent-hover"
              >
                See what&apos;s still available →
              </Link>
              <Link
                href="/archive"
                className="inline-block rounded-lg border border-accent/20 px-8 py-4 text-center text-[11px] font-medium tracking-[3px] uppercase text-foreground-muted transition-colors hover:border-accent hover:text-accent"
              >
                Browse the archive →
              </Link>
              <p className="text-[11px] font-light text-foreground-muted/40">
                Maestro · Triomphe · Okapi Classique — limited pieces remaining
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Newsletter
        title="Be part of the story."
        subtitle="Join collectors in 30+ countries. First access to new editions — before any public announcement."
      />
    </>
  );
}

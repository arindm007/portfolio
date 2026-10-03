"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import LocalTime from "@/components/LocalTime";
import { useIntroReady } from "@/components/Intro";
import { FadeIn, RevealText, RollText } from "@/components/Reveal";
import { profile } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ready = useIntroReady();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const zoom = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      ref={ref}
      className="shell grid min-h-svh grid-cols-1 items-end gap-10 pb-10 pt-20 lg:grid-cols-12 lg:gap-6"
    >
      <motion.div className="order-2 flex flex-col lg:order-1 lg:col-span-6 lg:pb-8" style={{ y: textY }}>
        <FadeIn show={ready} delay={0.1} y={8}>
          <p className="eyebrow mb-5">
            ({profile.role} — {profile.company})
          </p>
        </FadeIn>

        <h1
          className="font-display text-[clamp(3.5rem,min(7.6vw,15svh),8.5rem)] font-medium leading-[0.92] tracking-[-0.035em]"
          aria-label={profile.name}
        >
          <RevealText text={profile.firstName} by="char" show={ready} delay={0.15} className="block" />
          <RevealText text={profile.lastName} by="char" show={ready} delay={0.3} className="block" />
        </h1>

        <FadeIn show={ready} delay={0.8} y={10}>
          <p className="mt-6 max-w-[34ch] text-lg leading-snug md:text-xl">
            {profile.tagline[0]}
            <br />
            <span className="text-muted">{profile.tagline[1]}</span>
          </p>
        </FadeIn>

        <FadeIn show={ready} delay={0.95} y={10} className="mt-6 flex flex-wrap gap-2">
          {profile.focus.map((item) => (
            <span key={item} className="border border-line px-3 py-1.5 text-sm">
              {item}
            </span>
          ))}
        </FadeIn>

        <FadeIn show={ready} delay={1.1} y={10} className="mt-8 flex flex-wrap gap-3">
          <a
            href="#work"
            className="group inline-flex h-12 items-center bg-fg px-6 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            <RollText>View my work</RollText>
          </a>
          <a
            href="#contact"
            className="group inline-flex h-12 items-center border border-fg px-6 text-sm font-medium transition-colors hover:bg-fg hover:text-bg"
          >
            <RollText>Get in touch</RollText>
          </a>
        </FadeIn>
      </motion.div>

      <div className="order-1 lg:order-2 lg:col-span-6">
        {/* The portrait wipes up into view; it sits in greyscale and takes its colour on hover. */}
        <motion.div
          className="relative aspect-[4/5] w-full overflow-hidden bg-surface lg:aspect-auto lg:h-[min(82svh,48rem)]"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: ready ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        >
          <motion.div className="absolute inset-0" style={{ scale: zoom }}>
            <Image
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[62%_28%] grayscale transition-[filter] duration-700 hover:grayscale-0"
            />
          </motion.div>
        </motion.div>
        <FadeIn show={ready} delay={1.2} y={0} className="meta mt-3 flex justify-between">
          <span>({profile.location})</span>
          <LocalTime />
        </FadeIn>
      </div>
    </section>
  );
}

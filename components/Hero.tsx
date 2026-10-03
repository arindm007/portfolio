"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useIntroReady } from "@/components/Intro";
import { BlurText, FadeIn } from "@/components/Reveal";
import { profile } from "@/lib/data";

export default function Hero() {
  const ready = useIntroReady();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Like a product hero, the whole block recedes as the page scrolls up over it.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} className="relative flex min-h-svh items-center">
      <motion.div
        className="shell flex flex-col items-center pb-20 pt-24 text-center [@media(max-height:680px)]:pb-14 [@media(max-height:680px)]:pt-16"
        style={{ scale, opacity, y }}
      >
        <FadeIn show={ready} delay={0.1} y={12}>
          <p className="text-[clamp(1.125rem,1.8vw,1.5rem)] font-semibold tracking-[-0.01em] text-muted">
            {profile.role}
          </p>
        </FadeIn>

        <FadeIn show={ready} delay={0.2} y={14}>
          <h1 className="mt-2 font-display text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {profile.name}
          </h1>
        </FadeIn>

        <BlurText
          as="p"
          show={ready}
          delay={0.45}
          stagger={0.09}
          segments={[{ text: profile.headline }, { text: profile.headlineAccent, className: "text-gradient pb-[0.1em]" }]}
          className="mt-3 font-display text-[clamp(3.5rem,min(11vw,17svh),10rem)] font-bold leading-[1] tracking-[-0.04em]"
        />

        <FadeIn show={ready} delay={1} y={12}>
          <p className="mt-6 max-w-[38ch] text-[clamp(1.125rem,1.7vw,1.375rem)] font-medium leading-snug text-fg/85 [@media(max-height:680px)]:mt-4">
            {profile.intro}
          </p>
        </FadeIn>

        <FadeIn
          show={ready}
          delay={1.15}
          y={12}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 [@media(max-height:680px)]:mt-6"
        >
          <a
            href="#work"
            className="inline-flex h-12 items-center rounded-full bg-accent px-7 text-[1.0625rem] font-medium text-white transition-[filter] duration-300 hover:brightness-110"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-0.5 text-[1.0625rem] font-medium text-accent"
          >
            Get in touch
            <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
          </a>
        </FadeIn>
      </motion.div>
    </section>
  );
}

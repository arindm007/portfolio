"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import AgentField from "@/components/AgentField";
import { useIntroReady } from "@/components/Intro";
import { FadeIn, RevealText, Rule } from "@/components/Reveal";
import { profile } from "@/lib/data";

export default function Hero() {
  const ready = useIntroReady();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const fieldY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section ref={ref} className="relative flex min-h-svh flex-col justify-end overflow-hidden">
      <motion.div
        className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_2%,black_16%,black_45%,transparent_96%)]"
        style={{ y: fieldY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 2.2, delay: 0.3 }}
      >
        <AgentField className="h-full w-full" />
      </motion.div>

      <motion.div className="shell relative z-10 pb-8 pt-24 md:pb-10" style={{ y, opacity }}>
        <FadeIn show={ready} delay={0.5} y={10} className="mb-5 flex items-center gap-3 md:mb-6">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <p className="label-mono">
            {profile.role} — {profile.company}
          </p>
        </FadeIn>

        <h1
          className="font-serif text-[clamp(3.75rem,min(16.5vw,27svh),19rem)] leading-[0.84] tracking-[-0.035em]"
          aria-label={profile.name}
        >
          <RevealText text={profile.firstName} by="char" show={ready} delay={0.1} className="block" />
          <RevealText
            text={profile.lastName}
            by="char"
            show={ready}
            delay={0.28}
            className="block text-right italic"
          />
        </h1>

        <Rule show={ready} delay={0.7} className="mt-6 md:mt-8" />

        <div className="grid grid-cols-12 gap-x-6 gap-y-6 pt-6">
          <FadeIn show={ready} delay={0.9} y={12} className="col-span-12 md:col-span-3">
            <p className="label-mono">
              {profile.location}
              <br />
              {profile.coordinates}
            </p>
          </FadeIn>
          <FadeIn show={ready} delay={1} y={12} className="col-span-12 md:col-span-6 lg:col-span-5">
            <p className="text-lg leading-relaxed text-fg/80 md:text-xl">{profile.intro}</p>
          </FadeIn>
          <FadeIn
            show={ready}
            delay={1.1}
            y={12}
            className="col-span-12 hidden items-end justify-end md:col-span-3 md:flex lg:col-span-4"
          >
            <a href="#about" className="label-mono group flex items-center gap-4 transition-colors hover:text-fg">
              Scroll
              <span className="relative block h-12 w-px overflow-hidden bg-line">
                <span className="absolute inset-0 animate-[scroll-cue_1.8s_cubic-bezier(0.76,0,0.24,1)_infinite] bg-accent" />
              </span>
            </a>
          </FadeIn>
        </div>
      </motion.div>
    </section>
  );
}

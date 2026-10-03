"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useIntroReady } from "@/components/Intro";
import { BlurText, FadeIn, Magnetic } from "@/components/Reveal";
import { profile } from "@/lib/data";

export default function Hero() {
  const ready = useIntroReady();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-svh items-center">
      <motion.div
        className="shell flex flex-col items-center gap-6 pb-24 pt-28 text-center md:gap-7 [@media(max-height:680px)]:gap-4 [@media(max-height:680px)]:pb-20 [@media(max-height:680px)]:pt-20"
        style={{ y, opacity }}
      >
        <FadeIn show={ready} delay={0.15} y={10}>
          <p className="glass inline-flex items-center gap-2.5 !rounded-full px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fg/80">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
            </span>
            {profile.role} · {profile.company}
          </p>
        </FadeIn>

        <FadeIn show={ready} delay={0.3} y={10}>
          <p className="text-base text-muted md:text-lg">
            Hi, I&apos;m <span className="font-medium text-fg">{profile.name}</span>
          </p>
        </FadeIn>

        <BlurText
          as="h1"
          show={ready}
          delay={0.4}
          segments={[{ text: profile.headline }, { text: profile.headlineAccent, className: "text-comet pb-[0.08em]" }]}
          className="max-w-[9.8em] font-display text-[clamp(2.75rem,min(8.6vw,13.5svh),7.75rem)] font-bold leading-[0.98] tracking-[-0.045em] text-balance"
        />

        <FadeIn show={ready} delay={1} y={12}>
          <p className="max-w-[46ch] text-lg leading-relaxed text-fg/70 md:text-xl [@media(max-height:680px)]:text-base">{profile.intro}</p>
        </FadeIn>

        <FadeIn show={ready} delay={1.15} y={12} className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Magnetic strength={0.25}>
            <a
              href="#work"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent"
            >
              View my work
              <ArrowRight className="size-4 transition-transform duration-500 ease-expo group-hover:translate-x-1" strokeWidth={1.75} />
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="#contact"
              className="glass inline-flex h-12 items-center !rounded-full px-6 text-sm font-medium transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </Magnetic>
        </FadeIn>
      </motion.div>

      <FadeIn show={ready} delay={1.5} y={0} className="absolute inset-x-0 bottom-8 flex justify-center">
        <a href="#about" aria-label="Scroll to about" className="label-mono flex flex-col items-center gap-3 transition-colors hover:text-fg">
          <span>{profile.location}</span>
          <ArrowDown className="size-4 animate-bounce" strokeWidth={1.5} />
        </a>
      </FadeIn>
    </section>
  );
}

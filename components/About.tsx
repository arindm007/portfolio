"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import LocalTime from "@/components/LocalTime";
import { FadeIn } from "@/components/Reveal";
import { profile, stats } from "@/lib/data";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const emphasis = word.startsWith("*");

  return (
    <motion.span style={{ opacity }} className={emphasis ? "text-gradient" : undefined}>
      {word.replaceAll("*", "")}{" "}
    </motion.span>
  );
}

/** The statement lights up word by word as it is scrolled through. */
function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words = profile.statement.split(" ");

  return (
    <p
      ref={ref}
      className="font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.02em]"
    >
      {words.map((word, i) => (
        <Word key={i} word={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{value}</span>;
}

export default function About() {
  return (
    <section id="about" className="shell py-24 md:py-36">
      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12">
        <FadeIn className="lg:col-span-7 lg:row-span-2">
          <div className="tile spotlight flex h-full flex-col justify-between gap-10 p-7 md:p-10">
            <p className="eyebrow">About</p>
            <Statement />
          </div>
        </FadeIn>

        <dl className="grid grid-cols-2 gap-4 md:gap-5 lg:col-span-5 lg:row-span-2">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={0.08 * i} className="h-full">
              <div className="tile spotlight flex h-full flex-col justify-between gap-6 p-6 md:p-7">
                <dd className="text-gradient font-display text-5xl font-bold leading-[1.05] tracking-[-0.035em] tabular-nums md:text-6xl">
                  <CountUp value={stat.value} />
                  {stat.suffix}
                </dd>
                <dt className="text-sm leading-snug text-muted">{stat.label}</dt>
              </div>
            </FadeIn>
          ))}
        </dl>

        <FadeIn className="lg:col-span-4" delay={0.1}>
          <div className="tile spotlight flex h-full flex-col justify-between gap-8 p-7 md:p-8">
            <p className="meta">Based in</p>
            <div>
              <p className="font-display text-3xl font-semibold tracking-[-0.03em]">{profile.location}</p>
              <p className="meta mt-3 flex flex-wrap gap-x-3">
                <span>{profile.coordinates}</span>
                <LocalTime className="text-accent" />
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="lg:col-span-8" delay={0.15}>
          <div className="tile spotlight grid h-full gap-6 p-7 md:grid-cols-2 md:p-8">
            {profile.bio.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-fg/75">
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

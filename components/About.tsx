"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { FadeIn, Rule } from "@/components/Reveal";
import { profile, stats } from "@/lib/data";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const emphasis = word.startsWith("*");

  return (
    <motion.span style={{ opacity }} className={emphasis ? "italic text-accent" : undefined}>
      {word.replaceAll("*", "")}{" "}
    </motion.span>
  );
}

/** The statement lights up word by word as it is scrolled through. */
function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = profile.statement.split(" ");

  return (
    <p
      ref={ref}
      className="font-serif text-[clamp(1.9rem,4.4vw,4.25rem)] leading-[1.08] tracking-[-0.015em]"
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
    <section id="about" className="shell py-24 md:py-40">
      <div className="grid grid-cols-12 gap-x-6 gap-y-8">
        <FadeIn className="col-span-12 md:col-span-3" y={8}>
          <p className="label-mono">
            <span className="text-accent">(01)</span> About
          </p>
        </FadeIn>
        <div className="col-span-12 md:col-span-9">
          <Statement />
        </div>
      </div>

      <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-32">
        <div className="col-span-12 space-y-5 md:col-span-5 md:col-start-4 lg:col-span-4 lg:col-start-4">
          {profile.bio.map((paragraph, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <p className="leading-relaxed text-fg/75">{paragraph}</p>
            </FadeIn>
          ))}
        </div>

        <dl className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-5">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <Rule delay={i * 0.08} />
              <FadeIn delay={0.1 + i * 0.08} className="flex flex-col-reverse pt-4">
                <dt className="mt-2 max-w-[22ch] text-sm leading-snug text-muted">{stat.label}</dt>
                <dd className="font-serif text-6xl leading-none tabular-nums md:text-7xl">
                  <CountUp value={stat.value} />
                  <span className="text-accent">{stat.suffix}</span>
                </dd>
              </FadeIn>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import { Plus } from "lucide-react";
import { FadeIn, SectionHeading } from "@/components/Reveal";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const head = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="shell py-24 md:py-36">
      <SectionHeading
        label="Experience"
        title="Where I've built and shipped"
        aside="Enterprise agentic AI, research labs at IISc and IIT Hyderabad, industrial MLOps and product engineering."
      />

      <ol ref={ref} className="relative mt-14 space-y-4 pl-8 md:mt-20 md:space-y-5 md:pl-14">
        {/* The timeline draws itself as you scroll, with a comet at its leading edge. */}
        <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-line md:left-[11px]" />
        <motion.span
          aria-hidden
          className="absolute left-[5px] top-2 w-px origin-top bg-gradient-to-b from-transparent via-accent to-accent md:left-[11px]"
          style={{ height: head }}
        />
        <motion.span
          aria-hidden
          className="absolute left-[1px] size-[9px] -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_4px_var(--accent)] md:left-[7px]"
          style={{ top: head }}
        />

        {experience.map((job, i) => {
          const isOpen = open === i;
          return (
            <li key={job.company} className="relative">
              <span
                aria-hidden
                className={cn(
                  "absolute -left-8 top-8 size-[11px] -translate-x-[0px] rounded-full border bg-bg transition-colors duration-500 md:-left-14 md:top-9 md:translate-x-[6px]",
                  isOpen ? "border-accent" : "border-line",
                )}
              />
              <FadeIn delay={0.04 * i} y={16}>
                <div className={cn("glass spotlight overflow-hidden transition-colors duration-500", isOpen && "border-accent/40")}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full flex-col gap-3 p-6 text-left md:flex-row md:items-center md:gap-8 md:p-8"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="label-mono mb-2">{job.period}</p>
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{job.company}</h3>
                      <p className="mt-1 text-fg/70">{job.role}</p>
                    </div>
                    <div className="flex items-center justify-between gap-6 md:justify-end">
                      <span className="label-mono">{job.location}</span>
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-full border border-line transition-transform duration-500 ease-expo",
                          isOpen && "rotate-45 border-accent text-accent",
                        )}
                      >
                        <Plus className="size-4" strokeWidth={1.5} />
                      </span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                      >
                        <div className="flex flex-col gap-6 border-t border-line p-6 md:p-8">
                          <ul className="max-w-4xl space-y-3">
                            {job.points.map((point, p) => (
                              <motion.li
                                key={p}
                                className="relative pl-6 leading-relaxed text-fg/75"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: EASE, delay: 0.1 + p * 0.05 }}
                              >
                                <span className="absolute left-0 top-[0.7em] size-1.5 rounded-full bg-accent" aria-hidden />
                                {point}
                              </motion.li>
                            ))}
                          </ul>
                          <ul className="flex flex-wrap gap-2">
                            {job.tags.map((tag) => (
                              <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-fg/80">
                                {tag}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FadeIn, SectionHeading } from "@/components/Reveal";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="shell py-24 md:py-40">
      <SectionHeading index="02" label="Experience" title="Where I've worked" />

      <div role="list" className="mt-14 border-t border-line md:mt-24">
        {experience.map((job, i) => {
          const isOpen = open === i;
          return (
            <FadeIn key={job.company} delay={i * 0.05} y={16}>
              <div role="listitem" className="group relative border-b border-line">
                {/* Hover wash that rises from the bottom edge of the row */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-surface transition-transform duration-700 ease-expo group-hover:scale-y-100"
                />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="relative grid w-full grid-cols-12 items-baseline gap-x-6 gap-y-1 py-6 text-left md:py-8"
                >
                  <span className="label-mono col-span-2 md:col-span-1">0{i + 1}</span>
                  <span className="col-span-10 font-serif text-3xl leading-tight tracking-[-0.01em] transition-transform duration-700 ease-expo group-hover:translate-x-3 md:col-span-5 md:text-5xl">
                    {job.company}
                  </span>
                  <span className="col-span-10 col-start-3 text-sm text-fg/75 md:col-span-3 md:col-start-auto">
                    {job.role}
                  </span>
                  <span className="label-mono col-span-8 col-start-3 md:col-span-2 md:col-start-auto md:text-right">
                    {job.period}
                  </span>
                  <span className="col-span-2 flex justify-end self-center md:col-span-1" aria-hidden>
                    <span className="relative block size-4">
                      <span className="absolute left-0 top-1/2 h-px w-full bg-fg" />
                      <span
                        className={cn(
                          "absolute left-0 top-1/2 h-px w-full bg-fg transition-transform duration-500 ease-expo",
                          isOpen ? "rotate-0" : "rotate-90",
                        )}
                      />
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="relative overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                    >
                      <div className="grid grid-cols-12 gap-x-6 pb-10 pt-2">
                        <ul className="col-span-12 space-y-3 md:col-span-7 md:col-start-2">
                          {job.points.map((point, p) => (
                            <motion.li
                              key={p}
                              className="relative pl-6 leading-relaxed text-fg/75"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.7, ease: EASE, delay: 0.15 + p * 0.05 }}
                            >
                              <span className="absolute left-0 top-[0.75em] h-px w-3 bg-accent" aria-hidden />
                              {point}
                            </motion.li>
                          ))}
                        </ul>
                        <div className="col-span-12 mt-8 md:col-span-3 md:col-start-10 md:mt-0">
                          <p className="label-mono mb-3">{job.location}</p>
                          <ul className="flex flex-wrap gap-2">
                            {job.tags.map((tag) => (
                              <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-fg/80">
                                {tag}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

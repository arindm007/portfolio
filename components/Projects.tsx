"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import ProjectVisual from "@/components/ProjectVisual";
import { SectionHeading } from "@/components/Reveal";
import { projects, type Project } from "@/lib/data";

const DESKTOP = "(min-width: 1024px)";

function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(DESKTOP);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );
}

interface CardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacked: boolean;
}

function Card({ project, index, total, progress, stacked }: CardProps) {
  const ref = useRef<HTMLElement>(null);
  const rest = 88 + index * 22;
  const [top, setTop] = useState(rest);
  // Each card shrinks a little as the ones after it slide over the top.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.045]);

  // A card taller than the viewport pins by its bottom edge instead, so none of it is lost.
  useEffect(() => {
    const card = ref.current;
    if (!card || !stacked) return;
    const measure = () => setTop(Math.min(rest, window.innerHeight - card.offsetHeight - 24));
    const observer = new ResizeObserver(measure);
    observer.observe(card);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [rest, stacked]);

  return (
    <div className="lg:sticky lg:mt-[14vh] lg:first:mt-0" style={stacked ? { top } : undefined}>
      <motion.article
        ref={ref}
        className="relative grid w-full origin-top overflow-hidden rounded-3xl border border-line bg-surface lg:min-h-[39.5rem] lg:grid-cols-12"
        style={stacked ? { scale } : undefined}
      >
        <div className="flex flex-col justify-between gap-10 p-6 md:p-10 lg:col-span-7">
          <div className="label-mono flex justify-between">
            <span>
              <span className="text-accent">0{index + 1}</span> / 0{total}
            </span>
            <span>{project.date}</span>
          </div>

          <div>
            <h3 className="font-serif text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.95] tracking-[-0.02em]">
              {project.title}
            </h3>
            <p className="mt-2 font-serif text-xl italic text-muted md:text-2xl">{project.subtitle}</p>
            <p className="mt-6 max-w-[62ch] text-[0.95rem] leading-relaxed text-fg/75">{project.description}</p>
          </div>

          <div>
            <dl className="flex flex-wrap gap-x-10 gap-y-5">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="flex max-w-[15rem] flex-col-reverse">
                  <dt className="mt-1 text-xs leading-snug text-muted">{metric.label}</dt>
                  <dd className="font-serif text-4xl leading-none">{metric.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-fg/80">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-line bg-bg p-6 lg:col-span-5 lg:border-l lg:border-t-0">
          <ProjectVisual kind={project.visual} className="aspect-square w-full max-w-[26rem] lg:max-h-full" />
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const stacked = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="work" className="shell py-24 md:py-40">
      <SectionHeading index="03" label="Selected work" title="Things I've built" />

      <div ref={ref} className="mt-14 space-y-6 md:mt-24 lg:space-y-0">
        {projects.map((project, i) => (
          <Card
            key={project.title}
            project={project}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
            stacked={stacked}
          />
        ))}
      </div>
    </section>
  );
}

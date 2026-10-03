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
        className="spotlight relative grid w-full origin-top overflow-hidden border border-line bg-bg lg:min-h-[39.5rem] lg:grid-cols-12"
        style={stacked ? { scale } : undefined}
      >
        <div className="flex flex-col justify-between gap-10 p-6 md:p-10 lg:col-span-7">
          <div className="meta flex justify-between">
            <span>
              <span className="text-accent">0{index + 1}</span> / 0{total}
            </span>
            <span>{project.date}</span>
          </div>

          <div>
            <h3 className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-medium leading-[1] tracking-[-0.03em]">
              {project.title}
            </h3>
            <p className="mt-3 text-lg text-muted md:text-xl">{project.subtitle}</p>
            <p className="mt-6 max-w-[62ch] text-[0.95rem] leading-relaxed text-fg/75">{project.description}</p>
          </div>

          <div>
            <dl className="flex flex-wrap gap-x-10 gap-y-5">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="flex max-w-[15rem] flex-col-reverse">
                  <dt className="mt-1 text-xs leading-snug text-muted">{metric.label}</dt>
                  <dd className="text-ink font-display text-4xl font-medium leading-none tracking-[-0.03em]">{metric.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="border border-line px-3 py-1 text-xs text-fg/80">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-line bg-surface p-6 lg:col-span-5 lg:border-l lg:border-t-0">
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
      <SectionHeading
        label="Selected work"
        title="Selected projects"
        aside="Recent projects across agent platforms, multimodal inference and fine-tuned language models."
      />

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

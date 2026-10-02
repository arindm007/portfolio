"use client";

import { Fragment, useRef } from "react";
import { motion, useInView, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  by?: "word" | "char";
  className?: string;
  delay?: number;
  stagger?: number;
  /** Overrides the in-view trigger, e.g. to wait for the intro curtain. */
  show?: boolean;
}

/** Text that rises out of a mask, one word or character at a time. */
export function RevealText({
  text,
  as = "span",
  by = "word",
  className,
  delay = 0,
  stagger,
  show,
}: RevealTextProps) {
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const visible = show ?? inView;
  const step = stagger ?? (by === "char" ? 0.035 : 0.05);
  const words = text.split(" ");
  let index = 0;

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, w) => {
        const pieces = by === "char" ? Array.from(word) : [word];
        return (
          <Fragment key={w}>
            <span aria-hidden className="inline-block whitespace-nowrap">
              {pieces.map((piece, p) => {
                const i = index++;
                return (
                  // Padding keeps descenders and italic overhang inside the mask.
                  <span
                    key={p}
                    className="-mx-[0.06em] -mb-[0.18em] -mt-[0.08em] inline-block overflow-hidden px-[0.06em] pb-[0.18em] pt-[0.08em] align-bottom"
                  >
                    <motion.span
                      className="inline-block will-change-transform"
                      initial={{ y: "115%" }}
                      animate={{ y: visible ? "0%" : "115%" }}
                      transition={{ duration: 1, ease: EASE, delay: delay + i * step }}
                    >
                      {piece}
                    </motion.span>
                  </span>
                );
              })}
            </span>
            {w < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </Tag>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  show?: boolean;
}

export function FadeIn({ children, className, delay = 0, y = 24, show }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const visible = show ?? inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A hairline that draws itself across when it scrolls into view. */
export function Rule({ className, delay = 0, show }: { className?: string; delay?: number; show?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const visible = show ?? inView;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={cn("h-px w-full origin-left bg-line", className)}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: visible ? 1 : 0 }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/** Pulls its child toward the pointer while hovered. */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div>
      <Rule />
      <div className="grid grid-cols-12 gap-x-6 gap-y-6 pt-6">
        <FadeIn className="col-span-12 md:col-span-3" y={8}>
          <p className="label-mono">
            <span className="text-accent">({index})</span> {label}
          </p>
        </FadeIn>
        <RevealText
          as="h2"
          text={title}
          className="col-span-12 font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em] md:col-span-9"
        />
      </div>
    </div>
  );
}

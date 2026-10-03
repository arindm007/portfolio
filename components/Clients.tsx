"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { FadeIn } from "@/components/Reveal";
import { clients } from "@/lib/data";

const COPIES = 4;
const SPEED = 1.6; // % of the track per second at rest

/** Client names on a loop that speeds up, and reverses, with the scroll. */
export default function Clients() {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const direction = useRef(-1);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  // The track holds identical copies, so wrapping by one copy's width is seamless.
  const span = 100 / COPIES;
  const x = useTransform(base, (v) => `${(((v % span) - span) % span)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < -0.05) direction.current = 1;
    else if (b > 0.05) direction.current = -1;
    base.set(base.get() + direction.current * SPEED * (1 + Math.abs(b)) * (delta / 1000));
  });

  return (
    <section className="overflow-hidden border-y border-line bg-bg/70 py-10 md:py-12" aria-label="Clients">
      <FadeIn className="shell mb-6 text-center md:mb-8" y={8}>
        <p className="meta">Enterprise AI training delivered for</p>
      </FadeIn>
      <motion.div className="flex w-max" style={{ x }}>
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
            {clients.map((client) => (
              <li
                key={client}
                className="flex items-center font-display text-[clamp(1.75rem,4.2vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-fg/75"
              >
                <span className="whitespace-nowrap px-6 md:px-10">{client}</span>
                <svg viewBox="0 0 24 24" className="size-[0.32em] animate-[viz-spin_9s_linear_infinite] text-accent" aria-hidden>
                  <path
                    d="M12 0v24M0 12h24M3.5 3.5l17 17M20.5 3.5l-17 17"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="none"
                  />
                </svg>
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
    </section>
  );
}

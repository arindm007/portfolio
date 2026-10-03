"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

const IntroContext = createContext(false);

/** True once the intro curtain has lifted, so entrances can wait for it. */
export const useIntroReady = () => useContext(IntroContext);

const DURATION = 1300;

export default function Intro({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();

    const tick = (now: number) => {
      const p = reduce ? 1 : Math.min((now - start) / DURATION, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(() => setReady(true), reduce ? 0 : 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <IntroContext.Provider value={ready}>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {!ready && (
            <motion.div
              key="intro"
              className="intro-curtain fixed inset-0 z-[120] flex flex-col justify-between bg-bg p-5 md:p-10"
              exit={{ y: "-100%" }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              aria-hidden
            >
              <div className="label-mono flex justify-between">
                <span>Arindam Chakraborty</span>
                <span>Portfolio</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="label-mono">Agentic AI Engineer</span>
                <span className="font-display text-[clamp(5rem,18vw,14rem)] font-bold leading-[0.8] tracking-[-0.05em] tabular-nums">
                  {count}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {children}
      </MotionConfig>
    </IntroContext.Provider>
  );
}

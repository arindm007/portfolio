"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

const IntroContext = createContext(false);

/** True once the opening fade has finished, so entrances can wait for it. */
export const useIntroReady = () => useContext(IntroContext);

export default function Intro({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Lift the curtain on the first frame after hydration.
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <IntroContext.Provider value={ready}>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {!ready && (
            <motion.div
              key="intro"
              className="intro-curtain fixed inset-0 z-[120] bg-bg"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              aria-hidden
            />
          )}
        </AnimatePresence>
        {children}
      </MotionConfig>
    </IntroContext.Provider>
  );
}

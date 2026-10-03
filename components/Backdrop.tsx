"use client";

import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import AgentField from "@/components/AgentField";
import { useIntroReady } from "@/components/Intro";

/** The star-and-signal backdrop behind every page: strongest over the home hero, fainter under content. */
export default function Backdrop() {
  const ready = useIntroReady();
  const home = usePathname() === "/";
  const { scrollY } = useScroll();
  const dim = useTransform(scrollY, [0, 700], [0.55, 0.3]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 2, delay: 0.2 }}
    >
      <motion.div className="h-full w-full" style={{ opacity: home ? dim : 0.3 }}>
        <AgentField className="h-full w-full" />
      </motion.div>
    </motion.div>
  );
}

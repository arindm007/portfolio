"use client";

import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import AgentField from "@/components/AgentField";
import { useIntroReady } from "@/components/Intro";

/** The night sky behind every page: full strength over the home hero, dimmer under content. */
export default function Backdrop() {
  const ready = useIntroReady();
  const home = usePathname() === "/";
  const { scrollY } = useScroll();
  const dim = useTransform(scrollY, [0, 700], [1, 0.4]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 2, delay: 0.2 }}
    >
      <motion.div className="h-full w-full" style={{ opacity: home ? dim : 0.4 }}>
        <AgentField className="h-full w-full" />
      </motion.div>
    </motion.div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const spring = { stiffness: 420, damping: 36, mass: 0.5 };

/** A ring that trails the native cursor and swells over anything interactive. */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setActive(!!target?.closest?.("a, button, [data-cursor]"));

      // Feed the pointer position to the glow on whichever panel is under it.
      const panel = target?.closest?.(".spotlight") as HTMLElement | null;
      if (panel) {
        const rect = panel.getBoundingClientRect();
        panel.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        panel.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[110] hidden [@media(pointer:fine)]:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className={`-ml-4 -mt-4 size-8 rounded-full border transition-colors duration-300 ${
          active ? "border-accent" : "border-muted"
        }`}
        initial={false}
        animate={{ scale: active ? 1.9 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}

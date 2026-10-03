"use client";

import { useEffect } from "react";

/** Feeds the pointer position to the soft glow on whichever .spotlight panel is under it. */
export default function PointerGlow() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      const panel = (e.target as Element | null)?.closest?.(".spotlight") as HTMLElement | null;
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      panel.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      panel.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return null;
}

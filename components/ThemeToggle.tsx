"use client";

import { Moon, Sun } from "lucide-react";

type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

export default function ThemeToggle() {
  const toggle = (e: React.MouseEvent) => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };

    const doc = document as TransitionDocument;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) return apply();

    // Wipe the new theme in as a circle growing from the toggle.
    const { clientX: x, clientY: y } = e;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    doc.startViewTransition(apply).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="grid size-7 place-items-center rounded-full text-fg/80 transition-colors hover:text-fg"
    >
      <Sun className="size-3.5 light:hidden" strokeWidth={1.5} />
      <Moon className="hidden size-3.5 light:block" strokeWidth={1.5} />
    </button>
  );
}

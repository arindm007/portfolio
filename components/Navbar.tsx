"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { RollText } from "@/components/Reveal";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const sections = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Work", id: "work" },
  { label: "Writing", id: "writing" },
];

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Navbar() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(value > previous && value > 240);
    setScrolled(value > 40);
  });

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // On the home page these are plain in-page anchors, which the smooth scroller picks up.
  const SectionLink = home ? "a" : Link;
  const hrefFor = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled && !isOpen ? "bg-bg/85 border-b border-line" : "bg-transparent",
        )}
        initial={false}
        animate={{ y: hidden && !isOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <nav className="shell flex h-12 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-sm font-medium uppercase tracking-[0.02em]" onClick={() => setIsOpen(false)}>
            {profile.name}
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {sections.map((section) => (
              <SectionLink
                key={section.id}
                href={hrefFor(section.id)}
                className="group text-xs uppercase tracking-[0.04em] text-fg/80 transition-colors hover:text-fg"
              >
                <RollText>{section.label}</RollText>
              </SectionLink>
            ))}
            <Link
              href="/blog"
              className={cn(
                "group text-xs uppercase tracking-[0.04em] transition-colors hover:text-fg",
                pathname.startsWith("/blog") ? "text-fg" : "text-fg/80",
              )}
            >
              <RollText>Blog</RollText>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <SectionLink
              href={hrefFor("contact")}
              className="group hidden h-8 items-center bg-fg px-4 text-xs font-medium uppercase tracking-[0.04em] text-bg transition-opacity hover:opacity-85 md:flex"
            >
              <RollText>Let&apos;s talk</RollText>
            </SectionLink>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="relative grid size-9 place-items-center md:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-5 bg-fg transition-transform duration-500 ease-expo",
                  isOpen ? "rotate-45" : "-translate-y-[3px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-fg transition-transform duration-500 ease-expo",
                  isOpen ? "-rotate-45" : "translate-y-[3px]",
                )}
              />
            </button>
          </div>
        </nav>
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-5 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex flex-col">
              {[...sections, { label: "Contact", id: "contact" }].map((section, i) => (
                <div key={section.id} className="overflow-hidden border-b border-line">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.06 }}
                  >
                    <SectionLink
                      href={hrefFor(section.id)}
                      className="flex items-baseline justify-between py-3 font-display text-4xl font-medium tracking-[-0.03em]"
                      onClick={() => setIsOpen(false)}
                    >
                      {section.label}
                      <span className="meta">0{i + 1}</span>
                    </SectionLink>
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="meta flex justify-between">
              <Link href="/blog" onClick={() => setIsOpen(false)}>
                Blog
              </Link>
              <Link href="/daily" onClick={() => setIsOpen(false)}>
                Daily notes
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)}>
                Résumé
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

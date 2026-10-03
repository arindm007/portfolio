"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { BlurText, FadeIn, Magnetic } from "@/components/Reveal";
import { profile } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section id="contact" className="shell py-24 md:py-40">
      <div className="tile spotlight flex flex-col items-center gap-8 px-6 py-16 text-center md:px-12 md:py-24">
        <FadeIn y={8}>
          <p className="eyebrow">(Contact)</p>
        </FadeIn>

        <BlurText
          as="h2"
          segments={[{ text: "Let's build agents that ship" }]}
          className="max-w-[12ch] font-display text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.98] tracking-[-0.035em] text-balance"
        />

        <FadeIn delay={0.3}>
          <p className="max-w-[44ch] text-lg leading-relaxed text-fg/70">
            Open to collaborations and interesting problems in agentic AI, RAG and production LLM systems.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} className="flex flex-wrap items-center justify-center gap-3">
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex h-12 items-center gap-2 bg-fg px-6 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              Email me
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
            </a>
          </Magnetic>
          <button
            type="button"
            onClick={copy}
            aria-live="polite"
            className="inline-flex h-12 items-center gap-2 border border-fg px-6 text-sm font-medium transition-colors hover:bg-fg hover:text-bg"
          >
            {copied ? <Check className="size-4" strokeWidth={1.75} /> : <Copy className="size-4" strokeWidth={1.75} />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </FadeIn>

        <FadeIn delay={0.5} className="flex flex-col items-center gap-4">
          <p className="select-all break-all font-mono text-sm text-muted">{profile.email}</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-fg/80 transition-colors hover:text-fg"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

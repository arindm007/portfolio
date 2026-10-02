"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, Magnetic, RevealText, Rule } from "@/components/Reveal";
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
    <section id="contact" className="shell pb-16 pt-24 md:pb-24 md:pt-40">
      <Rule />
      <FadeIn className="pt-6" y={8}>
        <p className="label-mono">
          <span className="text-accent">(06)</span> Contact
        </p>
      </FadeIn>

      <div className="mt-12 flex flex-col gap-12 md:mt-20 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="font-serif text-[clamp(3.25rem,11vw,12rem)] leading-[0.88] tracking-[-0.03em]">
          <RevealText text="Let's build" className="block" />
          <RevealText text="agents that" className="block" delay={0.1} />
          <RevealText text="ship." className="block italic text-accent" delay={0.2} />
        </h2>

        <Magnetic className="self-start lg:self-end">
          <a
            href={`mailto:${profile.email}`}
            className="group relative grid size-36 place-items-center overflow-hidden rounded-full border border-fg md:size-48"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-accent transition-transform duration-700 ease-expo group-hover:scale-y-100"
            />
            <span className="relative flex items-center gap-1 text-sm font-medium transition-colors duration-500 group-hover:text-white md:text-base">
              Get in touch
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </span>
          </a>
        </Magnetic>
      </div>

      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-28">
        <FadeIn className="col-span-12 md:col-span-6">
          <p className="label-mono mb-3">Email</p>
          <a
            href={`mailto:${profile.email}`}
            className="link-underline break-all font-serif text-2xl md:text-4xl"
          >
            {profile.email}
          </a>
          <div>
            <button
              type="button"
              onClick={copy}
              className="label-mono mt-4 transition-colors hover:text-fg"
              aria-live="polite"
            >
              {copied ? "Copied to clipboard" : "Copy address"}
            </button>
          </div>
        </FadeIn>

        <FadeIn className="col-span-6 md:col-span-3" delay={0.1}>
          <p className="label-mono mb-3">Elsewhere</p>
          <ul className="space-y-1.5">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-lg"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className="col-span-6 md:col-span-3" delay={0.2}>
          <p className="label-mono mb-3">Based in</p>
          <p className="text-lg">{profile.location}</p>
          <p className="mt-1.5 text-muted">Open to collaborations and interesting problems.</p>
        </FadeIn>
      </div>
    </section>
  );
}

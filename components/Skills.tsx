import { FadeIn, SectionHeading } from '@/components/Reveal';
import { skills } from '@/lib/data';

export default function Skills() {
  return (
    <section id="skills" className="shell py-24 md:py-36">
      <SectionHeading
        label="Capabilities"
        title="The stack behind the agents."
        aside="From model fine-tuning to the APIs, data stores and cloud that keep agents running."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20 md:gap-5 lg:grid-cols-4">
        {skills.map((group, g) => (
          <FadeIn key={group.title} delay={g * 0.08} className="h-full">
            <div className="tile spotlight flex h-full flex-col gap-6 p-6 md:p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{group.title}</h3>
                <span className="meta">{group.items.length}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3 py-1.5 text-sm text-fg/80 transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

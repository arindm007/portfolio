import { FadeIn, Rule, SectionHeading } from '@/components/Reveal';
import { skills } from '@/lib/data';

export default function Skills() {
  return (
    <section id="skills" className="shell py-24 md:py-40">
      <SectionHeading index="04" label="Capabilities" title="What I work with" />

      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
        {skills.map((group, g) => (
          <div key={group.title}>
            <FadeIn delay={g * 0.08} y={8}>
              <h3 className="label-mono mb-5">{group.title}</h3>
            </FadeIn>
            <ul>
              {group.items.map((item, i) => (
                <li key={item} className="group">
                  <Rule delay={g * 0.08 + i * 0.05} />
                  <FadeIn delay={g * 0.08 + i * 0.05} y={10}>
                    <span className="flex items-center justify-between py-3 text-[0.95rem] transition-[padding,color] duration-500 ease-expo group-hover:pl-3 group-hover:text-accent">
                      {item}
                      <span className="size-1.5 scale-0 rounded-full bg-accent transition-transform duration-500 ease-expo group-hover:scale-100" />
                    </span>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

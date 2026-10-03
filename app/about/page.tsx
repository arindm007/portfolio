import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { FadeIn, Rule } from '@/components/Reveal';
import { activities, certifications, education, experience, languages, profile, skills } from '@/lib/data';

export const metadata: Metadata = { title: 'Résumé' };

function Block({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="grid grid-cols-12 gap-x-6 gap-y-6 py-12 md:py-16">
            <FadeIn className="col-span-12 md:col-span-3" y={8}>
                <h2 className="label-mono">{title}</h2>
            </FadeIn>
            <div className="col-span-12 md:col-span-9">{children}</div>
            <Rule className="col-span-12 mt-12 md:mt-16" />
        </section>
    );
}

export default function About() {
    return (
        <div className="shell min-h-screen pb-24 pt-36 md:pt-48">
            <PageHeader
                label={`${profile.role} · ${profile.roleAlt}`}
                title="Résumé"
                description={profile.intro}
            />

            <Block title="Contact">
                <FadeIn className="space-y-1 text-lg">
                    <p>{profile.location}</p>
                    <p>
                        <a href={`mailto:${profile.email}`} className="link-underline">{profile.email}</a>
                    </p>
                    {profile.socials.map((social) => (
                        <p key={social.label}>
                            <a href={social.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                                {social.href.replace('https://', '')}
                            </a>
                        </p>
                    ))}
                </FadeIn>
            </Block>

            <Block title="Work Experience">
                <div className="space-y-12">
                    {experience.map((job) => (
                        <FadeIn key={job.company}>
                            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                                <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-3xl">{job.company}</h3>
                                <p className="label-mono">{job.period} · {job.location}</p>
                            </div>
                            <p className="mt-1 text-fg/80">{job.role}</p>
                            <ul className="mt-4 max-w-3xl space-y-2">
                                {job.points.map((point, i) => (
                                    <li key={i} className="relative pl-6 leading-relaxed text-fg/75">
                                        <span className="absolute left-0 top-[0.75em] h-px w-3 bg-accent" aria-hidden />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>
                    ))}
                </div>
            </Block>

            <Block title="Education">
                <FadeIn>
                    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                        <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-3xl">{education.school}</h3>
                        <p className="label-mono">{education.location}</p>
                    </div>
                    <p className="mt-1 text-fg/80">{education.degree} · {education.detail}</p>
                    <p className="mt-4 max-w-3xl leading-relaxed text-fg/75">
                        Relevant coursework: {education.coursework}
                    </p>
                </FadeIn>
            </Block>

            <Block title="Technical Skills">
                <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
                    {skills.map((group) => (
                        <FadeIn key={group.title}>
                            <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{group.title}</h3>
                            <p className="mt-2 leading-relaxed text-fg/75">{group.items.join(', ')}</p>
                        </FadeIn>
                    ))}
                </div>
            </Block>

            <Block title="Activities">
                {activities.map((activity) => (
                    <FadeIn key={activity.title}>
                        <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em]">{activity.title}</h3>
                        <p className="mt-1 text-fg/80">{activity.role}</p>
                        <p className="mt-3 max-w-3xl leading-relaxed text-fg/75">{activity.detail}</p>
                    </FadeIn>
                ))}
            </Block>

            <Block title="Certifications & Languages">
                <FadeIn className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
                    <ul className="space-y-1.5 text-fg/80">
                        {certifications.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                    <ul className="space-y-1.5 text-fg/80">
                        {languages.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </FadeIn>
            </Block>
        </div>
    );
}

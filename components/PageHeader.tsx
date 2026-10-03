import { FadeIn, RevealText, Rule } from '@/components/Reveal';

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export default function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <header className="pb-12 md:pb-20">
      <FadeIn y={8}>
        <p className="eyebrow mb-4">{label}</p>
      </FadeIn>
      <RevealText
        as="h1"
        text={title}
        delay={0.1}
        className="font-display text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[1] tracking-[-0.035em]"
      />
      {description && (
        <FadeIn delay={0.3}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg/75">{description}</p>
        </FadeIn>
      )}
      <Rule className="mt-12 md:mt-16" delay={0.3} />
    </header>
  );
}

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
        <p className="label-mono mb-6">{label}</p>
      </FadeIn>
      <RevealText
        as="h1"
        text={title}
        delay={0.1}
        className="font-serif text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em]"
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

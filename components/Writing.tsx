import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';
import { FadeIn, SectionHeading } from '@/components/Reveal';
import { profile } from '@/lib/data';

interface WritingProps {
  posts: {
    id: string;
    title: string;
    brief: string;
    slug: string;
    publishedAt: string;
  }[];
}

export default function Writing({ posts }: WritingProps) {
  const hashnode = profile.socials.find((social) => social.label === 'Hashnode');

  return (
    <section id="writing" className="shell py-24 md:py-40">
      <SectionHeading label="Writing" title="Notes from the build" />

      <div className="mt-14 border-t border-line md:mt-24">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.06} y={16}>
              <Link
                href={`/blog/${post.slug}`}
                className="group relative grid grid-cols-12 items-baseline gap-x-6 gap-y-2 border-b border-line py-6 md:py-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-surface transition-transform duration-700 ease-expo group-hover:scale-y-100"
                />
                <span className="meta relative col-span-12 md:col-span-2">
                  {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                </span>
                <span className="relative col-span-11 font-display text-xl font-medium leading-tight tracking-[-0.02em] transition-transform duration-700 ease-expo group-hover:translate-x-3 md:col-span-5 md:text-2xl">
                  {post.title}
                </span>
                <span className="relative col-span-11 line-clamp-2 text-sm leading-relaxed text-muted md:col-span-4">
                  {post.brief}
                </span>
                <span className="relative col-span-1 col-start-12 row-start-2 flex justify-end md:row-start-auto">
                  <ArrowUpRight
                    className="size-5 transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                    strokeWidth={1.5}
                  />
                </span>
              </Link>
            </FadeIn>
          ))
        ) : (
          <FadeIn>
            <p className="border-b border-line py-8 text-muted">
              Posts could not be loaded here right now.{' '}
              {hashnode && (
                <a href={hashnode.href} target="_blank" rel="noopener noreferrer" className="link-underline text-fg">
                  Read them on Hashnode
                </a>
              )}
            </p>
          </FadeIn>
        )}
      </div>

      <FadeIn className="meta mt-8 flex gap-8">
        <Link href="/blog" className="link-underline transition-colors hover:text-fg">
          All articles
        </Link>
        <Link href="/daily" className="link-underline transition-colors hover:text-fg">
          Daily notes
        </Link>
      </FadeIn>
    </section>
  );
}

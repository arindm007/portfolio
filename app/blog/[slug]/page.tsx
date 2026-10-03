import { getPostBySlug } from '@/lib/hashnode';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { FadeIn, RevealText } from '@/components/Reveal';

export const revalidate = 3600;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    let post: any = null;

    try {
        const data: any = await getPostBySlug(slug);
        post = data.publication.post;
    } catch (error) {
        console.error('Error fetching post:', error);
    }

    if (!post) {
        notFound();
    }

    return (
        <div className="shell min-h-screen pb-24 pt-32 md:pt-40">
            <article className="mx-auto max-w-3xl">
                <div className="mb-10">
                    <Link href="/blog" className="label-mono group mb-10 inline-flex items-center transition-colors hover:text-fg">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-x-1" strokeWidth={1.5} />
                        Back to Blog
                    </Link>

                    <RevealText
                        as="h1"
                        text={post.title}
                        className="mb-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.04em]"
                    />

                    {post.subtitle && (
                        <p className="mb-8 text-xl text-muted">
                            {post.subtitle}
                        </p>
                    )}

                    <FadeIn delay={0.2} className="mb-10 flex items-center space-x-4">
                        {post.author.profilePicture && (
                            <img
                                src={post.author.profilePicture}
                                alt={post.author.name}
                                className="h-10 w-10 rounded-full"
                            />
                        )}
                        <div>
                            <p className="text-sm font-medium">
                                {post.author.name}
                            </p>
                            <p className="label-mono mt-1">
                                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                            </p>
                        </div>
                    </FadeIn>

                    {post.coverImage && (
                        <FadeIn delay={0.3} className="mb-12 overflow-hidden rounded-2xl border border-line">
                            <img
                                src={post.coverImage.url}
                                alt={post.title}
                                className="h-auto w-full"
                            />
                        </FadeIn>
                    )}
                </div>

                <div
                    className="prose prose-theme prose-lg max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight"
                    dangerouslySetInnerHTML={{ __html: post.content.html }}
                />
            </article>
        </div>
    );
}

import type { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import PageHeader from '@/components/PageHeader';
import { FadeIn } from '@/components/Reveal';
import { getPosts } from '@/lib/hashnode';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = { title: 'Blog' };

export default async function BlogPage() {
    let posts = [];
    try {
        const data: any = await getPosts();
        posts = data.publication.posts.edges.map((edge: any) => edge.node);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }

    return (
        <div className="shell min-h-screen pb-24 pt-36 md:pt-48">
            <PageHeader
                label="Writing"
                title="Blog"
                description="Articles, tutorials and notes on agentic AI, RAG and building backends that hold up."
            />

            <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {posts.length > 0 ? (
                    posts.map((post: any, i: number) => (
                        <FadeIn key={post.id} delay={(i % 3) * 0.08}>
                            <BlogCard {...post} />
                        </FadeIn>
                    ))
                ) : (
                    <p className="col-span-full py-12 text-lg text-muted">
                        No posts found or error fetching posts.
                    </p>
                )}
            </div>
        </div>
    );
}

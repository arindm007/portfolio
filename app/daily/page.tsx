import type { Metadata } from 'next';
import DailyCard from '@/components/DailyCard';
import PageHeader from '@/components/PageHeader';
import { FadeIn } from '@/components/Reveal';
import { getDailyPosts } from '@/lib/hashnode';

export const revalidate = 3600;

export const metadata: Metadata = { title: 'Daily notes' };

export default async function DailyPage() {
    let posts = [];
    try {
        const data: any = await getDailyPosts();
        posts = data.publication.posts.edges.map((edge: any) => edge.node);
    } catch (error) {
        console.error('Error fetching daily posts:', error);
    }

    return (
        <div className="shell min-h-screen pb-24 pt-36 md:pt-48">
            <PageHeader
                label="Today I learned"
                title="Daily notes"
                description="Short updates, things I learned today, and quick thoughts."
            />

            <div className="max-w-5xl">
                {posts.length > 0 ? (
                    posts.map((post: any, i: number) => (
                        <FadeIn key={post.id} delay={Math.min(i, 6) * 0.05} y={16}>
                            <DailyCard {...post} />
                        </FadeIn>
                    ))
                ) : (
                    <p className="py-12 text-lg text-muted">
                        No daily posts found. Tag your Hashnode posts with &quot;daily&quot; or &quot;til&quot; to see them here.
                    </p>
                )}
            </div>
        </div>
    );
}

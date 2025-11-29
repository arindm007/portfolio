import DailyCard from '@/components/DailyCard';
import { getDailyPosts } from '@/lib/hashnode';

export const revalidate = 3600;

export default async function DailyPage() {
    let posts = [];
    try {
        const data: any = await getDailyPosts();
        posts = data.publication.posts.edges.map((edge: any) => edge.node);
    } catch (error) {
        console.error('Error fetching daily posts:', error);
    }

    return (
        <div className="bg-white min-h-screen py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Daily Write-ups
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Short updates, Today I Learned (TIL), and quick thoughts.
                    </p>
                </div>

                <div className="space-y-8">
                    {posts.length > 0 ? (
                        posts.map((post: any) => (
                            <DailyCard key={post.id} {...post} />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                No daily posts found. Tag your Hashnode posts with "daily" or "til" to see them here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

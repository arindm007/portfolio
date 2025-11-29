import BlogCard from '@/components/BlogCard';
import { getPosts } from '@/lib/hashnode';

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
    let posts = [];
    try {
        const data: any = await getPosts();
        posts = data.publication.posts.edges.map((edge: any) => edge.node);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }

    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Blog
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Articles, tutorials, and insights.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.length > 0 ? (
                        posts.map((post: any) => (
                            <BlogCard key={post.id} {...post} />
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-12">
                            <p className="text-gray-500 text-lg">
                                No posts found or error fetching posts.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

import { getPostBySlug } from '@/lib/hashnode';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

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
        <div className="bg-white min-h-screen py-20">
            <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link href="/blog" className="inline-flex items-center text-indigo-600 hover:text-indigo-500 mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Blog
                    </Link>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                        {post.title}
                    </h1>

                    {post.subtitle && (
                        <p className="text-xl text-gray-500 mb-6">
                            {post.subtitle}
                        </p>
                    )}

                    <div className="flex items-center space-x-4 mb-8">
                        {post.author.profilePicture && (
                            <img
                                src={post.author.profilePicture}
                                alt={post.author.name}
                                className="h-10 w-10 rounded-full"
                            />
                        )}
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                {post.author.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                            </p>
                        </div>
                    </div>

                    {post.coverImage && (
                        <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={post.coverImage.url}
                                alt={post.title}
                                className="w-full h-auto"
                            />
                        </div>
                    )}
                </div>

                <div
                    className="prose prose-indigo prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content.html }}
                />
            </article>
        </div>
    );
}

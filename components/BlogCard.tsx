import Link from 'next/link';
import { format } from 'date-fns';

interface BlogCardProps {
    title: string;
    brief: string;
    slug: string;
    publishedAt: string;
    coverImage?: {
        url: string;
    };
}

export default function BlogCard({ title, brief, slug, publishedAt, coverImage }: BlogCardProps) {
    return (
        <Link href={`/blog/${slug}`} className="group flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="flex-shrink-0">
                {coverImage ? (
                    <img className="h-48 w-full object-cover" src={coverImage.url} alt={title} />
                ) : (
                    <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                        {format(new Date(publishedAt), 'MMMM d, yyyy')}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {title}
                    </h3>
                    <p className="mt-3 text-base text-gray-500 line-clamp-3">{brief}</p>
                </div>
                <div className="mt-6">
                    <span className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                        Read full story &rarr;
                    </span>
                </div>
            </div>
        </Link>
    );
}

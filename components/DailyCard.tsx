import Link from 'next/link';
import { format } from 'date-fns';

interface DailyCardProps {
    title: string;
    brief: string;
    slug: string;
    publishedAt: string;
}

export default function DailyCard({ title, brief, slug, publishedAt }: DailyCardProps) {
    return (
        <div className="border-l-4 border-indigo-200 pl-4 py-2 hover:border-indigo-600 transition-colors">
            <p className="text-sm text-gray-500 mb-1">
                {format(new Date(publishedAt), 'MMM d, yyyy')}
            </p>
            <h3 className="text-lg font-medium text-gray-900">
                <Link href={`/blog/${slug}`} className="hover:underline">
                    {title}
                </Link>
            </h3>
            <p className="text-gray-600 mt-1 line-clamp-2 text-sm">{brief}</p>
        </div>
    );
}

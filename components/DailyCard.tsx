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
        <Link
            href={`/blog/${slug}`}
            className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-2 border-b border-line py-6"
        >
            <p className="label-mono col-span-12 md:col-span-3">
                {format(new Date(publishedAt), 'MMM d, yyyy')}
            </p>
            <div className="col-span-12 transition-transform duration-700 ease-expo group-hover:translate-x-3 md:col-span-9">
                <h3 className="font-serif text-2xl leading-tight md:text-3xl">{title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{brief}</p>
            </div>
        </Link>
    );
}

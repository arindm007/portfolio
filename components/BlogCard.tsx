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
        <Link href={`/blog/${slug}`} className="group flex flex-col">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface">
                {coverImage ? (
                    <img
                        className="h-full w-full object-cover transition-transform duration-1000 ease-expo group-hover:scale-105"
                        src={coverImage.url}
                        alt=""
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center font-serif text-8xl italic text-muted transition-transform duration-1000 ease-expo group-hover:scale-110">
                        {title.charAt(0)}
                    </div>
                )}
            </div>
            <p className="label-mono mt-5">{format(new Date(publishedAt), 'MMMM d, yyyy')}</p>
            <h3 className="mt-2 font-serif text-3xl leading-tight transition-colors duration-500 group-hover:text-accent">
                {title}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{brief}</p>
        </Link>
    );
}

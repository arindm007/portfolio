import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
}

export default function ProjectCard({ title, description, tags, githubUrl, liveUrl, imageUrl }: ProjectCardProps) {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="flex-shrink-0">
                {imageUrl ? (
                    <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />
                ) : (
                    <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                    <p className="mt-3 text-base text-gray-500">{description}</p>
                </div>
                <div className="mt-6 flex items-center gap-4">
                    {githubUrl && (
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-500 hover:text-gray-900">
                            <Github className="h-5 w-5 mr-2" />
                            Code
                        </a>
                    )}
                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-500 hover:text-gray-900">
                            <ExternalLink className="h-5 w-5 mr-2" />
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

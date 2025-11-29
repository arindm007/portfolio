import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">Hi, I'm</span>{' '}
                            <span className="block text-indigo-600 xl:inline">Arindam Chakraborty</span>
                        </h1>
                        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                            I build accessible, pixel-perfect, performant, and web experiences. Passionate about modern web technologies and creating intuitive user interfaces.
                        </p>
                        <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/#projects"
                                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                                >
                                    View Projects
                                </Link>
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                                >
                                    Read Blog
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                        <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md overflow-hidden">
                            {/* Placeholder for profile image */}
                            <div className="aspect-w-1 aspect-h-1 bg-gray-200 w-full h-96 flex items-center justify-center text-gray-400">
                                <span className="text-lg">Profile Image Placeholder</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

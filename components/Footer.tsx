import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center space-x-6">
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">GitHub</span>
                        <Github className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Twitter</span>
                        <Twitter className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="h-6 w-6" />
                    </a>
                </div>
                <div className="mt-8 md:mt-0 md:order-1">
                    <p className="text-center text-base text-gray-400">
                        &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

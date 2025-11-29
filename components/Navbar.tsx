"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-900">
                            Portfolio
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Home
                        </Link>
                        <Link href="/#projects" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Projects
                        </Link>
                        <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Blog
                        </Link>
                        <Link href="/daily" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Daily
                        </Link>
                        <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                            About
                        </Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/#projects"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Projects
                        </Link>
                        <Link
                            href="/blog"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/daily"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Daily
                        </Link>
                        <Link
                            href="/about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

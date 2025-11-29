import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import BlogCard from '@/components/BlogCard';
import DailyCard from '@/components/DailyCard';
import { getPosts, getDailyPosts } from '@/lib/hashnode';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Placeholder data for projects
const projects = [
  {
    title: 'E-commerce Dashboard',
    description: 'A comprehensive dashboard for managing online stores, featuring real-time analytics and inventory management.',
    tags: ['Next.js', 'Tailwind CSS', 'Prisma'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://vercel.com',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management tool with drag-and-drop kanban boards and team features.',
    tags: ['React', 'Redux', 'Firebase'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://vercel.com',
    imageUrl: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Weather Forecast API',
    description: 'A robust REST API providing accurate weather data and forecasts for locations worldwide.',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

export const revalidate = 3600;

export default async function Home() {
  let posts = [];
  let dailyPosts = [];

  try {
    const postsData: any = await getPosts();
    posts = postsData.publication.posts.edges.map((edge: any) => edge.node).slice(0, 3);

    const dailyData: any = await getDailyPosts();
    dailyPosts = dailyData.publication.posts.edges.map((edge: any) => edge.node).slice(0, 5);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="space-y-12 pb-20">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content: Recent Blogs */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
                <Link href="/blog" className="text-indigo-600 hover:text-indigo-500 font-medium flex items-center">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-8">
                {posts.length > 0 ? (
                  posts.map((post: any) => (
                    <BlogCard key={post.id} {...post} />
                  ))
                ) : (
                  <p className="text-gray-500">No recent articles found.</p>
                )}
              </div>
            </section>

            <section id="projects">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                {projects.slice(0, 4).map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar: Daily Write-ups (TIL) */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Daily Write-ups</h2>
                <Link href="/daily" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                  View all
                </Link>
              </div>
              <div className="space-y-6">
                {dailyPosts.length > 0 ? (
                  dailyPosts.map((post: any) => (
                    <DailyCard key={post.id} {...post} />
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No daily write-ups found. Tag posts with "daily" or "til".
                  </p>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  About Me
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  I'm Arindam Chakraborty, a Software Engineer passionate about building great web experiences. This site is my digital garden where I share my projects, long-form articles, and daily learnings.
                </p>
                <Link href="/#about" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                  More about me &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-indigo-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                Ready to collaborate?
              </h2>
              <p className="mt-4 text-lg text-indigo-100 max-w-2xl">
                I'm currently open for new opportunities and collaborations. Let's build something amazing together.
              </p>
            </div>
            <div className="mt-8 md:mt-0 flex-shrink-0">
              <a href="mailto:hello@example.com" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

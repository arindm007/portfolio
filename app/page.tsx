import Hero from '@/components/Hero';
import Clients from '@/components/Clients';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Writing from '@/components/Writing';
import Contact from '@/components/Contact';
import { getPosts } from '@/lib/hashnode';

export const revalidate = 3600;

export default async function Home() {
  let posts = [];

  try {
    const postsData: any = await getPosts();
    posts = postsData.publication.posts.edges.map((edge: any) => edge.node).slice(0, 4);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <>
      <Hero />
      <Clients />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Writing posts={posts} />
      <Contact />
    </>
  );
}

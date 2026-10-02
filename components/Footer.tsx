import Link from 'next/link';
import LocalTime from '@/components/LocalTime';
import { profile } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell label-mono flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <Link href="/blog" className="link-underline transition-colors hover:text-fg">
            Blog
          </Link>
          <Link href="/daily" className="link-underline transition-colors hover:text-fg">
            Daily notes
          </Link>
          <Link href="/about" className="link-underline transition-colors hover:text-fg">
            Résumé
          </Link>
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline transition-colors hover:text-fg"
            >
              {social.label}
            </a>
          ))}
        </div>
        <p>
          {profile.location} · <LocalTime />
        </p>
      </div>
    </footer>
  );
}

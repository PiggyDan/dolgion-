import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { nav, profile } from "@/data/profile";
import MobileNav from "./MobileNav";

export function Header() {
  return (
    <header className="header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="nav shell">
        <Link className="brand" href="/" aria-label={`${profile.name}, home`}>
          <span className="brand-avatar">
            <Image src="/dolgion-avatar.webp" alt="" width={34} height={34} priority />
            <span className="brand-dot" aria-hidden="true" />
          </span>
          <span>{profile.name}</span>
        </Link>
        <nav className="nav-links" aria-label="Main">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-sm btn-primary nav-cv" href={profile.cv.href} target="_blank" rel="noopener">
          <Download size={15} aria-hidden="true" /> CV
        </a>
        <MobileNav />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location}</span>
        <a href={profile.linkedin} target="_blank" rel="noopener">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noopener">
          GitHub
        </a>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <span className="powered">
          Powered by <strong>Daniel Knight</strong>
        </span>
      </div>
    </footer>
  );
}

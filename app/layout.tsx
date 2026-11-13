import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { employer, profile } from "@/data/profile";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-serif", display: "swap" });

const title = `${profile.name}: Systems Engineer`;
const description =
  "Systems engineer in Ulaanbaatar, Mongolia: VMware ESXi, Windows Server, Linux, Check Point networking, an in-progress Odoo 13 → 19 migration, and ITCore, a help desk SaaS I built. Open to international remote work and relocation.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  keywords: [
    "Systems Engineer",
    "Infrastructure Engineer",
    "IT Operations",
    "DevOps",
    "VMware ESXi",
    "Windows Server",
    "Linux",
    "Check Point",
    "Odoo 19 migration",
    "Remote",
    "Relocation",
    "Mongolia",
  ],
  openGraph: { title, description, url: "/", siteName: profile.name, type: "profile", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0d1320",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Systems Engineer",
  url: profile.site,
  email: `mailto:${profile.email}`,
  image: `${profile.site}/dolgion-avatar.webp`,
  address: { "@type": "PostalAddress", addressLocality: "Ulaanbaatar", addressCountry: "MN" },
  worksFor: { "@type": "Organization", name: employer.name, url: employer.site },
  knowsAbout: ["VMware ESXi", "Windows Server", "Linux", "Check Point", "Networking", "PostgreSQL", "Odoo", "Python", "TypeScript"],
  sameAs: [profile.linkedin, profile.github],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        {children}
      </body>
    </html>
  );
}

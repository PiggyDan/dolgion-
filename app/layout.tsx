import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import { employer, profile } from "@/data/profile";
import "./globals.css";

const display = Manrope({ subsets: ["latin", "cyrillic", "cyrillic-ext"], variable: "--font-display", weight: ["500", "700", "800"] });
const body = Inter({ subsets: ["latin", "cyrillic", "cyrillic-ext"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic-ext"], variable: "--font-mono" });

const title = "O. Dolgion — IT Infrastructure & Systems Engineer";
const description =
  "IT Infrastructure & Systems Engineer in Mongolia: Windows & Linux administration, networking, VMware virtualization and ERP operations. Currently leading an Odoo 13 → Odoo 19 Community migration. Open to international roles.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title,
  description,
  alternates: { canonical: "/" },
  keywords: [
    "Dolgion",
    "IT Infrastructure Engineer",
    "Systems Engineer",
    "Systems Administrator",
    "Linux Systems Administrator",
    "IT Support Engineer",
    "ERP Technical Support",
    "Odoo 19 migration",
    "VMware ESXi",
    "Mongolia",
  ],
  authors: [{ name: profile.fullName, url: profile.site }],
  openGraph: {
    title,
    description,
    url: "/",
    type: "profile",
    locale: "en_US",
    alternateLocale: ["mn_MN"],
    images: [{ url: "/dolgion-hero.png", alt: "Portrait of O. Dolgion" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/dolgion-hero.png"] },
};

export const viewport: Viewport = {
  themeColor: "#06080d",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  jobTitle: profile.headline.en,
  url: profile.site,
  email: `mailto:${profile.email}`,
  image: `${profile.site}/dolgion-hero.png`,
  address: { "@type": "PostalAddress", addressLocality: "Ulaanbaatar", addressCountry: "MN" },
  worksFor: { "@type": "Organization", name: employer.name, url: employer.site },
  knowsAbout: ["Windows Server", "Linux", "Networking", "VMware ESXi", "PostgreSQL", "Odoo ERP", "Python"],
  sameAs: [profile.github],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        {children}
      </body>
    </html>
  );
}

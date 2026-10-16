import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const display = Manrope({ subsets: ["latin", "cyrillic", "cyrillic-ext"], variable: "--font-display", weight: ["500", "700", "800"] });
const body = Inter({ subsets: ["latin", "cyrillic", "cyrillic-ext"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic-ext"], variable: "--font-mono" });

const description =
  "System Engineer and product builder. Creator of IT Core (itcore.dev), led the ERP 19 migration from Odoo 13 to Odoo 19, and builds websites wired to real systems.";

export const metadata: Metadata = {
  metadataBase: new URL("https://daniel70.netlify.app"),
  title: "O. Dolgion — System Engineer & builder of IT Core",
  description,
  keywords: ["Dolgion", "IT Core", "itcore.dev", "sup.itcore.dev", "Odoo 19", "ERP", "System Engineer", "DevOps", "Mongolia"],
  openGraph: {
    title: "Dolgion — System Engineer & builder of IT Core",
    description,
    type: "website",
    images: ["/dolgion-hero.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#06080d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

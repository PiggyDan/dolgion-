import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "O. Dolgion",
  description:
    "System Engineer working across infrastructure, networking, virtualization, ERP integration and full-stack development.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Dolgion — System Engineer",
    description:
      "Infrastructure + software. Production IT, DevOps, ERP integration and full-stack engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

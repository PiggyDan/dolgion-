import type { MetadataRoute } from "next";
import { caseStudies, profile } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.site, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((s) => ({ url: `${profile.site}/work/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}

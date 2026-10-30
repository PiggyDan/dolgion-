import { caseStudies, profile } from "@/data/profile";
import { ogCard, ogSize } from "@/lib/og";

export const alt = `Case study by ${profile.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  return ogCard({ kicker: study ? `Case study · ${study.kicker}` : "Case study", title: study?.title ?? profile.name });
}

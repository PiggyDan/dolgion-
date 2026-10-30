import { hero, profile } from "@/data/profile";
import { ogCard, ogSize } from "@/lib/og";

export const alt = `${profile.name}: Systems Engineer`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogCard({ kicker: profile.positioning.join("  |  "), title: hero.title });
}

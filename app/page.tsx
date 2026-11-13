import Link from "next/link";
import World from "@/components/world/World";
import type { Shots } from "@/components/world/Panels";
import { caseStudies, hero, profile } from "@/data/profile";
import { pngShot } from "@/lib/shots";
import "./world.css";

export default function Home() {
  const shots: Shots = {};
  for (const s of caseStudies) {
    shots[s.slug] = s.screenshots.map((x) => pngShot(x.file, x.alt, x.caption)).filter((x) => x !== null);
  }

  return (
    <>
      {/* Readable without the world: for search engines, screen readers and no-JS. */}
      <div className="sr-only">
        <h1>
          {profile.name}: {profile.positioning.join(", ")}
        </h1>
        <p>{hero.lead}</p>
        <ul>
          {caseStudies.map((s) => (
            <li key={s.slug}>
              <Link href={`/work/${s.slug}`}>{s.title}</Link>
            </li>
          ))}
        </ul>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
      <World shots={shots} />
    </>
  );
}

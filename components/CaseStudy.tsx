import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CaseStudy, Tone } from "@/data/profile";
import type { Shot } from "@/lib/shots";

export function StatusBadge({ label, tone }: { label: string; tone: Tone }) {
  return (
    <span className={`status status-${tone}`}>
      <span className="status-dot" aria-hidden="true" />
      {label}
    </span>
  );
}

export function CaseCard({ study, media, featured }: { study: CaseStudy; media?: ReactNode; featured?: boolean }) {
  return (
    <article className={`case-card reveal${featured ? " featured" : ""}`}>
      {media && <div className="case-media">{media}</div>}
      <div className="case-body">
        <div className="case-card-top">
          <span className="case-index mono">{study.index}</span>
          <StatusBadge label={study.status.label} tone={study.status.tone} />
        </div>
        <p className="kicker">{study.kicker}</p>
        <h3>
          <Link href={`/work/${study.slug}`} className="stretched">
            {study.title}
          </Link>
        </h3>
        <p className="case-summary">{study.summary}</p>
        <ul className="tags" aria-label="Technologies">
          {study.stack.slice(0, featured ? 8 : 5).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <span className="case-more" aria-hidden="true">
          Read case study <ArrowRight size={16} />
        </span>
      </div>
    </article>
  );
}

/** Small decorative stack of a case study's real architecture layer names. */
export function LayerStack({ layers }: { layers: CaseStudy["architecture"]["layers"] }) {
  return (
    <div className="layer-stack" aria-hidden="true">
      {layers.map((l, i) => (
        <span key={l.name} style={{ marginInline: `${i * 14}px` }}>
          {l.name}
        </span>
      ))}
    </div>
  );
}

/** Layered architecture diagram rendered as an ordered list, so it reads correctly without CSS. */
export function LayerDiagram({ layers, note }: { layers: CaseStudy["architecture"]["layers"]; note?: string }) {
  return (
    <figure className="diagram">
      <ol className="layers">
        {layers.map((layer) => (
          <li key={layer.name} className="layer">
            <span className="layer-name">{layer.name}</span>
            <ul className="layer-items">
              {layer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      {note && <figcaption>{note}</figcaption>}
    </figure>
  );
}

export function Screenshot({ shot }: { shot: Shot }) {
  return (
    <figure className="shot">
      <a href={shot.src} target="_blank" rel="noopener" className="shot-frame" aria-label={`${shot.alt}: open full size`}>
        <Image src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} sizes="(max-width: 900px) 100vw, 860px" />
      </a>
      <figcaption>
        {shot.caption}{" "}
        <a href={shot.src} target="_blank" rel="noopener" className="text-link">
          Full size <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}

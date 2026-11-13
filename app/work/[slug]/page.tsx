import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { LayerDiagram, Screenshot, StatusBadge } from "@/components/CaseStudy";
import { caseStudies, profile } from "@/data/profile";
import { pngShot } from "@/lib/shots";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  const url = `/work/${study.slug}`;
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: url },
    openGraph: { title: study.title, description: study.summary, url, type: "article" },
    twitter: { card: "summary_large_image", title: study.title, description: study.summary },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const index = caseStudies.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const study = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const shots = study.screenshots.map((s) => pngShot(s.file, s.alt, s.caption)).filter((s) => s !== null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: study.title,
        description: study.summary,
        url: `${profile.site}/work/${study.slug}`,
        author: { "@type": "Person", name: profile.name, url: profile.site },
        keywords: study.stack.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: profile.site },
          { "@type": "ListItem", position: 2, name: "Work", item: `${profile.site}/#work` },
          { "@type": "ListItem", position: 3, name: study.title },
        ],
      },
    ],
  };

  return (
    <article className="study shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="crumbs">
        <Link href="/?p=work" className="text-link">
          <ArrowLeft size={14} aria-hidden="true" /> All work
        </Link>
      </nav>

      <header className="study-head">
        <p className="kicker">
          <span className="mono">{study.index}</span> · {study.kicker}
        </p>
        <h1>{study.title}</h1>
        <p className="lead">{study.summary}</p>
        <dl className="study-meta">
          <div>
            <dt>Status</dt>
            <dd>
              <StatusBadge label={study.status.label} tone={study.status.tone} />
            </dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>{study.role}</dd>
          </div>
          <div>
            <dt>Period</dt>
            <dd>{study.period}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{study.stack.join(" · ")}</dd>
          </div>
        </dl>
        {study.links && (
          <p className="study-links">
            {study.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener" className="text-link">
                {l.label} <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ))}
          </p>
        )}
      </header>

      <div className="study-body">
        <section aria-labelledby="problem">
          <h2 id="problem">The problem</h2>
          {study.problem.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>

        <section aria-labelledby="role">
          <h2 id="role">What I'm responsible for</h2>
          <ul className="bullets">
            {study.responsibilities.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="architecture">
          <h2 id="architecture">Architecture</h2>
          <p>{study.architecture.intro}</p>
          <LayerDiagram layers={study.architecture.layers} note={study.architecture.note} />
        </section>

        <section aria-labelledby="decisions">
          <h2 id="decisions">Engineering decisions</h2>
          <div className="pairs">
            {study.decisions.map((d) => (
              <div key={d.title} className="pair">
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="challenges">
          <h2 id="challenges">Technical challenges</h2>
          <div className="pairs">
            {study.challenges.map((c) => (
              <div key={c.title} className="pair">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="status">
          <h2 id="status">Current status</h2>
          <div className="progress-grid">
            {study.progress.map((group) => (
              <div key={group.label} className={`progress-col tone-${group.tone}`}>
                <h3>
                  <StatusBadge label={group.label} tone={group.tone} />
                </h3>
                <ul className="bullets">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="outcomes">
          <h2 id="outcomes">Outcomes so far</h2>
          {study.facts && (
            <dl className="facts-row">
              {study.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <ul className="bullets">
            {study.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          {study.outcomesNote && <p className="note">{study.outcomesNote}</p>}
        </section>

        {shots.length > 0 && (
          <section aria-labelledby="screenshots">
            <h2 id="screenshots">Screenshots</h2>
            <div className="shots">
              {shots.map((shot) => (
                <Screenshot key={shot.src} shot={shot} />
              ))}
            </div>
            {study.screenshotsNote && <p className="note">{study.screenshotsNote}</p>}
          </section>
        )}
      </div>

      <nav className="study-next" aria-label="Next case study">
        <Link href={`/work/${next.slug}`} className="next-card">
          <span className="eyebrow">Next case study</span>
          <span className="next-title">{next.title}</span>
          <ArrowRight size={20} aria-hidden="true" />
        </Link>
        <a className="btn btn-outline" href={`mailto:${profile.email}?subject=Role%20enquiry`}>
          Get in touch
        </a>
      </nav>
    </article>
  );
}

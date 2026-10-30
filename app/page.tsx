import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Database,
  Download,
  Github,
  LifeBuoy,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Server,
  ShieldCheck,
} from "lucide-react";
import { CaseCard, LayerStack, StatusBadge } from "@/components/CaseStudy";
import { about, caseStudies, experience, hero, otherWork, profile, skills } from "@/data/profile";
import { pngShot } from "@/lib/shots";

const skillIcons = [Server, ShieldCheck, Database, Code2, LifeBuoy];

// Static, sourced from the case studies and experience. No animated counters.
const quickFacts = [
  { value: "~11", label: "companies' infrastructure I'm responsible for" },
  { value: "375", label: "Odoo modules audited for the migration" },
  { value: "90+", label: "ITCore releases in its first 4 weeks" },
  { value: "2022", label: "the year I started working in IT" },
];

function SectionHead({ id, eyebrow, title, lead }: { id: string; eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="section-head reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

export default function Home() {
  const [odoo, infrascope, itcore, infra] = caseStudies;
  const odooShot = pngShot("images/odoo19.png", "", "");
  const infrascopeShot = pngShot("images/infrascope-dashboard-dark.png", "", "");

  return (
    <>
      <div className="hero-bg" aria-hidden="true" />
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="pill">
            <span className="status-dot" aria-hidden="true" />
            {profile.availability}
          </p>
          <h1 id="hero-title">
            Building reliable systems. <span className="accent-text">Solving real problems.</span>
          </h1>
          <p className="hero-positioning">
            {profile.positioning.map((p, i) => (
              <span key={p}>
                {i > 0 && <span className="sep" aria-hidden="true">/</span>}
                {p}
              </span>
            ))}
          </p>
          <p className="hero-lead">{hero.lead}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#work">
              View case studies <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="btn btn-outline" href={profile.cv.href} target="_blank" rel="noopener">
              <Download size={17} aria-hidden="true" /> Download CV
            </a>
          </div>
        </div>

        <aside className="profile-card" aria-label="At a glance">
          <div className="profile-top">
            <Image src="/dolgion-avatar.webp" alt="" width={56} height={56} className="profile-avatar" />
            <div>
              <p className="profile-name">{profile.name}</p>
              <p className="profile-role">System Engineer & IT Manager</p>
            </div>
          </div>
          <dl className="profile-list">
            <div>
              <dt>Now</dt>
              <dd>
                Odoo 13 → 19 migration <StatusBadge label="In progress" tone="progress" />
              </dd>
            </div>
            <div>
              <dt>Building</dt>
              <dd>
                ITCore help desk <StatusBadge label="Live" tone="live" />
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{profile.location} · UTC+8</dd>
            </div>
            <div>
              <dt>Open to</dt>
              <dd>Remote · Relocation</dd>
            </div>
          </dl>
          <a className="profile-mail" href={`mailto:${profile.email}`}>
            <Mail size={16} aria-hidden="true" /> {profile.email}
          </a>
          <div className="profile-social">
            <a href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn profile">
              <Linkedin size={17} aria-hidden="true" /> LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener" aria-label="GitHub profile">
              <Github size={17} aria-hidden="true" /> GitHub
            </a>
          </div>
        </aside>
      </section>

      <section className="shell facts-strip" aria-label="Quick facts">
        {quickFacts.map((f) => (
          <div key={f.label} className="reveal">
            <strong>{f.value}</strong>
            <span>{f.label}</span>
          </div>
        ))}
      </section>

      <section className="section shell" aria-labelledby="work">
        <SectionHead
          id="work"
          eyebrow="Selected work"
          title="Case studies"
          lead="An ERP migration in progress, an open-source monitoring tool, a product I built and run, and the infrastructure I look after every day. Each one says what's finished and what isn't."
        />
        <div className="bento">
          <CaseCard
            study={odoo}
            featured
            media={
              odooShot && (
                <Image src={odooShot.src} width={odooShot.width} height={odooShot.height} alt="" sizes="(max-width: 960px) 100vw, 640px" />
              )
            }
          />
          <CaseCard
            study={infrascope}
            featured
            media={
              infrascopeShot && (
                <Image
                  src={infrascopeShot.src}
                  width={infrascopeShot.width}
                  height={infrascopeShot.height}
                  alt=""
                  sizes="(max-width: 960px) 100vw, 640px"
                />
              )
            }
          />
          <CaseCard
            study={itcore}
            media={
              <div className="media-logo">
                <Image src="/itcore-logo.png" alt="" width={88} height={88} />
              </div>
            }
          />
          <CaseCard study={infra} media={<LayerStack layers={infra.architecture.layers} />} />
        </div>

        <h3 className="sub-head reveal">Other projects</h3>
        <ul className="other-grid">
          {otherWork.map((w) => (
            <li key={w.name} className="other reveal">
              <p className="kicker">{w.kind}</p>
              <h4>{w.name}</h4>
              <p>{w.text}</p>
              <ul className="tags">
                {w.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              {w.links.length > 0 ? (
                <p className="other-links">
                  {w.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener" className="text-link">
                      {l.label} <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ))}
                </p>
              ) : (
                <p className="other-links muted">Internal, not public</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="section shell" aria-labelledby="experience">
        <SectionHead id="experience" eyebrow="Experience" title="Where I've worked" />
        <ol className="timeline">
          {experience.map((job, i) => (
            <li key={job.company} className={`job reveal${i === 0 ? " current" : ""}`}>
              <span className="job-dot" aria-hidden="true" />
              <div className="job-card">
                <div className="job-head">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="job-company">{job.company}</p>
                  </div>
                  <div className="job-meta">
                    <p className="job-period mono">{job.period}</p>
                    <p className="job-context">{job.context}</p>
                  </div>
                </div>
                <ul className="bullets">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section shell" aria-labelledby="skills">
        <SectionHead id="skills" eyebrow="Skills" title="Technical capabilities" lead="Grouped by where I actually use them. No self-rated percentages." />
        <div className="skill-grid">
          {skills.map((s, i) => {
            const Icon = skillIcons[i % skillIcons.length];
            return (
              <div key={s.group} className="skill reveal">
                <span className="skill-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <h3>{s.group}</h3>
                <p className="skill-context">{s.context}</p>
                <ul className="tags">
                  {s.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section shell" aria-labelledby="about">
        <div className="about">
          <div className="about-copy reveal">
            <p className="eyebrow">About</p>
            <h2 id="about">From a remote mine site to multi-company infrastructure</h2>
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="about-side reveal">
            <div className="about-photo">
              <Image src="/dolgion-hero.png" alt={`${profile.name} sitting with an acoustic guitar`} fill sizes="(max-width: 960px) 100vw, 420px" />
            </div>
            <dl className="facts">
              {about.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section shell" aria-labelledby="contact">
        <div className="contact-card reveal">
          <p className="eyebrow">Contact</p>
          <h2 id="contact">Hiring for a systems or infrastructure role?</h2>
          <p className="lead">
            I'm open to international remote positions and to relocation with visa sponsorship. Email is the fastest way to reach me. I'm on
            Ulaanbaatar time (UTC+8).
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={`mailto:${profile.email}?subject=Role%20enquiry`}>
              <Mail size={17} aria-hidden="true" /> {profile.email}
            </a>
            <a className="btn btn-outline" href={profile.cv.href} target="_blank" rel="noopener">
              <Download size={17} aria-hidden="true" /> {profile.cv.label}
            </a>
          </div>
          <ul className="contact-list">
            <li>
              <Linkedin size={16} aria-hidden="true" />
              <a href={profile.linkedin} target="_blank" rel="noopener">
                linkedin.com/in/dolgion-o
              </a>
            </li>
            <li>
              <Phone size={16} aria-hidden="true" />
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
            </li>
            <li>
              <Github size={16} aria-hidden="true" />
              <a href={profile.github} target="_blank" rel="noopener">
                github.com/PiggyDan
              </a>
            </li>
            <li>
              <Download size={16} aria-hidden="true" />
              <a href={profile.cvMn.href} target="_blank" rel="noopener">
                {profile.cvMn.label}
              </a>
            </li>
            <li>
              <MapPin size={16} aria-hidden="true" />
              <span>{profile.location}</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

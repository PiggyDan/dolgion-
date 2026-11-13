"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Download, Facebook, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { about, caseStudies, experience, otherWork, profile, skills, type CaseStudy, type Tone } from "@/data/profile";
import type { Shot } from "@/lib/shots";

export type Shots = Record<string, Shot[]>;

/* ---------- small pieces ---------- */

function Tabs<T extends string>({ items, value, onChange, label }: { items: T[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div className="w-tabs" role="tablist" aria-label={label}>
      {items.map((it) => (
        <button key={it} role="tab" aria-selected={it === value} className="w-tab" onClick={() => onChange(it)}>
          {it}
        </button>
      ))}
    </div>
  );
}

/** Shows one item at a time with prev / next, so nothing ever needs scrolling. */
function Pager<T>({ items, render, label }: { items: T[]; render: (item: T, i: number) => ReactNode; label: string }) {
  const [i, setI] = useState(0);
  const n = items.length;
  if (!n) return null;
  const k = Math.min(i, n - 1);
  return (
    <div className="w-pager">
      <div className="w-pager-body" key={k}>
        {render(items[k], k)}
      </div>
      {n > 1 && (
        <div className="w-pager-nav">
          <button className="w-icon" onClick={() => setI((k - 1 + n) % n)} aria-label={`Previous ${label}`}>
            <ChevronLeft size={16} />
          </button>
          <span className="w-count">
            {k + 1} / {n}
          </span>
          <button className="w-icon" onClick={() => setI((k + 1) % n)} aria-label={`Next ${label}`}>
            <ChevronRight size={16} />
          </button>
          <span className="w-dots" aria-hidden="true">
            {items.map((_, j) => (
              <i key={j} className={j === k ? "on" : ""} />
            ))}
          </span>
        </div>
      )}
    </div>
  );
}

/** True on phones and short windows, where long lists are split into pages. */
function useCompact() {
  const [c, setC] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px), (max-height: 720px)");
    const on = () => setC(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return c;
}
const chunk = <T,>(a: T[], n: number) => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));

/** A bullet list that pages itself instead of scrolling. */
function PagedList({ items, size, label }: { items: string[]; size: number; label: string }) {
  const compact = useCompact();
  const n = compact ? size : items.length;
  return (
    <Pager
      label={label}
      items={chunk(items, n)}
      render={(part) => (
        <ul className="w-list">
          {part.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    />
  );
}

const Dot = ({ tone }: { tone: Tone }) => <i className={`w-dot tone-${tone}`} aria-hidden="true" />;
const Chips = ({ items }: { items: string[] }) => (
  <ul className="w-chips">
    {items.map((s) => (
      <li key={s}>{s}</li>
    ))}
  </ul>
);
const Ext = ({ href, children }: { href: string; children: ReactNode }) => (
  <a className="w-link" href={href} target="_blank" rel="noopener">
    {children} <ArrowUpRight size={13} aria-hidden="true" />
  </a>
);

/* ---------- Work ---------- */

type CaseTab = "Overview" | "Facts" | "Architecture" | "Decisions" | "Challenges" | "Status" | "Results" | "Screens";

export function WorkPanel({ shots }: { shots: Shots }) {
  const [view, setView] = useState<{ kind: "list" } | { kind: "case"; i: number } | { kind: "other" }>({ kind: "list" });
  const [tab, setTab] = useState<CaseTab>("Overview");

  if (view.kind === "list")
    return (
      <div className="w-stack">
        <p className="w-lead">Four case studies from my current work. Pick one.</p>
        <ul className="w-cases">
          {caseStudies.map((s, i) => (
            <li key={s.slug}>
              <button
                className="w-case"
                onClick={() => {
                  setView({ kind: "case", i });
                  setTab("Overview");
                }}
              >
                <span className="w-case-i">{s.index}</span>
                <span className="w-case-main">
                  <span className="w-case-t">{s.title}</span>
                  <span className="w-case-k">
                    <Dot tone={s.status.tone} /> {s.kicker}
                  </span>
                </span>
                <ArrowRight size={16} className="w-case-go" aria-hidden="true" />
              </button>
            </li>
          ))}
          <li>
            <button className="w-case w-case-other" onClick={() => setView({ kind: "other" })}>
              <span className="w-case-i">+</span>
              <span className="w-case-main">
                <span className="w-case-t">Other work</span>
                <span className="w-case-k">{otherWork.length} client sites, internal tools and apps</span>
              </span>
              <ArrowRight size={16} className="w-case-go" aria-hidden="true" />
            </button>
          </li>
        </ul>
      </div>
    );

  const back = (
    <button className="w-back" onClick={() => setView({ kind: "list" })}>
      <ArrowLeft size={14} /> All work
    </button>
  );

  if (view.kind === "other")
    return (
      <div className="w-stack">
        {back}
        <Pager
          label="project"
          items={otherWork}
          render={(w) => (
            <div className="w-stack">
              <p className="w-eyebrow">{w.kind}</p>
              <h3 className="w-h3">{w.name}</h3>
              <p>{w.text}</p>
              <Chips items={w.stack} />
              {w.links.map((l) => (
                <Ext key={l.href} href={l.href}>
                  {l.label}
                </Ext>
              ))}
            </div>
          )}
        />
      </div>
    );

  const s = caseStudies[view.i];
  const caseShots = shots[s.slug] ?? [];
  const tabs: CaseTab[] = ["Overview", ...(s.facts ? (["Facts"] as CaseTab[]) : []), "Architecture", "Decisions", "Challenges", "Status", "Results", ...(caseShots.length ? (["Screens"] as CaseTab[]) : [])];
  const go = (d: number) => {
    const n = caseStudies.length;
    setView({ kind: "case", i: (view.i + d + n) % n });
    setTab("Overview");
  };

  return (
    <div className="w-stack">
      <div className="w-row">
        {back}
        <span className="w-row-end">
          <button className="w-icon" onClick={() => go(-1)} aria-label="Previous case study">
            <ChevronLeft size={16} />
          </button>
          <span className="w-count">
            {view.i + 1} / {caseStudies.length}
          </span>
          <button className="w-icon" onClick={() => go(1)} aria-label="Next case study">
            <ChevronRight size={16} />
          </button>
        </span>
      </div>
      <p className="w-eyebrow">{s.kicker}</p>
      <h3 className="w-h3">{s.title}</h3>
      <Tabs label="Case study sections" items={tabs} value={tabs.includes(tab) ? tab : "Overview"} onChange={setTab} />
      <div className="w-tabbody" key={`${s.slug}-${tab}`}>
        {tab === "Overview" && (
          <div className="w-stack">
            <p className="w-status">
              <Dot tone={s.status.tone} /> {s.status.label}
            </p>
            <p>{s.summary}</p>
            <dl className="w-meta">
              <div>
                <dt>Role</dt>
                <dd>{s.role}</dd>
              </div>
              <div>
                <dt>Period</dt>
                <dd>{s.period}</dd>
              </div>
            </dl>
          </div>
        )}
        {tab === "Facts" && s.facts && <Facts facts={s.facts} stack={s.stack} />}
        {tab === "Architecture" && (
          <div className="w-stack">
            <p>{s.architecture.intro}</p>
            <Layers layers={s.architecture.layers} />
            {s.architecture.note && <p className="w-note">{s.architecture.note}</p>}
          </div>
        )}
        {tab === "Decisions" && (
          <Pager
            label="decision"
            items={s.decisions}
            render={(d) => (
              <div className="w-stack">
                <h4 className="w-h4">{d.title}</h4>
                <p>{d.text}</p>
              </div>
            )}
          />
        )}
        {tab === "Challenges" && (
          <Pager
            label="challenge"
            items={s.challenges}
            render={(d) => (
              <div className="w-stack">
                <h4 className="w-h4">{d.title}</h4>
                <p>{d.text}</p>
              </div>
            )}
          />
        )}
        {tab === "Status" && <Status groups={s.progress} />}
        {tab === "Results" && (
          <div className="w-stack">
            <PagedList items={s.outcomes} size={2} label="result" />
            {s.outcomesNote && <p className="w-note">{s.outcomesNote}</p>}
            <div className="w-links">
              {s.links?.map((l) => (
                <Ext key={l.href} href={l.href}>
                  {l.label}
                </Ext>
              ))}
              <Link className="w-link" href={`/work/${s.slug}`}>
                Full write-up <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
        {tab === "Screens" && (
          <Pager
            label="screenshot"
            items={caseShots}
            render={(sh) => (
              <figure className="w-shot">
                <Image src={sh.src} width={sh.width} height={sh.height} alt={sh.alt} sizes="440px" />
                <figcaption>{sh.caption}</figcaption>
              </figure>
            )}
          />
        )}
      </div>
    </div>
  );
}

function Facts({ facts, stack }: { facts: NonNullable<CaseStudy["facts"]>; stack: string[] }) {
  const compact = useCompact();
  const grid = (
    <ul className="w-facts">
      {facts.map((f) => (
        <li key={f.label}>
          <strong>{f.value}</strong>
          <span>{f.label}</span>
        </li>
      ))}
    </ul>
  );
  const tech = (
    <div className="w-stack">
      <p className="w-eyebrow">Stack</p>
      <Chips items={stack} />
    </div>
  );
  return compact ? <Pager label="page" items={[grid, tech]} render={(x) => x} /> : <div className="w-stack">{grid}{tech}</div>;
}

function Layers({ layers }: { layers: CaseStudy["architecture"]["layers"] }) {
  const compact = useCompact();
  const list = (part: typeof layers) => (
    <ol className="w-layers">
      {part.map((l) => (
        <li key={l.name}>
          <strong>{l.name}</strong>
          <span>{l.items.join(" · ")}</span>
        </li>
      ))}
    </ol>
  );
  return compact ? <Pager label="layers" items={chunk(layers, 2)} render={list} /> : list(layers);
}

function Status({ groups }: { groups: CaseStudy["progress"] }) {
  const compact = useCompact();
  const render = (g: CaseStudy["progress"][number]) => (
    <div key={g.label}>
      <p className="w-status">
        <Dot tone={g.tone} /> {g.label}
      </p>
      <ul className="w-list">
        {g.items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
  return compact ? <Pager label="group" items={groups} render={render} /> : <div className="w-progress">{groups.map(render)}</div>;
}

/* ---------- Experience ---------- */

export function ExperiencePanel() {
  const [i, setI] = useState(0);
  const e = experience[i];
  return (
    <div className="w-stack">
      <p className="w-lead">Each hop on the route is a role. Newest first.</p>
      <ol className="w-timeline" role="tablist" aria-label="Roles">
        {experience.map((x, k) => (
          <li key={x.company}>
            <button role="tab" aria-selected={k === i} onClick={() => setI(k)}>
              <span className="w-tl-year">{x.period.match(/\d{4}/)?.[0]}</span>
              <span className="w-tl-co">{x.company.split(" ")[0].replace("/", "")}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="w-stack w-tabbody" key={i}>
        <div>
          <h3 className="w-h3">{e.role}</h3>
          <p className="w-sub">
            {e.company} · {e.period}
          </p>
          <p className="w-note">{e.context}</p>
        </div>
        <PagedList items={e.bullets} size={3} label="page" />
      </div>
    </div>
  );
}

/* ---------- Skills: a small PowerShell console ---------- */

const SHORT = ["Infra", "Network", "ERP", "Software", "Ops"];

function findGroup(arg: string) {
  const a = arg.trim().toLowerCase().replace(/^["']|["']$/g, "");
  if (!a) return -1;
  const n = Number(a);
  if (n >= 1 && n <= skills.length) return n - 1;
  return skills.findIndex((s, i) => SHORT[i].toLowerCase().startsWith(a) || s.group.toLowerCase().includes(a));
}

type Out = { cmd: string; out: ReactNode };

function groupOut(i: number): ReactNode {
  const g = skills[i];
  return (
    <>
      <div className="ps-kv">
        <span>Group</span>: {g.group}
      </div>
      <div className="ps-kv">
        <span>Context</span>: {g.context}
      </div>
      <div className="ps-head">Name</div>
      <div className="ps-rule">----</div>
      <ul className="ps-items">
        {g.items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </>
  );
}

function listOut(): ReactNode {
  return (
    <>
      <div className="ps-dim">    Directory: C:\Users\Dolgion\Skills</div>
      <div className="ps-table">
        <span className="ps-head">#</span>
        <span className="ps-head">Count</span>
        <span className="ps-head">Name</span>
        <span className="ps-rule">-</span>
        <span className="ps-rule">-----</span>
        <span className="ps-rule">----</span>
        {skills.map((s, i) => (
          <Fragment key={s.group}>
            <span>{i + 1}</span>
            <span>{s.items.length}</span>
            <span>{s.group}</span>
          </Fragment>
        ))}
      </div>
      <div className="ps-dim">Tip: Get-Skills -Group Network</div>
    </>
  );
}

function helpOut(): ReactNode {
  return (
    <div className="ps-table ps-table-2">
      {[
        ["Get-Skills", "list skill groups (also: dir, ls)"],
        ["Get-Skills -Group <name|#>", "show one group"],
        ["whoami", "who runs this box"],
        ["cls", "clear the screen"],
      ].map(([c, d]) => (
        <Fragment key={c}>
          <span className="ps-cmd">{c}</span>
          <span className="ps-dim">{d}</span>
        </Fragment>
      ))}
    </div>
  );
}

function run(raw: string): Out | null {
  const cmd = raw.trim();
  const lc = cmd.toLowerCase();
  if (!cmd) return { cmd: "", out: null };
  if (lc === "cls" || lc === "clear" || lc === "clear-host") return null;
  if (lc === "help" || lc === "get-help" || lc === "?") return { cmd, out: helpOut() };
  if (lc === "whoami") return { cmd, out: <div>{`gk\\dolgion  ·  ${profile.positioning[0]}, ${profile.location}`}</div> };
  if (["dir", "ls", "get-childitem", "gci", "get-skills"].includes(lc)) return { cmd, out: listOut() };
  const m = lc.match(/^(?:get-skills|gs)\s+(?:-group\s+)?(.+)$/) ?? lc.match(/^(?:cd|cat|type)\s+(.+)$/);
  if (m) {
    const i = findGroup(m[1]);
    if (i >= 0) return { cmd, out: groupOut(i) };
    return { cmd, out: <div className="ps-err">{`Get-Skills : No group matches '${m[1]}'. Try: ${SHORT.join(", ")}`}</div> };
  }
  const word = cmd.split(/\s+/)[0];
  return {
    cmd,
    out: (
      <div className="ps-err">
        {`${word} : The term '${word}' is not recognized as the name of a cmdlet, function, script file, or operable program.`}
        <br />
        {"Try 'help'."}
      </div>
    ),
  };
}

export function SkillsPanel() {
  const [entries, setEntries] = useState<Out[]>(() => [{ cmd: "Get-Skills -Group Infra", out: groupOut(0) }]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) inputRef.current?.focus({ preventScroll: true });
  }, []);

  const exec = (c: string) => {
    const r = run(c);
    // keep only the latest command on screen: the console never scrolls
    setEntries(r ? [r] : []);
    if (c.trim()) setHist((h) => [c, ...h].slice(0, 30));
    setHi(-1);
    setInput("");
  };

  return (
    <div className="w-stack">
      <p className="w-lead">Type a command, or click one below. Try <code>help</code>.</p>
      <div className="ps-win" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
        <div className="ps-title">
          <span className="ps-icon" aria-hidden="true">
            &gt;_
          </span>
          Administrator: Windows PowerShell
          <span className="ps-btns" aria-hidden="true">
            <i>&#8212;</i>
            <i>&#9744;</i>
            <i>&#10005;</i>
          </span>
        </div>
        <div className="ps-body" aria-live="polite">
          {entries.map((e, i) => (
            <div key={i} className="ps-entry">
              {e.cmd && (
                <div>
                  <span className="ps-prompt">PS C:\Users\Dolgion&gt;</span> <span className="ps-cmd">{e.cmd}</span>
                </div>
              )}
              {e.out}
            </div>
          ))}
          <form
            className="ps-line"
            onSubmit={(ev) => {
              ev.preventDefault();
              exec(input);
            }}
          >
            <label htmlFor="ps-in" className="ps-prompt">
              PS C:\Users\Dolgion&gt;
            </label>
            <input
              id="ps-in"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" && hist.length) {
                  e.preventDefault();
                  const n = Math.min(hi + 1, hist.length - 1);
                  setHi(n);
                  setInput(hist[n]);
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  const n = hi - 1;
                  setHi(Math.max(-1, n));
                  setInput(n >= 0 ? hist[n] : "");
                } else if (e.key === "Tab") {
                  e.preventDefault();
                  const opts = ["Get-Skills", ...SHORT.map((s) => `Get-Skills -Group ${s}`), "help", "whoami", "cls"];
                  const hit = opts.find((o) => o.toLowerCase().startsWith(input.toLowerCase()) && o.length > input.length);
                  if (hit) setInput(hit);
                }
              }}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="PowerShell command"
            />
          </form>
        </div>
      </div>
      <div className="ps-chips">
        <button onClick={() => exec("Get-Skills")}>Get-Skills</button>
        {SHORT.map((s) => (
          <button key={s} onClick={() => exec(`Get-Skills -Group ${s}`)}>
            -Group {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- About ---------- */

export function AboutPanel() {
  return (
    <div className="w-stack">
      <div className="w-me">
        <Image src="/dolgion-avatar.webp" alt={profile.name} width={64} height={64} />
        <div>
          <h3 className="w-h3">{profile.name}</h3>
          <p className="w-sub">{profile.positioning.join(" · ")}</p>
        </div>
      </div>
      <div className="w-story">
        {about.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <dl className="w-facts-row">
        {about.facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ---------- Contact ---------- */

type IconProps = { size?: number };
const svg = (size: number, children: ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const WhatsApp = ({ size = 24 }: IconProps) =>
  svg(
    size,
    <>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </>,
  );
const Telegram = ({ size = 24 }: IconProps) => svg(size, <path d="M15 10l-4 4 6 6 4-16-18 7 4 2 2 6 3-4" />);
const Viber = ({ size = 24 }: IconProps) =>
  svg(
    size,
    <>
      <path d="M12 3c-5 0-8 2.2-8 7.2 0 3 1.1 4.8 3 5.9V20l3-2.5c.6.1 1.3.1 2 .1 5 0 8-2.2 8-7.4S17 3 12 3z" />
      <path d="M9.6 8.3c.4-.5 1-.4 1.3 0l.5.8c.2.4.1.8-.2 1.1l-.3.2c.3.9 1 1.6 1.9 1.9l.2-.3c.3-.3.7-.4 1.1-.2l.8.5c.4.3.5.9 0 1.3-.6.6-1.5.8-2.3.4a6.5 6.5 0 0 1-3.4-3.4c-.4-.8-.2-1.7.4-2.3z" />
      <path d="M13 6.6a3.4 3.4 0 0 1 2.9 2.9" />
    </>,
  );

const SOCIALS: { label: string; href: string; icon: ReactNode; color: string; external?: boolean }[] = [
  { label: "Email", href: `mailto:${profile.email}`, icon: <Mail size={24} />, color: "#ea4335" },
  { label: "Phone", href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: <Phone size={24} />, color: "#22c55e" },
  { label: "LinkedIn", href: profile.linkedin, icon: <Linkedin size={24} />, color: "#0a66c2", external: true },
  { label: "GitHub", href: profile.github, icon: <Github size={24} />, color: "var(--ink)", external: true },
  { label: "Facebook", href: profile.facebook, icon: <Facebook size={24} />, color: "#1877f2", external: true },
  { label: "WhatsApp", href: profile.whatsapp, icon: <WhatsApp />, color: "#25d366", external: true },
  { label: "Telegram", href: profile.telegram, icon: <Telegram />, color: "#229ed9", external: true },
  { label: "Viber", href: profile.viber, icon: <Viber />, color: "#7360f2" },
];

export function ContactPanel() {
  return (
    <div className="w-stack">
      <p className="w-status">
        <Dot tone="live" /> {profile.availability}
      </p>
      <ul className="w-socials">
        {SOCIALS.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              aria-label={s.label}
              title={s.label}
              style={{ ["--brand" as string]: s.color }}
              {...(s.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {s.icon}
            </a>
          </li>
        ))}
      </ul>
      <p className="w-note">
        <MapPin size={13} aria-hidden="true" style={{ verticalAlign: -2 }} /> {profile.location}
      </p>
      <div className="w-cv">
        <a className="w-btn" href={profile.cv.href} target="_blank" rel="noopener">
          <Download size={15} aria-hidden="true" /> CV · English
        </a>
        <a className="w-btn w-btn-ghost" href={profile.cvMn.href} target="_blank" rel="noopener">
          <Download size={15} aria-hidden="true" /> CV · Монгол
        </a>
      </div>
    </div>
  );
}

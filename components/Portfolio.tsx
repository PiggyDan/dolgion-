"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type FormEvent, type PointerEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Cctv,
  Check,
  Download,
  Github,
  Lock,
  Mail,
  Menu,
  MapPin,
  Maximize2,
  MessagesSquare,
  MonitorSmartphone,
  Network,
  Phone,
  Server,
  ShieldCheck,
  Ticket,
  Wrench,
  X,
} from "lucide-react";
import {
  about,
  education,
  employer,
  erp,
  experience,
  itcore,
  profile,
  skills,
  systems,
  websites,
  type Lang,
  type Site,
  type Text,
} from "@/data/profile";
import { ui, type UI } from "@/data/ui";

export type Shot = { src: string; width: number; height: number };
type Shots = { before: Shot | null; after: Shot | null };

const ease = [0.22, 1, 0.36, 1] as const;

const featureIcons = {
  ticket: Ticket,
  chat: MessagesSquare,
  monitor: MonitorSmartphone,
  download: Download,
  shield: ShieldCheck,
  chart: BarChart3,
};

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

/** Counts the numeric part of values like "225k", "1,100+" or "$35" up when scrolled into view. */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  const [shown, setShown] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!match || !inView) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    const controls = animate(0, target, {
      duration: 1.4,
      ease,
      onUpdate: (n) => setShown(`${prefix}${Math.round(n).toLocaleString("en-US")}${suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  return <span ref={ref}>{shown}</span>;
}

/* ------------------------------------------------------------------ */

function Header({ t, lang, setLang }: { t: UI; lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <header className="header">
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <nav className="nav shell" aria-label="Main">
        <a className="brand" href="#top" aria-label="Home">
          <span className="brand-avatar">
            <Image src="/dolgion-avatar.webp" alt="" width={46} height={46} priority />
            <span className="brand-dot" />
          </span>
          <span className="brand-text">
            <strong>Dolgion</strong>
            <small>{t.heroOverline}</small>
          </span>
        </a>
        <div className="nav-links">
          {t.nav.map(([label, href]) => (
            <a key={href} href={href} className={href === "#erp" ? "nav-hot" : undefined}>
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <div className="lang" role="group" aria-label="Language">
            {(["en", "mn"] as Lang[]).map((code) => (
              <button key={code} className={lang === code ? "on" : ""} onClick={() => setLang(code)} aria-pressed={lang === code}>
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="btn btn-sm btn-light hide-sm" href={profile.resume[lang]} target="_blank" rel="noreferrer">
            {t.resume} <ArrowUpRight size={14} />
          </a>
          <button className="menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            {t.nav.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a href={profile.resume[lang]} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              {t.resume}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className="rotator">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Hero({ t, lang }: { t: UI; lang: Lang }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section className="hero shell" id="top" ref={ref}>
      <div className="hero-copy">
        <motion.a
          href="#erp"
          className="now-pill"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="pulse amber" />
          <span className="muted">{t.nowBuilding}</span>
          <strong>{t.nowProject}</strong>
          <ArrowRight size={14} />
        </motion.a>

        <motion.p className="hero-overline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <span className="hero-name">{profile.fullName}</span> · {t.heroOverline}
        </motion.p>

        <h1 className="hero-title">
          {t.heroTitle.map((line, i) => (
            <span className="line" key={line}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.1 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div className="hero-rotate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <span className="muted">→</span> <RotatingWord words={t.heroRotate} />
        </motion.div>

        <motion.p
          className="hero-lead"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.45 }}
        >
          {t.heroLead}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.55 }}
        >
          <a className="btn btn-primary" href="#erp">
            {t.seeCase} <ArrowRight size={16} />
          </a>
          <a className="btn btn-ghost" href={profile.resume[lang]} target="_blank" rel="noreferrer">
            <Download size={16} /> {t.downloadCv}
          </a>
          <a className="icon-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a className="icon-link" href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`}>
            <Mail size={18} />
          </a>
        </motion.div>

        <motion.ul
          className="hero-specs"
          aria-label="Specializations"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          {profile.specializations.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease, delay: 0.2 }}
      >
        <div className="portrait-frame">
          <motion.div style={{ y: imgY }} className="portrait-inner">
            <Image src="/dolgion-hero.png" alt="Portrait of O. Dolgion" fill priority sizes="(max-width: 900px) 100vw, 560px" className="portrait" />
          </motion.div>
          <div className="portrait-badge">
            <span className="pulse" /> {t.available}
          </div>
        </div>
        <div className="hero-cards">
          {t.heroCards.map(([v, l], i) => (
            <motion.div
              className="hero-card"
              key={l}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.7 + i * 0.1 }}
            >
              <strong>{v}</strong>
              <span>{l}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = ["Ubuntu Linux", "Windows Server", "VMware ESXi", "Dell PowerEdge", "Check Point", "VPN · NAT", "PostgreSQL", "Odoo 13 → 19", "Python", "nginx", "Git", "React", "Next.js", "TypeScript"];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i}>
            {item}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const mockTickets = [
  { id: "#1042", en: "Printer on the 2nd floor is not printing", mn: "2-р давхрын принтер хэвлэхгүй байна" },
  { id: "#1043", en: "New hire laptop setup", mn: "Шинэ ажилтны компьютер тохируулах" },
  { id: "#1044", en: "Outlook password reset", mn: "Outlook нууц үг сэргээх" },
  { id: "#1045", en: "VPN drops in the warehouse", mn: "Агуулахад VPN тасарч байна" },
];
const statuses = [
  { en: "Open", mn: "Нээлттэй", cls: "s-open" },
  { en: "In progress", mn: "Хийгдэж буй", cls: "s-prog" },
  { en: "Resolved", mn: "Шийдэгдсэн", cls: "s-done" },
];

function ItCoreMock({ lang }: { lang: Lang }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mock">
      <div className="mock-bar">
        <span /><span /><span />
        <div className="mock-url">
          <Lock size={11} /> sup.itcore.dev
        </div>
      </div>
      <div className="mock-body">
        <aside className="mock-side">
          {["Tickets", "Chat", "Devices", "Reports", "Knowledge"].map((x, i) => (
            <div key={x} className={i === 0 ? "on" : ""}>
              {x}
            </div>
          ))}
        </aside>
        <div className="mock-main">
          <div className="mock-head">
            <strong>Tickets</strong>
            <span className="mock-chip">
              <span className="pulse" /> live
            </span>
          </div>
          {mockTickets.map((ticket, i) => {
            const s = statuses[(tick + i) % statuses.length];
            return (
              <div className="mock-row" key={ticket.id}>
                <span className="mono">{ticket.id}</span>
                <span className="mock-title">{ticket[lang]}</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={s.cls}
                    className={`mock-status ${s.cls}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {s[lang]}
                  </motion.span>
                </AnimatePresence>
              </div>
            );
          })}
          <div className="mock-devices">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className={(i * 7 + tick) % 11 === 0 ? "off" : ""} />
            ))}
          </div>
          <div className="mock-chat">
            <span className="avatar">IT</span>
            <div>{lang === "mn" ? "Одоо очлоо, 5 минут 👍" : "On my way, 5 minutes 👍"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ItCore({ t, lang }: { t: UI; lang: Lang }) {
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const glow = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(90,209,255,.16), transparent 60%)`;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section className="itcore" id="itcore" onPointerMove={onMove}>
      <motion.div className="itcore-glow" style={{ background: glow }} />
      <div className="shell">
        <Reveal className="itcore-head">
          <div>
            <Eyebrow>
              {t.itcoreEyebrow} · <span className="live"><span className="pulse" /> {t.itcoreLive}</span>
            </Eyebrow>
            <h2 className="itcore-name">
              <a className="itcore-brand" href={itcore.site} target="_blank" rel="noreferrer">
                <Image src="/itcore-logo.png" alt="" width={256} height={256} className="itcore-logo" priority />
                <span className="itcore-word">{itcore.name}</span>
              </a>
            </h2>
            <p className="itcore-tagline">{itcore.tagline[lang]}</p>
            <p className="lead">{itcore.pitch[lang]}</p>
          </div>
        </Reveal>

        <div className="itcore-grid">
          <Reveal className="itcore-links">
            {itcore.links.map((link, i) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={`domain-card ${i === 0 ? "primary" : ""}`}>
                <div>
                  <span className="domain">{link.label}</span>
                  <span className="domain-note">{link.note[lang]}</span>
                </div>
                <span className="domain-arrow">
                  <ArrowUpRight size={22} />
                </span>
              </a>
            ))}
            <div className="arch">
              <p className="mini-label">{t.architecture}</p>
              {itcore.architecture.map((step, i) => (
                <motion.div
                  className="arch-step"
                  key={step.en}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i, duration: 0.5, ease }}
                >
                  <span className="arch-idx">{i + 1}</span>
                  {step[lang]}
                </motion.div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ItCoreMock lang={lang} />
          </Reveal>
        </div>

        <div className="stat-row">
          {itcore.stats.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.06} className="stat">
              <strong>
                <CountUp value={s.value} />
              </strong>
              <span>{s.label[lang]}</span>
            </Reveal>
          ))}
        </div>

        <div className="feature-grid">
          {itcore.features.map((f, i) => {
            const Icon = featureIcons[f.icon as keyof typeof featureIcons];
            return (
              <Reveal key={f.icon} delay={(i % 3) * 0.06} className="feature">
                <span className="feature-icon">
                  <Icon size={20} />
                </span>
                <h3>{f.title[lang]}</h3>
                <p>{f.text[lang]}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="itcore-cta">
          <div className="chips">
            {itcore.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <div className="itcore-cta-actions">
            <a className="btn btn-primary" href={itcore.site} target="_blank" rel="noreferrer">
              {t.openSite} <ArrowUpRight size={16} />
            </a>
            <a className="btn btn-ghost" href={itcore.app} target="_blank" rel="noreferrer">
              {t.openApp} <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const systemIcons = { server: Server, cctv: Cctv, network: Network, wrench: Wrench };

function Rack({ t, lang }: { t: UI; lang: Lang }) {
  return (
    <div className="rack" aria-hidden="true">
      <div className="rack-head">
        <span className="pulse" /> {t.rackLabel}
      </div>
      {systems.rack.map((unit, i) => (
        <motion.div
          key={unit.name}
          className={`rack-unit ${i < 2 ? "tall" : ""}`}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: i * 0.08 }}
        >
          <div className="rack-label">
            <strong>{unit.name}</strong>
            <span>{unit.role[lang]}</span>
          </div>
          {i < 2 ? (
            <div className="bays">
              {Array.from({ length: 8 }).map((_, b) => (
                <span key={b} className="bay">
                  <i style={{ animationDelay: `${((b * 37 + i * 53) % 17) / 10}s` }} />
                </span>
              ))}
            </div>
          ) : (
            <div className="ports">
              {Array.from({ length: 12 }).map((_, p) => (
                <i key={p} style={{ animationDelay: `${((p * 29 + i * 41) % 13) / 10}s` }} />
              ))}
            </div>
          )}
          <span className="rack-led" />
        </motion.div>
      ))}
    </div>
  );
}

function Systems({ t, lang }: { t: UI; lang: Lang }) {
  return (
    <section className="section shell" id="systems">
      <div className="systems-top">
        <Reveal>
          <Eyebrow>{t.systemsEyebrow}</Eyebrow>
          <h2 className="h2 wide">{systems.title[lang]}</h2>
          <p className="lead">{systems.summary[lang]}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Rack t={t} lang={lang} />
        </Reveal>
      </div>
      <div className="systems-grid">
        {systems.areas.map((area, i) => {
          const Icon = systemIcons[area.icon as keyof typeof systemIcons];
          return (
            <Reveal key={area.icon} delay={(i % 2) * 0.08} className="sys-card">
              <div className="sys-head">
                <span className="sys-icon">
                  <Icon size={22} />
                </span>
                <span className="sys-num mono">0{i + 1}</span>
              </div>
              <h3>{area.title[lang]}</h3>
              <p>{area.text[lang]}</p>
              <div className="chips small">
                {area.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function About({ t, lang }: { t: UI; lang: Lang }) {
  return (
    <section className="section shell" id="about">
      <div className="about">
        <Reveal>
          <Eyebrow>{t.aboutEyebrow}</Eyebrow>
          <h2 className="h2 wide">{t.aboutTitle}</h2>
          <div className="about-copy">
            {about.paragraphs.map((p) => (
              <p key={p.en}>{p[lang]}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="about-side">
          <dl className="facts">
            {about.facts.map((f) => (
              <div key={f.label.en}>
                <dt>{f.label[lang]}</dt>
                <dd>{f.value[lang]}</dd>
              </div>
            ))}
          </dl>
          <p className="mini-label">{t.targetRoles}</p>
          <div className="chips small">
            {about.targetRoles.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

type ShotSlot = { shot: Shot | null; label: string; caption: string; alt: string; tone: "old" | "new" };

function Lightbox({ slot, onClose, t }: { slot: ShotSlot; onClose: () => void; t: UI }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, [onClose]);

  if (!slot.shot) return null;
  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={slot.label}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="lightbox-bar" onClick={(e) => e.stopPropagation()}>
        <strong>{slot.label}</strong>
        <a href={slot.shot.src} target="_blank" rel="noreferrer">
          {t.erpOpen} <ArrowUpRight size={14} />
        </a>
        <button ref={closeRef} onClick={onClose} aria-label={t.erpClose}>
          <X size={20} />
        </button>
      </div>
      <motion.img
        src={slot.shot.src}
        width={slot.shot.width}
        height={slot.shot.height}
        alt={slot.alt}
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.97 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.25, ease }}
      />
    </motion.div>
  );
}

function ShotFigure({ slot, onOpen, t }: { slot: ShotSlot; onOpen: () => void; t: UI }) {
  return (
    <figure className={`shot shot-${slot.tone}`}>
      <figcaption className="shot-label">
        <span className="shot-dot" /> {slot.label}
      </figcaption>
      {slot.shot ? (
        <button className="shot-frame" onClick={onOpen} aria-label={`${slot.label} — ${t.erpOpen}`}>
          <Image
            src={slot.shot.src}
            width={slot.shot.width}
            height={slot.shot.height}
            alt={slot.alt}
            sizes="(max-width: 860px) 100vw, 600px"
          />
          <span className="shot-zoom">
            <Maximize2 size={14} /> {t.erpOpen}
          </span>
        </button>
      ) : (
        <div className="shot-frame shot-missing">{t.erpPending}</div>
      )}
      <p className="shot-caption">{slot.caption}</p>
    </figure>
  );
}

function Erp({ t, lang, shots }: { t: UI; lang: Lang; shots: Shots }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const [open, setOpen] = useState<ShotSlot | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const slots: ShotSlot[] = (["before", "after"] as const).map((key) => ({
    shot: shots[key],
    label: erp.screenshots[key].label[lang],
    caption: erp.screenshots[key].caption[lang],
    alt: erp.screenshots[key].alt,
    tone: key === "before" ? "old" : "new",
  }));

  return (
    <section className="section erp-section" id="erp">
      <div className="shell">
        <Reveal className="erp-head">
          <Eyebrow>
            {t.erpEyebrow} · <span className="status-pill"><span className="pulse amber" /> {t.erpStatus}</span>
          </Eyebrow>
          <div className="version-jump" aria-hidden="true">
            <span className="v-old">13</span>
            <motion.span
              className="v-arrow"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease, delay: 0.2 }}
            />
            <span className="v-new">19</span>
          </div>
          <p className="erp-name">{erp.name[lang]}</p>
          <h2 className="h2 wide">{erp.title[lang]}</h2>
          <p className="lead">{erp.summary[lang]}</p>
        </Reveal>

        <Reveal>
          <dl className="erp-meta">
            {erp.meta.map((m) => (
              <div key={m.label.en}>
                <dt>{m.label[lang]}</dt>
                <dd>{m.value[lang]}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="compare-wrap">
          <p className="mini-label">{t.erpCompare}</p>
          <div className="compare">
            {slots.map((slot) => (
              <ShotFigure key={slot.tone} slot={slot} onOpen={() => setOpen(slot)} t={t} />
            ))}
          </div>
          <p className="compare-note">{erp.screenshots.note[lang]}</p>
        </Reveal>

        <div className="erp-split">
          <Reveal>
            <p className="mini-label">{t.erpAudit}</p>
            <div className="erp-stats">
              {erp.stats.map((s) => (
                <div key={s.value} className="stat">
                  <strong>
                    <CountUp value={s.value} />
                  </strong>
                  <span>{s.label[lang]}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mini-label">{t.erpAreas}</p>
            <ul className="area-list">
              {erp.areas.map((a) => (
                <li key={a}>
                  <Check size={14} /> {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <p className="mini-label phases-label">{t.erpPhases}</p>
        </Reveal>
        <div className="steps" ref={ref}>
          <div className="steps-rail">
            <motion.div className="steps-fill" style={{ scaleY: line }} />
          </div>
          {erp.phases.map((step, i) => (
            <Reveal key={step.title.en} delay={0.05} className={`step step-${step.status}`}>
              <span className="step-num">0{i + 1}</span>
              <div>
                <div className="step-head">
                  <h3>{step.title[lang]}</h3>
                  <span className={`phase-tag tag-${step.status}`}>{t.erpPhaseStatus[step.status]}</span>
                </div>
                <p>{step.text[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mini-label phases-label">{t.erpChallenges}</p>
        </Reveal>
        <div className="challenge-grid">
          {erp.challenges.map((c, i) => (
            <Reveal key={c.title.en} delay={(i % 2) * 0.06} className="challenge">
              <h3>{c.title[lang]}</h3>
              <p>{c.text[lang]}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="modules">
          <p className="mini-label">{t.erpModules}</p>
          <div className="module-grid">
            {erp.modules.map((m, i) => (
              <motion.span
                key={m}
                className="module"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                {m}
              </motion.span>
            ))}
          </div>
          <div className="chips">
            {erp.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="honesty">{t.erpHonesty}</p>
        </Reveal>
      </div>

      <AnimatePresence>{open && <Lightbox slot={open} onClose={close} t={t} />}</AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function SiteCard({ site, t, lang, index }: { site: Site; t: UI; lang: Lang; index: number }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  const Wrapper = site.url ? motion.a : motion.article;
  const linkProps = site.url ? { href: site.url, target: "_blank", rel: "noreferrer" } : {};

  return (
    <Reveal delay={(index % 3) * 0.07}>
      <Wrapper
        {...linkProps}
        className="site-card"
        style={{ rotateX: srx, rotateY: sry, ["--accent" as string]: site.accent }}
        onPointerMove={onMove}
        onPointerLeave={reset}
      >
        <div className="browser">
          <div className="browser-bar">
            <span /><span /><span />
            <div className="browser-url">{site.host ?? t.private}</div>
          </div>
          <div className="browser-body">
            <div className="bb-hero">
              <i style={{ width: "60%" }} />
              <i style={{ width: "40%" }} />
              <b />
            </div>
            <div className="bb-grid">
              <i /><i /><i />
            </div>
          </div>
        </div>
        <div className="site-info">
          <p className="site-kind">{site.kind[lang]}</p>
          <h3>
            {site.name}
            {site.url ? <ArrowUpRight size={18} className="site-arrow" /> : <Lock size={14} className="site-lock" />}
          </h3>
          <p>{site.text[lang]}</p>
          <div className="chips small">
            {site.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </Wrapper>
    </Reveal>
  );
}

function Websites({ t, lang }: { t: UI; lang: Lang }) {
  return (
    <section className="section shell" id="websites">
      <Reveal className="section-head">
        <Eyebrow>{t.websitesEyebrow}</Eyebrow>
        <h2 className="h2">{t.websitesTitle}</h2>
        <p className="lead">{t.websitesLead}</p>
      </Reveal>
      <div className="site-grid">
        {websites.map((site, i) => (
          <SiteCard key={site.name} site={site} t={t} lang={lang} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Experience({ t, lang }: { t: UI; lang: Lang }) {
  return (
    <section className="section shell" id="experience">
      <Reveal className="section-head">
        <Eyebrow>{t.experienceEyebrow}</Eyebrow>
        <h2 className="h2">{t.experienceTitle}</h2>
      </Reveal>
      <div className="jobs">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.05} className="job">
            <div className="job-meta">
              <span className="mono">{job.period}</span>
              <h3>{job.company}</h3>
              <p>{job.role[lang]}</p>
            </div>
            <ul>
              {job.bullets.map((b: Text) => (
                <li key={b.en}>{b[lang]}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 className="sub-head" id="skills">{t.skillsEyebrow}</h3>
      </Reveal>
      <div className="skills">
        {skills.map((s, i) => (
          <Reveal key={s.group.en} delay={i * 0.06} className="skill-col">
            <p className="mini-label">{s.group[lang]}</p>
            <div className="chips">
              {s.items.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="edu-row">
        <Reveal className="skill-col edu">
          <p className="mini-label">{t.educationEyebrow}</p>
          <h3>{education.title[lang]}</h3>
          <p>{education.detail[lang]}</p>
        </Reveal>
        <Reveal delay={0.06} className="skill-col cv-card">
          <p className="mini-label">{t.resume}</p>
          <a href={profile.resume.en} target="_blank" rel="noreferrer">
            <Download size={16} /> {t.cvEn}
          </a>
          <a href={profile.resume.mn} target="_blank" rel="noreferrer">
            <Download size={16} /> {t.cvMn}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Contact({ t, lang }: { t: UI; lang: Lang }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section shell contact" id="contact">
      <Reveal className="contact-copy">
        <Eyebrow>{t.contactEyebrow}</Eyebrow>
        <h2 className="h2 big">{t.contactTitle}</h2>
        <p className="lead">{t.contactLead}</p>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>
            <Mail size={16} /> {profile.email}
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
            <Phone size={16} /> {profile.phone}
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={16} /> github.com/PiggyDan
          </a>
          <a href={profile.resume[lang]} target="_blank" rel="noreferrer">
            <Download size={16} /> {t.downloadCv}
          </a>
          <span>
            <MapPin size={16} /> {profile.location[lang]} · {profile.availability[lang]}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <form className="form" onSubmit={submit}>
          <label>
            {t.name}
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.namePh} required />
          </label>
          <label>
            {t.email}
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.emailPh} required />
          </label>
          <label>
            {t.message}
            <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t.messagePh} required />
          </label>
          <button className="btn btn-primary" type="submit">
            {t.send} <ArrowRight size={16} />
          </button>
        </form>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function Portfolio({ shots }: { shots: Shots }) {
  const [lang, setLangState] = useState<Lang>("en");
  const t = ui[lang] as UI;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "mn") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-grid" aria-hidden="true" />
      <Header t={t} lang={lang} setLang={setLang} />
      <main id="main">
        <Hero t={t} lang={lang} />
        <Marquee />
        <About t={t} lang={lang} />
        <Erp t={t} lang={lang} shots={shots} />
        <Systems t={t} lang={lang} />
        <ItCore t={t} lang={lang} />
        <Websites t={t} lang={lang} />
        <Experience t={t} lang={lang} />
        <Contact t={t} lang={lang} />
      </main>
      <footer className="footer shell">
        <span>© {new Date().getFullYear()} {profile.fullName}</span>
        <span>{t.footer}</span>
        <a href={employer.site} target="_blank" rel="noreferrer">
          {employer.host} ↗
        </a>
        <a href={itcore.site} target="_blank" rel="noreferrer">
          itcore.dev ↗
        </a>
        <span className="powered">
          Powered by <strong>Daniel Knight</strong>
        </span>
      </footer>
    </MotionConfig>
  );
}

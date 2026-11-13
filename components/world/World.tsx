"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Moon, Sun, X } from "lucide-react";
import { hero, profile } from "@/data/profile";
import { AboutPanel, ContactPanel, ExperiencePanel, SkillsPanel, WorkPanel, type Shots } from "./Panels";
import { BG, EXTENT, PLACES, drawLive, makeLive, paintStatic, placeById, setTheme, step, vignetteRGB, type Live, type PlaceId, type Theme } from "./scene";

const TITLES: Record<PlaceId, { eyebrow: string; title: string }> = {
  work: { eyebrow: "rack · esxi-01..03", title: "Work" },
  experience: { eyebrow: "traceroute career", title: "Experience" },
  skills: { eyebrow: "ops@noc:~", title: "Skills" },
  about: { eyebrow: "ws-dolgion · whoami", title: "About me" },
  contact: { eyebrow: "wan · internet uplink", title: "Contact" },
};
const ORDER: PlaceId[] = ["work", "experience", "skills", "about", "contact"];
const DWELL = 0.75; // seconds the cursor rests on a node before it opens

export default function World({ shots }: { shots: Shots }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tagRefs = useRef<Partial<Record<PlaceId, HTMLButtonElement | null>>>({});
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const liveRef = useRef<Live | null>(null);
  const tagHover = useRef<PlaceId | null>(null);
  const suppress = useRef<PlaceId | null>(null); // a node just closed: don't reopen until the cursor leaves it
  const [active, setActive] = useState<PlaceId | null>(null);
  const [clock, setClock] = useState("");
  const [theme, setThemeState] = useState<Theme>("dark");
  const themeRef = useRef<{ t: Theme; rebuild?: () => void }>({ t: "dark" });

  // theme: saved choice, else the system setting
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("theme");
    } catch {}
    const t: Theme = saved === "light" || saved === "dark" ? saved : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setThemeState(t);
  }, []);
  useEffect(() => {
    themeRef.current.t = theme;
    setTheme(theme);
    themeRef.current.rebuild?.();
  }, [theme]);
  const toggleTheme = () => {
    const t: Theme = theme === "dark" ? "light" : "dark";
    setThemeState(t);
    try {
      localStorage.setItem("theme", t);
    } catch {}
  };
  const [touched, setTouched] = useState(false);
  const activeRef = useRef(active);
  activeRef.current = active;

  const open = useCallback((id: PlaceId | null) => {
    if (!id && activeRef.current) suppress.current = activeRef.current;
    setActive(id);
    setTouched(true);
    try {
      const url = new URL(window.location.href);
      if (id) url.searchParams.set("p", id);
      else url.searchParams.delete("p");
      window.history.replaceState(null, "", url);
    } catch {}
  }, []);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("p") as PlaceId | null;
    if (p && ORDER.includes(p)) setActive(p);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") open(null);
      const n = Number(e.key);
      if (n >= 1 && n <= 5) open(ORDER[n - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (active) panelRef.current?.focus({ preventScroll: true });
  }, [active]);

  // keep panel content inside the panel: shrink it a little if a page is too tall
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    let raf = 0;
    const fit = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = body.firstElementChild as HTMLElement | null;
        if (!el) return;
        let z = 1;
        el.style.zoom = "1";
        while (body.scrollHeight > body.clientHeight + 1 && z > 0.72) {
          z -= 0.03;
          el.style.zoom = String(z);
        }
      });
    };
    fit();
    const mo = new MutationObserver(fit);
    mo.observe(body, { childList: true, subtree: true, characterData: true });
    const ro = new ResizeObserver(fit);
    ro.observe(body);
    body.addEventListener("load", fit, true);
    return () => {
      body.removeEventListener("load", fit, true);
      mo.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [active]);

  useEffect(() => {
    const tick = () =>
      setClock(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Asia/Ulaanbaatar" }).format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // the network
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const L = makeLive();
    liveRef.current = L;
    const img = new Image();
    img.src = "/dolgion-avatar.webp";
    L.avatar = img;

    let cw = 0;
    let ch = 0;
    let dpr = 1;
    let layer: HTMLCanvasElement | null = null;
    let layerScale = 0;
    const cam = { x: 800, y: 560, z: 1 };
    const pan = { x: 0 };
    const mouse = { x: 0.5, y: 0.5, inside: false };
    let canvasHover: PlaceId | null = null;
    let dwellId: PlaceId | null = null;
    let dwellT = 0;
    let first = true;

    // on wide screens the map sits to the right of the intro card
    const layout = () => {
      const portrait = cw < 760 || cw < ch * 1.05;
      if (portrait) return { portrait, baseZ: Math.max(cw / 1250, (ch / 1000) * 0.55), cx: 800, cy: 0 };
      const introW = cw >= 1100 ? (introRef.current?.offsetWidth ?? 0) + 40 : 0;
      const baseZ = Math.min((cw - introW - 30) / 1140, (ch - 170) / 700);
      const cx = introW ? 250 + (cw / 2 - introW) / baseZ : 800;
      return { portrait, baseZ, cx, cy: 555 };
    };

    const target = (hover: PlaceId | null, d: number) => {
      const { portrait, baseZ, cx, cy } = layout();
      const id = activeRef.current;
      if (id) {
        const p = placeById(id);
        const z = baseZ * (portrait ? 1.5 : 1.65);
        const panelW = Math.min(460, cw * 0.42);
        const sx = portrait ? cw / 2 : (cw - panelW - 40) / 2;
        const sy = portrait ? ch * 0.15 : ch * 0.5;
        return { x: p.hx - (sx - cw / 2) / z, y: p.hy - (sy - ch / 2) / z, z };
      }
      const halfW = cw / (2 * baseZ);
      const minX = Math.min(cx, 230 + halfW - 60);
      const maxX = Math.max(cx, 1400 - halfW + 60);
      pan.x = Math.max(minX - cx, Math.min(maxX - cx, pan.x));
      let x = cx + pan.x;
      let y = portrait ? 930 - ch / (2 * baseZ) : cy;
      let z = baseZ;
      // the cursor leans the view a little
      if (fine && mouse.inside) {
        x += (mouse.x - 0.5) * 40;
        y += (mouse.y - 0.5) * 26;
      }
      // resting on a node pulls the camera in toward it, then it opens
      if (hover) {
        const p = placeById(hover);
        const k = 0.25 + 0.35 * d;
        x += (p.hx - x) * k;
        y += (p.hy - y) * k;
        z = baseZ * (1 + 0.28 * (0.4 + 0.6 * d));
      }
      return { x, y, z };
    };

    const buildLayer = (force = false) => {
      const want = Math.min(2, Math.max(1, layout().baseZ * 1.7 * dpr));
      if (!force && layer && Math.abs(want - layerScale) < 0.25) return;
      layerScale = want;
      layer = document.createElement("canvas");
      layer.width = Math.round(EXTENT.w * want);
      layer.height = Math.round(EXTENT.h * want);
      const lc = layer.getContext("2d")!;
      lc.setTransform(want, 0, 0, want, -EXTENT.x * want, -EXTENT.y * want);
      paintStatic(lc);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      buildLayer();
    };
    setTheme(themeRef.current.t);
    resize();
    window.addEventListener("resize", resize);
    themeRef.current.rebuild = () => buildLayer(true);

    const toWorld = (sx: number, sy: number) => [(sx - cw / 2) / cam.z + cam.x, (sy - ch / 2) / cam.z + cam.y];
    const hit = (sx: number, sy: number): PlaceId | null => {
      const [wx, wy] = toWorld(sx, sy);
      let best: PlaceId | null = null;
      let bd = 1;
      for (const p of PLACES) {
        const d = ((wx - p.hx) / p.rx) ** 2 + ((wy - p.hy) / p.ry) ** 2;
        if (d < bd) {
          bd = d;
          best = p.id;
        }
      }
      return best;
    };

    let down: { x: number; y: number; px: number; moved: boolean } | null = null;
    const onDown = (e: PointerEvent) => {
      down = { x: e.clientX, y: e.clientY, px: pan.x, moved: false };
    };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / cw;
      mouse.y = e.clientY / ch;
      mouse.inside = true;
      if (down) {
        const dx = e.clientX - down.x;
        if (Math.abs(dx) > 6 || Math.abs(e.clientY - down.y) > 6) down.moved = true;
        if (down.moved && !activeRef.current) {
          pan.x = down.px - dx / cam.z;
          canvas.classList.add("dragging");
        }
        return;
      }
      canvasHover = e.target === canvas && e.pointerType === "mouse" ? hit(e.clientX, e.clientY) : null;
      canvas.style.cursor = canvasHover ? "pointer" : "default";
    };
    const onUp = (e: PointerEvent) => {
      canvas.classList.remove("dragging");
      if (down && !down.moved) {
        const h = hit(e.clientX, e.clientY);
        if (h) openRef.current(h);
        else if (activeRef.current) openRef.current(null);
      } else if (down?.moved) setTouched(true);
      down = null;
    };
    const onLeave = () => {
      canvasHover = null;
      mouse.inside = false;
      down = null;
      canvas.classList.remove("dragging");
    };
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerleave", () => (canvasHover = null));

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      step(L, reduced ? dt * 0.15 : dt);
      L.active = activeRef.current;

      // hover → dwell → open
      const hovering = canvasHover ?? tagHover.current;
      if (suppress.current && hovering !== suppress.current) suppress.current = null;
      const h = !L.active && hovering && hovering !== suppress.current ? hovering : null;
      if (h !== dwellId) {
        dwellId = h;
        dwellT = 0;
      }
      if (h) {
        dwellT += dt;
        if (dwellT >= DWELL) {
          openRef.current(h);
          dwellId = null;
          dwellT = 0;
        }
      }
      L.hover = hovering;
      L.dwell = h ? Math.min(1, dwellT / DWELL) : 0;

      const tg = target(L.active ? null : h, L.dwell);
      const k = first || reduced ? 1 : 1 - Math.exp(-dt * 4);
      first = false;
      cam.x += (tg.x - cam.x) * k;
      cam.y += (tg.y - cam.y) * k;
      cam.z += (tg.z - cam.z) * k;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, cw, ch);
      const ox = cw / 2 - cam.x * cam.z;
      const oy = ch / 2 - cam.y * cam.z;
      ctx.setTransform(dpr * cam.z, 0, 0, dpr * cam.z, dpr * ox, dpr * oy);
      if (layer) ctx.drawImage(layer, EXTENT.x, EXTENT.y, EXTENT.w, EXTENT.h);
      drawLive(ctx, L);

      // vignette + scanline sweep
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const v = ctx.createRadialGradient(cw / 2, ch / 2, Math.min(cw, ch) * 0.35, cw / 2, ch / 2, Math.max(cw, ch) * 0.75);
      v.addColorStop(0, `rgba(${vignetteRGB()},0)`);
      v.addColorStop(1, `rgba(${vignetteRGB()},${themeRef.current.t === "dark" ? 0.75 : 0.6})`);
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, cw, ch);
      const sy = ((L.t * 60) % (ch + 200)) - 100;
      const s = ctx.createLinearGradient(0, sy - 80, 0, sy);
      s.addColorStop(0, "rgba(94,234,212,0)");
      s.addColorStop(1, "rgba(94,234,212,0.035)");
      ctx.fillStyle = s;
      ctx.fillRect(0, sy - 80, cw, 80);

      for (const p of PLACES) {
        const el = tagRefs.current[p.id];
        if (!el) continue;
        const x = (p.tx - cam.x) * cam.z + cw / 2;
        const y = (p.ty - cam.y) * cam.z + ch / 2;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -100%)`;
        el.style.setProperty("--dwell", String(dwellId === p.id ? L.dwell : 0));
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const idx = active ? ORDER.indexOf(active) : -1;

  return (
    <div className={`world${active ? " has-panel" : ""}`} data-theme={theme}>
      <canvas ref={canvasRef} className="world-canvas" aria-hidden="true" />

      <a className="w-mark" href="/" onClick={(e) => (e.preventDefault(), open(null))} aria-label={`${profile.name}, home`}>
        <span className="w-mark-sun" aria-hidden="true" />
        {profile.name}
      </a>

      <div className="w-top">
        <span className="w-clock" title="Local time in Ulaanbaatar">
          <i className="w-live" aria-hidden="true" /> UB {clock}
        </span>
        <button className="w-pill w-pill-icon" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} title={theme === "dark" ? "Light mode" : "Dark mode"}>
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <a className="w-pill w-pill-ink" href={profile.cv.href} target="_blank" rel="noopener">
          <Download size={14} aria-hidden="true" /> CV
        </a>
      </div>

      <section ref={introRef} className={`w-intro${active ? " hide" : ""}`} aria-hidden={!!active}>
        <p className="w-eyebrow">
          <span className="w-prompt">$</span> systems engineer · {profile.location}
        </p>
        <h2 className="w-intro-t">{hero.title}</h2>
        <p className="w-intro-l">{hero.lead}</p>
        <div className="w-intro-cta">
          <button className="w-btn" onClick={() => open("work")} tabIndex={active ? -1 : 0}>
            See my work
          </button>
          <button className="w-btn w-btn-ghost" onClick={() => open("contact")} tabIndex={active ? -1 : 0}>
            Get in touch
          </button>
        </div>
      </section>

      {PLACES.map((p) => (
        <button
          key={p.id}
          ref={(el) => {
            tagRefs.current[p.id] = el;
          }}
          className={`w-tag${active === p.id ? " on" : ""}${active && active !== p.id ? " dim" : ""}`}
          onClick={() => open(active === p.id ? null : p.id)}
          onPointerEnter={(e) => e.pointerType === "mouse" && (tagHover.current = p.id)}
          onPointerLeave={() => (tagHover.current = null)}
          aria-label={`${p.label}: ${p.sub}`}
        >
          <span className="w-tag-n">{ORDER.indexOf(p.id) + 1}</span>
          {p.label}
          <span className="w-tag-bar" aria-hidden="true" />
        </button>
      ))}

      <p className={`w-hint${touched || active ? " gone" : ""}`} aria-hidden="true">
        <span className="w-hint-fine">Hover a node to zoom in · click to open</span>
        <span className="w-hint-touch">Tap a node · drag to look around</span>
      </p>

      <nav className="w-dock" aria-label="Sections">
        {ORDER.map((id) => (
          <button key={id} aria-pressed={active === id} onClick={() => open(active === id ? null : id)}>
            {placeById(id).label}
          </button>
        ))}
      </nav>

      {active && (
        <div className="w-panel" role="dialog" aria-modal="false" aria-labelledby="w-panel-title" ref={panelRef} tabIndex={-1} key={active}>
          <header className="w-panel-head">
            <div>
              <p className="w-eyebrow">
                <span className="w-prompt">~/</span>
                {TITLES[active].eyebrow}
              </p>
              <h2 id="w-panel-title" className="w-panel-title">
                {TITLES[active].title}
              </h2>
            </div>
            <button className="w-icon w-close" onClick={() => open(null)} aria-label="Close">
              <X size={18} />
            </button>
          </header>
          <div className="w-panel-body" ref={bodyRef}>
            {active === "work" && <WorkPanel shots={shots} />}
            {active === "experience" && <ExperiencePanel />}
            {active === "skills" && <SkillsPanel />}
            {active === "about" && <AboutPanel />}
            {active === "contact" && <ContactPanel />}
          </div>
          <footer className="w-panel-foot">
            <button className="w-next" onClick={() => open(ORDER[(idx - 1 + ORDER.length) % ORDER.length])}>
              ← {placeById(ORDER[(idx - 1 + ORDER.length) % ORDER.length]).label}
            </button>
            <button className="w-next" onClick={() => open(ORDER[(idx + 1) % ORDER.length])}>
              {placeById(ORDER[(idx + 1) % ORDER.length]).label} →
            </button>
          </footer>
        </div>
      )}

      <footer className="w-foot">
        © {new Date().getFullYear()} {profile.name} · Powered by <strong>Daniel Knight</strong>
      </footer>
    </div>
  );
}

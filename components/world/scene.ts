// The network: one live topology map drawn in code.
// Static parts (grid, traces, device bodies) are painted once offscreen; packets, LEDs and screens are drawn every frame.

export type Pt = [number, number];
export type PlaceId = "work" | "experience" | "skills" | "about" | "contact";

export const EXTENT = { x: -300, y: -100, w: 2200, h: 1250 };
/* ---------- palettes: dark (NOC at night) and light (blueprint) ---------- */
export type Theme = "dark" | "light";
const PALETTES = {
  dark: { bg: "#0a111e", teal: "94,234,212", blue: "122,162,255", dim: "140,170,210", body: "#0e1a2c", port: "#06101c", unit: "#13233a", packet: "#ffffff", vignette: "5,9,16", dimA: 1, top: "#1a2d48", side: "#08111f", shadow: "rgba(0,0,0,0.55)" },
  light: { bg: "#eef3f8", teal: "13,148,136", blue: "59,92,200", dim: "60,84,120", body: "#ffffff", port: "#dfe7f0", unit: "#eaf0f6", packet: "#0f766e", vignette: "200,212,228", dimA: 1.5, top: "#f7fafd", side: "#c9d6e4", shadow: "rgba(30,50,80,0.22)" },
};
export let BG = PALETTES.dark.bg;
let TEAL = PALETTES.dark.teal;
let BLUE = PALETTES.dark.blue;
let DIM = PALETTES.dark.dim;
let P = PALETTES.dark;
export function setTheme(t: Theme) {
  P = PALETTES[t];
  BG = P.bg;
  TEAL = P.teal;
  BLUE = P.blue;
  DIM = P.dim;
}
export const vignetteRGB = () => P.vignette;

export type Place = {
  id: PlaceId;
  label: string;
  sub: string;
  hx: number;
  hy: number;
  rx: number;
  ry: number;
  tx: number;
  ty: number;
};

export const PLACES: Place[] = [
  { id: "work", label: "Work", sub: "Server racks", hx: 800, hy: 395, rx: 150, ry: 115, tx: 800, ty: 282 },
  { id: "experience", label: "Experience", sub: "Traceroute", hx: 1185, hy: 725, rx: 165, ry: 95, tx: 1185, ty: 618 },
  { id: "skills", label: "Skills", sub: "Terminal", hx: 395, hy: 715, rx: 135, ry: 95, tx: 395, ty: 618 },
  { id: "about", label: "About", sub: "Workstation", hx: 370, hy: 330, rx: 120, ry: 95, tx: 370, ty: 228 },
  { id: "contact", label: "Contact", sub: "Internet uplink", hx: 1235, hy: 310, rx: 125, ry: 90, tx: 1235, ty: 222 },
];
export const placeById = (id: PlaceId) => PLACES.find((p) => p.id === id)!;

export function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- traces: orthogonal cables between devices ---------- */
export const CORE: Pt = [800, 640];
type Trace = { pts: Pt[]; len: number; rgb: string; main: boolean };
function trace(pts: Pt[], rgb = TEAL, main = true): Trace {
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return { pts, len, rgb, main };
}
export const TRACES: Trace[] = [
  trace([[800, 622], [800, 488]]), // core -> racks
  trace([[740, 640], [560, 640], [560, 330], [478, 330]]), // core -> workstation
  trace([[740, 652], [600, 652], [600, 715], [530, 715]]), // core -> terminal
  trace([[860, 640], [1040, 640], [1040, 310], [1130, 310]]), // core -> internet
  trace([[860, 652], [960, 652], [960, 785], [1035, 785]]), // core -> first hop
  trace([[1065, 785], [1100, 785], [1100, 745], [1125, 745]], BLUE), // hops
  trace([[1155, 745], [1180, 745], [1180, 705], [1205, 705]], BLUE),
  trace([[1235, 705], [1265, 705], [1265, 660], [1290, 660]], BLUE),
  trace([[910, 340], [990, 340], [990, 280], [1130, 280]]), // racks uplink
  // small devices
  trace([[770, 660], [770, 760], [680, 760], [680, 835]], DIM, false),
  trace([[800, 660], [800, 860]], DIM, false),
  trace([[830, 660], [830, 760], [920, 760], [920, 835]], DIM, false),
  trace([[740, 628], [660, 628], [660, 540]], DIM, false),
  trace([[860, 628], [940, 628], [940, 540]], DIM, false),
];

export function tracePoint(t: Trace, u: number): Pt {
  let d = u * t.len;
  for (let i = 1; i < t.pts.length; i++) {
    const [x0, y0] = t.pts[i - 1];
    const [x1, y1] = t.pts[i];
    const s = Math.hypot(x1 - x0, y1 - y0);
    if (d <= s) return [x0 + ((x1 - x0) * d) / s, y0 + ((y1 - y0) * d) / s];
    d -= s;
  }
  return t.pts[t.pts.length - 1];
}

/* ---------- drawing helpers ---------- */
type C = CanvasRenderingContext2D;

function path(ctx: C, pts: Pt[], close = false) {
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  if (close) ctx.closePath();
}
function rr(ctx: C, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}
function glow(ctx: C, rgb: string, a: number, blur: number, width: number, draw: () => void) {
  ctx.save();
  ctx.strokeStyle = `rgba(${rgb},${a})`;
  ctx.shadowColor = `rgba(${rgb},${Math.min(1, a + 0.2)})`;
  ctx.shadowBlur = blur;
  ctx.lineWidth = width;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  draw();
  ctx.stroke();
  ctx.restore();
}
function panel(ctx: C, x: number, y: number, w: number, h: number, r: number, rgb = TEAL, a = 0.75) {
  ctx.fillStyle = P.body;
  rr(ctx, x, y, w, h, r);
  ctx.fill();
  glow(ctx, rgb, a, 12, 1.4, () => rr(ctx, x, y, w, h, r));
}
/** An extruded box: front face plus a lit top and a shaded right side, with a soft floor shadow. */
const DXR = 0.62;
const DYR = -0.42;
function box3d(ctx: C, x: number, y: number, w: number, h: number, d: number, rgb = TEAL, a = 0.75, r = 4) {
  const dx = d * DXR;
  const dy = d * DYR;
  ctx.save();
  ctx.shadowColor = P.shadow;
  ctx.shadowBlur = 22;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = P.shadow;
  path(ctx, [[x + 4, y + h], [x + w, y + h], [x + w + dx, y + h + dy], [x + dx + 4, y + h + dy]], true);
  ctx.fill();
  ctx.restore();
  const top: Pt[] = [[x + r, y], [x + w, y], [x + w + dx, y + dy], [x + dx + r, y + dy]];
  const side: Pt[] = [[x + w, y + r], [x + w + dx, y + dy + r], [x + w + dx, y + h + dy - r], [x + w, y + h - r]];
  const gt = ctx.createLinearGradient(x, y + dy, x, y);
  gt.addColorStop(0, P.top);
  gt.addColorStop(1, P.body);
  ctx.fillStyle = gt;
  path(ctx, top, true);
  ctx.fill();
  const gs = ctx.createLinearGradient(x + w, 0, x + w + dx, 0);
  gs.addColorStop(0, P.side);
  gs.addColorStop(1, P.body);
  ctx.fillStyle = gs;
  path(ctx, side, true);
  ctx.fill();
  glow(ctx, rgb, a * 0.55, 6, 1, () => path(ctx, top, true));
  glow(ctx, rgb, a * 0.4, 4, 1, () => path(ctx, side, true));
  panel(ctx, x, y, w, h, r, rgb, a);
}

function label(ctx: C, text: string, x: number, y: number, a = 0.55, size = 9, align: CanvasTextAlign = "center") {
  ctx.fillStyle = `rgba(${DIM},${Math.min(1, a * P.dimA)})`;
  ctx.font = `600 ${size}px ui-monospace, Menlo, Consolas, monospace`;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

/* ---------- the static painting ---------- */
export function paintStatic(ctx: C) {
  const R = rng(42);
  const { x: x0, y: y0, w, h } = EXTENT;

  // dot grid and major lines
  for (let x = Math.ceil(x0 / 32) * 32; x < x0 + w; x += 32)
    for (let y = Math.ceil(y0 / 32) * 32; y < y0 + h; y += 32) {
      ctx.fillStyle = `rgba(${DIM},${x % 160 === 0 && y % 160 === 0 ? 0.35 : 0.11})`;
      ctx.fillRect(x - 0.8, y - 0.8, 1.6, 1.6);
    }
  ctx.strokeStyle = `rgba(${DIM},0.045)`;
  ctx.lineWidth = 1;
  for (let x = Math.ceil(x0 / 160) * 160; x < x0 + w; x += 160) path(ctx, [[x, y0], [x, y0 + h]]), ctx.stroke();
  for (let y = Math.ceil(y0 / 160) * 160; y < y0 + h; y += 160) path(ctx, [[x0, y], [x0 + w, y]]), ctx.stroke();
  for (let x = 0; x <= 1600; x += 320) label(ctx, `x:${x.toString().padStart(4, "0")}`, x, 30, 0.25, 8);

  // radar rings around the core
  for (let r = 120; r <= 620; r += 125) {
    ctx.strokeStyle = `rgba(${TEAL},${0.06 - r / 20000})`;
    ctx.setLineDash([2, 6]);
    ctx.beginPath();
    ctx.arc(CORE[0], CORE[1], r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // faint scattered "hosts" in the background
  for (let i = 0; i < 70; i++) {
    const x = x0 + R() * w;
    const y = y0 + R() * h;
    if (Math.hypot(x - 800, y - 560) < 560) continue;
    ctx.fillStyle = `rgba(${DIM},0.18)`;
    ctx.fillRect(x - 2, y - 2, 4, 4);
    if (R() > 0.6) label(ctx, `10.${Math.floor(R() * 40)}.${Math.floor(R() * 250)}.${Math.floor(R() * 250)}`, x + 6, y + 3, 0.16, 7, "left");
  }

  // traces
  for (const t of TRACES) {
    glow(ctx, t.rgb, t.main ? 0.42 : 0.22, t.main ? 8 : 0, t.main ? 2 : 1.2, () => path(ctx, t.pts));
    for (const p of [t.pts[0], t.pts[t.pts.length - 1]]) {
      ctx.fillStyle = `rgba(${t.rgb},${t.main ? 0.8 : 0.4})`;
      ctx.beginPath();
      ctx.arc(p[0], p[1], 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  coreSwitch(ctx);
  racks(ctx);
  workstation(ctx);
  terminal(ctx);
  internet(ctx);
  hops(ctx);
  smallDevices(ctx);
}

function coreSwitch(ctx: C) {
  const [cx, cy] = CORE;
  box3d(ctx, cx - 70, cy - 20, 140, 40, 46, TEAL, 0.8, 5);
  for (let i = 0; i < 12; i++) {
    const x = cx - 58 + i * 10;
    ctx.fillStyle = P.port;
    ctx.fillRect(x, cy - 6, 7, 6);
    ctx.strokeStyle = `rgba(${DIM},0.35)`;
    ctx.strokeRect(x, cy - 6, 7, 6);
  }
  label(ctx, "CORE-SW · CHECK POINT GW", cx, cy + 36, 0.6, 9);
}

function racks(ctx: C) {
  for (let i = 0; i < 3; i++) {
    const x = 690 + i * 76;
    const y = 300;
    box3d(ctx, x, y, 66, 186, 40, TEAL, i === 1 ? 0.85 : 0.65, 5);
    for (let v = 0; v < 12; v++) {
      ctx.strokeStyle = `rgba(${DIM},0.22)`;
      ctx.lineWidth = 1;
      path(ctx, [[x + 70, y + 20 + v * 14], [x + 88, y + 8 + v * 14]]);
      ctx.stroke();
    }
    ctx.strokeStyle = `rgba(${DIM},0.35)`;
    ctx.beginPath();
    ctx.ellipse(x + 45, y - 8, 10, 4.5, 0, 0, Math.PI * 2);
    ctx.stroke();
    for (let u = 0; u < 9; u++) {
      const yy = y + 12 + u * 19;
      ctx.fillStyle = P.unit;
      ctx.fillRect(x + 7, yy, 52, 14);
      ctx.strokeStyle = `rgba(${DIM},0.25)`;
      ctx.strokeRect(x + 7, yy, 52, 14);
      for (let k = 0; k < 5; k++) {
        ctx.fillStyle = `rgba(${DIM},0.25)`;
        ctx.fillRect(x + 28 + k * 5, yy + 4, 2, 6);
      }
    }
  }
  label(ctx, "ESXI-01", 723, 500, 0.6);
  label(ctx, "ESXI-02", 799, 500, 0.6);
  label(ctx, "ERP-DB", 875, 500, 0.6);
}

function workstation(ctx: C) {
  const cx = 370;
  const cy = 330;
  // tower PC
  box3d(ctx, cx - 160, cy - 34, 44, 100, 44, TEAL, 0.7, 4);
  for (let k = 0; k < 3; k++) {
    ctx.strokeStyle = `rgba(${DIM},0.35)`;
    ctx.strokeRect(cx - 153, cy - 26 + k * 9, 30, 5);
  }
  ctx.strokeStyle = `rgba(${TEAL},0.8)`;
  ctx.beginPath();
  ctx.arc(cx - 138, cy + 46, 5, 0, Math.PI * 2);
  ctx.stroke();
  for (let k = 0; k < 6; k++) {
    ctx.fillStyle = `rgba(${DIM},0.2)`;
    ctx.fillRect(cx - 152, cy + 6 + k * 4, 28, 1.5);
  }
  // stand and foot
  box3d(ctx, cx - 42, cy + 64, 84, 7, 40, TEAL, 0.6, 2);
  box3d(ctx, cx - 9, cy + 44, 18, 22, 10, TEAL, 0.6, 2);
  // monitor
  box3d(ctx, cx - 92, cy - 70, 184, 116, 14, TEAL, 0.85, 8);
  ctx.fillStyle = "#081320";
  ctx.fillRect(cx - 84, cy - 62, 168, 100);
  label(ctx, "WS-DOLGION", cx + 40, cy + 92, 0.6);
}

export const PS_BLUE = "#012456";
function terminal(ctx: C) {
  const cx = 395;
  const cy = 715;
  box3d(ctx, cx - 42, cy + 96, 84, 7, 40, TEAL, 0.6, 2);
  box3d(ctx, cx - 9, cy + 78, 18, 20, 10, TEAL, 0.6, 2);
  box3d(ctx, cx - 135, cy - 72, 270, 150, 14, TEAL, 0.85, 8);
  // the PowerShell window
  const wx = cx - 128;
  const wy = cy - 65;
  const ww = 256;
  ctx.fillStyle = PS_BLUE;
  ctx.fillRect(wx, wy, ww, 136);
  ctx.fillStyle = "#f3f3f3";
  ctx.fillRect(wx, wy, ww, 15);
  ctx.fillStyle = PS_BLUE;
  ctx.fillRect(wx + 5, wy + 3.5, 9, 8);
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 6px Consolas, monospace";
  ctx.textAlign = "left";
  ctx.fillText(">_", wx + 5.8, wy + 9.8);
  ctx.fillStyle = "#1f1f1f";
  ctx.font = "500 7.5px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText("Administrator: Windows PowerShell", wx + 19, wy + 10.5);
  ctx.textAlign = "center";
  ctx.font = "400 8px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText("\u2014", wx + ww - 44, wy + 10.5);
  ctx.strokeStyle = "#1f1f1f";
  ctx.lineWidth = 0.8;
  ctx.strokeRect(wx + ww - 29, wy + 4.5, 6, 6);
  ctx.fillText("\u2715", wx + ww - 10, wy + 10.5);
}

function internet(ctx: C) {
  const cx = 1235;
  const cy = 300;
  const cloud = () => {
    ctx.beginPath();
    ctx.moveTo(cx - 90, cy + 40);
    ctx.bezierCurveTo(cx - 130, cy + 40, cx - 130, cy - 20, cx - 80, cy - 18);
    ctx.bezierCurveTo(cx - 76, cy - 70, cx - 6, cy - 78, cx + 10, cy - 38);
    ctx.bezierCurveTo(cx + 40, cy - 70, cx + 100, cy - 50, cx + 88, cy - 6);
    ctx.bezierCurveTo(cx + 130, cy - 2, cx + 126, cy + 42, cx + 86, cy + 40);
    ctx.closePath();
  };
  ctx.fillStyle = P.body;
  cloud();
  ctx.fill();
  glow(ctx, TEAL, 0.8, 14, 1.6, cloud);
  // envelope
  ctx.strokeStyle = `rgba(${TEAL},0.9)`;
  ctx.lineWidth = 1.6;
  ctx.strokeRect(cx - 26, cy - 16, 52, 34);
  path(ctx, [[cx - 26, cy - 16], [cx, cy + 4], [cx + 26, cy - 16]]);
  ctx.stroke();
  label(ctx, "WAN · INTERNET", cx, cy + 62, 0.6);
}

export const HOPS: { x: number; y: number; year: string; name: string; big?: boolean }[] = [
  { x: 1050, y: 785, year: "2022", name: "BAYAN-AIRAG" },
  { x: 1140, y: 745, year: "2024", name: "AYENIX" },
  { x: 1220, y: 705, year: "2025", name: "KFC" },
  { x: 1318, y: 660, year: "2026", name: "GK-LLC", big: true },
];
function hops(ctx: C) {
  for (const h of HOPS) {
    const w = h.big ? 56 : 30;
    const hh = h.big ? 28 : 18;
    box3d(ctx, h.x - w / 2, h.y - hh / 2, w, hh, h.big ? 26 : 16, h.big ? TEAL : BLUE, 0.85, 3);
    // antennas
    ctx.strokeStyle = `rgba(${h.big ? TEAL : BLUE},0.7)`;
    ctx.lineWidth = 1.2;
    path(ctx, [[h.x - w / 2 + 5, h.y - hh / 2], [h.x - w / 2 + 2, h.y - hh / 2 - 10]]);
    ctx.stroke();
    path(ctx, [[h.x + w / 2 - 5, h.y - hh / 2], [h.x + w / 2 - 2, h.y - hh / 2 - 10]]);
    ctx.stroke();
    label(ctx, h.year, h.x, h.y + hh / 2 + 13, 0.8, h.big ? 11 : 9);
    label(ctx, h.name, h.x, h.y + hh / 2 + 24, 0.45, 7);
  }
  label(ctx, "$ traceroute career", 1185, 840, 0.45, 9);
}

function smallDevices(ctx: C) {
  // printer
  box3d(ctx, 652, 835, 56, 30, 30, DIM, 0.45);
  ctx.fillStyle = `rgb(${DIM})`;
  ctx.globalAlpha = 0.25;
  ctx.fillRect(664, 828, 32, 8);
  ctx.globalAlpha = 1;
  label(ctx, "PRN-01", 680, 882, 0.45, 8);
  // NVR
  box3d(ctx, 768, 860, 64, 22, 30, DIM, 0.45);
  label(ctx, "NVR · CCTV", 800, 898, 0.45, 8);
  // IP phone
  box3d(ctx, 900, 835, 40, 30, 22, DIM, 0.45);
  ctx.strokeStyle = `rgba(${DIM},0.5)`;
  ctx.strokeRect(906, 841, 16, 10);
  label(ctx, "VOIP", 920, 882, 0.45, 8);
  // access point
  ctx.fillStyle = P.body;
  ctx.beginPath();
  ctx.ellipse(660, 532, 22, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  glow(ctx, DIM, 0.5, 0, 1.2, () => {
    ctx.beginPath();
    ctx.ellipse(660, 532, 22, 8, 0, 0, Math.PI * 2);
  });
  label(ctx, "GWN-AP", 660, 516, 0.45, 8);
  // camera
  ctx.fillStyle = P.body;
  rr(ctx, 922, 524, 40, 14, 7);
  ctx.fill();
  glow(ctx, DIM, 0.5, 0, 1.2, () => rr(ctx, 922, 524, 40, 14, 7));
  label(ctx, "CAM-03", 940, 516, 0.45, 8);
}

/* ---------- live layer ---------- */
export type Packet = { tr: number; u: number; v: number; rgb: string };
export type Live = {
  t: number;
  packets: Packet[];
  hover: PlaceId | null;
  active: PlaceId | null;
  dwell: number; // 0..1 while the cursor rests on a node
  avatar: HTMLImageElement | null;
};

export function makeLive(): Live {
  const R = rng(7);
  const packets: Packet[] = [];
  TRACES.forEach((t, i) => {
    const n = t.main ? 3 : 1;
    for (let k = 0; k < n; k++)
      packets.push({ tr: i, u: R(), v: (60 + R() * 70) * (R() > 0.5 ? 1 : -1), rgb: R() > 0.8 ? "251,191,36" : t.rgb });
  });
  return { t: 0, packets, hover: null, active: null, dwell: 0, avatar: null };
}

export function step(L: Live, dt: number) {
  L.t += dt;
  for (const p of L.packets) {
    const tr = TRACES[p.tr];
    p.u += (p.v * dt) / tr.len;
    if (p.u > 1) p.u -= 1;
    if (p.u < 0) p.u += 1;
  }
}

const CMDS: [string, string][] = [
  ["Get-VM | ? State -eq Running", "ESXI-01  ERP-TEST  DC-01"],
  ["Test-NetConnection erp-test -Port 443", "TcpTestSucceeded : True"],
  ["docker compose up -d", "Container infrascope-api  Started"],
  ["ssh admin@ubuntu-erp", "Welcome to Ubuntu 24.04 LTS"],
  ["Get-Service | ? Status -eq Stopped", "Spooler  Stopped"],
  ["git push origin main", "main -> main"],
  ["pytest -q", "141 passed"],
  ["wrangler deploy", "Deployed itcore-api"],
];

export function drawLive(ctx: C, L: Live) {
  const t = L.t;

  // packets
  for (const p of L.packets) {
    const [x, y] = tracePoint(TRACES[p.tr], p.u);
    const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
    g.addColorStop(0, `rgba(${p.rgb},0.95)`);
    g.addColorStop(1, `rgba(${p.rgb},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = P.packet;
    ctx.fillRect(x - 1.3, y - 1.3, 2.6, 2.6);
  }

  // core switch port LEDs
  for (let i = 0; i < 12; i++) {
    const on = Math.sin(t * (5 + (i % 4)) + i * 2.3) > -0.1;
    ctx.fillStyle = on ? (i % 5 === 3 ? "#fbbf24" : "#4ade80") : "rgba(74,222,128,0.15)";
    ctx.fillRect(CORE[0] - 57 + i * 10, CORE[1] + 4, 5, 2.5);
  }

  // rack LEDs
  for (let r = 0; r < 3; r++)
    for (let u = 0; u < 9; u++) {
      const x = 690 + r * 76 + 11;
      const y = 300 + 12 + u * 19 + 5;
      const on = Math.sin(t * (2 + ((r * 3 + u) % 5)) + r * 7 + u * 3) > -0.3;
      ctx.fillStyle = on ? "#4ade80" : "rgba(74,222,128,0.18)";
      ctx.fillRect(x, y, 3, 3);
      ctx.fillStyle = Math.sin(t * 9 + u * 13 + r) > 0.6 ? "#fbbf24" : "rgba(251,191,36,0.15)";
      ctx.fillRect(x + 6, y, 3, 3);
    }

  // workstation screen: avatar + whoami
  ctx.save();
  ctx.beginPath();
  ctx.rect(286, 268, 168, 100);
  ctx.clip();
  if (L.avatar && L.avatar.complete && L.avatar.naturalWidth) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(325, 308, 26, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(L.avatar, 299, 282, 52, 52);
    ctx.restore();
    ctx.strokeStyle = `rgba(${TEAL},0.8)`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(325, 308, 26, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.font = "600 9px ui-monospace, Menlo, Consolas, monospace";
  ctx.textAlign = "left";
  ctx.fillStyle = `rgba(${TEAL},0.95)`;
  ctx.fillText("$ whoami", 360, 296);
  ctx.fillStyle = "rgba(232,238,248,0.85)";
  ctx.fillText("dolgion", 360, 310);
  ctx.fillStyle = `rgba(${DIM},0.7)`;
  ctx.fillText("sys eng · UB", 360, 323);
  if (Math.floor(t * 2) % 2) ctx.fillRect(296, 352, 6, 9);
  ctx.restore();

  // terminal: PowerShell typing commands
  ctx.save();
  ctx.beginPath();
  ctx.rect(267, 665, 256, 121);
  ctx.clip();
  ctx.font = "500 9.5px Consolas, 'Cascadia Mono', ui-monospace, monospace";
  ctx.textAlign = "left";
  const per = 2.4;
  const cur = Math.floor(t / per);
  const rows: { prompt: boolean; text: string; typing?: boolean }[] = [];
  for (let k = 3; k >= 0; k--) {
    const idx = cur - k;
    if (idx < 0) continue;
    const [cmd, outp] = CMDS[idx % CMDS.length];
    const f = (t % per) / per;
    if (k === 0) {
      rows.push({ prompt: true, text: cmd.slice(0, Math.floor(Math.min(1, f * 1.8) * cmd.length)), typing: f < 0.7 });
      if (f >= 0.7) rows.push({ prompt: false, text: outp });
    } else {
      rows.push({ prompt: true, text: cmd });
      rows.push({ prompt: false, text: outp });
    }
  }
  rows.slice(-8).forEach((r, i) => {
    const y = 678 + i * 14;
    let x = 271;
    if (r.prompt) {
      const ps = "PS C:\\> ";
      ctx.fillStyle = "#eeedf0";
      ctx.fillText(ps, x, y);
      x += ctx.measureText(ps).width;
      const [verb, ...rest] = r.text.split(" ");
      ctx.fillStyle = "#f9f1a5";
      ctx.fillText(verb, x, y);
      x += ctx.measureText(verb + " ").width;
      ctx.fillStyle = "#a8b3c4";
      ctx.fillText(rest.join(" "), x, y);
      x += ctx.measureText(rest.join(" ")).width;
      if (r.typing && Math.floor(t * 3) % 2) {
        ctx.fillStyle = "#eeedf0";
        ctx.fillRect(x + 1, y - 8, 5, 10);
      }
    } else {
      ctx.fillStyle = "rgba(238,237,240,0.7)";
      ctx.fillText(r.text, x, y);
    }
  });
  ctx.restore();

  // tower power LED
  ctx.fillStyle = Math.sin(t * 2.5) > -0.6 ? "#4ade80" : "rgba(74,222,128,0.3)";
  ctx.beginPath();
  ctx.arc(232, 376, 1.8, 0, Math.PI * 2);
  ctx.fill();

  // internet: mail leaving
  for (let i = 0; i < 3; i++) {
    const u = (t * 0.25 + i / 3) % 1;
    const x = 1235 + Math.sin(u * 6 + i) * 30;
    const y = 290 - u * 150;
    const a = Math.min(1, u * 5) * (1 - u);
    ctx.strokeStyle = `rgba(${TEAL},${a})`;
    ctx.lineWidth = 1;
    ctx.strokeRect(x - 6, y - 4, 12, 8);
    path(ctx, [[x - 6, y - 4], [x, y], [x + 6, y - 4]]);
    ctx.stroke();
  }

  // hops: ping ripples, latest one strongest
  HOPS.forEach((h, i) => {
    const u = (t * 0.6 - i * 0.25) % 1;
    const uu = u < 0 ? u + 1 : u;
    ctx.strokeStyle = `rgba(${h.big ? TEAL : BLUE},${(1 - uu) * (h.big ? 0.7 : 0.35)})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(h.x, h.y, 10 + uu * (h.big ? 40 : 22), 0, Math.PI * 2);
    ctx.stroke();
  });

  // camera + AP blinks
  ctx.fillStyle = Math.sin(t * 2) > 0 ? "#f87171" : "rgba(248,113,113,0.2)";
  ctx.beginPath();
  ctx.arc(955, 531, 2.4, 0, Math.PI * 2);
  ctx.fill();
  for (let k = 0; k < 3; k++) {
    const u = (t * 0.7 + k / 3) % 1;
    ctx.strokeStyle = `rgba(${DIM},${(1 - u) * 0.4})`;
    ctx.beginPath();
    ctx.arc(660, 524, 8 + u * 30, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
  }

  // hover and active highlight, with the dwell timer
  for (const pl of PLACES) {
    const isA = L.active === pl.id;
    const isH = L.hover === pl.id;
    if (!isA && !isH) continue;
    ctx.save();
    ctx.strokeStyle = `rgba(${TEAL},${isA ? 0.9 : 0.6})`;
    ctx.lineWidth = 1.4;
    ctx.setLineDash([4, 5]);
    ctx.lineDashOffset = -t * 20;
    const x = pl.hx - pl.rx;
    const y = pl.hy - pl.ry;
    const w = pl.rx * 2;
    const h = pl.ry * 2;
    rr(ctx, x, y, w, h, 14);
    ctx.stroke();
    ctx.setLineDash([]);
    // corner brackets
    ctx.lineWidth = 2.4;
    ctx.strokeStyle = `rgba(${TEAL},1)`;
    for (const [cx, cy, sx, sy] of [[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]] as [number, number, number, number][]) {
      path(ctx, [[cx, cy + 16 * sy], [cx, cy], [cx + 16 * sx, cy]]);
      ctx.stroke();
    }
    if (isH && !isA && L.dwell > 0) {
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(pl.hx + pl.rx - 2, pl.hy - pl.ry + 2, 10, -Math.PI / 2, -Math.PI / 2 + L.dwell * Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

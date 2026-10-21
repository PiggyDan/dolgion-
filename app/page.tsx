import { readFileSync } from "node:fs";
import path from "node:path";
import Portfolio, { type Shot } from "@/components/Portfolio";

/** Reads a PNG's real size from its header at build time, or null when the file is missing. */
function pngShot(file: string): Shot | null {
  try {
    const buf = readFileSync(path.join(process.cwd(), "public", file));
    if (buf.toString("ascii", 12, 16) !== "IHDR") return null;
    return { src: `/${file}`, width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    return null;
  }
}

export default function Home() {
  return <Portfolio shots={{ before: pngShot("images/odoo13.png"), after: pngShot("images/odoo19.png") }} />;
}

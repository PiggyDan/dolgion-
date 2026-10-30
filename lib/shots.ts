import { readFileSync } from "node:fs";
import path from "node:path";

export type Shot = { src: string; width: number; height: number; alt: string; caption: string };

/** Reads a PNG's real size from its header at build time, or null when the file is missing. */
export function pngShot(file: string, alt: string, caption: string): Shot | null {
  try {
    const buf = readFileSync(path.join(process.cwd(), "public", file));
    if (buf.toString("ascii", 12, 16) !== "IHDR") return null;
    return { src: `/${file}`, width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), alt, caption };
  } catch {
    return null;
  }
}

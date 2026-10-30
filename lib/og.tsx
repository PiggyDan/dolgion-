import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const ogSize = { width: 1200, height: 630 };

/** Plain text social card shared by the home page and the case studies. */
export function ogCard({ kicker, title }: { kicker: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0d1320",
          color: "#eee9e0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#5fb8ad", letterSpacing: 1 }}>{kicker}</div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 62 : 76, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#a9afb9" }}>
          <span>{profile.name}</span>
          <span>{profile.availability}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}

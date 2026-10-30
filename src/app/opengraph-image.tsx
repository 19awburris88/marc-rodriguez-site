import { ImageResponse } from "next/og";

export const alt = "Marc Rodriguez — Founder, Entrepreneur, Keynote Speaker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Text-only social card. Swap for a portrait-based card once an approved photo exists. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          background: "#111111",
          color: "#F4F1EA",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ width: 72, height: 4, background: "#B89A63", marginBottom: 36 }} />
        <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: -2 }}>Marc Rodriguez</div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#B89A63",
            letterSpacing: 6,
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          Speaker · Manifest Founder
        </div>
      </div>
    ),
    size,
  );
}

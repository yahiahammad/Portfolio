import { ImageResponse } from "next/og";
import { CASE_STUDIES } from "@/lib/case-studies";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image({ params }: { params: { slug: string } }) {
  const study = CASE_STUDIES[params.slug];
  if (!study) return new Response("Not found", { status: 404 });

  const tagline =
    study.tagline.length > 120
      ? study.tagline.slice(0, 117) + "…"
      : study.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#080809",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -100,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 65%)",
          }}
        />

        {/* Top: branding + type */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
          <span style={{ color: "#f1f1f3", fontSize: 22, letterSpacing: "0.04em" }}>
            YH<span style={{ color: "#3b82f6" }}>.</span>
          </span>
          <span
            style={{
              color: "#3b82f6",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              border: "1px solid rgba(59,130,246,0.38)",
              padding: "6px 14px",
              borderRadius: 2,
            }}
          >
            {study.type}
          </span>
        </div>

        {/* Centre: id + title + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
          <span style={{ color: "rgba(241,241,243,0.28)", fontSize: 14, letterSpacing: "0.14em" }}>
            // case study · {study.id}
          </span>
          <div style={{ color: "#f1f1f3", fontSize: 72, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
            {study.title}
          </div>
          <div style={{ color: "rgba(241,241,243,0.52)", fontSize: 20, lineHeight: 1.55, maxWidth: 780 }}>
            {tagline}
          </div>
        </div>

        {/* Bottom: stack pills + meta */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {study.stack.slice(0, 5).map((tag) => (
              <span
                key={tag}
                style={{
                  color: "rgba(241,241,243,0.5)",
                  fontSize: 13,
                  border: "1px solid rgba(255,255,255,0.13)",
                  padding: "5px 12px",
                  borderRadius: 2,
                  letterSpacing: "0.025em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span style={{ color: "rgba(241,241,243,0.26)", fontSize: 13, letterSpacing: "0.06em" }}>
            yahiahammad.com
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

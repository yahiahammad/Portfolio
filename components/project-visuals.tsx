// SVG architecture diagrams for case study overview sections.

const MONO = "'JetBrains Mono', 'Courier New', monospace";

// ── Shared primitives ──────────────────────────────────────────────────────────

function Node({
  x, y, w, h, label, sub, accent = false,
}: {
  x: number; y: number; w: number; h: number;
  label: string; sub?: string; accent?: boolean;
}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx={2}
        style={{
          fill: accent ? "var(--color-accent-dim)" : "var(--color-surface)",
          stroke: accent ? "var(--color-accent-border)" : "var(--color-border)",
          strokeWidth: 1,
        }}
      />
      <text
        x={cx}
        y={cy + (sub ? -5 : 4)}
        textAnchor="middle"
        style={{
          fill: accent ? "var(--color-accent)" : "var(--color-text)",
          fontFamily: MONO,
          fontSize: "9px",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </text>
      {sub && (
        <text
          x={cx}
          y={cy + 9}
          textAnchor="middle"
          style={{
            fill: "var(--color-dim)",
            fontFamily: MONO,
            fontSize: "7.5px",
          }}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ x1, x2, y, dashed = false }: { x1: number; x2: number; y: number; dashed?: boolean }) {
  return (
    <g>
      <line
        x1={x1} y1={y} x2={x2 - 7} y2={y}
        strokeDasharray={dashed ? "4 3" : undefined}
        style={{ stroke: "var(--color-accent)", opacity: 0.45, strokeWidth: 1 }}
      />
      <polygon
        points={`${x2},${y} ${x2 - 8},${y - 3.5} ${x2 - 8},${y + 3.5}`}
        style={{ fill: "var(--color-accent)", opacity: 0.45 }}
      />
    </g>
  );
}

function EyebrowLabel({ text, vbWidth }: { text: string; vbWidth: number }) {
  return (
    <text
      x={vbWidth / 2}
      y={16}
      textAnchor="middle"
      style={{
        fill: "var(--color-dim)",
        fontFamily: MONO,
        fontSize: "8.5px",
        letterSpacing: "0.13em",
      }}
    >
      {text}
    </text>
  );
}

// ── Case study diagrams — viewBox 0 0 740 130 ─────────────────────────────────
// Placed after overview paragraphs to illustrate system architecture.

function UnibiteDiagram() {
  const Y = 28; const H = 52; const W = 160; const AY = Y + H / 2;
  return (
    <svg viewBox="0 0 740 130" width="100%" aria-hidden="true" style={{ display: "block" }}>
      <EyebrowLabel text="SYSTEM ARCHITECTURE — THREE-TIER RBAC" vbWidth={740} />
      <Node x={15}  y={Y} w={W} h={H} label="STUDENT"     sub="Browser · JWT cookie" />
      <Node x={195} y={Y} w={W} h={H} label="EXPRESS API" sub="RBAC middleware layer" accent />
      <Node x={375} y={Y} w={W} h={H} label="MONGODB"     sub="Mongoose · aggregations" />
      <Node x={555} y={Y} w={W} h={H} label="VENDOR / ADMIN" sub="Dashboard · analytics" />
      <Arrow x1={175} x2={195} y={AY} />
      <Arrow x1={355} x2={375} y={AY} />
      <Arrow x1={535} x2={555} y={AY} />
      {/* edge labels */}
      <text x={185} y={AY - 5} textAnchor="middle"
        style={{ fill: "var(--color-accent)", fontFamily: MONO, fontSize: "7px", opacity: 0.7 }}>
        JWT
      </text>
      <text x={365} y={AY - 5} textAnchor="middle"
        style={{ fill: "var(--color-dim)", fontFamily: MONO, fontSize: "7px" }}>
        Mongoose ODM
      </text>
      <text x={545} y={AY - 5} textAnchor="middle"
        style={{ fill: "var(--color-dim)", fontFamily: MONO, fontSize: "7px" }}>
        role gate
      </text>
    </svg>
  );
}

function RoboticArmDiagram() {
  const Y = 28; const H = 52; const W = 155; const AY = Y + H / 2;
  return (
    <svg viewBox="0 0 740 130" width="100%" aria-hidden="true" style={{ display: "block" }}>
      <EyebrowLabel text="SIGNAL PIPELINE — GLOVE TO SERVO" vbWidth={740} />
      <Node x={12}  y={Y} w={W} h={H} label="GLOVE"       sub="flex × 5 + MPU-6050" />
      <Node x={187} y={Y} w={W} h={H} label="ESP32 · TX"  sub="ADC · comp. filter" accent />
      <Node x={362} y={Y} w={W} h={H} label="ESP32 · RX"  sub="UDP 100 Hz · < 20ms" accent />
      <Node x={537} y={Y} w={W} h={H} label="SERVO HAND"  sub="LEDC PWM · 6 DOF" />
      <Arrow x1={167} x2={187} y={AY} />
      <Arrow x1={342} x2={362} y={AY} dashed />
      <Arrow x1={517} x2={537} y={AY} />
      <text x={177} y={AY - 5} textAnchor="middle"
        style={{ fill: "var(--color-dim)", fontFamily: MONO, fontSize: "7px" }}>
        I2C 400 kHz
      </text>
      <text x={352} y={AY - 5} textAnchor="middle"
        style={{ fill: "var(--color-accent)", fontFamily: MONO, fontSize: "7px", opacity: 0.7 }}>
        Wi-Fi UDP
      </text>
      <text x={527} y={AY - 5} textAnchor="middle"
        style={{ fill: "var(--color-dim)", fontFamily: MONO, fontSize: "7px" }}>
        50 Hz · 50 B
      </text>
    </svg>
  );
}

function CareerPathDiagram() {
  const Y = 28; const H = 52; const W = 160; const AY = Y + H / 2;
  return (
    <svg viewBox="0 0 740 130" width="100%" aria-hidden="true" style={{ display: "block" }}>
      <EyebrowLabel text="RAG PIPELINE — SKILL INTAKE TO ROADMAP" vbWidth={740} />
      <Node x={15}  y={Y} w={W} h={H} label="SKILLS INPUT" sub="Fuse.js · 200+ taxonomy" />
      <Node x={195} y={Y} w={W} h={H} label="VECTOR STORE" sub="Supabase pgvector · Xenova" accent />
      <Node x={375} y={Y} w={W} h={H} label="GROQ · LLM"   sub="Llama 3.3 · < 150ms" accent />
      <Node x={555} y={Y} w={W} h={H} label="ROADMAP"      sub="Mermaid.js · streaming" />
      <Arrow x1={175} x2={195} y={AY} />
      <Arrow x1={355} x2={375} y={AY} />
      <Arrow x1={535} x2={555} y={AY} />
      <text x={185} y={AY - 5} textAnchor="middle"
        style={{ fill: "var(--color-dim)", fontFamily: MONO, fontSize: "7px" }}>
        gap report
      </text>
      <text x={365} y={AY - 5} textAnchor="middle"
        style={{ fill: "var(--color-accent)", fontFamily: MONO, fontSize: "7px", opacity: 0.7 }}>
        RAG retrieve
      </text>
      <text x={545} y={AY - 5} textAnchor="middle"
        style={{ fill: "var(--color-dim)", fontFamily: MONO, fontSize: "7px" }}>
        token stream
      </text>
    </svg>
  );
}

function FitnessDiagram() {
  // 5 nodes in 740px — narrower
  const Y = 28; const H = 52; const W = 118; const AY = Y + H / 2;
  return (
    <svg viewBox="0 0 740 130" width="100%" aria-hidden="true" style={{ display: "block" }}>
      <EyebrowLabel text="CV PIPELINE — WEBCAM TO REP COUNTER" vbWidth={740} />
      <Node x={12}  y={Y} w={W} h={H} label="WEBCAM"    sub="30 fps · CPU" />
      <Node x={144} y={Y} w={W} h={H} label="MEDIAPIPE" sub="33 keypoints" accent />
      <Node x={276} y={Y} w={W} h={H} label="ARCTAN2"   sub="joint angles" accent />
      <Node x={408} y={Y} w={W} h={H} label="EMA"       sub="α=0.7 smooth" />
      <Node x={540} y={Y} w={W} h={H} label="FSM · HUD" sub="4 exercises" />
      <Arrow x1={130} x2={144} y={AY} />
      <Arrow x1={262} x2={276} y={AY} />
      <Arrow x1={394} x2={408} y={AY} />
      <Arrow x1={526} x2={540} y={AY} />
      <text x={137} y={AY - 5} textAnchor="middle"
        style={{ fill: "var(--color-dim)", fontFamily: MONO, fontSize: "7px" }}>
        landmarks
      </text>
      <text x={269} y={AY - 5} textAnchor="middle"
        style={{ fill: "var(--color-accent)", fontFamily: MONO, fontSize: "7px", opacity: 0.7 }}>
        triplets
      </text>
      <text x={401} y={AY - 5} textAnchor="middle"
        style={{ fill: "var(--color-dim)", fontFamily: MONO, fontSize: "7px" }}>
        denoise
      </text>
      <text x={533} y={AY - 5} textAnchor="middle"
        style={{ fill: "var(--color-dim)", fontFamily: MONO, fontSize: "7px" }}>
        wrist gate
      </text>
    </svg>
  );
}

export const CASE_STUDY_DIAGRAMS: Record<string, React.ReactNode> = {
  "unibite":            <UnibiteDiagram />,
  "robotic-arm":        <RoboticArmDiagram />,
  "careerpath-ai":      <CareerPathDiagram />,
  "ai-fitness-tracker": <FitnessDiagram />,
};

"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

/* ── Landmark indices ─────────────────────────────────────────────────────── */
const LM = {
  NOSE: 0,
  L_SHOULDER: 11, R_SHOULDER: 12,
  L_ELBOW: 13,    R_ELBOW: 14,
  L_WRIST: 15,    R_WRIST: 16,
  L_HIP: 23,
  L_KNEE: 25,
  L_ANKLE: 27,
} as const;

const CONNECTIONS: [number, number][] = [
  [11,12],[11,13],[13,15],[12,14],[14,16],
  [11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],
  [15,17],[15,19],[16,18],[16,20],
  [27,29],[28,30],[27,31],[28,32],
];

/* ── Angle calculation (arctan2, matches Python implementation) ───────────── */
function calculateAngle(
  a: [number, number],
  b: [number, number],
  c: [number, number],
): number {
  const rad =
    Math.atan2(c[1] - b[1], c[0] - b[0]) -
    Math.atan2(a[1] - b[1], a[0] - b[0]);
  let angle = Math.abs((rad * 180) / Math.PI);
  if (angle > 180) angle = 360 - angle;
  return angle;
}

const ALPHA = 0.7;
const W = 640;
const H = 480;

type Status = "idle" | "loading" | "running" | "error";

/* ── HUD drawing ──────────────────────────────────────────────────────────── */
interface HUDState {
  leftCurl: number;  leftStage: string;  lAngle: number;
  rightCurl: number; rightStage: string; rAngle: number;
  squat: number;     squatStage: string; sqAngle: number;
  press: number;     pressStage: string;
}

function drawHUD(ctx: CanvasRenderingContext2D, s: HUDState) {
  const MONO = "'JetBrains Mono', monospace";

  // Semi-transparent bars
  ctx.fillStyle = "rgba(0,0,0,0.58)";
  ctx.fillRect(0, 0, W, 96);
  ctx.fillRect(0, H - 64, W, 64);

  // ── Left curl ────────────────────────────────────────────────────────────
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.font = `bold 13px ${MONO}`;
  ctx.fillStyle = "#f57511";
  ctx.fillText(`L CURL  ${s.leftCurl}`, 14, 26);
  ctx.font = `10px ${MONO}`;
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.fillText(s.leftStage ? s.leftStage.toUpperCase() : "—", 14, 46);

  // left progress bar (fully curled = 0°, fully extended = 140°)
  const lProg = Math.max(0, Math.min(1, 1 - (s.lAngle - 40) / 100));
  ctx.fillStyle = "rgba(245,117,17,0.2)";
  ctx.fillRect(14, 60, 120, 5);
  ctx.fillStyle = "#f57511";
  ctx.fillRect(14, 60, 120 * lProg, 5);

  // ── Right curl ───────────────────────────────────────────────────────────
  ctx.textAlign = "right";
  ctx.font = `bold 13px ${MONO}`;
  ctx.fillStyle = "#1175f5";
  ctx.fillText(`R CURL  ${s.rightCurl}`, W - 14, 26);
  ctx.font = `10px ${MONO}`;
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.fillText(s.rightStage ? s.rightStage.toUpperCase() : "—", W - 14, 46);

  const rProg = Math.max(0, Math.min(1, 1 - (s.rAngle - 40) / 100));
  ctx.fillStyle = "rgba(17,117,245,0.2)";
  ctx.fillRect(W - 134, 60, 120, 5);
  ctx.fillStyle = "#1175f5";
  ctx.fillRect(W - 134 + 120 * (1 - rProg), 60, 120 * rProg, 5);

  // ── Squats (centre top) ──────────────────────────────────────────────────
  ctx.textAlign = "center";
  ctx.font = `bold 13px ${MONO}`;
  ctx.fillStyle = "#75f511";
  ctx.fillText(`SQUATS  ${s.squat}`, W / 2, 26);
  ctx.font = `10px ${MONO}`;
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.fillText(s.squatStage ? s.squatStage.toUpperCase() : "—", W / 2, 46);

  const sqProg = Math.max(0, Math.min(1, 1 - (s.sqAngle - 90) / 70));
  ctx.fillStyle = "rgba(117,245,17,0.2)";
  ctx.fillRect(W / 2 - 60, 60, 120, 5);
  ctx.fillStyle = "#75f511";
  ctx.fillRect(W / 2 - 60, 60, 120 * sqProg, 5);

  // ── Shoulder press (bottom) ──────────────────────────────────────────────
  ctx.textAlign = "center";
  ctx.font = `bold 13px ${MONO}`;
  ctx.fillStyle = "#c864ff";
  ctx.fillText(`SHOULDER PRESS  ${s.press}`, W / 2, H - 40);
  ctx.font = `10px ${MONO}`;
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.fillText(s.pressStage ? s.pressStage.toUpperCase() : "—", W / 2, H - 20);
}

/* ── Skeleton drawing ─────────────────────────────────────────────────────── */
function drawSkeleton(
  ctx: CanvasRenderingContext2D,
  lms: { x: number; y: number }[],
) {
  const pts = lms.map((lm) => [(1 - lm.x) * W, lm.y * H] as [number, number]);

  ctx.strokeStyle = "rgba(245,66,230,0.65)";
  ctx.lineWidth = 2;
  for (const [a, b] of CONNECTIONS) {
    if (!pts[a] || !pts[b]) continue;
    ctx.beginPath();
    ctx.moveTo(pts[a][0], pts[a][1]);
    ctx.lineTo(pts[b][0], pts[b][1]);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(245,117,66,0.9)";
  for (const [x, y] of pts) {
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* ── Main component ───────────────────────────────────────────────────────── */
export default function TrackerDemo() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const landmarkerRef = useRef<any>(null);

  // All mutable loop state lives in refs — no re-renders during detection
  const smoothedRef = useRef({ l: 0, r: 0, sq: 0 });
  const countersRef = useRef({ leftCurl: 0, rightCurl: 0, squat: 0, press: 0 });
  const stagesRef = useRef({ leftCurl: "", rightCurl: "", squat: "", press: "" });

  // detectFnRef lets the RAF callback always call the latest closure version
  const detectFnRef = useRef<() => void>(() => {});
  detectFnRef.current = function detect() {
    if (!runningRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const landmarker = landmarkerRef.current;

    if (!video || !canvas || !landmarker || video.readyState < 2) {
      rafRef.current = requestAnimationFrame(() => detectFnRef.current());
      return;
    }

    const ctx = canvas.getContext("2d")!;

    // Draw mirrored video frame
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -W, 0, W, H);
    ctx.restore();

    const results = landmarker.detectForVideo(video, performance.now());
    const lms: { x: number; y: number; z: number }[] | null =
      results.landmarks?.[0] ?? null;

    const sm = smoothedRef.current;
    let lAngle = sm.l;
    let rAngle = sm.r;
    let sqAngle = sm.sq;

    if (lms) {
      const get = (i: number): [number, number] => [lms[i].x, lms[i].y];

      const rawL = calculateAngle(get(LM.L_SHOULDER), get(LM.L_ELBOW), get(LM.L_WRIST));
      const rawR = calculateAngle(get(LM.R_SHOULDER), get(LM.R_ELBOW), get(LM.R_WRIST));
      const rawSq = calculateAngle(get(LM.L_HIP), get(LM.L_KNEE), get(LM.L_ANKLE));

      lAngle  = ALPHA * sm.l  + (1 - ALPHA) * rawL;
      rAngle  = ALPHA * sm.r  + (1 - ALPHA) * rawR;
      sqAngle = ALPHA * sm.sq + (1 - ALPHA) * rawSq;
      smoothedRef.current = { l: lAngle, r: rAngle, sq: sqAngle };

      const noseY   = lms[LM.NOSE].y;
      const lWristY = lms[LM.L_WRIST].y;
      const rWristY = lms[LM.R_WRIST].y;
      const S = stagesRef.current;
      const C = countersRef.current;

      // Left bicep curl (wrist stays below nose)
      if (lAngle > 140 && lWristY > noseY) S.leftCurl = "down";
      if (lAngle < 40 && S.leftCurl === "down" && lWristY > noseY) {
        S.leftCurl = "up";
        C.leftCurl++;
      }

      // Right bicep curl (wrist stays below nose)
      if (rAngle > 140 && rWristY > noseY) S.rightCurl = "down";
      if (rAngle < 40 && S.rightCurl === "down" && rWristY > noseY) {
        S.rightCurl = "up";
        C.rightCurl++;
      }

      // Shoulder press (wrists go above nose)
      if (lAngle < 90 && rAngle < 90) S.press = "down";
      if (
        lAngle > 160 && rAngle > 160 &&
        S.press === "down" &&
        lWristY < noseY && rWristY < noseY
      ) {
        S.press = "up";
        C.press++;
      }

      // Squat
      if (sqAngle > 160) S.squat = "up";
      if (sqAngle < 90 && S.squat === "up") {
        S.squat = "down";
        C.squat++;
      }

      drawSkeleton(ctx, lms);
    }

    const C = countersRef.current;
    const S = stagesRef.current;
    drawHUD(ctx, {
      leftCurl: C.leftCurl,   leftStage: S.leftCurl,   lAngle,
      rightCurl: C.rightCurl, rightStage: S.rightCurl, rAngle,
      squat: C.squat,         squatStage: S.squat,     sqAngle,
      press: C.press,         pressStage: S.press,
    });

    rafRef.current = requestAnimationFrame(() => detectFnRef.current());
  };

  function stop() {
    runningRef.current = false;
    cancelAnimationFrame(rafRef.current);
    const v = videoRef.current;
    if (v?.srcObject) {
      (v.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      v.srcObject = null;
    }
    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext("2d")?.clearRect(0, 0, W, H);
    setStatus("idle");
  }

  async function start() {
    setStatus("loading");
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: W, height: H, facingMode: "user" },
        audio: false,
      });
      const video = videoRef.current!;
      video.srcObject = stream;
      await video.play();

      const { PoseLandmarker, FilesetResolver } = await import(
        "@mediapipe/tasks-vision"
      );
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
      );
      landmarkerRef.current = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 1,
      });

      smoothedRef.current = { l: 0, r: 0, sq: 0 };
      countersRef.current = { leftCurl: 0, rightCurl: 0, squat: 0, press: 0 };
      stagesRef.current = { leftCurl: "", rightCurl: "", squat: "", press: "" };

      runningRef.current = true;
      setStatus("running");
      rafRef.current = requestAnimationFrame(() => detectFnRef.current());
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to start";
      setError(msg);
      setStatus("error");
    }
  }

  useEffect(() => () => stop(), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Fixed grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-lines" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[54px] border-b border-[var(--color-border)] bg-[rgba(8,8,9,0.84)] backdrop-blur-[16px] saturate-150">
        <div className="max-w-[1180px] mx-auto px-14 h-full flex items-center justify-between max-[640px]:px-6">
          <Link
            href="/"
            className="font-mono text-[13px] font-medium tracking-[0.04em]"
          >
            YH<span className="text-[var(--color-accent)]">.</span>
          </Link>
          <Link
            href="/projects/ai-fitness-tracker"
            className="flex items-center gap-[7px] font-mono text-[11px] text-[var(--color-dim)] tracking-[0.06em] hover:text-[var(--color-text)] transition-colors duration-150"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M8 2L4 6l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            back to case study
          </Link>
        </div>
      </nav>

      <div className="relative z-10 pt-[54px]">
        {/* Header */}
        <div className="border-b border-[var(--color-border)]">
          <div className="max-w-[1180px] mx-auto px-14 py-10 max-[640px]:px-6">
            <p className="font-mono text-[11px] text-[var(--color-dim)] tracking-[0.14em] uppercase mb-3">
              // live demo
            </p>
            <h1 className="text-[30px] font-semibold tracking-[-0.025em] mb-2">
              AI Fitness Tracker
            </h1>
            <p className="text-[14px] leading-[1.65] text-[var(--color-muted)] max-w-[520px]">
              MediaPipe Pose running via WebAssembly in your browser. Tracks
              bicep curls (L &amp; R), squats, and shoulder press simultaneously.
              No video leaves your device.
            </p>
          </div>
        </div>

        {/* Main */}
        <div className="max-w-[1180px] mx-auto px-14 py-10 max-[640px]:px-6">
          <div className="grid grid-cols-[640px_1fr] gap-10 items-start max-[1024px]:grid-cols-1">

            {/* Camera feed */}
            <div>
              <div
                className="relative bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden"
                style={{ width: "100%", aspectRatio: "4/3" }}
              >
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
                />
                <canvas
                  ref={canvasRef}
                  width={W}
                  height={H}
                  className="w-full h-full"
                />

                {/* Idle overlay */}
                {status === "idle" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[var(--color-bg)]">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      className="text-[var(--color-dim)]"
                    >
                      <rect
                        x="14"
                        y="4"
                        width="12"
                        height="16"
                        rx="6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M7 20c0 7.18 5.82 13 13 13s13-5.82 13-13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="20"
                        y1="33"
                        x2="20"
                        y2="38"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <button
                      onClick={start}
                      className="px-8 py-[11px] bg-[var(--color-accent)] text-white font-medium text-[14px] rounded-[4px] hover:brightness-110 hover:-translate-y-px transition-all duration-[180ms]"
                    >
                      Start Tracker
                    </button>
                    <p className="font-mono text-[10px] text-[var(--color-dim)] text-center leading-[1.7]">
                      Webcam required · all processing is local
                    </p>
                  </div>
                )}

                {/* Loading overlay */}
                {status === "loading" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--color-bg)]">
                    <div className="w-5 h-5 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                    <p className="font-mono text-[11px] text-[var(--color-dim)] tracking-[0.06em]">
                      Loading pose model…
                    </p>
                  </div>
                )}

                {/* Error overlay */}
                {status === "error" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--color-bg)] px-8 text-center">
                    <p className="font-mono text-[11px] text-red-400 leading-[1.6]">
                      {error}
                    </p>
                    <button
                      onClick={start}
                      className="font-mono text-[11px] text-[var(--color-accent)] hover:underline"
                    >
                      Try again
                    </button>
                  </div>
                )}
              </div>

              {/* Stop button */}
              {status === "running" && (
                <div className="mt-3 flex items-center gap-3">
                  <span className="flex items-center gap-[6px] font-mono text-[10px] text-emerald-400 tracking-[0.06em]">
                    <span className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse-dot" />
                    LIVE
                  </span>
                  <button
                    onClick={stop}
                    className="px-5 py-[7px] border border-[var(--color-border-s)] font-mono text-[11px] text-[var(--color-dim)] rounded-[4px] hover:border-[var(--color-accent-border)] hover:text-[var(--color-text)] transition-all duration-[180ms]"
                  >
                    Stop
                  </button>
                </div>
              )}
            </div>

            {/* Instructions panel */}
            <div className="flex flex-col gap-4">
              <p className="font-mono text-[9.5px] text-[var(--color-dim)] tracking-[0.13em] uppercase mb-1">
                How to use
              </p>

              {[
                {
                  color: "#f57511",
                  label: "Bicep Curl (L / R)",
                  desc: "Keep wrists below your chin throughout. Extend arm fully (>140°) for DOWN, curl fully (<40°) for UP. Left and right are counted independently.",
                },
                {
                  color: "#75f511",
                  label: "Squat",
                  desc: "Stand fully upright to reset (knee >160°). Squat until knee angle drops below 90° — each descent counts as one rep.",
                },
                {
                  color: "#c864ff",
                  label: "Shoulder Press",
                  desc: "Lower both arms (elbow <90°) for DOWN. Press overhead until arms are straight (>160°) with wrists above your nose for UP.",
                },
                {
                  color: "var(--color-dim)",
                  label: "Tips",
                  desc: "Stand ~1.5–2 m from your camera so your full body is visible. Good lighting improves landmark accuracy. The model runs fully on your device — no data is sent anywhere.",
                },
              ].map(({ color, label, desc }) => (
                <div
                  key={label}
                  className="border border-[var(--color-border)] p-5 hover:bg-[var(--color-surface-h)] transition-colors duration-150"
                >
                  <div
                    className="font-mono text-[10px] tracking-[0.10em] uppercase mb-[8px]"
                    style={{ color }}
                  >
                    {label}
                  </div>
                  <p className="text-[13px] leading-[1.65] text-[var(--color-muted)]">
                    {desc}
                  </p>
                </div>
              ))}

              {/* Tech note */}
              <div className="border-t border-[var(--color-border)] pt-4 mt-1">
                <p className="font-mono text-[9.5px] text-[var(--color-dim)] tracking-[0.06em] leading-[1.7]">
                  Powered by{" "}
                  <span className="text-[var(--color-muted)]">
                    MediaPipe Pose Landmarker (LITE)
                  </span>{" "}
                  via WebAssembly · EMA smoothing α=0.7 · arctan2 joint-angle
                  computation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

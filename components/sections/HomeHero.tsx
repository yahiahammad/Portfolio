"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";

const STAT_PILLS = ["24M+ rows processed", "4 shipped products", "3rd year CS"];

const TERMINAL_LINES = [
  { prompt: true,  text: "whoami" },
  { prompt: false, text: "yahia-hammad" },
  { prompt: true,  text: "cat expertise.txt" },
  { prompt: false, text: "ML  ·  Full-Stack  ·  AI" },
  { prompt: true,  text: "ls projects/" },
  { prompt: false, text: "unibite/        robotic-arm/" },
  { prompt: false, text: "careerpath-ai/  ai-fitness/" },
];

function TerminalBlock() {
  const reduced = useReducedMotion();
  const [completed, setCompleted] = useState(0);
  const [partial, setPartial] = useState(0);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduced) {
      setCompleted(TERMINAL_LINES.length);
      setDone(true);
      return;
    }

    let lineIdx = 0;
    let charIdx = 0;

    const tick = () => {
      if (lineIdx >= TERMINAL_LINES.length) {
        setDone(true);
        return;
      }
      const line = TERMINAL_LINES[lineIdx];
      if (charIdx < line.text.length) {
        charIdx++;
        setPartial(charIdx);
        timerRef.current = setTimeout(tick, 38);
      } else {
        lineIdx++;
        charIdx = 0;
        setCompleted(lineIdx);
        setPartial(0);
        timerRef.current = setTimeout(tick, line.prompt ? 260 : 60);
      }
    };

    timerRef.current = setTimeout(tick, 700);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reduced]);

  return (
    <div className="font-mono text-[12.5px] bg-[var(--color-surface)] border border-[var(--color-border-s)] rounded-[6px] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]">
      {/* Title bar */}
      <div className="flex items-center gap-[6px] px-4 py-[10px] border-b border-[var(--color-border)] bg-[var(--color-surface-h)]">
        <span className="w-[11px] h-[11px] rounded-full bg-[#ff5f57] opacity-80" />
        <span className="w-[11px] h-[11px] rounded-full bg-[#febc2e] opacity-80" />
        <span className="w-[11px] h-[11px] rounded-full bg-[#28c840] opacity-80" />
        <span className="ml-3 text-[10px] text-[var(--color-dim)] tracking-[0.05em]">
          ~  terminal
        </span>
      </div>

      {/* Lines */}
      <div className="p-5 flex flex-col gap-[7px] min-h-[180px]">
        {TERMINAL_LINES.map((line, i) => {
          if (i > completed) return null;
          const isCurrent = i === completed && !done;
          const text = isCurrent ? line.text.slice(0, partial) : line.text;

          return (
            <div key={i} className="flex gap-[10px] leading-[1.6]">
              <span
                className="shrink-0 select-none"
                style={{ color: line.prompt ? "var(--color-accent)" : "var(--color-dim)" }}
              >
                {line.prompt ? "$" : ">"}
              </span>
              <span style={{ color: line.prompt ? "var(--color-text)" : "var(--color-muted)" }}>
                {text}
                {isCurrent && (
                  <span
                    aria-hidden="true"
                    className="inline-block w-[7px] bg-[var(--color-accent)] opacity-80 ml-[2px] align-middle"
                    style={{ height: "1em", animation: "blink 1s step-end infinite" }}
                  />
                )}
              </span>
            </div>
          );
        })}

        {done && (
          <div className="flex gap-[10px] leading-[1.6]">
            <span className="shrink-0 select-none" style={{ color: "var(--color-accent)" }}>$</span>
            <span
              aria-hidden="true"
              className="inline-block w-[7px] bg-[var(--color-accent)] opacity-80 align-middle"
              style={{ height: "1em", animation: "blink 1s step-end infinite" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ScrollHint() {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 60) setVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 z-20 pointer-events-none flex flex-col items-center gap-[6px]"
      style={{ transform: "translateX(-50%)", opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
      aria-hidden="true"
    >
      <span className="font-mono text-[9px] text-[var(--color-dim)] tracking-[0.18em] uppercase">
        scroll
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className={reduced ? "" : "animate-scroll-bounce"}
        style={{ color: "var(--color-dim)" }}
      >
        <path
          d="M7 2v10M3 8l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function HomeHero() {
  return (
    <>
      <Navbar activePage="home" />

      <section id="main-content" className="min-h-screen flex items-center pt-[54px]">
        <div className="max-w-[1180px] mx-auto px-14 w-full max-[640px]:px-6">
          <div className="py-16 grid grid-cols-[1fr_400px] items-center gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10">

            {/* Left — text content */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
                className="font-mono text-[11px] text-[var(--color-dim)] tracking-[0.16em] uppercase mb-[30px]"
              >
                // portfolio · 2026
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="font-mono font-bold leading-none tracking-[-0.03em] mb-[22px] gradient-name"
                style={{ fontSize: "clamp(42px, 5.6vw, 78px)" }}
              >
                YAHIA HAMMAD
                <span
                  aria-hidden="true"
                  className="inline-block bg-[var(--color-accent)] align-middle ml-[2px]"
                  style={{
                    width: "0.55ch",
                    height: "0.82em",
                    animation: "blink 1.15s step-end infinite",
                  }}
                />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                className="text-[17px] font-normal leading-[1.55] text-[var(--color-muted)] mb-[44px] tracking-[0.01em]"
              >
                <strong className="text-[var(--color-text)] font-medium">Software Engineer</strong>
                {" · "}ML &amp; Full-Stack{" · "}Third-year CS @ MIU
              </motion.p>

              {/* Stat pills */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-wrap gap-[10px] mb-[44px]"
              >
                {STAT_PILLS.map((s) => (
                  <div
                    key={s}
                    className="inline-flex items-center gap-[9px] px-[13px] pr-[15px] py-[9px] border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] font-mono text-[12px] text-[var(--color-text)] rounded-[4px] tracking-[0.025em] shadow-[0_0_16px_rgba(59,130,246,0.06)]"
                  >
                    <span className="text-[var(--color-accent)] opacity-80 select-none" aria-hidden="true">&gt;</span>
                    {s}
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-center gap-3 flex-wrap"
              >
                <a
                  href="#projects"
                  className="btn-glow inline-flex items-center gap-2 px-[26px] py-[11px] bg-[var(--color-accent)] text-white font-medium text-[14px] rounded-[4px] hover:brightness-110 hover:-translate-y-px transition-all duration-[180ms]"
                >
                  View Projects
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M7.5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="/projects/Yahia_Hammad_CV.pdf"
                  download
                  className="inline-flex items-center gap-[7px] px-[22px] py-[10px] bg-transparent text-[var(--color-text)] text-[14px] border border-[var(--color-border-s)] rounded-[4px] hover:border-[var(--color-accent-border)] hover:bg-[var(--color-accent-dim)] hover:-translate-y-px transition-all duration-[180ms]"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path d="M6.5 1.5v6M4 5.5l2.5 2.5 2.5-2.5M2 10.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download CV
                </a>
              </motion.div>
            </div>

            {/* Right — terminal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <TerminalBlock />
            </motion.div>
          </div>
        </div>

        <ScrollHint />
      </section>
    </>
  );
}

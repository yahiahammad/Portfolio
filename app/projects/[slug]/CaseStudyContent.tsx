"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";
import { CASE_STUDY_DIAGRAMS } from "@/components/project-visuals";
import CopyEmailButton from "@/components/CopyEmailButton";

/* ── Reading progress bar ─────────────────────────────────────────────────── */
function ProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const fn = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-[300] bg-[var(--color-accent)] pointer-events-none transition-[width] duration-[80ms] linear"
      style={{ width: `${pct}%` }}
    />
  );
}

/* ── Nav ──────────────────────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav className="fixed top-[2px] left-0 right-0 z-[100] h-[54px] border-b border-[var(--color-border)] bg-[rgba(8,8,9,0.84)] backdrop-blur-[16px] saturate-150">
      <div className="max-w-[1180px] mx-auto px-14 h-full flex items-center justify-between max-[640px]:px-6">
        <Link
          href="/"
          className="font-mono text-[13px] font-medium tracking-[0.04em] text-[var(--color-text)]"
        >
          YH<span className="text-[var(--color-accent)]">.</span>
        </Link>
        <Link
          href="/"
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
          back to portfolio
        </Link>
      </div>
    </nav>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function Hero({ study }: { study: CaseStudy }) {
  return (
    <section className="min-h-[70vh] flex items-end pt-[56px] relative overflow-hidden border-b border-[var(--color-border)]">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 15% 60%, var(--color-accent-glow) 0%, transparent 60%)",
        }}
      />
      {/* Large background number */}
      <div
        className="absolute right-[5%] top-1/2 -translate-y-1/2 font-mono font-bold leading-none tracking-[-0.04em] select-none pointer-events-none"
        style={{ fontSize: "28vw", color: "rgba(255,255,255,0.018)" }}
      >
        {study.id}
      </div>

      <div className="max-w-[1180px] mx-auto px-14 w-full relative z-10 max-[640px]:px-6">
        <div className="pb-[72px]">
          <p className="font-mono text-[11px] text-[var(--color-dim)] tracking-[0.14em] mb-[22px]">
            // case study · {study.id}
          </p>

          <div className="inline-flex items-center gap-[7px] font-mono text-[10px] text-[var(--color-accent)] tracking-[0.12em] uppercase border border-[var(--color-accent-border)] px-[13px] py-[5px] rounded-[2px] mb-[30px]">
            <span
              className="w-[5px] h-[5px] rounded-full bg-[var(--color-accent)] animate-pulse-dot"
            />
            {study.type}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="font-mono font-bold leading-none tracking-[-0.035em] text-[var(--color-text)] mb-[26px]"
            style={{ fontSize: "clamp(48px, 6.8vw, 92px)" }}
          >
            {study.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="text-[16px] leading-[1.7] text-[var(--color-muted)] max-w-[580px] mb-[36px]"
          >
            {study.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="flex gap-[10px] flex-wrap"
          >
            <span className="font-mono text-[11px] text-[var(--color-text)] px-[12px] py-[5px] border border-[var(--color-border-s)] rounded-[2px] tracking-[0.04em]">
              {study.role}
            </span>
            <span className="font-mono text-[11px] text-[var(--color-dim)] px-[12px] py-[5px] border border-[var(--color-border-s)] rounded-[2px] tracking-[0.04em]">
              {study.timeline}
            </span>
            <span className="font-mono text-[11px] text-emerald-400 px-[12px] py-[5px] border border-emerald-400/30 rounded-[2px] tracking-[0.04em]">
              ⬤&nbsp;{study.status}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Metadata bar ─────────────────────────────────────────────────────────── */
function MetaBar({ study }: { study: CaseStudy }) {
  return (
    <div className="sticky top-[56px] z-[80] bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <div className="max-w-[1180px] mx-auto px-14 max-[640px]:px-6">
        {/* Top row: meta cells */}
        <div className="flex items-stretch flex-wrap min-h-[52px]">
          {[
            { k: "Role", v: study.role },
            { k: "Timeline", v: study.timeline },
          ].map((cell) => (
            <div
              key={cell.k}
              className="flex flex-col justify-center px-0 pr-6 mr-6 py-3 border-r border-[var(--color-border)] max-[480px]:pr-4 max-[480px]:mr-4"
            >
              <div className="font-mono text-[9px] text-[var(--color-dim)] tracking-[0.13em] uppercase mb-[3px]">
                {cell.k}
              </div>
              <div className="text-[13px] font-medium text-[var(--color-text)]">{cell.v}</div>
            </div>
          ))}

          <div className="flex flex-col justify-center pr-6 mr-6 py-3 border-r border-[var(--color-border)] max-[480px]:pr-4 max-[480px]:mr-4">
            <div className="font-mono text-[9px] text-[var(--color-dim)] tracking-[0.13em] uppercase mb-[3px]">
              Status
            </div>
            <div className="flex items-center gap-[5px] text-emerald-400 text-[13px] font-medium">
              <span className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse-dot" />
              {study.status}
            </div>
          </div>

          {/* Stack tags — push right on desktop, own row on mobile */}
          <div className="flex items-center gap-[7px] flex-wrap py-[10px] ml-auto max-[640px]:hidden">
            {study.stack.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] text-[var(--color-muted)] px-[10px] py-[4px] border border-[var(--color-border-s)] rounded-[2px] tracking-[0.025em] hover:text-[var(--color-text)] hover:border-[var(--color-accent-border)] transition-colors duration-150"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stack tags row — mobile only */}
        <div className="hidden max-[640px]:flex items-center gap-[6px] flex-wrap py-2 pb-3 border-t border-[var(--color-border)]">
          {study.stack.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-[var(--color-muted)] px-[9px] py-[3px] border border-[var(--color-border-s)] rounded-[2px] tracking-[0.025em]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── TOC ──────────────────────────────────────────────────────────────────── */
function TOC({ study, activeId }: { study: CaseStudy; activeId: string }) {
  return (
    <aside className="sticky top-[136px] max-[960px]:hidden">
      <p className="font-mono text-[9.5px] text-[var(--color-dim)] tracking-[0.13em] uppercase mb-4">
        On this page
      </p>
      <ul className="flex flex-col gap-px list-none">
        {study.sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`block font-mono text-[11.5px] tracking-[0.025em] py-[7px] pl-[14px] border-l-2 transition-colors duration-150 no-underline ${
                activeId === s.id
                  ? "text-[var(--color-accent)] border-l-[var(--color-accent)]"
                  : "text-[var(--color-dim)] border-transparent hover:text-[var(--color-muted)]"
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="h-px bg-[var(--color-border)] my-[14px]" />

      <Link
        href="/"
        className="flex items-center gap-[6px] font-mono text-[10.5px] text-[var(--color-dim)] tracking-[0.04em] py-[6px] hover:text-[var(--color-text)] transition-colors duration-150 no-underline"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M7 1L3 5l4 4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        All projects
      </Link>
    </aside>
  );
}

/* ── Section wrapper ──────────────────────────────────────────────────────── */
function CSSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef(null);

  return (
    <section ref={ref} id={id} className="mb-[80px] last:mb-0 scroll-mt-[140px]">
      <p className="font-mono text-[10px] text-[var(--color-dim)] tracking-[0.14em] uppercase mb-[14px]">
        {eyebrow}
      </p>
      <h2 className="text-[22px] font-semibold tracking-[-0.02em] mb-[20px] text-[var(--color-text)]">
        {title}
      </h2>
      <hr className="border-none border-t border-[var(--color-border)] mb-[28px]" />
      {children}
    </section>
  );
}

/* ── Main content ─────────────────────────────────────────────────────────── */
function CaseStudyBody({ study }: { study: CaseStudy }) {
  const bodyClass = "text-[15px] leading-[1.78] text-[var(--color-muted)]";
  const diagram = CASE_STUDY_DIAGRAMS[study.slug];

  return (
    <>
      <CSSection id="overview" eyebrow="// 01" title="Overview">
        <div className={bodyClass}>
          {study.overviewParagraphs.map((p, i) => (
            <p key={i} className={i > 0 ? "mt-4" : ""}>
              {p}
            </p>
          ))}
        </div>
        {diagram && (
          <div className="mt-8 border border-[var(--color-border)] bg-[var(--color-surface)] rounded-[2px] py-4 px-4 overflow-x-auto">
            {diagram}
          </div>
        )}
      </CSSection>

      <CSSection id="problem" eyebrow="// 02" title="Problem">
        <div className={bodyClass}>
          {study.problemParagraphs.map((p, i) => (
            <p key={i} className={i > 0 ? "mt-4" : ""}>
              {p}
            </p>
          ))}
        </div>
      </CSSection>

      <CSSection id="highlights" eyebrow="// 03" title="Technical Highlights">
        <ul className="flex flex-col gap-4 list-none">
          {study.highlights.map((h, i) => (
            <li key={i} className="grid gap-x-[14px]" style={{ gridTemplateColumns: "18px 1fr" }}>
              <span className="font-mono text-[var(--color-accent)] text-[12px] pt-[3px] select-none">
                &gt;
              </span>
              <span className="text-[14.5px] leading-[1.72] text-[var(--color-muted)]">{h}</span>
            </li>
          ))}
        </ul>
      </CSSection>

      <CSSection id="challenges" eyebrow="// 04" title="Challenges &amp; Decisions">
        <div className="flex flex-col gap-[14px]">
          {study.challenges.map((c, i) => (
            <div
              key={i}
              className="border border-[var(--color-border)] border-l-2 border-l-[var(--color-accent-border)] px-[26px] py-[22px] bg-[var(--color-surface)] hover:border-l-[var(--color-accent)] hover:bg-[var(--color-surface-h)] transition-all duration-200"
            >
              <div className="font-mono text-[9.5px] text-[var(--color-accent)] tracking-[0.12em] uppercase mb-[7px]">
                Challenge
              </div>
              <div className="text-[14px] font-medium text-[var(--color-text)] mb-[14px] leading-[1.5]">
                {c.q}
              </div>
              <div className="h-px bg-[var(--color-border)] mb-[14px]" />
              <div className="font-mono text-[9.5px] text-[var(--color-dim)] tracking-[0.12em] uppercase mb-[7px]">
                Decision
              </div>
              <div className="text-[13.5px] leading-[1.72] text-[var(--color-muted)]">{c.a}</div>
            </div>
          ))}
        </div>
      </CSSection>

      <CSSection id="outcome" eyebrow="// 05" title="Outcome">
        <div className="grid grid-cols-4 max-[640px]:grid-cols-2 gap-px bg-[var(--color-border)] border border-[var(--color-border)] mb-[28px]">
          {study.metrics.map((m, i) => (
            <div key={i} className="bg-[var(--color-bg)] px-6 py-[22px]">
              <div className="font-mono text-[28px] font-bold text-[var(--color-accent)] tracking-[-0.02em] leading-none mb-2">
                {m.n}
              </div>
              <div className="text-[12px] leading-[1.5] text-[var(--color-muted)]">{m.d}</div>
            </div>
          ))}
        </div>
        <p className="text-[15px] leading-[1.78] text-[var(--color-muted)]">{study.outcomeText}</p>
      </CSSection>
    </>
  );
}

/* ── CTAs ─────────────────────────────────────────────────────────────────── */
function CTAs({ study, nextStudy }: { study: CaseStudy; nextStudy: CaseStudy }) {
  return (
    <div className="border-t border-[var(--color-border)] py-[60px]">
      <div className="max-w-[1180px] mx-auto px-14 flex items-center justify-between flex-wrap gap-6 max-[640px]:px-6">
        <div className="flex gap-3 flex-wrap">
          {study.privateRepo ? (
            <span className="inline-flex items-center gap-2 px-[26px] py-[11px] bg-[var(--color-surface)] text-[var(--color-dim)] font-medium text-[14px] rounded-[4px] border border-[var(--color-border)] cursor-not-allowed select-none">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" className="opacity-40">
                <path d="M7.5 1a6.5 6.5 0 0 0-2.056 12.67c.325.06.444-.141.444-.313 0-.154-.006-.563-.009-1.106-1.808.393-2.19-.872-2.19-.872-.296-.752-.722-.952-.722-.952-.59-.403.044-.395.044-.395.652.046 1 .671 1 .671.58.994 1.524.707 1.895.54.059-.42.228-.706.414-.869-1.443-.164-2.96-.722-2.96-3.21 0-.708.253-1.288.667-1.742-.067-.164-.289-.823.063-1.716 0 0 .544-.175 1.782.664A6.22 6.22 0 0 1 7.5 4.68a6.22 6.22 0 0 1 1.623.218c1.237-.839 1.78-.664 1.78-.664.353.893.131 1.552.064 1.716.415.454.667 1.034.667 1.742 0 2.495-1.52 3.044-2.967 3.205.233.202.441.6.441 1.209 0 .873-.008 1.577-.008 1.79 0 .174.117.377.447.313A6.5 6.5 0 0 0 7.5 1z" />
              </svg>
              Private Repository
            </span>
          ) : (
            <a
              href={study.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-[26px] py-[11px] bg-[var(--color-accent)] text-white font-medium text-[14px] rounded-[4px] hover:brightness-110 hover:-translate-y-px transition-all duration-[180ms]"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                <path d="M7.5 1a6.5 6.5 0 0 0-2.056 12.67c.325.06.444-.141.444-.313 0-.154-.006-.563-.009-1.106-1.808.393-2.19-.872-2.19-.872-.296-.752-.722-.952-.722-.952-.59-.403.044-.395.044-.395.652.046 1 .671 1 .671.58.994 1.524.707 1.895.54.059-.42.228-.706.414-.869-1.443-.164-2.96-.722-2.96-3.21 0-.708.253-1.288.667-1.742-.067-.164-.289-.823.063-1.716 0 0 .544-.175 1.782.664A6.22 6.22 0 0 1 7.5 4.68a6.22 6.22 0 0 1 1.623.218c1.237-.839 1.78-.664 1.78-.664.353.893.131 1.552.064 1.716.415.454.667 1.034.667 1.742 0 2.495-1.52 3.044-2.967 3.205.233.202.441.6.441 1.209 0 .873-.008 1.577-.008 1.79 0 .174.117.377.447.313A6.5 6.5 0 0 0 7.5 1z" />
              </svg>
              View on GitHub
            </a>
          )}
          {study.demoPage && (
            <Link
              href={study.demoPage}
              className="inline-flex items-center gap-[7px] px-[22px] py-[10px] bg-transparent text-[var(--color-text)] text-[14px] border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] rounded-[4px] hover:brightness-110 hover:-translate-y-px transition-all duration-[180ms]"
            >
              <span className="w-[6px] h-[6px] rounded-full bg-[var(--color-accent)] animate-pulse-dot" />
              Try Live Demo
            </Link>
          )}
          {study.demo && (
            <a
              href={study.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[7px] px-[22px] py-[10px] bg-transparent text-[var(--color-text)] text-[14px] border border-[var(--color-border-s)] rounded-[4px] hover:border-[var(--color-accent-border)] hover:bg-[var(--color-accent-dim)] hover:-translate-y-px transition-all duration-[180ms]"
            >
              <span className="w-[6px] h-[6px] rounded-full bg-emerald-400 animate-pulse-dot" />
              Live Production
            </a>
          )}
        </div>

        <Link
          href={`/projects/${nextStudy.slug}`}
          className="inline-flex items-center gap-2 font-mono text-[12px] text-[var(--color-dim)] tracking-[0.06em] hover:text-[var(--color-text)] hover:gap-[13px] transition-all duration-[220ms]"
        >
          <span className="flex flex-col items-end gap-[2px]">
            <span className="text-[9px] tracking-[0.10em] uppercase opacity-60">Next</span>
            <span>{nextStudy.title}</span>
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 7h8M7.5 3.5l4 3.5-4 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ── Root export ──────────────────────────────────────────────────────────── */
export default function CaseStudyContent({ study, nextStudy }: { study: CaseStudy; nextStudy: CaseStudy }) {
  const [activeId, setActiveId] = useState("overview");

  useEffect(() => {
    const sectionEls = study.sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [study.sections]);

  return (
    <div className="relative min-h-screen">
      <ProgressBar />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-lines" />

      <div className="relative z-10">
        <Nav />
        <Hero study={study} />
        <MetaBar study={study} />

        {/* Content + TOC */}
        <div className="max-w-[1180px] mx-auto px-14 py-[80px] pb-[110px] grid grid-cols-[1fr_216px] gap-[88px] items-start max-[960px]:grid-cols-1 max-[960px]:gap-0 max-[640px]:px-6">
          <main>
            <CaseStudyBody study={study} />
          </main>
          <TOC study={study} activeId={activeId} />
        </div>

        <CTAs study={study} nextStudy={nextStudy} />

        <footer className="border-t border-[var(--color-border)]">
          <div className="max-w-[1180px] mx-auto px-14 py-[30px] flex items-center justify-between max-[640px]:flex-col max-[640px]:gap-3 max-[640px]:items-start max-[640px]:px-6">
            <CopyEmailButton email="yahiamhammad@gmail.com" suffix="Cairo, EG" />
            <div className="flex gap-[22px]">
              {[
                { label: "github", href: "https://github.com/yahiahammad" },
                { label: "portfolio", href: "/" },
                { label: "cv.pdf", href: "/uploads/Yahia_Hammad_CV.pdf", download: true },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  download={l.download}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-mono text-[11px] text-[var(--color-dim)] tracking-[0.04em] hover:text-[var(--color-accent)] transition-colors duration-150"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

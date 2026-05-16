"use client";

import { motion } from "framer-motion";

const LINKS = [
  {
    label: "github",
    href: "https://github.com/yahiahammad",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
        <path d="M6.5 1a5.5 5.5 0 0 0-1.74 10.72c.28.05.38-.12.38-.27v-.94c-1.53.33-1.85-.74-1.85-.74-.25-.63-.61-.8-.61-.8-.5-.34.04-.33.04-.33.55.04.84.57.84.57.49.84 1.29.6 1.6.46.05-.36.19-.6.35-.74-1.22-.14-2.5-.61-2.5-2.72 0-.6.21-1.09.56-1.47-.06-.14-.25-.7.05-1.45 0 0 .46-.15 1.5.56a5.25 5.25 0 0 1 2.74 0c1.05-.71 1.5-.56 1.5-.56.3.75.11 1.31.05 1.45.36.38.56.87.56 1.47 0 2.11-1.28 2.58-2.5 2.71.2.17.37.51.37 1.03v1.52c0 .15.1.32.38.27A5.5 5.5 0 0 0 6.5 1z" />
      </svg>
    ),
    external: true,
  },
  {
    label: "email",
    href: "mailto:yahiamhammad@gmail.com",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path
          d="M1.5 3.5h10v7h-10v-7zM1.5 3.5l5 4 5-4"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    external: false,
  },
  {
    label: "cv.pdf",
    href: "/projects/Yahia_Hammad_CV.docx",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M6 1.5v5.5M3.5 5l2.5 2.5L8.5 5M2 10h8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    download: true,
    external: false,
  },
];

const LANGUAGES = [
  { lang: "English", level: "C1 — Professional" },
  { lang: "Arabic", level: "Native" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] as const },
});

export default function BioColumn() {
  return (
    <aside className="sticky top-20">
      {/* Photo placeholder */}
      <motion.div
        {...fadeUp(0.1)}
        className="w-full mb-8 rounded-[3px] overflow-hidden border border-[var(--color-border-s)] aspect-[4/5] bg-[var(--color-surface)] flex items-center justify-center"
      >
        <span className="font-mono text-[11px] text-[var(--color-dim)] tracking-[0.08em]">
          photo
        </span>
      </motion.div>

      <motion.p {...fadeUp(0.15)} className="font-mono text-[18px] font-bold tracking-[-0.02em] mb-1">
        Yahia Hammad
      </motion.p>
      <motion.p {...fadeUp(0.18)} className="text-[13px] text-[var(--color-muted)] mb-6">
        Software Engineer · Cairo, EG
      </motion.p>

      <motion.p {...fadeUp(0.2)} className="text-[14px] leading-[1.78] text-[var(--color-muted)] mb-5 text-pretty">
        Third-year Computer Science student at{" "}
        <strong className="text-[var(--color-text)] font-medium">
          Misr International University
        </strong>
        , focused on machine learning and full-stack engineering. Most recently
        built production ETL pipelines at{" "}
        <strong className="text-[var(--color-text)] font-medium">PaySky</strong>
        , processing 24M+ transaction records with PySpark and deploying a
        customer segmentation platform end-to-end.
      </motion.p>
      <motion.p {...fadeUp(0.23)} className="text-[14px] leading-[1.78] text-[var(--color-muted)] mb-7 text-pretty">
        I build at the intersection of AI and software — from RAG-powered career
        platforms to wireless robotic arms. Always looking for problems where
        good engineering compounds into real impact.
      </motion.p>

      {/* Links */}
      <motion.div {...fadeUp(0.26)} className="flex gap-[10px] flex-wrap mb-9">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            download={l.download}
            target={l.external ? "_blank" : undefined}
            rel={l.external ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-[6px] font-mono text-[11px] text-[var(--color-dim)] tracking-[0.05em] px-3 py-[6px] border border-[var(--color-border-s)] rounded-[2px] hover:text-[var(--color-text)] hover:border-[var(--color-accent-border)] transition-colors duration-150"
          >
            {l.icon}
            {l.label}
          </a>
        ))}
      </motion.div>

      {/* Languages */}
      <motion.div {...fadeUp(0.3)}>
        <p className="font-mono text-[9.5px] text-[var(--color-dim)] tracking-[0.13em] uppercase mb-3">
          Languages
        </p>
        {LANGUAGES.map(({ lang, level }, i) => (
          <div
            key={lang}
            className={`flex justify-between items-center py-[7px] border-t border-[var(--color-border)] ${
              i === LANGUAGES.length - 1 ? "border-b" : ""
            }`}
          >
            <span className="text-[13px] text-[var(--color-text)]">{lang}</span>
            <span className="font-mono text-[10.5px] text-[var(--color-dim)]">
              {level}
            </span>
          </div>
        ))}
      </motion.div>
    </aside>
  );
}

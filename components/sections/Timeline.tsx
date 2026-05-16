"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EXPERIENCE, EDUCATION, type TimelineEntry } from "@/lib/about-data";

function TimelineEntry({
  entry,
  isEdu,
  delay,
}: {
  entry: TimelineEntry;
  isEdu: boolean;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -8 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.4, 0, 0.2, 1] }}
      className="relative pl-7 pb-9 last:pb-0"
    >
      {/* Dot */}
      <span
        className="absolute left-[-1.25rem] top-[5px] w-2 h-2 rounded-full bg-[var(--color-accent)]"
        style={{
          boxShadow:
            "0 0 0 3px var(--color-bg), 0 0 0 4.5px rgba(59,130,246,0.35)",
        }}
      />

      <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1">
        <div>
          <p className="text-[15px] font-semibold tracking-[-0.01em] mb-[3px]">
            {entry.title}
          </p>
          <p className="text-[12.5px] text-[var(--color-muted)] mb-3">
            {entry.org}
          </p>
        </div>
        <span className="font-mono text-[10.5px] text-[var(--color-dim)] tracking-[0.05em] shrink-0">
          {entry.date}
        </span>
      </div>

      {isEdu ? (
        <span className="inline-flex items-center font-mono text-[11px] text-[var(--color-dim)] px-[9px] py-[3px] border border-[var(--color-border)] rounded-[2px]">
          {entry.note}
        </span>
      ) : (
        <ul className="flex flex-col gap-[7px]">
          {entry.bullets?.map((bullet, i) => (
            <li key={i} className="grid grid-cols-[14px_1fr] gap-x-2 text-[13.5px] leading-[1.65] text-[var(--color-muted)]">
              <span className="font-mono text-[var(--color-border-s)] pt-[1px] select-none">
                —
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

function TimelineGroup({
  label,
  entries,
  isEdu,
  baseDelay,
}: {
  label: string;
  entries: TimelineEntry[];
  isEdu: boolean;
  baseDelay: number;
}) {
  return (
    <div className="mb-[52px] last:mb-0">
      <p className="font-mono text-[10px] text-[var(--color-accent)] tracking-[0.13em] uppercase mb-7 pb-3 border-b border-[var(--color-border)]">
        {label}
      </p>

      {/* Vertical line */}
      <div className="relative">
        <div
          className="absolute left-[3px] top-[6px] bottom-[6px] w-px bg-[var(--color-border)]"
          aria-hidden
        />
        {entries.map((entry, i) => (
          <TimelineEntry
            key={i}
            entry={entry}
            isEdu={isEdu}
            delay={baseDelay + i * 0.07}
          />
        ))}
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <div className="min-w-0">
      <TimelineGroup
        label="Experience"
        entries={EXPERIENCE}
        isEdu={false}
        baseDelay={0.15}
      />
      <TimelineGroup
        label="Education & Certifications"
        entries={EDUCATION}
        isEdu={true}
        baseDelay={0.25}
      />
    </div>
  );
}

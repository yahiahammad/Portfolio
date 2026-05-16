"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { SKILLS, type SkillCategory } from "@/lib/projects-data";

const SKILL_CONTEXT: Record<string, string> = {
  Python:         "AI Fitness Tracker · PaySky ETL",
  JavaScript:     "Unibite",
  TypeScript:     "CareerPath AI · Portfolio",
  Java:           "Coursework",
  "C++":          "Robotic Arm",
  C:              "Embedded systems",
  React:          "CareerPath AI · Portfolio",
  "Next.js":      "CareerPath AI · Portfolio",
  "Tailwind CSS": "CareerPath AI · Portfolio",
  ShadCN:         "CareerPath AI",
  "Radix UI":     "CareerPath AI",
  Recharts:       "CareerPath AI",
  "HTML / CSS":   "All web projects",
  "Node.js":      "Unibite",
  "Express.js":   "Unibite",
  FastAPI:        "AI Fitness Tracker",
  MongoDB:        "Unibite",
  PostgreSQL:     "CareerPath AI",
  Supabase:       "CareerPath AI (vector store)",
  MySQL:          "Coursework",
  PySpark:        "PaySky ETL — 24M+ rows",
  "Scikit-learn": "PaySky segmentation",
  TensorFlow:     "Research · Coursework",
  Pandas:         "PaySky · AI Fitness Tracker",
  NumPy:          "AI Fitness Tracker",
  "Groq SDK":     "CareerPath AI",
  OpenCV:         "AI Fitness Tracker",
  MediaPipe:      "AI Fitness Tracker",
  Docker:         "PaySky deployment",
  Git:            "All projects",
  Plotly:         "PaySky dashboards",
  Matplotlib:     "ML coursework",
  Seaborn:        "Data analysis",
};

function SkillPill({ item }: { item: string }) {
  const [show, setShow] = useState(false);
  const context = SKILL_CONTEXT[item];

  return (
    <div className="relative inline-flex">
      <span
        className="font-mono text-[11.5px] text-[var(--color-muted)] px-[11px] py-[6px] border border-[var(--color-border)] rounded-[2px] leading-none transition-colors duration-[180ms] hover:border-[var(--color-accent-border)] hover:text-[var(--color-text)] hover:bg-[var(--color-accent-dim)] cursor-default"
        onMouseEnter={() => context && setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => context && setShow(true)}
        onBlur={() => setShow(false)}
        tabIndex={context ? 0 : undefined}
        aria-label={context ? `${item} — used in: ${context}` : item}
      >
        {item}
      </span>

      {show && context && (
        <div
          className="absolute bottom-full left-1/2 mb-[8px] z-20 pointer-events-none"
          style={{ transform: "translateX(-50%)" }}
        >
          <div className="w-max max-w-[200px] px-[10px] py-[7px] bg-[var(--color-surface-h)] border border-[var(--color-border-s)] rounded-[3px] shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
            <p className="font-mono text-[10px] text-[var(--color-accent)] tracking-[0.04em] leading-[1.5]">
              {context}
            </p>
          </div>
          {/* Arrow */}
          <div
            className="absolute left-1/2 -bottom-[5px] w-[9px] h-[9px] border-r border-b border-[var(--color-border-s)] bg-[var(--color-surface-h)] rotate-45"
            style={{ transform: "translateX(-50%) rotate(45deg)" }}
          />
        </div>
      )}
    </div>
  );
}

function SkillRow({ skill, index }: { skill: SkillCategory; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -6 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      className="grid grid-cols-[140px_1fr] gap-x-9 py-[26px] border-t border-[var(--color-border)] last:border-b max-[640px]:grid-cols-1 max-[640px]:gap-y-[14px]"
    >
      <div className="font-mono text-[10px] text-[var(--color-accent)] tracking-[0.10em] uppercase pt-[5px] leading-[1.5]">
        {skill.cat}
      </div>
      <div className="flex flex-wrap gap-[6px]">
        {skill.items.map((item) => (
          <SkillPill key={item} item={item} />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-[72px] pb-[100px]">
      <div className="max-w-[1180px] mx-auto px-14 max-[640px]:px-6">
        <div className="flex items-baseline gap-[14px] mb-10">
          <span className="font-mono text-[11px] text-[var(--color-dim)] tracking-[0.14em] uppercase">
            // technical skills
          </span>
          <h2 className="text-[28px] font-semibold tracking-[-0.025em]">Skills</h2>
        </div>

        <hr className="border-none border-t border-[var(--color-border)] mb-10" />

        <div>
          {SKILLS.map((s, i) => (
            <SkillRow key={s.cat} skill={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

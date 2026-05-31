"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  SiApachespark,
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiOpencv,
  SiPandas,
  SiPlotly,
  SiPostgresql,
  SiPython,
  SiRadixui,
  SiReact,
  SiScikitlearn,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";
import { SKILLS, type SkillCategory } from "@/lib/projects-data";

/* ─── brand colors ─── */
const SKILL_COLORS: Record<string, string> = {
  Python:         "#3776AB",
  JavaScript:     "#F7DF1E",
  TypeScript:     "#3178C6",
  "C++":          "#659BD3",
  React:          "#61DAFB",
  "Next.js":      "#d1d5db",
  "Tailwind CSS": "#06B6D4",
  "Radix UI":     "#8B8BCD",
  "HTML / CSS":   "#E34F26",
  "Node.js":      "#68A063",
  "Express.js":   "#9ca3af",
  FastAPI:        "#009688",
  MongoDB:        "#47A248",
  PostgreSQL:     "#336791",
  Supabase:       "#3ECF8E",
  MySQL:          "#4479A1",
  PySpark:        "#E25A1C",
  "Scikit-learn": "#F7931E",
  TensorFlow:     "#FF6F00",
  Pandas:         "#5C9BD6",
  NumPy:          "#4DABCF",
  OpenCV:         "#8B5CF6",
  Docker:         "#2496ED",
  Git:            "#F05032",
  Plotly:         "#636EFA",
};

/* ─── icon map ─── */
const SKILL_ICONS: Record<string, IconType> = {
  Python:         SiPython,
  JavaScript:     SiJavascript,
  TypeScript:     SiTypescript,
  "C++":          SiCplusplus,
  React:          SiReact,
  "Next.js":      SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "Radix UI":     SiRadixui,
  "HTML / CSS":   SiHtml5,
  "Node.js":      SiNodedotjs,
  "Express.js":   SiExpress,
  FastAPI:        SiFastapi,
  MongoDB:        SiMongodb,
  PostgreSQL:     SiPostgresql,
  Supabase:       SiSupabase,
  MySQL:          SiMysql,
  PySpark:        SiApachespark,
  "Scikit-learn": SiScikitlearn,
  TensorFlow:     SiTensorflow,
  Pandas:         SiPandas,
  NumPy:          SiNumpy,
  OpenCV:         SiOpencv,
  Docker:         SiDocker,
  Git:            SiGit,
  Plotly:         SiPlotly,
};

/* ─── project filter ─── */
const FILTER_PROJECTS = [
  { slug: "unibite",            label: "Unibite" },
  { slug: "robotic-arm",        label: "Robotic Arm" },
  { slug: "careerpath-ai",      label: "CareerPath AI" },
  { slug: "ai-fitness-tracker", label: "AI Fitness" },
  { slug: "paysky",             label: "PaySky" },
];

const SKILL_PROJECTS: Record<string, string[]> = {
  Python:         ["ai-fitness-tracker", "paysky"],
  JavaScript:     ["unibite"],
  TypeScript:     ["careerpath-ai"],
  Java:           [],
  "C++":          ["robotic-arm"],
  C:              [],
  React:          ["careerpath-ai"],
  "Next.js":      ["careerpath-ai"],
  "Tailwind CSS": ["careerpath-ai"],
  ShadCN:         ["careerpath-ai"],
  "Radix UI":     ["careerpath-ai"],
  Recharts:       ["careerpath-ai"],
  "HTML / CSS":   ["unibite", "careerpath-ai"],
  "Node.js":      ["unibite"],
  "Express.js":   ["unibite"],
  FastAPI:        ["ai-fitness-tracker"],
  MongoDB:        ["unibite"],
  PostgreSQL:     ["careerpath-ai"],
  Supabase:       ["careerpath-ai"],
  MySQL:          [],
  PySpark:        ["paysky"],
  "Scikit-learn": ["paysky"],
  TensorFlow:     [],
  Pandas:         ["paysky", "ai-fitness-tracker"],
  NumPy:          ["ai-fitness-tracker"],
  "Groq SDK":     ["careerpath-ai"],
  OpenCV:         ["ai-fitness-tracker"],
  MediaPipe:      ["ai-fitness-tracker"],
  Docker:         ["paysky"],
  Git:            ["unibite", "robotic-arm", "careerpath-ai", "ai-fitness-tracker"],
  Plotly:         ["paysky"],
  Matplotlib:     ["paysky"],
  Seaborn:        ["paysky"],
};

/* ─── tooltip context ─── */
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

/* ─── components ─── */

function SkillPill({
  item,
  activeProject,
}: {
  item: string;
  activeProject: string | null;
}) {
  const [show, setShow] = useState(false);
  const context = SKILL_CONTEXT[item];
  const Icon = SKILL_ICONS[item];
  const tooltipId = `tooltip-${item.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;
  const dimmed =
    activeProject !== null &&
    !(SKILL_PROJECTS[item] ?? []).includes(activeProject);

  return (
    <div
      className="relative inline-flex transition-opacity duration-200"
      style={{ opacity: dimmed ? 0.18 : 1 }}
    >
      <span
        role={context ? "button" : undefined}
        tabIndex={context ? 0 : undefined}
        aria-label={context ? `${item} — used in: ${context}` : item}
        aria-describedby={context ? tooltipId : undefined}
        className="flex items-center gap-[6px] font-mono text-[11.5px] text-[var(--color-muted)] px-[11px] py-[7px] border border-[var(--color-border)] rounded-[3px] leading-none transition-colors duration-[180ms] hover:border-[var(--color-accent-border)] hover:text-[var(--color-text)] hover:bg-[var(--color-accent-dim)] cursor-default select-none"
        onMouseEnter={() => context && setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => context && setShow(true)}
        onBlur={() => setShow(false)}
      >
        {Icon && (
          <Icon
            aria-hidden
            className="shrink-0"
            style={{ color: SKILL_COLORS[item] ?? "currentColor" }}
          />
        )}
        {item}
      </span>

      <AnimatePresence>
        {show && context && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            key="tooltip"
            initial={{ opacity: 0, y: 4, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 4, x: "-50%" }}
            transition={{ duration: 0.14, ease: [0.4, 0, 0.2, 1] }}
            className="absolute bottom-full left-1/2 mb-[9px] z-20 pointer-events-none"
          >
            <div className="w-max max-w-[200px] px-[10px] py-[7px] bg-[var(--color-surface-h)] border border-[var(--color-border-s)] rounded-[3px] shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(59,130,246,0.1)]">
              <p className="font-mono text-[10px] text-[var(--color-accent)] tracking-[0.04em] leading-[1.5]">
                {context}
              </p>
            </div>
            <div
              className="absolute left-1/2 -bottom-[5px] w-[9px] h-[9px] border-r border-b border-[var(--color-border-s)] bg-[var(--color-surface-h)] rotate-45"
              style={{ transform: "translateX(-50%) rotate(45deg)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SkillRow({
  skill,
  index,
  activeProject,
}: {
  skill: SkillCategory;
  index: number;
  activeProject: string | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      className="grid grid-cols-[140px_1fr] gap-x-9 py-[26px] border-t border-[var(--color-border)] last:border-b max-[640px]:grid-cols-1 max-[640px]:gap-y-[14px]"
    >
      <div className="font-mono text-[10px] text-[var(--color-accent)] tracking-[0.10em] uppercase pt-[5px] leading-[1.5]">
        {skill.cat}
      </div>
      <div className="flex flex-wrap gap-[6px]">
        {skill.items.map((item) => (
          <SkillPill key={item} item={item} activeProject={activeProject} />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const toggle = (slug: string) =>
    setActiveProject((p) => (p === slug ? null : slug));

  return (
    <section id="skills" className="py-[72px] pb-[100px]">
      <div className="max-w-[1180px] mx-auto px-14 max-[640px]:px-6">
        <div className="flex items-baseline gap-[14px] mb-10">
          <span className="font-mono text-[11px] text-[var(--color-dim)] tracking-[0.14em] uppercase">
            // technical skills
          </span>
          <h2 className="text-[28px] font-semibold tracking-[-0.025em]">Skills</h2>
        </div>

        <hr className="border-none border-t border-[var(--color-border)] mb-8" />

        {/* Project filter */}
        <div className="flex flex-wrap items-center gap-[8px] mb-8">
          <span className="font-mono text-[10px] text-[var(--color-dim)] tracking-[0.12em] uppercase mr-1">
            filter by project:
          </span>
          {FILTER_PROJECTS.map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => toggle(p.slug)}
              aria-pressed={activeProject === p.slug}
              className={`font-mono text-[11px] px-[12px] py-[7px] rounded-full border transition-all duration-150 ${
                activeProject === p.slug
                  ? "border-[var(--color-accent)] bg-[var(--color-accent-dim)] text-[var(--color-accent)] shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                  : "border-[var(--color-border-s)] text-[var(--color-dim)] hover:text-[var(--color-text)] hover:border-[var(--color-border-s)] hover:bg-[var(--color-surface-h)]"
              }`}
            >
              {p.label}
            </button>
          ))}
          {activeProject && (
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="font-mono text-[11px] text-[var(--color-dim)] hover:text-[var(--color-text)] transition-colors duration-150 px-[8px] py-[7px]"
              aria-label="Clear filter"
            >
              × clear
            </button>
          )}
        </div>

        {/* Skill rows */}
        <div>
          {SKILLS.map((s, i) => (
            <SkillRow key={s.cat} skill={s} index={i} activeProject={activeProject} />
          ))}
        </div>
      </div>
    </section>
  );
}

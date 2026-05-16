"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { PROJECTS, type Project } from "@/lib/projects-data";

function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [imgFailed, setImgFailed] = useState(false);

  const hasImage = project.image && !imgFailed;
  const showFeaturedLayout = featured && hasImage;

  const inner = (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      className="group relative bg-[var(--color-bg)] overflow-hidden cursor-default hover:bg-[var(--color-surface-h)] transition-colors duration-[220ms]"
    >
      <span className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--color-accent)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-10" />

      {showFeaturedLayout ? (
        /* Featured: image left | content right */
        <div className="grid grid-cols-[55%_45%] max-[768px]:grid-cols-1">
          <div className="relative h-[340px] max-[768px]:h-[220px] border-r border-[var(--color-border)] max-[768px]:border-r-0 max-[768px]:border-b max-[768px]:border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
            <Image
              src={project.image!}
              alt={project.title}
              fill
              priority
              onError={() => setImgFailed(true)}
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="55vw"
            />
          </div>

          <div className="p-12 max-[768px]:p-7 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-[30px]">
                <span className="font-mono text-[11px] text-[var(--color-dim)] tracking-[0.06em]">
                  {project.id}
                </span>
                <span className="font-mono text-[10px] text-[var(--color-accent)] tracking-[0.10em] uppercase text-right leading-[1.5]">
                  {project.type}
                </span>
              </div>

              <h3 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--color-text)] mb-[14px]">
                {project.title}
              </h3>
              <p className="text-[14px] leading-[1.72] text-[var(--color-muted)] mb-[32px]">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-[6px]">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-[var(--color-muted)] px-[10px] py-[4px] border border-[var(--color-border-s)] rounded-[2px] tracking-[0.025em] group-hover:border-[var(--color-accent-border)] group-hover:text-[var(--color-text)] transition-colors duration-[180ms]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {project.hasCase && (
              <div className="mt-[28px] pt-[20px] border-t border-[var(--color-border)]">
                <span className="font-mono text-[11px] text-[var(--color-accent)] tracking-[0.06em]">
                  Case study →
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Regular: vertical stack */
        <>
          {hasImage && (
            <div className="relative w-full h-[200px] border-b border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
              <Image
                src={project.image!}
                alt={project.title}
                fill
                onError={() => setImgFailed(true)}
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )}

          <div className="p-10 max-[640px]:p-7">
            <div className="flex justify-between items-start mb-[26px]">
              <span className="font-mono text-[11px] text-[var(--color-dim)] tracking-[0.06em]">
                {project.id}
              </span>
              <span className="font-mono text-[10px] text-[var(--color-accent)] tracking-[0.10em] uppercase text-right leading-[1.5]">
                {project.type}
              </span>
            </div>

            <h3 className="text-[21px] font-semibold tracking-[-0.02em] text-[var(--color-text)] mb-[10px]">
              {project.title}
            </h3>
            <p className="text-[13.5px] leading-[1.65] text-[var(--color-muted)] mb-[28px]">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-[6px]">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] text-[var(--color-muted)] px-[10px] py-[4px] border border-[var(--color-border-s)] rounded-[2px] tracking-[0.025em] group-hover:border-[var(--color-accent-border)] group-hover:text-[var(--color-text)] transition-colors duration-[180ms]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.hasCase && (
              <div className="mt-[22px] pt-[18px] border-t border-[var(--color-border)]">
                <span className="font-mono text-[11px] text-[var(--color-accent)] tracking-[0.06em]">
                  Case study →
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </motion.article>
  );

  if (project.hasCase) {
    return (
      <Link href={`/projects/${project.slug}`} className="block">
        {inner}
      </Link>
    );
  }
  return inner;
}

export default function ProjectsSection() {
  const [featured, ...rest] = PROJECTS;

  return (
    <section id="projects" className="py-[72px] pb-[120px]">
      <div className="max-w-[1180px] mx-auto px-14 max-[640px]:px-6">
        <div className="flex items-baseline gap-[14px] mb-10">
          <span className="font-mono text-[11px] text-[var(--color-dim)] tracking-[0.14em] uppercase">
            // selected work
          </span>
          <h2 className="text-[28px] font-semibold tracking-[-0.025em]">Projects</h2>
        </div>

        <hr className="border-none border-t border-[var(--color-border)] mb-10" />

        <div className="border border-[var(--color-border)]">
          {/* Featured card — full width */}
          <ProjectCard project={featured} index={0} featured />

          {/* Remaining cards — 3-col row */}
          <div className="grid grid-cols-3 gap-px bg-[var(--color-border)] border-t border-[var(--color-border)] max-[768px]:grid-cols-1">
            {rest.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

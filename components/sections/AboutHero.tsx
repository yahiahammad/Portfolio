"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Projects", href: "/", active: false },
  { label: "About", href: "/about", active: true },
];

export default function AboutHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Fixed nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-[rgba(8,8,9,0.84)] backdrop-blur-[16px] saturate-150"
        aria-label="Main navigation"
      >
        {/* Nav bar row */}
        <div className="max-w-[1180px] mx-auto px-14 h-[54px] flex items-center justify-between border-b border-[var(--color-border)] max-[640px]:px-6">
          <Link
            href="/"
            className="font-mono text-[13px] font-medium tracking-[0.04em] text-[var(--color-text)]"
          >
            YH<span className="text-[var(--color-accent)]">.</span>
          </Link>

          <div className="flex items-center gap-7">
            {/* Desktop nav links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                className={`text-[13px] transition-colors duration-150 max-[640px]:hidden ${
                  link.active
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/projects/Yahia_Hammad_CV.docx"
              download
              className="text-[13px] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-150 max-[640px]:hidden"
            >
              CV
            </a>
            <div className="flex items-center gap-[7px] font-mono text-[11px] text-[var(--color-dim)] max-[640px]:hidden">
              <span className="w-[6px] h-[6px] rounded-full bg-emerald-400 animate-pulse-dot" aria-hidden="true" />
              <span>open to work</span>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-about"
              className="hidden max-[640px]:flex items-center justify-center w-8 h-8 -mr-1 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-150"
            >
              {menuOpen ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div
            id="mobile-nav-about"
            className="hidden max-[640px]:block border-b border-[var(--color-border)]"
          >
            <div className="px-6 py-1 flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={link.active ? "page" : undefined}
                  className={`text-[13px] transition-colors duration-150 py-[13px] border-b border-[var(--color-border)] ${
                    link.active
                      ? "text-[var(--color-text)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/projects/Yahia_Hammad_CV.docx"
                download
                onClick={closeMenu}
                className="text-[13px] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-150 py-[13px] border-b border-[var(--color-border)]"
              >
                CV
              </a>
              <div className="flex items-center gap-[7px] font-mono text-[11px] text-[var(--color-dim)] py-[13px]">
                <span className="w-[6px] h-[6px] rounded-full bg-emerald-400 animate-pulse-dot" aria-hidden="true" />
                <span>open to work</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Page header */}
      <div className="border-b border-[var(--color-border)] pt-[100px] pb-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-baseline gap-[14px]"
        >
          <span className="font-mono text-[11px] text-[var(--color-dim)] tracking-[0.14em] uppercase">
            // about me
          </span>
          <h1 className="text-[28px] font-semibold tracking-[-0.025em]">
            About
          </h1>
        </motion.div>
      </div>
    </>
  );
}

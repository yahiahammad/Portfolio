"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const HOME_LINKS = [
  { label: "Projects", href: "#projects", anchor: true },
  { label: "Skills",   href: "#skills",   anchor: true },
  { label: "About",    href: "/about",    anchor: false },
];

const ABOUT_LINKS = [
  { label: "Projects", href: "/",      anchor: false },
  { label: "About",    href: "/about", anchor: false },
];

export default function Navbar({ activePage }: { activePage: "home" | "about" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();
  const closeMenu = () => setMenuOpen(false);

  const links = activePage === "home" ? HOME_LINKS : ABOUT_LINKS;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[rgba(8,8,9,0.82)] backdrop-blur-[18px] saturate-150"
      aria-label="Main navigation"
    >
      {/* Bar */}
      <div className="max-w-[1180px] mx-auto px-14 h-[54px] flex items-center justify-between border-b border-[var(--color-border)] max-[640px]:px-6">

        {/* Logo */}
        {activePage === "home" ? (
          <span className="font-mono text-[13px] font-medium tracking-[0.04em] text-[var(--color-text)]">
            YH<span className="text-[var(--color-accent)]">.</span>
          </span>
        ) : (
          <Link
            href="/"
            className="font-mono text-[13px] font-medium tracking-[0.04em] text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-150"
          >
            YH<span className="text-[var(--color-accent)]">.</span>
          </Link>
        )}

        {/* Desktop links */}
        <div className="flex items-center gap-7">
          {links.map((link) => {
            const active = link.href === "/about" && activePage === "about";
            const base = "relative text-[13px] transition-colors duration-150 max-[640px]:hidden py-[2px] group overflow-hidden";
            const colorClass = active
              ? "text-[var(--color-text)]"
              : "text-[var(--color-muted)] hover:text-[var(--color-text)]";

            return link.anchor ? (
              <a
                key={link.label}
                href={link.href}
                className={`${base} ${colorClass}`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-accent)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200" />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`${base} ${colorClass}`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-px bg-[var(--color-accent)] transition-transform duration-200 origin-left ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}

          <a
            href="/projects/Yahia_Hammad_CV.pdf"
            download
            className="relative text-[13px] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-150 max-[640px]:hidden py-[2px] group overflow-hidden"
          >
            CV
            <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-accent)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200" />
          </a>

          {/* Status pill */}
          <div className="flex items-center gap-[7px] font-mono text-[11px] text-[var(--color-dim)] max-[640px]:hidden">
            <span className="w-[6px] h-[6px] rounded-full bg-emerald-400 animate-pulse-dot" aria-hidden="true" />
            <span>open to work</span>
          </div>

          {/* Hamburger — 44×44 touch target */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="hidden max-[640px]:flex items-center justify-center w-11 h-11 -mr-2 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-150"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.svg
                  key="close"
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  aria-hidden="true"
                  initial={reduced ? {} : { rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={reduced ? {} : { rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.13 }}
                >
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="open"
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  aria-hidden="true"
                  initial={reduced ? {} : { rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={reduced ? {} : { rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.13 }}
                >
                  <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile drawer — animated */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            key="drawer"
            initial={reduced ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="hidden max-[640px]:block border-b border-[var(--color-border)]"
          >
            <div className="px-6 py-1 flex flex-col">
              {links.map((link) => {
                const active = link.href === "/about" && activePage === "about";
                return link.anchor ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    className="text-[13px] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-150 py-[13px] border-b border-[var(--color-border)]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`text-[13px] transition-colors duration-150 py-[13px] border-b border-[var(--color-border)] ${
                      active ? "text-[var(--color-text)]" : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <a
                href="/projects/Yahia_Hammad_CV.pdf"
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CopyEmailButton({
  email,
  suffix,
}: {
  email: string;
  suffix?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={copy}
      title="Copy email address"
      className="group flex items-center gap-[7px] font-mono text-[11px] text-[var(--color-muted)] tracking-[0.06em] hover:text-[var(--color-text)] transition-colors duration-150 cursor-pointer bg-transparent border-none p-0"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-[var(--color-accent)]"
          >
            copied!
          </motion.span>
        ) : (
          <motion.span
            key="email"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {email}
          </motion.span>
        )}
      </AnimatePresence>
      {suffix && !copied && (
        <span className="opacity-60">· {suffix}</span>
      )}
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.svg
            key="check"
            width="11" height="11" viewBox="0 0 11 11" fill="none"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ color: "var(--color-accent)" }}
          >
            <path
              d="M1.5 5.5l2.5 2.5 5-5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="copy"
            width="11" height="11" viewBox="0 0 11 11" fill="none"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="group-hover:opacity-70 transition-opacity shrink-0"
          >
            <rect x="3.5" y="0.5" width="7" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.1" />
            <path
              d="M1 3.5H0.75A0.75 0.75 0 0 0 0 4.25v6A0.75 0.75 0 0 0 0.75 11H7a0.75 0.75 0 0 0 .75-.75V10"
              stroke="currentColor"
              strokeWidth="1.1"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}

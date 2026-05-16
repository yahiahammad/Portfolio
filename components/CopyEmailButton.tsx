"use client";

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
      className="group flex items-center gap-[7px] font-mono text-[11px] text-[var(--color-dim)] tracking-[0.06em] hover:text-[var(--color-text)] transition-colors duration-150 cursor-pointer bg-transparent border-none p-0"
    >
      <span className={copied ? "text-[var(--color-accent)]" : ""}>
        {copied ? "copied!" : email}
      </span>
      {suffix && !copied && (
        <span className="opacity-60">· {suffix}</span>
      )}
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        className="opacity-40 group-hover:opacity-70 transition-opacity shrink-0"
      >
        {copied ? (
          <path
            d="M1.5 5.5l2.5 2.5 5-5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <>
            <rect x="3.5" y="0.5" width="7" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.1" />
            <path
              d="M1 3.5H0.75A0.75 0.75 0 0 0 0 4.25v6A0.75 0.75 0 0 0 0.75 11H7a0.75 0.75 0 0 0 .75-.75V10"
              stroke="currentColor"
              strokeWidth="1.1"
            />
          </>
        )}
      </svg>
    </button>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-bg)]">
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-lines" />

      {/* Large background number */}
      <div
        className="absolute select-none pointer-events-none font-mono font-bold leading-none tracking-[-0.04em]"
        style={{ fontSize: "38vw", color: "rgba(255,255,255,0.018)" }}
      >
        404
      </div>

      <div className="relative z-10 text-center px-6">
        <p className="font-mono text-[10px] text-[var(--color-dim)] tracking-[0.14em] uppercase mb-6">
          // error · 404
        </p>

        <h1 className="text-[28px] font-semibold tracking-[-0.025em] text-[var(--color-text)] mb-4">
          Page not found
        </h1>

        <p className="text-[14px] leading-[1.65] text-[var(--color-muted)] mb-10 max-w-[300px] mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-[8px] font-mono text-[12px] text-[var(--color-dim)] tracking-[0.06em] border border-[var(--color-border-s)] px-[20px] py-[10px] rounded-[3px] hover:text-[var(--color-text)] hover:border-[var(--color-accent-border)] hover:bg-[var(--color-accent-dim)] transition-all duration-[180ms]"
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
          Back to portfolio
        </Link>
      </div>
    </div>
  );
}

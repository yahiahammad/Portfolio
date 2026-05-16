import { PROJECTS } from "@/lib/projects-data";

const ITEMS = [...PROJECTS, ...PROJECTS];

export default function TickerStrip() {
  return (
    <div
      className="border-y border-[var(--color-border)] overflow-hidden py-[13px]"
      aria-hidden="true"
    >
      <div className="animate-ticker flex w-max gap-[56px]">
        {ITEMS.map((p, i) => (
          <span
            key={i}
            className="font-mono text-[11px] text-[var(--color-dim)] tracking-[0.10em] uppercase whitespace-nowrap flex items-center gap-[10px]"
          >
            <span className="text-[var(--color-accent)] opacity-60">→</span>
            {p.id} / {p.title}
          </span>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import BioColumn from "@/components/sections/BioColumn";
import Timeline from "@/components/sections/Timeline";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "About — Yahia Hammad",
  description:
    "Third-year CS student at MIU, AI & Data Science intern at PaySky, full-stack and ML engineer.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-lines" />

      <div className="relative z-10">
        {/* Nav + page header */}
        <div className="max-w-[1180px] mx-auto px-14 max-[640px]:px-6">
          <AboutHero />
        </div>

        {/* Two-column layout: bio (sticky left) + timeline (right) */}
        <div className="max-w-[1180px] mx-auto px-14 max-[640px]:px-6">
          <div className="grid grid-cols-[300px_1fr] gap-[72px] pt-16 pb-28 items-start max-[860px]:grid-cols-1 max-[860px]:gap-12">
            <BioColumn />
            <Timeline />
          </div>
        </div>

        {/* Contact */}
        <ContactSection />

        {/* Footer */}
        <footer className="border-t border-[var(--color-border)]">
          <div className="max-w-[1180px] mx-auto px-14 py-[30px] flex items-center justify-between max-[640px]:flex-col max-[640px]:gap-3 max-[640px]:items-start max-[640px]:px-6">
            <span className="font-mono text-[11px] text-[var(--color-muted)] tracking-[0.04em]">
              yahiamhammad@gmail.com · Cairo, EG
            </span>
            <div className="flex gap-[22px]">
              {[
                { label: "github", href: "https://github.com/yahiahammad" },
                { label: "portfolio", href: "/" },
                { label: "cv.pdf", href: "/projects/Yahia_Hammad_CV.pdf", download: true },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  download={l.download}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-mono text-[11px] text-[var(--color-muted)] tracking-[0.04em] hover:text-[var(--color-accent)] transition-colors duration-150"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

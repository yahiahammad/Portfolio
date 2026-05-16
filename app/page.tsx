import type { Metadata } from "next";
import HomeHero from "@/components/sections/HomeHero";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import TickerStrip from "@/components/TickerStrip";
import CopyEmailButton from "@/components/CopyEmailButton";

export const metadata: Metadata = {
  title: "Yahia Hammad — Software Engineer",
  description:
    "Software engineer specializing in ML and full-stack development. Third-year CS student at MIU, AI & Data Science intern at PaySky.",
};

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-lines" />
      {/* Blue glow — top right */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          top: "-300px",
          right: "-200px",
          width: "860px",
          height: "860px",
          background: "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 65%)",
        }}
      />
      {/* Purple glow — bottom left */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          bottom: "-200px",
          left: "-180px",
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.045) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10">
        <HomeHero />
        <ProjectsSection />
        <TickerStrip />
        <SkillsSection />

        <footer className="border-t border-[var(--color-border)]">
          <div className="max-w-[1180px] mx-auto px-14 py-8 flex items-center justify-between max-[640px]:flex-col max-[640px]:gap-3 max-[640px]:items-start max-[640px]:px-6">
            <CopyEmailButton email="yahiamhammad@gmail.com" suffix="Cairo, EG" />
            <div className="flex gap-[22px]">
              {[
                { label: "github", href: "https://github.com/yahiahammad" },
                { label: "about", href: "/about" },
                { label: "cv.pdf", href: "/projects/Yahia_Hammad_CV.docx", download: true },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  download={l.download}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-mono text-[11px] text-[var(--color-dim)] tracking-[0.04em] hover:text-[var(--color-accent)] transition-colors duration-150"
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

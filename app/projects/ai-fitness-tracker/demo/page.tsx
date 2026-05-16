import type { Metadata } from "next";
import TrackerDemo from "./TrackerDemo";

export const metadata: Metadata = {
  title: "AI Fitness Tracker — Live Demo · Yahia Hammad",
  description:
    "Real-time pose detection and rep counting running entirely in your browser via MediaPipe WebAssembly. No data leaves your device.",
};

export default function DemoPage() {
  return <TrackerDemo />;
}

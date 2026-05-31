"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function AboutHero() {
  return (
    <>
      <Navbar activePage="about" />

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

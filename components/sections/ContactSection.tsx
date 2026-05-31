"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CHANNELS } from "@/lib/about-data";

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  email: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0 transition-colors duration-150">
      <rect x="1.5" y="3.5" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 5l6 4 6-4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  github: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" className="shrink-0 transition-colors duration-150">
      <path d="M7.5 1a6.5 6.5 0 0 0-2.056 12.67c.325.06.444-.141.444-.313 0-.154-.006-.563-.009-1.106-1.808.393-2.19-.872-2.19-.872-.296-.752-.722-.952-.722-.952-.59-.403.044-.395.044-.395.652.046 1 .671 1 .671.58.994 1.524.707 1.895.54.059-.42.228-.706.414-.869-1.443-.164-2.96-.722-2.96-3.21 0-.708.253-1.288.667-1.742-.067-.164-.289-.823.063-1.716 0 0 .544-.175 1.782.664A6.22 6.22 0 0 1 7.5 4.68a6.22 6.22 0 0 1 1.623.218c1.237-.839 1.78-.664 1.78-.664.353.893.131 1.552.064 1.716.415.454.667 1.034.667 1.742 0 2.495-1.52 3.044-2.967 3.205.233.202.441.6.441 1.209 0 .873-.008 1.577-.008 1.79 0 .174.117.377.447.313A6.5 6.5 0 0 0 7.5 1z" />
    </svg>
  ),
  linkedin: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" className="shrink-0 transition-colors duration-150">
      <path d="M2.5 1A1.5 1.5 0 1 0 2.5 4 1.5 1.5 0 0 0 2.5 1zM1 5.5h3v8H1v-8zm5 0h2.9v1.1h.04C9.36 5.9 10.4 5.3 11.5 5.3c2.7 0 3.2 1.77 3.2 4.07V13.5h-3v-3.7c0-1.12-.02-2.56-1.56-2.56-1.56 0-1.8 1.22-1.8 2.48v3.78H6v-8z" />
    </svg>
  ),
};

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "e99eefa3-2fc9-4955-9ac3-7b2491797463",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio contact from ${form.name}`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSent(true);
      } else {
        setError("Something went wrong — please try emailing me directly.");
      }
    } catch {
      setError("Network error — please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-border-s)] rounded-[3px] font-sans text-[14px] px-[14px] py-[10px] outline-none placeholder:text-[var(--color-dim)] focus:border-[var(--color-accent-border)] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.10)] transition-all duration-[180ms]";

  return (
    <section
      id="contact"
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <div className="max-w-[1180px] mx-auto px-14 max-[640px]:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-[640px]:gap-12 items-start">
          {/* Left — info + channels */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="font-mono text-[10px] text-[var(--color-dim)] tracking-[0.14em] uppercase mb-3">
              // get in touch
            </p>
            <h2 className="text-[22px] font-semibold tracking-[-0.02em] mb-[14px]">
              Contact
            </h2>
            <p className="text-[14px] leading-[1.65] text-[var(--color-muted)] mb-7 max-w-[340px]">
              Open to internships, collaborations, and interesting problems.
            </p>

            <div className="flex flex-col">
              {CHANNELS.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.type !== "email" ? "_blank" : undefined}
                  rel={ch.type !== "email" ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-[11px] font-mono text-[12px] text-[var(--color-muted)] tracking-[0.02em] py-[12px] border-b border-[var(--color-border)] first:border-t hover:text-[var(--color-text)] hover:pl-[4px] transition-all duration-150"
                >
                  <span className="text-[var(--color-dim)] group-hover:text-[var(--color-accent)] transition-colors duration-150">
                    {CHANNEL_ICONS[ch.type]}
                  </span>
                  {ch.label}
                  <svg
                    width="10" height="10" viewBox="0 0 10 10" fill="none"
                    aria-hidden="true"
                    className="ml-auto opacity-0 group-hover:opacity-40 transition-opacity duration-150 -translate-x-1 group-hover:translate-x-0 transition-transform duration-150 shrink-0"
                  >
                    <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center justify-center min-h-[220px] gap-[14px]"
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    style={{ color: "var(--color-accent)" }}
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="17"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      opacity=".35"
                    />
                    <path
                      d="M11 18l5 5 9-9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="font-mono text-[12.5px] text-[var(--color-muted)] tracking-[0.04em]">
                    Message sent — I&apos;ll be in touch.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-[18px]"
                >
                  {(
                    [
                      { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                      { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                    ] as const
                  ).map((f) => (
                    <div key={f.id} className="flex flex-col gap-[7px]">
                      <label
                        htmlFor={f.id}
                        className="font-mono text-[9.5px] text-[var(--color-dim)] tracking-[0.11em] uppercase"
                      >
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.id as keyof FormState]}
                        onChange={set(f.id as keyof FormState)}
                        required
                        className={inputClass}
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-[7px]">
                    <label
                      htmlFor="message"
                      className="font-mono text-[9.5px] text-[var(--color-dim)] tracking-[0.11em] uppercase"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="What's on your mind?"
                      value={form.message}
                      onChange={set("message")}
                      required
                      rows={4}
                      className={`${inputClass} resize-y min-h-[108px]`}
                    />
                  </div>

                  {error && (
                    <p className="font-mono text-[11px] text-red-400 tracking-[0.03em]">
                      {error}
                    </p>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-glow inline-flex items-center gap-2 px-6 py-[10px] bg-[var(--color-accent)] text-white font-sans font-medium text-[13px] rounded-[4px] border-none cursor-pointer hover:brightness-110 hover:-translate-y-px transition-all duration-[180ms] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:brightness-100"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className="animate-spin"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeDasharray="58"
                              strokeDashoffset="44"
                            />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                            <path
                              d="M1 6.5h10M7.5 3l3.5 3.5L7.5 10"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

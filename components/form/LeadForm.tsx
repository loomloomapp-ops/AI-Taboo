"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/context";
import { TELEGRAM_URL } from "@/lib/i18n/dict";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowUpRight, TelegramIcon } from "@/components/ui/ArrowIcon";
import { BrandMark } from "@/components/ui/BrandMark";
import { motion, AnimatePresence } from "framer-motion";

const niches = ["Офіси", "Табачка", "Adult", "Dating", "Товарка", "Nutra", "Sex shops", "Binary options", "Інше"];
const budgets = ["до $1K", "$1K — $5K", "$5K — $20K", "$20K — $50K", "$50K+"];

type Status = "idle" | "sending" | "success" | "error";

const tgRegex = /^@?[a-zA-Z0-9_]{4,32}$/;

export function LeadForm() {
  const { t } = useLocale();
  const lines = t.form.title.split("\n");
  const [step, setStep] = useState(0);
  const [niche, setNiche] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [tg, setTg] = useState<string>("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ niche?: string; budget?: string; telegram?: string; consent?: string }>({});

  const validateStep = (s: number) => {
    const e: typeof errors = {};
    if (s >= 0 && !niche) e.niche = t.form.errors.niche;
    if (s >= 1 && !budget) e.budget = t.form.errors.budget;
    if (s >= 2) {
      if (!tgRegex.test(tg.trim())) e.telegram = t.form.errors.telegram;
      if (!consent) e.consent = t.form.errors.consent;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, budget, telegram: tg.trim().startsWith("@") ? tg.trim() : `@${tg.trim()}` }),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(2, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <section id="form" className="section-pad relative">
      <div className="absolute inset-0 dot-grid opacity-30 diagonal-fade pointer-events-none" aria-hidden />
      <div className="container-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 lg:items-stretch">
          <ScrollReveal className="lg:col-span-5">
            <span className="eyebrow"><span className="eyebrow-dot" />{t.form.eyebrow}</span>
            <h2 className="headline mt-5 text-balance text-[clamp(1.55rem,3.6vw,2.85rem)]">
              {lines.map((l, i) => (<span key={i} className="block">{l}</span>))}
            </h2>
            <p className="mt-6 text-ash text-base sm:text-lg leading-relaxed text-pretty max-w-md">{t.form.sub}</p>

            <ul className="mt-8 space-y-4 max-w-md">
              {t.form.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-[15px] text-ash">
                  <BrandMark name="check" size={22} className="shrink-0 -mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="lg:col-span-7 lg:h-full">
            <div className="rounded-card-lg border border-hairline bg-carbon p-6 sm:p-8 lg:p-10 shadow-card-inset h-full flex flex-col justify-between min-h-[520px]">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="py-10 text-center"
                  >
                    <div className="mx-auto mb-4 flex items-center justify-center">
                      <BrandMark name="check" size={90} />
                    </div>
                    <h3 className="font-display uppercase tracking-tighter2 text-2xl sm:text-3xl text-bone mb-3">
                      {t.form.success}
                    </h3>
                    <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4">
                      <TelegramIcon size={14} />
                      {t.form.successCta}
                      <span className="btn-trailing-icon"><ArrowUpRight size={12} /></span>
                    </a>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col h-full gap-7"
                    noValidate
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash-dim">
                        {t.form.step} {step + 1} {t.form.of} 3
                      </span>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className={`h-[2px] w-8 transition-colors duration-500 ${
                              i <= step ? "bg-taboo" : "bg-hairline"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                    <AnimatePresence mode="wait">
                      {step === 0 && (
                        <motion.div
                          key="step-0"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.35 }}
                          className="flex-1 flex flex-col justify-center"
                        >
                          <Label>{t.form.niche}</Label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                            {niches.map((n) => (
                              <button
                                key={n}
                                type="button"
                                onClick={() => {
                                  setNiche(n);
                                  setErrors((e) => ({ ...e, niche: undefined }));
                                }}
                                className={`px-3 py-3 rounded-xl border text-sm transition-all duration-300 ${
                                  niche === n
                                    ? "bg-taboo/15 border-taboo text-bone"
                                    : "bg-carbon-deep border-hairline text-ash hover:text-bone hover:border-hairline-strong"
                                }`}
                              >
                                {n}
                              </button>
                            ))}
                          </div>
                          {errors.niche && <ErrorText>{errors.niche}</ErrorText>}
                        </motion.div>
                      )}

                      {step === 1 && (
                        <motion.div
                          key="step-1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.35 }}
                          className="flex-1 flex flex-col justify-center"
                        >
                          <Label>{t.form.budget}</Label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                            {budgets.map((b) => (
                              <button
                                key={b}
                                type="button"
                                onClick={() => {
                                  setBudget(b);
                                  setErrors((e) => ({ ...e, budget: undefined }));
                                }}
                                className={`px-4 py-3 rounded-xl border text-sm text-left transition-all duration-300 ${
                                  budget === b
                                    ? "bg-taboo/15 border-taboo text-bone"
                                    : "bg-carbon-deep border-hairline text-ash hover:text-bone hover:border-hairline-strong"
                                }`}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                          {errors.budget && <ErrorText>{errors.budget}</ErrorText>}
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step-2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.35 }}
                          className="flex-1 flex flex-col justify-center"
                        >
                          <Label>{t.form.telegram}</Label>
                          <input
                            type="text"
                            inputMode="text"
                            autoComplete="off"
                            placeholder="@username"
                            value={tg}
                            onChange={(e) => {
                              setTg(e.target.value);
                              setErrors((er) => ({ ...er, telegram: undefined }));
                            }}
                            className={`mt-3 w-full px-4 py-3.5 rounded-xl bg-carbon-deep border text-bone placeholder:text-ash-dim focus:outline-none transition-colors ${
                              errors.telegram ? "border-taboo" : "border-hairline focus:border-taboo"
                            }`}
                          />
                          {errors.telegram && <ErrorText>{errors.telegram}</ErrorText>}
                          <label className="mt-5 flex items-start gap-3 cursor-pointer text-sm text-ash">
                            <input
                              type="checkbox"
                              checked={consent}
                              onChange={(e) => {
                                setConsent(e.target.checked);
                                setErrors((er) => ({ ...er, consent: undefined }));
                              }}
                              className="mt-0.5 w-4 h-4 accent-taboo cursor-pointer"
                            />
                            <span>{t.form.consent}</span>
                          </label>
                          {errors.consent && <ErrorText>{errors.consent}</ErrorText>}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={back}
                        disabled={step === 0}
                        className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {t.form.back}
                      </button>
                      {step < 2 ? (
                        <button type="button" onClick={next} className="btn-primary">
                          {t.form.next}
                          <span className="btn-trailing-icon"><ArrowUpRight size={12} /></span>
                        </button>
                      ) : (
                        <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
                          {status === "sending" ? t.form.sending : t.form.submit}
                          <span className="btn-trailing-icon"><ArrowUpRight size={12} /></span>
                        </button>
                      )}
                    </div>

                    {status === "error" && <ErrorText>{t.form.errorGeneric}</ErrorText>}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash-dim">{children}</span>;
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm text-taboo">{children}</p>;
}

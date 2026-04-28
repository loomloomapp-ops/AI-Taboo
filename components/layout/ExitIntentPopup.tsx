"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";
import { ArrowUpRight } from "@/components/ui/ArrowIcon";

const tgRegex = /^@?[a-zA-Z0-9_]{4,32}$/;

export function ExitIntentPopup() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [tg, setTg] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("taboo_exit_shown")) return;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) trigger();
    };

    const timeout = window.setTimeout(() => {
      if (!shown) trigger();
    }, 45000);

    const trigger = () => {
      setOpen(true);
      setShown(true);
      sessionStorage.setItem("taboo_exit_shown", "1");
    };

    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mouseleave", onLeave);
      window.clearTimeout(timeout);
    };
  }, [shown]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tgRegex.test(tg.trim())) {
      setErr(t.form.errors.telegram);
      return;
    }
    setErr("");
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche: "exit-popup",
          budget: "n/a",
          telegram: tg.trim().startsWith("@") ? tg.trim() : `@${tg.trim()}`,
          source: "exit-intent",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      window.setTimeout(() => setOpen(false), 2500);
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-carbon-deep/80 backdrop-blur-md" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md rounded-card-lg bg-carbon border border-hairline-strong p-7 sm:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-hairline flex items-center justify-center text-ash hover:text-bone transition-colors"
            >
              ×
            </button>

            {status === "success" ? (
              <div className="py-4 text-center">
                <h3 className="font-display uppercase tracking-tighter2 text-2xl text-bone mb-2">
                  {t.form.success}
                </h3>
              </div>
            ) : (
              <>
                <span className="eyebrow"><span className="eyebrow-dot" />exit · 24h</span>
                <h3 className="font-display uppercase tracking-tighter2 text-3xl sm:text-4xl text-bone mt-4 leading-[0.95]">
                  {t.exitPopup.title}
                </h3>
                <p className="mt-3 text-ash text-sm sm:text-base leading-relaxed text-pretty">
                  {t.exitPopup.sub}
                </p>
                <form onSubmit={submit} className="mt-6 space-y-3">
                  <input
                    type="text"
                    value={tg}
                    onChange={(e) => {
                      setTg(e.target.value);
                      setErr("");
                    }}
                    placeholder={t.exitPopup.placeholder}
                    autoComplete="off"
                    className={`w-full px-4 py-3.5 rounded-xl bg-carbon-deep border text-bone placeholder:text-ash-dim focus:outline-none ${
                      err ? "border-taboo" : "border-hairline focus:border-taboo"
                    }`}
                  />
                  {err && <p className="text-sm text-taboo">{err}</p>}
                  <button type="submit" disabled={status === "sending"} className="btn-primary w-full justify-center disabled:opacity-60">
                    {status === "sending" ? t.form.sending : t.exitPopup.submit}
                    <span className="btn-trailing-icon"><ArrowUpRight size={12} /></span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="w-full text-center text-xs font-mono uppercase tracking-[0.18em] text-ash-dim hover:text-ash py-2"
                  >
                    {t.exitPopup.dismiss}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

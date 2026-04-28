"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const LABELS = [
  "BOOTING ENGINES",
  "WARMING CABINETS",
  "CALIBRATING ROMI",
  "PRIMING CREATIVES",
  "GO LIVE",
];

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.body.style.overflow = "hidden";
    startedAt.current = performance.now();

    const minDuration = 1500;
    const maxStall = 90;
    let raf = 0;
    let target = 0;
    let current = 0;
    let pageReady = document.readyState === "complete";

    const onReady = () => {
      pageReady = true;
    };
    if (!pageReady) window.addEventListener("load", onReady, { once: true });

    const tick = () => {
      const elapsed = performance.now() - startedAt.current;
      const minProgress = Math.min(maxStall, (elapsed / minDuration) * maxStall);
      target = pageReady ? 100 : Math.max(target, minProgress);
      if (!pageReady && target < maxStall) {
        target = Math.min(maxStall, target + Math.random() * 1.6 + 0.4);
      }
      current += (target - current) * 0.12;
      if (current > 99.5 && pageReady) current = 100;
      setProgress(current);

      if (current < 100 || !pageReady) {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => setDone(true), 320);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onReady);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = "";
    }, 850);
    return () => window.clearTimeout(t);
  }, [done]);

  if (hidden) return null;

  const labelIdx = Math.min(LABELS.length - 1, Math.floor((progress / 100) * LABELS.length));
  const display = String(Math.floor(progress)).padStart(3, "0");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-carbon-deep"
          aria-hidden={done}
          role="status"
          aria-label="Loading Taboo Traffic Agency"
        >
          <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" aria-hidden />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] glow-red opacity-60 pointer-events-none"
            aria-hidden
          />
          <div className="grain" aria-hidden />

          <motion.div
            className="absolute top-6 left-6 right-6 flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-ash-dim"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-taboo animate-pulse-soft" />
              TABOO · TRAFFIC · OPS
            </span>
            <span className="hidden sm:inline">SYS / BOOT-{new Date().getFullYear()}</span>
          </motion.div>

          <div className="relative flex flex-col items-center gap-8 px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <motion.div
                animate={{ scale: [1, 1.06, 1], rotate: [0, 1.4, 0, -1.4, 0] }}
                transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
                className="relative"
              >
                <div className="absolute inset-0 -m-12 rounded-full bg-taboo/15 blur-3xl" aria-hidden />
                <Image
                  src="/logo/taboo-mark-white.png"
                  alt="Taboo Traffic"
                  width={500}
                  height={500}
                  priority
                  className="relative w-[120px] sm:w-[150px] md:w-[170px] h-auto select-none"
                  draggable={false}
                />
              </motion.div>
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-taboo/40 -m-6 sm:-m-8 pointer-events-none"
                aria-hidden
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center gap-4 w-[260px] sm:w-[320px] md:w-[380px]"
            >
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="kpi-num text-[clamp(2.4rem,7vw,4rem)] leading-none text-bone tabular-nums">
                  {display}
                </span>
                <span className="font-mono text-base sm:text-lg text-taboo">%</span>
              </div>

              <div className="relative w-full h-[2px] bg-hairline overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-taboo-blood via-taboo to-taboo"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
                <div className="absolute inset-y-0 left-0 w-full animate-scan-shimmer bg-gradient-to-r from-transparent via-bone/30 to-transparent" />
              </div>

              <div className="flex items-center justify-between w-full font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-ash-dim">
                <motion.span
                  key={labelIdx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-bone/80"
                >
                  {LABELS[labelIdx]}
                </motion.span>
                <span className="text-ash-dim">
                  STAGE {labelIdx + 1}/{LABELS.length}
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-ash-dim"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>UA · EU · PERFORMANCE</span>
            <span className="hidden sm:inline">ROMI-FIRST · NDA-CLEAN · 24/7</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const initialKpis = [
  { label: "ROAS", value: 4.7, unit: "x", precision: 1 },
  { label: "CPA", value: 6.2, unit: "$", precision: 2, prefix: true },
  { label: "CTR", value: 3.8, unit: "%", precision: 2 },
  { label: "LEADS / 24H", value: 1284, unit: "", precision: 0 },
];

function jitter(v: number, range: number, precision: number) {
  const r = (Math.random() - 0.5) * range;
  return Number((v + r).toFixed(precision));
}

export function HeroDashboard() {
  const [kpis, setKpis] = useState(initialKpis);
  const [points, setPoints] = useState<number[]>(() =>
    Array.from({ length: 32 }, (_, i) => 30 + Math.sin(i / 3) * 12 + Math.random() * 8)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setKpis((prev) =>
        prev.map((k, i) => ({
          ...k,
          value: jitter(initialKpis[i].value, i === 3 ? 90 : i === 0 ? 0.4 : 0.5, k.precision),
        }))
      );
    }, 2400);
    const id2 = setInterval(() => {
      setPoints((prev) => {
        const next = [...prev.slice(1), 30 + Math.sin(Date.now() / 800) * 18 + Math.random() * 14];
        return next;
      });
    }, 1100);
    return () => {
      clearInterval(id);
      clearInterval(id2);
    };
  }, []);

  const max = Math.max(...points);
  const min = Math.min(...points);
  const norm = (v: number) => 100 - ((v - min) / (max - min || 1)) * 90 - 5;
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * 100} ${norm(p)}`).join(" ");

  return (
    <div className="relative w-full">
      <div className="absolute -inset-12 glow-red opacity-70 pointer-events-none" aria-hidden />
      <div className="relative rounded-card-lg border border-hairline bg-carbon/80 backdrop-blur-sm p-5 sm:p-6 shadow-card-inset overflow-hidden">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-taboo animate-pulse-soft" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash">LIVE · ACCT-A8472</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim">04:28 EET</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-hairline bg-carbon-deep/60 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim mb-2">{k.label}</div>
              <motion.div
                key={k.value}
                initial={{ opacity: 0.5, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="kpi-num text-2xl sm:text-3xl text-bone"
              >
                {k.prefix ? k.unit : ""}
                {k.value.toLocaleString("en-US", { minimumFractionDigits: k.precision, maximumFractionDigits: k.precision })}
                {!k.prefix ? k.unit : ""}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-hairline bg-carbon-deep/60 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim">ROMI / 30D</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-taboo">+24.6%</span>
          </div>
          <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="w-full h-24">
            <defs>
              <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#DA2F36" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#DA2F36" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${path} L 100 60 L 0 60 Z`} fill="url(#grad)" />
            <path d={path} fill="none" stroke="#DA2F36" strokeWidth="0.8" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </div>

        <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim">
          <span className="w-1.5 h-1.5 rounded-full bg-bone/40" />
          BACKUP CABS · 03 / 03 READY
        </div>
      </div>
    </div>
  );
}

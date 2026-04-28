"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function CountUp({
  value,
  duration = 1600,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = value.match(/^([^\d-]*)([\d\s.,]+)([^\d]*)$/);
  const fallback = !match;
  const prefix = match?.[1] ?? "";
  const numRaw = (match?.[2] ?? "0").trim();
  const suffix = match?.[3] ?? "";
  const target = parseFloat(numRaw.replace(/\s/g, "").replace(",", "."));
  const decimalSep = numRaw.includes(",") ? "," : ".";
  const decimals = numRaw.includes(decimalSep) ? numRaw.split(decimalSep)[1]?.length || 0 : 0;
  const hasGroups = /\s/.test(numRaw);
  const initial = format(0, decimals, decimalSep, hasGroups);
  const [display, setDisplay] = useState(initial);

  useEffect(() => {
    if (fallback || !inView || !isFinite(target)) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = target * eased;
      setDisplay(format(cur, decimals, decimalSep, hasGroups));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(format(target, decimals, decimalSep, hasGroups));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, decimals, decimalSep, hasGroups, fallback]);

  if (fallback) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function format(n: number, decimals: number, sep: string, groups: boolean) {
  const fixed = n.toFixed(decimals);
  if (!groups) return decimals > 0 ? fixed.replace(".", sep) : fixed;
  const [intPart, decPart] = fixed.split(".");
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return decimals > 0 ? `${grouped}${sep}${decPart}` : grouped;
}

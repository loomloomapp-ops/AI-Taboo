"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setShow(y > 600);
      setProgress(total > 0 ? Math.min(1, y / total) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const r = 22;
  const c = 2 * Math.PI * r;
  const dash = c * progress;

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Scroll to top"
      className={`fixed left-4 bottom-[5.25rem] lg:left-8 lg:bottom-8 z-40 w-11 h-11 lg:w-14 lg:h-14 rounded-full glass border border-hairline-strong text-bone flex items-center justify-center transition-all duration-500 ease-spring hover:bg-carbon hover:scale-105 active:scale-95 ${
        show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 50 50" aria-hidden>
        <circle cx="25" cy="25" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <circle
          cx="25"
          cy="25"
          r={r}
          fill="none"
          stroke="#DA2F36"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - dash}
          style={{ transition: "stroke-dashoffset 120ms linear" }}
        />
      </svg>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="relative">
        <path d="M7 11V3M7 3L3 7M7 3L11 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

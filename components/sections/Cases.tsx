"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Cases() {
  const { t } = useLocale();
  const lines = t.cases.title.split("\n");
  const items = t.cases.items;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      const idx = Math.round(el.scrollLeft / (w * 0.7));
      setActive(Math.min(items.length - 1, Math.max(0, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  const scroll = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section id="cases" className="section-pad relative">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
          <ScrollReveal>
            <span className="eyebrow"><span className="eyebrow-dot" />{t.cases.eyebrow}</span>
            <h2 className="headline mt-5 text-balance text-[clamp(1.55rem,3.6vw,2.85rem)]">
              {lines.map((l, i) => (<span key={i} className="block">{l}</span>))}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="max-w-md">
            <p className="text-ash text-base leading-relaxed">{t.cases.sub}</p>
          </ScrollReveal>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          className="no-scrollbar flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pt-3 pb-6 px-[max(1rem,calc((100vw-1440px)/2+1rem))] sm:px-[max(1rem,calc((100vw-1440px)/2+4rem))]"
        >
          {items.map((c, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[85vw] sm:w-[60vw] lg:w-[42vw] xl:w-[32vw] max-w-[520px] group"
            >
              <div className="relative rounded-card-lg border border-hairline bg-carbon p-6 sm:p-7 shadow-card-inset overflow-hidden transition-all duration-500 ease-spring group-hover:border-taboo/50 group-hover:bg-carbon-soft h-full flex flex-col">
                <div className="absolute -top-24 -right-24 w-72 h-72 glow-red opacity-30 pointer-events-none transition-opacity duration-500 group-hover:opacity-70" aria-hidden />
                <div className="flex items-center justify-between mb-4 relative">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim">
                    CASE / {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-taboo">{t.nda}</span>
                </div>

                <div className="font-display uppercase tracking-tighter2 text-lg sm:text-xl text-bone mb-4 relative leading-tight">
                  {c.vertical}
                </div>

                <div className="relative rounded-2xl border border-hairline bg-carbon-deep/60 overflow-hidden mb-5">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={c.image}
                      alt={c.vertical}
                      fill
                      sizes="(max-width:768px) 85vw, (max-width:1280px) 42vw, 520px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <ul className="relative flex flex-col divide-y divide-hairline border-y border-hairline">
                  {c.stats.map((s, k) => (
                    <li key={k} className="flex items-center justify-between gap-3 py-2.5">
                      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-ash-dim">
                        {s.label}
                      </span>
                      <span className="kpi-num text-sm sm:text-base text-bone text-right">{s.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="container-x mt-6 flex items-center justify-between">
          <p className="text-xs sm:text-sm text-ash-dim font-mono uppercase tracking-[0.16em] max-w-md">
            {t.cases.footnote}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] tracking-[0.2em] text-ash-dim">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-hairline flex items-center justify-center hover:bg-carbon transition-colors"
            >
              <span className="rotate-180 inline-block">→</span>
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-hairline flex items-center justify-center hover:bg-carbon transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { useLocale } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion } from "framer-motion";

export function Cases() {
  const { t } = useLocale();
  const lines = t.cases.title.split("\n");
  const items = t.cases.items;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

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
            <h2 className="headline mt-5 text-balance text-[clamp(2.2rem,5.5vw,4.5rem)]">
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
          className="no-scrollbar flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-[max(1rem,calc((100vw-1440px)/2+1rem))] sm:px-[max(1rem,calc((100vw-1440px)/2+4rem))]"
        >
          {items.map((c, i) => {
            const isRevealed = revealed[i];
            const trendMax = Math.max(...c.trend);
            return (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setRevealed((r) => ({ ...r, [i]: true }))}
                onClick={() => setRevealed((r) => ({ ...r, [i]: !r[i] }))}
                className="snap-start shrink-0 w-[85vw] sm:w-[60vw] lg:w-[42vw] xl:w-[32vw] max-w-[520px] cursor-pointer"
              >
                <div className="relative rounded-card-lg border border-hairline bg-carbon p-6 sm:p-7 shadow-card-inset overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-72 h-72 glow-red opacity-30 pointer-events-none" aria-hidden />
                  <div className="flex items-center justify-between mb-4 relative">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim">
                      CASE / {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-taboo">{t.nda}</span>
                  </div>

                  <div className="font-display uppercase tracking-tighter2 text-xl sm:text-2xl text-bone mb-1 relative">
                    {c.vertical}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-dim mb-6 relative">{c.period}</div>

                  <div className="grid grid-cols-3 gap-3 mb-6 relative">
                    <Metric label="ROAS" value={c.roas} blurred={!isRevealed} accent />
                    <Metric label="SPEND" value={c.spend} blurred={!isRevealed} />
                    <Metric label="LEADS" value={c.leads} blurred={!isRevealed} />
                  </div>

                  <div className="rounded-2xl border border-hairline bg-carbon-deep/60 p-4 relative">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim mb-3">TREND · 16W</div>
                    <div className="flex items-end gap-1 h-20">
                      {c.trend.map((v, k) => (
                        <div
                          key={k}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-taboo-blood to-taboo"
                          style={{ height: `${(v / trendMax) * 100}%`, opacity: 0.4 + (v / trendMax) * 0.6 }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim relative">
                    <span>CLIENT · <span className="redacted">REDACTED</span></span>
                    <span className="text-taboo">{isRevealed ? "[ DETAILS ON CALL ]" : "[ HOVER / TAP ]"}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
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

function Metric({ label, value, blurred, accent }: { label: string; value: string; blurred: boolean; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-hairline bg-carbon-deep/60 p-3">
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ash-dim mb-1.5">{label}</div>
      <div
        className={`kpi-num text-base sm:text-lg ${accent ? "text-taboo" : "text-bone"} transition-all duration-500`}
        style={{ filter: blurred ? "blur(7px)" : "blur(0px)" }}
      >
        {value}
      </div>
    </div>
  );
}

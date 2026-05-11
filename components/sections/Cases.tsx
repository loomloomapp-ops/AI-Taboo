"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BrandMark } from "@/components/ui/BrandMark";

export function Cases() {
  const { t } = useLocale();
  const lines = t.cases.title.split("\n");
  const items = t.cases.items;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

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

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((v) => (v === null ? null : (v + 1) % items.length));
      if (e.key === "ArrowLeft") setLightbox((v) => (v === null ? null : (v - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, items.length]);

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
                <div className="absolute inset-0 rounded-card-lg pointer-events-none ring-1 ring-inset ring-taboo/0 group-hover:ring-taboo/30 transition-all duration-500" aria-hidden />

                <div className="flex items-center justify-between mb-4 relative">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim">
                    CASE / {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-taboo">{t.nda}</span>
                </div>

                <div className="font-display uppercase tracking-tighter2 text-xl sm:text-2xl text-bone mb-1 relative break-words leading-[1.05]">
                  {c.vertical}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-dim mb-6 relative">{c.period}</div>

                <div className="grid grid-cols-3 gap-3 mb-6 relative">
                  {c.primary.map((m, k) => (
                    <div key={k} className="relative">
                      <Metric label={m.label} value={m.value} accent={k === 0} />
                      {k === 0 && (
                        <BrandMark
                          name="arrow-up"
                          size={42}
                          className="absolute -top-7 -right-3 opacity-90 pointer-events-none"
                          rotate={12}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={`Відкрити зображення кейсу ${i + 1}`}
                  className="relative rounded-2xl border border-hairline bg-carbon-deep/60 overflow-hidden mb-4 group/img"
                >
                  <div className="absolute top-3 left-3 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim">
                    SCREENSHOT
                  </div>
                  <span className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-carbon/70 border border-hairline text-bone transition-all duration-300 group-hover/img:bg-taboo group-hover/img:border-taboo">
                    <ZoomIcon size={14} />
                  </span>
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={c.image}
                      alt={c.vertical}
                      fill
                      sizes="(max-width:768px) 85vw, (max-width:1280px) 42vw, 520px"
                      className="object-cover transition-transform duration-700 ease-spring group-hover/img:scale-[1.03]"
                    />
                  </div>
                </button>

                {c.extra.length > 0 && (
                  <ul className="relative flex flex-col divide-y divide-hairline border-y border-hairline mb-4">
                    {c.extra.map((s, k) => (
                      <li key={k} className="flex items-center justify-between gap-3 py-2.5">
                        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-ash-dim">
                          {s.label}
                        </span>
                        <span className="kpi-num text-sm sm:text-base text-bone text-right">{s.value}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim relative">
                  <span>CLIENT · <span className="redacted">REDACTED</span></span>
                  <span className="text-taboo">[ DETAILS ON CALL ]</span>
                </div>
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

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-carbon-deep/95 backdrop-blur-md" onClick={() => setLightbox(null)} />
            <button
              aria-label="Close"
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full border border-hairline-strong bg-carbon/80 text-bone flex items-center justify-center hover:bg-carbon z-10 text-xl"
            >
              ×
            </button>
            <button
              aria-label="Prev"
              onClick={() => setLightbox((v) => (v === null ? null : (v - 1 + items.length) % items.length))}
              className="hidden sm:flex absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-hairline-strong bg-carbon/70 text-bone items-center justify-center hover:bg-carbon z-10"
            >
              <span className="rotate-180 inline-block">→</span>
            </button>
            <button
              aria-label="Next"
              onClick={() => setLightbox((v) => (v === null ? null : (v + 1) % items.length))}
              className="hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-hairline-strong bg-carbon/70 text-bone items-center justify-center hover:bg-carbon z-10"
            >
              →
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[92dvh] max-w-[94vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[lightbox].image}
                alt={items[lightbox].vertical}
                width={1600}
                height={1200}
                className="block max-h-[92dvh] w-auto h-auto rounded-2xl border border-hairline-strong"
                priority
              />
              <div className="absolute -top-8 left-0 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                CASE · {String(lightbox + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-hairline bg-carbon-deep/60 p-3">
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ash-dim mb-1.5">{label}</div>
      <div className={`kpi-num text-base sm:text-lg ${accent ? "text-taboo" : "text-bone"} transition-all duration-500`}>
        {value}
      </div>
    </div>
  );
}

function ZoomIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 7H9M7 5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

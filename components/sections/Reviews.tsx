"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BrandMark } from "@/components/ui/BrandMark";

const screenshots = Array.from({ length: 8 }, (_, i) => `/reviews/tg-${i + 1}.jpeg`);

export function Reviews() {
  const { t } = useLocale();
  const lines = t.reviews.title.split("\n");
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const isAdjusting = useRef(false);
  const n = screenshots.length;
  const tripled = [...screenshots, ...screenshots, ...screenshots];

  const itemWidthRef = useRef(0);

  const recompute = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const first = el.children[0] as HTMLElement | undefined;
    if (!first) return 0;
    const style = getComputedStyle(el);
    const gap = parseFloat(style.columnGap || style.gap || "0");
    const w = first.getBoundingClientRect().width + gap;
    itemWidthRef.current = w;
    return w;
  }, []);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const init = () => {
      const w = recompute();
      if (!w) return;
      isAdjusting.current = true;
      el.scrollLeft = w * n;
      requestAnimationFrame(() => {
        isAdjusting.current = false;
      });
    };
    init();
    const ro = new ResizeObserver(init);
    ro.observe(el);
    return () => ro.disconnect();
  }, [n, recompute]);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || isAdjusting.current) return;
    const w = itemWidthRef.current || recompute();
    if (!w) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    const idx = Math.round((center - w / 2) / w);
    setActiveIdx(((idx % n) + n) % n);

    const total = w * n;
    if (el.scrollLeft < w * 0.5) {
      isAdjusting.current = true;
      el.scrollLeft += total;
      requestAnimationFrame(() => {
        isAdjusting.current = false;
      });
    } else if (el.scrollLeft > w * (n * 2 + 0.5)) {
      isAdjusting.current = true;
      el.scrollLeft -= total;
      requestAnimationFrame(() => {
        isAdjusting.current = false;
      });
    }
  }, [n, recompute]);

  const scrollBy = useCallback(
    (dir: -1 | 1) => {
      const el = trackRef.current;
      const w = itemWidthRef.current || recompute();
      if (!el || !w) return;
      el.scrollTo({ left: el.scrollLeft + dir * w, behavior: "smooth" });
    },
    [recompute]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox !== null) {
        if (e.key === "Escape") setLightbox(null);
        if (e.key === "ArrowRight") setLightbox((v) => (v === null ? null : (v + 1) % n));
        if (e.key === "ArrowLeft") setLightbox((v) => (v === null ? null : (v - 1 + n) % n));
        return;
      }
      if (e.key === "ArrowRight") scrollBy(1);
      if (e.key === "ArrowLeft") scrollBy(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, n, scrollBy]);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [lightbox]);

  return (
    <section id="reviews" className="section-pad relative overflow-hidden">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
          <ScrollReveal>
            <span className="eyebrow"><span className="eyebrow-dot" />{t.reviews.eyebrow}</span>
            <div className="relative">
              <h2 className="headline mt-5 text-balance text-[clamp(1.55rem,3.6vw,2.85rem)]">
                {lines.map((l, i) => (<span key={i} className="block">{l}</span>))}
              </h2>
              <BrandMark
                name="hearts"
                size={70}
                className="hidden sm:block absolute -top-4 -right-12 lg:-right-20 opacity-90 pointer-events-none"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="max-w-md">
            <p className="text-ash text-base leading-relaxed">{t.reviews.sub}</p>
          </ScrollReveal>
        </div>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar flex gap-5 sm:gap-7 overflow-x-auto snap-x snap-mandatory pt-3 pb-6 px-[calc(50vw-150px)] sm:px-[calc(50vw-160px)]"
          style={{ scrollBehavior: "auto" }}
        >
          {tripled.map((src, i) => {
            const realIdx = i % n;
            return (
              <div
                key={i}
                className="snap-center shrink-0 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                onClick={() => setLightbox(realIdx)}
              >
                <PhoneFrame>
                  <Image
                    src={src}
                    alt={`Telegram review ${realIdx + 1}`}
                    width={600}
                    height={1200}
                    className="block w-full h-full object-cover pointer-events-none"
                    sizes="(max-width:768px) 70vw, 320px"
                    draggable={false}
                  />
                </PhoneFrame>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scrollBy(-1)}
          aria-label="Prev"
          className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass border border-hairline-strong flex items-center justify-center hover:bg-carbon transition-colors"
        >
          <span className="rotate-180 inline-block">→</span>
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Next"
          className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass border border-hairline-strong flex items-center justify-center hover:bg-carbon transition-colors"
        >
          →
        </button>
      </div>

      <div className="container-x mt-6 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash-dim">
          {String(activeIdx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-1.5">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = trackRef.current;
                const w = itemWidthRef.current || recompute();
                if (!el || !w) return;
                const currentBlock = Math.floor(el.scrollLeft / (w * n));
                const target = (currentBlock * n + i) * w;
                el.scrollTo({ left: target, behavior: "smooth" });
              }}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                activeIdx === i ? "w-8 bg-taboo" : "w-3 bg-hairline-strong hover:bg-ash"
              }`}
            />
          ))}
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
              onClick={() => setLightbox((v) => (v === null ? null : (v - 1 + n) % n))}
              className="hidden sm:flex absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-hairline-strong bg-carbon/70 text-bone items-center justify-center hover:bg-carbon z-10"
            >
              <span className="rotate-180 inline-block">→</span>
            </button>
            <button
              aria-label="Next"
              onClick={() => setLightbox((v) => (v === null ? null : (v + 1) % n))}
              className="hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-hairline-strong bg-carbon/70 text-bone items-center justify-center hover:bg-carbon z-10"
            >
              →
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[92dvh] max-w-[92vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={screenshots[lightbox]}
                alt={`Telegram review ${lightbox + 1}`}
                width={1080}
                height={2160}
                className="block max-h-[92dvh] w-auto h-auto rounded-2xl border border-hairline-strong"
                priority
              />
              <div className="absolute -top-8 left-0 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                {String(lightbox + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[260px] sm:w-[290px] aspect-[9/19.5] rounded-[2.5rem] border border-hairline-strong bg-carbon shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] p-2">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-2xl bg-carbon-deep z-10 border-x border-b border-hairline" />
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-carbon-deep">{children}</div>
    </div>
  );
}

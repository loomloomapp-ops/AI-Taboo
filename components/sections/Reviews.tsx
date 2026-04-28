"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const screenshots = Array.from({ length: 8 }, (_, i) => `/reviews/tg-${i + 1}.jpeg`);

export function Reviews() {
  const { t } = useLocale();
  const lines = t.reviews.title.split("\n");
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [slotWidth, setSlotWidth] = useState(320);
  const n = screenshots.length;

  useEffect(() => {
    const measure = () => {
      const w = containerRef.current?.clientWidth ?? 320;
      const card = Math.min(300, Math.max(220, w * 0.32));
      setSlotWidth(card + 28);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const next = useCallback(() => setActive((a) => (a + 1) % n), [n]);
  const prev = useCallback(() => setActive((a) => (a - 1 + n) % n), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox !== null) {
        if (e.key === "Escape") setLightbox(null);
        if (e.key === "ArrowRight") setLightbox((v) => (v === null ? null : (v + 1) % n));
        if (e.key === "ArrowLeft") setLightbox((v) => (v === null ? null : (v - 1 + n) % n));
        return;
      }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, n, next, prev]);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [lightbox]);

  const offset = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  return (
    <section id="reviews" className="section-pad relative overflow-hidden">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
          <ScrollReveal>
            <span className="eyebrow"><span className="eyebrow-dot" />{t.reviews.eyebrow}</span>
            <h2 className="headline mt-5 text-balance text-[clamp(1.9rem,4.4vw,3.5rem)]">
              {lines.map((l, i) => (<span key={i} className="block">{l}</span>))}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="max-w-md">
            <p className="text-ash text-base leading-relaxed">{t.reviews.sub}</p>
          </ScrollReveal>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-[560px] sm:h-[620px] flex items-center justify-center select-none"
      >
        <motion.div
          className="absolute inset-0"
          drag="x"
          dragElastic={0.2}
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={(_, info) => setDragX(info.offset.x)}
          onDragEnd={(_, info) => {
            setDragX(0);
            if (info.offset.x < -60 || info.velocity.x < -300) next();
            else if (info.offset.x > 60 || info.velocity.x > 300) prev();
          }}
        >
          {screenshots.map((src, i) => {
            const o = offset(i);
            const abs = Math.abs(o);
            if (abs > 3) return null;
            const x = o * slotWidth + dragX;
            const scale = abs === 0 ? 1 : abs === 1 ? 0.86 : 0.7;
            const opacity = abs === 0 ? 1 : abs === 1 ? 0.65 : 0.3;
            const z = 10 - abs;
            const blur = abs >= 2 ? "blur(2px)" : "blur(0px)";
            return (
              <motion.div
                key={src}
                className="absolute top-1/2 left-1/2 cursor-pointer"
                animate={{ x, scale, opacity, filter: blur }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                style={{ zIndex: z, translateX: "-50%", translateY: "-50%" }}
                onClick={() => {
                  if (abs === 0) setLightbox(i);
                  else setActive(i);
                }}
                role="button"
                aria-label={abs === 0 ? "Open review" : "Switch to this review"}
              >
                <PhoneFrame>
                  <Image
                    src={src}
                    alt={`Telegram review ${i + 1}`}
                    width={600}
                    height={1200}
                    className="block w-full h-full object-cover pointer-events-none"
                    sizes="(max-width:768px) 70vw, 320px"
                    draggable={false}
                  />
                </PhoneFrame>
              </motion.div>
            );
          })}
        </motion.div>

        <button
          onClick={prev}
          aria-label="Prev"
          className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass border border-hairline-strong flex items-center justify-center hover:bg-carbon transition-colors"
        >
          <span className="rotate-180 inline-block">→</span>
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass border border-hairline-strong flex items-center justify-center hover:bg-carbon transition-colors"
        >
          →
        </button>
      </div>

      <div className="container-x mt-6 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash-dim">
          {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-1.5">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                active === i ? "w-8 bg-taboo" : "w-3 bg-hairline-strong hover:bg-ash"
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

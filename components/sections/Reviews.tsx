"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const screenshots = Array.from({ length: 8 }, (_, i) => `/reviews/tg-${i + 1}.jpeg`);

export function Reviews() {
  const { t } = useLocale();
  const lines = t.reviews.title.split("\n");
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      const children = Array.from(el.children) as HTMLElement[];
      let nearest = 0;
      let dMin = Infinity;
      children.forEach((c, i) => {
        const cx = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cx - center);
        if (d < dMin) {
          dMin = d;
          nearest = i;
        }
      });
      setActive(nearest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="section-pad relative">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
          <ScrollReveal>
            <span className="eyebrow"><span className="eyebrow-dot" />{t.reviews.eyebrow}</span>
            <h2 className="headline mt-5 text-balance text-[clamp(2.2rem,5.5vw,4.5rem)]">
              {lines.map((l, i) => (<span key={i} className="block">{l}</span>))}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="max-w-md">
            <p className="text-ash text-base leading-relaxed">{t.reviews.sub}</p>
          </ScrollReveal>
        </div>
      </div>

      <div
        ref={ref}
        className="no-scrollbar flex gap-5 sm:gap-7 overflow-x-auto snap-x snap-mandatory pb-4 px-[max(1rem,calc((100vw-1440px)/2+1rem))] sm:px-[max(1rem,calc((100vw-1440px)/2+4rem))]"
      >
        {screenshots.map((src, i) => {
          const isActive = i === active;
          return (
            <div
              key={src}
              className="snap-center shrink-0 transition-all duration-500"
              style={{
                transform: isActive ? "scale(1)" : "scale(0.92)",
                opacity: isActive ? 1 : 0.55,
              }}
            >
              <PhoneFrame>
                <Image
                  src={src}
                  alt={`Telegram review ${i + 1}`}
                  width={600}
                  height={1200}
                  className="block w-full h-full object-cover"
                  sizes="(max-width:768px) 70vw, 320px"
                />
              </PhoneFrame>
            </div>
          );
        })}
      </div>

      <div className="container-x mt-8 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash-dim">
          {String(active + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={() => scroll(-1)} aria-label="Prev" className="w-10 h-10 rounded-full border border-hairline flex items-center justify-center hover:bg-carbon transition-colors">
            <span className="rotate-180 inline-block">→</span>
          </button>
          <button onClick={() => scroll(1)} aria-label="Next" className="w-10 h-10 rounded-full border border-hairline flex items-center justify-center hover:bg-carbon transition-colors">
            →
          </button>
        </div>
      </div>
    </section>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[260px] sm:w-[290px] aspect-[9/19.5] rounded-[2.5rem] border border-hairline-strong bg-carbon shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] p-2">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-2xl bg-carbon-deep z-10 border-x border-b border-hairline" />
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-carbon-deep">
        {children}
      </div>
    </div>
  );
}

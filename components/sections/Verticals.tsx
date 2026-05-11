"use client";

import { useLocale } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowUpRight } from "@/components/ui/ArrowIcon";
import { BrandMark } from "@/components/ui/BrandMark";

export function Verticals() {
  const { t } = useLocale();
  const lines = t.verticals.title.split("\n");
  const list = t.verticals.list;

  const sizes = [
    "lg:col-span-6 lg:row-span-2",
    "lg:col-span-3 lg:row-span-1",
    "lg:col-span-3 lg:row-span-1",
    "lg:col-span-3 lg:row-span-1",
    "lg:col-span-3 lg:row-span-1",
    "lg:col-span-4 lg:row-span-1",
    "lg:col-span-4 lg:row-span-1",
    "lg:col-span-4 lg:row-span-1",
  ];

  return (
    <section id="verticals" className="section-pad relative overflow-hidden">
      <BrandMark name="strokes" size={180} className="hidden lg:block absolute right-0 top-12 opacity-25 pointer-events-none" rotate={-12} />
      <div className="container-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16 lg:items-stretch">
          <ScrollReveal className="lg:col-span-7">
            <span className="eyebrow"><span className="eyebrow-dot" />{t.verticals.eyebrow}</span>
            <h2 className="headline mt-5 text-balance text-[clamp(1.55rem,3.6vw,2.85rem)]">
              {lines.map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="lg:col-span-5 lg:flex lg:flex-col lg:justify-end lg:h-full">
            <p className="text-ash text-base sm:text-lg leading-relaxed">{t.verticals.sub}</p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[200px] gap-3 sm:gap-4">
          {list.map((v, i) => {
            const isLarge = sizes[i].includes("col-span-6");
            return (
              <ScrollReveal key={v.name} delay={i * 0.04} className={`${sizes[i]} group`}>
                <a
                  href="#form"
                  className="relative h-full min-h-[180px] flex flex-col justify-between rounded-card-lg border border-hairline bg-carbon p-4 sm:p-5 lg:p-6 overflow-hidden transition-all duration-500 hover:border-hairline-strong hover:bg-carbon-soft"
                >
                  <div className="absolute -top-20 -right-20 w-60 h-60 glow-red opacity-0 group-hover:opacity-60 transition-opacity duration-700" aria-hidden />
                  <div className="flex items-start justify-between gap-3 relative">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-ash-dim">
                      {String(i + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
                    </span>
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-hairline flex items-center justify-center text-ash-dim group-hover:text-bone group-hover:border-hairline-strong group-hover:rotate-[45deg] transition-all duration-500 shrink-0">
                      <ArrowUpRight size={11} />
                    </span>
                  </div>
                  <div className="relative min-w-0">
                    <div
                      className={`font-display uppercase tracking-tighter2 text-bone leading-[1] break-words hyphens-auto ${
                        isLarge ? "text-xl sm:text-2xl lg:text-3xl" : "text-base sm:text-lg lg:text-xl"
                      }`}
                    >
                      {v.name}
                    </div>
                    <div
                      className={`mt-2 text-ash leading-snug text-pretty ${
                        isLarge ? "text-sm sm:text-[14px]" : "text-[12px] sm:text-[13px]"
                      } line-clamp-3`}
                    >
                      {v.desc}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ash-dim">CPA</span>
                      <span className="kpi-num text-xs sm:text-sm text-taboo">{v.cpa}</span>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

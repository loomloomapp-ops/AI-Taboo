"use client";

import { useLocale } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowUpRight } from "@/components/ui/ArrowIcon";

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
    <section id="verticals" className="section-pad relative">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
          <ScrollReveal className="lg:col-span-7">
            <span className="eyebrow"><span className="eyebrow-dot" />{t.verticals.eyebrow}</span>
            <h2 className="headline mt-5 text-balance text-[clamp(1.9rem,4.4vw,3.5rem)]">
              {lines.map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="lg:col-span-5 lg:pt-4">
            <p className="text-ash text-base sm:text-lg leading-relaxed">{t.verticals.sub}</p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[180px] gap-3 sm:gap-4">
          {list.map((v, i) => (
            <ScrollReveal key={v.name} delay={i * 0.04} className={`${sizes[i]} group`}>
              <a
                href="#form"
                className="relative h-full min-h-[180px] flex flex-col justify-between rounded-card-lg border border-hairline bg-carbon p-6 sm:p-7 overflow-hidden transition-all duration-500 hover:border-hairline-strong hover:bg-carbon-soft"
              >
                <div className="absolute -top-20 -right-20 w-60 h-60 glow-red opacity-0 group-hover:opacity-60 transition-opacity duration-700" aria-hidden />
                <div className="flex items-start justify-between gap-4 relative">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim">
                    {String(i + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
                  </span>
                  <span className="w-7 h-7 rounded-full border border-hairline flex items-center justify-center text-ash-dim group-hover:text-bone group-hover:border-hairline-strong group-hover:rotate-[45deg] transition-all duration-500">
                    <ArrowUpRight size={12} />
                  </span>
                </div>
                <div className="relative">
                  <div className="font-display uppercase tracking-tighter2 text-2xl sm:text-3xl lg:text-4xl text-bone leading-[0.95]">
                    {v.name}
                  </div>
                  <div className="mt-3 max-w-md text-sm sm:text-[15px] text-ash leading-relaxed text-pretty">
                    {v.desc}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash-dim">CPA</span>
                    <span className="kpi-num text-sm text-taboo">{v.cpa}</span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

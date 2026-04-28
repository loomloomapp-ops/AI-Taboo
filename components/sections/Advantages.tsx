"use client";

import { useLocale } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CountUp } from "@/components/ui/CountUp";

export function Advantages() {
  const { t } = useLocale();
  const lines = t.advantages.title.split("\n");
  return (
    <section id="advantages" className="section-pad relative bg-carbon-deep">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14 lg:mb-20">
          <ScrollReveal className="lg:col-span-7">
            <span className="eyebrow"><span className="eyebrow-dot" />{t.advantages.eyebrow}</span>
            <h2 className="headline mt-5 text-balance text-[clamp(1.9rem,4.4vw,3.5rem)]">
              {lines.map((l, i) => (<span key={i} className="block">{l}</span>))}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="lg:col-span-5 lg:pt-4">
            <p className="text-ash text-base sm:text-lg leading-relaxed text-pretty">{t.advantages.sub}</p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-14 lg:mb-20">
          {t.advantages.strip.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="rounded-card-lg border border-hairline bg-carbon p-5 sm:p-7 h-full">
                <CountUp
                  value={s.num}
                  duration={1800}
                  className="font-display text-[clamp(2.4rem,6vw,4.25rem)] leading-[0.85] text-bone tracking-tightest block"
                />
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-ash leading-relaxed">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-hairline rounded-card-lg overflow-hidden border border-hairline">
          {t.advantages.items.map((it, i) => (
            <ScrollReveal key={i} delay={(i % 2) * 0.08}>
              <div className="bg-carbon p-7 sm:p-9 h-full flex flex-col gap-3 group transition-colors duration-500 hover:bg-carbon-soft">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-taboo">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display uppercase tracking-tighter2 text-xl sm:text-2xl text-bone">
                    {it.title}
                  </h3>
                </div>
                <p className="text-ash text-[15px] leading-relaxed text-pretty">{it.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <div className="mt-14 lg:mt-20">
            <div className="flex items-baseline justify-between mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash-dim">TEAM / 5 SPECIALISTS</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash-dim">PER PROJECT</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
              {t.advantages.team.map((m, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-hairline bg-carbon p-5 group hover:border-hairline-strong transition-all duration-500"
                >
                  <div className="w-9 h-9 rounded-full bg-taboo/15 border border-taboo/30 flex items-center justify-center font-mono text-[11px] text-taboo mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-display uppercase tracking-tighter2 text-base sm:text-lg text-bone leading-tight">
                    {m.role}
                  </div>
                  <div className="mt-2 text-xs text-ash leading-relaxed">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

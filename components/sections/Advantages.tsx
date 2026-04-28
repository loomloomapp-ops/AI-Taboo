"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CountUp } from "@/components/ui/CountUp";
import { BrandMark } from "@/components/ui/BrandMark";

const teamPhotos = ["/team/pm.png", "/team/lead.png", "/team/buyer.png", "/team/designer.png", "/team/ai.png"];

export function Advantages() {
  const { t } = useLocale();
  const lines = t.advantages.title.split("\n");
  return (
    <section id="advantages" className="section-pad relative bg-carbon-deep overflow-hidden">
      <BrandMark name="comet" size={200} className="hidden lg:block absolute -left-10 top-32 opacity-25 pointer-events-none" rotate={20} />
      <div className="container-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14 lg:mb-20">
          <ScrollReveal className="lg:col-span-7">
            <span className="eyebrow"><span className="eyebrow-dot" />{t.advantages.eyebrow}</span>
            <h2 className="headline mt-5 text-balance text-[clamp(1.55rem,3.6vw,2.85rem)]">
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
              <div className="rounded-card-lg border border-hairline bg-carbon p-3 sm:p-5 lg:p-7 h-full">
                <CountUp
                  value={s.num}
                  duration={1800}
                  className="font-display text-[clamp(1.4rem,4.4vw,3.2rem)] leading-[0.9] text-bone tracking-tightest block"
                />
                <div className="mt-2 sm:mt-4 text-[11px] sm:text-xs lg:text-sm text-ash leading-relaxed">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-hairline rounded-card-lg overflow-hidden border border-hairline">
          {t.advantages.items.map((it, i) => (
            <ScrollReveal key={i} delay={(i % 2) * 0.08}>
              <div className="bg-carbon p-5 sm:p-7 lg:p-8 h-full flex flex-col gap-2.5 group transition-colors duration-500 hover:bg-carbon-soft">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-taboo">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display uppercase tracking-tighter2 text-base sm:text-lg lg:text-xl text-bone leading-tight">
                    {it.title}
                  </h3>
                </div>
                <p className="text-ash text-sm sm:text-[15px] leading-relaxed text-pretty">{it.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <div className="mt-14 lg:mt-20 relative">
            <BrandMark name="star" size={70} className="absolute -top-10 right-0 sm:right-8 opacity-90 pointer-events-none" rotate={-8} />
            <div className="flex items-baseline justify-between mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash-dim">TEAM / 5 SPECIALISTS</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash-dim">PER PROJECT</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {t.advantages.team.map((m, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl border border-hairline bg-carbon group hover:border-hairline-strong transition-all duration-500"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={teamPhotos[i]}
                      alt={m.role}
                      width={2028}
                      height={3072}
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 240px"
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-spring scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon/95 via-carbon/30 to-transparent pointer-events-none" />
                    <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative p-4 sm:p-5 -mt-1">
                    <div className="font-display uppercase tracking-tighter2 text-sm sm:text-base lg:text-lg text-bone leading-tight">
                      {m.role}
                    </div>
                    <div className="mt-1.5 text-[11px] sm:text-xs text-ash leading-relaxed">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

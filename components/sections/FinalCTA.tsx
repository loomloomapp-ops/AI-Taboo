"use client";

import { useLocale } from "@/lib/i18n/context";
import { TELEGRAM_URL } from "@/lib/i18n/dict";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowUpRight, TelegramIcon } from "@/components/ui/ArrowIcon";
import { BrandMark } from "@/components/ui/BrandMark";

export function FinalCTA() {
  const { t } = useLocale();
  const lines = t.finalCta.title.split("\n");
  return (
    <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-24 sm:pb-32 overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[600px] glow-red opacity-50 pointer-events-none" aria-hidden />
      <BrandMark name="flower" size={160} className="hidden md:block absolute top-16 right-[6%] opacity-90 pointer-events-none" rotate={12} />
      <BrandMark name="circle" size={170} className="hidden lg:block absolute -bottom-4 left-[4%] opacity-30 pointer-events-none" />
      <div className="container-x relative">
        <ScrollReveal>
          <h2 className="headline text-balance text-[clamp(2.2rem,6.5vw,5.5rem)]">
            <span className="block">{lines[0]}</span>
            <span className="block text-taboo">{lines[1]}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="mt-8 max-w-xl text-base sm:text-lg text-ash leading-relaxed">{t.finalCta.sub}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <div className="mt-10 flex flex-wrap gap-3 relative">
            <BrandMark name="arrow-down" size={70} className="hidden sm:block absolute -top-16 left-2 opacity-90 pointer-events-none" />
            <a href="#form" className="btn-primary">
              {t.finalCta.ctaPrimary}
              <span className="btn-trailing-icon"><ArrowUpRight size={12} /></span>
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <TelegramIcon size={14} />
              {t.finalCta.ctaSecondary}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import { useLocale } from "@/lib/i18n/context";
import { TELEGRAM_URL } from "@/lib/i18n/dict";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowUpRight, TelegramIcon } from "@/components/ui/ArrowIcon";

export function FinalCTA() {
  const { t } = useLocale();
  const lines = t.finalCta.title.split("\n");
  return (
    <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-24 sm:pb-32 overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[600px] glow-red opacity-50 pointer-events-none" aria-hidden />
      <div className="container-x relative">
        <ScrollReveal>
          <h2 className="headline text-balance text-[clamp(2.6rem,9vw,8rem)]">
            <span className="block">{lines[0]}</span>
            <span className="block text-taboo">{lines[1]}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="mt-8 max-w-xl text-base sm:text-lg text-ash leading-relaxed">{t.finalCta.sub}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <div className="mt-10 flex flex-wrap gap-3">
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

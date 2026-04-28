"use client";

import { useLocale } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Manifesto() {
  const { t } = useLocale();
  const lines = t.manifesto.title.split("\n");
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] glow-red opacity-30 pointer-events-none" aria-hidden />
      <div className="container-x relative">
        <ScrollReveal>
          <span className="eyebrow"><span className="eyebrow-dot" />{t.manifesto.eyebrow}</span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="headline mt-6 text-balance text-[clamp(2.4rem,6.5vw,5.5rem)]">
            <span className="block">{lines[0]}</span>
            <span className="block text-taboo">{lines[1]}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-ash text-pretty">
            {t.manifesto.body}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import { useLocale } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BrandMark } from "@/components/ui/BrandMark";

export function Manifesto() {
  const { t } = useLocale();
  const lines = t.manifesto.title.split("\n");
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] glow-red opacity-30 pointer-events-none" aria-hidden />
      <BrandMark name="blob" size={260} className="hidden md:block absolute -left-12 top-12 opacity-15 pointer-events-none" />
      <BrandMark name="hatch" size={220} className="hidden md:block absolute right-0 bottom-10 opacity-20 pointer-events-none" rotate={20} />
      <div className="container-x relative">
        <ScrollReveal>
          <span className="eyebrow"><span className="eyebrow-dot" />{t.manifesto.eyebrow}</span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="headline mt-6 text-balance text-[clamp(1.85rem,4.8vw,3.8rem)]">
            <span className="block">{lines[0]}</span>
            <span className="block text-taboo">{lines[1]}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <BrandMark name="teeth" size={120} className="mt-6 -ml-3 sm:-ml-4 opacity-90" />
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-ash text-pretty">
            {t.manifesto.body}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

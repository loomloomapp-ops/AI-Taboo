"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PlusIcon } from "@/components/ui/ArrowIcon";
import { BrandMark } from "@/components/ui/BrandMark";
import { motion, AnimatePresence } from "framer-motion";

export function FAQ() {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(0);
  const lines = t.faq.title.split("\n");

  return (
    <section id="faq" className="section-pad relative overflow-hidden">
      <BrandMark name="curve-right" size={140} className="hidden lg:block absolute top-24 left-[40%] opacity-50 pointer-events-none" rotate={-10} />
      <div className="container-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 lg:items-start">
          <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow"><span className="eyebrow-dot" />{t.faq.eyebrow}</span>
            <h2 className="headline mt-5 text-balance text-[clamp(1.45rem,2.8vw,2.2rem)]">
              {lines.map((l, i) => (<span key={i} className="block">{l}</span>))}
            </h2>
          </ScrollReveal>

          <div className="lg:col-span-8 lg:pt-2">
            {t.faq.items.map((it, i) => {
              const isOpen = open === i;
              return (
                <ScrollReveal key={i} delay={i * 0.04}>
                  <div className="border-b border-hairline">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full text-left py-6 sm:py-8 flex items-start justify-between gap-6 group"
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-baseline gap-4 sm:gap-6">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash-dim shrink-0 mt-1">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display uppercase tracking-tighter2 text-base sm:text-lg lg:text-xl text-bone leading-tight">
                          {it.q}
                        </span>
                      </span>
                      <span className="shrink-0 w-9 h-9 rounded-full border border-hairline flex items-center justify-center text-bone group-hover:border-taboo group-hover:text-taboo transition-colors duration-300">
                        <PlusIcon open={isOpen} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-7 pl-0 sm:pl-[calc(11px+1.5rem)] max-w-3xl text-ash text-sm sm:text-[15px] leading-relaxed text-pretty">
                            {it.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

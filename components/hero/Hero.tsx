"use client";

import { useLocale } from "@/lib/i18n/context";
import { TELEGRAM_URL } from "@/lib/i18n/dict";
import { HeroDashboard } from "./HeroDashboard";
import { TelegramIcon, ArrowUpRight } from "@/components/ui/ArrowIcon";
import { CountUp } from "@/components/ui/CountUp";
import { BrandMark } from "@/components/ui/BrandMark";
import { motion } from "framer-motion";

const platforms = [
  "TikTok Ads",
  "Meta Ads",
  "Google Ads",
  "Push",
  "Native",
  "UAC",
  "PropellerAds",
  "MGID",
  "Snapchat",
  "Telegram Ads",
];

export function Hero() {
  const { t } = useLocale();
  const titleLines = t.hero.title.split("\n");

  return (
    <section id="top" className="relative pt-32 sm:pt-40 lg:pt-44 pb-12 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-60 diagonal-fade pointer-events-none" aria-hidden />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] glow-red opacity-50 pointer-events-none" aria-hidden />
      <BrandMark name="zigzag" size={110} className="hidden lg:block absolute top-32 left-[42%] opacity-50 -rotate-12 pointer-events-none" />
      <BrandMark name="exclaim" size={70} className="hidden md:block absolute top-44 right-[5%] opacity-80 pointer-events-none" rotate={8} />

      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              <span className="eyebrow-dot" />
              {t.hero.eyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="headline mt-5 sm:mt-6 text-balance text-[clamp(1.8rem,4.4vw,3.75rem)]"
            >
              {titleLines.map((l, i) => {
                const isLast = i === titleLines.length - 1;
                const text = isLast ? l.replace(".", "") : l;
                return (
                  <span key={i} className="block">
                    {text}
                    {isLast && <span className="text-taboo">.</span>}
                  </span>
                );
              })}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-5 sm:mt-7 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-ash text-pretty"
            >
              {t.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-3 relative"
            >
              <a href="#form" className="btn-primary">
                {t.hero.ctaPrimary}
                <span className="btn-trailing-icon"><ArrowUpRight size={12} /></span>
              </a>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <TelegramIcon size={14} />
                {t.hero.ctaSecondary}
              </a>
              <BrandMark
                name="curve-left"
                size={92}
                className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-3 lg:ml-5 opacity-95 pointer-events-none"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-2xl"
            >
              {[t.hero.trust1, t.hero.trust2, t.hero.trust3, t.hero.trust4].map((s, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <CountUp value={s.split(" ")[0]} className="kpi-num text-bone text-base sm:text-lg" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-ash-dim">
                    {s.split(" ").slice(1).join(" ")}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 mt-2 lg:mt-0"
          >
            <HeroDashboard />
          </motion.div>
        </div>
      </div>

      <div className="mt-16 sm:mt-24 hairline-top hairline-bottom py-5 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-marquee" style={{ width: "max-content" }}>
          {[...platforms, ...platforms, ...platforms].map((p, i) => (
            <div key={i} className="flex items-center gap-3 font-display text-base sm:text-xl lg:text-2xl uppercase tracking-tighter2 text-ash">
              {p}
              <span className="w-1.5 h-1.5 rounded-full bg-taboo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

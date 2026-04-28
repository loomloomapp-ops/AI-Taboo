"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { useLocale } from "@/lib/i18n/context";
import { TELEGRAM_URL } from "@/lib/i18n/dict";
import { TelegramIcon, ArrowUpRight } from "@/components/ui/ArrowIcon";

export function Header() {
  const { t, locale, setLocale } = useLocale();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY && y > 200);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links: { id: string; label: string }[] = [
    { id: "verticals", label: t.nav.verticals },
    { id: "cases", label: t.nav.cases },
    { id: "advantages", label: t.nav.advantages },
    { id: "reviews", label: t.nav.reviews },
    { id: "faq", label: t.nav.faq },
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden && !open ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-5"
      >
        <div className="container-x">
          <div
            className={`flex items-center justify-between gap-4 rounded-pill px-3 py-2 transition-all duration-500 ${
              scrolled || open ? "glass" : "bg-transparent border border-transparent"
            }`}
          >
            <Link href="#top" className="flex items-center gap-2 pl-2" aria-label="Taboo Traffic Agency">
              <Logo variant="mark" className="shrink-0" />
              <span className="font-display text-[13px] uppercase tracking-[0.16em] text-bone hidden sm:block">
                Taboo<span className="text-taboo">.</span>traffic
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="px-3 py-2 text-sm text-ash hover:text-bone transition-colors duration-300"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center text-[11px] font-mono uppercase tracking-[0.18em] mr-1">
                <button
                  onClick={() => setLocale("ua")}
                  aria-label="Ukrainian"
                  className={`px-1.5 py-1 ${locale === "ua" ? "text-bone" : "text-ash-dim hover:text-ash"} transition-colors`}
                >
                  UA
                </button>
                <span className="text-ash-dim">/</span>
                <button
                  onClick={() => setLocale("ru")}
                  aria-label="Russian"
                  className={`px-1.5 py-1 ${locale === "ru" ? "text-bone" : "text-ash-dim hover:text-ash"} transition-colors`}
                >
                  RU
                </button>
              </div>

              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 !px-4 hidden sm:inline-flex">
                <TelegramIcon size={14} />
                <span className="text-sm">{t.nav.telegram}</span>
              </a>

              <button
                aria-label="Menu"
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden relative w-10 h-10 rounded-pill border border-hairline flex items-center justify-center"
              >
                <span
                  className="absolute w-4 h-[1.5px] bg-bone transition-transform duration-400"
                  style={{ transform: open ? "rotate(45deg)" : "translateY(-4px)" }}
                />
                <span
                  className="absolute w-4 h-[1.5px] bg-bone transition-transform duration-400"
                  style={{ transform: open ? "rotate(-45deg)" : "translateY(4px)" }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-carbon-deep/95 backdrop-blur-2xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full flex flex-col justify-between pt-28 pb-10 px-6"
            >
              <nav className="flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-4xl tracking-tightest uppercase py-4 border-b border-hairline flex items-center justify-between"
                  >
                    {l.label}
                    <ArrowUpRight size={18} />
                  </motion.a>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-[12px] font-mono uppercase tracking-[0.18em]">
                  <button onClick={() => setLocale("ua")} className={locale === "ua" ? "text-bone" : "text-ash-dim"}>UA</button>
                  <span className="text-ash-dim">/</span>
                  <button onClick={() => setLocale("ru")} className={locale === "ru" ? "text-bone" : "text-ash-dim"}>RU</button>
                </div>
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">
                  <TelegramIcon size={16} />
                  {t.nav.telegram}
                  <span className="btn-trailing-icon"><ArrowUpRight size={12} /></span>
                </a>
                <a href="#form" onClick={() => setOpen(false)} className="btn-ghost justify-center">
                  {t.nav.cta}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

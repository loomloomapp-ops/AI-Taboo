"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n/context";
import { TELEGRAM_URL } from "@/lib/i18n/dict";
import { TelegramIcon } from "@/components/ui/ArrowIcon";

export function DesktopFloatingWidget() {
  const { t } = useLocale();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      title={t.floating.desktopTooltip}
      aria-label={t.floating.desktopTooltip}
      className={`hidden lg:flex fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-taboo text-bone items-center justify-center shadow-[0_18px_50px_-10px_rgba(218,47,54,0.55)] transition-all duration-500 hover:scale-110 active:scale-95 ${
        show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-taboo animate-ping opacity-20" aria-hidden />
      <TelegramIcon size={22} />
    </a>
  );
}

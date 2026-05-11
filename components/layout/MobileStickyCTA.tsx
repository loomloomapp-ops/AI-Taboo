"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n/context";
import { TELEGRAM_URL } from "@/lib/i18n/dict";
import { TelegramIcon, InstagramIcon } from "@/components/ui/ArrowIcon";

const INSTAGRAM_URL = "https://www.instagram.com/taboo.agency?igsh=MXFzZzFpamdjaWFvYw==";

export function MobileStickyCTA() {
  const { t } = useLocale();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3 transition-transform duration-500 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="glass rounded-pill p-1.5 flex items-center gap-1.5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]">
        <a href="#form" className="flex-1 btn-primary justify-center !py-3 !px-4 text-sm">
          {t.floating.mobileCta}
        </a>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          className="w-11 h-11 rounded-full bg-bone text-carbon-deep flex items-center justify-center shrink-0 active:scale-95 transition-transform"
        >
          <TelegramIcon size={18} />
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="w-11 h-11 rounded-full bg-carbon-deep text-bone border border-hairline-strong flex items-center justify-center shrink-0 active:scale-95 transition-transform"
        >
          <InstagramIcon size={18} />
        </a>
      </div>
    </div>
  );
}

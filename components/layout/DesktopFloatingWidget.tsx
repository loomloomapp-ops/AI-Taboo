"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";
import { TELEGRAM_URL } from "@/lib/i18n/dict";
import { TelegramIcon, InstagramIcon } from "@/components/ui/ArrowIcon";

const INSTAGRAM_URL = "https://www.instagram.com/taboo.agency?igsh=MXFzZzFpamdjaWFvYw==";

export function DesktopFloatingWidget() {
  const { t } = useLocale();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const actions = [
    {
      href: TELEGRAM_URL,
      label: "Telegram",
      icon: <TelegramIcon size={20} />,
      bg: "bg-taboo text-bone",
    },
    {
      href: INSTAGRAM_URL,
      label: "Instagram",
      icon: <InstagramIcon size={20} />,
      bg: "bg-bone text-carbon-deep",
    },
  ];

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`hidden lg:flex fixed bottom-8 right-8 z-40 flex-col items-end gap-3 transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      }`}
      aria-label={t.floating.desktopTooltip}
    >
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-end gap-3"
          >
            {actions.map((a, i) => (
              <motion.li
                key={a.label}
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.9 }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.06,
                }}
                className="flex items-center gap-3"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone bg-carbon/85 border border-hairline-strong rounded-full px-3 py-1.5 backdrop-blur">
                  {a.label}
                </span>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={a.label}
                  className={`w-12 h-12 rounded-full ${a.bg} flex items-center justify-center shadow-[0_14px_36px_-10px_rgba(0,0,0,0.6)] border border-hairline-strong transition-transform duration-300 hover:scale-110 active:scale-95`}
                >
                  {a.icon}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t.floating.desktopTooltip}
        className="relative w-14 h-14 rounded-full bg-taboo text-bone flex items-center justify-center shadow-[0_18px_50px_-10px_rgba(218,47,54,0.55)] transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-taboo animate-ping opacity-20" aria-hidden />
        )}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          {open ? <CloseGlyph /> : <ChatGlyph />}
        </motion.span>
      </button>
    </div>
  );
}

function ChatGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5H9.4l-3.7 3.2c-.5.43-1.2.07-1.2-.58V5.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

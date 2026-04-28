"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Dict, type Locale } from "./dict";

type Ctx = { locale: Locale; setLocale: (l: Locale) => void; t: Dict };
const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ua");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("taboo_locale") as Locale)) || null;
    if (saved === "ua" || saved === "ru") setLocaleState(saved);
    else if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("ru")) setLocaleState("ru");
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") localStorage.setItem("taboo_locale", l);
    if (typeof document !== "undefined") document.documentElement.lang = l === "ua" ? "uk" : "ru";
  };

  const value = useMemo<Ctx>(() => ({ locale, setLocale, t: dictionaries[locale] }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

"use client";

import { Logo } from "@/components/ui/Logo";
import { useLocale } from "@/lib/i18n/context";
import { TELEGRAM_URL } from "@/lib/i18n/dict";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();
  return (
    <footer className="hairline-top pt-16 pb-10 bg-carbon-deep">
      <div className="container-x">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-center gap-3">
              <Logo variant="mark" />
              <span className="font-display text-lg uppercase tracking-[0.16em] text-bone">
                Taboo<span className="text-taboo">.</span>traffic
              </span>
            </div>
            <p className="mt-5 text-ash text-sm sm:text-base leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash-dim mb-4">
              {t.footer.navTitle}
            </div>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#verticals" className="text-ash hover:text-bone transition-colors">{t.nav.verticals}</a></li>
              <li><a href="#cases" className="text-ash hover:text-bone transition-colors">{t.nav.cases}</a></li>
              <li><a href="#advantages" className="text-ash hover:text-bone transition-colors">{t.nav.advantages}</a></li>
              <li><a href="#reviews" className="text-ash hover:text-bone transition-colors">{t.nav.reviews}</a></li>
              <li><a href="#faq" className="text-ash hover:text-bone transition-colors">{t.nav.faq}</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash-dim mb-4">
              {t.footer.legalTitle}
            </div>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-ash hover:text-bone transition-colors">{t.footer.privacy}</a></li>
              <li><a href="#" className="text-ash hover:text-bone transition-colors">{t.footer.terms}</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash-dim mb-4">
              {t.footer.contactTitle}
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-ash hover:text-bone transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href="mailto:hello@taboo-traffic.agency" className="text-ash hover:text-bone transition-colors">
                  hello@taboo-traffic.agency
                </a>
              </li>
              <li>
                <a href="https://instagram.com/taboo.traffic" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-bone transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 hairline-top flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ash-dim">
          <span>© {year} Taboo Traffic Agency. {t.footer.rights}</span>
          <span>UA / EU · PERFORMANCE · ROMI-FIRST</span>
        </div>
      </div>
    </footer>
  );
}

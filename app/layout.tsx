import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/context";

export const metadata: Metadata = {
  metadataBase: new URL("https://taboo-traffic.agency"),
  title: {
    default: "Taboo Traffic Agency — Performance для складних ніш",
    template: "%s · Taboo Traffic",
  },
  description:
    "Системний performance-маркетинг для adult, dating, nutra, товарки, табачки та інших складних ніш. ROMI-first, команда 5 спеціалістів, 3 резервні кабінети, запуск за 3 дні.",
  keywords: [
    "трафік",
    "performance marketing",
    "agency",
    "adult traffic",
    "nutra",
    "товарка",
    "TikTok Ads",
    "Meta Ads",
    "Google Ads",
    "Taboo Traffic",
  ],
  authors: [{ name: "Taboo Traffic Agency" }],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    alternateLocale: "ru_RU",
    siteName: "Taboo Traffic Agency",
    title: "Taboo Traffic Agency — Performance для складних ніш",
    description:
      "ROMI-first перформанс для adult, dating, nutra, товарки. 47 проєктів, $3.4M освоєного бюджету, 83% retention.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taboo Traffic Agency",
    description: "Performance-маркетинг для складних ніш. ROMI-first.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/logo/taboo-mark-red.png", sizes: "any" },
    ],
    apple: "/logo/taboo-mark-red.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0E0E0D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className="bg-carbon-deep">
      <body className="bg-carbon-deep text-bone antialiased">
        <LocaleProvider>
          <div className="grain" aria-hidden />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Unbounded } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/context";
import { Preloader } from "@/components/layout/Preloader";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

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
    <html lang="uk" className={`bg-carbon-deep ${unbounded.variable}`}>
      <body className="bg-carbon-deep text-bone antialiased">
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
  ttq.load('D80R5HBC77U2TFGF92O0');
  ttq.page();
}(window, document, 'ttq');
          `}
        </Script>
        <LocaleProvider>
          <Preloader />
          <div className="grain" aria-hidden />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}

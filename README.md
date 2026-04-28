# Taboo Traffic Agency — Landing

Performance-маркетингова агенція для складних ніш. Production landing page.

## Stack

- **Next.js 14** (App Router, RSC)
- **TypeScript** strict
- **Tailwind CSS 3.4**
- **Framer Motion**
- **Zod** валідація
- Локальні шрифти **Akony** (display) + **Involve** (body)

## Розробка

```bash
npm install
cp .env.example .env.local
npm run dev
```

Сайт на `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Environment

| Variable | Призначення |
|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | Токен Telegram-бота для надсилання заявок |
| `TELEGRAM_CHAT_ID` | ID чату/каналу команди для отримання заявок |

Без цих змінних форма все одно валідуватиме і повертатиме 200, але заявки логуватимуться у консоль.

## Структура

```
app/                         App Router сторінки + API
  api/lead/route.ts          POST endpoint форми → Telegram
  layout.tsx                 root layout, fonts, locale provider
  page.tsx                   композиція секцій
  globals.css                @font-face, design tokens, base
components/
  layout/                    Header, Footer, Mobile CTA, Floating widget, Exit popup
  hero/                      Hero + dashboard mock
  sections/                  Manifesto, Verticals, Cases, Advantages, Reviews, FAQ, FinalCTA
  form/                      Multi-step lead form
  ui/                        Logo, icons, ScrollReveal
lib/i18n/                    UA / RU словник + provider
public/
  fonts/                     AKONY.woff2, Involve-VF.ttf
  logo/                      PNG лого (mark + wordmark, white + red)
  reviews/                   tg-1.jpeg … tg-8.jpeg
```

## Локалізація

UA / RU перемикач у header. Збереження в `localStorage`. Дефолт визначається з `navigator.language`.

## Deploy

Підключено до Hostinger через GitHub (`loomloomapp-ops/AI-Taboo`). Push у `main` → автоматичний deploy.

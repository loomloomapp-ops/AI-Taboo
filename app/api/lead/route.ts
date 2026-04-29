import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  niche: z.string().min(1).max(100),
  budget: z.string().min(1).max(50),
  telegram: z
    .string()
    .min(2)
    .max(40)
    .regex(/^@[a-zA-Z0-9_]{4,32}$/),
  source: z.string().max(40).optional(),
});

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const pad = (label: string, width = 9) =>
  label.length >= width ? label : label + " ".repeat(width - label.length);

const genId = () => {
  const t = Date.now().toString(36).toUpperCase().slice(-4);
  const r = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 3);
  return `L-${t}${r}`;
};

const formatTime = () => {
  const d = new Date();
  const iso = d.toISOString();
  return `${iso.slice(0, 10)} ${iso.slice(11, 16)} UTC`;
};

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation", details: parsed.error.flatten() }, { status: 422 });
  }

  const { niche, budget, telegram, source } = parsed.data;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const id = genId();
  const time = formatTime();
  const tgHandle = telegram.replace(/^@/, "");
  const tgLink = `https://t.me/${tgHandle}`;
  const ua = req.headers.get("user-agent") || "";
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "—";
  const referer = req.headers.get("referer") || "—";

  const divider = "━━━━━━━━━━━━━━━━━━━━━━━━";

  const message =
    `🟥  <b>TABOO · TRAFFIC</b>  ·  <b>NEW LEAD</b>\n` +
    `<code>${divider}</code>\n` +
    `\n` +
    `▎ <b>${pad("NICHE")}</b><code>${escapeHtml(niche)}</code>\n` +
    `▎ <b>${pad("BUDGET")}</b><code>${escapeHtml(budget)}</code>\n` +
    `▎ <b>${pad("TG")}</b><a href="${tgLink}">${escapeHtml(telegram)}</a>\n` +
    `▎ <b>${pad("SOURCE")}</b><code>${escapeHtml(source || "main-form")}</code>\n` +
    `\n` +
    `<code>${divider}</code>\n` +
    `◇ <b>${pad("ID")}</b><code>${id}</code>\n` +
    `◇ <b>${pad("TIME")}</b><code>${time}</code>\n` +
    `◇ <b>${pad("IP")}</b><code>${escapeHtml(ip)}</code>\n` +
    `\n` +
    `➜  <a href="${tgLink}"><b>Відкрити Telegram</b></a>`;

  if (token && chatId) {
    try {
      const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });
      if (!tg.ok) {
        const errText = await tg.text();
        console.error("[lead] telegram send failed:", tg.status, errText);
        return NextResponse.json({ error: "telegram_failed" }, { status: 502 });
      }
    } catch (e) {
      console.error("[lead] telegram error:", e);
      return NextResponse.json({ error: "telegram_error" }, { status: 502 });
    }
  } else {
    console.log("[lead] (no telegram env)\n" + message);
    console.log("[lead] meta:", { id, time, ua, referer });
  }

  return NextResponse.json({ ok: true, id });
}

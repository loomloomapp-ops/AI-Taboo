import { NextResponse } from "next/server";
import { z } from "zod";

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

  const message =
    `🆕 Taboo Traffic — нова заявка\n\n` +
    `Ніша: ${niche}\n` +
    `Бюджет: ${budget}\n` +
    `Telegram: ${telegram}\n` +
    (source ? `Source: ${source}\n` : "") +
    `Time: ${new Date().toISOString()}`;

  if (token && chatId) {
    try {
      const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
      });
      if (!tg.ok) {
        console.error("[lead] telegram send failed", await tg.text());
      }
    } catch (e) {
      console.error("[lead] telegram error", e);
    }
  } else {
    console.log("[lead] (no telegram env)\n" + message);
  }

  return NextResponse.json({ ok: true });
}

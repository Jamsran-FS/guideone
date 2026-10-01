/**
 * Холбоо барих формын илгээлт.
 * ОДООГООР MOCK — backend бэлэн болмогц доорх TODO хэсгийг солино.
 * Жишээ: fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) })
 */
export type ContactPayload = {
  name: string;
  phone: string;
  interest: string;
  message: string;
  locale: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  // TODO: API / CRM / Telegram bot руу илгээх
  if (process.env.NODE_ENV !== "production") console.info("[contact:mock]", payload);
  await new Promise((r) => setTimeout(r, 700));
  return { ok: true };
}

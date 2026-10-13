"use server";

import { api } from "./api";

/** Холбоо барих формын илгээлт — backend хадгалж, админ "Хүсэлтүүд" хэсэгт харна. */
export type ContactPayload = {
  name: string;
  phone: string;
  interest: string;
  message: string;
  locale: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  try {
    await api("/api/contact", { method: "POST", json: payload });
    return { ok: true };
  } catch (e) {
    console.error("[contact]", e);
    return { ok: false, error: e instanceof Error ? e.message : "failed" };
  }
}

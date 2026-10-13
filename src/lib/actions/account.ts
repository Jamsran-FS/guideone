"use server";

import { revalidatePath } from "next/cache";
import type { Locale } from "@/i18n/config";
import { api } from "../api";
import { getAccessToken } from "../session";

export type FormState = { ok: boolean; at: number } | null;

const field = (d: FormData, name: string) => String(d.get(name) ?? "").trim();

export async function updateProfileAction(lang: Locale, _prev: FormState, formData: FormData): Promise<FormState> {
  try {
    await api("/api/auth/me", {
      method: "PUT",
      token: await getAccessToken(),
      json: {
        full_name: field(formData, "full_name"),
        phone: field(formData, "phone"),
        birth_date: field(formData, "birth_date") || null,
        korean_level: field(formData, "korean_level"),
        parent_name: field(formData, "parent_name"),
        parent_phone: field(formData, "parent_phone"),
      },
    });
  } catch {
    return { ok: false, at: Date.now() };
  }
  revalidatePath(`/${lang}/account`);
  return { ok: true, at: Date.now() };
}

export async function applyAction(lang: Locale, _prev: FormState, formData: FormData): Promise<FormState> {
  const id = (name: string) => (field(formData, name) ? Number(field(formData, name)) : null);
  const program = field(formData, "program");
  try {
    await api("/api/me/applications", {
      method: "POST",
      token: await getAccessToken(),
      json: {
        program,
        course_id: program === "language_course" ? id("course_id") : null,
        partner_id: program === "school_placement" ? id("partner_id") : null,
        message: field(formData, "message"),
      },
    });
  } catch {
    return { ok: false, at: Date.now() };
  }
  revalidatePath(`/${lang}/account`);
  return { ok: true, at: Date.now() };
}

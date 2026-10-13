"use server";

import { redirect } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { site } from "@/data/site";
import { api, ApiError } from "../api";
import { clearSession, getAccessToken, saveSession } from "../session";
import { homePath, refreshSession, type Session } from "../session-cookies";

export type LoginState = { error: "invalid" | "failed" } | { error: "unconfirmed"; email: string } | null;
export type RegisterState = { error: "exists" | "weak" | "failed"; message?: string } | { confirm: true; email: string } | null;
export type ResendResult = "sent" | "rate_limited" | "failed";

/** Зөвхөн сайтын дотоод зам руу буцаана (open redirect-ээс сэргийлнэ) */
const safeNext = (next: string | null) => (next && next.startsWith("/") && !next.startsWith("//") ? next : null);

const homeFor = (session: Session, lang: Locale) => homePath(session.profile?.role ?? "student", lang);

/** Баталгаажуулах и-мэйлийн холбоос дээр дарсны дараа очих хуудас */
const confirmRedirect = (lang: Locale) => `${site.url}/${lang}/login?confirmed=1`;

export async function loginAction(lang: Locale, next: string | null, _prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  let session: Session;
  try {
    session = await api<Session>("/api/auth/login", {
      method: "POST",
      json: { email, password: String(formData.get("password") ?? "") },
    });
  } catch (e) {
    if (e instanceof ApiError && e.code === "email_not_confirmed") return { error: "unconfirmed", email };
    if (e instanceof ApiError && e.status === 400) return { error: "invalid" };
    return { error: "failed" };
  }
  await saveSession(session);
  redirect(safeNext(next) ?? homeFor(session, lang));
}

export async function registerAction(lang: Locale, _prev: RegisterState, formData: FormData): Promise<RegisterState> {
  const email = String(formData.get("email") ?? "");
  let result: { requiresConfirmation: boolean; session: Session | null };
  try {
    result = await api("/api/auth/register", {
      method: "POST",
      json: {
        fullName: String(formData.get("fullName") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        email,
        password: String(formData.get("password") ?? ""),
        redirectTo: confirmRedirect(lang),
      },
    });
  } catch (e) {
    if (e instanceof ApiError && (e.code === "user_already_exists" || e.code === "email_exists")) return { error: "exists" };
    if (e instanceof ApiError && e.code === "weak_password") return { error: "weak" };
    return { error: "failed", message: e instanceof ApiError ? e.message : undefined };
  }
  if (result.requiresConfirmation || !result.session) return { confirm: true, email };
  await saveSession(result.session);
  redirect(`/${lang}/account`);
}

export async function resendConfirmationAction(lang: Locale, email: string): Promise<ResendResult> {
  try {
    await api("/api/auth/resend", { method: "POST", json: { email, redirectTo: confirmRedirect(lang) } });
    return "sent";
  } catch (e) {
    return e instanceof ApiError && e.status === 429 ? "rate_limited" : "failed";
  }
}

/**
 * И-мэйл баталгаажуулсны дараа Supabase хэрэглэгчийг #refresh_token=... -тэй буцаана.
 * Түүгээр шинэ session авч шууд нэвтрүүлнэ. Амжилтгүй бол false — хэрэглэгч гараар нэвтэрнэ.
 */
export async function confirmEmailSessionAction(lang: Locale, refreshToken: string): Promise<false> {
  const session = await refreshSession(refreshToken);
  if (!session) return false;
  await saveSession(session);
  redirect(homeFor(session, lang));
}

export async function logoutAction(lang: Locale) {
  const token = await getAccessToken();
  if (token) await api("/api/auth/logout", { method: "POST", token }).catch(() => undefined);
  await clearSession();
  redirect(`/${lang}`);
}

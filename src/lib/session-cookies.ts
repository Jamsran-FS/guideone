/**
 * Нэвтрэлтийн cookie-нууд. proxy.ts болон server action-ууд хоёулаа ашиглана
 * (энд next/headers импортлохгүй — proxy дотор ажиллах ёстой).
 */
export const API_URL = (process.env.API_URL ?? "http://localhost:5025").replace(/\/$/, "");

/** Supabase access token (1 цаг) — httpOnly */
export const ACCESS_COOKIE = "g1_at";
/** Refresh token — httpOnly, access token дуусахад proxy шинэчилнэ */
export const REFRESH_COOKIE = "g1_rt";
/** Навбарт харуулах нэр, эрх — httpOnly БИШ, нууц мэдээлэлгүй */
export const USER_COOKIE = "g1_user";

export type Role = "sysadmin" | "teacher" | "student";

export const isRole = (v: unknown): v is Role => v === "sysadmin" || v === "teacher" || v === "student";

/** Нэвтэрсний дараах нүүр: sysadmin → /admin, багш → /teacher, суралцагч → /[lang]/account */
export const homePath = (role: Role, lang: string) =>
  role === "sysadmin" ? "/admin" : role === "teacher" ? "/teacher" : `/${lang}/account`;

export type Profile = {
  id: string;
  role: Role;
  email: string | null;
  full_name: string;
  phone: string;
  birth_date: string | null;
  parent_name: string;
  parent_phone: string;
  korean_level: string;
  created_at: string;
};

export type Session = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  profile: Profile | null;
};

export type SessionUser = { name: string; role: Role };

type CookieOptions = { httpOnly: boolean; secure: boolean; sameSite: "lax"; path: string; maxAge: number };

const MONTH = 60 * 60 * 24 * 30;

export function sessionCookies(session: Session): { name: string; value: string; options: CookieOptions }[] {
  const base = { secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/" };
  const user: SessionUser = { name: session.profile?.full_name ?? "", role: session.profile?.role ?? "student" };
  return [
    // Дуусахаас 1 минутын өмнө cookie устана → дараагийн хүсэлтэд proxy refresh хийнэ
    { name: ACCESS_COOKIE, value: session.accessToken, options: { ...base, httpOnly: true, maxAge: Math.max(60, session.expiresIn - 60) } },
    { name: REFRESH_COOKIE, value: session.refreshToken, options: { ...base, httpOnly: true, maxAge: MONTH } },
    { name: USER_COOKIE, value: JSON.stringify(user), options: { ...base, httpOnly: false, maxAge: MONTH } },
  ];
}

export const SESSION_COOKIE_NAMES = [ACCESS_COOKIE, REFRESH_COOKIE, USER_COOKIE];

export async function refreshSession(refreshToken: string): Promise<Session | null> {
  try {
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });
    return res.ok ? ((await res.json()) as Session) : null;
  } catch {
    return null;
  }
}

/** Навбар (client) — USER_COOKIE-г уншина */
export function parseSessionUser(raw: string | undefined): SessionUser | null {
  if (!raw) return null;
  try {
    const user = JSON.parse(raw) as SessionUser;
    return isRole(user.role) ? user : null;
  } catch {
    return null;
  }
}

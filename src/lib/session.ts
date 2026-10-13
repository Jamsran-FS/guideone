import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { api } from "./api";
import { ACCESS_COOKIE, SESSION_COOKIE_NAMES, sessionCookies, type Profile, type Session } from "./session-cookies";

/** Server action дотроос дуудна (cookie зөвхөн server action / route handler-т бичигдэнэ) */
export async function saveSession(session: Session) {
  const store = await cookies();
  for (const c of sessionCookies(session)) store.set(c.name, c.value, c.options);
}

export async function clearSession() {
  const store = await cookies();
  for (const name of SESSION_COOKIE_NAMES) store.delete(name);
}

export async function getAccessToken() {
  return (await cookies()).get(ACCESS_COOKIE)?.value ?? null;
}

/** Нэвтэрсэн хэрэглэгчийн profile — нэвтрээгүй эсвэл token хүчингүй бол null */
export const getCurrentUser = cache(async (): Promise<Profile | null> => {
  const token = await getAccessToken();
  if (!token) return null;
  try {
    return await api<Profile>("/api/auth/me", { token });
  } catch {
    return null;
  }
});

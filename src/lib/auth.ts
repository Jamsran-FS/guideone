/**
 * Нэвтрэх — ОДООГООР MOCK. Backend (NextAuth, өөрийн API г.м.) бэлэн болмогц энд холбоно.
 * Одоогоор үргэлж "not_ready" буцаана — хэнийг ч нэвтрүүлэхгүй.
 */
export type LoginPayload = { identifier: string; password: string };
export type LoginResult = { ok: true } | { ok: false; error: "not_ready" | "invalid" };

export async function login(payload: LoginPayload): Promise<LoginResult> {
  void payload; // TODO: fetch("/api/auth/login", { method: "POST", body: JSON.stringify(payload) })
  await new Promise((r) => setTimeout(r, 600));
  return { ok: false, error: "not_ready" };
}

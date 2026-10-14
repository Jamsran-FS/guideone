"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { api, ApiError } from "@/lib/api";
import { CONTENT_TAG } from "@/lib/content";
import type { ResourceKey, Row } from "@/lib/admin-resources";
import { getAccessToken } from "@/lib/session";
import type { Role } from "@/lib/session-cookies";

/**
 * Админ самбарын үйлдлүүд. Эрхийг backend (Admin policy) болон Supabase RLS шалгана —
 * админ биш хэрэглэгч дуудвал 401/403 буцна.
 */
export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

async function run<T>(fn: (token: string | null) => Promise<T>): Promise<ActionResult<T>> {
  try {
    return { ok: true, data: await fn(await getAccessToken()) };
  } catch (e) {
    if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
      return { ok: false, error: "Эрх хүрэлцэхгүй байна. Дахин нэвтэрнэ үү." };
    }
    return { ok: false, error: e instanceof Error ? e.message : "Алдаа гарлаа." };
  }
}

/** Сайтын контент өөрчлөгдсөн — дараагийн хүсэлт шинэ өгөгдөл авна */
function contentChanged() {
  revalidateTag(CONTENT_TAG, { expire: 0 });
}

export async function saveSection(key: string, value: unknown) {
  const result = await run((token) => api(`/api/admin/sections/${encodeURIComponent(key)}`, { method: "PUT", token, json: { value } }));
  if (result.ok) {
    contentChanged();
    revalidatePath("/admin/content");
  }
  return result;
}

export async function saveRow(resource: ResourceKey, id: number | null, row: Row) {
  const result = await run((token) =>
    id === null
      ? api<Row>(`/api/admin/content/${resource}`, { method: "POST", token, json: row })
      : api<Row>(`/api/admin/content/${resource}/${id}`, { method: "PUT", token, json: row }),
  );
  if (result.ok) {
    contentChanged();
    revalidatePath(`/admin/${resource}`);
  }
  return result;
}

export async function deleteRow(resource: ResourceKey, id: number) {
  const result = await run((token) => api(`/api/admin/content/${resource}/${id}`, { method: "DELETE", token }));
  if (result.ok) {
    contentChanged();
    revalidatePath(`/admin/${resource}`);
  }
  return result;
}

export async function uploadImage(formData: FormData) {
  return run((token) => api<{ url: string }>("/api/admin/uploads", { method: "POST", token, form: formData }));
}

export type StatusPatch = { status?: string; admin_note?: string };

export async function updateContactRequest(id: number, patch: StatusPatch) {
  const result = await run((token) => api(`/api/admin/contact-requests/${id}`, { method: "PATCH", token, json: patch }));
  if (result.ok) revalidatePath("/admin", "layout");
  return result;
}

export async function deleteContactRequest(id: number) {
  const result = await run((token) => api(`/api/admin/contact-requests/${id}`, { method: "DELETE", token }));
  if (result.ok) revalidatePath("/admin", "layout");
  return result;
}

export async function updateApplication(id: number, patch: StatusPatch) {
  const result = await run((token) => api(`/api/admin/applications/${id}`, { method: "PATCH", token, json: patch }));
  if (result.ok) revalidatePath("/admin", "layout");
  return result;
}

export async function setUserRole(id: string, role: Role) {
  const result = await run((token) => api(`/api/admin/users/${id}`, { method: "PATCH", token, json: { role } }));
  if (result.ok) revalidatePath("/admin/users");
  return result;
}

/* ── Анги, элсэлт, төлбөр ─────────────────────────────────────── */

export type GroupInput = {
  name: string;
  description: string;
  teacher_id: string | null;
  course_id: number | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
};

export async function saveGroup(id: number | null, group: GroupInput) {
  const result = await run((token) =>
    id === null
      ? api<{ id: number }>("/api/admin/groups", { method: "POST", token, json: group })
      : api<{ id: number }>(`/api/admin/groups/${id}`, { method: "PUT", token, json: group }),
  );
  if (result.ok) revalidatePath("/admin/groups", "layout");
  return result;
}

export async function deleteGroup(id: number) {
  const result = await run((token) => api(`/api/admin/groups/${id}`, { method: "DELETE", token }));
  if (result.ok) revalidatePath("/admin/groups", "layout");
  return result;
}

export async function enrollStudent(groupId: number, studentId: string) {
  const result = await run((token) =>
    api("/api/admin/enrollments", { method: "POST", token, json: { group_id: groupId, student_id: studentId } }),
  );
  if (result.ok) revalidatePath("/admin", "layout");
  return result;
}

export type EnrollmentPatch = {
  status?: string;
  payment_status?: string;
  amount_due?: number;
  amount_paid?: number;
  note?: string;
};

export async function updateEnrollment(id: number, patch: EnrollmentPatch) {
  const result = await run((token) => api(`/api/admin/enrollments/${id}`, { method: "PATCH", token, json: patch }));
  if (result.ok) revalidatePath("/admin", "layout");
  return result;
}

export async function removeEnrollment(id: number) {
  const result = await run((token) => api(`/api/admin/enrollments/${id}`, { method: "DELETE", token }));
  if (result.ok) revalidatePath("/admin", "layout");
  return result;
}

/* ── Хэрэглэгч үүсгэх, засах ──────────────────────────────────── */

export type NewUserInput = { email: string; password: string; fullName: string; phone: string; role: Role; avatarUrl: string | null };

export async function createUser(input: NewUserInput) {
  const result = await run((token) =>
    api<{ profile: { id: string }; requiresConfirmation: boolean }>("/api/admin/users", { method: "POST", token, json: input }),
  );
  if (result.ok) revalidatePath("/admin", "layout");
  return result;
}

export type UserPatch = {
  full_name: string;
  phone: string;
  birth_date: string | null;
  korean_level: string;
  parent_name: string;
  parent_phone: string;
  avatar_url: string | null;
  role?: Role;
};

export async function updateUser(id: string, patch: UserPatch) {
  const result = await run((token) => api(`/api/admin/users/${id}`, { method: "PATCH", token, json: patch }));
  if (result.ok) revalidatePath("/admin", "layout");
  return result;
}

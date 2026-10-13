"use server";

import { revalidatePath } from "next/cache";
import { api, ApiError } from "@/lib/api";
import { getAccessToken } from "@/lib/session";

/** Багшийн үйлдлүүд. Эрхийг backend (Teacher policy) болон Supabase RLS (teaches_group) шалгана. */
export type TeacherResult = { ok: true } | { ok: false; error: string };

async function run(groupId: number, fn: (token: string | null) => Promise<unknown>): Promise<TeacherResult> {
  try {
    await fn(await getAccessToken());
  } catch (e) {
    if (e instanceof ApiError && (e.status === 401 || e.status === 403)) return { ok: false, error: "Эрх хүрэлцэхгүй байна. Дахин нэвтэрнэ үү." };
    return { ok: false, error: e instanceof Error ? e.message : "Алдаа гарлаа." };
  }
  revalidatePath(`/teacher/groups/${groupId}`);
  return { ok: true };
}

/** formData: title, description, kind, linkUrl, file (заавал биш) */
export async function addMaterial(groupId: number, formData: FormData) {
  const file = formData.get("file");
  if (file instanceof File && file.size === 0) formData.delete("file");
  if (!String(formData.get("linkUrl") ?? "").trim()) formData.delete("linkUrl");
  return run(groupId, (token) => api(`/api/teacher/groups/${groupId}/materials`, { method: "POST", token, form: formData }));
}

export async function deleteMaterial(groupId: number, id: number) {
  return run(groupId, (token) => api(`/api/teacher/materials/${id}`, { method: "DELETE", token }));
}

export async function announce(groupId: number, title: string, body: string) {
  return run(groupId, (token) => api(`/api/teacher/groups/${groupId}/announcements`, { method: "POST", token, json: { title, body } }));
}

export async function deleteAnnouncement(groupId: number, id: number) {
  return run(groupId, (token) => api(`/api/teacher/announcements/${id}`, { method: "DELETE", token }));
}

export type ExamInput = { title: string; description: string; exam_date: string | null; max_score: number };

export async function createExam(groupId: number, exam: ExamInput) {
  return run(groupId, (token) => api(`/api/teacher/groups/${groupId}/exams`, { method: "POST", token, json: exam }));
}

export async function deleteExam(groupId: number, id: number) {
  return run(groupId, (token) => api(`/api/teacher/exams/${id}`, { method: "DELETE", token }));
}

export type ScoreInput = { studentId: string; score: number | null; comment: string };

export async function saveScores(groupId: number, examId: number, scores: ScoreInput[]) {
  return run(groupId, (token) => api(`/api/teacher/exams/${examId}/results`, { method: "PUT", token, json: scores }));
}

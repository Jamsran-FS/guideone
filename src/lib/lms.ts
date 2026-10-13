import type { Localized } from "@/i18n/config";

/** Сургалтын системийн (анги, элсэлт, материал, шалгалт) backend-ээс ирэх мөрүүд */

export type EnrollmentStatus = "active" | "completed" | "dropped";
export type PaymentStatus = "unpaid" | "partial" | "paid";
export type MaterialKind = "handbook" | "lecture" | "seminar" | "other";

export type PersonBrief = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  parent_name?: string;
  parent_phone?: string;
  korean_level?: string;
};

export type Group = {
  id: number;
  name: string;
  description: string;
  teacher_id: string | null;
  course_id: number | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  teacher?: { id: string; full_name: string; email: string | null } | null;
  course?: { id: number; name: Localized } | null;
};

export type Enrollment = {
  id: number;
  group_id: number;
  student_id: string;
  status: EnrollmentStatus;
  payment_status: PaymentStatus;
  amount_due: number;
  amount_paid: number;
  note: string;
  student: PersonBrief | null;
};

export type Material = {
  id: number;
  group_id: number;
  kind: MaterialKind;
  title: string;
  description: string;
  file_name: string | null;
  file_url?: string;
  link_url: string | null;
  created_at: string;
  group?: { name: string } | null;
};

export type Announcement = {
  id: number;
  group_id: number;
  title: string;
  body: string;
  created_at: string;
  group?: { name: string } | null;
};

export type ExamResult = { student_id?: string; score: number | null; comment: string };

export type Exam = {
  id: number;
  group_id: number;
  title: string;
  description: string;
  exam_date: string | null;
  max_score: number;
  exam_results: ExamResult[];
  group?: { name: string } | null;
};

/** PostgREST-ийн `enrollments(count)` → [{ count: n }] */
export const countOf = (v: { count: number }[] | undefined) => v?.[0]?.count ?? 0;

/* ── Админ/багшийн самбарын (монгол) шошго ── */

export const enrollmentStatusLabel: Record<EnrollmentStatus, string> = {
  active: "Суралцаж байна",
  completed: "Төгссөн",
  dropped: "Гарсан",
};

export const paymentStatusLabel: Record<PaymentStatus, string> = {
  unpaid: "Төлөөгүй",
  partial: "Хэсэгчлэн төлсөн",
  paid: "Төлсөн",
};

export const materialKindLabel: Record<MaterialKind, string> = {
  handbook: "Гарын авлага",
  lecture: "Лекц",
  seminar: "Семинар",
  other: "Бусад",
};

export const formatMoney = (n: number) => `${new Intl.NumberFormat("mn").format(n)}₮`;

"use client";

import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { enrollStudent, removeEnrollment, updateEnrollment } from "@/app/admin/actions";
import { enrollmentStatusLabel, paymentStatusLabel, type Enrollment, type EnrollmentStatus, type PaymentStatus } from "@/lib/lms";
import { btn, Empty, input, Panel } from "./ui";

type Candidate = { id: string; name: string; email: string | null };

/** Ангийн суралцагчид: төлөв, төлбөр засах, суралцагч нэмэх/хасах */
export function EnrollmentTable({ groupId, enrollments, candidates }: { groupId: number; enrollments: Enrollment[]; candidates: Candidate[] }) {
  return (
    <div className="space-y-4">
      <AddStudent groupId={groupId} candidates={candidates} />
      {enrollments.length === 0 ? (
        <Empty>Энэ ангид суралцагч элсээгүй байна.</Empty>
      ) : (
        <Panel className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="border-b border-border bg-background/70 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Суралцагч</th>
                <th className="px-4 py-3 font-semibold">Төлөв</th>
                <th className="px-4 py-3 font-semibold">Төлбөр</th>
                <th className="px-4 py-3 font-semibold">Төлөх / Төлсөн (₮)</th>
                <th className="px-4 py-3 font-semibold">Тэмдэглэл</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {enrollments.map((e) => (
                <EnrollmentRow key={e.id} enrollment={e} />
              ))}
            </tbody>
          </table>
        </Panel>
      )}
    </div>
  );
}

function EnrollmentRow({ enrollment: e }: { enrollment: Enrollment }) {
  const [value, setValue] = useState({
    status: e.status,
    payment_status: e.payment_status,
    amount_due: e.amount_due,
    amount_paid: e.amount_paid,
    note: e.note,
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const dirty =
    value.status !== e.status ||
    value.payment_status !== e.payment_status ||
    value.amount_due !== e.amount_due ||
    value.amount_paid !== e.amount_paid ||
    value.note !== e.note;

  const run = (fn: () => Promise<{ ok: boolean; error?: string }>) =>
    startTransition(async () => {
      setError(null);
      const result = await fn();
      if (!result.ok) setError(result.error ?? "Алдаа гарлаа.");
    });

  return (
    <tr className="align-top">
      <td className="px-4 py-3">
        <p className="font-semibold text-foreground">{e.student?.full_name || e.student?.email || "—"}</p>
        <p className="text-xs text-muted">{e.student?.phone}</p>
        {e.student?.parent_phone && <p className="text-xs text-muted">Эцэг эх: {e.student.parent_phone}</p>}
      </td>
      <td className="px-4 py-3">
        <select value={value.status} onChange={(ev) => setValue((v) => ({ ...v, status: ev.target.value as EnrollmentStatus }))} className={`${input} w-auto`}>
          {Object.entries(enrollmentStatusLabel).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-3">
        <select
          value={value.payment_status}
          onChange={(ev) => setValue((v) => ({ ...v, payment_status: ev.target.value as PaymentStatus }))}
          className={`${input} w-auto`}
        >
          {Object.entries(paymentStatusLabel).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-1.5">
          <input type="number" min={0} step={1000} value={value.amount_due} onChange={(ev) => setValue((v) => ({ ...v, amount_due: ev.target.valueAsNumber || 0 }))} className={`${input} w-28`} aria-label="Төлөх дүн" />
          <input type="number" min={0} step={1000} value={value.amount_paid} onChange={(ev) => setValue((v) => ({ ...v, amount_paid: ev.target.valueAsNumber || 0 }))} className={`${input} w-28`} aria-label="Төлсөн дүн" />
        </div>
      </td>
      <td className="px-4 py-3">
        <input value={value.note} onChange={(ev) => setValue((v) => ({ ...v, note: ev.target.value }))} className={input} aria-label="Тэмдэглэл" />
        {error && <p className="mt-1 text-xs text-signal">{error}</p>}
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-1.5">
          <button type="button" disabled={!dirty || pending} onClick={() => run(() => updateEnrollment(e.id, value))} className={btn.small} aria-label="Хадгалах">
            {pending ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : <Save className="size-3.5" aria-hidden />}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => confirm("Суралцагчийг ангиас хасах уу? Түүний энэ ангийн дүн хадгалагдсаар үлдэнэ.") && run(() => removeEnrollment(e.id))}
            className={btn.small}
            aria-label="Ангиас хасах"
          >
            <Trash2 className="size-3.5" aria-hidden />
          </button>
        </div>
      </td>
    </tr>
  );
}

function AddStudent({ groupId, candidates }: { groupId: number; candidates: Candidate[] }) {
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select value={studentId} onChange={(e) => setStudentId(e.target.value)} className={`${input} w-auto min-w-64`} aria-label="Суралцагч сонгох">
        <option value="">— Суралцагч сонгох —</option>
        {candidates.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
            {c.email ? ` (${c.email})` : ""}
          </option>
        ))}
      </select>
      <button
        type="button"
        disabled={!studentId || pending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const result = await enrollStudent(groupId, studentId);
            if (result.ok) setStudentId("");
            else setError(result.error);
          })
        }
        className={btn.secondary}
      >
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Plus className="size-4" aria-hidden />}
        Ангид элсүүлэх
      </button>
      {error && <p className="text-xs text-signal">{error}</p>}
    </div>
  );
}

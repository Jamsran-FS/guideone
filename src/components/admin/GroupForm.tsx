"use client";

import { CheckCircle2, Loader2, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteGroup, saveGroup, type GroupInput } from "@/app/admin/actions";
import type { Group } from "@/lib/lms";
import { btn, input, label, Panel } from "./ui";

type Option = { id: string | number; name: string };

export default function GroupForm({ group, teachers, courses }: { group: Group | null; teachers: Option[]; courses: Option[] }) {
  const router = useRouter();
  const [value, setValue] = useState<GroupInput>({
    name: group?.name ?? "",
    description: group?.description ?? "",
    teacher_id: group?.teacher_id ?? null,
    course_id: group?.course_id ?? null,
    start_date: group?.start_date ?? null,
    end_date: group?.end_date ?? null,
    is_active: group?.is_active ?? true,
  });
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const set = <K extends keyof GroupInput>(key: K, v: GroupInput[K]) => setValue((g) => ({ ...g, [key]: v }));

  function save() {
    setMessage(null);
    startTransition(async () => {
      const result = await saveGroup(group?.id ?? null, value);
      if (!result.ok) return setMessage({ ok: false, text: result.error });
      setMessage({ ok: true, text: "Хадгалагдлаа." });
      if (!group) router.replace(`/admin/groups/${result.data.id}`);
    });
  }

  function remove() {
    if (!group || !confirm("Энэ ангийг устгах уу? Ангийн материал, зар, шалгалт, дүн бүгд устна.")) return;
    startTransition(async () => {
      const result = await deleteGroup(group.id);
      if (!result.ok) return setMessage({ ok: false, text: result.error });
      router.push("/admin/groups");
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <Panel className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
        <label className={`${label} sm:col-span-2`}>
          Ангийн нэр
          <input required maxLength={120} value={value.name} onChange={(e) => set("name", e.target.value)} placeholder="Жишээ нь: TOPIK II — 2026 намар" className={`${input} mt-1.5`} />
        </label>
        <label className={label}>
          Багш
          <select value={value.teacher_id ?? ""} onChange={(e) => set("teacher_id", e.target.value || null)} className={`${input} mt-1.5`}>
            <option value="">— Сонгоогүй —</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          {teachers.length === 0 && <span className="mt-1 block text-xs font-normal text-muted">Багш алга. &quot;Хэрэглэгч, эрх&quot; хэсгээс багш эрх өгнө үү.</span>}
        </label>
        <label className={label}>
          Сургалт
          <select value={value.course_id ?? ""} onChange={(e) => set("course_id", e.target.value ? Number(e.target.value) : null)} className={`${input} mt-1.5`}>
            <option value="">— Сонгоогүй —</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Эхлэх огноо
          <input type="date" value={value.start_date ?? ""} onChange={(e) => set("start_date", e.target.value || null)} className={`${input} mt-1.5`} />
        </label>
        <label className={label}>
          Дуусах огноо
          <input type="date" value={value.end_date ?? ""} onChange={(e) => set("end_date", e.target.value || null)} className={`${input} mt-1.5`} />
        </label>
        <label className={`${label} sm:col-span-2`}>
          Тайлбар
          <textarea rows={3} value={value.description} onChange={(e) => set("description", e.target.value)} className={`${input} mt-1.5 resize-y`} />
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={value.is_active} onChange={(e) => set("is_active", e.target.checked)} className="size-4 accent-[var(--accent)]" />
          Идэвхтэй анги
        </label>
      </Panel>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className={btn.primary}>
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Save className="size-4" aria-hidden />}
          Хадгалах
        </button>
        {group && (
          <button type="button" onClick={remove} disabled={pending} className={btn.danger}>
            <Trash2 className="size-4" aria-hidden /> Устгах
          </button>
        )}
        {message && (
          <p role="status" className={`flex items-center gap-1.5 text-sm ${message.ok ? "text-accent" : "text-signal"}`}>
            {message.ok && <CheckCircle2 className="size-4" aria-hidden />}
            {message.text}
          </p>
        )}
      </div>
    </form>
  );
}

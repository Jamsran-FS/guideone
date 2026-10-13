"use client";

import { CheckCircle2, Loader2, Megaphone, Plus, Save, Trash2, Upload } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import {
  addMaterial,
  announce,
  createExam,
  deleteAnnouncement,
  deleteExam,
  deleteMaterial,
  saveScores,
  type TeacherResult,
} from "@/app/teacher/actions";
import { materialKindLabel, type ExamResult } from "@/lib/lms";
import { btn, input, label } from "../admin/ui";

/** Үйлдлийн төлөв + мессеж */
function useAction() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const run = (fn: () => Promise<TeacherResult>, success: string, onOk?: () => void) =>
    startTransition(async () => {
      setMessage(null);
      const result = await fn();
      setMessage(result.ok ? { ok: true, text: success } : { ok: false, text: result.error });
      if (result.ok) onOk?.();
    });
  return { pending, message, run };
}

function Status({ message }: { message: { ok: boolean; text: string } | null }) {
  if (!message) return null;
  return (
    <p role="status" className={`flex items-center gap-1.5 text-sm ${message.ok ? "text-accent" : "text-signal"}`}>
      {message.ok && <CheckCircle2 className="size-4" aria-hidden />}
      {message.text}
    </p>
  );
}

export function MaterialForm({ groupId }: { groupId: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending, message, run } = useAction();

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        run(() => addMaterial(groupId, data), "Материал нэмэгдлээ.", () => formRef.current?.reset());
      }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-foreground">Материал нэмэх</h3>
      <label className={label}>
        Төрөл
        <select name="kind" defaultValue="lecture" className={`${input} mt-1.5`}>
          {Object.entries(materialKindLabel).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </select>
      </label>
      <label className={label}>
        Гарчиг
        <input name="title" required maxLength={200} placeholder="Жишээ нь: 3-р лекц — Хүндэтгэлийн хэлбэр" className={`${input} mt-1.5`} />
      </label>
      <label className={label}>
        Тайлбар
        <textarea name="description" rows={2} maxLength={4000} className={`${input} mt-1.5 resize-y`} />
      </label>
      <label className={label}>
        Файл
        <input
          name="file"
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.webp,.mp3,.m4a,.zip"
          className="mt-1.5 block w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary"
        />
        <span className="mt-1 block text-xs font-normal text-muted">PDF, Word, PowerPoint, Excel, зураг, аудио · 20MB хүртэл</span>
      </label>
      <label className={label}>
        Эсвэл холбоос
        <input name="linkUrl" type="url" placeholder="https://youtube.com/…" className={`${input} mt-1.5`} />
      </label>
      <button type="submit" disabled={pending} className={btn.primary}>
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Upload className="size-4" aria-hidden />}
        Нэмэх
      </button>
      <Status message={message} />
    </form>
  );
}

export function AnnouncementForm({ groupId }: { groupId: number }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { pending, message, run } = useAction();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        run(() => announce(groupId, title.trim(), body.trim()), "Зар илгээгдлээ. Суралцагчид бүртгэл дээрээ харна.", () => {
          setTitle("");
          setBody("");
        });
      }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-foreground">Ангидаа зар илгээх</h3>
      <label className={label}>
        Гарчиг
        <input required maxLength={200} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Жишээ нь: Баасан гарагийн хичээл хойшилно" className={`${input} mt-1.5`} />
      </label>
      <label className={label}>
        Агуулга
        <textarea rows={4} maxLength={8000} value={body} onChange={(e) => setBody(e.target.value)} className={`${input} mt-1.5 resize-y`} />
      </label>
      <button type="submit" disabled={pending} className={btn.primary}>
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Megaphone className="size-4" aria-hidden />}
        Илгээх
      </button>
      <Status message={message} />
    </form>
  );
}

export function ExamForm({ groupId }: { groupId: number }) {
  const blank = { title: "", description: "", exam_date: "", max_score: 100 };
  const [value, setValue] = useState(blank);
  const { pending, message, run } = useAction();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        run(
          () => createExam(groupId, { ...value, title: value.title.trim(), exam_date: value.exam_date || null }),
          "Шалгалт үүслээ. Доор дүнг оруулна уу.",
          () => setValue(blank),
        );
      }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-foreground">Шалгалт үүсгэх</h3>
      <label className={label}>
        Нэр
        <input required maxLength={200} value={value.title} onChange={(e) => setValue({ ...value, title: e.target.value })} placeholder="Жишээ нь: Дунд шатны шалгалт" className={`${input} mt-1.5`} />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className={label}>
          Огноо
          <input type="date" value={value.exam_date} onChange={(e) => setValue({ ...value, exam_date: e.target.value })} className={`${input} mt-1.5`} />
        </label>
        <label className={label}>
          Дээд оноо
          <input type="number" required min={1} max={9999} value={value.max_score} onChange={(e) => setValue({ ...value, max_score: e.target.valueAsNumber || 0 })} className={`${input} mt-1.5`} />
        </label>
      </div>
      <label className={label}>
        Тайлбар (сэдэв, бэлтгэх зүйлс)
        <textarea rows={3} value={value.description} onChange={(e) => setValue({ ...value, description: e.target.value })} className={`${input} mt-1.5 resize-y`} />
      </label>
      <button type="submit" disabled={pending} className={btn.primary}>
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Plus className="size-4" aria-hidden />}
        Үүсгэх
      </button>
      <Status message={message} />
    </form>
  );
}

/** Шалгалтын дүн шивэх хүснэгт — нэг товчоор бүгдийг хадгална */
export function ScoreSheet({
  groupId,
  examId,
  maxScore,
  students,
  results,
}: {
  groupId: number;
  examId: number;
  maxScore: number;
  students: { id: string; name: string }[];
  results: ExamResult[];
}) {
  const initial = Object.fromEntries(
    students.map((s) => {
      const r = results.find((x) => x.student_id === s.id);
      return [s.id, { score: r?.score?.toString() ?? "", comment: r?.comment ?? "" }];
    }),
  );
  const [rows, setRows] = useState(initial);
  const { pending, message, run } = useAction();

  if (students.length === 0) return <p className="mt-4 text-sm text-muted">Идэвхтэй суралцагч алга.</p>;

  const invalid = Object.values(rows).some((r) => r.score !== "" && (Number(r.score) < 0 || Number(r.score) > maxScore));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        run(
          () =>
            saveScores(
              groupId,
              examId,
              students.map((s) => ({
                studentId: s.id,
                score: rows[s.id].score === "" ? null : Number(rows[s.id].score),
                comment: rows[s.id].comment,
              })),
            ),
          "Дүн хадгалагдлаа.",
        );
      }}
      className="mt-4"
    >
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-background text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-3 py-2 font-semibold">Суралцагч</th>
              <th className="w-32 px-3 py-2 font-semibold">Оноо / {maxScore}</th>
              <th className="px-3 py-2 font-semibold">Тайлбар</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map((s) => (
              <tr key={s.id}>
                <td className="px-3 py-2 font-medium text-foreground">{s.name}</td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    min={0}
                    max={maxScore}
                    step="0.5"
                    value={rows[s.id].score}
                    onChange={(e) => setRows({ ...rows, [s.id]: { ...rows[s.id], score: e.target.value } })}
                    className={input}
                    aria-label={`${s.name} — оноо`}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={rows[s.id].comment}
                    maxLength={1000}
                    onChange={(e) => setRows({ ...rows, [s.id]: { ...rows[s.id], comment: e.target.value } })}
                    className={input}
                    aria-label={`${s.name} — тайлбар`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending || invalid} className={btn.primary}>
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Save className="size-4" aria-hidden />}
          Дүн хадгалах
        </button>
        {invalid && <p className="text-sm text-signal">Оноо 0–{maxScore} хооронд байна.</p>}
        <Status message={message} />
      </div>
    </form>
  );
}

const deleters = { material: deleteMaterial, announcement: deleteAnnouncement, exam: deleteExam };
const deleteConfirm = {
  material: "Энэ материалыг устгах уу? Файл нь мөн устна.",
  announcement: "Энэ зарыг устгах уу?",
  exam: "Энэ шалгалтыг устгах уу? Бүх суралцагчийн дүн устна.",
};

export function DeleteButton({ kind, groupId, id }: { kind: keyof typeof deleters; groupId: number; id: number }) {
  const { pending, message, run } = useAction();
  return (
    <div className="shrink-0 text-right">
      <button
        type="button"
        disabled={pending}
        onClick={() => confirm(deleteConfirm[kind]) && run(() => deleters[kind](groupId, id), "Устгагдлаа.")}
        className={btn.small}
        aria-label="Устгах"
      >
        {pending ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : <Trash2 className="size-3.5" aria-hidden />}
      </button>
      {message && !message.ok && <p className="mt-1 max-w-40 text-xs text-signal">{message.text}</p>}
    </div>
  );
}

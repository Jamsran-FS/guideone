"use client";

import { ArrowDown, ArrowUp, ImageUp, Loader2, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { locales, type Localized } from "@/i18n/config";
import { degreeLabels, educationStatusLabels, type Degree, type Education, type EducationStatus } from "@/data/teachers";
import { uploadImage } from "@/app/admin/actions";
import Icon, { iconNames } from "../ui/Icon";
import { Avatar, btn, input } from "./ui";

const langLabel: Record<string, string> = { mn: "MN", en: "EN", ko: "KO" };
const blank = (): Localized => ({ mn: "", en: "", ko: "" });
/** Талбарын зүүн талд харагдах хэлний шошго (MN / EN / KO) */
const langTag = "pointer-events-none absolute left-3 text-[10px] font-bold leading-none tracking-wider text-muted/70";

/** Нэг утгыг 3 хэлээр: MN / EN / KO */
export function LocalizedInput({
  value,
  onChange,
  multiline = false,
}: {
  value: Localized | null | undefined;
  onChange: (v: Localized) => void;
  multiline?: boolean;
}) {
  const v = value ?? blank();
  return (
    <div className="grid gap-2 md:grid-cols-3">
      {locales.map((lang) => (
        <div key={lang} className="relative">
          <span className={`${langTag} ${multiline ? "top-[13px]" : "inset-y-0 flex items-center"}`}>{langLabel[lang]}</span>
          {multiline ? (
            <textarea
              lang={lang}
              rows={4}
              value={v[lang] ?? ""}
              onChange={(e) => onChange({ ...v, [lang]: e.target.value })}
              className={`${input} resize-y pl-11`}
            />
          ) : (
            <input lang={lang} value={v[lang] ?? ""} onChange={(e) => onChange({ ...v, [lang]: e.target.value })} className={`${input} pl-11`} />
          )}
        </div>
      ))}
    </div>
  );
}

/** Хэл бүрээр жагсаалт — мөр бүрд нэг зүйл */
export function LocalizedListInput({ value, onChange }: { value: Localized<string[]>; onChange: (v: Localized<string[]>) => void }) {
  return (
    <div className="grid gap-2 md:grid-cols-3">
      {locales.map((lang) => (
        <div key={lang} className="relative">
          <span className={`${langTag} top-[13px]`}>{langLabel[lang]}</span>
          <textarea
            lang={lang}
            rows={6}
            value={(value?.[lang] ?? []).join("\n")}
            onChange={(e) => onChange({ ...value, [lang]: e.target.value.split("\n") })}
            className={`${input} resize-y pl-11`}
          />
        </div>
      ))}
    </div>
  );
}

type Detail = { label: Localized; value: Localized | null };

/** Үйлчилгээний "нэр — утга" хүснэгт */
export function DetailsInput({
  value,
  onChange,
  columns = ["Нэр", "Утга (хоосон бол \"Удахгүй шинэчлэгдэнэ\")"],
}: {
  value: Detail[];
  onChange: (v: Detail[]) => void;
  columns?: [string, string];
}) {
  const set = (i: number, patch: Partial<Detail>) => onChange(value.map((d, j) => (j === i ? { ...d, ...patch } : d)));
  return (
    <div className="space-y-3">
      {value.map((d, i) => (
        <div key={i} className="rounded-md border border-border bg-background p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">#{i + 1}</span>
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className={btn.small} aria-label="Устгах">
              <Trash2 className="size-3.5" aria-hidden />
            </button>
          </div>
          <p className="mb-1 text-xs text-muted">{columns[0]}</p>
          <LocalizedInput value={d.label} onChange={(label) => set(i, { label })} />
          <p className="mb-1 mt-3 text-xs text-muted">{columns[1]}</p>
          <LocalizedInput value={d.value} onChange={(v) => set(i, { value: v })} />
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, { label: blank(), value: null }])} className={btn.small}>
        <Plus className="size-3.5" aria-hidden /> Мөр нэмэх
      </button>
    </div>
  );
}

/** Багшийн боловсрол — сургууль, мэргэжил, зэрэг, он, төлөв */
export function EducationInput({ value, onChange }: { value: Education[]; onChange: (v: Education[]) => void }) {
  const set = (i: number, patch: Partial<Education>) => onChange(value.map((e, j) => (j === i ? { ...e, ...patch } : e)));
  const move = (i: number, to: number) => {
    const next = [...value];
    [next[i], next[to]] = [next[to], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {value.map((e, i) => (
        <div key={i} className="rounded-md border border-border bg-background p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">#{i + 1}</span>
            <div className="flex gap-1.5">
              <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} className={btn.small} aria-label="Дээш">
                <ArrowUp className="size-3.5" aria-hidden />
              </button>
              <button type="button" onClick={() => move(i, i + 1)} disabled={i === value.length - 1} className={btn.small} aria-label="Доош">
                <ArrowDown className="size-3.5" aria-hidden />
              </button>
              <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className={btn.small} aria-label="Устгах">
                <Trash2 className="size-3.5" aria-hidden />
              </button>
            </div>
          </div>
          <p className="mb-1 text-xs text-muted">Сургууль</p>
          <LocalizedInput value={e.school} onChange={(school) => set(i, { school })} />
          <p className="mb-1 mt-3 text-xs text-muted">Мэргэжил / тэнхим (заавал биш)</p>
          <LocalizedInput value={e.field} onChange={(field) => set(i, { field })} />
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block">
              <span className="mb-1 block text-xs text-muted">Зэрэг</span>
              <select value={e.degree ?? ""} onChange={(ev) => set(i, { degree: (ev.target.value || null) as Degree | null })} className={input}>
                <option value="">—</option>
                {(Object.keys(degreeLabels) as Degree[]).map((d) => (
                  <option key={d} value={d}>
                    {degreeLabels[d].mn}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-muted">Төлөв</span>
              <select value={e.status} onChange={(ev) => set(i, { status: ev.target.value as EducationStatus })} className={input}>
                {(Object.keys(educationStatusLabels) as EducationStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {educationStatusLabels[s].mn}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-muted">Элссэн он</span>
              <input inputMode="numeric" placeholder="2014" value={e.start ?? ""} onChange={(ev) => set(i, { start: ev.target.value })} className={input} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-muted">Төгссөн он</span>
              <input
                inputMode="numeric"
                placeholder={e.status === "in_progress" ? "одоо" : "2018"}
                disabled={e.status === "in_progress"}
                value={e.status === "in_progress" ? "" : (e.end ?? "")}
                onChange={(ev) => set(i, { end: ev.target.value })}
                className={`${input} disabled:opacity-50`}
              />
            </label>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, { school: blank(), field: null, degree: null, start: null, end: null, status: "completed" }])}
        className={btn.small}
      >
        <Plus className="size-3.5" aria-hidden /> Сургууль нэмэх
      </button>
    </div>
  );
}

/** Зургийн URL + Supabase Storage руу upload */
export function ImageInput({ value, onChange }: { value: string | null | undefined; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    const data = new FormData();
    data.append("file", file);
    const result = await uploadImage(data);
    setUploading(false);
    if (result.ok) onChange(result.data.url);
    else setError(result.error);
  }

  return (
    <div className="flex items-start gap-3">
      <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-background">
        {/* eslint-disable-next-line @next/next/no-img-element -- админ preview */}
        {value ? <img src={value} alt="" className="size-full object-cover" /> : <ImageUp className="size-6 text-muted/50" aria-hidden />}
      </div>
      <div className="flex-1 space-y-2">
        <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="https://… эсвэл /hero/зураг.jpg" className={input} />
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className={btn.small}>
            {uploading ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : <ImageUp className="size-3.5" aria-hidden />}
            Зураг upload
          </button>
          {value && (
            <button type="button" onClick={() => onChange("")} className={btn.small}>
              Арилгах
            </button>
          )}
          <span className="text-xs text-muted">JPG, PNG, WEBP · 5MB хүртэл</span>
        </div>
        {error && <p className="text-xs text-signal">{error}</p>}
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}

export function IconSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {iconNames.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => onChange(name)}
          title={name}
          aria-pressed={value === name}
          className={`grid size-11 place-items-center rounded-md border transition ${
            value === name ? "border-accent bg-accent-soft text-accent" : "border-border bg-surface text-muted hover:text-foreground"
          }`}
        >
          <Icon name={name} className="size-5" />
        </button>
      ))}
    </div>
  );
}

/** Профайл зураг — дугуй preview, upload, арилгах */
export function AvatarInput({ value, name, onChange }: { value: string | null; name: string; onChange: (v: string | null) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    const data = new FormData();
    data.append("file", file);
    const result = await uploadImage(data);
    setUploading(false);
    if (result.ok) onChange(result.data.url);
    else setError(result.error);
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar url={value} name={name} size={72} />
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className={btn.small}>
            {uploading ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : <ImageUp className="size-3.5" aria-hidden />}
            {value ? "Зураг солих" : "Зураг оруулах"}
          </button>
          {value && (
            <button type="button" onClick={() => onChange(null)} disabled={uploading} className={btn.small}>
              <Trash2 className="size-3.5" aria-hidden /> Арилгах
            </button>
          )}
        </div>
        <p className="text-xs text-muted">JPG, PNG, WEBP · 5MB хүртэл · дөрвөлжин зураг тохиромжтой</p>
        {error && <p className="text-xs text-signal">{error}</p>}
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}

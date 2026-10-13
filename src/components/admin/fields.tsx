"use client";

import { ImageUp, Loader2, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { locales, type Localized } from "@/i18n/config";
import { uploadImage } from "@/app/admin/actions";
import Icon, { iconNames } from "../ui/Icon";
import { btn, input } from "./ui";

const langLabel: Record<string, string> = { mn: "MN", en: "EN", ko: "KO" };
const blank = (): Localized => ({ mn: "", en: "", ko: "" });

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
          <span className="pointer-events-none absolute left-2.5 top-2 text-[10px] font-bold tracking-wider text-muted/70">{langLabel[lang]}</span>
          {multiline ? (
            <textarea
              lang={lang}
              rows={4}
              value={v[lang] ?? ""}
              onChange={(e) => onChange({ ...v, [lang]: e.target.value })}
              className={`${input} resize-y pt-6`}
            />
          ) : (
            <input lang={lang} value={v[lang] ?? ""} onChange={(e) => onChange({ ...v, [lang]: e.target.value })} className={`${input} pt-6`} />
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
          <span className="pointer-events-none absolute left-2.5 top-2 text-[10px] font-bold tracking-wider text-muted/70">{langLabel[lang]}</span>
          <textarea
            lang={lang}
            rows={6}
            value={(value?.[lang] ?? []).join("\n")}
            onChange={(e) => onChange({ ...value, [lang]: e.target.value.split("\n") })}
            className={`${input} resize-y pt-6`}
          />
        </div>
      ))}
    </div>
  );
}

type Detail = { label: Localized; value: Localized | null };

/** Үйлчилгээний "нэр — утга" хүснэгт */
export function DetailsInput({ value, onChange }: { value: Detail[]; onChange: (v: Detail[]) => void }) {
  const set = (i: number, patch: Partial<Detail>) => onChange(value.map((d, j) => (j === i ? { ...d, ...patch } : d)));
  return (
    <div className="space-y-3">
      {value.map((d, i) => (
        <div key={i} className="rounded-xl border border-border bg-background p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">#{i + 1}</span>
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className={btn.small} aria-label="Устгах">
              <Trash2 className="size-3.5" aria-hidden />
            </button>
          </div>
          <p className="mb-1 text-xs text-muted">Нэр</p>
          <LocalizedInput value={d.label} onChange={(label) => set(i, { label })} />
          <p className="mb-1 mt-3 text-xs text-muted">Утга (хоосон бол &quot;Удахгүй шинэчлэгдэнэ&quot;)</p>
          <LocalizedInput value={d.value} onChange={(v) => set(i, { value: v })} />
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, { label: blank(), value: null }])} className={btn.small}>
        <Plus className="size-3.5" aria-hidden /> Мөр нэмэх
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
      <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-background">
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
          className={`grid size-11 place-items-center rounded-xl border transition ${
            value === name ? "border-accent bg-accent-soft text-accent" : "border-border bg-surface text-muted hover:text-foreground"
          }`}
        >
          <Icon name={name} className="size-5" />
        </button>
      ))}
    </div>
  );
}

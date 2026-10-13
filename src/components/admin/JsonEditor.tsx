"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { Localized } from "@/i18n/config";
import { ImageInput, LocalizedInput, LocalizedListInput } from "./fields";
import { btn, input } from "./ui";

/**
 * Хуудасны хэсгийн (site_content) JSON-ийг маягт хэлбэрээр засна.
 * {mn, en, ko} объект → 3 хэлний талбар, массив → нэмэх/устгах/эрэмбэлэх боломжтой жагсаалт.
 */
export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const keyLabels: Record<string, string> = {
  title: "Гарчиг",
  titleLine1: "Гарчиг — 1-р мөр",
  titleLine2: "Гарчиг — 2-р мөр",
  text: "Текст",
  eyebrow: "Жижиг гарчиг",
  description: "Тайлбар",
  items: "Жагсаалт",
  steps: "Алхмууд",
  label: "Нэр",
  href: "Холбоос",
  icon: "Icon",
  isNew: "ШИНЭ тэмдэг",
  cta: "Товчны текст",
  primary: "Үндсэн товч",
  secondary: "Хоёрдогч товч",
  imageAlt: "Зургийн тайлбар (alt)",
  quick: "Түргэн холбоосууд",
  quickLabel: "Түргэн холбоосын нэр",
  newPill: "ШИНЭ үйлчилгээний шошго",
  routeFrom: "Маршрут — эхлэл",
  routeTo: "Маршрут — төгсгөл",
  name: "Нэр",
  address: "Хаяг",
  city: "Хот",
  phones: "Утаснууд",
  email: "И-мэйл",
  socials: "Сошиал холбоос",
  heroImage: "Hero зураг (гар утас)",
  heroImageFull: "Hero зураг (desktop, 1536×1024)",
  mapQuery: "Google Maps хайлтын утга",
  empty: "Хоосон үеийн текст",
  emptyTitle: "Хоосон үеийн гарчиг",
  emptyText: "Хоосон үеийн текст",
  soon: "\"Удахгүй\" шошго",
  comingSoon: "\"Дэлгэрэнгүй удахгүй\"",
  soonTitle: "Удахгүй нэмэгдэх үйлчилгээний гарчиг",
  course: "Хэлний сургалтын карт",
  note: "Тэмдэглэл",
  form: "Форм",
  interests: "Сонирхлын сонголтууд",
  value: "Утга",
  placeholder: "Placeholder",
};

const isObject = (v: unknown): v is Record<string, Json> => typeof v === "object" && v !== null && !Array.isArray(v);
const isLocalizedShape = (v: unknown, check: (x: unknown) => boolean) =>
  isObject(v) && Object.keys(v).length > 0 && Object.keys(v).every((k) => ["mn", "en", "ko"].includes(k)) && Object.values(v).every(check);
const isLocalized = (v: unknown) => isLocalizedShape(v, (x) => typeof x === "string");
const isLocalizedList = (v: unknown) => isLocalizedShape(v, (x) => Array.isArray(x) && x.every((s) => typeof s === "string"));

/** Шинэ мөр нэмэхэд — бүтцийг хадгалж, утгыг хоосолно */
function blankLike(v: Json): Json {
  if (typeof v === "string") return "";
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return false;
  if (Array.isArray(v)) return [];
  if (isObject(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blankLike(x)]));
  return null;
}

export default function JsonEditor({ value, onChange, name }: { value: Json; onChange: (v: Json) => void; name?: string }) {
  if (isLocalized(value)) {
    const long = Object.values(value as Record<string, string>).some((s) => s.length > 70);
    return <LocalizedInput value={value as Localized} onChange={onChange} multiline={long} />;
  }
  if (isLocalizedList(value)) return <LocalizedListInput value={value as Localized<string[]>} onChange={onChange} />;

  if (typeof value === "string" || value === null) {
    if (name && /image/i.test(name)) return <ImageInput value={value} onChange={onChange} />;
    const v = value ?? "";
    return v.length > 70 ? (
      <textarea value={v} rows={3} onChange={(e) => onChange(e.target.value)} className={`${input} resize-y`} />
    ) : (
      <input value={v} onChange={(e) => onChange(e.target.value)} className={input} />
    );
  }
  if (typeof value === "number") {
    return <input type="number" value={value} onChange={(e) => onChange(e.target.valueAsNumber || 0)} className={`${input} max-w-40`} />;
  }
  if (typeof value === "boolean") {
    return (
      <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="size-4 accent-[var(--accent)]" />
        Тийм
      </label>
    );
  }
  if (Array.isArray(value)) return <ArrayEditor value={value} onChange={onChange} />;

  return (
    <div className="space-y-5">
      {Object.entries(value).map(([key, child]) => (
        <div key={key} className={isObject(child) && !isLocalized(child) && !isLocalizedList(child) ? "rounded-xl border border-border p-4" : ""}>
          <p className="mb-1.5 flex items-baseline gap-2 text-[13px] font-semibold text-foreground">
            {keyLabels[key] ?? key}
            {keyLabels[key] && <code className="text-[11px] font-normal text-muted/70">{key}</code>}
          </p>
          <JsonEditor name={key} value={child} onChange={(v) => onChange({ ...value, [key]: v })} />
        </div>
      ))}
    </div>
  );
}

function ArrayEditor({ value, onChange }: { value: Json[]; onChange: (v: Json[]) => void }) {
  const move = (i: number, d: -1 | 1) => {
    const next = [...value];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  const template: Json = value.length > 0 ? blankLike(value[value.length - 1]) : "";

  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <div key={i} className="rounded-xl border border-border bg-background p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-muted">#{i + 1}</span>
            <div className="flex gap-1">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className={btn.small} aria-label="Дээш">
                <ArrowUp className="size-3.5" aria-hidden />
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} className={btn.small} aria-label="Доош">
                <ArrowDown className="size-3.5" aria-hidden />
              </button>
              <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className={btn.small} aria-label="Устгах">
                <Trash2 className="size-3.5" aria-hidden />
              </button>
            </div>
          </div>
          <JsonEditor value={item} onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))} />
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, template])} className={btn.small}>
        <Plus className="size-3.5" aria-hidden /> Нэмэх
      </button>
    </div>
  );
}

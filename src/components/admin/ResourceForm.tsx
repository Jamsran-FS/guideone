"use client";

import { CheckCircle2, Loader2, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Localized } from "@/i18n/config";
import { deleteRow, saveRow } from "@/app/admin/actions";
import { normalizeRow, resources, type Field, type ResourceKey, type Row } from "@/lib/admin-resources";
import { DetailsInput, IconSelect, ImageInput, LocalizedInput, LocalizedListInput } from "./fields";
import { btn, input, label, Panel } from "./ui";

export default function ResourceForm({ resource, initial }: { resource: ResourceKey; initial: Row }) {
  const config = resources[resource];
  const router = useRouter();
  const [row, setRow] = useState<Row>(initial);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const id = initial.id ?? null;

  const set = (name: string, value: unknown) => setRow((r) => ({ ...r, [name]: value }));

  function save() {
    setMessage(null);
    startTransition(async () => {
      const result = await saveRow(resource, id, normalizeRow(config, row));
      if (!result.ok) return setMessage({ ok: false, text: result.error });
      setMessage({ ok: true, text: "Хадгалагдлаа. Сайт дээр шинэчлэгдсэн." });
      if (id === null && result.data.id) router.replace(`/admin/${resource}/${result.data.id}`);
    });
  }

  function remove() {
    if (id === null || !confirm(`Энэ ${config.singular}-ийг устгах уу? Буцаах боломжгүй.`)) return;
    startTransition(async () => {
      const result = await deleteRow(resource, id);
      if (!result.ok) return setMessage({ ok: false, text: result.error });
      router.push(`/admin/${resource}`);
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <Panel className="divide-y divide-border">
        {config.fields.map((f: Field) => (
          <div key={f.name} className="grid gap-2 p-5 lg:grid-cols-[200px_1fr] lg:gap-6">
            <div>
              <p className={label}>
                {f.label}
                {f.optional && <span className="ml-1.5 font-normal text-muted">(заавал биш)</span>}
              </p>
              {f.help && <p className="mt-1 text-xs leading-relaxed text-muted">{f.help}</p>}
            </div>
            <FieldInput field={f} value={row[f.name]} onChange={(v) => set(f.name, v)} />
          </div>
        ))}
      </Panel>

      <div className="sticky bottom-0 mt-6 flex flex-wrap items-center gap-3 border-t border-border bg-background/90 py-4 backdrop-blur">
        <button type="submit" disabled={pending} className={btn.primary}>
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Save className="size-4" aria-hidden />}
          Хадгалах
        </button>
        {id !== null && (
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

function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  switch (field.type) {
    case "localized":
      return <LocalizedInput value={value as Localized | null} onChange={onChange} />;
    case "localizedText":
      return <LocalizedInput value={value as Localized | null} onChange={onChange} multiline />;
    case "localizedList":
      return <LocalizedListInput value={value as Localized<string[]>} onChange={onChange} />;
    case "details":
      return <DetailsInput value={(value as never[]) ?? []} onChange={onChange} />;
    case "image":
      return <ImageInput value={value as string | null} onChange={onChange} />;
    case "icon":
      return <IconSelect value={String(value ?? "")} onChange={onChange} />;
    case "boolean":
      return (
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="size-4 accent-[var(--accent)]" />
          Тийм
        </label>
      );
    case "number":
      return <input type="number" value={Number(value ?? 0)} onChange={(e) => onChange(e.target.valueAsNumber || 0)} className={`${input} max-w-40`} />;
    case "select":
      return (
        <select value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className={`${input} max-w-sm`}>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <input
          type={field.type === "url" ? "url" : "text"}
          value={String(value ?? "")}
          required={!field.optional}
          onChange={(e) => onChange(e.target.value)}
          className={input}
        />
      );
  }
}

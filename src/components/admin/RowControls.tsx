"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteContactRequest, setUserRole, updateApplication, updateContactRequest, type ActionResult, type StatusPatch } from "@/app/admin/actions";
import type { Role } from "@/lib/session-cookies";
import { btn, input } from "./ui";

type Option = { value: string; label: string };

/** Төлөв + админы тэмдэглэл (хүсэлт, өргөдөлд) */
export function StatusEditor({
  kind,
  id,
  status,
  note,
  options,
}: {
  kind: "request" | "application";
  id: number;
  status: string;
  note: string;
  options: Option[];
}) {
  const [value, setValue] = useState({ status, admin_note: note });
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const dirty = value.status !== status || value.admin_note !== note;

  const submit = (patch: StatusPatch) =>
    startTransition(async () => {
      setError(null);
      const result: ActionResult<unknown> = kind === "request" ? await updateContactRequest(id, patch) : await updateApplication(id, patch);
      if (!result.ok) setError(result.error);
    });

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={value.status}
          onChange={(e) => {
            setValue((v) => ({ ...v, status: e.target.value }));
            submit({ status: e.target.value });
          }}
          disabled={pending}
          className={`${input} w-auto`}
          aria-label="Төлөв"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {pending && <Loader2 className="size-4 animate-spin text-muted" aria-hidden />}
        {kind === "request" && <DeleteRequest id={id} />}
      </div>
      <textarea
        value={value.admin_note}
        onChange={(e) => setValue((v) => ({ ...v, admin_note: e.target.value }))}
        rows={2}
        placeholder={kind === "application" ? "Тэмдэглэл (суралцагчид харагдана)" : "Дотоод тэмдэглэл"}
        className={`${input} resize-y`}
      />
      {dirty && value.admin_note !== note && (
        <button type="button" onClick={() => submit({ admin_note: value.admin_note })} disabled={pending} className={btn.small}>
          Тэмдэглэл хадгалах
        </button>
      )}
      {error && <p className="text-xs text-signal">{error}</p>}
    </div>
  );
}

function DeleteRequest({ id }: { id: number }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => confirm("Энэ хүсэлтийг устгах уу?") && startTransition(async () => void (await deleteContactRequest(id)))}
      className={btn.small}
      aria-label="Устгах"
    >
      <Trash2 className="size-3.5" aria-hidden />
    </button>
  );
}

export function RoleSelect({ id, role, disabled }: { id: string; role: Role; disabled?: boolean }) {
  const [value, setValue] = useState(role);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <select
        value={value}
        disabled={disabled || pending}
        onChange={(e) => {
          const next = e.target.value as Role;
          if (next === "sysadmin" && !confirm("Энэ хэрэглэгчид sysadmin эрх өгөх үү? Сайтын бүх контент, төлбөр, дүнг удирдах боломжтой болно.")) return;
          setValue(next);
          startTransition(async () => {
            const result = await setUserRole(id, next);
            if (!result.ok) {
              setError(result.error);
              setValue(role);
            }
          });
        }}
        className={`${input} w-auto`}
        aria-label="Эрх"
      >
        <option value="student">Суралцагч</option>
        <option value="teacher">Багш</option>
        <option value="sysadmin">Sysadmin</option>
      </select>
      {pending && <Loader2 className="size-4 animate-spin text-muted" aria-hidden />}
      {error && <span className="text-xs text-signal">{error}</span>}
    </div>
  );
}

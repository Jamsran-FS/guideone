"use client";

import { CheckCircle2, Loader2, RotateCcw, Save } from "lucide-react";
import { useState, useTransition } from "react";
import { saveSection } from "@/app/admin/actions";
import JsonEditor, { type Json } from "./JsonEditor";
import { btn, Panel } from "./ui";

export default function SectionEditor({ sectionKey, initial, defaults }: { sectionKey: string; initial: Json; defaults: Json }) {
  const [value, setValue] = useState<Json>(initial);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function save() {
    setMessage(null);
    startTransition(async () => {
      const result = await saveSection(sectionKey, value);
      setMessage(result.ok ? { ok: true, text: "Хадгалагдлаа. Сайт дээр шинэчлэгдсэн." } : { ok: false, text: result.error });
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <Panel className="p-5 sm:p-6">
        <JsonEditor value={value} onChange={setValue} />
      </Panel>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className={btn.primary}>
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Save className="size-4" aria-hidden />}
          Хадгалах
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => confirm("Анхны (кодонд байгаа) текст рүү буцаах уу? Хадгалах дарсны дараа сайтад хэрэгжинэ.") && setValue(defaults)}
          className={btn.secondary}
        >
          <RotateCcw className="size-4" aria-hidden /> Анхны утга
        </button>
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

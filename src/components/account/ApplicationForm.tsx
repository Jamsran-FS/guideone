"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useActionState, useState } from "react";
import { tr, type Locale } from "@/i18n/config";
import { accountCopy as c } from "@/data/home";
import { applyAction, type FormState } from "@/lib/actions/account";
import { authField } from "../auth/LoginForm";

type Option = { id: number; name: string };
type Program = keyof typeof c.programs;

export default function ApplicationForm({ lang, courses, partners }: { lang: Locale; courses: Option[]; partners: Option[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(applyAction.bind(null, lang), null);
  const [program, setProgram] = useState<Program>("language_course");
  const options = program === "language_course" ? courses : partners;
  const label = "block text-sm font-medium text-foreground";

  return (
    <form action={action} key={state?.ok ? state.at : "form"} className="space-y-5">
      <fieldset>
        <legend className={label}>{tr(c.program, lang)}</legend>
        <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
          {(Object.keys(c.programs) as Program[]).map((p) => (
            <label key={p} className="cursor-pointer">
              <input type="radio" name="program" value={p} checked={program === p} onChange={() => setProgram(p)} className="peer sr-only" />
              <span className="flex h-full items-center rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground/80 transition peer-checked:border-accent peer-checked:bg-accent-soft peer-checked:text-primary peer-focus-visible:ring-4 peer-focus-visible:ring-accent/20">
                {tr(c.programs[p], lang)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {options.length > 0 && (
        <label className={label}>
          {tr(program === "language_course" ? c.course : c.partner, lang)}
          <select name={program === "language_course" ? "course_id" : "partner_id"} defaultValue="" className={authField}>
            <option value="">{tr(c.notSure, lang)}</option>
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className={label}>
        {tr(c.message, lang)}
        <textarea name="message" rows={4} maxLength={4000} placeholder={tr(c.messagePh, lang)} className={`${authField} resize-none`} />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-strong disabled:opacity-70"
        >
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
          {tr(c.submit, lang)}
        </button>
        {state && !pending && (
          <p role="status" className={`flex items-center gap-1.5 text-sm ${state.ok ? "text-accent" : "text-signal"}`}>
            {state.ok && <CheckCircle2 className="size-4" aria-hidden />}
            {tr(state.ok ? c.submitted : c.error, lang)}
          </p>
        )}
      </div>
    </form>
  );
}

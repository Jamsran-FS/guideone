"use client";

import { Check, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { tr, type Locale } from "@/i18n/config";
import { contactCopy } from "@/data/home";
import { submitContact } from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ lang }: { lang: Locale }) {
  const f = contactCopy.form;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    setStatus("sending");
    const res = await submitContact({
      name: String(d.get("name") ?? ""),
      phone: String(d.get("phone") ?? ""),
      interest: String(d.get("interest") ?? ""),
      message: String(d.get("message") ?? ""),
      locale: lang,
    });
    if (res.ok) {
      form.reset();
      setStatus("success");
    } else setStatus("error");
  }

  const label = "block text-[13px] font-semibold text-foreground";
  const field =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3.5 text-[15px] text-foreground outline-none transition placeholder:text-muted/50 hover:border-accent/40 focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10";

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[460px] flex-col items-center justify-center text-center" role="status">
        <span className="grid size-16 place-items-center rounded-full bg-accent-soft text-accent">
          <CheckCircle2 className="size-8" aria-hidden />
        </span>
        <p className="mt-6 font-display text-2xl font-bold text-foreground">{tr(f.success, lang)}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
        >
          {tr(f.again, lang)}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex h-full flex-col">
      <h3 className="font-display text-2xl font-bold tracking-[-0.01em] text-foreground">{tr(f.title, lang)}</h3>
      <p className="mt-2 text-[15px] text-muted">{tr(contactCopy.formText, lang)}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className={label}>
          {tr(f.name, lang)} <span className="text-accent" aria-hidden>*</span>
          <input name="name" required autoComplete="name" placeholder={tr(f.namePh, lang)} className={field} aria-required />
        </label>
        <label className={label}>
          {tr(f.phone, lang)} <span className="text-accent" aria-hidden>*</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            placeholder="8606 3323"
            pattern="[0-9+\s\-]{8,}"
            className={field}
            aria-required
          />
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className={label}>{tr(f.interest, lang)}</legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {f.interests.map((o) => (
            <label key={o.value} className="cursor-pointer">
              <input type="radio" name="interest" value={o.value} className="peer sr-only" />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground/80 transition hover:border-accent/40 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-accent/20 [&>svg]:hidden peer-checked:[&>svg]:block">
                <Check className="size-3.5" strokeWidth={3} aria-hidden />
                {tr(o.label, lang)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={`${label} mt-6 flex flex-1 flex-col`}>
        {tr(f.message, lang)}
        <textarea name="message" rows={4} placeholder={tr(f.messagePh, lang)} className={`${field} min-h-32 flex-1 resize-none`} />
      </label>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-xl bg-signal/10 px-4 py-3 text-sm text-signal">
          {tr(f.error, lang)}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent text-[15px] font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-strong disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden /> {tr(f.sending, lang)}
          </>
        ) : (
          <>
            {tr(f.submit, lang)} <Send className="size-4" aria-hidden />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        <span className="text-accent">*</span> {tr(f.required, lang)}
      </p>
    </form>
  );
}

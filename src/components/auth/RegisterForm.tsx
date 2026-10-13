"use client";

import Link from "next/link";
import { Info, Loader2, MailCheck, UserPlus } from "lucide-react";
import { useActionState } from "react";
import { tr, type Locale } from "@/i18n/config";
import { registerCopy as c } from "@/data/home";
import { registerAction, type RegisterState } from "@/lib/actions/auth";
import { authField } from "./LoginForm";
import ResendButton from "./ResendButton";

export default function RegisterForm({ lang }: { lang: Locale }) {
  const [state, action, pending] = useActionState<RegisterState, FormData>(registerAction.bind(null, lang), null);

  if (state && "confirm" in state) {
    return (
      <div role="status" className="flex flex-col items-center py-6 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-accent-soft text-accent">
          <MailCheck className="size-8" aria-hidden />
        </span>
        <p className="mt-6 font-display text-xl font-bold text-foreground">{tr(c.confirmTitle, lang)}</p>
        <p className="mt-2 text-muted">{tr(c.confirmText, lang)}</p>
        <p className="mt-4 font-semibold text-foreground">{state.email}</p>
        <div className="mt-6">
          <ResendButton lang={lang} email={state.email} />
        </div>
        <Link href={`/${lang}/login`} className="mt-6 font-semibold text-accent hover:underline">
          {tr(c.login, lang)}
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <label className="block text-sm font-medium text-foreground">
        {tr(c.fullName, lang)}
        <input name="fullName" required maxLength={120} autoComplete="name" className={authField} />
      </label>
      <label className="block text-sm font-medium text-foreground">
        {tr(c.phone, lang)}
        <input name="phone" type="tel" inputMode="tel" required minLength={6} maxLength={40} autoComplete="tel" className={authField} />
      </label>
      <label className="block text-sm font-medium text-foreground">
        {tr(c.email, lang)}
        <input name="email" type="email" required autoComplete="email" className={authField} />
      </label>
      <label className="block text-sm font-medium text-foreground">
        {tr(c.password, lang)}
        <input name="password" type="password" required minLength={8} maxLength={72} autoComplete="new-password" className={authField} />
      </label>

      {state && "error" in state && (
        <p role="alert" className="flex gap-3 rounded-xl bg-accent-soft p-4 text-sm leading-relaxed text-primary">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          {tr(c[state.error], lang)}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-strong disabled:opacity-70"
      >
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <UserPlus className="size-4" aria-hidden />}
        {tr(pending ? c.sending : c.submit, lang)}
      </button>
    </form>
  );
}

"use client";

import Link from "next/link";
import { Eye, EyeOff, Info, Loader2, LogIn } from "lucide-react";
import { useActionState, useState } from "react";
import { tr, type Locale } from "@/i18n/config";
import { loginCopy as c } from "@/data/home";
import { loginAction, type LoginState } from "@/lib/actions/auth";
import ResendButton from "./ResendButton";

export const authField =
  "mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-[15px] text-foreground outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/15";

export default function LoginForm({ lang, next }: { lang: Locale; next: string | null }) {
  const [show, setShow] = useState(false);
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction.bind(null, lang, next), null);

  return (
    <form action={action} className="space-y-5">
      <label className="block text-sm font-medium text-foreground">
        {tr(c.email, lang)}
        <input name="email" type="email" required autoComplete="email" className={authField} />
      </label>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            {tr(c.password, lang)}
          </label>
          <Link href={`/${lang}#contact`} className="text-sm font-medium text-accent hover:underline">
            {tr(c.forgot, lang)}
          </Link>
        </div>
        <div className="relative">
          <input id="password" name="password" type={show ? "text" : "password"} required autoComplete="current-password" className={`${authField} pr-12`} />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={tr(show ? c.hidePassword : c.showPassword, lang)}
            aria-pressed={show}
            className="absolute right-2 top-[calc(50%+4px)] grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted hover:text-foreground"
          >
            {show ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
          </button>
        </div>
      </div>

      {state?.error && (
        <div role="alert" className="space-y-3 rounded-xl bg-accent-soft p-4 text-sm leading-relaxed text-primary">
          <p className="flex gap-3">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            {tr(c[state.error], lang)}
          </p>
          {state.error === "unconfirmed" && <ResendButton lang={lang} email={state.email} />}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-strong disabled:opacity-70"
      >
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <LogIn className="size-4" aria-hidden />}
        {tr(pending ? c.sending : c.submit, lang)}
      </button>
    </form>
  );
}

"use client";

import Link from "next/link";
import { Eye, EyeOff, Info, Loader2, LogIn } from "lucide-react";
import { useState, type FormEvent } from "react";
import { tr, type Locale } from "@/i18n/config";
import { loginCopy as c } from "@/data/home";
import { login } from "@/lib/auth";

export default function LoginForm({ lang }: { lang: Locale }) {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "not_ready">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setStatus("sending");
    const res = await login({ identifier: String(d.get("identifier") ?? ""), password: String(d.get("password") ?? "") });
    setStatus(res.ok ? "idle" : "not_ready");
  }

  const field =
    "mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-[15px] text-foreground outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/15";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block text-sm font-medium text-foreground">
        {tr(c.identifier, lang)}
        <input name="identifier" required autoComplete="username" className={field} />
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
          <input id="password" name="password" type={show ? "text" : "password"} required autoComplete="current-password" className={`${field} pr-12`} />
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

      {status === "not_ready" && (
        <p role="status" className="flex gap-3 rounded-xl bg-accent-soft p-4 text-sm leading-relaxed text-primary">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          {tr(c.notReady, lang)}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-strong disabled:opacity-70"
      >
        {status === "sending" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <LogIn className="size-4" aria-hidden />}
        {tr(status === "sending" ? c.sending : c.submit, lang)}
      </button>
    </form>
  );
}

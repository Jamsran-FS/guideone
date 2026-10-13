"use client";

import { Loader2, MailPlus } from "lucide-react";
import { useState, useTransition } from "react";
import { tr, type Locale } from "@/i18n/config";
import { loginCopy as c } from "@/data/home";
import { resendConfirmationAction, type ResendResult } from "@/lib/actions/auth";

const messages = { sent: c.resent, rate_limited: c.rateLimited, failed: c.resendFailed };

/** Баталгаажуулах и-мэйлийг дахин илгээх товч */
export default function ResendButton({ lang, email }: { lang: Locale; email: string }) {
  const [result, setResult] = useState<ResendResult | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={pending || result === "sent"}
        onClick={() => startTransition(async () => setResult(await resendConfirmationAction(lang, email)))}
        className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline disabled:opacity-60 disabled:no-underline"
      >
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <MailPlus className="size-4" aria-hidden />}
        {tr(c.resend, lang)}
      </button>
      {result && (
        <p role="status" className={`text-sm ${result === "sent" ? "text-accent" : "text-signal"}`}>
          {tr(messages[result], lang)}
        </p>
      )}
    </div>
  );
}

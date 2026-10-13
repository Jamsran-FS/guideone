"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useActionState } from "react";
import { tr, type Locale } from "@/i18n/config";
import { accountCopy as c } from "@/data/home";
import { updateProfileAction, type FormState } from "@/lib/actions/account";
import type { Profile } from "@/lib/session-cookies";
import { authField } from "../auth/LoginForm";

export default function ProfileForm({ lang, profile }: { lang: Locale; profile: Profile }) {
  const [state, action, pending] = useActionState<FormState, FormData>(updateProfileAction.bind(null, lang), null);
  const label = "block text-sm font-medium text-foreground";

  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2">
      <label className={`${label} sm:col-span-2`}>
        {tr(c.fullName, lang)}
        <input name="full_name" required maxLength={120} defaultValue={profile.full_name} className={authField} />
      </label>
      <label className={label}>
        {tr(c.phone, lang)}
        <input name="phone" type="tel" maxLength={40} defaultValue={profile.phone} className={authField} />
      </label>
      <label className={label}>
        {tr(c.birthDate, lang)}
        <input name="birth_date" type="date" defaultValue={profile.birth_date ?? ""} className={authField} />
      </label>
      <label className={`${label} sm:col-span-2`}>
        {tr(c.koreanLevel, lang)}
        <input name="korean_level" maxLength={60} placeholder={tr(c.koreanLevelPh, lang)} defaultValue={profile.korean_level} className={authField} />
      </label>
      <label className={label}>
        {tr(c.parentName, lang)}
        <input name="parent_name" maxLength={120} defaultValue={profile.parent_name} className={authField} />
      </label>
      <label className={label}>
        {tr(c.parentPhone, lang)}
        <input name="parent_phone" type="tel" maxLength={40} defaultValue={profile.parent_phone} className={authField} />
      </label>

      <div className="flex items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-70"
        >
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {tr(pending ? c.saving : c.save, lang)}
        </button>
        {state && !pending && (
          <p role="status" key={state.at} className={`flex items-center gap-1.5 text-sm ${state.ok ? "text-accent" : "text-signal"}`}>
            {state.ok && <CheckCircle2 className="size-4" aria-hidden />}
            {tr(state.ok ? c.saved : c.error, lang)}
          </p>
        )}
      </div>
    </form>
  );
}

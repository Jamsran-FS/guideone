"use client";

import { CheckCircle2, Info, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { tr, type Locale } from "@/i18n/config";
import { loginCopy as c } from "@/data/home";
import { confirmEmailSessionAction } from "@/lib/actions/auth";

type Status = "idle" | "confirming" | "confirmed" | "expired";

/**
 * И-мэйлийн баталгаажуулах холбоосоос буцаж ирэхэд (/login?confirmed=1#access_token=...&refresh_token=...)
 * хэрэглэгчийг шууд нэвтрүүлнэ. Холбоос хүчингүй бол (#error_code=otp_expired) мэдэгдэл харуулна.
 */
export default function EmailConfirmNotice({ lang, confirmed }: { lang: Locale; confirmed: boolean }) {
  const [status, setStatus] = useState<Status>(confirmed ? "confirmed" : "idle");

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    if (hash.size === 0) return;
    // Token-ууд хөтчийн түүх, хаягийн мөрөнд үлдэхгүй
    window.history.replaceState(null, "", window.location.pathname + window.location.search);

    const failed = hash.has("error") || hash.has("error_code");
    const refreshToken = hash.get("refresh_token");
    void (async () => {
      if (failed) return setStatus("expired");
      if (!refreshToken) return;
      setStatus("confirming");
      // Амжилттай бол server action бүртгэлийн хуудас руу шилжүүлнэ; эс бөгөөс гараар нэвтэрнэ
      await confirmEmailSessionAction(lang, refreshToken);
      setStatus("confirmed");
    })();
  }, [lang]);

  if (status === "idle") return null;

  const box = "mb-6 flex gap-3 rounded-xl p-4 text-sm leading-relaxed";
  if (status === "confirming") {
    return (
      <p role="status" className={`${box} bg-accent-soft text-primary`}>
        <Loader2 className="mt-0.5 size-4 shrink-0 animate-spin" aria-hidden /> {tr(c.confirming, lang)}
      </p>
    );
  }
  if (status === "expired") {
    return (
      <p role="alert" className={`${box} bg-signal/10 text-signal`}>
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden /> {tr(c.linkExpired, lang)}
      </p>
    );
  }
  return (
    <p role="status" className={`${box} bg-accent-soft text-primary`}>
      <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden /> {tr(c.confirmed, lang)}
    </p>
  );
}

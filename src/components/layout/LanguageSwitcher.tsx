"use client";

import { Check, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOCALE_COOKIE, localeNames, locales, type Locale } from "@/i18n/config";
import { Flag } from "../ui/Flags";

export default function LanguageSwitcher({
  lang,
  label,
  variant = "dropdown",
}: {
  lang: Locale;
  label: string;
  variant?: "dropdown" | "list";
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const hrefFor = (l: Locale) => {
    const rest = pathname.split("/").slice(2).join("/");
    return `/${l}${rest ? `/${rest}` : ""}`;
  };

  // Хэл солиход cookie хадгалж, одоогийн хэсгээ (#hash) алдахгүй
  const choose = (l: Locale) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
    const hash = window.location.hash;
    if (hash) {
      e.preventDefault();
      window.location.href = hrefFor(l) + hash;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "list") {
    return (
      <div role="group" aria-label={label} className="grid grid-cols-3 gap-2">
        {locales.map((l) => (
          <a
            key={l}
            href={hrefFor(l)}
            hrefLang={l}
            lang={l}
            onClick={choose(l)}
            aria-current={l === lang ? "true" : undefined}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
              l === lang ? "border-primary bg-primary-soft text-primary" : "border-border text-foreground hover:border-primary/30"
            }`}
          >
            <Flag locale={l} className="h-3.5 w-5" />
            {localeNames[l]}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`${label}: ${localeNames[lang]}`}
        className={`flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-semibold transition ${
          open ? "border-primary/30 bg-primary-soft text-primary" : "border-border bg-surface text-foreground hover:border-primary/30"
        }`}
      >
        <Flag locale={lang} className="h-3.5 w-5" />
        <span className="uppercase">{lang}</span>
        <ChevronDown className={`size-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute right-0 top-full z-50 w-48 pt-2 transition duration-150 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul role="listbox" aria-label={label} className="overflow-hidden rounded-xl bg-primary p-1.5 shadow-2xl shadow-primary/30">
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === lang}>
              <a
                href={hrefFor(l)}
                hrefLang={l}
                lang={l}
                onClick={choose(l)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  l === lang ? "bg-white/10 font-semibold text-white" : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Flag locale={l} className="h-4 w-6" />
                <span className="flex-1">{localeNames[l]}</span>
                {l === lang && <Check className="size-4 text-white" />}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

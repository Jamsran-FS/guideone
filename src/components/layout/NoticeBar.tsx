"use client";

import Link from "next/link";
import { Megaphone } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { tr, type Locale } from "@/i18n/config";
import { isNoticeActive, type Notice } from "@/data/notices";

/**
 * Сайтын хамгийн дээд талд, бүтэн өргөнөөр урсдаг зар (fixed). Зөвхөн starts_at–ends_at хооронд харагдана —
 * минут тутам шалгаж, хугацаа нь дуусахад хуудсыг дахин ачаалахгүйгээр алга болно.
 * Харагдаж байх үед navbar-ыг [data-notice-bar]-аар доошлуулна (globals.css).
 */
export default function NoticeBar({ notices, lang }: { notices: Notice[]; lang: Locale }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const items = notices
    .filter((n) => isNoticeActive(n, now))
    .map((n) => ({ ...n, label: tr(n.text, lang)?.trim() || n.text.mn }))
    .filter((n) => n.label);
  if (items.length === 0) return null;

  // Нэг хуулбар нь дэлгэцийн өргөнөөс урт байх ёстой (тасралтгүй гүйлгэхийн тулд) — богино зарыг давтана
  const chars = items.reduce((sum, n) => sum + n.label.length + 12, 0);
  const repeat = Math.max(1, Math.ceil(260 / chars));
  const style = { "--marquee-duration": `${Math.round((chars * repeat) / 7)}s` } as CSSProperties;
  const copy = Array.from({ length: repeat }, () => items).flat();

  return (
    <>
      <div data-notice-bar className="fixed inset-x-0 top-0 z-40 h-[var(--notice-h)] overflow-hidden bg-primary text-white">
        <div className="animate-marquee flex h-full w-max items-center" style={style}>
          {[0, 1].map((half) => (
            <ul key={half} aria-hidden={half === 1 || undefined} className="flex shrink-0 items-center">
              {copy.map((n, i) => (
                <li key={`${n.id}-${i}`} className="flex items-center gap-2.5 whitespace-nowrap px-8 text-sm font-medium">
                  <Megaphone className="size-4 shrink-0 text-lime" aria-hidden />
                  <NoticeLink url={n.url} lang={lang} tabIndex={half === 1 || i >= items.length ? -1 : undefined}>
                    {n.label}
                  </NoticeLink>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      {/* Fixed зарын өндөртэй тэнцүү зай — хуудасны контентыг доош түлхэнэ */}
      <div aria-hidden className="h-[var(--notice-h)]" />
    </>
  );
}

function NoticeLink({ url, lang, tabIndex, children }: { url?: string; lang: Locale; tabIndex?: number; children: string }) {
  if (!url) return <span>{children}</span>;
  const cls = "underline-offset-4 hover:underline";
  if (url.startsWith("/")) {
    // "/language-prep" гэж бичсэн бол хэлний prefix нэмнэ
    const href = /^\/(mn|en|ko)(\/|$|#)/.test(url) ? url : `/${lang}${url}`;
    return (
      <Link href={href} tabIndex={tabIndex} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={url} target="_blank" rel="noreferrer" tabIndex={tabIndex} className={cls}>
      {children}
    </a>
  );
}

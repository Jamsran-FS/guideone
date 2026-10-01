import { useId } from "react";
import type { Locale } from "@/i18n/config";

type P = { className?: string };

/** Монгол — улаан/цэнхэр/улаан, зүүн талд Соёмбо (хялбаршуулсан) */
function MN({ className }: P) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden>
      <rect width="30" height="20" fill="#C4272F" />
      <rect x="10" width="10" height="20" fill="#015197" />
      <g fill="#F9CF02">
        <path d="M5 2.2c.5.8.9 1.4.4 2.1-.3-.4-.7-.4-.8 0-.5-.7-.1-1.3.4-2.1Z" />
        <circle cx="5" cy="6.1" r="1.25" />
        <path d="M3.4 7.4h3.2a1.6 1.6 0 0 1-3.2 0Z" />
        <rect x="2.6" y="9.1" width="4.8" height=".8" />
        <rect x="2.6" y="15.8" width="4.8" height=".8" />
        <rect x="2.2" y="10.4" width=".9" height="4.9" />
        <rect x="6.9" y="10.4" width=".9" height="4.9" />
        <circle cx="5" cy="12.85" r="1.5" />
      </g>
      <path d="M5 11.35a.75.75 0 0 1 0 1.5.75.75 0 0 0 0 1.5 1.5 1.5 0 0 0 0-3Z" fill="#C4272F" />
    </svg>
  );
}

/** Их Британи — Union Jack */
function GB({ className }: P) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden>
      <defs>
        <clipPath id={`s${id}`}>
          <path d="M0 0v30h60V0z" />
        </clipPath>
        <clipPath id={`t${id}`}>
          <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#s${id})`}>
        <path d="M0 0v30h60V0z" fill="#012169" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0l60 30m0-30L0 30" clipPath={`url(#t${id})`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

/** Өмнөд Солонгос — Тэгүгги */
function KR({ className }: P) {
  const bars = (x: number, y: number, deg: number, broken: boolean[]) => (
    <g transform={`translate(${x} ${y}) rotate(${deg})`} fill="#000">
      {broken.map((b, i) =>
        b ? (
          <g key={i}>
            <rect x={-3} y={-2.2 + i * 1.6} width={2.6} height={1} />
            <rect x={0.4} y={-2.2 + i * 1.6} width={2.6} height={1} />
          </g>
        ) : (
          <rect key={i} x={-3} y={-2.2 + i * 1.6} width={6} height={1} />
        ),
      )}
    </g>
  );
  return (
    <svg viewBox="0 0 36 24" className={className} aria-hidden>
      <rect width="36" height="24" fill="#fff" />
      <g transform="rotate(33.7 18 12)">
        <circle cx="18" cy="12" r="6" fill="#0047A0" />
        <path d="M12 12a6 6 0 0 1 12 0 3 3 0 0 1-6 0 3 3 0 0 0-6 0Z" fill="#CD2E3A" />
      </g>
      {bars(7.2, 5.4, -56.3, [false, false, false])}
      {bars(28.8, 18.6, -56.3, [true, true, true])}
      {bars(28.8, 5.4, 56.3, [false, true, false])}
      {bars(7.2, 18.6, 56.3, [true, false, true])}
    </svg>
  );
}

export function Flag({ locale, className = "h-4 w-6" }: { locale: Locale; className?: string }) {
  const cls = `${className} shrink-0 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]`;
  if (locale === "mn") return <MN className={cls} />;
  if (locale === "en") return <GB className={cls} />;
  return <KR className={cls} />;
}

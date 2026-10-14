import type { ReactNode } from "react";

/** Админ самбарын нийтлэг загварууд */
export const input =
  "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/15";
export const label = "block text-[13px] font-semibold text-foreground";
export const btn = {
  primary:
    "inline-flex h-9 items-center justify-center gap-2 rounded-md bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-strong disabled:opacity-60",
  secondary:
    "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 text-[13px] font-semibold text-foreground transition-colors hover:border-primary/40 disabled:opacity-60",
  danger:
    "inline-flex h-9 items-center justify-center gap-2 rounded-md px-3.5 text-[13px] font-semibold text-signal transition-colors hover:bg-signal/10 disabled:opacity-60",
  small:
    "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-3 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 disabled:opacity-50",
};

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="font-display text-xl font-bold tracking-[-0.01em] text-foreground sm:text-2xl">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-[13px] text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-border bg-surface shadow-[0_1px_3px_rgb(16_24_40/0.06)] ${className}`}>{children}</div>;
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-lg border border-dashed border-border bg-surface px-6 py-12 text-center text-sm text-muted">{children}</p>;
}

const tones = {
  green: "bg-accent-soft text-primary",
  lime: "bg-lime/25 text-primary",
  solid: "bg-accent text-white",
  red: "bg-signal/10 text-signal",
  gray: "bg-background text-muted",
};

export function Pill({ tone = "gray", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("mn", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));

/** Хэрэглэгчийн зураг — зураггүй бол нэрийн эхний үсэг */
export function Avatar({ url, name, size = 36 }: { url?: string | null; name?: string | null; size?: number }) {
  const initial = (name?.trim()[0] ?? "?").toUpperCase();
  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-full bg-accent-soft font-semibold text-primary"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.4) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Supabase Storage-ийн жижиг зураг */}
      {url ? <img src={url} alt="" className="size-full object-cover" /> : initial}
    </span>
  );
}

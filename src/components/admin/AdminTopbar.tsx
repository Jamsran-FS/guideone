"use client";

import { ExternalLink, LogOut } from "lucide-react";
import { useSyncExternalStore } from "react";
import ThemeToggle, { type Theme } from "./ThemeToggle";
import { Avatar } from "./ui";

const weekdays = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];
const pad = (n: number) => String(n).padStart(2, "0");

/** 15 секунд тутам шинэчлэгдэх цаг (сервер дээр null — hydration зөрөхгүй) */
const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 15_000);
  return () => clearInterval(id);
};
const minuteSnapshot = () => Math.floor(Date.now() / 60_000);

function Clock() {
  const minute = useSyncExternalStore(subscribe, minuteSnapshot, () => null);
  if (minute === null) return <div className="h-10" aria-hidden />;
  const now = new Date(minute * 60_000);
  return (
    <div>
      <p className="text-xs font-medium text-muted">
        {weekdays[now.getDay()]} гараг, {now.getFullYear()}-{pad(now.getMonth() + 1)}-{pad(now.getDate())}
      </p>
      <p className="font-display text-xl font-bold leading-tight tracking-tight text-foreground tabular-nums">
        {pad(now.getHours())}:{pad(now.getMinutes())}
      </p>
    </div>
  );
}

type Props = { name: string; email: string; avatarUrl?: string | null; theme: Theme; logout: () => Promise<void> };

export default function AdminTopbar({ name, email, avatarUrl, theme, logout }: Props) {
  const iconBtn =
    "grid size-9 place-items-center rounded-md border border-border bg-surface text-foreground/80 transition hover:border-primary/40 hover:text-foreground";

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">
        <Clock />
        <div className="flex items-center gap-3">
          <a href="/mn" target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-surface px-3.5 text-[13px] font-medium text-foreground/80 transition hover:border-primary/40 hover:text-foreground">
            <ExternalLink className="size-4" aria-hidden /> <span className="hidden sm:inline">Сайт үзэх</span>
          </a>
          <ThemeToggle initial={theme} />
          <form action={logout}>
            <button className={iconBtn} aria-label="Гарах" title="Гарах">
              <LogOut className="size-4" aria-hidden />
            </button>
          </form>
          <div className="flex items-center gap-3 pl-1">
            <Avatar url={avatarUrl} name={name} />
            <span className="hidden leading-tight md:block">
              <span className="block text-sm font-semibold text-foreground">{name}</span>
              <span className="block text-xs text-muted">{email}</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

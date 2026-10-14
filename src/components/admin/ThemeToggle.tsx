"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

/** Админ/багшийн самбарын өнгө — cookie-д хадгалж, layout нь сервер дээрээ зөв theme-ээр render хийнэ */
export const THEME_COOKIE = "g1_theme";
export type Theme = "light" | "dark";

export default function ThemeToggle({ initial, className = "" }: { initial: Theme; className?: string }) {
  const [theme, setTheme] = useState<Theme>(initial);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
        setTheme(next);
      }}
      aria-label={next === "dark" ? "Харанхуй горим" : "Гэрэлтэй горим"}
      title={next === "dark" ? "Харанхуй горим" : "Гэрэлтэй горим"}
      className={`grid size-9 place-items-center rounded-md border border-border bg-surface text-foreground/80 transition hover:border-primary/40 hover:text-foreground ${className}`}
    >
      {theme === "dark" ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
    </button>
  );
}

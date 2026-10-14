import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "@fontsource/noto-sans-kr/korean-400.css";
import "@fontsource/noto-sans-kr/korean-700.css";
import "../globals.css";
import { logoutAction } from "@/lib/actions/auth";
import { getCurrentUser } from "@/lib/session";
import { homePath } from "@/lib/session-cookies";
import Logo from "@/components/layout/Logo";
import ThemeToggle, { THEME_COOKIE } from "@/components/admin/ThemeToggle";

export const metadata: Metadata = {
  title: { default: "Багшийн самбар | GuideOne", template: "%s | GuideOne багш" },
  robots: { index: false, follow: false },
};

/** /teacher/* — зөвхөн role = teacher */
export default async function TeacherLayout({ children }: LayoutProps<"/teacher">) {
  const me = await getCurrentUser();
  if (!me) redirect("/mn/login?next=/teacher");
  if (me.role !== "teacher") redirect(homePath(me.role, "mn"));
  const theme = (await cookies()).get(THEME_COOKIE)?.value === "dark" ? "dark" : "light";

  const link = "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-background hover:text-foreground";

  return (
    <html lang="mn" data-theme={theme}>
      <body className="min-h-dvh bg-[var(--panel-bg)] text-foreground">
        <header className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
            <Logo href="/teacher" label="GuideOne багшийн самбар" tagline="Багшийн самбар" />
            <nav className="flex items-center gap-1">
              <Link href="/teacher" className={link}>
                Миний ангиуд
              </Link>
              <a href="/mn" target="_blank" rel="noreferrer" className={`${link} hidden sm:inline-flex`}>
                <ExternalLink className="size-4" aria-hidden /> Сайт
              </a>
              <ThemeToggle initial={theme} className="mx-1" />
              <form action={logoutAction.bind(null, "mn")}>
                <button className={link} aria-label="Гарах">
                  <LogOut className="size-4" aria-hidden />
                  <span className="hidden sm:inline">{me.full_name || "Гарах"}</span>
                </button>
              </form>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 lg:py-10">{children}</main>
      </body>
    </html>
  );
}

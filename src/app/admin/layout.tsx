import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "@fontsource/noto-sans-kr/korean-400.css";
import "@fontsource/noto-sans-kr/korean-700.css";
import "../globals.css";
import { logoutAction } from "@/lib/actions/auth";
import { getCurrentUser } from "@/lib/session";
import { homePath } from "@/lib/session-cookies";
import AdminNav from "@/components/admin/AdminNav";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { THEME_COOKIE } from "@/components/admin/ThemeToggle";

export const metadata: Metadata = {
  title: { default: "Админ | GuideOne", template: "%s | GuideOne админ" },
  robots: { index: false, follow: false },
};

/** /admin/* — зөвхөн role = sysadmin. Нэвтрээгүй бол proxy.ts нэвтрэх хуудас руу шилжүүлнэ. */
export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const me = await getCurrentUser();
  if (!me) redirect("/mn/login?next=/admin");
  if (me.role !== "sysadmin") redirect(homePath(me.role, "mn"));
  const theme = (await cookies()).get(THEME_COOKIE)?.value === "dark" ? "dark" : "light";

  return (
    <html lang="mn" data-theme={theme}>
      <body className="min-h-dvh bg-[var(--panel-bg)] text-foreground">
        <div className="lg:flex">
          <AdminNav />
          <div className="min-w-0 flex-1">
            <AdminTopbar name={me.full_name || "Sysadmin"} email={me.email ?? ""} avatarUrl={me.avatar_url} theme={theme} logout={logoutAction.bind(null, "mn")} />
            <main className="px-4 py-5 sm:px-6 lg:py-6 xl:px-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

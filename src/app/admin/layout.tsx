import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: { default: "Админ | GuideOne", template: "%s | GuideOne админ" },
  robots: { index: false, follow: false },
};

/** /admin/* — зөвхөн role = sysadmin. Нэвтрээгүй бол proxy.ts нэвтрэх хуудас руу шилжүүлнэ. */
export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const me = await getCurrentUser();
  if (!me) redirect("/mn/login?next=/admin");
  if (me.role !== "sysadmin") redirect(homePath(me.role, "mn"));

  return (
    <html lang="mn">
      <body className="min-h-dvh bg-background">
        <div className="lg:flex">
          <AdminNav name={me.full_name || me.email || ""} logout={logoutAction.bind(null, "mn")} />
          <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}

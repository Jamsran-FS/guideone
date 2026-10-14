import Link from "next/link";
import { Pencil, UserPlus } from "lucide-react";
import { api } from "@/lib/api";
import { getAccessToken, getCurrentUser } from "@/lib/session";
import type { Profile } from "@/lib/session-cookies";
import { RoleSelect } from "@/components/admin/RowControls";
import { Avatar, btn, Empty, formatDate, PageHeader, Panel } from "@/components/admin/ui";

export const metadata = { title: "Хэрэглэгчид" };

export default async function Users() {
  const [rows, me] = await Promise.all([api<Profile[]>("/api/admin/users", { token: await getAccessToken() }), getCurrentUser()]);

  return (
    <>
      <PageHeader
        title="Хэрэглэгчид"
        description="Суралцагч, багш, sysadmin-ууд. Шинэ багш эсвэл суралцагчийг энд үүсгэж, эрхийг нь сольж болно."
        action={
          <Link href="/admin/users/new" className={btn.primary}>
            <UserPlus className="size-4" aria-hidden /> Шинэ хэрэглэгч
          </Link>
        }
      />
      {rows.length === 0 ? (
        <Empty>Бүртгэлтэй хэрэглэгч алга.</Empty>
      ) : (
        <Panel className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-background/70 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Нэр</th>
                <th className="px-5 py-3 font-semibold">Холбоо барих</th>
                <th className="px-5 py-3 font-semibold">Бүртгүүлсэн</th>
                <th className="px-5 py-3 font-semibold">Эрх</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((u) => (
                <tr key={u.id} className="align-middle">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar url={u.avatar_url} name={u.full_name || u.email} />
                      <div>
                        <p className="font-semibold text-foreground">{u.full_name || "—"}</p>
                        {u.id === me?.id && <p className="text-xs text-accent">Та</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p>{u.email}</p>
                    {u.phone && <p className="text-muted">{u.phone}</p>}
                  </td>
                  <td className="px-5 py-4 text-muted">{formatDate(u.created_at)}</td>
                  <td className="px-5 py-4">
                    <RoleSelect id={u.id} role={u.role} disabled={u.id === me?.id} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/admin/users/${u.id}`} className={btn.small}>
                      <Pencil className="size-3.5" aria-hidden /> Засах
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}
    </>
  );
}

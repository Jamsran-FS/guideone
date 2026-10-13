import { api } from "@/lib/api";
import { getAccessToken, getCurrentUser } from "@/lib/session";
import type { Profile } from "@/lib/session-cookies";
import { RoleSelect } from "@/components/admin/RowControls";
import { Empty, formatDate, PageHeader, Panel } from "@/components/admin/ui";

export const metadata = { title: "Хэрэглэгчид" };

export default async function Users() {
  const [rows, me] = await Promise.all([api<Profile[]>("/api/admin/users", { token: await getAccessToken() }), getCurrentUser()]);

  return (
    <>
      <PageHeader title="Хэрэглэгчид" description="Бүртгэлтэй суралцагчид ба админууд. Шинэ админыг энд эрх өгч томилно." />
      {rows.length === 0 ? (
        <Empty>Бүртгэлтэй хэрэглэгч алга.</Empty>
      ) : (
        <Panel className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Нэр</th>
                <th className="px-5 py-3 font-semibold">Холбоо барих</th>
                <th className="px-5 py-3 font-semibold">Эцэг эх</th>
                <th className="px-5 py-3 font-semibold">Бүртгүүлсэн</th>
                <th className="px-5 py-3 font-semibold">Эрх</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((u) => (
                <tr key={u.id} className="align-top">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-foreground">{u.full_name || "—"}</p>
                    {u.korean_level && <p className="text-xs text-muted">Түвшин: {u.korean_level}</p>}
                  </td>
                  <td className="px-5 py-4">
                    <p>{u.email}</p>
                    <p className="text-muted">{u.phone}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p>{u.parent_name || "—"}</p>
                    <p className="text-muted">{u.parent_phone}</p>
                  </td>
                  <td className="px-5 py-4 text-muted">{formatDate(u.created_at)}</td>
                  <td className="px-5 py-4">
                    <RoleSelect id={u.id} role={u.role} disabled={u.id === me?.id} />
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

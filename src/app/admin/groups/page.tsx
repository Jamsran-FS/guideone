import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { tr } from "@/i18n/config";
import { api } from "@/lib/api";
import { countOf, type Group } from "@/lib/lms";
import { getAccessToken } from "@/lib/session";
import { btn, Empty, PageHeader, Panel, Pill } from "@/components/admin/ui";

export const metadata = { title: "Ангиуд" };

type GroupRow = Group & { enrollments: { count: number }[] };

export default async function Groups() {
  const groups = await api<GroupRow[]>("/api/admin/groups", { token: await getAccessToken() });

  return (
    <>
      <PageHeader
        title="Ангиуд"
        description="Анги бүрт багш оноож, суралцагчдыг элсүүлнэ. Багш зөвхөн өөрийн ангийн суралцагчдыг харна."
        action={
          <Link href="/admin/groups/new" className={btn.primary}>
            <Plus className="size-4" aria-hidden /> Шинэ анги
          </Link>
        }
      />
      {groups.length === 0 ? (
        <Empty>Одоогоор анги алга. &quot;Шинэ анги&quot; дарж үүсгээрэй.</Empty>
      ) : (
        <Panel className="divide-y divide-border">
          {groups.map((g) => (
            <Link key={g.id} href={`/admin/groups/${g.id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-background">
              <span className="min-w-0">
                <span className="block truncate font-semibold text-foreground">{g.name}</span>
                <span className="block truncate text-sm text-muted">
                  {[g.teacher ? `Багш: ${g.teacher.full_name || g.teacher.email}` : "Багш оноогоогүй", g.course && tr(g.course.name, "mn")]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <Pill tone="green">{countOf(g.enrollments)} суралцагч</Pill>
                {!g.is_active && <Pill>Хаагдсан</Pill>}
                <ArrowRight className="size-4 text-muted" aria-hidden />
              </span>
            </Link>
          ))}
        </Panel>
      )}
    </>
  );
}

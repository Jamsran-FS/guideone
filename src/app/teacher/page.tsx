import Link from "next/link";
import { ArrowRight, CalendarDays, Users } from "lucide-react";
import { tr } from "@/i18n/config";
import { api } from "@/lib/api";
import { countOf, type Group } from "@/lib/lms";
import { getAccessToken } from "@/lib/session";
import { Empty, PageHeader, Pill } from "@/components/admin/ui";

type GroupRow = Group & { enrollments: { count: number }[] };

export default async function TeacherHome() {
  const groups = await api<GroupRow[]>("/api/teacher/groups", { token: await getAccessToken() });

  return (
    <>
      <PageHeader title="Миний ангиуд" description="Анги дээр дарж суралцагчдын жагсаалт, материал, зар, шалгалтын дүнг удирдана." />
      {groups.length === 0 ? (
        <Empty>Танд одоогоор анги оноогоогүй байна. Sysadmin-д хандана уу.</Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <Link key={g.id} href={`/teacher/groups/${g.id}`} className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/40">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-lg font-bold text-foreground">{g.name}</h2>
                {!g.is_active && <Pill>Хаагдсан</Pill>}
              </div>
              {g.course && <p className="mt-1 text-sm text-accent">{tr(g.course.name, "mn")}</p>}
              <div className="mt-5 flex flex-1 flex-wrap items-end gap-x-5 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-4" aria-hidden /> {countOf(g.enrollments)} суралцагч
                </span>
                {g.start_date && (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-4" aria-hidden /> {g.start_date}
                    {g.end_date && ` – ${g.end_date}`}
                  </span>
                )}
                <ArrowRight className="ml-auto size-4 transition group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

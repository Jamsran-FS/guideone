import Link from "next/link";
import { tr, type Localized } from "@/i18n/config";
import { accountCopy } from "@/data/home";
import { api } from "@/lib/api";
import { enrollmentStatusLabel, formatMoney, paymentStatusLabel, type EnrollmentStatus, type PaymentStatus } from "@/lib/lms";
import { getAccessToken } from "@/lib/session";
import { Empty, PageHeader, Panel, Pill } from "@/components/admin/ui";

export const metadata = { title: "Суралцагчид" };

type Student = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  parent_name: string;
  parent_phone: string;
  korean_level: string;
  enrollments: {
    id: number;
    status: EnrollmentStatus;
    payment_status: PaymentStatus;
    amount_due: number;
    amount_paid: number;
    group: { id: number; name: string } | null;
  }[];
  exam_results: { score: number | null; exam: { id: number; title: string; max_score: number; exam_date: string | null } | null }[];
  applications: {
    id: number;
    program: keyof typeof accountCopy.programs;
    status: keyof typeof accountCopy.statuses;
    course: { name: Localized } | null;
    partner: { name: Localized } | null;
  }[];
};

const paymentTone = { paid: "green", partial: "lime", unpaid: "red" } as const;

export default async function Students({ searchParams }: PageProps<"/admin/students">) {
  const { filter } = await searchParams;
  const all = await api<Student[]>("/api/admin/students", { token: await getAccessToken() });
  const activeOnly = filter === "active";
  const students = activeOnly ? all.filter((s) => s.enrollments.some((e) => e.status === "active")) : all;

  const tab = (active: boolean) =>
    `rounded-md px-3.5 py-1.5 text-sm font-semibold ${active ? "bg-accent text-white" : "border border-border bg-surface text-foreground hover:border-primary/40"}`;

  return (
    <>
      <PageHeader
        title="Суралцагчид"
        description="Суралцагч бүрийн анги, төлбөр, шалгалтын дүн, хүсэж буй сургууль. Төлбөрийг “Ангиуд” хэсгээс засна."
      />
      <div className="mb-5 flex gap-2">
        <Link href="/admin/students" className={tab(!activeOnly)}>
          Бүгд ({all.length})
        </Link>
        <Link href="/admin/students?filter=active" className={tab(activeOnly)}>
          Идэвхтэй суралцаж буй
        </Link>
      </div>

      {students.length === 0 ? (
        <Empty>Суралцагч олдсонгүй.</Empty>
      ) : (
        <Panel className="divide-y divide-border">
          {students.map((s) => (
            <article key={s.id} className="grid gap-5 p-5 lg:grid-cols-[240px_1fr_1fr_1fr]">
              <div className="min-w-0">
                <p className="font-semibold text-foreground">{s.full_name || "—"}</p>
                <p className="truncate text-sm text-muted">{s.email}</p>
                <p className="text-sm text-muted">{s.phone}</p>
                {s.parent_name && (
                  <p className="mt-1 text-xs text-muted">
                    Эцэг эх: {s.parent_name} {s.parent_phone}
                  </p>
                )}
                {s.korean_level && <p className="mt-1 text-xs text-muted">Түвшин: {s.korean_level}</p>}
              </div>

              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted">Анги · Төлбөр</p>
                {s.enrollments.length === 0 ? (
                  <p className="text-sm text-muted">Ангид элсээгүй</p>
                ) : (
                  <ul className="space-y-2">
                    {s.enrollments.map((e) => (
                      <li key={e.id} className="text-sm">
                        <Link href={`/admin/groups/${e.group?.id}`} className="font-medium text-foreground hover:text-accent">
                          {e.group?.name}
                        </Link>
                        <span className="mt-0.5 flex flex-wrap items-center gap-1.5">
                          <Pill tone={e.status === "active" ? "green" : "gray"}>{enrollmentStatusLabel[e.status]}</Pill>
                          <Pill tone={paymentTone[e.payment_status]}>{paymentStatusLabel[e.payment_status]}</Pill>
                          {e.amount_due > 0 && (
                            <span className="text-xs text-muted">
                              {formatMoney(e.amount_paid)} / {formatMoney(e.amount_due)}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted">Шалгалтын дүн</p>
                {s.exam_results.length === 0 ? (
                  <p className="text-sm text-muted">Дүн алга</p>
                ) : (
                  <ul className="space-y-1 text-sm">
                    {s.exam_results.map((r, i) => (
                      <li key={r.exam?.id ?? i} className="flex justify-between gap-3">
                        <span className="truncate text-foreground">{r.exam?.title}</span>
                        <span className="shrink-0 font-semibold text-primary">
                          {r.score ?? "—"} / {r.exam?.max_score}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted">Хүсэж буй сургууль / хөтөлбөр</p>
                {s.applications.length === 0 ? (
                  <p className="text-sm text-muted">Өргөдөл алга</p>
                ) : (
                  <ul className="space-y-1.5 text-sm">
                    {s.applications.map((a) => (
                      <li key={a.id}>
                        <span className="text-foreground">{(a.partner ?? a.course) ? tr((a.partner ?? a.course)!.name, "mn") : tr(accountCopy.programs[a.program], "mn")}</span>
                        <span className="ml-1.5 text-xs text-muted">· {tr(accountCopy.statuses[a.status], "mn")}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </Panel>
      )}
    </>
  );
}

import { CalendarDays, Download, ExternalLink, Megaphone, Phone, UserRound } from "lucide-react";
import { tr, type Locale, type Localized } from "@/i18n/config";
import { accountCopy as c } from "@/data/home";
import type { Announcement, EnrollmentStatus, Exam, Material, PaymentStatus } from "@/lib/lms";

export type Dashboard = {
  enrollments: {
    id: number;
    status: EnrollmentStatus;
    payment_status: PaymentStatus;
    amount_due: number;
    amount_paid: number;
    group: {
      id: number;
      name: string;
      description: string;
      start_date: string | null;
      end_date: string | null;
      course: { name: Localized } | null;
      teacher: { full_name: string; email: string | null; phone: string } | null;
    } | null;
  }[];
  materials: Material[];
  announcements: Announcement[];
  exams: Exam[];
};

const paymentTone: Record<PaymentStatus, string> = {
  paid: "bg-accent-soft text-primary",
  partial: "bg-lime/25 text-primary",
  unpaid: "bg-signal/10 text-signal",
};

const card = "rounded-[24px] border border-border bg-surface p-6 sm:p-8";
const h2 = "font-display text-xl font-bold text-foreground";
const pill = "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";

/** Суралцагчийн анги, багшийн зар, материал, шалгалтын дүн */
export default function StudentDashboard({ lang, data }: { lang: Locale; data: Dashboard }) {
  const date = new Intl.DateTimeFormat(lang, { dateStyle: "medium" });
  const money = new Intl.NumberFormat(lang);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      {/* ── Ангиуд ── */}
      <div className={`${card} lg:col-span-12`}>
        <h2 className={h2}>{tr(c.classesTitle, lang)}</h2>
        {data.enrollments.length === 0 ? (
          <p className="mt-3 text-sm text-muted">{tr(c.noClasses, lang)}</p>
        ) : (
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {data.enrollments.map((e) => (
              <li key={e.id} className="rounded-2xl border border-border bg-background p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{e.group?.name}</p>
                    {e.group?.course && <p className="text-sm text-accent">{tr(e.group.course.name, lang)}</p>}
                  </div>
                  <span className={`${pill} ${e.status === "active" ? "bg-accent text-white" : "bg-surface text-muted"}`}>
                    {tr(c.enrollmentStatuses[e.status], lang)}
                  </span>
                </div>
                <dl className="mt-4 grid gap-2 text-sm">
                  {e.group?.teacher && (
                    <div className="flex flex-wrap items-center gap-x-2">
                      <dt className="inline-flex items-center gap-1.5 text-muted">
                        <UserRound className="size-4" aria-hidden /> {tr(c.teacher, lang)}:
                      </dt>
                      <dd className="text-foreground">
                        {e.group.teacher.full_name}
                        {e.group.teacher.phone && (
                          <a href={`tel:${e.group.teacher.phone.replace(/[\s-]/g, "")}`} className="ml-2 inline-flex items-center gap-1 text-accent hover:underline">
                            <Phone className="size-3" aria-hidden /> {e.group.teacher.phone}
                          </a>
                        )}
                      </dd>
                    </div>
                  )}
                  {e.group?.start_date && (
                    <div className="flex items-center gap-x-2">
                      <dt className="inline-flex items-center gap-1.5 text-muted">
                        <CalendarDays className="size-4" aria-hidden /> {tr(c.period, lang)}:
                      </dt>
                      <dd className="text-foreground">
                        {date.format(new Date(e.group.start_date))}
                        {e.group.end_date && ` – ${date.format(new Date(e.group.end_date))}`}
                      </dd>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <dt className="text-muted">{tr(c.payment, lang)}:</dt>
                    <dd className="flex flex-wrap items-center gap-2">
                      <span className={`${pill} ${paymentTone[e.payment_status]}`}>{tr(c.paymentStatuses[e.payment_status], lang)}</span>
                      {e.amount_due > 0 && (
                        <span className="text-muted">
                          {tr(c.paid, lang)} {money.format(e.amount_paid)}₮ / {money.format(e.amount_due)}₮
                        </span>
                      )}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Зар ── */}
      <div className={`${card} lg:col-span-5`}>
        <h2 className={h2}>{tr(c.announcementsTitle, lang)}</h2>
        {data.announcements.length === 0 ? (
          <p className="mt-3 text-sm text-muted">{tr(c.noAnnouncements, lang)}</p>
        ) : (
          <ul className="mt-4 max-h-[480px] divide-y divide-border overflow-y-auto">
            {data.announcements.map((a) => (
              <li key={a.id} className="py-4">
                <p className="flex items-start gap-2 font-semibold text-foreground">
                  <Megaphone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /> {a.title}
                </p>
                {a.body && <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-foreground/85">{a.body}</p>}
                <p className="mt-1.5 text-xs text-muted">
                  {a.group?.name} · {date.format(new Date(a.created_at))}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Шалгалт ба дүн ── */}
      <div className={`${card} lg:col-span-7`}>
        <h2 className={h2}>{tr(c.examsTitle, lang)}</h2>
        {data.exams.length === 0 ? (
          <p className="mt-3 text-sm text-muted">{tr(c.noExams, lang)}</p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {data.exams.map((exam) => {
              const result = exam.exam_results[0];
              const graded = result?.score !== undefined && result?.score !== null;
              const upcoming = exam.exam_date !== null && exam.exam_date >= today && !graded;
              return (
                <li key={exam.id} className="flex items-start justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">{exam.title}</p>
                    <p className="text-sm text-muted">
                      {exam.group?.name} · {exam.exam_date ? date.format(new Date(exam.exam_date)) : tr(c.dateTbd, lang)}
                    </p>
                    {exam.description && <p className="mt-1 whitespace-pre-line text-sm text-foreground/85">{exam.description}</p>}
                    {result?.comment && <p className="mt-1 text-sm italic text-primary">“{result.comment}”</p>}
                  </div>
                  <div className="shrink-0 text-right">
                    {graded ? (
                      <p className="font-display text-2xl font-bold text-primary">
                        {result.score}
                        <span className="text-sm font-medium text-muted"> / {exam.max_score}</span>
                      </p>
                    ) : (
                      <span className={`${pill} ${upcoming ? "bg-lime/25 text-primary" : "bg-background text-muted"}`}>
                        {tr(upcoming ? c.upcoming : c.notGraded, lang)}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ── Материал ── */}
      <div className={`${card} lg:col-span-12`}>
        <h2 className={h2}>{tr(c.materialsTitle, lang)}</h2>
        {data.materials.length === 0 ? (
          <p className="mt-3 text-sm text-muted">{tr(c.noMaterials, lang)}</p>
        ) : (
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {data.materials.map((m) => (
              <li key={m.id} className="flex flex-col rounded-2xl border border-border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-foreground">{m.title}</p>
                  <span className={`${pill} bg-accent-soft text-primary`}>{tr(c.materialKinds[m.kind], lang)}</span>
                </div>
                {m.description && <p className="mt-1 text-sm text-muted">{m.description}</p>}
                <div className="mt-3 flex flex-1 flex-wrap items-end gap-4 text-sm">
                  {m.file_url && (
                    <a href={m.file_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline">
                      <Download className="size-4" aria-hidden /> {tr(c.download, lang)}
                      {m.file_name && <span className="max-w-48 truncate font-normal text-muted">({m.file_name})</span>}
                    </a>
                  )}
                  {m.link_url && (
                    <a href={m.link_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline">
                      <ExternalLink className="size-4" aria-hidden /> {tr(c.openLink, lang)}
                    </a>
                  )}
                  <span className="ml-auto text-xs text-muted">
                    {m.group?.name} · {date.format(new Date(m.created_at))}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

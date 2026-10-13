import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { hasLocale, tr, type Localized } from "@/i18n/config";
import { accountCopy as c } from "@/data/home";
import { api } from "@/lib/api";
import { logoutAction } from "@/lib/actions/auth";
import { getContent } from "@/lib/content";
import { getAccessToken, getCurrentUser } from "@/lib/session";
import { homePath } from "@/lib/session-cookies";
import ApplicationForm from "@/components/account/ApplicationForm";
import ProfileForm from "@/components/account/ProfileForm";
import StudentDashboard, { type Dashboard } from "@/components/account/StudentDashboard";
import Container from "@/components/ui/Container";

type Status = keyof typeof c.statuses;
type ApplicationRow = {
  id: number;
  program: keyof typeof c.programs;
  status: Status;
  message: string;
  admin_note: string;
  created_at: string;
  course: { name: Localized } | null;
  partner: { name: Localized } | null;
};

const statusTone: Record<Status, string> = {
  new: "bg-accent-soft text-primary",
  in_review: "bg-lime/25 text-primary",
  accepted: "bg-accent text-white",
  rejected: "bg-signal/10 text-signal",
  cancelled: "bg-background text-muted",
};

export async function generateMetadata({ params }: PageProps<"/[lang]/account">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: tr(c.title, lang), robots: { index: false, follow: false } };
}

export default async function AccountPage({ params }: PageProps<"/[lang]/account">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const me = await getCurrentUser();
  if (!me) redirect(`/${lang}/login?next=/${lang}/account`);

  const token = await getAccessToken();
  const emptyDashboard: Dashboard = { enrollments: [], materials: [], announcements: [], exams: [] };
  const [applications, dashboard, { courses, partners }] = await Promise.all([
    api<ApplicationRow[]>("/api/me/applications", { token }).catch(() => [] as ApplicationRow[]),
    api<Dashboard>("/api/me/dashboard", { token }).catch(() => emptyDashboard),
    getContent(),
  ]);
  const options = <T extends { id?: number; name: Localized }>(list: T[]) =>
    list.filter((x) => x.id !== undefined).map((x) => ({ id: x.id!, name: tr(x.name, lang) }));
  const date = new Intl.DateTimeFormat(lang, { dateStyle: "medium" });
  const card = "rounded-[24px] border border-border bg-surface p-6 sm:p-8";

  return (
    <>
      <section className="bg-primary text-white">
        <Container className="flex flex-col justify-between gap-6 pb-12 pt-32 sm:flex-row sm:items-end lg:pt-36">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime">{tr(c.title, lang)}</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
              {tr(c.hello, lang)}, {me.full_name || me.email}
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {me.role !== "student" && (
              <Link href={homePath(me.role, lang)} className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-primary hover:bg-accent-soft">
                <LayoutDashboard className="size-4" aria-hidden /> {tr(c.adminLink, lang)}
              </Link>
            )}
            <form action={logoutAction.bind(null, lang)}>
              <button className="inline-flex h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10">
                <LogOut className="size-4" aria-hidden /> {tr(c.logout, lang)}
              </button>
            </form>
          </div>
        </Container>
      </section>

      <section className="bg-background py-12 lg:py-16">
        <Container className="grid gap-6 lg:grid-cols-12">
          <StudentDashboard lang={lang} data={dashboard} />

          <div className={`${card} lg:col-span-7`}>
            <h2 className="font-display text-xl font-bold text-foreground">{tr(c.applyTitle, lang)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{tr(c.applyText, lang)}</p>
            <div className="mt-6">
              <ApplicationForm lang={lang} courses={options(courses)} partners={options(partners)} />
            </div>
          </div>

          <div className={`${card} lg:col-span-5`}>
            <h2 className="font-display text-xl font-bold text-foreground">{tr(c.listTitle, lang)}</h2>
            {applications.length === 0 ? (
              <p className="mt-4 text-sm text-muted">{tr(c.empty, lang)}</p>
            ) : (
              <ul className="mt-4 divide-y divide-border">
                {applications.map((a) => (
                  <li key={a.id} className="py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground">{tr(c.programs[a.program], lang)}</p>
                        {(a.course || a.partner) && (
                          <p className="text-sm text-muted">{tr((a.course ?? a.partner)!.name, lang)}</p>
                        )}
                        <p className="mt-1 text-xs text-muted">{date.format(new Date(a.created_at))}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone[a.status]}`}>
                        {tr(c.statuses[a.status], lang)}
                      </span>
                    </div>
                    {a.admin_note && (
                      <p className="mt-3 rounded-xl bg-background p-3 text-sm text-foreground">
                        <span className="font-semibold">{tr(c.adminNote, lang)}:</span> {a.admin_note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={`${card} lg:col-span-12`}>
            <h2 className="font-display text-xl font-bold text-foreground">{tr(c.profileTitle, lang)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{tr(c.profileText, lang)}</p>
            <div className="mt-6 max-w-3xl">
              <ProfileForm lang={lang} profile={me} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

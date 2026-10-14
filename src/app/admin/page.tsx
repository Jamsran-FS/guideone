import Link from "next/link";
import { ArrowRight, FileText, GraduationCap, Inbox, Presentation, Wallet, type LucideIcon } from "lucide-react";
import { api } from "@/lib/api";
import { resources } from "@/lib/admin-resources";
import { formatMoney } from "@/lib/lms";
import { getAccessToken } from "@/lib/session";
import { Panel } from "@/components/admin/ui";

type Stats = {
  payments: { paid: number; due: number; outstanding: number; unpaidCount: number };
  students: { total: number; active: number; notEnrolled: number };
  applications: { open: number; languageCourse: number; schoolPlacement: number; accepted: number };
  requests: { new: number; contacted: number; total: number };
  groups: { active: number; total: number; teachers: number };
};

const tones = {
  sky: { label: "text-sky-600 dark:text-sky-400", icon: "bg-sky-50 text-sky-600 dark:bg-sky-400/15 dark:text-sky-400" },
  emerald: { label: "text-emerald-600 dark:text-emerald-400", icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400" },
  rose: { label: "text-rose-600 dark:text-rose-400", icon: "bg-rose-50 text-rose-600 dark:bg-rose-400/15 dark:text-rose-400" },
  amber: { label: "text-amber-600 dark:text-amber-400", icon: "bg-amber-50 text-amber-600 dark:bg-amber-400/15 dark:text-amber-400" },
  indigo: { label: "text-indigo-600 dark:text-indigo-400", icon: "bg-indigo-50 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-400" },
};

type Card = {
  href: string;
  label: string;
  icon: LucideIcon;
  tone: keyof typeof tones;
  value: string;
  unit?: string;
  rows: [string, string | number][];
};

export default async function AdminHome() {
  const s = await api<Stats>("/api/admin/stats", { token: await getAccessToken() });

  const cards: Card[] = [
    {
      href: "/admin/groups",
      label: "Нийт орлого",
      icon: Wallet,
      tone: "sky",
      value: formatMoney(s.payments.paid),
      rows: [
        ["Төлөх ёстой (идэвхтэй)", formatMoney(s.payments.due)],
        [`Дутуу · ${s.payments.unpaidCount} элсэлт`, formatMoney(s.payments.outstanding)],
      ],
    },
    {
      href: "/admin/students?filter=active",
      label: "Идэвхтэй суралцагч",
      icon: GraduationCap,
      tone: "emerald",
      value: String(s.students.active),
      unit: "нийт",
      rows: [
        ["Бүртгэлтэй суралцагч", s.students.total],
        ["Ангид элсээгүй", s.students.notEnrolled],
      ],
    },
    {
      href: "/admin/requests",
      label: "Шинэ хүсэлт",
      icon: Inbox,
      tone: "rose",
      value: String(s.requests.new),
      unit: "нийт",
      rows: [
        ["Холбогдсон", s.requests.contacted],
        ["Нийт хүсэлт", s.requests.total],
      ],
    },
    {
      href: "/admin/applications",
      label: "Шийдвэрлэх өргөдөл",
      icon: FileText,
      tone: "amber",
      value: String(s.applications.open),
      unit: "нийт",
      rows: [
        ["Хэлний бэлтгэл", s.applications.languageCourse],
        ["Сургуульд зуучлал", s.applications.schoolPlacement],
      ],
    },
    {
      href: "/admin/groups",
      label: "Идэвхтэй анги",
      icon: Presentation,
      tone: "indigo",
      value: String(s.groups.active),
      unit: "нийт",
      rows: [
        ["Нийт анги", s.groups.total],
        ["Багш", s.groups.teachers],
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <Panel className="p-5 sm:p-6">
        <h1 className="font-display text-base font-bold text-foreground">Ерөнхий үзүүлэлтүүд</h1>
        <p className="mt-1 text-sm text-muted">Суралцагч, төлбөр, өргөдөл, хүсэлтийн бодит төлөв</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
          {cards.map(({ href, label, icon: Icon, tone, value, unit, rows }) => (
            <Link key={label} href={href} className="group rounded-md border border-border bg-surface p-5 transition hover:border-primary/30 hover:shadow-[0_10px_30px_-18px_rgb(10_74_48/0.35)]">
              <div className="flex items-start justify-between gap-3">
                <p className={`text-xs font-bold uppercase tracking-[0.08em] ${tones[tone].label}`}>{label}</p>
                <span className={`grid size-10 shrink-0 place-items-center rounded-full ${tones[tone].icon}`}>
                  <Icon className="size-5" aria-hidden />
                </span>
              </div>
              <p className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-bold leading-none tracking-tight text-foreground tabular-nums">{value}</span>
                {unit && <span className="text-xs font-medium text-muted">{unit}</span>}
              </p>
              <dl className="mt-4 space-y-1.5 text-[13px]">
                {rows.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3">
                    <dt className="text-muted">{k}</dt>
                    <dd className="font-semibold text-foreground tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
            </Link>
          ))}
        </div>
      </Panel>

      <Panel className="p-5 sm:p-6">
        <h2 className="font-display text-base font-bold text-foreground">Сайтын контент</h2>
        <p className="mt-1 text-sm text-muted">Нийтийн сайтад харагдах мэдээллийг засах</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <QuickLink href="/admin/content" title="Хуудасны текст" text="Hero, танилцуулга, холбоо барих мэдээлэл, footer" />
          {Object.entries(resources).map(([key, r]) => (
            <QuickLink key={key} href={`/admin/${key}`} title={r.title} text={r.description} />
          ))}
        </div>
      </Panel>
    </div>
  );
}

function QuickLink({ href, title, text }: { href: string; title: string; text: string }) {
  return (
    <Link href={href} className="group flex items-start justify-between gap-3 rounded-md border border-border px-4 py-3.5 transition hover:border-primary/30 hover:bg-background">
      <span className="min-w-0">
        <span className="block font-semibold text-foreground">{title}</span>
        <span className="line-clamp-2 text-sm text-muted">{text}</span>
      </span>
      <ArrowRight className="mt-1 size-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
    </Link>
  );
}

import Link from "next/link";
import { ArrowRight, FileText, GraduationCap, Inbox, Users, Wallet } from "lucide-react";
import { api } from "@/lib/api";
import { resources } from "@/lib/admin-resources";
import { getAccessToken } from "@/lib/session";
import { PageHeader, Panel } from "@/components/admin/ui";

type Stats = { newRequests: number; openApplications: number; students: number; activeStudents: number; unpaidEnrollments: number };

export default async function AdminHome() {
  const stats = await api<Stats>("/api/admin/stats", { token: await getAccessToken() });

  const cards = [
    { href: "/admin/requests", label: "Шинэ хүсэлт", hint: "Холбоо барих формоор ирсэн", value: stats.newRequests, icon: Inbox },
    { href: "/admin/applications", label: "Шийдвэрлэх өргөдөл", hint: "Хэлний бэлтгэл, сургуульд зуучлал", value: stats.openApplications, icon: FileText },
    { href: "/admin/students?filter=active", label: "Идэвхтэй суралцагч", hint: "Одоо ангид суралцаж буй", value: stats.activeStudents, icon: GraduationCap },
    { href: "/admin/groups", label: "Төлбөр дутуу", hint: "Идэвхтэй элсэлтээс бүрэн төлөөгүй", value: stats.unpaidEnrollments, icon: Wallet },
    { href: "/admin/students", label: "Бүртгэлтэй суралцагч", hint: "Сайтад бүртгүүлсэн бүх суралцагч", value: stats.students, icon: Users },
  ];

  return (
    <>
      <PageHeader title="Хянах самбар" description="Хүүхдүүдийг Солонгос сургуульд зуучлах, хэлний бэлтгэлд хамруулах ажлын тойм." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ href, label, hint, value, icon: Icon }) => (
          <Link key={href} href={href} className="group rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/40">
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon className="size-5" aria-hidden />
              </span>
              <ArrowRight className="size-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
            </div>
            <p className="mt-5 font-display text-4xl font-bold text-foreground">{value}</p>
            <p className="mt-1 font-semibold text-foreground">{label}</p>
            <p className="text-sm text-muted">{hint}</p>
          </Link>
        ))}
      </div>

      <h2 className="mb-4 mt-12 font-display text-lg font-bold text-foreground">Сайтын контент</h2>
      <Panel className="divide-y divide-border">
        <Link href="/admin/content" className="flex items-center justify-between px-5 py-4 hover:bg-background">
          <span>
            <span className="font-semibold text-foreground">Хуудасны текст</span>
            <span className="block text-sm text-muted">Hero, танилцуулга, холбоо барих мэдээлэл, footer г.м.</span>
          </span>
          <ArrowRight className="size-4 text-muted" aria-hidden />
        </Link>
        {Object.entries(resources).map(([key, r]) => (
          <Link key={key} href={`/admin/${key}`} className="flex items-center justify-between px-5 py-4 hover:bg-background">
            <span>
              <span className="font-semibold text-foreground">{r.title}</span>
              <span className="block text-sm text-muted">{r.description}</span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-muted" aria-hidden />
          </Link>
        ))}
      </Panel>
    </>
  );
}

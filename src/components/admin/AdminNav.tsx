"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CircleHelp,
  ExternalLink,
  FileText,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  MessageSquareQuote,
  PanelsTopLeft,
  Presentation,
  School,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import Logo from "../layout/Logo";

const groups: { title?: string; items: { href: string; label: string; icon: LucideIcon }[] }[] = [
  {
    items: [
      { href: "/admin", label: "Хянах самбар", icon: LayoutDashboard },
      { href: "/admin/requests", label: "Хүсэлтүүд", icon: Inbox },
      { href: "/admin/applications", label: "Өргөдлүүд", icon: FileText },
    ],
  },
  {
    title: "Сургалт",
    items: [
      { href: "/admin/students", label: "Суралцагчид", icon: GraduationCap },
      { href: "/admin/groups", label: "Ангиуд", icon: Presentation },
      { href: "/admin/users", label: "Хэрэглэгч, эрх", icon: Users },
    ],
  },
  {
    title: "Сайтын контент",
    items: [
      { href: "/admin/content", label: "Хуудасны текст", icon: PanelsTopLeft },
      { href: "/admin/courses", label: "Сургалт", icon: BookOpen },
      { href: "/admin/services", label: "Үйлчилгээ", icon: LayoutGrid },
      { href: "/admin/partners", label: "Хамтрагч сургууль", icon: School },
      { href: "/admin/teachers", label: "Багш нар", icon: UserRound },
      { href: "/admin/testimonials", label: "Сэтгэгдэл", icon: MessageSquareQuote },
      { href: "/admin/faqs", label: "Түгээмэл асуулт", icon: CircleHelp },
    ],
  },
];

export default function AdminNav({ name, logout }: { name: string; logout: () => Promise<void> }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));
  const item = (active: boolean) =>
    `flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
      active ? "bg-accent-soft text-primary" : "text-foreground/75 hover:bg-background hover:text-foreground"
    }`;

  return (
    <aside className="border-b border-border bg-surface lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64 lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between px-5 py-4 lg:py-6">
        <Logo href="/admin" label="GuideOne админ" compact />
        <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Sysadmin</span>
      </div>

      <nav aria-label="Админ цэс" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-y-auto lg:pb-0">
        {groups.map((g, i) => (
          <div key={i} className="flex gap-1 lg:mb-4 lg:flex-col">
            {g.title && <p className="hidden px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted lg:block">{g.title}</p>}
            {g.items.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={item(isActive(href))} aria-current={isActive(href) ? "page" : undefined}>
                <Icon className="size-4 shrink-0" aria-hidden />
                {label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-1 border-t border-border p-3 lg:block">
        <p className="hidden truncate px-3 pb-2 text-xs text-muted lg:block">{name}</p>
        <a href="/mn" target="_blank" rel="noreferrer" className={item(false)}>
          <ExternalLink className="size-4" aria-hidden /> Сайт үзэх
        </a>
        <form action={logout}>
          <button className={`${item(false)} w-full`}>
            <LogOut className="size-4" aria-hidden /> Гарах
          </button>
        </form>
      </div>
    </aside>
  );
}

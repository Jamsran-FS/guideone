"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CircleHelp,
  FileText,
  GraduationCap,
  Inbox,
  Languages,
  LayoutDashboard,
  LayoutGrid,
  Megaphone,
  MessageSquareQuote,
  PanelsTopLeft,
  Phone,
  Presentation,
  School,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

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
      { href: "/admin/notices", label: "Урсдаг зар", icon: Megaphone },
      { href: "/admin/contact", label: "Холбоо барих мэдээлэл", icon: Phone },
      { href: "/admin/courses", label: "Сургалт", icon: BookOpen },
      { href: "/admin/services", label: "Үйлчилгээ", icon: LayoutGrid },
      { href: "/admin/partners", label: "Хамтрагч сургууль", icon: School },
      { href: "/admin/language-schools", label: "Хэлний бэлтгэл", icon: Languages },
      { href: "/admin/teachers", label: "Багш нар", icon: UserRound },
      { href: "/admin/testimonials", label: "Сэтгэгдэл", icon: MessageSquareQuote },
      { href: "/admin/faqs", label: "Түгээмэл асуулт", icon: CircleHelp },
    ],
  },
];

export default function AdminNav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));
  const item = (active: boolean) =>
    `flex shrink-0 items-center gap-3 whitespace-nowrap rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
      active
        ? "border-accent/30 bg-accent-soft text-primary"
        : "border-transparent text-foreground/75 hover:bg-background hover:text-foreground"
    }`;

  return (
    <aside className="border-b border-border bg-surface lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64 lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r">
      <div className="px-5 py-3 lg:px-6 lg:pb-4 lg:pt-5">
        <Link href="/admin" aria-label="GuideOne удирдлагын самбар" className="block w-fit lg:mx-auto">
          <Image src="/logo-full.png" alt="GuideOne" width={1428} height={1101} priority sizes="160px" className="h-12 w-auto lg:h-auto lg:w-40" />
        </Link>
      </div>

      <nav aria-label="Админ цэс" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-y-auto lg:px-3 lg:pb-4">
        {groups.map((g, i) => (
          <div key={i} className="flex gap-0.5 lg:mb-4 lg:flex-col">
            {g.title && <p className="hidden px-3 pb-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted lg:block">{g.title}</p>}
            {g.items.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={item(isActive(href))} aria-current={isActive(href) ? "page" : undefined}>
                <Icon className="size-4 shrink-0" aria-hidden />
                {label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <p className="hidden py-4 text-center text-[11px] text-muted lg:block">GuideOne © {new Date().getFullYear()}</p>
    </aside>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { defaultSections, sectionLabels, type SectionKey } from "@/data/sections";
import { getAccessToken } from "@/lib/session";
import { formatDate, PageHeader, Panel, Pill } from "@/components/admin/ui";

export const metadata = { title: "Хуудасны текст" };

export default async function ContentList() {
  const rows = await api<{ key: string; updated_at: string }[]>("/api/admin/sections", { token: await getAccessToken() });
  const updated = new Map(rows.map((r) => [r.key, r.updated_at]));

  return (
    <>
      <PageHeader title="Хуудасны текст" description="Сайтын хэсэг бүрийн гарчиг, текст, товчнуудыг 3 хэлээр засна. Хадгалмагц сайт шууд шинэчлэгдэнэ." />
      <Panel className="divide-y divide-border">
        {(Object.keys(defaultSections) as SectionKey[]).map((key) => (
          <Link key={key} href={`/admin/content/${key}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-background">
            <span className="min-w-0">
              <span className="font-semibold text-foreground">{sectionLabels[key].title}</span>
              <span className="block truncate text-sm text-muted">{sectionLabels[key].text}</span>
            </span>
            <span className="flex shrink-0 items-center gap-3">
              {updated.has(key) ? (
                <span className="hidden text-xs text-muted sm:inline">{formatDate(updated.get(key)!)}</span>
              ) : (
                <Pill>Анхны текст</Pill>
              )}
              <ArrowRight className="size-4 text-muted" aria-hidden />
            </span>
          </Link>
        ))}
      </Panel>
    </>
  );
}

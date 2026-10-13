import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { defaultSections, isSectionKey, sectionLabels } from "@/data/sections";
import { api } from "@/lib/api";
import { deepMerge } from "@/lib/merge";
import { getAccessToken } from "@/lib/session";
import type { Json } from "@/components/admin/JsonEditor";
import SectionEditor from "@/components/admin/SectionEditor";
import { PageHeader } from "@/components/admin/ui";

export default async function EditSection({ params }: PageProps<"/admin/content/[key]">) {
  const { key } = await params;
  if (!isSectionKey(key)) notFound();

  const rows = await api<{ key: string; value: unknown }[]>("/api/admin/sections", { token: await getAccessToken() });
  const saved = rows.find((r) => r.key === key)?.value;
  // DB-д байхгүй шинэ талбарууд анхны утгаараа харагдана
  const defaults = defaultSections[key] as unknown as Json;
  const initial = deepMerge(defaults, saved);

  return (
    <>
      <Link href="/admin/content" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="size-4" aria-hidden /> Хуудасны текст
      </Link>
      <PageHeader title={sectionLabels[key].title} description={sectionLabels[key].text} />
      <SectionEditor sectionKey={key} initial={initial} defaults={defaults} />
    </>
  );
}

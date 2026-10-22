import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ImageOff, Plus } from "lucide-react";
import { api } from "@/lib/api";
import { isResourceKey, resources, type ResourceConfig, type Row } from "@/lib/admin-resources";
import { getAccessToken } from "@/lib/session";
import { btn, Empty, PageHeader, Panel, Pill } from "@/components/admin/ui";

export default async function ResourceList({ params }: PageProps<"/admin/[resource]">) {
  const { resource } = await params;
  if (!isResourceKey(resource)) notFound();
  const config: ResourceConfig = resources[resource];
  const rows = await api<Row[]>(`/api/admin/content/${resource}`, { token: await getAccessToken() });

  return (
    <>
      <PageHeader
        title={config.title}
        description={config.description}
        action={
          <Link href={`/admin/${resource}/new`} className={btn.primary}>
            <Plus className="size-4" aria-hidden /> Шинээр нэмэх
          </Link>
        }
      />

      {rows.length === 0 ? (
        <Empty>Одоогоор {config.singular} алга. &quot;Шинээр нэмэх&quot; дарж эхлээрэй.</Empty>
      ) : (
        <Panel className="divide-y divide-border">
          {rows.map((row) => {
            const { title, subtitle, image } = config.summary(row);
            return (
              <Link key={row.id} href={`/admin/${resource}/${row.id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-background">
                <span className="flex min-w-0 items-center gap-4">
                  <span className="w-8 shrink-0 font-mono text-xs text-muted">{row.sort_order}</span>
                  {image !== undefined && (
                    <span className="grid h-15 w-12 shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-background">
                      {/* eslint-disable-next-line @next/next/no-img-element -- админ preview */}
                      {image ? <img src={image} alt="" className="size-full object-cover" /> : <ImageOff className="size-4 text-muted/50" aria-hidden />}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-foreground">{title || "(нэргүй)"}</span>
                    {subtitle && <span className="block truncate text-sm text-muted">{subtitle}</span>}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  {row.is_published ? <Pill tone="green">Нийтлэгдсэн</Pill> : <Pill>Нуусан</Pill>}
                  <ArrowRight className="size-4 text-muted" aria-hidden />
                </span>
              </Link>
            );
          })}
        </Panel>
      )}
    </>
  );
}

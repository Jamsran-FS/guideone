import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import { emptyRow, isResourceKey, resources, type ResourceConfig, type Row } from "@/lib/admin-resources";
import { getAccessToken } from "@/lib/session";
import ResourceForm from "@/components/admin/ResourceForm";
import { PageHeader } from "@/components/admin/ui";

export default async function EditResource({ params }: PageProps<"/admin/[resource]/[id]">) {
  const { resource, id } = await params;
  if (!isResourceKey(resource)) notFound();
  const config: ResourceConfig = resources[resource];

  let row: Row | undefined;
  if (id === "new") {
    row = emptyRow(config);
  } else {
    const rows = await api<Row[]>(`/api/admin/content/${resource}`, { token: await getAccessToken() });
    row = rows.find((r) => String(r.id) === id);
  }
  if (!row) notFound();

  return (
    <>
      <Link href={`/admin/${resource}`} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="size-4" aria-hidden /> {config.title}
      </Link>
      <PageHeader title={id === "new" ? `Шинэ ${config.singular}` : config.summary(row).title || config.title} />
      <ResourceForm key={id} resource={resource} initial={row} />
    </>
  );
}

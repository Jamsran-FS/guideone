import { Phone } from "lucide-react";
import { tr, type Localized } from "@/i18n/config";
import { accountCopy } from "@/data/home";
import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/session";
import { StatusEditor } from "@/components/admin/RowControls";
import { Empty, formatDate, PageHeader, Panel, Pill } from "@/components/admin/ui";

export const metadata = { title: "Өргөдлүүд" };

type Status = keyof typeof accountCopy.statuses;
type Application = {
  id: number;
  program: keyof typeof accountCopy.programs;
  status: Status;
  message: string;
  admin_note: string;
  created_at: string;
  student: { full_name: string; email: string | null; phone: string; parent_name: string; parent_phone: string } | null;
  course: { name: Localized } | null;
  partner: { name: Localized } | null;
};

const statuses = (Object.keys(accountCopy.statuses) as Status[]).map((value) => ({ value, label: tr(accountCopy.statuses[value], "mn") }));

const tone: Record<Status, "solid" | "lime" | "green" | "red" | "gray"> = {
  new: "solid",
  in_review: "lime",
  accepted: "green",
  rejected: "red",
  cancelled: "gray",
};

export default async function Applications() {
  const rows = await api<Application[]>("/api/admin/applications", { token: await getAccessToken() });

  return (
    <>
      <PageHeader
        title="Өргөдлүүд"
        description="Суралцагчдын хэлний бэлтгэл болон Солонгос сургуульд зуучлах өргөдөл. Тэмдэглэл нь суралцагчийн бүртгэлд харагдана."
      />
      {rows.length === 0 ? (
        <Empty>Одоогоор өргөдөл ирээгүй байна.</Empty>
      ) : (
        <Panel className="divide-y divide-border">
          {rows.map((a) => (
            <div key={a.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_320px]">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-foreground">{a.student?.full_name || a.student?.email || "—"}</p>
                  <Pill tone={tone[a.status]}>{tr(accountCopy.statuses[a.status], "mn")}</Pill>
                </div>
                <p className="mt-1 text-sm font-medium text-primary">
                  {tr(accountCopy.programs[a.program], "mn")}
                  {(a.course || a.partner) && <span className="text-muted"> · {tr((a.course ?? a.partner)!.name, "mn")}</span>}
                </p>
                <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                  {a.student?.phone && (
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Утас</dt>
                      <Phone className="size-3.5 text-muted" aria-hidden />
                      <dd>{a.student.phone}</dd>
                    </div>
                  )}
                  {a.student?.email && (
                    <div>
                      <dt className="sr-only">И-мэйл</dt>
                      <dd className="truncate text-muted">{a.student.email}</dd>
                    </div>
                  )}
                  {a.student?.parent_name && (
                    <div className="sm:col-span-2">
                      <dt className="inline text-muted">Эцэг эх: </dt>
                      <dd className="inline">
                        {a.student.parent_name} {a.student.parent_phone && `· ${a.student.parent_phone}`}
                      </dd>
                    </div>
                  )}
                </dl>
                {a.message && <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/90">{a.message}</p>}
                <p className="mt-2 text-xs text-muted">{formatDate(a.created_at)}</p>
              </div>
              <StatusEditor kind="application" id={a.id} status={a.status} note={a.admin_note} options={statuses} />
            </div>
          ))}
        </Panel>
      )}
    </>
  );
}

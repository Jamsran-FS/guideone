import { Phone } from "lucide-react";
import { tr } from "@/i18n/config";
import { contactCopy } from "@/data/home";
import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/session";
import { StatusEditor } from "@/components/admin/RowControls";
import { Empty, formatDate, PageHeader, Panel, Pill } from "@/components/admin/ui";

export const metadata = { title: "Хүсэлтүүд" };

type ContactRequest = {
  id: number;
  name: string;
  phone: string;
  interest: string;
  message: string;
  locale: string;
  status: "new" | "contacted" | "closed";
  admin_note: string;
  created_at: string;
};

const statuses = [
  { value: "new", label: "Шинэ" },
  { value: "contacted", label: "Холбогдсон" },
  { value: "closed", label: "Хаасан" },
];

const interestLabel = (value: string) => {
  const found = contactCopy.form.interests.find((i) => i.value === value);
  return found ? tr(found.label, "mn") : value;
};

export default async function Requests() {
  const rows = await api<ContactRequest[]>("/api/admin/contact-requests", { token: await getAccessToken() });

  return (
    <>
      <PageHeader title="Хүсэлтүүд" description="Сайтын «Холбоо барих» формоор ирсэн хүсэлтүүд. Холбогдсоны дараа төлөвийг шинэчилнэ үү." />
      {rows.length === 0 ? (
        <Empty>Одоогоор хүсэлт ирээгүй байна.</Empty>
      ) : (
        <Panel className="divide-y divide-border">
          {rows.map((r) => (
            <div key={r.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_320px]">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-foreground">{r.name}</p>
                  {r.status === "new" && <Pill tone="solid">Шинэ</Pill>}
                  {r.interest && <Pill tone="green">{interestLabel(r.interest)}</Pill>}
                  <Pill>{r.locale.toUpperCase()}</Pill>
                </div>
                <a href={`tel:${r.phone.replace(/[\s-]/g, "")}`} className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
                  <Phone className="size-3.5" aria-hidden /> {r.phone}
                </a>
                {r.message && <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/90">{r.message}</p>}
                <p className="mt-2 text-xs text-muted">{formatDate(r.created_at)}</p>
              </div>
              <StatusEditor kind="request" id={r.id} status={r.status} note={r.admin_note} options={statuses} />
            </div>
          ))}
        </Panel>
      )}
    </>
  );
}

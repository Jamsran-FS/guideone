import { defaultSections } from "@/data/sections";
import { api } from "@/lib/api";
import { deepMerge } from "@/lib/merge";
import { getAccessToken } from "@/lib/session";
import ContactInfoForm, { type SiteSettings } from "@/components/admin/ContactInfoForm";
import { PageHeader } from "@/components/admin/ui";

/** Холбоо барих мэдээлэл — site_content-ийн "site" хэсгийн утас, хаяг, газрын зураг, сошиал талбарууд */
export default async function ContactInfo() {
  const rows = await api<{ key: string; value: unknown }[]>("/api/admin/sections", { token: await getAccessToken() });
  const saved = rows.find((r) => r.key === "site")?.value;
  const initial = deepMerge(defaultSections.site, saved) as SiteSettings;

  return (
    <>
      <PageHeader title="Холбоо барих мэдээлэл" description="Утас, и-мэйл, оффисын хаяг, газрын зураг, сошиал холбоос — нүүр хуудасны &quot;Холбоо барих&quot; хэсэг болон footer-т харагдана." />
      <ContactInfoForm initial={initial} />
    </>
  );
}

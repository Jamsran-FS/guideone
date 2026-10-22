import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { site } from "@/data/site";
import { getContent } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { services, partners } = await getContent();
  const paths = [
    "",
    ...services.map((s) => `/services/${s.slug}`),
    ...partners.filter((p) => p.id !== undefined).map((p) => `/partners/${p.id}`),
  ];
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${site.url}/${l}${p}`,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${site.url}/${x}${p}`])) },
    })),
  );
}

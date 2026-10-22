import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Phone, School } from "lucide-react";
import { hasLocale, locales, tr, type Locale, type Localized } from "@/i18n/config";
import { partnerCopy as c, type PartnerRow } from "@/data/partners";
import { tel } from "@/data/site";
import { getContent } from "@/lib/content";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

// Админ шинэ сургууль нэмбэл build-гүйгээр шууд нээгдэнэ
export const dynamicParams = true;
export async function generateStaticParams() {
  const { partners } = await getContent();
  return locales.flatMap((lang) => partners.filter((p) => p.id !== undefined).map((p) => ({ lang, id: String(p.id) })));
}

const getPartner = async (id: string) => (await getContent()).partners.find((p) => String(p.id) === id);

export async function generateMetadata({ params }: PageProps<"/[lang]/partners/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  const p = await getPartner(id);
  if (!hasLocale(lang) || !p) return {};
  const description = p.description ? tr(p.description, lang) : [p.type && tr(p.type, lang), p.city && tr(p.city, lang)].filter(Boolean).join(" · ");
  return {
    title: tr(p.name, lang),
    description,
    alternates: {
      canonical: `/${lang}/partners/${id}`,
      languages: { mn: `/mn/partners/${id}`, en: `/en/partners/${id}`, ko: `/ko/partners/${id}` },
    },
    openGraph: { title: tr(p.name, lang), description, url: `/${lang}/partners/${id}`, images: p.image ? [p.image] : undefined },
  };
}

export default async function PartnerPage({ params }: PageProps<"/[lang]/partners/[id]">) {
  const { lang, id } = await params;
  const p = await getPartner(id);
  if (!hasLocale(lang) || !p) notFound();
  const { site } = await getContent();
  const requirements = tr(p.requirements, lang);
  const majors = tr(p.majors, lang);
  const meta = [p.type && tr(p.type, lang), p.city && tr(p.city, lang)].filter(Boolean).join(" · ");

  return (
    <>
      <section className="relative overflow-hidden bg-background">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
        <Container className="relative pb-16 pt-32 lg:pb-20 lg:pt-40">
          <Link href={`/${lang}#partners`} className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary">
            <ArrowLeft className="size-4" aria-hidden /> {tr(c.back, lang)}
          </Link>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-12" data-reveal>
            <div className={p.image ? "lg:col-span-6" : "lg:col-span-8"}>
              <div className="flex items-center gap-4">
                <span className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border">
                  {p.logo ? <Image src={p.logo} alt="" fill sizes="64px" className="object-contain p-2" /> : <School className="size-7 text-accent" aria-hidden />}
                </span>
                {meta && <p className="text-sm font-medium text-accent">{meta}</p>}
              </div>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-5xl">{tr(p.name, lang)}</h1>
              {p.description && <p className="mt-6 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-muted">{tr(p.description, lang)}</p>}
              {p.url && (
                <Button href={p.url} variant="secondary" className="mt-8">
                  {tr(c.website, lang)} <ArrowUpRight className="size-4" aria-hidden />
                </Button>
              )}
            </div>
            {p.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-border lg:col-span-6">
                <Image src={p.image} alt={tr(p.name, lang)} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-7">
            {requirements.length > 0 && (
              <div data-reveal>
                <h2 className="font-display text-2xl font-bold text-foreground">{tr(c.requirements, lang)}</h2>
                <ul className="mt-6 divide-y divide-border border-y border-border">
                  {requirements.map((r) => (
                    <li key={r} className="flex items-start gap-4 py-4 text-foreground">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                        <Check className="size-3.5" strokeWidth={3} aria-hidden />
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Table title={c.tuition} rows={p.tuition} lang={lang} />
            <Table title={c.scholarships} rows={p.scholarships} lang={lang} />
            <Table title={c.intakes} rows={p.intakes} lang={lang} />
            {(p.tuition.length > 0 || p.scholarships.length > 0) && <p className="text-sm text-muted">{tr(c.note, lang)}</p>}
          </div>

          <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
            {p.costs.length > 0 && (
              <div data-reveal>
                <h2 className="font-display text-xl font-bold text-foreground">{tr(c.costs, lang)}</h2>
                <ul className="mt-5 grid gap-3">
                  {p.costs.map((d, i) => (
                    <li key={i} className="rounded-2xl border border-border bg-background p-5">
                      <p className="text-sm text-muted">{tr(d.label, lang)}</p>
                      <p className="mt-1 font-display text-2xl font-bold tabular-nums text-primary">{d.value ? tr(d.value, lang) : tr(c.pending, lang)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {majors.length > 0 && (
              <div data-reveal>
                <h2 className="font-display text-xl font-bold text-foreground">{tr(c.majors, lang)}</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {majors.map((m) => (
                    <li key={m} className="rounded-full bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-2xl border border-border bg-background p-7" data-reveal>
              <h2 className="font-display text-xl font-bold text-foreground">{tr(c.ctaTitle, lang)}</h2>
              <p className="mt-2 text-muted">{tr(c.ctaText, lang)}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={`/${lang}#contact`}>{tr(c.apply, lang)}</Button>
                <Button href={tel(site.phones[0])} variant="secondary">
                  <Phone className="size-4" aria-hidden /> {site.phones[0]}
                </Button>
              </div>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}

/** "Нэр — утга" хүснэгт (төлбөр, тэтгэлэг, элсэлтийн хугацаа) */
function Table({ title, rows, lang }: { title: Localized; rows: PartnerRow[]; lang: Locale }) {
  if (rows.length === 0) return null;
  return (
    <div data-reveal>
      <h2 className="font-display text-2xl font-bold text-foreground">{tr(title, lang)}</h2>
      <dl className="mt-6 overflow-hidden rounded-2xl border border-border">
        {rows.map((d, i) => (
          <div key={i} className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 last:border-0 odd:bg-background/60">
            <dt className="text-sm text-muted">{tr(d.label, lang)}</dt>
            <dd className={`text-right text-sm font-semibold tabular-nums ${d.value ? "text-foreground" : "text-muted/80"}`}>
              {d.value ? tr(d.value, lang) : tr(c.pending, lang)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Check, Languages, MapPin, Phone, Stamp, Wallet } from "lucide-react";
import { hasLocale, tr, type Locale } from "@/i18n/config";
import { languageCopy as c, type LanguageSchool } from "@/data/languageSchools";
import { tel } from "@/data/site";
import { getContent } from "@/lib/content";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { isExternalImage } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/language-prep">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: tr(c.eyebrow, lang),
    description: tr(c.text, lang),
    alternates: {
      canonical: `/${lang}/language-prep`,
      languages: { mn: "/mn/language-prep", en: "/en/language-prep", ko: "/ko/language-prep" },
    },
    openGraph: { title: tr(c.title, lang), description: tr(c.text, lang), url: `/${lang}/language-prep` },
  };
}

export default async function LanguagePrepPage({ params }: PageProps<"/[lang]/language-prep">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return null;
  const { languageSchools, site } = await getContent();

  return (
    <>
      <section className="relative overflow-hidden bg-background">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
        <Container className="relative pb-14 pt-32 lg:pb-16 lg:pt-40">
          <SectionHeading as="h1" eyebrow={tr(c.eyebrow, lang)} title={tr(c.title, lang)} text={tr(c.text, lang)} />
        </Container>
      </section>

      <section className="bg-surface py-16 lg:py-24">
        <Container>
          {languageSchools.length > 0 ? (
            <>
              <ul className="space-y-8">
                {languageSchools.map((s) => (
                  <SchoolCard key={s.id} school={s} lang={lang} />
                ))}
              </ul>
              <p className="mt-8 text-sm text-muted">{tr(c.note, lang)}</p>
            </>
          ) : (
            <p className="mx-auto flex max-w-xl gap-3 rounded-2xl bg-background p-6 text-[15px] leading-relaxed text-foreground ring-1 ring-border">
              <Languages className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              {tr(c.empty, lang)}
            </p>
          )}

          <div className="mt-14 flex flex-col justify-between gap-6 rounded-2xl border border-border bg-background p-8 sm:p-10 md:flex-row md:items-center" data-reveal>
            <p className="max-w-xl font-display text-xl font-bold text-foreground">{tr(c.text, lang)}</p>
            <div className="flex flex-wrap gap-3">
              <Button href={`/${lang}#contact`}>{tr(c.apply, lang)}</Button>
              <Button href={tel(site.phones[0])} variant="secondary">
                <Phone className="size-4" aria-hidden /> {site.phones[0]}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function SchoolCard({ school: s, lang }: { school: LanguageSchool; lang: Locale }) {
  const highlights = tr(s.highlights, lang);
  const facts = [
    s.city && { Icon: MapPin, label: c.location, value: tr(s.city, lang) },
    s.visaType && { Icon: Stamp, label: c.visa, value: tr(s.visaType === "e_visa" ? c.eVisa : c.regularVisa, lang) },
    s.tuition && { Icon: Wallet, label: c.tuition, value: tr(s.tuition, lang) },
  ].filter(Boolean) as { Icon: typeof MapPin; label: typeof c.location; value: string }[];

  return (
    <li className="overflow-hidden rounded-[24px] border border-border bg-background lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" data-reveal>
      <div className="relative aspect-[4/3] bg-primary-soft lg:aspect-auto lg:min-h-[420px]">
        {s.image ? (
          <Image src={s.image} unoptimized={isExternalImage(s.image)} alt={tr(s.name, lang)} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
        ) : (
          <Languages className="absolute inset-0 m-auto size-14 text-primary/20" aria-hidden />
        )}
      </div>

      <div className="p-7 sm:p-10">
        <div className="flex items-center gap-4">
          {s.logo && (
            <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-border">
              <Image src={s.logo} unoptimized={isExternalImage(s.logo)} alt="" fill sizes="56px" className="object-contain p-1.5" />
            </span>
          )}
          <h2 className="font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">{tr(s.name, lang)}</h2>
        </div>

        {facts.length > 0 && (
          <dl className="mt-7 grid gap-4 sm:grid-cols-3">
            {facts.map(({ Icon, label, value }) => (
              <div key={label.en} className="rounded-xl bg-surface p-4 ring-1 ring-border">
                <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                  <Icon className="size-3.5 text-accent" aria-hidden /> {tr(label, lang)}
                </dt>
                <dd className="mt-1.5 font-semibold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {s.headline && <p className="mt-7 font-display text-xl font-bold text-signal sm:text-2xl">{tr(s.headline, lang)}</p>}

        {highlights.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {highlights.map((h) => (
              <li key={h} className="flex gap-3 text-foreground">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}

        {s.description && <p className="mt-6 whitespace-pre-line leading-relaxed text-muted">{tr(s.description, lang)}</p>}

        {s.scholarships.length > 0 && (
          <div className="mt-7">
            <h3 className="text-sm font-bold text-foreground">{tr(c.scholarships, lang)}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.scholarships.map((d, i) => (
                <li key={i} className="rounded-lg bg-primary-soft px-3 py-2 text-sm">
                  <span className="text-muted">{tr(d.label, lang)}</span>
                  {d.value && <span className="ml-2 font-bold tabular-nums text-primary">{tr(d.value, lang)}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {s.url && (
          <a href={s.url} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
            {tr(c.website, lang)} <ArrowUpRight className="size-4" aria-hidden />
          </a>
        )}
      </div>
    </li>
  );
}

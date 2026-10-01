import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { hasLocale, locales, tr } from "@/i18n/config";
import { getService, services } from "@/data/services";
import { serviceDetailCopy, ui } from "@/data/home";
import { site, tel } from "@/data/site";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import KoreaStudyProcess from "@/components/home/KoreaStudyProcess";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => services.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = getService(slug);
  if (!hasLocale(lang) || !s) return {};
  return {
    title: tr(s.title, lang),
    description: tr(s.description, lang),
    alternates: {
      canonical: `/${lang}/services/${slug}`,
      languages: { mn: `/mn/services/${slug}`, en: `/en/services/${slug}`, ko: `/ko/services/${slug}` },
    },
    openGraph: { title: tr(s.title, lang), description: tr(s.description, lang), url: `/${lang}/services/${slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { lang, slug } = await params;
  const s = getService(slug);
  if (!hasLocale(lang) || !s) notFound();
  const c = serviceDetailCopy;
  const dark = s.isNew;

  return (
    <>
      <section className={`relative overflow-hidden ${dark ? "bg-primary text-white" : "bg-background"}`}>
        <div className={`${dark ? "bg-grid-light" : "bg-grid"} pointer-events-none absolute inset-0`} aria-hidden />
        <Container className="relative pb-16 pt-32 lg:pb-24 lg:pt-40">
          <Link
            href={`/${lang}#services`}
            className={`inline-flex items-center gap-2 text-sm font-medium ${dark ? "text-white/70 hover:text-white" : "text-muted hover:text-primary"}`}
          >
            <ArrowLeft className="size-4" aria-hidden /> {tr(c.back, lang)}
          </Link>
          <div className="mt-10 max-w-3xl" data-reveal>
            {s.isNew && <Badge tone="new" className="mb-5 rounded-full px-3 py-1">{tr(ui.newBadge, lang)}</Badge>}
            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">{tr(s.title, lang)}</h1>
            <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{tr(s.description, lang)}</p>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className={s.details ? "lg:col-span-6" : "lg:col-span-7"} data-reveal>
            <h2 className="font-display text-2xl font-bold text-foreground">{tr(c.topicsTitle, lang)}</h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {tr(s.topics, lang).map((t) => (
                <li key={t} className="flex items-start gap-4 py-5 text-foreground">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {s.details && (
            <div className="lg:col-span-5 lg:col-start-8" data-reveal>
              <h2 className="font-display text-2xl font-bold text-foreground">{tr(c.detailsTitle, lang)}</h2>
              <dl className="mt-8 overflow-hidden rounded-2xl border border-border">
                {s.details.map((d) => (
                  <div key={d.label.en} className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 last:border-0">
                    <dt className="text-sm text-muted">{tr(d.label, lang)}</dt>
                    <dd className={`text-right text-sm font-medium ${d.value ? "text-foreground" : "text-muted/80"}`}>
                      {d.value ? tr(d.value, lang) : tr(c.pending, lang)}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-muted">{tr(c.pendingNote, lang)}</p>
            </div>
          )}

          {!s.details && (
            <aside className="rounded-2xl border border-border bg-background p-8 lg:col-span-4 lg:col-start-9" data-reveal>
              <ContactBox lang={lang} />
            </aside>
          )}
        </Container>
      </section>

      {s.slug === "korea-study" && <KoreaStudyProcess lang={lang} />}

      {s.details && (
        <section className="bg-background py-20">
          <Container>
            <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10" data-reveal>
              <ContactBox lang={lang} horizontal />
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

function ContactBox({ lang, horizontal = false }: { lang: "mn" | "en" | "ko"; horizontal?: boolean }) {
  const c = serviceDetailCopy;
  return (
    <div className={horizontal ? "flex flex-col justify-between gap-6 md:flex-row md:items-center" : ""}>
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">{tr(c.ctaTitle, lang)}</h2>
        <p className="mt-2 text-muted">{tr(c.ctaText, lang)}</p>
      </div>
      <div className={`flex flex-wrap gap-3 ${horizontal ? "" : "mt-6"}`}>
        <Button href={tel(site.phones[0])}>
          <Phone className="size-4" aria-hidden /> {site.phones[0]}
        </Button>
        <Button href={`/${lang}#contact`} variant="secondary">
          {tr(ui.contact, lang)}
        </Button>
      </div>
    </div>
  );
}

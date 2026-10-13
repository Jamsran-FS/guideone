import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tr, type Locale } from "@/i18n/config";
import { ui } from "@/data/home";
import { getContent } from "@/lib/content";
import Badge from "../ui/Badge";
import Container from "../ui/Container";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";

type Item = {
  key: string;
  icon: string;
  title: string;
  description: string;
  href?: string;
  cta?: string;
  isNew?: boolean;
  soon?: boolean;
};

/** Бүх үйлчилгээ ижил хэмжээтэй карт (box) дотор — идэвхтэй нь товчтой, удахгүй нь "Тун удахгүй" төлөвтэй */
export default async function ServicesSection({ lang }: { lang: Locale }) {
  const { services, upcomingServices, servicesCopy } = await getContent();

  const active: Item[] = services.map((s) => ({
    key: s.slug,
    icon: s.icon,
    title: tr(s.title, lang),
    description: tr(s.summary ?? s.description, lang),
    href: `/${lang}/services/${s.slug}`,
    cta: tr(ui.more, lang),
    isNew: s.isNew,
  }));
  const course: Item = {
    key: "course",
    icon: "BookOpen",
    title: tr(servicesCopy.course.title, lang),
    description: tr(servicesCopy.course.description, lang),
    href: `/${lang}#courses`,
    cta: tr(servicesCopy.course.cta, lang),
  };
  const upcoming: Item[] = upcomingServices.map((u) => ({
    key: u.slug,
    icon: u.icon,
    title: tr(u.title, lang),
    description: tr(u.description, lang),
    soon: true,
  }));
  const items = [...active.slice(0, 1), course, ...active.slice(1), ...upcoming];

  return (
    <section id="services" aria-labelledby="services-title" className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeading
          id="services-title"
          align="center"
          eyebrow={tr(servicesCopy.eyebrow, lang)}
          title={tr(servicesCopy.title, lang)}
          text={tr(servicesCopy.text, lang)}
        />

        <ul className="mt-14 flex flex-wrap justify-center gap-5">
          {items.map((it, i) => (
            <li
              key={it.key}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(20%-16px)]"
            >
              <article
                className={`group relative flex h-full flex-col items-center rounded-[22px] border bg-surface px-6 pb-7 pt-9 text-center transition duration-300 ${
                  it.soon
                    ? "border-dashed border-border"
                    : "border-border shadow-[0_18px_40px_-28px_rgb(10_74_48/0.35)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_26px_50px_-26px_rgb(10_74_48/0.45)]"
                }`}
              >
                {it.isNew && (
                  <Badge tone="new" className="absolute right-4 top-4 rounded-full px-2.5 py-1">
                    {tr(ui.newBadge, lang)}
                  </Badge>
                )}

                <span
                  className={`grid size-16 place-items-center rounded-2xl transition-colors ${
                    it.soon ? "bg-background text-muted" : "bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white"
                  }`}
                >
                  <Icon name={it.icon} className="size-7" />
                </span>

                <h3 className={`mt-6 font-display text-lg font-bold leading-snug ${it.soon ? "text-foreground/75" : "text-foreground"}`}>
                  {it.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{it.description}</p>

                <div className="mt-6">
                  {it.soon ? (
                    <span className="inline-flex h-10 items-center text-xs font-bold uppercase tracking-[0.12em] text-signal">
                      {tr(servicesCopy.soon, lang)}
                    </span>
                  ) : (
                    <Link
                      href={it.href!}
                      className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
                    >
                      {it.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

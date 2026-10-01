import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tr, type Locale } from "@/i18n/config";
import { courses } from "@/data/courses";
import { coursesCopy, ui } from "@/data/home";
import Card from "../ui/Card";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function CourseSection({ lang }: { lang: Locale }) {
  return (
    <section id="courses" aria-labelledby="courses-title" className="bg-background py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="courses-title"
            eyebrow={tr(coursesCopy.eyebrow, lang)}
            title={tr(coursesCopy.title, lang)}
            text={tr(coursesCopy.text, lang)}
          />
          <p className="max-w-xs text-sm leading-relaxed text-muted lg:text-right" data-reveal>
            {tr(coursesCopy.note, lang)}
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {courses.map((c, i) => (
            <li key={c.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
              <Card as="article" interactive className="group flex h-full flex-col p-7">
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>

                <p className="font-kr mt-8 text-[2.6rem] font-bold leading-none tracking-tight text-accent/90" aria-hidden>
                  {c.glyph}
                </p>
                <h3 className="mt-6 font-display text-xl font-bold text-foreground">{tr(c.name, lang)}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted">{tr(c.description, lang)}</p>

                <dl className="mt-7 grid grid-cols-2 gap-3 border-t border-border pt-5 text-sm">
                  <div>
                    <dt className="text-xs text-muted">{tr(coursesCopy.level, lang)}</dt>
                    <dd className="mt-1 font-medium text-foreground">{tr(c.level, lang)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">{tr(coursesCopy.duration, lang)}</dt>
                    <dd className={`mt-1 font-medium ${c.duration ? "text-foreground" : "text-muted"}`}>
                      {c.duration ? tr(c.duration, lang) : tr(coursesCopy.askAdvisor, lang)}
                    </dd>
                  </div>
                  {c.price && (
                    <div className="col-span-2">
                      <dt className="text-xs text-muted">{tr(coursesCopy.price, lang)}</dt>
                      <dd className="mt-1 font-medium text-foreground">{tr(c.price, lang)}</dd>
                    </div>
                  )}
                </dl>

                <Link
                  href={`/${lang}#contact`}
                  aria-label={`${tr(ui.more, lang)}: ${tr(c.name, lang)}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  {tr(ui.more, lang)}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

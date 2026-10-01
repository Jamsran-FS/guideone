import Image from "next/image";
import { UserRound } from "lucide-react";
import { tr, type Locale } from "@/i18n/config";
import { teachers } from "@/data/teachers";
import { teachersCopy } from "@/data/home";
import Card from "../ui/Card";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function TeachersSection({ lang }: { lang: Locale }) {
  return (
    <section id="teachers" aria-labelledby="teachers-title" className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeading id="teachers-title" eyebrow={tr(teachersCopy.eyebrow, lang)} title={tr(teachersCopy.title, lang)} />

        {teachers.length > 0 ? (
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teachers.map((t, i) => (
              <li key={t.name} data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <Card as="article" className="overflow-hidden">
                  <div className="relative aspect-[4/5] bg-primary-soft">
                    {t.image ? (
                      <Image src={t.image} alt={t.name} fill sizes="(min-width:1280px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                    ) : (
                      <UserRound className="absolute inset-0 m-auto size-16 text-primary/25" aria-hidden />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground">{t.name}</h3>
                    <p className="text-sm font-medium text-accent">{tr(t.position, lang)}</p>
                    {t.specialty && <p className="mt-3 text-sm text-foreground">{tr(t.specialty, lang)}</p>}
                    {t.experience && <p className="mt-1 text-sm text-muted">{tr(t.experience, lang)}</p>}
                    {t.description && <p className="mt-3 text-sm leading-relaxed text-muted">{tr(t.description, lang)}</p>}
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          /* Empty state — зохиомол нэр, зураг ашиглахгүй */
          <div className="relative mt-14" data-reveal>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className={i === 0 ? "" : i === 1 ? "hidden sm:block" : "hidden lg:block"}>
                  <div className="overflow-hidden rounded-2xl border border-dashed border-border">
                    <div className="grid aspect-[4/5] place-items-center bg-background">
                      <UserRound className="size-14 text-primary/15" strokeWidth={1.4} />
                    </div>
                    <div className="space-y-2.5 p-6">
                      <span className="block h-3 w-2/3 rounded bg-primary-soft" />
                      <span className="block h-2.5 w-1/3 rounded bg-primary-soft/70" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-surface/30 via-surface/80 to-surface/30 p-6">
              <div className="max-w-md rounded-2xl border border-border bg-surface px-8 py-7 text-center shadow-[0_24px_60px_-30px_rgb(10_74_48/0.35)]">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{tr(teachersCopy.soon, lang)}</span>
                <p className="mt-3 font-display text-lg font-semibold leading-snug text-foreground">{tr(teachersCopy.empty, lang)}</p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

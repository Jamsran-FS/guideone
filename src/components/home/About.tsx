import { Compass, Target } from "lucide-react";
import { tr, type Locale } from "@/i18n/config";
import { getContent } from "@/lib/content";
import Container from "../ui/Container";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";

/** "Бидний тухай" — компанийн танилцуулга, тоон үзүүлэлтүүд, алсын хараа, эрхэм зорилго (админ: Хуудасны текст → Бидний тухай) */
export default async function About({ lang }: { lang: Locale }) {
  const { about } = await getContent();
  const paragraphs = tr(about.text, lang)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const stats = about.stats.filter((s) => s.value.trim());
  const goals = [
    { ...about.vision, Icon: Compass, tone: "bg-primary" },
    { ...about.mission, Icon: Target, tone: "bg-accent" },
  ]
    .map((g) => ({ ...g, title: tr(g.title, lang), text: tr(g.text, lang).trim() }))
    .filter((g) => g.text);
  const values = about.values.filter((v) => tr(v.title, lang).trim());

  return (
    <section id="about" aria-labelledby="about-title" className="bg-background py-24 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeading id="about-title" eyebrow={tr(about.eyebrow, lang)} title={tr(about.title, lang)} />
          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted sm:text-lg" data-reveal>
            {paragraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>
        </div>

        {stats.length > 0 && (
          <ul className="grid content-start gap-4 lg:col-span-5 lg:col-start-8">
            {stats.map((s, i) => (
              <li
                key={i}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                className="flex items-center gap-6 rounded-2xl bg-primary-soft px-7 py-6"
              >
                <span className="min-w-[5.5rem] font-display text-4xl font-extrabold tabular-nums tracking-[-0.02em] text-primary sm:text-5xl">{s.value}</span>
                <span className="text-[15px] font-medium leading-snug text-foreground">{tr(s.label, lang)}</span>
              </li>
            ))}
          </ul>
        )}

        {goals.length > 0 && (
          <div className="mt-6 lg:col-span-12 lg:mt-14">
            <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-3xl" data-reveal>
              {tr(about.missionTitle, lang)}
            </h3>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {goals.map(({ title, text, Icon, tone }, i) => (
                <li
                  key={i}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                  className="rounded-2xl bg-primary-soft p-8 sm:p-10"
                >
                  <span className={`grid size-16 place-items-center rounded-full text-white ${tone}`}>
                    <Icon className="size-7" aria-hidden />
                  </span>
                  <h4 className="mt-7 font-display text-xl font-bold text-foreground sm:text-2xl">{title}</h4>
                  <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {values.length > 0 && (
          <div className="mt-6 lg:col-span-12 lg:mt-14">
            <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-3xl" data-reveal>
              {tr(about.valuesTitle, lang)}
            </h3>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {values.map((v, i) => (
                <li
                  key={i}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}
                  className="flex items-center gap-6 rounded-2xl bg-primary-soft p-7 sm:gap-8 sm:p-10"
                >
                  <span className="grid size-16 shrink-0 place-items-center rounded-full bg-accent text-white sm:size-20">
                    <Icon name={v.icon} className="size-7 sm:size-8" />
                  </span>
                  <div>
                    <h4 className="font-display text-xl font-bold text-foreground sm:text-2xl">{tr(v.title, lang)}</h4>
                    <p className="mt-2 text-base leading-relaxed text-muted sm:text-lg">{tr(v.text, lang)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}

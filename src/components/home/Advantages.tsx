import { tr, type Locale } from "@/i18n/config";
import { getContent } from "@/lib/content";
import Container from "../ui/Container";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";

/** "Бидний давуу тал" — дүрс, гарчиг, тайлбартай картууд (админ: Хуудасны текст → Бидний давуу тал) */
export default async function Advantages({ lang }: { lang: Locale }) {
  const { advantages: a } = await getContent();
  const items = a.items.filter((item) => tr(item.title, lang).trim());
  if (items.length === 0) return null;

  return (
    <section id="advantages" aria-labelledby="advantages-title" className="bg-background py-24 lg:py-32">
      <Container>
        <SectionHeading id="advantages-title" eyebrow={tr(a.eyebrow, lang)} title={tr(a.title, lang)} text={tr(a.text, lang).trim() || undefined} />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li
              key={i}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}
              className="rounded-2xl bg-primary-soft p-7 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className={`grid size-14 shrink-0 place-items-center rounded-full text-white ${item.tone === "dark" ? "bg-primary" : "bg-accent"}`}>
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className="font-display text-lg font-bold leading-snug text-foreground">{tr(item.title, lang)}</h3>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">{tr(item.text, lang)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

import { tr, type Locale } from "@/i18n/config";
import { getContent } from "@/lib/content";
import Container from "../ui/Container";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";

/** "5 чиглэлийн үйлчилгээ" — чиглэл бүрийн дүрс, нэр, тайлбар, хэнд зориулсан (админ: Хуудасны текст → Үйлчилгээний чиглэл) */
export default async function Directions({ lang }: { lang: Locale }) {
  const { directions: d } = await getContent();
  const items = d.items.filter((item) => tr(item.title, lang).trim());
  if (items.length === 0) return null;

  return (
    <section id="directions" aria-labelledby="directions-title" className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeading id="directions-title" eyebrow={tr(d.eyebrow, lang)} title={tr(d.title, lang)} text={tr(d.text, lang).trim() || undefined} />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((item, i) => {
            const audience = tr(item.audience, lang).trim();
            return (
              <li
                key={i}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                className="flex flex-col rounded-2xl bg-primary-soft p-7"
              >
                <span className="grid size-14 place-items-center rounded-full bg-accent text-white">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-lg font-bold leading-snug text-foreground">{tr(item.title, lang)}</h3>
                <p className="mb-6 mt-3 text-[15px] leading-relaxed text-muted">{tr(item.text, lang)}</p>
                {audience && (
                  <p className="mt-auto border-t border-primary/10 pt-5 text-sm leading-relaxed text-muted">
                    <span className="font-semibold text-accent">{tr(d.audienceLabel, lang)}</span> {audience}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

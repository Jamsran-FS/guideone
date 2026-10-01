import { tr, type Locale } from "@/i18n/config";
import { intro, ui } from "@/data/home";
import Badge from "../ui/Badge";
import Container from "../ui/Container";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";

export default function Intro({ lang }: { lang: Locale }) {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-surface py-24 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id="about-title" eyebrow={tr(intro.eyebrow, lang)} title={tr(intro.title, lang)} text={tr(intro.text, lang)} />
        </div>

        <ul className="grid border-t border-border sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:mt-2">
          {intro.items.map((item, i) => (
            <li
              key={item.icon}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              className={`flex flex-col gap-4 border-b border-border py-8 sm:px-8 ${i % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0"}`}
            >
              <span className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-primary-soft text-primary">
                  <Icon name={item.icon} className="size-[22px]" />
                </span>
                {item.isNew && <Badge tone="new">{tr(ui.newBadge, lang)}</Badge>}
              </span>
              <h3 className="font-display text-lg font-bold text-foreground">{tr(item.title, lang)}</h3>
              <p className="-mt-2 text-[15px] leading-relaxed text-muted">{tr(item.text, lang)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

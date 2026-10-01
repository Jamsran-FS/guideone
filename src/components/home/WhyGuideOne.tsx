import { tr, type Locale } from "@/i18n/config";
import { why } from "@/data/home";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function WhyGuideOne({ lang }: { lang: Locale }) {
  return (
    <section aria-labelledby="why-title" className="relative overflow-hidden bg-primary py-24 text-white lg:py-32">
      <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -left-40 bottom-0 size-[480px] rounded-full bg-accent/25 blur-3xl" aria-hidden />
      <Container className="relative">
        <SectionHeading id="why-title" tone="dark" eyebrow={tr(why.eyebrow, lang)} title={tr(why.title, lang)} text={tr(why.text, lang)} />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {why.items.map((item, i) => (
            <li
              key={i}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className="flex flex-col bg-primary p-8 transition-colors duration-300 hover:bg-primary-dark lg:min-h-[300px] lg:p-9"
            >
              <span className="font-display text-5xl font-extrabold tracking-tight text-white/15">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-auto pt-12 font-display text-xl font-bold">{tr(item.title, lang)}</h3>
              <p className="mt-3 leading-relaxed text-white/65">{tr(item.text, lang)}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

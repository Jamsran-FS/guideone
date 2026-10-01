import { tr, type Locale } from "@/i18n/config";
import { process } from "@/data/home";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function KoreaStudyProcess({ lang, compact = false }: { lang: Locale; compact?: boolean }) {
  return (
    <section aria-labelledby="process-title" className={compact ? "py-16" : "bg-background py-24 lg:py-32"}>
      <Container>
        <SectionHeading id="process-title" eyebrow={tr(process.eyebrow, lang)} title={tr(process.title, lang)} text={tr(process.text, lang)} />

        <ol className="relative mt-16 grid gap-0 lg:grid-cols-6 lg:gap-6">
          {/* desktop line */}
          <span className="absolute left-0 right-0 top-[22px] hidden h-px bg-border lg:block" aria-hidden />
          {process.steps.map((s, i) => (
            <li
              key={i}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className="relative grid grid-cols-[44px_1fr] gap-5 pb-10 last:pb-0 lg:block lg:pb-0"
            >
              {/* mobile line */}
              {i < process.steps.length - 1 && (
                <span className="absolute bottom-0 left-[21.5px] top-11 w-px bg-border lg:hidden" aria-hidden />
              )}
              <span
                className={`relative z-10 grid size-11 place-items-center rounded-full border font-mono text-[13px] font-semibold ${
                  i === process.steps.length - 1
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-surface text-primary"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="lg:mt-6 lg:pr-2">
                <h3 className="pt-2 font-display text-lg font-bold text-foreground lg:pt-0">{tr(s.title, lang)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{tr(s.text, lang)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

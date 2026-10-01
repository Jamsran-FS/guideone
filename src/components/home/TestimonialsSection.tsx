import { ArrowRight, Quote } from "lucide-react";
import { tr, type Locale } from "@/i18n/config";
import { testimonials } from "@/data/testimonials";
import { testimonialsCopy } from "@/data/home";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function TestimonialsSection({ lang }: { lang: Locale }) {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="bg-background py-24 lg:py-32">
      <Container>
        <SectionHeading id="testimonials-title" eyebrow={tr(testimonialsCopy.eyebrow, lang)} title={tr(testimonialsCopy.title, lang)} />

        {testimonials.length > 0 ? (
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <li key={t.name} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <Card as="article" className="flex h-full flex-col p-8">
                  <Quote className="size-7 text-accent/40" aria-hidden />
                  <blockquote className="mt-5 flex-1 leading-relaxed text-foreground">“{tr(t.quote, lang)}”</blockquote>
                  <footer className="mt-6 border-t border-border pt-5">
                    <p className="font-semibold text-foreground">{t.name}</p>
                    {t.context && <p className="text-sm text-muted">{tr(t.context, lang)}</p>}
                  </footer>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          /* Empty state — зохиомол сэтгэгдэл ашиглахгүй */
          <div
            className="relative mt-14 grid overflow-hidden rounded-[24px] border border-border bg-surface lg:grid-cols-12"
            data-reveal
          >
            <div className="p-8 sm:p-12 lg:col-span-7 lg:p-16">
              <Quote className="size-10 text-accent" aria-hidden />
              <p className="mt-8 font-display text-[1.75rem] font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl">
                {tr(testimonialsCopy.emptyTitle, lang)}
              </p>
              <p className="mt-4 max-w-md leading-relaxed text-muted">{tr(testimonialsCopy.emptyText, lang)}</p>
              <Button href={`/${lang}#contact`} size="lg" className="mt-10">
                {tr(testimonialsCopy.cta, lang)}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Button>
            </div>
            <div className="relative hidden overflow-hidden border-l border-border bg-primary-soft/60 lg:col-span-5 lg:block" aria-hidden>
              <div className="bg-grid absolute inset-0" />
              <p className="font-kr absolute inset-0 grid place-items-center text-[7.5rem] font-bold leading-none text-primary/[0.08]">이야기</p>
              <div className="absolute bottom-10 left-10 right-10 space-y-3">
                <span className="block h-3 w-3/4 rounded-full bg-primary/10" />
                <span className="block h-3 w-1/2 rounded-full bg-primary/10" />
                <span className="block h-3 w-2/3 rounded-full bg-primary/[0.07]" />
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

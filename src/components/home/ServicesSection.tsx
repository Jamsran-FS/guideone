import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tr, type Locale } from "@/i18n/config";
import { services } from "@/data/services";
import { servicesCopy, ui } from "@/data/home";
import Badge from "../ui/Badge";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

/** Сургууль + оюутны замын шугаман зураг */
function StudyArt() {
  return (
    <svg viewBox="0 0 420 220" className="h-auto w-full" aria-hidden>
      <g fill="none" stroke="#0a4a30" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        {/* campus building */}
        <path d="M210 40 L300 78 H120 Z" />
        <path d="M132 78 V150 M156 78 V150 M184 78 V150 M236 78 V150 M264 78 V150 M288 78 V150" strokeOpacity=".6" />
        <path d="M112 150 H308 M104 160 H316" />
        <rect x="198" y="112" width="24" height="38" rx="12" strokeOpacity=".8" />
        <circle cx="210" cy="62" r="6" />
      </g>
      {/* path toward the gate */}
      <path d="M20 210 C90 200 120 176 190 168 C230 164 250 166 262 162" fill="none" stroke="#0e8444" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" />
      <circle cx="20" cy="210" r="5" fill="#0e8444" />
      {/* cap */}
      <g transform="translate(350 54)" fill="none" stroke="#0e8444" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M-26 0 L0 -12 L26 0 L0 12 Z" />
        <path d="M-14 6 V16 C-6 22 6 22 14 16 V6" />
        <path d="M22 2 V18" />
      </g>
      <text x="380" y="190" textAnchor="end" className="fill-[#0a4a30]/20 font-kr text-[34px] font-bold">
        유학
      </text>
    </svg>
  );
}

/** Утас + сүлжээ — оператор, eSIM гэх мэт тодорхой мэдээлэл харуулаагүй */
function NumberArt() {
  return (
    <svg viewBox="0 0 420 220" className="h-auto w-full" aria-hidden>
      <g fill="none" stroke="white" strokeLinecap="round">
        <path d="M262 70 a40 40 0 0 1 0 56" strokeOpacity=".35" strokeWidth="2" />
        <path d="M282 54 a64 64 0 0 1 0 88" strokeOpacity=".22" strokeWidth="2" />
        <path d="M302 38 a88 88 0 0 1 0 120" strokeOpacity=".12" strokeWidth="2" />
      </g>
      <rect x="150" y="20" width="100" height="186" rx="20" fill="none" stroke="white" strokeOpacity=".75" strokeWidth="1.8" />
      <rect x="185" y="30" width="30" height="6" rx="3" fill="white" fillOpacity=".5" />
      <rect x="162" y="56" width="76" height="44" rx="10" fill="white" fillOpacity=".1" />
      <text x="200" y="84" textAnchor="middle" className="fill-white font-mono text-[15px] font-semibold">
        +82
      </text>
      <rect x="162" y="110" width="52" height="6" rx="3" fill="white" fillOpacity=".3" />
      <rect x="162" y="124" width="70" height="6" rx="3" fill="white" fillOpacity=".18" />
      <circle cx="226" cy="178" r="5" fill="#cd2e3a" />
      <circle cx="226" cy="178" r="11" fill="#cd2e3a" fillOpacity=".25" />
      <text x="40" y="190" className="fill-white/15 font-kr text-[34px] font-bold">
        개통
      </text>
    </svg>
  );
}

export default function ServicesSection({ lang }: { lang: Locale }) {
  const [study, number] = services;

  return (
    <section id="services" aria-labelledby="services-title" className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeading id="services-title" eyebrow={tr(servicesCopy.eyebrow, lang)} title={tr(servicesCopy.title, lang)} />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Service 1 */}
          <article className="group flex flex-col overflow-hidden rounded-[24px] border border-border bg-background" data-reveal>
            <div className="border-b border-border bg-[linear-gradient(180deg,#fff,transparent)] px-8 pt-10 sm:px-12">
              <StudyArt />
            </div>
            <div className="flex flex-1 flex-col p-8 sm:p-12">
              <h3 className="font-display text-2xl font-bold tracking-[-0.01em] text-foreground sm:text-[1.75rem]">{tr(study.title, lang)}</h3>
              <p className="mt-4 max-w-lg flex-1 leading-relaxed text-muted">{tr(study.description, lang)}</p>
              <Link
                href={`/${lang}/services/${study.slug}`}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
              >
                {tr(ui.more, lang)} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </article>

          {/* Service 2 — NEW */}
          <article
            className="group relative flex flex-col overflow-hidden rounded-[24px] bg-primary text-white"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
          >
            <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden />
            <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-accent/40 blur-3xl" aria-hidden />
            <div className="relative border-b border-white/10 px-8 pt-10 sm:px-12">
              <Badge tone="new" className="absolute left-8 top-8 rounded-full px-3 py-1 sm:left-12">
                {tr(ui.newBadge, lang)}
              </Badge>
              <NumberArt />
            </div>
            <div className="relative flex flex-1 flex-col p-8 sm:p-12">
              <h3 className="font-display text-2xl font-bold tracking-[-0.01em] sm:text-[1.75rem]">{tr(number.title, lang)}</h3>
              <p className="mt-4 max-w-lg flex-1 leading-relaxed text-white/70">{tr(number.description, lang)}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${lang}/services/${number.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-accent-soft"
                >
                  {tr(ui.more, lang)} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
                <span className="text-xs text-white/50">{tr(servicesCopy.comingSoon, lang)}</span>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}

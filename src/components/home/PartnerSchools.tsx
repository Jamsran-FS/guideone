import Image from "next/image";
import { ArrowRight, ArrowUpRight, School } from "lucide-react";
import { tr, type Locale } from "@/i18n/config";
import { partners } from "@/data/partners";
import { partnersCopy } from "@/data/home";
import Button from "../ui/Button";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

/** Солонгос дахь хамтрагч сургуулиуд — data/partners.ts хоосон бол "удахгүй" төлөв */
export default function PartnerSchools({ lang }: { lang: Locale }) {
  return (
    <section id="partners" aria-labelledby="partners-title" className="border-t border-border bg-surface py-24 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id="partners-title" eyebrow={tr(partnersCopy.eyebrow, lang)} title={tr(partnersCopy.title, lang)} text={tr(partnersCopy.text, lang)} />
          <Button href={`/${lang}#contact`} variant="secondary" className="mt-8">
            {tr(partnersCopy.cta, lang)} <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>

        <div className="lg:col-span-7" data-reveal>
          {partners.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {partners.map((p) => {
                const body = (
                  <>
                    <span className="relative grid size-14 place-items-center overflow-hidden rounded-xl bg-accent-soft text-accent">
                      {p.logo ? (
                        <Image src={p.logo} alt="" fill sizes="56px" className="object-contain p-2" />
                      ) : (
                        <School className="size-6" aria-hidden />
                      )}
                    </span>
                    <span className="mt-4 block font-display font-bold text-foreground">{tr(p.name, lang)}</span>
                    {(p.city || p.type) && (
                      <span className="mt-1 block text-sm text-muted">
                        {[p.type && tr(p.type, lang), p.city && tr(p.city, lang)].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </>
                );
                return (
                  <li key={p.name.en} className="rounded-2xl border border-border p-5 transition hover:border-accent/40">
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noreferrer" className="group block">
                        {body}
                        <ArrowUpRight className="mt-3 size-4 text-muted transition group-hover:text-accent" aria-hidden />
                      </a>
                    ) : (
                      body
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            /* Empty state — зохиомол сургуулийн нэр ашиглахгүй */
            <div className="relative overflow-hidden rounded-[24px] border border-border bg-background p-6 sm:p-8">
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-hidden>
                {Array.from({ length: 6 }).map((_, i) => (
                  <li key={i} className="flex h-24 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface">
                    <School className="size-6 text-accent/30" />
                    <span className="h-2 w-16 rounded-full bg-primary-soft" />
                  </li>
                ))}
              </ul>
              <p className="font-kr pointer-events-none absolute -bottom-6 -right-2 select-none text-[6rem] font-bold leading-none text-primary/[0.05]" aria-hidden>
                학교
              </p>
              <p className="relative mt-6 flex gap-3 rounded-xl bg-surface p-4 text-[15px] leading-relaxed text-foreground shadow-sm ring-1 ring-border">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-lime" aria-hidden />
                {tr(partnersCopy.empty, lang)}
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

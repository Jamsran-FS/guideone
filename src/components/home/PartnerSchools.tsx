import Image from "next/image";
import Link from "next/link";
import { ArrowRight, School } from "lucide-react";
import { tr, type Locale } from "@/i18n/config";
import { partnerCopy } from "@/data/partners";
import { getContent } from "@/lib/content";
import Button from "../ui/Button";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { isExternalImage } from "@/lib/images";

/** Солонгос дахь хамтрагч сургуулиуд — жагсаалт хоосон бол "удахгүй" төлөв */
export default async function PartnerSchools({ lang }: { lang: Locale }) {
  const { partners, partnersCopy } = await getContent();
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
            <ul className="grid gap-4 sm:grid-cols-2">
              {partners.map((p) => {
                const majors = tr(p.majors, lang);
                const body = (
                  <>
                    <span className="relative block aspect-[16/9] overflow-hidden bg-accent-soft">
                      {p.image ? (
                        <Image src={p.image} unoptimized={isExternalImage(p.image)} alt="" fill sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                      ) : (
                        <School className="absolute inset-0 m-auto size-10 text-accent/30" aria-hidden />
                      )}
                      {p.logo && (
                        <span className="absolute bottom-3 left-3 size-12 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
                          <Image src={p.logo} unoptimized={isExternalImage(p.logo)} alt="" fill sizes="48px" className="object-contain p-1.5" />
                        </span>
                      )}
                    </span>
                    <span className="block p-5">
                      <span className="block font-display font-bold text-foreground">{tr(p.name, lang)}</span>
                      {(p.city || p.type) && (
                        <span className="mt-1 block text-sm text-muted">
                          {[p.type && tr(p.type, lang), p.city && tr(p.city, lang)].filter(Boolean).join(" · ")}
                        </span>
                      )}
                      {majors.length > 0 && (
                        <span className="mt-3 flex flex-wrap gap-1.5">
                          {majors.slice(0, 3).map((m) => (
                            <span key={m} className="rounded-full bg-background px-2.5 py-1 text-xs text-muted ring-1 ring-border">
                              {m}
                            </span>
                          ))}
                          {majors.length > 3 && <span className="px-1 py-1 text-xs text-muted">+{majors.length - 3}</span>}
                        </span>
                      )}
                      {p.id !== undefined && (
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                          {tr(partnerCopy.more, lang)} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      )}
                    </span>
                  </>
                );
                return (
                  <li key={p.id ?? p.name.en} className="overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-accent/40">
                    {p.id !== undefined ? (
                      <Link href={`/${lang}/partners/${p.id}`} className="group block h-full">
                        {body}
                      </Link>
                    ) : (
                      <div className="group">{body}</div>
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

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { tr, type Locale } from "@/i18n/config";
import { mapEmbedUrl, mapLinkUrl, site, tel } from "@/data/site";
import { contactCopy } from "@/data/home";
import Container from "../ui/Container";
import ContactForm from "./ContactForm";

export default function ContactCTA({ lang }: { lang: Locale }) {
  const c = contactCopy;
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-background py-24 lg:py-32">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[32px] bg-primary p-3 text-white sm:p-4">
          {/* Soft glows instead of grid */}
          <div className="pointer-events-none absolute -left-32 -top-40 -z-10 size-[520px] rounded-full bg-accent/50 blur-[120px]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-48 right-1/3 -z-10 size-[420px] rounded-full bg-lime/20 blur-[120px]" aria-hidden />
          <p
            className="font-kr pointer-events-none absolute bottom-6 left-8 -z-10 select-none text-[8rem] font-bold leading-none text-white/[0.035] lg:text-[11rem]"
            aria-hidden
          >
            문의
          </p>

          <div className="grid gap-4 lg:grid-cols-12">
            {/* ── Left: info ── */}
            <div className="flex flex-col p-5 sm:p-8 lg:col-span-6 lg:p-10" data-reveal>
              <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-lime">
                <span className="h-px w-6 bg-lime/60" aria-hidden />
                {tr(c.eyebrow, lang)}
              </p>
              <h2 id="contact-title" className="mt-5 font-display text-[2rem] font-bold leading-[1.12] tracking-[-0.02em] sm:text-[2.6rem]">
                {tr(c.title, lang)}
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-white/70">{tr(c.text, lang)}</p>

              {/* Phones */}
              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">{tr(c.callUs, lang)}</p>
                <ul className="mt-3 flex flex-wrap gap-2.5">
                  {site.phones.map((p) => (
                    <li key={p}>
                      <a
                        href={tel(p)}
                        className="group inline-flex items-center gap-3 rounded-full bg-white/10 py-2 pl-2 pr-5 font-semibold ring-1 ring-inset ring-white/15 transition hover:bg-white hover:text-primary"
                      >
                        <span className="grid size-9 place-items-center rounded-full bg-lime text-primary-dark">
                          <Phone className="size-4" aria-hidden />
                        </span>
                        {p}
                      </a>
                    </li>
                  ))}
                  {site.email && (
                    <li>
                      <a
                        href={`mailto:${site.email}`}
                        className="inline-flex items-center gap-3 rounded-full bg-white/10 py-2 pl-2 pr-5 font-semibold ring-1 ring-inset ring-white/15 transition hover:bg-white hover:text-primary"
                      >
                        <span className="grid size-9 place-items-center rounded-full bg-white/15">
                          <Mail className="size-4" aria-hidden />
                        </span>
                        {site.email}
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {/* Address + map card */}
              <div className="mt-8 flex flex-1 flex-col overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-inset ring-white/12">
                <div className="flex items-start justify-between gap-4 p-5">
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-lime" aria-hidden />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">{tr(c.visit, lang)}</p>
                      <p className="mt-1.5 leading-relaxed text-white/90">{tr(site.address, lang)}</p>
                    </div>
                  </div>
                  <a
                    href={mapLinkUrl(site.mapQuery)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={tr(c.openMap, lang)}
                    title={tr(c.openMap, lang)}
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-primary transition hover:bg-lime"
                  >
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
                <div className="relative min-h-56 flex-1 border-t border-white/10">
                  <iframe
                    title={tr(c.mapTitle, lang)}
                    src={mapEmbedUrl(site.mapQuery, lang)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full saturate-[0.85]"
                  />
                </div>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div
              className="rounded-[24px] bg-surface p-6 text-foreground shadow-[0_30px_80px_-40px_rgb(0_0_0/0.5)] sm:p-9 lg:col-span-6 lg:p-11"
              data-reveal
              style={{ ["--reveal-delay" as string]: "100ms" }}
            >
              <ContactForm lang={lang} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

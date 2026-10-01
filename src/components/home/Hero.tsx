import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tr, type Locale } from "@/i18n/config";
import { hero, ui } from "@/data/home";
import { localHref, site } from "@/data/site";
import Badge from "../ui/Badge";
import Icon from "../ui/Icon";
import RouteOverlay from "./RouteOverlay";

/**
 * Desktop (lg+): зураг бүтэн өргөнөөр 3:2 харьцаатай. Текст, товч, карт нь зургийн
 * % байрлалаар (эх mockup 1536×1024-тэй яг ижил) тавигдана, хэмжээ нь vw-ээр масштаблагдана.
 * Mobile/tablet: текст дээр, зургийн баруун хэсэг доор, карт нь зураг дээр давхарлана.
 */
export default function Hero({ lang }: { lang: Locale }) {
  const btnPrimary =
    "group inline-flex items-center justify-center gap-2 rounded-full bg-accent font-semibold text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-strong";
  const btnSecondary =
    "inline-flex items-center justify-center rounded-full border border-foreground/40 bg-white/40 font-semibold text-foreground backdrop-blur transition-colors hover:bg-white/80";

  return (
    <section aria-labelledby="hero-title" className="relative">
      {/* ───── Desktop: бүтэн зураг ───── */}
      {site.heroImageFull && (
        <div className="relative hidden aspect-[3/2] w-full overflow-hidden rounded-b-[3rem] lg:block">
          <Image src={site.heroImageFull} alt={tr(hero.imageAlt, lang)} fill priority sizes="100vw" className="object-cover" />
          <RouteOverlay
            from={tr(hero.routeFrom, lang)}
            to={tr(hero.routeTo, lang)}
            w={1536}
            h={1024}
            a={{ x: 690, y: 150 }}
            plane={{ x: 1000, y: 190 }}
            b={{ x: 1120, y: 262 }}
            font={14}
          />

          <div className="absolute left-[8.2%] top-[22.6%] w-[42%]">
            <h1
              id="hero-title"
              className="font-display text-[3.05vw] font-extrabold leading-[1.18] tracking-[-0.02em] text-primary"
              data-reveal
            >
              <span className="block">{tr(hero.titleLine1, lang)}</span>
              <span className="text-brand-gradient block">{tr(hero.titleLine2, lang)}</span>
            </h1>
            <p className="mt-[1.6vw] max-w-[36vw] text-[1.25vw] leading-[1.6] text-foreground/80" data-reveal>
              {tr(hero.text, lang)}
            </p>
            <div className="mt-[2.4vw] flex gap-[1.1vw]" data-reveal>
              <Link href={`/${lang}#courses`} className={`${btnPrimary} h-[3.4vw] px-[2.1vw] text-[1.05vw]`}>
                {tr(hero.primary, lang)}
                <ArrowRight className="size-[1.1vw] transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link href={`/${lang}#contact`} className={`${btnSecondary} h-[3.4vw] px-[2.1vw] text-[1.05vw]`}>
                {tr(hero.secondary, lang)}
              </Link>
            </div>
          </div>

          {/* Эх зураг дээрх картын байрлал: x 86–948, y 798–962 (1536×1024) */}
          <QuickCard lang={lang} className="absolute left-[5.6%] top-[77.9%] h-[16%] w-[56.1%]" />
        </div>
      )}

      {/* ───── Mobile / tablet ───── */}
      <div
        className={`relative isolate overflow-hidden rounded-b-[2rem] bg-[linear-gradient(180deg,#c3defa_0%,#e4effd_32%,#f4f8fd_52%,#f5f8f6_100%)] sm:rounded-b-[3rem] ${
          site.heroImageFull ? "lg:hidden" : ""
        }`}
      >
        <div className="mx-auto w-full max-w-[1320px] px-5 pt-32 sm:px-8 sm:pt-36">
          <div className="max-w-xl">
            <h1 className="font-display text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-primary sm:text-[3.2rem]">
              <span className="block">{tr(hero.titleLine1, lang)}</span>
              <span className="text-brand-gradient block pb-1">{tr(hero.titleLine2, lang)}</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/75 sm:text-lg">{tr(hero.text, lang)}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${lang}#courses`} className={`${btnPrimary} h-14 px-8 text-[15px]`}>
                {tr(hero.primary, lang)} <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href={`/${lang}#contact`} className={`${btnSecondary} h-14 px-8 text-[15px]`}>
                {tr(hero.secondary, lang)}
              </Link>
            </div>
          </div>

          {site.heroImage && (
            <div className="relative -mx-5 mt-10 aspect-[786/900] sm:-mx-8 sm:aspect-[786/700] [mask-image:linear-gradient(to_bottom,transparent_0%,black_9%)]">
              <Image src={site.heroImage} alt="" fill sizes="100vw" className="object-cover object-top" />
              <RouteOverlay
                from={tr(hero.routeFrom, lang)}
                to={tr(hero.routeTo, lang)}
                w={856}
                h={1024}
                a={{ x: 110, y: 120 }}
                plane={{ x: 370, y: 170 }}
                b={{ x: 455, y: 255 }}
                font={30}
                fit="xMidYMin slice"
              />
            </div>
          )}

          <QuickCard lang={lang} className="relative z-10 -mt-24 mb-6" />
        </div>
      </div>
    </section>
  );
}

function QuickCard({ lang, className = "" }: { lang: Locale; className?: string }) {
  return (
    <nav aria-label={tr(hero.quickLabel, lang)} className={className}>
      <ul className="grid h-full grid-cols-2 overflow-hidden rounded-[22px] border border-white/80 bg-white/95 shadow-[0_24px_60px_-28px_rgb(10_74_48/0.45)] backdrop-blur-md sm:grid-cols-4 lg:rounded-[1.4vw]">
        {hero.quick.map((q, i) => (
          <li
            key={q.icon}
            className={`border-border ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b sm:border-b-0" : ""} sm:border-r sm:last:border-r-0 lg:my-[1.2vw] lg:border-r-0 lg:[&:not(:last-child)]:border-r`}
          >
            <Link
              href={localHref(lang, q.href)}
              className="group relative flex h-full flex-col items-center justify-center gap-3 px-3 py-6 text-center transition-colors hover:bg-accent-soft/60 lg:gap-[0.8vw] lg:px-[0.8vw] lg:py-0"
            >
              {q.isNew && (
                <Badge tone="new" className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] lg:-top-[0.4vw] lg:right-[0.6vw]">
                  {tr(ui.newBadge, lang)}
                </Badge>
              )}
              <Icon name={q.icon} className="size-7 text-accent lg:size-[2.2vw]" />
              <span className="text-[13.5px] font-semibold leading-snug text-foreground lg:text-[clamp(11px,0.9vw,15px)]">
                {tr(q.label, lang)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

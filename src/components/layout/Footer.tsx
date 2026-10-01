import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { tr, type Locale } from "@/i18n/config";
import { footerHelp, footerNavigation, localHref, site, tel } from "@/data/site";
import { footerCopy, ui } from "@/data/home";
import BackToTop from "../ui/BackToTop";
import { FacebookIcon, InstagramIcon, TiktokIcon } from "../ui/SocialIcons";

/** zuca.mn-ийн бүтэцтэй footer: бөөрөнхий тэнгэр өнгийн карт, бүдэг үүлс, багана, доод мөр */
export default function Footer({ lang }: { lang: Locale }) {
  const socials = [
    { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: site.socials.tiktok, label: "TikTok", Icon: TiktokIcon },
  ].filter((s) => s.href);

  const heading = "font-display text-[17px] font-bold text-white";
  const link = "text-[15px] font-medium text-white/85 transition-colors hover:text-white";

  return (
    <footer className="px-3 pb-3 pt-10 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-b from-sky-dark via-sky to-[#5bb84e] text-white sm:rounded-[2.75rem]">
        {/* Soft clouds */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute left-1/2 top-[-40px] h-36 w-[380px] -translate-x-1/2 rounded-full bg-white/25 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-72 w-[620px] rounded-full bg-white/35 blur-3xl" />
          <div className="absolute -bottom-32 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-white/25 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-[620px] rounded-full bg-white/35 blur-3xl" />
        </div>

        <div className="mx-auto max-w-[1180px] px-6 pb-8 pt-16 sm:px-10 lg:pt-24">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1.1fr_1.5fr_auto] lg:gap-14">
            <nav aria-label={tr(footerCopy.navigation, lang)}>
              <h2 className={heading}>{tr(footerCopy.navigation, lang)}</h2>
              <ul className="mt-5 space-y-3">
                {footerNavigation.map((n) => (
                  <li key={n.href}>
                    <Link href={localHref(lang, n.href)} className={link}>
                      {tr(n.label, lang)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={tr(footerCopy.help, lang)}>
              <h2 className={heading}>{tr(footerCopy.help, lang)}</h2>
              <ul className="mt-5 space-y-3">
                {footerHelp.map((n) => (
                  <li key={n.href}>
                    <Link href={localHref(lang, n.href)} className={link}>
                      {tr(n.label, lang)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className={heading}>{tr(footerCopy.contact, lang)}</h2>
              <address className="mt-5 space-y-3 not-italic">
                {site.email && (
                  <a href={`mailto:${site.email}`} className={`flex items-center gap-2.5 ${link}`}>
                    <Mail className="size-4 shrink-0 opacity-80" aria-hidden /> {site.email}
                  </a>
                )}
                {site.phones.map((p) => (
                  <a key={p} href={tel(p)} className={`flex items-center gap-2.5 ${link}`}>
                    <Phone className="size-4 shrink-0 opacity-80" aria-hidden /> {p}
                  </a>
                ))}
                <p className="flex gap-2.5 text-[15px] font-medium leading-relaxed text-white/85">
                  <MapPin className="mt-1 size-4 shrink-0 opacity-80" aria-hidden />
                  <span className="max-w-xs">{tr(site.address, lang)}</span>
                </p>
              </address>
            </div>

            <div className="flex flex-col items-start">
              <Link
                href={`/${lang}`}
                aria-label={tr(ui.home, lang)}
                className="grid size-24 place-items-center rounded-[22px] bg-white p-3.5 shadow-xl shadow-sky-dark/40 transition-transform hover:-translate-y-0.5"
              >
                <Image src="/logo-mark-sm.png" alt="GuideOne" width={240} height={185} sizes="96px" className="h-auto w-full" />
              </Link>
              <p className="mt-4 max-w-[13rem] text-sm leading-relaxed text-white/80">{tr(footerCopy.description, lang)}</p>
              {socials.length > 0 && (
                <>
                  <h2 className={`${heading} mt-6`}>{tr(footerCopy.social, lang)}</h2>
                  <ul className="mt-3 flex gap-2">
                    {socials.map(({ href, label, Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={label}
                          className="grid size-10 place-items-center rounded-full border border-white/50 transition-colors hover:bg-white hover:text-sky-dark"
                        >
                          <Icon className="size-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/30 pt-8 text-sm font-medium text-white/90 md:flex-row">
            <span className="flex items-center gap-2">
              <MapPin className="size-4" aria-hidden /> {tr(site.city, lang)}
            </span>
            <span>
              © {new Date().getFullYear()} GuideOne. {footerCopy.rights}
            </span>
            <a href={tel(site.phones[0])} className="flex items-center gap-2 hover:text-white">
              <Phone className="size-4" aria-hidden /> {site.phones[0]}
            </a>
          </div>
        </div>
      </div>
      <BackToTop label={tr(ui.toTop, lang)} />
    </footer>
  );
}

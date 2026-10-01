"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  Info,
  LayoutGrid,
  Menu,
  MessageSquareQuote,
  UserRound,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { tr, type Locale } from "@/i18n/config";
import { localHref, navigation, type NavLink } from "@/data/site";
import { ui } from "@/data/home";
import Badge from "../ui/Badge";
import Icon from "../ui/Icon";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

export default function Navbar({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        {tr(ui.skip, lang)}
      </a>

      <div
        className={`mx-auto flex h-[68px] w-full max-w-[1320px] items-center justify-between gap-4 rounded-full border bg-white/95 pl-4 pr-2.5 backdrop-blur-md transition-shadow duration-300 sm:pl-6 ${
          scrolled ? "border-border shadow-[0_14px_40px_-16px_rgb(10_74_48/0.28)]" : "border-white/80 shadow-[0_10px_30px_-18px_rgb(10_74_48/0.25)]"
        }`}
      >
        <Logo href={`/${lang}`} label={tr(ui.home, lang)} tagline={tr(ui.tagline, lang)} compact />

        <nav aria-label={tr(ui.mainNav, lang)} className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {navigation.map((item) => (
              <li key={item.id}>
                {item.children ? (
                  <ServicesMenu item={item} lang={lang} />
                ) : (
                  <Link
                    href={localHref(lang, item.href)}
                    className="flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[14.5px] font-medium text-foreground/80 transition-colors hover:bg-accent-soft hover:text-accent"
                  >
                    <NavIcon id={item.id} />
                    {tr(item.label, lang)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher lang={lang} label={tr(ui.language, lang)} />
          </div>
          <Link
            href={`/${lang}/login`}
            className="hidden h-11 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-colors hover:bg-accent-strong sm:inline-flex"
          >
            <UserRound className="size-4" aria-hidden />
            {tr(ui.login, lang)}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={tr(ui.menuOpen, lang)}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className="grid size-11 place-items-center rounded-full bg-accent-soft text-accent xl:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <MobileDrawer open={open} onClose={() => setOpen(false)} lang={lang} />
    </header>
  );
}

const navIcons: Record<string, LucideIcon> = {
  about: Info,
  courses: GraduationCap,
  services: LayoutGrid,
  teachers: Users,
  testimonials: MessageSquareQuote,
  faq: CircleHelp,
};

function NavIcon({ id }: { id: string }) {
  const I = navIcons[id];
  return I ? <I className="hidden size-4 opacity-70 2xl:block" aria-hidden /> : null;
}

/* ── Desktop "Үйлчилгээ" dropdown ───────────────────────────── */
function ServicesMenu({ item, lang }: { item: NavLink; lang: Locale }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setShow(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShow(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [show]);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <button
        type="button"
        aria-expanded={show}
        aria-haspopup="true"
        onClick={() => setShow((v) => !v)}
        className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-[14.5px] font-medium transition-colors hover:bg-accent-soft hover:text-accent ${
          show ? "bg-accent-soft text-accent" : "text-foreground/80"
        }`}
      >
        <NavIcon id={item.id} />
        {tr(item.label, lang)}
        <span className="size-1.5 rounded-full bg-lime" aria-hidden />
        <ChevronDown className={`size-4 transition-transform ${show ? "rotate-180" : ""}`} aria-hidden />
      </button>

      <div
        className={`absolute left-1/2 top-full w-[400px] -translate-x-1/2 pt-3 transition duration-200 ${
          show ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="rounded-2xl border border-border bg-surface p-2 shadow-[0_24px_60px_-20px_rgb(10_74_48/0.25)]">
          {item.children!.map((c) => (
            <li key={c.id}>
              <Link
                href={localHref(lang, c.href)}
                onClick={() => setShow(false)}
                className="group flex items-start gap-4 rounded-xl p-3.5 transition-colors hover:bg-background"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon name={c.icon} className="size-5" />
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    {tr(c.label, lang)}
                    {c.isNew && <Badge tone="new">{tr(ui.newBadge, lang)}</Badge>}
                  </span>
                  <span className="mt-1 block text-[13px] leading-snug text-muted">{tr(c.text, lang)}</span>
                </span>
                <ArrowUpRight className="mt-0.5 size-4 text-muted opacity-0 transition group-hover:opacity-100" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Mobile drawer ─────────────────────────────────────────── */
function MobileDrawer({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: Locale }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <div className={`fixed inset-0 z-50 xl:hidden ${open ? "" : "pointer-events-none"}`} inert={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-primary-dark/40 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={tr(ui.mainNav, lang)}
        className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-surface shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-border px-5">
          <Logo href={`/${lang}`} label={tr(ui.home, lang)} />
          <button
            type="button"
            onClick={onClose}
            aria-label={tr(ui.menuClose, lang)}
            tabIndex={open ? 0 : -1}
            className="grid size-11 place-items-center rounded-full border border-border text-primary"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav aria-label={tr(ui.mainNav, lang)} className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="divide-y divide-border">
            {navigation.map((item) =>
              item.children ? (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setServicesOpen((v) => !v)}
                    className="flex w-full items-center justify-between py-4 text-left text-[17px] font-semibold text-foreground"
                  >
                    <span className="flex items-center gap-2">
                      {tr(item.label, lang)}
                      <span className="size-1.5 rounded-full bg-lime" aria-hidden />
                    </span>
                    <ChevronDown className={`size-5 text-muted transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ${servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <ul className="overflow-hidden">
                      {item.children.map((c) => (
                        <li key={c.id}>
                          <Link
                            href={localHref(lang, c.href)}
                            onClick={onClose}
                            tabIndex={open && servicesOpen ? 0 : -1}
                            className="mb-2 flex items-center gap-3 rounded-xl bg-background p-3"
                          >
                            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface text-primary ring-1 ring-border">
                              <Icon name={c.icon} className="size-5" />
                            </span>
                            <span className="flex-1 text-[15px] font-semibold text-foreground">{tr(c.label, lang)}</span>
                            {c.isNew && <Badge tone="new">{tr(ui.newBadge, lang)}</Badge>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.id}>
                  <Link
                    href={localHref(lang, item.href)}
                    onClick={onClose}
                    tabIndex={open ? 0 : -1}
                    className="block py-4 text-[17px] font-semibold text-foreground"
                  >
                    {tr(item.label, lang)}
                  </Link>
                </li>
              ),
            )}
            <li>
              <Link
                href={localHref(lang, "#contact")}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                className="block py-4 text-[17px] font-semibold text-foreground"
              >
                {tr(ui.contact, lang)}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="space-y-3 border-t border-border p-5">
          <LanguageSwitcher lang={lang} label={tr(ui.language, lang)} variant="list" />
          <Link
            href={`/${lang}/login`}
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-white"
          >
            <UserRound className="size-4" aria-hidden /> {tr(ui.login, lang)}
          </Link>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { hasLocale, tr } from "@/i18n/config";
import { loginCopy as c } from "@/data/home";
import LoginForm from "@/components/auth/LoginForm";
import HeroScene from "@/components/home/HeroScene";

export async function generateMetadata({ params }: PageProps<"/[lang]/login">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: tr(c.title, lang), robots: { index: false, follow: true } };
}

export default async function LoginPage({ params }: PageProps<"/[lang]/login">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <section className="relative isolate overflow-hidden rounded-b-[2rem] sm:rounded-b-[3rem]">
      <HeroScene className="absolute inset-0 -z-10 h-full w-full" />
      <div className="absolute inset-0 -z-10 bg-white/35" aria-hidden />

      <div className="mx-auto flex min-h-[860px] w-full max-w-md flex-col justify-center px-5 pb-24 pt-32">
        <Link href={`/${lang}`} className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur hover:bg-white">
          <ArrowLeft className="size-4" aria-hidden /> {tr(c.back, lang)}
        </Link>
        <div className="rounded-[28px] bg-surface p-7 shadow-[0_30px_80px_-30px_rgb(10_74_48/0.45)] sm:p-9">
          <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">{tr(c.title, lang)}</h1>
          <p className="mt-2 text-muted">{tr(c.text, lang)}</p>
          <div className="mt-8">
            <LoginForm lang={lang} />
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            {tr(c.noAccount, lang)}{" "}
            <Link href={`/${lang}#contact`} className="font-semibold text-accent hover:underline">
              {tr(c.contact, lang)}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

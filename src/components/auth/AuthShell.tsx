import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { tr, type Locale } from "@/i18n/config";
import { loginCopy } from "@/data/home";
import HeroScene from "@/components/home/HeroScene";

/** Нэвтрэх / бүртгүүлэх хуудасны нийтлэг хүрээ */
export default function AuthShell({ lang, title, text, children, footer }: { lang: Locale; title: string; text: string; children: ReactNode; footer: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden rounded-b-[2rem] sm:rounded-b-[3rem]">
      <HeroScene className="absolute inset-0 -z-10 h-full w-full" />
      <div className="absolute inset-0 -z-10 bg-white/35" aria-hidden />

      <div className="mx-auto flex min-h-[860px] w-full max-w-md flex-col justify-center px-5 pb-24 pt-32">
        <Link href={`/${lang}`} className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur hover:bg-white">
          <ArrowLeft className="size-4" aria-hidden /> {tr(loginCopy.back, lang)}
        </Link>
        <div className="rounded-[28px] bg-surface p-7 shadow-[0_30px_80px_-30px_rgb(10_74_48/0.45)] sm:p-9">
          <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">{title}</h1>
          <p className="mt-2 text-muted">{text}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-6 text-center text-sm text-muted">{footer}</p>
        </div>
      </div>
    </section>
  );
}

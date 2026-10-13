import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, tr } from "@/i18n/config";
import { loginCopy as c } from "@/data/home";
import AuthShell from "@/components/auth/AuthShell";
import EmailConfirmNotice from "@/components/auth/EmailConfirmNotice";
import LoginForm from "@/components/auth/LoginForm";

export async function generateMetadata({ params }: PageProps<"/[lang]/login">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: tr(c.title, lang), robots: { index: false, follow: true } };
}

export default async function LoginPage({ params, searchParams }: PageProps<"/[lang]/login">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { next, confirmed } = await searchParams;

  return (
    <AuthShell
      lang={lang}
      title={tr(c.title, lang)}
      text={tr(c.text, lang)}
      footer={
        <>
          {tr(c.noAccount, lang)}{" "}
          <Link href={`/${lang}/register`} className="font-semibold text-accent hover:underline">
            {tr(c.register, lang)}
          </Link>
        </>
      }
    >
      <EmailConfirmNotice lang={lang} confirmed={confirmed === "1"} />
      <LoginForm lang={lang} next={typeof next === "string" ? next : null} />
    </AuthShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, tr } from "@/i18n/config";
import { registerCopy as c } from "@/data/home";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export async function generateMetadata({ params }: PageProps<"/[lang]/register">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: tr(c.title, lang), robots: { index: false, follow: true } };
}

export default async function RegisterPage({ params }: PageProps<"/[lang]/register">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <AuthShell
      lang={lang}
      title={tr(c.title, lang)}
      text={tr(c.text, lang)}
      footer={
        <>
          {tr(c.haveAccount, lang)}{" "}
          <Link href={`/${lang}/login`} className="font-semibold text-accent hover:underline">
            {tr(c.login, lang)}
          </Link>
        </>
      }
    >
      <RegisterForm lang={lang} />
    </AuthShell>
  );
}

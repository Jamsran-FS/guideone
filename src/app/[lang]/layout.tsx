import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "@fontsource/noto-sans-kr/korean-400.css";
import "@fontsource/noto-sans-kr/korean-500.css";
import "@fontsource/noto-sans-kr/korean-700.css";
import "../globals.css";
import { hasLocale, locales, tr } from "@/i18n/config";
import { site } from "@/data/site";
import { meta } from "@/data/home";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealObserver from "@/components/ui/RevealObserver";

// Фонтуудыг @fontsource-оор өөр дээрээ host хийсэн (Google Fonts-оос хамааралгүй)

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: "#0a4a30" };

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const title = tr(meta.title, lang);
  const description = tr(meta.description, lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | GuideOne` },
    description,
    applicationName: "GuideOne",
    alternates: {
      canonical: `/${lang}`,
      languages: { mn: "/mn", en: "/en", ko: "/ko", "x-default": "/mn" },
    },
    openGraph: {
      type: "website",
      siteName: "GuideOne",
      title,
      description,
      url: `/${lang}`,
      locale: { mn: "mn_MN", en: "en_US", ko: "ko_KR" }[lang],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang}>
      <body className="min-h-dvh">
        <Navbar lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
        <RevealObserver />
      </body>
    </html>
  );
}

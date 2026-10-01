import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import CourseSection from "@/components/home/CourseSection";
import WhyGuideOne from "@/components/home/WhyGuideOne";
import ServicesSection from "@/components/home/ServicesSection";
import PartnerSchools from "@/components/home/PartnerSchools";
import KoreaStudyProcess from "@/components/home/KoreaStudyProcess";
import TeachersSection from "@/components/home/TeachersSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import ContactCTA from "@/components/home/ContactCTA";
import { faqs } from "@/data/faq";
import { site } from "@/data/site";
import { tr } from "@/i18n/config";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  // Structured data — зөвхөн баталгаажсан мэдээлэл
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: site.name,
      url: `${site.url}/${lang}`,
      logo: `${site.url}/logo-full.png`,
      telephone: site.phones,
      address: { "@type": "PostalAddress", streetAddress: tr(site.address, lang), addressLocality: "Ulaanbaatar", addressCountry: "MN" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: tr(f.q, lang),
        acceptedAnswer: { "@type": "Answer", text: tr(f.a, lang) },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero lang={lang} />
      <Intro lang={lang} />
      <CourseSection lang={lang} />
      <WhyGuideOne lang={lang} />
      <ServicesSection lang={lang} />
      <PartnerSchools lang={lang} />
      <KoreaStudyProcess lang={lang} />
      <TeachersSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <FAQSection lang={lang} />
      <ContactCTA lang={lang} />
    </>
  );
}

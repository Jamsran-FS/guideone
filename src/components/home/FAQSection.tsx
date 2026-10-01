import { ArrowRight } from "lucide-react";
import { tr, type Locale } from "@/i18n/config";
import { faqs } from "@/data/faq";
import { faqCopy, ui } from "@/data/home";
import Accordion from "../ui/Accordion";
import Button from "../ui/Button";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function FAQSection({ lang }: { lang: Locale }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-surface py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq-title" eyebrow={tr(faqCopy.eyebrow, lang)} title={tr(faqCopy.title, lang)} text={tr(faqCopy.text, lang)} />
            <Button href={`/${lang}#contact`} variant="secondary" className="mt-8">
              {tr(ui.contact, lang)} <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6" data-reveal>
          <Accordion items={faqs.map((f) => ({ q: tr(f.q, lang), a: tr(f.a, lang) }))} />
        </div>
      </Container>
    </section>
  );
}

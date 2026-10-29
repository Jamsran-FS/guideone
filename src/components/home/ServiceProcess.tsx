import { tr, type Locale } from "@/i18n/config";
import { getContent } from "@/lib/content";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

/** "Үйлчилгээ авах үйл явц" — дугаартай алхмууд, хооронд нь шугам (админ: Хуудасны текст → Үйлчилгээ авах үйл явц) */
export default async function ServiceProcess({ lang }: { lang: Locale }) {
  const { serviceProcess: p } = await getContent();
  const steps = p.steps.filter((s) => tr(s.title, lang).trim());
  if (steps.length === 0) return null;

  return (
    <section id="process" aria-labelledby="service-process-title" className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeading id="service-process-title" eyebrow={tr(p.eyebrow, lang)} title={tr(p.title, lang)} text={tr(p.text, lang).trim() || undefined} />

        <ol
          className="mt-16 grid lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] lg:gap-6"
          style={{ ["--steps" as string]: steps.length }}
        >
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              <li
                key={i}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className="relative grid grid-cols-[64px_1fr] gap-5 pb-10 last:pb-0 lg:block lg:pb-0 lg:text-center"
              >
                {/* Холбогч шугам: mobile — босоо, desktop — хэвтээ (дараагийн тойрог хүртэл) */}
                {!last && (
                  <>
                    <span className="absolute bottom-0 left-[31px] top-16 w-0.5 bg-primary-soft lg:hidden" aria-hidden />
                    <span
                      className="absolute left-[calc(50%+40px)] right-[calc(-50%+16px)] top-8 hidden h-1 rounded-full bg-primary-soft lg:block"
                      aria-hidden
                    />
                  </>
                )}
                <span
                  className={`relative z-10 grid size-16 place-items-center rounded-full font-display text-2xl font-bold text-white lg:mx-auto ${
                    last ? "bg-primary" : "bg-accent"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="lg:mt-7">
                  <h3 className="pt-3 font-display text-lg font-bold leading-snug text-foreground lg:pt-0">{tr(s.title, lang)}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted lg:mx-auto lg:max-w-[16rem]">{tr(s.text, lang)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

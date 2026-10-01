# GuideOne — Korean education & study-in-Korea

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Lucide · 3 хэл (mn / en / ko)

```bash
npm install
npm run dev            # http://localhost:3000 → /mn
npm run build && npm start
```

`.env.example`-ийг `.env.local` болгон хуулж, `NEXT_PUBLIC_SITE_URL`-д бодит домэйнээ бичнэ.

## Контент засах — `src/data/`

| Файл | Агуулга |
|---|---|
| `site.ts` | Хаяг, утас, и-мэйл, сошиал, цэс. **Хоосон утга сайт дээр харагдахгүй.** |
| `courses.ts` | Сургалтын картууд (placeholder). `duration`/`price` нэмэхэд автоматаар гарна |
| `services.ts` | 2 үйлчилгээ + `/services/[slug]` хуудас. `details` дахь `null` = "Удахгүй шинэчлэгдэнэ" |
| `teachers.ts` | Хоосон → "удахгүй" төлөв. Багш нэмэхэд картаар харагдана |
| `testimonials.ts` | Хоосон → "Таны дараагийн түүх энд эхэлнэ." Зөвхөн бодит сэтгэгдэл |
| `faq.ts` | Асуулт/хариулт. Тодорхойгүй бол "зөвлөхөөс тодруулна уу" |
| `home.ts` | Хэсгүүдийн гарчиг, товч, формын шошго |

Бүх текст `{ mn, en, ko }` бүтэцтэй — CMS/API руу шилжүүлэхэд бэлэн.
**Зохиомол тоо, нэр, үнэ, сэтгэгдэл, түншлэл оруулаагүй.**

## Брэнд өнгө — `src/app/globals.css`

`--primary`, `--accent`, `--signal`, `--background` … зөвхөн `:root` дотор солиход хангалттай.

## Бүтэц

```
src/
  app/[lang]/           layout (Navbar, Footer, metadata), page, services/[slug], opengraph-image
  app/                  icon, sitemap.ts, robots.ts, globals.css
  components/layout/    Navbar, Footer, Logo, LanguageSwitcher
  components/home/      Hero, JourneyVisual, Intro, CourseSection, WhyGuideOne, ServicesSection,
                        KoreaStudyProcess, TeachersSection, TestimonialsSection, FAQSection,
                        ContactCTA, ContactForm
  components/ui/        Button, SectionHeading, Badge, Container, Accordion, Card, Icon,
                        RevealObserver, BackToTop, Flags, SocialIcons
  data/                 контент
  lib/contact.ts        Формын илгээлт (одоогоор mock — API-тай холбоно)
  i18n/config.ts        хэлний тохиргоо
  proxy.ts              "/" → хэрэглэгчийн хэл рүү
```

## Хуучин файлууд (устгаж болно)

Өмнөх хувилбарын эдгээр файл одоо хоосон (`export {}`), ашиглагдахгүй:
`src/app/layout.tsx`, `src/app/page.tsx`, `src/data/content.ts`, `src/i18n/dictionaries/`,
`src/i18n/get-dictionary.ts`, `src/i18n/site.ts`, `src/components/*.tsx` (дэд хавтасны гадна байгаа бүх .tsx).

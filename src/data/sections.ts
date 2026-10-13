import * as home from "./home";
import { site } from "./site";

/**
 * Админаас засагдах хуудасны хэсгүүд: түлхүүр нь Supabase-ийн `site_content.key`, утга нь анхны (static) текст.
 * DB-д тухайн хэсэг байхгүй эсвэл backend ажиллахгүй үед эдгээр утга харагдана.
 * `ui`, `loginCopy` зэрэг товч/цэсний текстүүд кодонд үлдэнэ.
 */
const { url, ...siteSettings } = site;
void url; // production домэйн нь .env-ээс (NEXT_PUBLIC_SITE_URL) — DB-д хадгалахгүй

export const defaultSections = {
  site: siteSettings,
  meta: home.meta,
  hero: home.hero,
  intro: home.intro,
  coursesCopy: home.coursesCopy,
  why: home.why,
  servicesCopy: home.servicesCopy,
  partnersCopy: home.partnersCopy,
  process: home.process,
  teachersCopy: home.teachersCopy,
  testimonialsCopy: home.testimonialsCopy,
  faqCopy: home.faqCopy,
  contactCopy: home.contactCopy,
  footerCopy: home.footerCopy,
  serviceDetailCopy: home.serviceDetailCopy,
};

export type Sections = typeof defaultSections;
export type SectionKey = keyof Sections;

export const isSectionKey = (key: string): key is SectionKey => key in defaultSections;

/** Админ самбарт харагдах нэр */
export const sectionLabels: Record<SectionKey, { title: string; text: string }> = {
  site: { title: "Байгууллагын мэдээлэл", text: "Хаяг, утас, и-мэйл, сошиал холбоос, hero зураг, газрын зураг" },
  meta: { title: "SEO", text: "Хайлтын системд харагдах гарчиг, тайлбар" },
  hero: { title: "Нүүр — Hero", text: "Хамгийн дээд хэсгийн гарчиг, текст, товчнууд" },
  intro: { title: "GuideOne гэж юу вэ?", text: "Танилцуулга ба 4 үндсэн чиглэл" },
  coursesCopy: { title: "Сургалт хэсэг", text: "Сургалтын хэсгийн гарчиг, тайлбар" },
  why: { title: "Яагаад GuideOne?", text: "Бидний зарчим" },
  servicesCopy: { title: "Үйлчилгээ хэсэг", text: "Үйлчилгээний хэсгийн гарчиг, хэлний сургалтын карт" },
  partnersCopy: { title: "Хамтрагч сургууль хэсэг", text: "Хамтрагч сургуулиудын хэсгийн гарчиг, текст" },
  process: { title: "Солонгост суралцах зам", text: "Алхам алхмаар тайлбар" },
  teachersCopy: { title: "Багш нар хэсэг", text: "Багш нарын хэсгийн гарчиг" },
  testimonialsCopy: { title: "Сэтгэгдэл хэсэг", text: "Сэтгэгдлийн хэсгийн гарчиг, хоосон үеийн текст" },
  faqCopy: { title: "Түгээмэл асуулт хэсэг", text: "FAQ хэсгийн гарчиг" },
  contactCopy: { title: "Холбоо барих", text: "Холбоо барих хэсэг ба формын текстүүд" },
  footerCopy: { title: "Footer", text: "Хуудасны доод хэсэг" },
  serviceDetailCopy: { title: "Үйлчилгээний дэлгэрэнгүй хуудас", text: "Үйлчилгээний хуудсуудын нийтлэг текст" },
};

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
  about: home.about,
  directions: home.directions,
  coursesCopy: home.coursesCopy,
  advantages: home.advantages,
  servicesCopy: home.servicesCopy,
  partnersCopy: home.partnersCopy,
  serviceProcess: home.serviceProcess,
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
  about: { title: "Бидний тухай", text: "Компанийн танилцуулга, тоон үзүүлэлтүүд, алсын хараа, эрхэм зорилго, үнэт зүйлс" },
  directions: { title: "Үйлчилгээний чиглэл", text: "5 чиглэлийн үйлчилгээ — дүрс, нэр, тайлбар, хэнд зориулсан" },
  coursesCopy: { title: "Сургалт хэсэг", text: "Сургалтын хэсгийн гарчиг, тайлбар" },
  advantages: { title: "Бидний давуу тал", text: "Давуу талууд — дүрс, өнгө, гарчиг, тайлбар" },
  servicesCopy: { title: "Үйлчилгээ хэсэг", text: "Үйлчилгээний хэсгийн гарчиг, хэлний сургалтын карт" },
  partnersCopy: { title: "Хамтрагч сургууль хэсэг", text: "Хамтрагч сургуулиудын хэсгийн гарчиг, текст" },
  serviceProcess: { title: "Үйлчилгээ авах үйл явц", text: "Нүүр хуудасны алхмуудын дараалал" },
  process: { title: "Солонгост суралцах зам", text: "Солонгост суралцах үйлчилгээний хуудасны алхмууд" },
  teachersCopy: { title: "Багш нар хэсэг", text: "Багш нарын хэсгийн гарчиг" },
  testimonialsCopy: { title: "Сэтгэгдэл хэсэг", text: "Сэтгэгдлийн хэсгийн гарчиг, хоосон үеийн текст" },
  faqCopy: { title: "Түгээмэл асуулт хэсэг", text: "FAQ хэсгийн гарчиг" },
  contactCopy: { title: "Холбоо барих", text: "Холбоо барих хэсэг ба формын текстүүд" },
  footerCopy: { title: "Footer", text: "Хуудасны доод хэсэг" },
  serviceDetailCopy: { title: "Үйлчилгээний дэлгэрэнгүй хуудас", text: "Үйлчилгээний хуудсуудын нийтлэг текст" },
};

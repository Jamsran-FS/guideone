import type { Localized } from "@/i18n/config";

/**
 * Солонгос дахь хамтрагч сургуулиуд. Одоогоор ХООСОН — зөвхөн БОДИТ гэрээтэй сургуулийг нэмнэ.
 * Хоосон үед "жагсаалт удахгүй нийтлэгдэнэ" төлөв харагдана.
 *
 * Жишээ:
 * { name: { mn: "...", en: "...", ko: "..." }, city: { mn: "Сөүл", en: "Seoul", ko: "서울" },
 *   type: { mn: "Их сургууль", en: "University", ko: "대학교" }, logo: "/partners/name.png", url: "https://..." }
 */
export type Partner = {
  name: Localized;
  city?: Localized;
  type?: Localized;
  logo?: string;
  url?: string;
};

export const partners: Partner[] = [];

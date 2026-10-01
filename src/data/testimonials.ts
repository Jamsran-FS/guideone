import type { Localized } from "@/i18n/config";

/**
 * Суралцагчдын сэтгэгдэл. Одоогоор ХООСОН — зөвхөн БОДИТ, зөвшөөрөл авсан сэтгэгдэл нэмнэ.
 * Хоосон үед "Таны дараагийн түүх энд эхэлнэ." төлөв харагдана.
 */
export type Testimonial = {
  name: string;
  /** Жишээ: "TOPIK II бэлтгэл", "Хэлний бэлтгэл, D-4" */
  context?: Localized;
  quote: Localized;
  image?: string;
};

export const testimonials: Testimonial[] = [];

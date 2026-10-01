import type { Localized } from "@/i18n/config";

/**
 * Багш нарын мэдээлэл. Одоогоор ХООСОН — бодит мэдээлэл ирэхэд нэмнэ.
 * Хоосон үед сайт дээр "удахгүй шинэчлэгдэнэ" гэсэн төлөв (empty state) харагдана.
 *
 * Жишээ:
 * {
 *   name: "Нэр",
 *   image: "/teachers/name.jpg",          // public/teachers/ дотор
 *   position: { mn: "...", en: "...", ko: "..." },
 *   specialty: { mn: "...", en: "...", ko: "..." },
 *   experience: { mn: "...", en: "...", ko: "..." },
 *   description: { mn: "...", en: "...", ko: "..." },
 * }
 */
export type Teacher = {
  name: string;
  image?: string;
  position: Localized;
  specialty?: Localized;
  experience?: Localized;
  description?: Localized;
};

export const teachers: Teacher[] = [];

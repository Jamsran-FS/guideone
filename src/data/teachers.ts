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
 *   education: [{ school: {...}, field: {...}, degree: "bachelor", start: "2014", end: "2018", status: "completed" }],
 * }
 */
export type Degree = "bachelor" | "master" | "phd" | "training";
export type EducationStatus = "completed" | "in_progress";

export type Education = {
  school: Localized;
  /** Мэргэжил / тэнхим */
  field: Localized | null;
  degree: Degree | null;
  start: string | null;
  end: string | null;
  status: EducationStatus;
};

export const degreeLabels: Record<Degree, Localized> = {
  bachelor: { mn: "Бакалавр", en: "Bachelor's", ko: "학사" },
  master: { mn: "Магистр", en: "Master's", ko: "석사" },
  phd: { mn: "Доктор", en: "PhD", ko: "박사" },
  training: { mn: "Сургалт", en: "Training", ko: "수료 과정" },
};

export const educationStatusLabels: Record<EducationStatus, Localized> = {
  completed: { mn: "Төгссөн", en: "Graduated", ko: "졸업" },
  in_progress: { mn: "Суралцаж байгаа", en: "In progress", ko: "재학 중" },
};

/** "Одоо" — суралцаж байгаа үед төгсөх оны оронд */
export const presentLabel: Localized = { mn: "одоо", en: "present", ko: "현재" };

export type Teacher = {
  name: string;
  image?: string;
  position: Localized;
  specialty?: Localized;
  experience?: Localized;
  description?: Localized;
  education?: Education[];
};

export const teachers: Teacher[] = [];

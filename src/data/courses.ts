import type { Localized } from "@/i18n/config";

/**
 * Сургалтын жагсаалт — ЖИШЭЭ БҮТЭЦ (placeholder).
 * Бодит хөтөлбөр батлагдмагц нэр, тайлбар, хугацааг энд шинэчилнэ.
 * `duration: null` бол карт дээр "Зөвлөхөөс тодруулна" гэж харагдана.
 * Үнэ одоогоор оруулаагүй — `price` талбар нэмэхэд картад автоматаар гарна.
 */
export type Course = {
  slug: string;
  /** Карт дээрх том солонгос тэмдэгт */
  glyph: string;
  name: Localized;
  level: Localized;
  description: Localized;
  duration: Localized | null;
  price?: Localized | null;
  isPlaceholder: boolean;
};

export const courses: Course[] = [
  {
    slug: "beginner",
    glyph: "초급",
    name: { mn: "Анхан шат", en: "Beginner", ko: "초급" },
    level: { mn: "Эхлэгч", en: "Starter", ko: "입문" },
    description: {
      mn: "Хангул цагаан толгой, дуудлага, өдөр тутмын энгийн харилцааны суурь.",
      en: "Hangul, pronunciation and the foundations of everyday conversation.",
      ko: "한글, 발음, 일상 회화의 기초.",
    },
    duration: null,
    isPlaceholder: true,
  },
  {
    slug: "intermediate",
    glyph: "중급",
    name: { mn: "Дунд шат", en: "Intermediate", ko: "중급" },
    level: { mn: "Дунд", en: "Intermediate", ko: "중급" },
    description: {
      mn: "Дүрмийн ойлголтоо гүнзгийрүүлж, унших, бичих, ярих чадвараа тэнцвэртэй хөгжүүлэх.",
      en: "Deepen your grammar and build balanced reading, writing and speaking skills.",
      ko: "문법을 심화하고 읽기·쓰기·말하기를 균형 있게 키웁니다.",
    },
    duration: null,
    isPlaceholder: true,
  },
  {
    slug: "advanced",
    glyph: "고급",
    name: { mn: "Ахисан шат", en: "Advanced", ko: "고급" },
    level: { mn: "Ахисан", en: "Advanced", ko: "고급" },
    description: {
      mn: "Академик болон мэргэжлийн орчинд хэрэглэх нарийн илэрхийлэл, бичгийн хэл.",
      en: "Nuanced expression and written Korean for academic and professional settings.",
      ko: "학업·업무 환경에서 쓰는 정교한 표현과 문어체.",
    },
    duration: null,
    isPlaceholder: true,
  },
  {
    slug: "topik",
    glyph: "토픽",
    name: { mn: "TOPIK бэлтгэл", en: "TOPIK preparation", ko: "TOPIK 대비" },
    level: { mn: "Шалгалтын бэлтгэл", en: "Exam prep", ko: "시험 대비" },
    description: {
      mn: "TOPIK шалгалтын бүтэц, даалгаврын төрлүүдтэй танилцаж, зорилтот түвшиндээ бэлдэх.",
      en: "Get to know the TOPIK format and task types, and prepare for your target level.",
      ko: "TOPIK 시험 구성과 문제 유형을 익히고 목표 급수를 준비합니다.",
    },
    duration: null,
    isPlaceholder: true,
  },
];

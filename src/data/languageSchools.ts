import type { Localized } from "@/i18n/config";
import type { PartnerRow } from "./partners";

/** Хэлний бэлтгэлийн сургууль — админ: "Хэлний бэлтгэл" (language_schools хүснэгт) */
export type LanguageSchool = {
  id: number;
  name: Localized;
  city?: Localized;
  visaType?: "e_visa" | "regular";
  tuition?: Localized;
  /** Онцлох мөр: "Хэлний бэлтгэл + Бакалавр = 4 жил" */
  headline?: Localized;
  highlights: Localized<string[]>;
  /** Тэтгэлэг: нөхцөл → хөнгөлөлт */
  scholarships: PartnerRow[];
  description?: Localized;
  logo?: string;
  image?: string;
  url?: string;
};

/** Backend ажиллахгүй үед — зохиомол сургууль нэмэхгүй */
export const languageSchools: LanguageSchool[] = [];

export const languageCopy = {
  eyebrow: { mn: "Хэлний бэлтгэл", en: "Language programs", ko: "어학연수" },
  title: { mn: "Солонгос дахь хэлний бэлтгэлийн сургуулиуд", en: "Korean language programs in Korea", ko: "한국 어학연수 학교" },
  text: {
    mn: "Солонгост хэлний бэлтгэлд суралцаж, дараа нь их сургуульд үргэлжлүүлэн суралцах боломжтой сургуулиуд.",
    en: "Study Korean at a language institute in Korea, then continue on to university.",
    ko: "한국에서 어학연수를 받고 대학 진학까지 이어갈 수 있는 학교들입니다.",
  },
  location: { mn: "Байршил", en: "Location", ko: "위치" },
  visa: { mn: "Визний төрөл", en: "Visa type", ko: "비자 유형" },
  eVisa: { mn: "Цахим визтэй", en: "E-visa", ko: "전자비자" },
  regularVisa: { mn: "Цахим бус визтэй", en: "Standard visa", ko: "일반 비자" },
  tuition: { mn: "Сургалтын төлбөр", en: "Tuition", ko: "등록금" },
  scholarships: { mn: "Тэтгэлэг", en: "Scholarships", ko: "장학금" },
  website: { mn: "Вэбсайт", en: "Website", ko: "웹사이트" },
  apply: { mn: "Зөвлөгөө авах", en: "Get advice", ko: "상담 신청" },
  empty: {
    mn: "Хэлний бэлтгэлийн сургуулиудын жагсаалт удахгүй нийтлэгдэнэ. Одоогийн боломжуудыг GuideOne-ийн зөвлөхөөс тодруулна уу.",
    en: "The list of language programs will be published soon. Please ask a GuideOne advisor about current options.",
    ko: "어학연수 학교 목록은 곧 공개됩니다. 현재 가능한 학교는 GuideOne 상담사에게 문의해 주세요.",
  },
  note: {
    mn: "Төлбөр, тэтгэлгийн хэмжээ өөрчлөгдөж болно. Хамгийн сүүлийн мэдээллийг зөвлөхөөс тодруулна уу.",
    en: "Fees and scholarships may change. Please confirm the latest details with an advisor.",
    ko: "등록금과 장학금은 변경될 수 있습니다. 최신 정보는 상담사에게 확인해 주세요.",
  },
} satisfies Record<string, Localized>;

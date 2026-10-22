import type { Localized } from "@/i18n/config";

/**
 * Солонгос дахь хамтрагч сургуулиуд. Одоогоор ХООСОН — зөвхөн БОДИТ гэрээтэй сургуулийг нэмнэ.
 * Хоосон үед "жагсаалт удахгүй нийтлэгдэнэ" төлөв харагдана.
 *
 * Жишээ:
 * { name: { mn: "...", en: "...", ko: "..." }, city: { mn: "Сөүл", en: "Seoul", ko: "서울" },
 *   type: { mn: "Их сургууль", en: "University", ko: "대학교" }, logo: "/partners/name.png", url: "https://..." }
 */
export type PartnerRow = { label: Localized; value: Localized | null };

export type Partner = {
  /** DB-ийн id (өргөдлийн форм болон /partners/[id] хуудсанд ашиглана) */
  id?: number;
  name: Localized;
  city?: Localized;
  type?: Localized;
  logo?: string;
  image?: string;
  url?: string;
  description?: Localized;
  requirements: Localized<string[]>;
  /** Сургалтын төлбөр: салбар → төлбөр */
  tuition: PartnerRow[];
  /** Тэтгэлэг: нөхцөл → хөнгөлөлт */
  scholarships: PartnerRow[];
  /** Элсэлтийн хугацаа */
  intakes: PartnerRow[];
  /** Бусад зардал: банкны баталгаа, дотуур байр г.м. */
  costs: PartnerRow[];
  majors: Localized<string[]>;
};

/** Сургуулийн дэлгэрэнгүй хуудасны текстүүд */
export const partnerCopy = {
  back: { mn: "Хамтрагч сургуулиуд", en: "Partner schools", ko: "협력 학교" },
  more: { mn: "Дэлгэрэнгүй", en: "Details", ko: "자세히 보기" },
  website: { mn: "Албан ёсны вэбсайт", en: "Official website", ko: "공식 웹사이트" },
  requirements: { mn: "Элсэх шаардлага", en: "Admission requirements", ko: "입학 조건" },
  tuition: { mn: "Сургалтын төлбөр", en: "Tuition", ko: "등록금" },
  scholarships: { mn: "Тэтгэлэг", en: "Scholarships", ko: "장학금" },
  intakes: { mn: "Элсэлтийн хугацаа", en: "Application periods", ko: "모집 기간" },
  costs: { mn: "Бусад зардал", en: "Other costs", ko: "기타 비용" },
  majors: { mn: "Мэргэжлүүд", en: "Majors", ko: "전공" },
  pending: { mn: "Тодруулна", en: "Ask us", ko: "문의" },
  note: {
    mn: "Төлбөр, тэтгэлгийн хэмжээ жил бүр өөрчлөгдөж болно. Хамгийн сүүлийн мэдээллийг GuideOne-ийн зөвлөхөөс тодруулна уу.",
    en: "Fees and scholarships may change every year. Please confirm the latest details with a GuideOne advisor.",
    ko: "등록금과 장학금은 매년 변경될 수 있습니다. 최신 정보는 GuideOne 상담사에게 확인해 주세요.",
  },
  ctaTitle: { mn: "Энэ сургуульд элсэх үү?", en: "Want to apply to this school?", ko: "이 학교에 지원하고 싶으신가요?" },
  ctaText: {
    mn: "Бичиг баримт бүрдүүлэлтээс виз хүртэл GuideOne-ийн зөвлөх тантай хамт алхана.",
    en: "From documents to your visa, a GuideOne advisor will walk you through every step.",
    ko: "서류 준비부터 비자까지 GuideOne 상담사가 함께합니다.",
  },
  apply: { mn: "Зөвлөгөө авах", en: "Get advice", ko: "상담 신청" },
} satisfies Record<string, Localized>;

export const partners: Partner[] = [];

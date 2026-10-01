import type { Localized } from "@/i18n/config";

/**
 * Үйлчилгээнүүд. `slug` нь /[lang]/services/[slug] хуудсыг үүсгэнэ.
 * `details` доторх null утгууд "Удахгүй шинэчлэгдэнэ" гэж харагдана —
 * бодит мэдээлэл (оператор, үнэ г.м.) батлагдмагц энд бөглөнө.
 */
export type ServiceDetail = { label: Localized; value: Localized | null };

export type Service = {
  slug: "korea-study" | "korea-number";
  title: Localized;
  description: Localized;
  /** Дэлгэрэнгүй хуудсанд: зөвлөхөөс асууж болох сэдвүүд (амлалт биш) */
  topics: Localized<string[]>;
  details?: ServiceDetail[];
  isNew: boolean;
};

export const services: Service[] = [
  {
    slug: "korea-study",
    title: { mn: "Солонгост суралцах зуучлал", en: "Study in Korea consulting", ko: "한국 유학 컨설팅" },
    description: {
      mn: "GuideOne нь Солонгос дахь хамтран ажилладаг сургуулиуд руугаа суралцагчдыг зуучилдаг. Сургууль, хөтөлбөр сонголт болон суралцахтай холбоотой дараагийн алхмуудаа тодорхойлоход тань тусална.",
      en: "GuideOne places students at its partner schools in South Korea. We help you choose a school and program and define your next steps.",
      ko: "GuideOne은 한국의 협력 학교로 학생들의 유학을 연결합니다. 학교·프로그램 선택과 유학 준비의 다음 단계를 함께 정리해 드립니다.",
    },
    topics: {
      mn: [
        "GuideOne-ий хамтрагч сургуулиуд ба тэдгээрийн хөтөлбөр",
        "Хэлний бэлтгэл болон зэргийн хөтөлбөрийн ялгаа",
        "Зорилго, сонирхолдоо тохирох сургууль, мэргэжил",
        "Бүрдүүлэх материалын ерөнхий жагсаалт",
        "Өргөдөл гаргах хугацаа, дараалал",
        "Солонгост очихын өмнөх бэлтгэл",
      ],
      en: [
        "GuideOne's partner schools and their programs",
        "Language programs vs. degree programs",
        "Schools and majors that fit your goals",
        "A general list of required documents",
        "Application timelines and order of steps",
        "Preparing before you leave for Korea",
      ],
      ko: [
        "GuideOne 협력 학교와 프로그램",
        "어학연수와 학위 과정의 차이",
        "목표와 관심에 맞는 학교·전공",
        "준비 서류의 일반적인 목록",
        "지원 일정과 절차",
        "출국 전 준비 사항",
      ],
    },
    isNew: false,
  },
  {
    slug: "korea-number",
    title: { mn: "Солонгост ашиглах дугаар холболт", en: "Korean phone number setup", ko: "한국 휴대폰 번호 개통" },
    description: {
      mn: "Солонгост очихоосоо өмнө холбоотой байхад зориулсан дугаар болон холболтын үйлчилгээ.",
      en: "A phone number and connectivity service so you can stay connected before you arrive in Korea.",
      ko: "한국에 도착하기 전부터 연결될 수 있도록 돕는 번호·통신 서비스입니다.",
    },
    topics: {
      mn: [
        "Танд тохирох холболтын төрөл",
        "Шаардлагатай бичиг баримт",
        "Захиалах, хүлээн авах дараалал",
        "Солонгост очсоны дараах ашиглалт",
      ],
      en: [
        "Which connection type suits you",
        "Documents you'll need",
        "How ordering and pickup work",
        "Using your number after you arrive",
      ],
      ko: ["나에게 맞는 연결 방식", "필요한 서류", "신청 및 수령 절차", "도착 후 이용 방법"],
    },
    details: [
      { label: { mn: "Оператор", en: "Carrier", ko: "통신사" }, value: null },
      { label: { mn: "Багц, үнэ", en: "Plans & pricing", ko: "요금제·가격" }, value: null },
      { label: { mn: "Дата хэмжээ", en: "Data allowance", ko: "데이터 제공량" }, value: null },
      { label: { mn: "Хүчинтэй хугацаа", en: "Validity", ko: "유효 기간" }, value: null },
      { label: { mn: "SIM / eSIM", en: "SIM / eSIM", ko: "SIM / eSIM" }, value: null },
      { label: { mn: "Төхөөрөмжийн нийцтэй байдал", en: "Device compatibility", ko: "기기 호환성" }, value: null },
    ],
    isNew: true,
  },
];

/**
 * "Тун удахгүй" үйлчилгээнүүд — нүүр хуудас болон цэсэнд саарал төлөвтэй харагдана.
 * Нээгдэх үед `services` жагсаалт руу шилжүүлж, дэлгэрэнгүй мэдээлэл нэмнэ.
 */
export type UpcomingService = { slug: string; icon: string; title: Localized; description: Localized };

export const upcomingServices: UpcomingService[] = [
  {
    slug: "translation",
    icon: "Languages",
    title: { mn: "Баталгаат орчуулга", en: "Certified translation", ko: "공증 번역" },
    description: {
      mn: "Суралцах, виз мэдүүлэхэд шаардлагатай бичиг баримтын баталгаат орчуулга.",
      en: "Certified translation of documents for study and visa applications.",
      ko: "유학 및 비자 신청에 필요한 서류의 공증 번역.",
    },
  },
  {
    slug: "travel",
    icon: "Luggage",
    title: { mn: "Аялал жуулчлал", en: "Travel & tours", ko: "여행" },
    description: {
      mn: "Солонгос руу аялах, танилцах аялалд зориулсан үйлчилгээ.",
      en: "Services for trips and discovery tours to Korea.",
      ko: "한국 여행과 탐방을 위한 서비스.",
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

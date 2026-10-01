import type { Localized } from "@/i18n/config";

/**
 * Түгээмэл асуулт. Бизнесийн бодлого (үнэ, хугацаа, баталгаа г.м.) ЗОХИОХГҮЙ.
 * Мэдээлэл тодорхойгүй бол `ASK_ADVISOR` хариулт ашиглана.
 */
export type Faq = { q: Localized; a: Localized };

const ASK_ADVISOR: Localized = {
  mn: "Энэ мэдээллийг GuideOne-ийн зөвлөхөөс тодруулна уу.",
  en: "Please check this with a GuideOne advisor.",
  ko: "이 내용은 GuideOne 상담사에게 문의해 주세요.",
};

export const faqs: Faq[] = [
  {
    q: {
      mn: "Солонгос хэл огт мэдэхгүй хүн суралцаж болох уу?",
      en: "Can I join if I don't know any Korean?",
      ko: "한국어를 전혀 몰라도 수강할 수 있나요?",
    },
    a: {
      mn: "Анхан шатны сургалт нь Солонгос хэлийг эхнээс нь сурч буй хүмүүст зориулагдсан. Анги нээгдэх хуваарь болон дэлгэрэнгүйг GuideOne-ийн зөвлөхөөс тодруулна уу.",
      en: "Our beginner course is meant for people starting Korean from scratch. Please check class schedules and details with a GuideOne advisor.",
      ko: "초급 과정은 한국어를 처음 배우는 분을 위한 과정입니다. 개강 일정과 자세한 내용은 GuideOne 상담사에게 문의해 주세요.",
    },
  },
  {
    q: {
      mn: "Сургалтын түвшинг хэрхэн тодорхойлох вэ?",
      en: "How is my course level determined?",
      ko: "수업 레벨은 어떻게 정하나요?",
    },
    a: ASK_ADVISOR,
  },
  {
    q: { mn: "TOPIK шалгалтад бэлтгэдэг үү?", en: "Do you offer TOPIK preparation?", ko: "TOPIK 시험 대비를 하나요?" },
    a: {
      mn: "TOPIK бэлтгэлийн сургалтын агуулга, хуваарийг GuideOne-ийн зөвлөхөөс тодруулна уу.",
      en: "Please check the content and schedule of TOPIK preparation with a GuideOne advisor.",
      ko: "TOPIK 대비 과정의 내용과 일정은 GuideOne 상담사에게 문의해 주세요.",
    },
  },
  {
    q: {
      mn: "Солонгост суралцахын тулд ямар материал шаардлагатай вэ?",
      en: "What documents do I need to study in Korea?",
      ko: "한국 유학에는 어떤 서류가 필요한가요?",
    },
    a: {
      mn: "Шаардлагатай материал нь сургууль болон хөтөлбөрөөс (жишээ нь хэлний бэлтгэл эсвэл зэргийн хөтөлбөр) хамаарч өөр байдаг. Ерөнхийдөө гадаад паспорт, боловсролын баримт бичиг, санхүүгийн баталгаа зэрэг шаардагддаг. Танд хамаарах жагсаалтыг GuideOne-ийн зөвлөхөөс тодруулна уу.",
      en: "Requirements differ by school and program (for example, a language program versus a degree program). Typically they include a passport, education documents and proof of finances. Please check the list that applies to you with a GuideOne advisor.",
      ko: "필요 서류는 학교와 과정(예: 어학연수, 학위 과정)에 따라 다릅니다. 일반적으로 여권, 학력 서류, 재정 증빙 등이 필요합니다. 본인에게 해당하는 목록은 GuideOne 상담사에게 문의해 주세요.",
    },
  },
  {
    q: {
      mn: "Сургууль сонгоход зөвлөгөө өгдөг үү?",
      en: "Do you help with choosing a school?",
      ko: "학교 선택에 대한 상담을 받을 수 있나요?",
    },
    a: {
      mn: "Тийм. GuideOne нь Солонгос дахь хамтран ажилладаг сургуулиуд руугаа суралцагчдыг зуучилдаг бөгөөд таны зорилго, сонирхолд тохирох сургууль, хөтөлбөрийг сонгоход тусална.",
      en: "Yes. GuideOne places students at its partner schools in Korea and helps you choose a school and program that fit your goals and interests.",
      ko: "네. GuideOne은 한국의 협력 학교로 유학을 연결하며, 목표와 관심에 맞는 학교와 프로그램 선택을 도와드립니다.",
    },
  },
  {
    q: {
      mn: "Солонгос дугаар хэрхэн холбох вэ?",
      en: "How do I get a Korean phone number?",
      ko: "한국 번호는 어떻게 개통하나요?",
    },
    a: {
      mn: "Холболтын дараалал болон шаардлагатай материалын талаар GuideOne-ийн зөвлөхөөс тодруулна уу.",
      en: "Please check the steps and required documents with a GuideOne advisor.",
      ko: "개통 절차와 필요 서류는 GuideOne 상담사에게 문의해 주세요.",
    },
  },
  {
    q: {
      mn: "Солонгост ашиглах дугаар ямар төхөөрөмж дээр ажиллах вэ?",
      en: "Which devices does the Korean number work on?",
      ko: "한국 번호는 어떤 기기에서 사용할 수 있나요?",
    },
    a: ASK_ADVISOR,
  },
];

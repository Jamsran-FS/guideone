import type { Localized } from "@/i18n/config";

/**
 * GuideOne — БАТАЛГААЖСАН мэдээлэл.
 * Зөвхөн бодит мэдээллийг энд оруулна. Хоосон ("") / null утгатай талбар сайт дээр харагдахгүй.
 */
export const site = {
  name: "GuideOne",
  /** Production домэйн — .env дээр NEXT_PUBLIC_SITE_URL тохируулна */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  address: {
    mn: "Улаанбаатар, Сүхбаатар дүүрэг, 4-р хороо, GD Plaza, 7 давхар, 701 тоот",
    en: "GD Plaza, 7th floor, Room 701, 4th khoroo, Sukhbaatar district, Ulaanbaatar",
    ko: "울란바토르 수흐바타르구 4동, GD Plaza 7층 701호",
  } satisfies Localized,
  city: { mn: "Улаанбаатар, Монгол", en: "Ulaanbaatar, Mongolia", ko: "몽골 울란바토르" } satisfies Localized,

  phones: ["+976 8606-3323", "+976 7775-3323"],

  /** Баталгаажаагүй — бодит и-мэйл гарвал энд бичнэ */
  email: null as string | null,

  /** Хоосон бол footer/холбоо барих хэсэгт харагдахгүй */
  socials: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },

  /**
   * Hero-ийн арын зураг. null бол код дээр зурсан Сөүлийн чимэглэл (HeroScene) харагдана.
   * Өөрийн зургаа public/hero/ дотор хийгээд жишээ нь "/hero/hero.jpg" гэж бичнэ (1920×1080+).
   */
  heroImage: "/hero/hero-mobile-v2.jpg" as string | null,
  /** Desktop-д бүтэн өргөнөөр харагдах зураг (1536×1024, 3:2). Карт, текст нь зургийн % байрлалаар тавигдана. */
  heroImageFull: "/hero/hero-full-v3.jpg" as string | null,

  /** Google Maps-ийн хайлтын утга (embed) */
  mapQuery: "GD Plaza, Ulaanbaatar",
};

export const tel = (p: string) => `tel:${p.replace(/[\s-]/g, "")}`;

export const mapEmbedUrl = (q: string, lang: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&hl=${lang}&z=16&output=embed`;
export const mapLinkUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

/* ── Navigation ─────────────────────────────────────────────── */

export type NavLink = {
  id: string;
  label: Localized;
  /** "#about" гэх мэт anchor, эсвэл "/services/..." зам. Хэлний prefix автоматаар нэмэгдэнэ. */
  href: string;
  children?: { id: string; label: Localized; text: Localized; href: string; icon: string; isNew?: boolean; soon?: boolean }[];
};

export const navigation: NavLink[] = [
  { id: "about", label: { mn: "Бидний тухай", en: "About", ko: "소개" }, href: "#about" },
  { id: "courses", label: { mn: "Сургалт", en: "Courses", ko: "강좌" }, href: "#courses" },
  {
    id: "services",
    label: { mn: "Үйлчилгээ", en: "Services", ko: "서비스" },
    href: "#services",
    children: [
      {
        id: "korea-study",
        label: { mn: "Солонгост суралцах зуучлал", en: "Study in Korea consulting", ko: "한국 유학 컨설팅" },
        text: {
          mn: "Сургууль, хөтөлбөр сонголт ба дараагийн алхмууд",
          en: "School and program choice, and your next steps",
          ko: "학교·프로그램 선택과 다음 단계",
        },
        href: "/services/korea-study",
        icon: "GraduationCap",
      },
      {
        id: "korea-number",
        label: { mn: "Солонгост ашиглах дугаар холболт", en: "Korean phone number", ko: "한국 휴대폰 번호 개통" },
        text: {
          mn: "Явахаасаа өмнө холбоотой байх үйлчилгээ",
          en: "Stay connected before you even arrive",
          ko: "출국 전부터 연결되는 서비스",
        },
        href: "/services/korea-number",
        icon: "Smartphone",
        isNew: true,
      },
      {
        id: "translation",
        label: { mn: "Баталгаат орчуулга", en: "Certified translation", ko: "공증 번역" },
        text: { mn: "Тун удахгүй", en: "Coming soon", ko: "곧 오픈" },
        href: "#services",
        icon: "Languages",
        soon: true,
      },
      {
        id: "travel",
        label: { mn: "Аялал жуулчлал", en: "Travel & tours", ko: "여행" },
        text: { mn: "Тун удахгүй", en: "Coming soon", ko: "곧 오픈" },
        href: "#services",
        icon: "Luggage",
        soon: true,
      },
    ],
  },
  { id: "teachers", label: { mn: "Багш нар", en: "Teachers", ko: "선생님" }, href: "#teachers" },
  { id: "testimonials", label: { mn: "Сэтгэгдэл", en: "Reviews", ko: "후기" }, href: "#testimonials" },
  { id: "faq", label: { mn: "Түгээмэл асуулт", en: "FAQ", ko: "자주 묻는 질문" }, href: "#faq" },
];

export const footerHelp: { label: Localized; href: string }[] = [
  { label: { mn: "Түгээмэл асуулт", en: "FAQ", ko: "자주 묻는 질문" }, href: "#faq" },
  { label: { mn: "Холбоо барих", en: "Contact", ko: "문의" }, href: "#contact" },
  { label: { mn: "Хамтрагч сургуулиуд", en: "Partner schools", ko: "협력 학교" }, href: "#partners" },
  { label: { mn: "Солонгост суралцах зуучлал", en: "Study in Korea", ko: "한국 유학 컨설팅" }, href: "/services/korea-study" },
  { label: { mn: "Солонгос дугаар холболт", en: "Korean number", ko: "한국 번호 개통" }, href: "/services/korea-number" },
];

export const footerNavigation: { label: Localized; href: string }[] = [
  { label: { mn: "Бидний тухай", en: "About", ko: "소개" }, href: "#about" },
  { label: { mn: "Сургалт", en: "Courses", ko: "강좌" }, href: "#courses" },
  { label: { mn: "Үйлчилгээ", en: "Services", ko: "서비스" }, href: "#services" },
  { label: { mn: "Багш нар", en: "Teachers", ko: "선생님" }, href: "#teachers" },
  { label: { mn: "FAQ", en: "FAQ", ko: "FAQ" }, href: "#faq" },
  { label: { mn: "Холбоо барих", en: "Contact", ko: "문의" }, href: "#contact" },
];

/** "/mn#about", "/en/services/korea-study" гэх мэт бүтэн холбоос */
export const localHref = (lang: string, href: string) => `/${lang}${href}`;

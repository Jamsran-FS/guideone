import type { Localized } from "@/i18n/config";

/**
 * Нүүр хуудасны хэсгүүдийн гарчиг, товч, шошго.
 * Зөвхөн брэндийн үнэт зүйл, үйлчилгээний зарчмыг илэрхийлнэ — тоо, амжилт зохиохгүй.
 */

type L = Localized;

export const meta = {
  title: {
    mn: "GuideOne | Солонгос хэл ба БНСУ-д суралцах зөвлөгөө",
    en: "GuideOne | Korean Language & Study in Korea Consulting",
    ko: "GuideOne | 한국어 교육 · 한국 유학 상담",
  } as L,
  description: {
    mn: "GuideOne — Солонгос хэлний сургалт, БНСУ-д суралцах зөвлөгөө болон Солонгост ашиглах үйлчилгээ.",
    en: "GuideOne — Korean language courses, study-in-Korea consulting and services for life in Korea.",
    ko: "GuideOne — 한국어 교육, 한국 유학 상담, 그리고 한국 생활을 위한 서비스.",
  } as L,
};

export const ui = {
  skip: { mn: "Үндсэн агуулга руу шилжих", en: "Skip to content", ko: "본문 바로가기" } as L,
  mainNav: { mn: "Үндсэн цэс", en: "Main navigation", ko: "주요 메뉴" } as L,
  home: { mn: "GuideOne нүүр хуудас", en: "GuideOne home", ko: "GuideOne 홈" } as L,
  menuOpen: { mn: "Цэс нээх", en: "Open menu", ko: "메뉴 열기" } as L,
  menuClose: { mn: "Цэс хаах", en: "Close menu", ko: "메뉴 닫기" } as L,
  language: { mn: "Хэл сонгох", en: "Language", ko: "언어 선택" } as L,
  contact: { mn: "Холбоо барих", en: "Contact", ko: "문의" } as L,
  call: { mn: "Залгах", en: "Call", ko: "전화" } as L,
  login: { mn: "Нэвтрэх", en: "Log in", ko: "로그인" } as L,
  newBadge: { mn: "ШИНЭ", en: "NEW", ko: "NEW" } as L,
  more: { mn: "Дэлгэрэнгүй", en: "Learn more", ko: "자세히 보기" } as L,
  toTop: { mn: "Дээш буцах", en: "Back to top", ko: "맨 위로" } as L,
  tagline: { mn: "Солонгос хэл · Зөвлөгөө", en: "Korean · Study abroad", ko: "한국어 · 유학 상담" } as L,
};

export const hero = {
  eyebrow: { mn: "Солонгос хэл · Суралцах зөвлөгөө", en: "Korean language · Study abroad", ko: "한국어 · 유학 상담" } as L,
  titleLine1: { mn: "Солонгос руу чиглэсэн", en: "Your next step", ko: "한국을 향한" } as L,
  titleLine2: { mn: "таны дараагийн алхам.", en: "toward Korea.", ko: "당신의 다음 걸음." } as L,
  text: {
    mn: "Солонгос хэлний сургалт, суралцах зөвлөгөө болон Солонгост ашиглах үйлчилгээг нэг дороос.",
    en: "Korean courses, study-abroad guidance and services for life in Korea — all in one place.",
    ko: "한국어 교육, 유학 상담, 그리고 한국에서 필요한 서비스까지 한 곳에서.",
  } as L,
  primary: { mn: "Сургалтуудыг үзэх", en: "View courses", ko: "강좌 보기" } as L,
  secondary: { mn: "Зөвлөгөө авах", en: "Get advice", ko: "상담 받기" } as L,
  imageAlt: {
    mn: "Сөүлийн Намсан цамхаг, ханок барилгын өмнө ирээдүй рүүгээ харж буй оюутан",
    en: "A student looking ahead in front of Namsan Tower and a hanok building in Seoul",
    ko: "남산타워와 한옥을 배경으로 미래를 바라보는 학생",
  } as L,
  routeFrom: { mn: "МОНГОЛ", en: "MONGOLIA", ko: "몽골" } as L,
  routeTo: { mn: "СОЛОНГОС", en: "KOREA", ko: "한국" } as L,
  quickLabel: { mn: "Манай үйлчилгээ", en: "Our services", ko: "서비스" } as L,
  quick: [
    { icon: "BookOpen", href: "#courses", label: { mn: "Солонгос хэлний сургалт", en: "Korean courses", ko: "한국어 강좌" } as L },
    { icon: "GraduationCap", href: "#contact", label: { mn: "Суралцах зөвлөгөө", en: "Study advice", ko: "유학 상담" } as L },
    { icon: "Plane", href: "/services/korea-study", label: { mn: "Солонгост суралцах", en: "Study in Korea", ko: "한국 유학" } as L },
    { icon: "Smartphone", href: "/services/korea-number", label: { mn: "Солонгост ашиглах дугаар холболт", en: "Korean phone number", ko: "한국 휴대폰 번호 개통" } as L, isNew: true },
  ],
  newPill: {
    mn: "Солонгост ашиглах дугаар холболт",
    en: "Korean phone number setup",
    ko: "한국 휴대폰 번호 개통",
  } as L,
};

export const intro = {
  eyebrow: { mn: "GuideOne", en: "GuideOne", ko: "GuideOne" } as L,
  title: { mn: "GuideOne гэж юу вэ?", en: "What is GuideOne?", ko: "GuideOne은 어떤 곳인가요?" } as L,
  text: {
    mn: "GuideOne нь Солонгос хэл сурах, БНСУ-д суралцах болон Солонгостой холбоотой хэрэгцээнд зориулсан боловсрол, зөвлөгөөний үйлчилгээг нэг дороос хүргэхийг зорьдог. Бид Солонгос дахь хамтран ажилладаг сургуулиуд руугаа суралцагчдыг зуучилдаг.",
    en: "GuideOne aims to bring together education and advisory services for learning Korean, studying in South Korea and other Korea-related needs — in one place. We place students at our partner schools in Korea.",
    ko: "GuideOne은 한국어 학습, 한국 유학, 그리고 한국과 관련된 다양한 필요를 위한 교육·상담 서비스를 한 곳에서 제공하는 것을 목표로 합니다. 한국의 협력 학교로 학생들의 유학을 연결합니다.",
  } as L,
  items: [
    {
      icon: "Languages",
      title: { mn: "Солонгос хэл", en: "Korean language", ko: "한국어" } as L,
      text: { mn: "Анхан шатнаас ахисан түвшин хүртэлх сургалт", en: "Courses from beginner to advanced", ko: "초급부터 고급까지의 강좌" } as L,
    },
    {
      icon: "MessagesSquare",
      title: { mn: "Суралцах зөвлөгөө", en: "Study advice", ko: "유학 상담" } as L,
      text: { mn: "Зорилгоо тодорхойлж, зөв сонголт хийхэд", en: "Clarify your goals and choose well", ko: "목표를 정하고 올바른 선택을 하도록" } as L,
    },
    {
      icon: "GraduationCap",
      title: { mn: "Солонгост суралцах", en: "Study in Korea", ko: "한국 유학" } as L,
      text: { mn: "Хамтрагч сургуулиуд руу зуучлал", en: "Placement at our partner schools", ko: "협력 학교로의 유학 연결" } as L,
    },
    {
      icon: "Smartphone",
      title: { mn: "Солонгост ашиглах дугаар", en: "Korean phone number", ko: "한국 휴대폰 번호" } as L,
      text: { mn: "Очихоосоо өмнө холбоотой байх", en: "Be connected before you arrive", ko: "도착 전부터 연결" } as L,
      isNew: true,
    },
  ],
};

export const coursesCopy = {
  eyebrow: { mn: "Сургалт", en: "Courses", ko: "강좌" } as L,
  title: { mn: "Солонгос хэлээ дараагийн түвшинд хүргэ.", en: "Take your Korean to the next level.", ko: "한국어를 다음 단계로." } as L,
  text: { mn: "Таны зорилгод тохирсон сургалтаа сонго.", en: "Choose the course that fits your goal.", ko: "목표에 맞는 강좌를 선택하세요." } as L,
  level: { mn: "Түвшин", en: "Level", ko: "레벨" } as L,
  duration: { mn: "Хугацаа", en: "Duration", ko: "기간" } as L,
  price: { mn: "Төлбөр", en: "Fee", ko: "수강료" } as L,
  askAdvisor: { mn: "Зөвлөхөөс тодруулна", en: "Ask an advisor", ko: "상담 시 안내" } as L,
  note: {
    mn: "Хөтөлбөрийн хуваарь, хугацааг зөвлөхөөс тодруулна уу.",
    en: "Please ask an advisor for schedules and durations.",
    ko: "일정과 기간은 상담사에게 문의해 주세요.",
  } as L,
};

export const why = {
  eyebrow: { mn: "Бидний зарчим", en: "Our principles", ko: "우리의 원칙" } as L,
  title: { mn: "Яагаад GuideOne?", en: "Why GuideOne?", ko: "왜 GuideOne인가요?" } as L,
  text: {
    mn: "Бидний үйлчилгээг чиглүүлдэг дөрвөн зарчим.",
    en: "Four principles that guide how we work.",
    ko: "우리가 일하는 방식을 이끄는 네 가지 원칙.",
  } as L,
  items: [
    {
      title: { mn: "Зорилгод суурилсан", en: "Goal-driven", ko: "목표 중심" } as L,
      text: {
        mn: "Таны зорилгоос эхэлж, түүнд хүрэх замыг хамтдаа төлөвлөнө.",
        en: "We start from your goal and plan the path to it together.",
        ko: "당신의 목표에서 출발해 그곳까지의 길을 함께 계획합니다.",
      } as L,
    },
    {
      title: { mn: "Ойлгомжтой зөвлөгөө", en: "Clear guidance", ko: "명확한 상담" } as L,
      text: {
        mn: "Шийдвэр гаргахад хэрэгтэй мэдээллийг энгийн, тодорхой тайлбарлана.",
        en: "We explain what you need to decide — simply and clearly.",
        ko: "결정에 필요한 정보를 쉽고 분명하게 설명합니다.",
      } as L,
    },
    {
      title: { mn: "Солонгос руу чиглэсэн", en: "Focused on Korea", ko: "한국에 집중" } as L,
      text: {
        mn: "Хэл, суралцах, амьдрах — бүгд Солонгост чиглэсэн хэрэгцээнд төвлөрнө.",
        en: "Language, study and daily life — everything centers on Korea.",
        ko: "언어, 유학, 생활 — 모든 것이 한국을 향합니다.",
      } as L,
    },
    {
      title: { mn: "Нэг дороос", en: "All in one place", ko: "한 곳에서" } as L,
      text: {
        mn: "Хэлний сургалтаас холболтын үйлчилгээ хүртэл нэг газраас.",
        en: "From language classes to connectivity — one place to go.",
        ko: "어학 수업부터 통신 서비스까지 한 곳에서.",
      } as L,
    },
  ],
};

export const servicesCopy = {
  eyebrow: { mn: "Үйлчилгээ", en: "Services", ko: "서비스" } as L,
  title: {
    mn: "Хэлнээс цааш — Солонгос руу хийх аялалд тань",
    en: "Beyond language — for your journey to Korea",
    ko: "언어를 넘어, 한국으로 향하는 여정을 위해",
  } as L,
  comingSoon: { mn: "Дэлгэрэнгүй удахгүй", en: "Details coming soon", ko: "세부 내용 곧 공개" } as L,
};

export const partnersCopy = {
  eyebrow: { mn: "Хамтрагч сургуулиуд", en: "Partner schools", ko: "협력 학교" } as L,
  title: {
    mn: "Солонгос дахь хамтрагч сургуулиуд",
    en: "Our partner schools in Korea",
    ko: "한국의 협력 학교",
  } as L,
  text: {
    mn: "GuideOne нь Солонгос дахь хамтран ажилладаг сургуулиуд руугаа суралцагчдыг зуучилдаг.",
    en: "GuideOne places students at the schools it partners with in South Korea.",
    ko: "GuideOne은 한국의 협력 학교로 학생들의 유학을 연결합니다.",
  } as L,
  empty: {
    mn: "Хамтрагч сургуулиудын жагсаалт удахгүй нийтлэгдэнэ. Одоогийн жагсаалтыг GuideOne-ийн зөвлөхөөс тодруулна уу.",
    en: "The list of partner schools will be published soon. Please ask a GuideOne advisor for the current list.",
    ko: "협력 학교 목록은 곧 공개됩니다. 현재 목록은 GuideOne 상담사에게 문의해 주세요.",
  } as L,
  cta: { mn: "Жагсаалт асуух", en: "Ask for the list", ko: "목록 문의하기" } as L,
};

export const process = {
  eyebrow: { mn: "Алхам алхмаар", en: "Step by step", ko: "단계별로" } as L,
  title: { mn: "Солонгост суралцах зам", en: "Your path to studying in Korea", ko: "한국 유학으로 가는 길" } as L,
  text: {
    mn: "Ерөнхий дараалал — алхам бүр таны нөхцөлөөс хамаарч өөр байж болно.",
    en: "A general outline — each step may differ depending on your situation.",
    ko: "일반적인 흐름이며, 각 단계는 개인 상황에 따라 달라질 수 있습니다.",
  } as L,
  steps: [
    { title: { mn: "Зөвлөгөө авах", en: "Get advice", ko: "상담 받기" } as L, text: { mn: "Сонирхол, нөхцөл байдлаа ярилцана.", en: "Talk through your interests and situation.", ko: "관심사와 상황을 이야기합니다." } as L },
    { title: { mn: "Зорилгоо тодорхойлох", en: "Define your goal", ko: "목표 설정" } as L, text: { mn: "Юу, хэзээ, яагаад суралцахаа тодорхойлно.", en: "Decide what, when and why you'll study.", ko: "무엇을, 언제, 왜 공부할지 정합니다." } as L },
    { title: { mn: "Сургууль сонгох", en: "Choose a school", ko: "학교 선택" } as L, text: { mn: "Зорилгодоо тохирох сургууль, хөтөлбөрийг харьцуулна.", en: "Compare schools and programs that fit.", ko: "목표에 맞는 학교와 과정을 비교합니다." } as L },
    { title: { mn: "Материал бүрдүүлэх", en: "Prepare documents", ko: "서류 준비" } as L, text: { mn: "Шаардлагатай баримт бичгээ бэлтгэнэ.", en: "Gather the documents you need.", ko: "필요한 서류를 준비합니다." } as L },
    { title: { mn: "Өргөдөл гаргах", en: "Apply", ko: "지원하기" } as L, text: { mn: "Сонгосон сургуульдаа өргөдлөө илгээнэ.", en: "Submit your application to your chosen school.", ko: "선택한 학교에 지원서를 제출합니다." } as L },
    { title: { mn: "Суралцах", en: "Start studying", ko: "유학 시작" } as L, text: { mn: "Солонгост шинэ эхлэлээ тавина.", en: "Begin your new chapter in Korea.", ko: "한국에서 새로운 시작을 합니다." } as L },
  ],
};

export const teachersCopy = {
  eyebrow: { mn: "Багш нар", en: "Teachers", ko: "선생님" } as L,
  title: { mn: "Таныг чиглүүлэх багш нар", en: "The teachers who will guide you", ko: "당신을 이끌어 줄 선생님" } as L,
  empty: {
    mn: "Багш нарын дэлгэрэнгүй мэдээлэл удахгүй шинэчлэгдэнэ.",
    en: "Details about our teachers will be published soon.",
    ko: "선생님 소개는 곧 업데이트됩니다.",
  } as L,
  soon: { mn: "Удахгүй", en: "Coming soon", ko: "곧 공개" } as L,
};

export const testimonialsCopy = {
  eyebrow: { mn: "Сэтгэгдэл", en: "Reviews", ko: "후기" } as L,
  title: { mn: "Суралцагчдын сэтгэгдэл", en: "Student stories", ko: "수강생 후기" } as L,
  emptyTitle: { mn: "Таны дараагийн түүх энд эхэлнэ.", en: "Your next story starts here.", ko: "당신의 다음 이야기가 여기서 시작됩니다." } as L,
  emptyText: {
    mn: "GuideOne-ий анхны суралцагчдын нэг болж, өөрийн түүхээ бичээрэй.",
    en: "Be one of GuideOne's first students and write your own story.",
    ko: "GuideOne의 첫 수강생이 되어 당신만의 이야기를 시작하세요.",
  } as L,
  cta: { mn: "GuideOne-той холбогдох", en: "Contact GuideOne", ko: "GuideOne에 문의하기" } as L,
};

export const faqCopy = {
  eyebrow: { mn: "FAQ", en: "FAQ", ko: "FAQ" } as L,
  title: { mn: "Түгээмэл асуулт", en: "Frequently asked questions", ko: "자주 묻는 질문" } as L,
  text: {
    mn: "Асуултынхаа хариултыг олоогүй бол бидэнтэй шууд холбогдоорой.",
    en: "Didn't find your answer? Get in touch with us directly.",
    ko: "원하는 답을 찾지 못하셨다면 직접 문의해 주세요.",
  } as L,
};

export const contactCopy = {
  eyebrow: { mn: "Холбоо барих", en: "Contact", ko: "문의" } as L,
  title: { mn: "Таны дараагийн алхам эндээс эхэлнэ.", en: "Your next step starts here.", ko: "당신의 다음 걸음은 여기서 시작됩니다." } as L,
  text: {
    mn: "Сургалт, суралцах зөвлөгөө эсвэл дугаар холболтын талаар асуух зүйл байвал бидэнд хандаарай.",
    en: "Questions about courses, study advice or a Korean number? Reach out to us.",
    ko: "강좌, 유학 상담, 번호 개통에 대해 궁금한 점이 있다면 문의해 주세요.",
  } as L,
  address: { mn: "Хаяг", en: "Address", ko: "주소" } as L,
  phone: { mn: "Утас", en: "Phone", ko: "전화" } as L,
  email: { mn: "И-мэйл", en: "Email", ko: "이메일" } as L,
  cta: { mn: "Холбогдох", en: "Get in touch", ko: "연락하기" } as L,
  callUs: { mn: "Утсаар залгах", en: "Call us", ko: "전화 문의" } as L,
  visit: { mn: "Манай оффис", en: "Visit us", ko: "오시는 길" } as L,
  formText: {
    mn: "Мэдээллээ үлдээвэл манай зөвлөх тантай эргэн холбогдоно.",
    en: "Leave your details and an advisor will get back to you.",
    ko: "정보를 남겨 주시면 상담사가 연락드립니다.",
  } as L,
  openMap: { mn: "Google Maps-д нээх", en: "Open in Google Maps", ko: "Google 지도에서 열기" } as L,
  mapTitle: { mn: "GuideOne-ийн байршил", en: "GuideOne location", ko: "GuideOne 위치" } as L,
  form: {
    title: { mn: "Бидэнд мессеж үлдээх", en: "Send us a message", ko: "메시지 남기기" } as L,
    name: { mn: "Нэр", en: "Name", ko: "이름" } as L,
    phone: { mn: "Утас", en: "Phone", ko: "전화번호" } as L,
    interest: { mn: "Сонирхож буй үйлчилгээ", en: "Service of interest", ko: "관심 서비스" } as L,
    choose: { mn: "Сонгох", en: "Select", ko: "선택" } as L,
    message: { mn: "Мессеж", en: "Message", ko: "메시지" } as L,
    namePh: { mn: "Таны нэр", en: "Your name", ko: "이름" } as L,
    messagePh: { mn: "Асуух зүйлээ бичнэ үү…", en: "Write your question…", ko: "문의 내용을 입력하세요…" } as L,
    submit: { mn: "Илгээх", en: "Send", ko: "보내기" } as L,
    sending: { mn: "Илгээж байна…", en: "Sending…", ko: "보내는 중…" } as L,
    success: { mn: "Баярлалаа! Таны мессежийг хүлээн авлаа.", en: "Thank you! We've received your message.", ko: "감사합니다! 메시지가 접수되었습니다." } as L,
    error: { mn: "Илгээж чадсангүй. Дахин оролдоно уу эсвэл утсаар холбогдоно уу.", en: "Couldn't send. Please try again or call us.", ko: "전송에 실패했습니다. 다시 시도하거나 전화로 문의해 주세요." } as L,
    again: { mn: "Шинэ мессеж", en: "New message", ko: "새 메시지" } as L,
    required: { mn: "Заавал бөглөнө", en: "Required", ko: "필수" } as L,
    interests: [
      { value: "course", label: { mn: "Солонгос хэлний сургалт", en: "Korean course", ko: "한국어 강좌" } as L },
      { value: "korea-study", label: { mn: "Солонгост суралцах зуучлал", en: "Study in Korea consulting", ko: "한국 유학 컨설팅" } as L },
      { value: "korea-number", label: { mn: "Солонгост ашиглах дугаар холболт", en: "Korean phone number", ko: "한국 휴대폰 번호 개통" } as L },
      { value: "other", label: { mn: "Бусад", en: "Other", ko: "기타" } as L },
    ],
  },
};

export const footerCopy = {
  description: {
    mn: "Солонгос хэлний сургалт, БНСУ-д суралцах зөвлөгөө болон Солонгост ашиглах үйлчилгээ.",
    en: "Korean language courses, study-in-Korea consulting and services for life in Korea.",
    ko: "한국어 교육, 한국 유학 상담, 한국 생활을 위한 서비스.",
  } as L,
  navigation: { mn: "Холбоос", en: "Links", ko: "바로가기" } as L,
  help: { mn: "Тусламж", en: "Help", ko: "도움말" } as L,
  contact: { mn: "Холбоо барих", en: "Contact", ko: "연락처" } as L,
  social: { mn: "Сошиал холбоос", en: "Follow us", ko: "소셜 미디어" } as L,
  rights: "All rights reserved.",
};

export const serviceDetailCopy = {
  back: { mn: "Нүүр хуудас руу буцах", en: "Back to home", ko: "홈으로" } as L,
  topicsTitle: { mn: "Зөвлөхөөс асууж болох зүйлс", en: "What you can ask us about", ko: "상담 가능한 내용" } as L,
  detailsTitle: { mn: "Үйлчилгээний мэдээлэл", en: "Service details", ko: "서비스 정보" } as L,
  pending: { mn: "Удахгүй шинэчлэгдэнэ", en: "To be announced", ko: "곧 업데이트" } as L,
  pendingNote: {
    mn: "Дэлгэрэнгүй нөхцөлийг GuideOne-ийн зөвлөхөөс тодруулна уу.",
    en: "Please check the full terms with a GuideOne advisor.",
    ko: "자세한 조건은 GuideOne 상담사에게 문의해 주세요.",
  } as L,
  ctaTitle: { mn: "Асуух зүйл байна уу?", en: "Have a question?", ko: "궁금한 점이 있나요?" } as L,
  ctaText: {
    mn: "Утсаар залгах эсвэл мессеж үлдээгээрэй.",
    en: "Give us a call or leave a message.",
    ko: "전화하시거나 메시지를 남겨 주세요.",
  } as L,
};

export const loginCopy = {
  title: { mn: "Нэвтрэх", en: "Log in", ko: "로그인" } as L,
  text: {
    mn: "GuideOne-ий суралцагчийн бүртгэлээрээ нэвтэрнэ үү.",
    en: "Sign in with your GuideOne student account.",
    ko: "GuideOne 수강생 계정으로 로그인하세요.",
  } as L,
  identifier: { mn: "Утас эсвэл и-мэйл", en: "Phone or email", ko: "전화번호 또는 이메일" } as L,
  password: { mn: "Нууц үг", en: "Password", ko: "비밀번호" } as L,
  showPassword: { mn: "Нууц үг харуулах", en: "Show password", ko: "비밀번호 보기" } as L,
  hidePassword: { mn: "Нууц үг нуух", en: "Hide password", ko: "비밀번호 숨기기" } as L,
  forgot: { mn: "Нууц үгээ мартсан уу?", en: "Forgot password?", ko: "비밀번호를 잊으셨나요?" } as L,
  submit: { mn: "Нэвтрэх", en: "Log in", ko: "로그인" } as L,
  sending: { mn: "Шалгаж байна…", en: "Checking…", ko: "확인 중…" } as L,
  notReady: {
    mn: "Нэвтрэх систем удахгүй нээгдэнэ. Асуух зүйл байвал GuideOne-той холбогдоно уу.",
    en: "Student login is coming soon. Please contact GuideOne if you have questions.",
    ko: "로그인 기능은 곧 오픈됩니다. 궁금한 점은 GuideOne에 문의해 주세요.",
  } as L,
  noAccount: { mn: "Бүртгэлгүй юу?", en: "No account yet?", ko: "계정이 없으신가요?" } as L,
  contact: { mn: "GuideOne-той холбогдох", en: "Contact GuideOne", ko: "GuideOne에 문의하기" } as L,
  back: { mn: "Нүүр хуудас", en: "Home", ko: "홈" } as L,
};

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
  account: { mn: "Миний бүртгэл", en: "My account", ko: "내 계정" } as L,
  admin: { mn: "Админ", en: "Admin", ko: "관리자" } as L,
  teacher: { mn: "Багшийн самбар", en: "Teacher panel", ko: "강사 페이지" } as L,
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

export const about = {
  eyebrow: { mn: "Бидний тухай", en: "About us", ko: "회사 소개" } as L,
  title: { mn: "Бидний тухай", en: "About us", ko: "회사 소개" } as L,
  /** Догол мөрүүдийг хоосон мөрөөр тусгаарлана */
  text: {
    mn: "Guide One ХХК нь 2018 онд үүссэн, Бүгд Найрамдах Солонгос Улсад суралцах зорилготой иргэдэд солонгос хэлний сургалт болон зуучлалын үйлчилгээ үзүүлдэг компани юм.\n\nБид хэл сурахаас эхлээд сургууль, ажлын байр сонгох, бичиг баримт бүрдүүлэх, виз мэдүүлэх хүртэлх замыг нэг дороос хөтөлдөг.",
    en: "Guide One LLC was founded in 2018 and provides Korean language courses and placement services for people who plan to study in the Republic of Korea.\n\nFrom learning the language to choosing a school or job, preparing documents and applying for a visa, we guide you through the whole journey in one place.",
    ko: "Guide One LLC는 2018년에 설립되어, 대한민국 유학을 목표로 하는 분들께 한국어 교육과 유학 연계 서비스를 제공하는 회사입니다.\n\n언어 학습부터 학교·일자리 선택, 서류 준비, 비자 신청까지의 모든 과정을 한 곳에서 안내합니다.",
  } as L,
  stats: [
    { value: "2018", label: { mn: "онд үүсгэн байгуулагдсан", en: "Year founded", ko: "설립 연도" } as L },
    { value: "5", label: { mn: "Үйлчилгээний чиглэл", en: "Service areas", ko: "서비스 분야" } as L },
    { value: "5", label: { mn: "Алхам алхмаар ойлгомжтой үйл явц", en: "Clear step-by-step process", ko: "단계별로 명확한 진행 과정" } as L },
  ],
  missionTitle: { mn: "Алсын хараа, эрхэм зорилго", en: "Vision and mission", ko: "비전과 미션" } as L,
  vision: {
    title: { mn: "Алсын хараа", en: "Vision", ko: "비전" } as L,
    text: {
      mn: "Монгол Солонгос хоёр орныг холбосон хэл, боловсрол, зуучлалын чиглэлд хамгийн их итгэл даасан байгууллага болох.",
      en: "To be the most trusted organization connecting Mongolia and Korea through language, education and placement services.",
      ko: "언어·교육·유학 연계 분야에서 몽골과 한국을 잇는 가장 신뢰받는 기관이 되는 것.",
    } as L,
  },
  mission: {
    title: { mn: "Эрхэм зорилго", en: "Mission", ko: "미션" } as L,
    text: {
      mn: "Солонгост сурах, ажиллах хүсэлтэй хүн бүрт чанартай хэлний бэлтгэл, үнэн зөв мэдээлэл, ил тод зуучлалаар дамжуулан зорилгодоо хүрэхэд нь туслах.",
      en: "To help everyone who wants to study or work in Korea reach their goals through quality language preparation, accurate information and transparent placement.",
      ko: "한국에서 공부하거나 일하고자 하는 모든 분이 양질의 언어 준비, 정확한 정보, 투명한 연계를 통해 목표를 이루도록 돕는 것.",
    } as L,
  },
  valuesTitle: { mn: "Бидний үнэт зүйлс", en: "Our values", ko: "우리의 가치" } as L,
  values: [
    {
      icon: "Eye",
      title: { mn: "Ил тод байдал", en: "Transparency", ko: "투명성" } as L,
      text: {
        mn: "Зардал, хугацаа, шаардлагыг эхнээс нь тодорхой хэлнэ.",
        en: "We are clear about costs, timelines and requirements from the start.",
        ko: "비용, 기간, 요건을 처음부터 명확하게 안내합니다.",
      } as L,
    },
    {
      icon: "Handshake",
      title: { mn: "Хариуцлага", en: "Responsibility", ko: "책임감" } as L,
      text: {
        mn: "Үйлчлүүлэгч бүрийн асуудлыг өөрийн асуудал шиг авч үзнэ.",
        en: "We treat every client's situation as if it were our own.",
        ko: "모든 고객의 일을 우리 일처럼 여깁니다.",
      } as L,
    },
    {
      icon: "Scale",
      title: { mn: "Хууль ёс", en: "Legality", ko: "준법" } as L,
      text: {
        mn: "Хоёр улсын хууль тогтоомжид нийцсэн аргаар ажиллана.",
        en: "We work in full compliance with the laws of both countries.",
        ko: "양국의 법률을 준수하는 방식으로 일합니다.",
      } as L,
    },
    {
      icon: "Star",
      title: { mn: "Чанар", en: "Quality", ko: "품질" } as L,
      text: {
        mn: "Хэлний сургалтаас бичиг баримт хүртэл үр дүнд чиглэнэ.",
        en: "From language classes to paperwork, we focus on results.",
        ko: "어학 수업부터 서류 준비까지 결과에 집중합니다.",
      } as L,
    },
  ],
};

export const directions = {
  eyebrow: { mn: "Бидний үйлчилгээ", en: "What we do", ko: "서비스" } as L,
  title: { mn: "5 чиглэлийн үйлчилгээ", en: "Five service areas", ko: "5가지 서비스 분야" } as L,
  /** Хоосон бол харагдахгүй */
  text: { mn: "", en: "", ko: "" } as L,
  audienceLabel: { mn: "Хэнд:", en: "For:", ko: "대상:" } as L,
  items: [
    {
      icon: "BookOpen",
      title: { mn: "Солонгос хэлний сургалт", en: "Korean language courses", ko: "한국어 교육" } as L,
      text: {
        mn: "Анхан, дунд, ахисан түвшний анги, TOPIK шалгалтын бэлтгэл, ярианы анги",
        en: "Beginner, intermediate and advanced classes, TOPIK preparation and conversation classes",
        ko: "초급·중급·고급 반, TOPIK 시험 대비, 회화 반",
      } as L,
      audience: {
        mn: "Хэл шинээр сурах, шалгалтад бэлдэх хүмүүс",
        en: "New learners and those preparing for exams",
        ko: "한국어를 새로 배우거나 시험을 준비하는 분",
      } as L,
    },
    {
      icon: "GraduationCap",
      title: { mn: "Сургалт зуучлал", en: "Study placement", ko: "유학 연계" } as L,
      text: {
        mn: "Хэлний сургалт, коллеж, их сургууль, магистрын хөтөлбөр сонгох, бүртгүүлэх",
        en: "Choosing and enrolling in language programs, colleges, universities and master's programs",
        ko: "어학연수·전문대·대학교·대학원 과정 선택 및 지원",
      } as L,
      audience: {
        mn: "Солонгост сурахаар төлөвлөж буй сурагчид",
        en: "Students planning to study in Korea",
        ko: "한국 유학을 계획 중인 학생",
      } as L,
    },
    {
      icon: "IdCard",
      title: { mn: "Бичиг баримт, виз", en: "Documents and visas", ko: "서류·비자" } as L,
      text: {
        mn: "Материал бүрдүүлэх, орчуулга, визийн өргөдөл, ярилцлагад бэлтгэх",
        en: "Preparing documents, translation, visa applications and interview preparation",
        ko: "서류 준비, 번역, 비자 신청, 인터뷰 준비",
      } as L,
      audience: {
        mn: "Сурах, ажиллах, аялах зорилготой хүн бүр",
        en: "Anyone going to study, work or travel",
        ko: "유학·취업·여행을 계획하는 모든 분",
      } as L,
    },
    {
      icon: "Handshake",
      title: { mn: "Амьдралын зөвлөгөө, дэмжлэг", en: "Living advice and support", ko: "생활 상담·지원" } as L,
      text: {
        mn: "Солонгост амьдрах соёл, хууль, орон сууц, нислэгийн дараах дэмжлэг",
        en: "Culture, law and housing in Korea, plus support after you arrive",
        ko: "한국 생활 문화, 법률, 주거, 입국 후 지원",
      } as L,
      audience: {
        mn: "Гарахад бэлдэж буй хүмүүс",
        en: "People getting ready to leave",
        ko: "출국을 준비하는 분",
      } as L,
    },
    {
      icon: "CardSim",
      title: { mn: "Солонгост ашиглах дугаар", en: "Korean phone number", ko: "한국 휴대폰 번호" } as L,
      text: {
        mn: "Солонгост очихоос өмнө тэндхийн утасны дугаар, SIM карт авах, идэвхжүүлэхэд туслах",
        en: "Get and activate a Korean number and SIM card before you arrive",
        ko: "한국 도착 전 현지 번호·SIM 카드 개통 지원",
      } as L,
      audience: {
        mn: "Солонгост сурахаар төлөвлөж буй сурагчид бүх хүмүүст",
        en: "Students and everyone heading to Korea",
        ko: "한국으로 가는 학생 및 모든 분",
      } as L,
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

export const advantages = {
  eyebrow: { mn: "Яагаад GuideOne?", en: "Why GuideOne?", ko: "왜 GuideOne인가요?" } as L,
  title: { mn: "Бидний давуу тал", en: "Our strengths", ko: "우리의 강점" } as L,
  /** Хоосон бол харагдахгүй */
  text: { mn: "", en: "", ko: "" } as L,
  /** tone: "light" — ногоон, "dark" — хар ногоон дугуй */
  items: [
    {
      icon: "Layers",
      tone: "light",
      title: { mn: "Нэг цэгт бүх үйлчилгээ", en: "All services in one place", ko: "원스톱 서비스" } as L,
      text: {
        mn: "Хэл, сургууль, визийг өөр өөр газраас хайх шаардлагагүй.",
        en: "No need to look for language classes, schools and visas in different places.",
        ko: "어학, 학교, 비자를 따로 알아볼 필요가 없습니다.",
      } as L,
    },
    {
      icon: "Route",
      tone: "dark",
      title: { mn: "Хувь хүнд тохирсон төлөвлөгөө", en: "A plan made for you", ko: "맞춤형 계획" } as L,
      text: {
        mn: "Хэлний түвшин, зорилго, төсөвт тань таарсан замаа хамтдаа гаргана.",
        en: "Together we map out a path that fits your level, goals and budget.",
        ko: "언어 수준, 목표, 예산에 맞는 길을 함께 설계합니다.",
      } as L,
    },
    {
      icon: "RefreshCw",
      tone: "light",
      title: { mn: "Цаг үеийн мэдээлэл", en: "Up-to-date information", ko: "최신 정보" } as L,
      text: {
        mn: "Виз, сургалт, ажил эрхлэлтийн журам өөрчлөгдөх бүрт шинэчилж байдаг.",
        en: "We update our guidance whenever visa, study or employment rules change.",
        ko: "비자·학업·취업 규정이 바뀔 때마다 정보를 업데이트합니다.",
      } as L,
    },
    {
      icon: "FileText",
      tone: "dark",
      title: { mn: "Ил тод гэрээ, зардал", en: "Clear contracts and costs", ko: "투명한 계약과 비용" } as L,
      text: {
        mn: "Үнэ, хугацаа, үүргийг гэрээнд тодорхой зааж, далд төлбөр авахгүй.",
        en: "Prices, timelines and responsibilities are set out in the contract, with no hidden fees.",
        ko: "가격, 기간, 책임을 계약서에 명시하며 숨은 비용이 없습니다.",
      } as L,
    },
    {
      icon: "PlaneTakeoff",
      tone: "light",
      title: { mn: "Гарсны дараах дэмжлэг", en: "Support after departure", ko: "출국 후 지원" } as L,
      text: {
        mn: "Солонгост очсоны дараа ч холбоотой байж, асуудал гарвал тусална.",
        en: "We stay in touch after you arrive in Korea and help if any issue comes up.",
        ko: "한국 도착 후에도 연락을 유지하며 문제가 생기면 도와드립니다.",
      } as L,
    },
    {
      icon: "UsersRound",
      tone: "dark",
      title: { mn: "Шинэ үеийн баг", en: "A modern team", ko: "새로운 세대의 팀" } as L,
      text: {
        mn: "Үйлчлүүлэгч бүрт анхаарал хандуулж, цахим хэлбэрээр шуурхай харилцана.",
        en: "We give every client personal attention and respond quickly online.",
        ko: "모든 고객에게 세심하게 집중하며 온라인으로 신속하게 소통합니다.",
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
  soon: { mn: "Тун удахгүй", en: "Coming soon", ko: "곧 오픈" } as L,
  text: {
    mn: "Солонгостой холбоотой таны хэрэгцээнд зориулсан үйлчилгээнүүд.",
    en: "Services for everything you need on your way to Korea.",
    ko: "한국과 관련된 필요를 위한 서비스.",
  } as L,
  course: {
    title: { mn: "Хэлний сургалт", en: "Korean courses", ko: "한국어 강좌" } as L,
    description: {
      mn: "Анхан шатнаас TOPIK бэлтгэл хүртэлх Солонгос хэлний сургалт.",
      en: "Korean courses from beginner level to TOPIK preparation.",
      ko: "초급부터 TOPIK 대비까지의 한국어 강좌.",
    } as L,
    cta: { mn: "Сургалт үзэх", en: "View courses", ko: "강좌 보기" } as L,
  },
  soonTitle: { mn: "Удахгүй нэмэгдэх үйлчилгээ", en: "More services coming soon", ko: "곧 추가될 서비스" } as L,
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

export const serviceProcess = {
  eyebrow: { mn: "Алхам алхмаар", en: "Step by step", ko: "단계별로" } as L,
  title: { mn: "Үйлчилгээ авах үйл явц", en: "How it works", ko: "서비스 이용 절차" } as L,
  text: {
    mn: "Анхны уулзалтаас Солонгост очих хүртэл таван алхамтай.",
    en: "Five steps from our first meeting to your arrival in Korea.",
    ko: "첫 상담부터 한국 도착까지 다섯 단계로 진행됩니다.",
  } as L,
  /** Алхмуудын дараалал — админаас нэмж, хасаж, эрэмбэлнэ */
  steps: [
    {
      title: { mn: "Уулзалт, зөвлөгөө", en: "Meeting and advice", ko: "상담" } as L,
      text: {
        mn: "Таны зорилго, хэлний түвшин, боломжийг тодорхойлно.",
        en: "We clarify your goals, language level and options.",
        ko: "목표, 언어 수준, 가능성을 파악합니다.",
      } as L,
    },
    {
      title: { mn: "Төлөвлөгөө гаргах", en: "Making a plan", ko: "계획 수립" } as L,
      text: {
        mn: "Сургууль сонголт, хугацаа, зардлыг тохиролцоно.",
        en: "We agree on the school, timeline and costs.",
        ko: "학교 선택, 일정, 비용을 함께 정합니다.",
      } as L,
    },
    {
      title: { mn: "Хэлний бэлтгэл", en: "Language preparation", ko: "어학 준비" } as L,
      text: {
        mn: "Шаардлагатай түвшинд хүртэл сургалтад сууж, шалгалтад бэлдэнэ.",
        en: "You take classes until you reach the required level and prepare for exams.",
        ko: "필요한 수준까지 수업을 듣고 시험을 준비합니다.",
      } as L,
    },
    {
      title: { mn: "Бичиг баримт, виз", en: "Documents and visa", ko: "서류·비자" } as L,
      text: {
        mn: "Материал бүрдүүлж, бүртгэл болон визийн өргөдлийг хамтдаа гүйцэтгэнэ.",
        en: "We prepare documents and complete the application and visa process together.",
        ko: "서류를 준비하고 지원 및 비자 신청을 함께 진행합니다.",
      } as L,
    },
    {
      title: { mn: "Солонгос явах болон дараах дэмжлэг", en: "Departure and ongoing support", ko: "출국 및 사후 지원" } as L,
      text: {
        mn: "Солонгос явахаас өмнөх зааварчилгаа өгөөд, очсоны дараа ч холбоотой байна.",
        en: "We brief you before departure and stay in touch after you arrive.",
        ko: "출국 전 안내를 드리고 도착 후에도 계속 연락합니다.",
      } as L,
    },
  ],
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
  hours: { mn: "Ажлын цаг", en: "Opening hours", ko: "운영 시간" } as L,
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
    mn: "GuideOne-ий бүртгэлээрээ нэвтэрнэ үү.",
    en: "Sign in with your GuideOne account.",
    ko: "GuideOne 계정으로 로그인하세요.",
  } as L,
  email: { mn: "И-мэйл", en: "Email", ko: "이메일" } as L,
  password: { mn: "Нууц үг", en: "Password", ko: "비밀번호" } as L,
  showPassword: { mn: "Нууц үг харуулах", en: "Show password", ko: "비밀번호 보기" } as L,
  hidePassword: { mn: "Нууц үг нуух", en: "Hide password", ko: "비밀번호 숨기기" } as L,
  forgot: { mn: "Нууц үгээ мартсан уу?", en: "Forgot password?", ko: "비밀번호를 잊으셨나요?" } as L,
  submit: { mn: "Нэвтрэх", en: "Log in", ko: "로그인" } as L,
  sending: { mn: "Шалгаж байна…", en: "Checking…", ko: "확인 중…" } as L,
  invalid: {
    mn: "И-мэйл эсвэл нууц үг буруу байна.",
    en: "Incorrect email or password.",
    ko: "이메일 또는 비밀번호가 올바르지 않습니다.",
  } as L,
  unconfirmed: {
    mn: "И-мэйл хаягаа баталгаажуулна уу. Таны и-мэйл рүү илгээсэн холбоос дээр дарна уу.",
    en: "Please confirm your email address using the link we sent you.",
    ko: "이메일로 보내 드린 링크를 눌러 이메일 주소를 인증해 주세요.",
  } as L,
  failed: {
    mn: "Нэвтрэх үед алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу.",
    en: "Something went wrong. Please try again in a moment.",
    ko: "오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  } as L,
  confirming: { mn: "И-мэйлийг баталгаажуулж байна…", en: "Confirming your email…", ko: "이메일 인증 중…" } as L,
  confirmed: {
    mn: "И-мэйл баталгаажлаа. Одоо нэвтэрнэ үү.",
    en: "Your email is confirmed. You can log in now.",
    ko: "이메일 인증이 완료되었습니다. 이제 로그인하세요.",
  } as L,
  linkExpired: {
    mn: "Баталгаажуулах холбоос хүчингүй эсвэл хугацаа нь дууссан байна. И-мэйл, нууц үгээ оруулж нэвтрэхийг оролдвол шинэ холбоос илгээх товч гарна.",
    en: "This confirmation link is invalid or has expired. Try logging in and we'll offer to send a new link.",
    ko: "인증 링크가 유효하지 않거나 만료되었습니다. 로그인을 시도하면 새 링크를 보낼 수 있습니다.",
  } as L,
  resend: { mn: "Баталгаажуулах и-мэйл дахин илгээх", en: "Resend confirmation email", ko: "인증 메일 다시 보내기" } as L,
  resent: {
    mn: "Шинэ холбоос илгээлээ. И-мэйлээ (Spam хавтсыг ч) шалгана уу.",
    en: "We sent a new link. Please check your inbox (and spam folder).",
    ko: "새 링크를 보냈습니다. 받은편지함(스팸함 포함)을 확인해 주세요.",
  } as L,
  rateLimited: {
    mn: "Хэт олон удаа илгээсэн байна. Хэдэн минутын дараа дахин оролдоно уу.",
    en: "Too many requests. Please try again in a few minutes.",
    ko: "요청이 너무 많습니다. 몇 분 후 다시 시도해 주세요.",
  } as L,
  resendFailed: {
    mn: "И-мэйл илгээж чадсангүй. Дахин оролдоно уу.",
    en: "We couldn't send the email. Please try again.",
    ko: "메일을 보내지 못했습니다. 다시 시도해 주세요.",
  } as L,
  noAccount: { mn: "Бүртгэлгүй юу?", en: "No account yet?", ko: "계정이 없으신가요?" } as L,
  register: { mn: "Бүртгүүлэх", en: "Sign up", ko: "회원가입" } as L,
  back: { mn: "Нүүр хуудас", en: "Home", ko: "홈" } as L,
};

export const registerCopy = {
  title: { mn: "Бүртгүүлэх", en: "Create an account", ko: "회원가입" } as L,
  text: {
    mn: "Бүртгүүлээд хэлний бэлтгэл болон Солонгос сургуульд суралцах өргөдлөө онлайнаар илгээгээрэй.",
    en: "Create an account to apply online for Korean language prep and study at a school in Korea.",
    ko: "회원가입 후 한국어 과정과 한국 학교 유학을 온라인으로 신청하세요.",
  } as L,
  fullName: { mn: "Овог, нэр", en: "Full name", ko: "이름" } as L,
  phone: { mn: "Утас", en: "Phone", ko: "전화번호" } as L,
  email: { mn: "И-мэйл", en: "Email", ko: "이메일" } as L,
  password: { mn: "Нууц үг (8+ тэмдэгт)", en: "Password (8+ characters)", ko: "비밀번호 (8자 이상)" } as L,
  submit: { mn: "Бүртгүүлэх", en: "Sign up", ko: "가입하기" } as L,
  sending: { mn: "Бүртгэж байна…", en: "Creating account…", ko: "가입 중…" } as L,
  exists: {
    mn: "Энэ и-мэйлээр бүртгэл үүссэн байна. Нэвтэрнэ үү.",
    en: "An account with this email already exists. Please log in.",
    ko: "이미 가입된 이메일입니다. 로그인해 주세요.",
  } as L,
  weak: {
    mn: "Нууц үг хэт сул байна. Дор хаяж 8 тэмдэгт, үсэг тоо холино уу.",
    en: "The password is too weak. Use at least 8 characters with letters and numbers.",
    ko: "비밀번호가 너무 약합니다. 문자와 숫자를 섞어 8자 이상 입력해 주세요.",
  } as L,
  failed: {
    mn: "Бүртгэх үед алдаа гарлаа. Мэдээллээ шалгаад дахин оролдоно уу.",
    en: "We couldn't create your account. Please check your details and try again.",
    ko: "가입에 실패했습니다. 입력 내용을 확인하고 다시 시도해 주세요.",
  } as L,
  confirmTitle: { mn: "И-мэйлээ шалгана уу", en: "Check your email", ko: "이메일을 확인해 주세요" } as L,
  confirmText: {
    mn: "Бид таны и-мэйл рүү баталгаажуулах холбоос илгээлээ. Холбоос дээр дармагц таны бүртгэл идэвхжиж, автоматаар нэвтэрнэ. И-мэйл ирэхгүй бол Spam хавтсаа шалгана уу.",
    en: "We sent a confirmation link to your email. Click it to activate your account and you'll be signed in. If it doesn't arrive, check your spam folder.",
    ko: "이메일로 인증 링크를 보냈습니다. 링크를 누르면 계정이 활성화되고 자동으로 로그인됩니다. 메일이 오지 않으면 스팸함을 확인해 주세요.",
  } as L,
  haveAccount: { mn: "Бүртгэлтэй юу?", en: "Already have an account?", ko: "이미 계정이 있으신가요?" } as L,
  login: { mn: "Нэвтрэх", en: "Log in", ko: "로그인" } as L,
};

export const accountCopy = {
  title: { mn: "Миний бүртгэл", en: "My account", ko: "내 계정" } as L,
  hello: { mn: "Сайн байна уу", en: "Hello", ko: "안녕하세요" } as L,
  adminLink: { mn: "Удирдлагын самбар руу орох", en: "Open dashboard", ko: "관리 페이지 열기" } as L,
  logout: { mn: "Гарах", en: "Log out", ko: "로그아웃" } as L,
  profileTitle: { mn: "Хувийн мэдээлэл", en: "Personal details", ko: "개인 정보" } as L,
  profileText: {
    mn: "Хүүхэд суралцагч бол эцэг эх, асран хамгаалагчийн холбоо барих мэдээллийг заавал бөглөнө үү.",
    en: "If the student is a minor, please add a parent or guardian's contact details.",
    ko: "학생이 미성년자인 경우 보호자 연락처를 꼭 입력해 주세요.",
  } as L,
  fullName: { mn: "Овог, нэр", en: "Full name", ko: "이름" } as L,
  phone: { mn: "Утас", en: "Phone", ko: "전화번호" } as L,
  birthDate: { mn: "Төрсөн огноо", en: "Date of birth", ko: "생년월일" } as L,
  koreanLevel: { mn: "Солонгос хэлний түвшин", en: "Korean level", ko: "한국어 수준" } as L,
  koreanLevelPh: { mn: "Жишээ нь: анхан шат, TOPIK 2", en: "e.g. beginner, TOPIK 2", ko: "예: 초급, TOPIK 2급" } as L,
  parentName: { mn: "Эцэг эх / асран хамгаалагчийн нэр", en: "Parent / guardian name", ko: "보호자 이름" } as L,
  parentPhone: { mn: "Эцэг эх / асран хамгаалагчийн утас", en: "Parent / guardian phone", ko: "보호자 전화번호" } as L,
  save: { mn: "Хадгалах", en: "Save", ko: "저장" } as L,
  saving: { mn: "Хадгалж байна…", en: "Saving…", ko: "저장 중…" } as L,
  saved: { mn: "Хадгалагдлаа.", en: "Saved.", ko: "저장되었습니다." } as L,
  error: { mn: "Алдаа гарлаа. Дахин оролдоно уу.", en: "Something went wrong. Please try again.", ko: "오류가 발생했습니다. 다시 시도해 주세요." } as L,
  applyTitle: { mn: "Өргөдөл илгээх", en: "Submit an application", ko: "신청하기" } as L,
  applyText: {
    mn: "Хэлний бэлтгэлд хамрагдах эсвэл Солонгос дахь хамтрагч сургуульд суралцах хүсэлтээ илгээнэ үү. Манай зөвлөх тантай холбогдоно.",
    en: "Apply for Korean language prep or to study at one of our partner schools in Korea. An advisor will contact you.",
    ko: "한국어 과정 또는 한국 협력 학교 유학을 신청하세요. 상담사가 연락드립니다.",
  } as L,
  program: { mn: "Хөтөлбөр", en: "Program", ko: "프로그램" } as L,
  programs: {
    language_course: { mn: "Солонгос хэлний бэлтгэл", en: "Korean language prep", ko: "한국어 과정" } as L,
    school_placement: { mn: "Солонгос сургуульд зуучлал", en: "School placement in Korea", ko: "한국 학교 유학 연결" } as L,
  },
  course: { mn: "Сургалт", en: "Course", ko: "강좌" } as L,
  partner: { mn: "Сонирхож буй сургууль", en: "School of interest", ko: "관심 학교" } as L,
  notSure: { mn: "Зөвлөхтэй ярилцаж сонгоно", en: "Not sure yet — I'll ask an advisor", ko: "상담 후 결정" } as L,
  message: { mn: "Нэмэлт мэдээлэл", en: "Additional details", ko: "추가 내용" } as L,
  messagePh: {
    mn: "Суралцах зорилго, хүссэн хугацаа, асуух зүйлээ бичнэ үү…",
    en: "Your goals, preferred timing, questions…",
    ko: "유학 목표, 희망 시기, 궁금한 점을 적어 주세요…",
  } as L,
  submit: { mn: "Өргөдөл илгээх", en: "Submit application", ko: "신청서 제출" } as L,
  submitted: { mn: "Өргөдөл илгээгдлээ.", en: "Application submitted.", ko: "신청서가 제출되었습니다." } as L,
  listTitle: { mn: "Миний өргөдлүүд", en: "My applications", ko: "내 신청 내역" } as L,
  empty: { mn: "Одоогоор өргөдөл байхгүй.", en: "No applications yet.", ko: "아직 신청 내역이 없습니다." } as L,
  adminNote: { mn: "Зөвлөхийн тэмдэглэл", en: "Advisor note", ko: "상담사 메모" } as L,
  classesTitle: { mn: "Миний ангиуд", en: "My classes", ko: "내 수업" } as L,
  noClasses: {
    mn: "Та одоогоор ангид элсээгүй байна. Өргөдөл илгээсний дараа зөвлөх тантай холбогдож ангид элсүүлнэ.",
    en: "You're not enrolled in a class yet. After you apply, an advisor will contact you and enroll you.",
    ko: "아직 등록된 수업이 없습니다. 신청 후 상담사가 연락드려 수업에 등록해 드립니다.",
  } as L,
  teacher: { mn: "Багш", en: "Teacher", ko: "강사" } as L,
  period: { mn: "Хугацаа", en: "Dates", ko: "기간" } as L,
  payment: { mn: "Төлбөр", en: "Payment", ko: "수강료" } as L,
  paid: { mn: "Төлсөн", en: "Paid", ko: "납부" } as L,
  enrollmentStatuses: {
    active: { mn: "Суралцаж байна", en: "Studying", ko: "수강 중" } as L,
    completed: { mn: "Төгссөн", en: "Completed", ko: "수료" } as L,
    dropped: { mn: "Гарсан", en: "Withdrawn", ko: "중단" } as L,
  },
  paymentStatuses: {
    unpaid: { mn: "Төлөөгүй", en: "Unpaid", ko: "미납" } as L,
    partial: { mn: "Хэсэгчлэн төлсөн", en: "Partially paid", ko: "일부 납부" } as L,
    paid: { mn: "Төлсөн", en: "Paid", ko: "납부 완료" } as L,
  },
  announcementsTitle: { mn: "Багшийн зар", en: "Announcements", ko: "공지사항" } as L,
  noAnnouncements: { mn: "Шинэ зар алга.", en: "No announcements yet.", ko: "공지사항이 없습니다." } as L,
  materialsTitle: { mn: "Сургалтын материал", en: "Learning materials", ko: "학습 자료" } as L,
  noMaterials: { mn: "Багш материал оруулаагүй байна.", en: "Your teacher hasn't shared materials yet.", ko: "아직 등록된 자료가 없습니다." } as L,
  materialKinds: {
    handbook: { mn: "Гарын авлага", en: "Handbook", ko: "교재" } as L,
    lecture: { mn: "Лекц", en: "Lecture", ko: "강의" } as L,
    seminar: { mn: "Семинар", en: "Seminar", ko: "세미나" } as L,
    other: { mn: "Бусад", en: "Other", ko: "기타" } as L,
  },
  download: { mn: "Татах", en: "Download", ko: "다운로드" } as L,
  openLink: { mn: "Холбоос нээх", en: "Open link", ko: "링크 열기" } as L,
  examsTitle: { mn: "Шалгалт ба дүн", en: "Exams & scores", ko: "시험 및 성적" } as L,
  noExams: { mn: "Шалгалтын мэдээлэл алга.", en: "No exams yet.", ko: "시험 정보가 없습니다." } as L,
  notGraded: { mn: "Дүн гараагүй", en: "Not graded yet", ko: "채점 전" } as L,
  upcoming: { mn: "Удахгүй", en: "Upcoming", ko: "예정" } as L,
  dateTbd: { mn: "Огноо тодорхойгүй", en: "Date TBA", ko: "날짜 미정" } as L,
  statuses: {
    new: { mn: "Хүлээн авсан", en: "Received", ko: "접수됨" } as L,
    in_review: { mn: "Хянаж байна", en: "In review", ko: "검토 중" } as L,
    accepted: { mn: "Зөвшөөрсөн", en: "Accepted", ko: "승인됨" } as L,
    rejected: { mn: "Татгалзсан", en: "Declined", ko: "반려됨" } as L,
    cancelled: { mn: "Цуцалсан", en: "Cancelled", ko: "취소됨" } as L,
  },
};

/**
 * Hero-ийн арын чимэглэл (SVG, GuideOne-д зориулж зурсан).
 * Тэнгэр, үүл, онгоц, Бүкхансан уулс, Сөүлийн skyline (Намсан цамхаг, Lotte World Tower),
 * Ханган гол ба гүүр, ханок хаалга, интоорын мод, цэцэгтэй талбай, "서울" заагч.
 * Өөрийн зургаар солих бол data/site.ts → heroImage.
 */

const clouds = [
  { x: 150, y: 150, s: 1.25 },
  { x: 560, y: 95, s: 0.85 },
  { x: 1120, y: 120, s: 1.1 },
  { x: 1460, y: 250, s: 0.9 },
  { x: 330, y: 330, s: 0.6 },
  { x: 860, y: 260, s: 0.55 },
];

// Тогтмол (deterministic) байрлалууд — hydration зөрөхгүй
const flowers = Array.from({ length: 90 }, (_, i) => ({
  x: (i * 173) % 1600,
  y: 812 + ((i * 47) % 88),
  r: 4 + (i % 4),
  c: ["#ffffff", "#ffe066", "#ffc2d4", "#ffffff", "#fff4a8"][i % 5],
}));
const grassBlades = Array.from({ length: 60 }, (_, i) => ({ x: (i * 211) % 1600, y: 790 + ((i * 31) % 100) }));
const petals = [
  [300, 360], [470, 470], [1010, 380], [1330, 470], [700, 300], [210, 520], [1210, 330], [880, 500],
];

function Cloud({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="34" rx="120" ry="22" fill="#d6ecfb" />
      <g fill="#fff">
        <ellipse cx="0" cy="22" rx="118" ry="28" />
        <circle cx="-62" cy="6" r="34" />
        <circle cx="-18" cy="-16" r="46" />
        <circle cx="34" cy="-6" r="40" />
        <circle cx="78" cy="10" r="28" />
      </g>
      <circle cx="-26" cy="-28" r="18" fill="#fff" opacity=".9" />
    </g>
  );
}

function Pine({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-6" y="-8" width="12" height="40" rx="2" fill="#7a5235" />
      <path d="M0 -170 L-38 -92 H38 Z" fill="#2f8a4f" />
      <path d="M0 -132 L-52 -46 H52 Z" fill="#257a43" />
      <path d="M0 -88 L-66 0 H66 Z" fill="#1d6838" />
      <path d="M0 -170 L-12 -146 L0 -150 Z M0 -132 L-16 -104 L0 -110 Z" fill="#4fb06a" opacity=".6" />
    </g>
  );
}

function RoundTree({ x, y, s, c = "#3f9d55" }: { x: number; y: number; s: number; c?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-4" y="-30" width="8" height="34" fill="#7a5235" />
      <circle cx="0" cy="-52" r="30" fill={c} />
      <circle cx="-16" cy="-40" r="20" fill={c} />
      <circle cx="16" cy="-42" r="22" fill={c} />
      <circle cx="-8" cy="-64" r="12" fill="#ffffff" opacity=".12" />
    </g>
  );
}

function Cherry({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M-4 0 C-6 -40 -2 -60 -10 -92 M-5 -50 C10 -70 24 -80 38 -88 M-6 -72 C-22 -86 -34 -94 -48 -98"
        stroke="#7a4b35"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <g fill="#f6a9c1">
        <circle cx="-48" cy="-108" r="34" />
        <circle cx="-8" cy="-130" r="40" />
        <circle cx="38" cy="-104" r="34" />
        <circle cx="12" cy="-90" r="28" />
        <circle cx="-28" cy="-84" r="24" />
      </g>
      <g fill="#fcd2df">
        <circle cx="-18" cy="-142" r="18" />
        <circle cx="28" cy="-118" r="14" />
        <circle cx="-54" cy="-118" r="14" />
        <circle cx="4" cy="-104" r="10" />
      </g>
    </g>
  );
}

export default function HeroScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden role="presentation">
      <defs>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d9cf2" />
          <stop offset=".38" stopColor="#8fcdf8" />
          <stop offset=".68" stopColor="#d9f0ff" />
        </linearGradient>
        <radialGradient id="hs-sun" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fffbe8" />
          <stop offset="1" stopColor="#fffbe8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hs-mtn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8db8e2" />
          <stop offset="1" stopColor="#bcd9f1" />
        </linearGradient>
        <linearGradient id="hs-river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5bb7ef" />
          <stop offset="1" stopColor="#8ad2f7" />
        </linearGradient>
        <linearGradient id="hs-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7ccb72" />
          <stop offset="1" stopColor="#4fa85b" />
        </linearGradient>
        <linearGradient id="hs-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd65c" />
          <stop offset="1" stopColor="#3f9446" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1600" height="900" fill="url(#hs-sky)" />
      <circle cx="1300" cy="150" r="220" fill="url(#hs-sun)" />
      {clouds.map((c, i) => (
        <Cloud key={i} {...c} />
      ))}

      {/* Airplane + contrail */}
      <path d="M960 250 C1060 220 1150 190 1280 158" stroke="#fff" strokeWidth="4" strokeDasharray="2 14" strokeLinecap="round" fill="none" opacity=".95" />
      <g transform="translate(1302 152) rotate(-13)">
        <path d="M-38 0 C-22 -7 22 -7 38 -2 C42 0 42 3 38 4 C22 7 -22 7 -38 2 Z" fill="#fff" />
        <path d="M-2 -3 L-18 -28 L-9 -28 L14 -3 Z M-2 3 L-18 28 L-9 28 L14 3 Z" fill="#fff" />
        <path d="M-33 -1 L-42 -16 L-36 -16 L-26 -1 Z" fill="#0e8444" />
        <rect x="-20" y="-1.5" width="44" height="3" fill="#0e8444" opacity=".5" />
      </g>

      {/* Bukhansan-style mountains */}
      <path
        d="M0 560 L120 470 L200 500 L320 390 L400 430 L470 360 L560 450 L680 410 L780 470 L900 400 L1010 470 L1120 380 L1210 420 L1300 350 L1420 450 L1520 410 L1600 450 V900 H0 Z"
        fill="url(#hs-mtn)"
      />

      {/* Far skyline */}
      <g fill="#a7c8e8">
        {[
          [430, 520, 30, 90], [466, 548, 26, 62], [498, 505, 22, 105], [526, 540, 34, 70], [566, 515, 26, 95], [598, 552, 40, 58],
          [880, 530, 28, 80], [914, 505, 22, 105], [942, 545, 36, 65], [984, 520, 26, 90], [1016, 550, 30, 60],
          [1250, 535, 30, 75], [1286, 515, 24, 95], [1316, 548, 34, 62],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="3" />
        ))}
      </g>

      {/* Lotte World Tower */}
      <g transform="translate(250 610)">
        <path d="M-22 0 L-9 -238 L-4 -262 L0 -270 L4 -262 L9 -238 L22 0 Z" fill="#c9def2" />
        <path d="M0 -270 L4 -262 L9 -238 L22 0 L0 0 Z" fill="#b2cde9" />
        <path d="M-2 -250 L2 -250 L1 -150 L-1 -150 Z" fill="#e8f2fb" />
      </g>

      {/* Namsan + N Seoul Tower */}
      <path d="M1240 640 C1300 540 1460 520 1560 640 Z" fill="#69b884" />
      <g transform="translate(1402 548)">
        <rect x="-6" y="-120" width="12" height="122" fill="#f5f8fa" />
        <rect x="-6" y="-120" width="5" height="122" fill="#dfe8ee" />
        <ellipse cx="0" cy="-122" rx="25" ry="10" fill="#fff" />
        <rect x="-18" y="-136" width="36" height="14" rx="5" fill="#f5f8fa" />
        <ellipse cx="0" cy="-136" rx="20" ry="6" fill="#e3ecf1" />
        <rect x="-2.5" y="-196" width="5" height="60" fill="#fff" />
        <rect x="-2.5" y="-196" width="5" height="11" fill="#e5484d" />
        <rect x="-2.5" y="-172" width="5" height="9" fill="#e5484d" />
        <rect x="-16" y="-8" width="32" height="10" rx="2" fill="#eaf2f6" />
      </g>

      {/* Near city */}
      <g fill="#8fb6dd">
        {[
          [300, 590, 36, 60], [342, 570, 30, 80], [378, 600, 44, 50], [960, 585, 34, 65], [1000, 565, 28, 85], [1034, 595, 46, 55],
          [1330, 590, 30, 60], [1366, 575, 38, 75],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="3" />
        ))}
      </g>
      <g fill="#ffffff" opacity=".55">
        {[[348, 584], [358, 584], [348, 598], [358, 598], [1008, 580], [1018, 580], [1008, 596], [1018, 596], [1374, 590], [1386, 590]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="5" height="7" rx="1" />
        ))}
      </g>

      {/* Han river + bridge */}
      <path d="M0 640 C300 628 600 650 900 640 C1200 630 1400 646 1600 638 V672 C1400 680 1200 668 900 676 C600 684 300 664 0 676 Z" fill="url(#hs-river)" />
      <path d="M120 652 H260 M520 660 H700 M980 650 H1160 M1300 656 H1480" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".6" />
      <g fill="none" stroke="#e8f1f8" strokeWidth="5">
        <path d="M640 652 Q700 612 760 652 Q820 612 880 652 Q940 612 1000 652" />
        <path d="M630 652 H1010" strokeWidth="7" />
      </g>
      <g fill="#e8f1f8">
        {[700, 820, 940].map((x) => (
          <rect key={x} x={x - 3} y={630} width="6" height="24" />
        ))}
      </g>

      {/* Hills */}
      <path d="M0 700 C180 650 340 670 520 690 C700 710 860 660 1040 676 C1220 692 1380 650 1600 684 V900 H0 Z" fill="url(#hs-hill)" />
      <RoundTree x={560} y={705} s={0.9} />
      <RoundTree x={610} y={712} s={0.7} c="#4aa85e" />
      <RoundTree x={1040} y={690} s={0.8} c="#4aa85e" />
      <RoundTree x={1090} y={700} s={1} />

      {/* Hanok palace gate */}
      <g transform="translate(330 700)">
        <rect x="-96" y="-8" width="192" height="14" rx="2" fill="#d9d2c3" />
        <rect x="-82" y="-16" width="164" height="10" fill="#cfc6b3" />
        <rect x="-70" y="-84" width="12" height="68" fill="#b8382f" />
        <rect x="58" y="-84" width="12" height="68" fill="#b8382f" />
        <rect x="-8" y="-84" width="16" height="68" fill="#b8382f" opacity=".0" />
        <rect x="-74" y="-96" width="148" height="14" fill="#2f8a6a" />
        <rect x="-74" y="-86" width="148" height="4" fill="#e3b04b" />
        <rect x="-50" y="-70" width="100" height="54" fill="#7a3b2e" opacity=".25" />
        <path d="M-118 -98 Q-80 -108 0 -108 Q80 -108 118 -98 L106 -114 Q60 -128 0 -130 Q-60 -128 -106 -114 Z" fill="#34434c" />
        <path d="M-78 -128 Q0 -148 78 -128 L66 -138 Q0 -156 -66 -138 Z" fill="#455761" />
        <path d="M-118 -98 Q-124 -104 -126 -112 M118 -98 Q124 -104 126 -112" stroke="#34434c" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>

      {/* Cherry blossoms */}
      <Cherry x={150} y={740} s={1.05} />
      <Cherry x={520} y={735} s={0.75} />
      <Cherry x={1250} y={735} s={0.95} />

      {/* Foreground meadow */}
      <path d="M0 776 C260 730 520 764 760 756 C1000 748 1280 718 1600 766 V900 H0 Z" fill="url(#hs-grass)" />
      <path
        d="M720 900 C760 846 880 828 840 792 C812 770 900 756 980 750 L1010 753 C930 762 868 776 898 800 C946 840 840 860 878 900 Z"
        fill="#ecd9a8"
      />

      {/* Signpost */}
      <g transform="translate(1180 806)">
        <rect x="-4" y="-70" width="8" height="78" rx="2" fill="#8a5a36" />
        <path d="M-6 -72 H70 L84 -60 L70 -48 H-6 Z" fill="#fff" stroke="#0e8444" strokeWidth="2.5" />
        <text x="36" y="-54" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0a4a30" fontFamily="Noto Sans KR, sans-serif">
          서울
        </text>
        <path d="M6 -42 H-58 L-70 -32 L-58 -22 H6 Z" fill="#fff" stroke="#cd2e3a" strokeWidth="2.5" />
        <text x="-26" y="-27" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0a4a30" fontFamily="Inter, sans-serif">
          UB
        </text>
      </g>

      {/* Pines on the edges */}
      <Pine x={30} y={830} s={1.6} />
      <Pine x={120} y={800} s={1.15} />
      <Pine x={1510} y={830} s={1.55} />
      <Pine x={1580} y={790} s={1.1} />
      <Pine x={1430} y={786} s={0.85} />

      {/* Grass + flowers */}
      <g stroke="#2f7d3a" strokeWidth="3" strokeLinecap="round" opacity=".55">
        {grassBlades.map((g, i) => (
          <path key={i} d={`M${g.x} ${g.y} l-4 -12 M${g.x + 6} ${g.y} l2 -14 M${g.x + 12} ${g.y} l5 -10`} />
        ))}
      </g>
      {flowers.map((f, i) => (
        <g key={i}>
          <circle cx={f.x} cy={f.y} r={f.r} fill={f.c} />
          <circle cx={f.x} cy={f.y} r={f.r / 2.6} fill="#f5b700" />
        </g>
      ))}

      {/* Petals in the air */}
      {petals.map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="7" ry="4" fill="#f9b8cc" transform={`rotate(${i * 41} ${x} ${y})`} opacity=".9" />
      ))}
    </svg>
  );
}

/**
 * Монгол → Солонгос нислэгийн зам. Hero-ийн зураг дээр давхарлана.
 * Координат нь зургийн пикселээр (viewBox) — зурагтай хамт масштаблагдана.
 */
type Pt = { x: number; y: number };
type Props = {
  from: string;
  to: string;
  /** Зургийн хэмжээ (пиксел) */
  w: number;
  h: number;
  a: Pt;
  plane: Pt;
  b: Pt;
  font?: number;
  /** object-cover object-top-той тааруулах бол "xMidYMin slice" */
  fit?: string;
  className?: string;
};

const BLUE = "#2f6fca";

function Pin({ x, y, label, size }: { x: number; y: number; label: string; size: number }) {
  const s = size / 13;
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        transform={`scale(${s}) translate(-9 -22)`}
        d="M9 0C4 0 0 4 0 9c0 6.5 9 13 9 13s9-6.5 9-13c0-5-4-9-9-9Zm0 12.4A3.4 3.4 0 1 1 9 5.6a3.4 3.4 0 0 1 0 6.8Z"
        fill={BLUE}
      />
      <text
        y={18 * s}
        textAnchor="middle"
        fill={BLUE}
        fontSize={size}
        fontWeight={800}
        letterSpacing={size * 0.06}
        fontFamily="Inter Variable, Noto Sans KR, sans-serif"
        style={{ paintOrder: "stroke" }}
        stroke="#eef5fd"
        strokeWidth={size * 0.35}
        strokeLinejoin="round"
      >
        {label}
      </text>
    </g>
  );
}

export default function RouteOverlay({ from, to, w, h, a, plane, b, font = 14, fit = "xMidYMid meet", className = "" }: Props) {
  const sw = font / 7;
  const dx = plane.x - a.x;
  // Нисэлтийн муруй: эхэндээ доош, дараа нь дээш онгоц руу
  const traveled = `M${a.x} ${a.y + font * 1.9} C ${a.x + dx * 0.25} ${a.y + font * 6}, ${a.x + dx * 0.6} ${plane.y - font * 0.6}, ${plane.x} ${plane.y}`;
  const remaining = `M${plane.x} ${plane.y} C ${plane.x + (b.x - plane.x) * 0.45} ${plane.y + 2}, ${b.x - (b.x - plane.x) * 0.25} ${b.y - font * 3}, ${b.x} ${b.y - font * 0.6}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio={fit}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    >
      <path d={traveled} fill="none" stroke={BLUE} strokeWidth={sw} strokeLinecap="round" strokeOpacity=".85" />
      <path
        d={remaining}
        fill="none"
        stroke={BLUE}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeDasharray={`${sw} ${sw * 4}`}
        strokeOpacity=".85"
        className="animate-dash"
      />
      <g transform={`translate(${plane.x} ${plane.y}) rotate(4) scale(${font / 12})`}>
        <path
          d="M-14 0 C-8 -2 8 -2.4 14 -1 C16 -0.4 16 0.6 14 1.2 C8 2.4 -8 2 -14 0 Z M-2 -1 L-9 -11 L-5.5 -11 L5 -1 Z M-2 1 L-9 11 L-5.5 11 L5 1 Z M-12 -0.5 L-16 -6 L-13.5 -6 L-9.5 -0.5 Z M-12 0.5 L-16 6 L-13.5 6 L-9.5 0.5 Z"
          fill={BLUE}
        />
      </g>
      <Pin x={a.x} y={a.y} label={from} size={font} />
      <Pin x={b.x} y={b.y} label={to} size={font} />
    </svg>
  );
}

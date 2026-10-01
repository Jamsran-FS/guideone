import type { ReactNode } from "react";

type Tone = "soon" | "new" | "accent" | "neutral" | "onDark";

const tones: Record<Tone, string> = {
  new: "bg-lime text-primary-dark",
  soon: "bg-signal/10 text-signal",
  accent: "bg-accent-soft text-accent",
  neutral: "bg-primary-soft text-primary",
  onDark: "bg-white/10 text-white ring-1 ring-inset ring-white/20",
};

export default function Badge({ children, tone = "neutral", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

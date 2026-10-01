import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** h2 (default) эсвэл h1 (дэд хуудсанд) */
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export default function SectionHeading({ eyebrow, title, text, align = "left", tone = "light", as = "h2", id, className = "" }: Props) {
  const H = as;
  const center = align === "center";
  const dark = tone === "dark";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${center ? "mx-auto items-center text-center" : ""} ${className}`} data-reveal>
      <p className={`flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-white/60" : "text-accent"}`}>
        <span className={`h-px w-6 ${dark ? "bg-white/40" : "bg-accent"}`} aria-hidden />
        {eyebrow}
      </p>
      <H
        id={id}
        className={`font-display text-[1.9rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem] ${dark ? "text-white" : "text-foreground"}`}
      >
        {title}
      </H>
      {text && <p className={`text-base leading-relaxed sm:text-lg ${dark ? "text-white/70" : "text-muted"}`}>{text}</p>}
    </div>
  );
}

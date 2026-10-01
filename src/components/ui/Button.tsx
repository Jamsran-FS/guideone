import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "secondary" | "ghost" | "light" | "outlineLight";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent-strong focus-visible:outline-accent",
  dark: "bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary",
  secondary: "border border-border bg-surface text-foreground hover:border-primary/40 hover:bg-background focus-visible:outline-primary",
  ghost: "text-primary hover:text-accent focus-visible:outline-primary px-0!",
  light: "bg-white text-primary hover:bg-accent-soft focus-visible:outline-white",
  outlineLight: "border border-white/25 text-white hover:border-white/60 hover:bg-white/5 focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

/** Холбоос хэлбэрийн товч. Дотоод холбоосыг next/link-ээр, tel:/mailto:/гадаад холбоосыг <a>-ээр. */
export default function Button({ href, children, variant = "primary", size = "md", className = "", external, ariaLabel }: Props) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${sizes[size]} ${variants[variant]} ${className}`;
  const isPlain = external || /^(tel:|mailto:|https?:)/.test(href);
  if (isPlain) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

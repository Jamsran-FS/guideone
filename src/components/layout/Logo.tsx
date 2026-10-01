import Image from "next/image";
import Link from "next/link";

export default function Logo({
  href,
  label,
  tagline,
  tone = "dark",
  compact = false,
}: {
  href: string;
  label: string;
  tagline?: string;
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const light = tone === "light";
  return (
    <Link href={href} aria-label={label} className="flex shrink-0 items-center gap-3">
      <span className={`grid place-items-center rounded-xl ${compact ? "size-10" : "size-11"} ${light ? "bg-white" : compact ? "bg-accent-soft/60" : "bg-surface ring-1 ring-border"}`}>
        <Image src="/logo-mark-sm.png" alt="" width={240} height={185} sizes="44px" className="h-auto w-8" priority />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.3rem] font-extrabold tracking-[-0.02em] ${light ? "text-white" : "text-primary"}`}>GuideOne</span>
        {tagline && !compact && (
          <span className={`mt-1 whitespace-nowrap text-[10.5px] font-medium tracking-[0.04em] ${light ? "text-white/55" : "text-muted"}`}>
            {tagline}
          </span>
        )}
      </span>
    </Link>
  );
}

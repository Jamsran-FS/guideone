import type { ReactNode } from "react";

/** Нимгэн хүрээтэй, бага зэрэг бөөрөнхийлсөн энгийн карт */
export default function Card({
  children,
  className = "",
  interactive = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={`rounded-2xl border border-border bg-surface ${
        interactive ? "transition duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_18px_40px_-24px_rgb(10_74_48/0.35)]" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

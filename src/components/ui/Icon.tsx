import {
  BookOpen,
  GraduationCap,
  Languages,
  Luggage,
  MessagesSquare,
  Plane,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

/** data/ файлуудад icon-ыг нэрээр нь (string) хадгалдаг тул энд map хийнэ */
const map: Record<string, LucideIcon> = { BookOpen, GraduationCap, Languages, Luggage, MessagesSquare, Plane, Smartphone };

export default function Icon({ name, className }: { name: string; className?: string }) {
  const I = map[name] ?? GraduationCap;
  return <I className={className} aria-hidden />;
}

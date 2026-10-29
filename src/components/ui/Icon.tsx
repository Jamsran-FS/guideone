import {
  BookOpen,
  CardSim,
  Compass,
  Eye,
  FileText,
  GraduationCap,
  Handshake,
  Heart,
  IdCard,
  Languages,
  Layers,
  Luggage,
  MessagesSquare,
  Plane,
  PlaneTakeoff,
  RefreshCw,
  Route,
  Scale,
  ShieldCheck,
  Smartphone,
  Star,
  Target,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

/** data/ файлуудад icon-ыг нэрээр нь (string) хадгалдаг тул энд map хийнэ */
const map: Record<string, LucideIcon> = {
  BookOpen,
  GraduationCap,
  Languages,
  Luggage,
  MessagesSquare,
  Plane,
  Smartphone,
  Eye,
  Handshake,
  Scale,
  Star,
  ShieldCheck,
  Heart,
  Users,
  Compass,
  Target,
  IdCard,
  CardSim,
  Layers,
  Route,
  RefreshCw,
  FileText,
  PlaneTakeoff,
  UsersRound,
};

/** Админ самбарт сонгох боломжтой icon-ууд */
export const iconNames = Object.keys(map);

export default function Icon({ name, className }: { name: string; className?: string }) {
  const I = map[name] ?? GraduationCap;
  return <I className={className} aria-hidden />;
}

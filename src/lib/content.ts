import "server-only";
import { cache } from "react";
import type { Localized } from "@/i18n/config";
import { courses as staticCourses, type Course } from "@/data/courses";
import { faqs as staticFaqs, type Faq } from "@/data/faq";
import { partners as staticPartners, type Partner } from "@/data/partners";
import { defaultSections, type Sections } from "@/data/sections";
import { services as staticServices, upcomingServices as staticUpcoming, type Service, type ServiceDetail, type UpcomingService } from "@/data/services";
import { site } from "@/data/site";
import { teachers as staticTeachers, type Teacher } from "@/data/teachers";
import { testimonials as staticTestimonials, type Testimonial } from "@/data/testimonials";
import { deepMerge } from "./merge";
import { API_URL } from "./session-cookies";

/** Админ контент засахад энэ tag-ийг revalidate хийнэ */
export const CONTENT_TAG = "content";

export type Content = Omit<Sections, "site"> & {
  site: typeof site;
  courses: Course[];
  faqs: Faq[];
  partners: Partner[];
  teachers: Teacher[];
  testimonials: Testimonial[];
  services: Service[];
  upcomingServices: UpcomingService[];
};

/* ── Supabase-ийн мөрүүд (snake_case) ─────────────────────────── */
type L = Localized;
type CourseRow = { id: number; slug: string; glyph: string; name: L; level: L; description: L; duration: L | null; price: L | null; is_placeholder: boolean };
type FaqRow = { question: L; answer: L };
type PartnerRow = { id: number; name: L; city: L | null; type: L | null; logo_url: string | null; url: string | null };
type TeacherRow = { name: string; image_url: string | null; position: L; specialty: L | null; experience: L | null; description: L | null };
type TestimonialRow = { name: string; context: L | null; quote: L; image_url: string | null };
type ServiceRow = {
  slug: string;
  icon: string;
  status: "active" | "upcoming";
  title: L;
  summary: L | null;
  description: L;
  topics: Localized<string[]>;
  details: ServiceDetail[];
  is_new: boolean;
};

type ApiContent = {
  sections: Partial<Record<keyof Sections, unknown>>;
  courses: CourseRow[];
  faqs: FaqRow[];
  partners: PartnerRow[];
  teachers: TeacherRow[];
  testimonials: TestimonialRow[];
  services: ServiceRow[];
};

const opt = <T,>(v: T | null): T | undefined => v ?? undefined;

/**
 * Сайтын бүх контент. Backend (/api/content)-ээс уншиж, 5 минут cache-лэнэ;
 * админ засварласан даруйд CONTENT_TAG-аар шинэчлэгдэнэ.
 * Backend ажиллахгүй бол src/data доторх static өгөгдөл харагдана.
 */
export const getContent = cache(async (): Promise<Content> => {
  const data = await fetchContent();
  const { site: siteSection, ...sections } = deepMerge(defaultSections, data?.sections ?? {});
  const base = { ...sections, site: { ...siteSection, url: site.url } };

  if (!data) {
    return {
      ...base,
      courses: staticCourses,
      faqs: staticFaqs,
      partners: staticPartners,
      teachers: staticTeachers,
      testimonials: staticTestimonials,
      services: staticServices,
      upcomingServices: staticUpcoming,
    };
  }

  return {
    ...base,
    courses: data.courses.map((c) => ({
      id: c.id,
      slug: c.slug,
      glyph: c.glyph,
      name: c.name,
      level: c.level,
      description: c.description,
      duration: c.duration,
      price: c.price,
      isPlaceholder: c.is_placeholder,
    })),
    faqs: data.faqs.map((f) => ({ q: f.question, a: f.answer })),
    partners: data.partners.map((p) => ({ id: p.id, name: p.name, city: opt(p.city), type: opt(p.type), logo: opt(p.logo_url), url: opt(p.url) })),
    teachers: data.teachers.map((t) => ({
      name: t.name,
      image: opt(t.image_url),
      position: t.position,
      specialty: opt(t.specialty),
      experience: opt(t.experience),
      description: opt(t.description),
    })),
    testimonials: data.testimonials.map((t) => ({ name: t.name, context: opt(t.context), quote: t.quote, image: opt(t.image_url) })),
    services: data.services
      .filter((s) => s.status === "active")
      .map((s) => ({
        slug: s.slug,
        icon: s.icon,
        title: s.title,
        summary: s.summary,
        description: s.description,
        topics: s.topics,
        details: s.details.length > 0 ? s.details : undefined,
        isNew: s.is_new,
      })),
    upcomingServices: data.services
      .filter((s) => s.status === "upcoming")
      .map((s) => ({ slug: s.slug, icon: s.icon, title: s.title, description: s.summary ?? s.description })),
  };
});

async function fetchContent(): Promise<ApiContent | null> {
  try {
    const res = await fetch(`${API_URL}/api/content`, { next: { tags: [CONTENT_TAG], revalidate: 300 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as ApiContent;
  } catch (e) {
    console.warn(`[content] ${API_URL}/api/content unavailable, using static data:`, e instanceof Error ? e.message : e);
    return null;
  }
}

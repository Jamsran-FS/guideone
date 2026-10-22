import type { Localized } from "@/i18n/config";
import type { Education } from "@/data/teachers";

/**
 * Админ самбарын жагсаалт контентын тохиргоо — талбар бүрийг ямар оролтоор засахыг тодорхойлно.
 * Талбарын `name` нь Supabase-ийн баганын нэртэй ижил (backend ContentResources.cs-тэй таарна).
 */
export type FieldType =
  | "text"
  | "url"
  | "number"
  | "boolean"
  | "select"
  | "icon"
  | "image"
  | "localized"
  | "localizedText"
  | "localizedList"
  | "details"
  | "education";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  optional?: boolean;
  help?: string;
  options?: { value: string; label: string }[];
};

export type Row = Record<string, unknown> & { id?: number; is_published?: boolean; sort_order?: number };

export type ResourceConfig = {
  title: string;
  singular: string;
  description: string;
  fields: Field[];
  /** `image` — тодорхойлогдсон бол жагсаалтад жижиг зураг харуулна (null бол хоосон дүрс). */
  summary: (row: Row) => { title: string; subtitle?: string; image?: string | null };
};

const mn = (v: unknown) => (v as Localized | null)?.mn ?? "";

const common: Field[] = [
  { name: "sort_order", label: "Эрэмбэ", type: "number", help: "Бага тоотой нь эхэнд харагдана." },
  { name: "is_published", label: "Сайтад харуулах", type: "boolean" },
];

export const resources = {
  courses: {
    title: "Сургалт",
    singular: "сургалт",
    description: "Нүүр хуудасны \"Сургалт\" хэсэгт харагдах Солонгос хэлний сургалтууд.",
    fields: [
      { name: "name", label: "Нэр", type: "localized" },
      { name: "slug", label: "Slug", type: "text", help: "Латин жижиг үсэг, тоо, зураас. Жишээ нь: topik" },
      { name: "glyph", label: "Солонгос тэмдэгт", type: "text", help: "Карт дээрх том бичиг. Жишээ нь: 초급" },
      { name: "level", label: "Түвшин", type: "localized" },
      { name: "description", label: "Тайлбар", type: "localizedText" },
      { name: "duration", label: "Хугацаа", type: "localized", optional: true, help: "Хоосон бол \"Зөвлөхөөс тодруулна\" гэж харагдана." },
      { name: "price", label: "Төлбөр", type: "localized", optional: true, help: "Хоосон бол харагдахгүй." },
      { name: "is_placeholder", label: "Жишээ (батлагдаагүй) мэдээлэл", type: "boolean" },
      ...common,
    ],
    summary: (r) => ({ title: mn(r.name), subtitle: mn(r.level) }),
  },
  services: {
    title: "Үйлчилгээ",
    singular: "үйлчилгээ",
    description: "Идэвхтэй үйлчилгээ бүр /services/[slug] хуудастай. \"Удахгүй\" төлөвтэй нь саарал картаар харагдана.",
    fields: [
      { name: "title", label: "Нэр", type: "localized" },
      { name: "slug", label: "Slug", type: "text", help: "Хуудасны хаяг: /mn/services/[slug]" },
      {
        name: "status",
        label: "Төлөв",
        type: "select",
        options: [
          { value: "active", label: "Идэвхтэй (хуудастай)" },
          { value: "upcoming", label: "Тун удахгүй" },
        ],
      },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "summary", label: "Картын богино тайлбар", type: "localizedText", optional: true, help: "Хоосон бол дэлгэрэнгүй тайлбар харагдана." },
      { name: "description", label: "Дэлгэрэнгүй тайлбар", type: "localizedText" },
      { name: "topics", label: "Зөвлөхөөс асууж болох зүйлс", type: "localizedList", help: "Мөр бүрд нэг зүйл." },
      { name: "details", label: "Үйлчилгээний мэдээлэл (хүснэгт)", type: "details", help: "Утга хоосон бол \"Удахгүй шинэчлэгдэнэ\" гэж харагдана." },
      { name: "is_new", label: "ШИНЭ тэмдэг", type: "boolean" },
      ...common,
    ],
    summary: (r) => ({ title: mn(r.title), subtitle: r.status === "upcoming" ? "Тун удахгүй" : `/services/${r.slug}` }),
  },
  partners: {
    title: "Хамтрагч сургууль",
    singular: "сургууль",
    description: "Солонгос дахь хамтран ажилладаг сургуулиуд — зөвхөн бодит гэрээтэй сургуулийг нэмнэ.",
    fields: [
      { name: "name", label: "Нэр", type: "localized" },
      { name: "type", label: "Төрөл", type: "localized", optional: true, help: "Жишээ нь: Их сургууль, Хэлний сургууль, Ахлах сургууль" },
      { name: "city", label: "Хот", type: "localized", optional: true },
      { name: "logo_url", label: "Лого", type: "image", optional: true },
      { name: "url", label: "Вэбсайт", type: "url", optional: true },
      ...common,
    ],
    summary: (r) => ({ title: mn(r.name), subtitle: [mn(r.type), mn(r.city)].filter(Boolean).join(" · ") }),
  },
  teachers: {
    title: "Багш нар",
    singular: "багш",
    description: "Нүүр хуудасны \"Багш нар\" хэсэг.",
    fields: [
      { name: "name", label: "Нэр", type: "text" },
      { name: "image_url", label: "Зураг", type: "image", optional: true, help: "4:5 харьцаатай зураг тохиромжтой." },
      { name: "position", label: "Албан тушаал", type: "localized" },
      { name: "specialty", label: "Мэргэшил", type: "localized", optional: true },
      { name: "experience", label: "Туршлага", type: "localized", optional: true },
      { name: "description", label: "Тайлбар", type: "localizedText", optional: true },
      { name: "education", label: "Боловсрол", type: "education", help: "Төгссөн / суралцаж буй сургуулиуд. Дээрээс доош дарааллаар харагдана." },
      ...common,
    ],
    summary: (r) => ({ title: String(r.name ?? ""), subtitle: mn(r.position), image: (r.image_url as string | null) || null }),
  },
  testimonials: {
    title: "Сэтгэгдэл",
    singular: "сэтгэгдэл",
    description: "Суралцагчдын сэтгэгдэл — зөвхөн бодит, зөвшөөрөл авсан сэтгэгдэл нэмнэ.",
    fields: [
      { name: "name", label: "Нэр", type: "text" },
      { name: "context", label: "Хөтөлбөр", type: "localized", optional: true, help: "Жишээ нь: TOPIK II бэлтгэл, Хэлний бэлтгэл D-4" },
      { name: "quote", label: "Сэтгэгдэл", type: "localizedText" },
      { name: "image_url", label: "Зураг", type: "image", optional: true },
      ...common,
    ],
    summary: (r) => ({ title: String(r.name ?? ""), subtitle: mn(r.context) }),
  },
  faqs: {
    title: "Түгээмэл асуулт",
    singular: "асуулт",
    description: "FAQ хэсгийн асуулт, хариулт.",
    fields: [
      { name: "question", label: "Асуулт", type: "localized" },
      { name: "answer", label: "Хариулт", type: "localizedText" },
      ...common,
    ],
    summary: (r) => ({ title: mn(r.question) }),
  },
} satisfies Record<string, ResourceConfig>;

export type ResourceKey = keyof typeof resources;

export const isResourceKey = (key: string): key is ResourceKey => key in resources;

const blankLocalized = (): Localized => ({ mn: "", en: "", ko: "" });

/** Шинэ мөрийн анхны утгууд */
export function emptyRow(config: ResourceConfig): Row {
  const row: Row = {};
  for (const f of config.fields) {
    row[f.name] = (() => {
      switch (f.type) {
        case "number":
          return 0;
        case "boolean":
          return f.name === "is_published";
        case "select":
          return f.options?.[0]?.value ?? "";
        case "icon":
          return "GraduationCap";
        case "localized":
        case "localizedText":
          return f.optional ? null : blankLocalized();
        case "localizedList":
          return { mn: [], en: [], ko: [] };
        case "details":
        case "education":
          return [];
        default:
          return f.optional ? null : "";
      }
    })();
  }
  return row;
}

const isBlankLocalized = (v: unknown) => !v || Object.values(v as Localized).every((x) => !String(x ?? "").trim());

/** Хадгалахын өмнө: хоосон нэмэлт талбарыг null болгож, жагсаалтын хоосон мөрийг хасна */
export function normalizeRow(config: ResourceConfig, row: Row): Row {
  const out: Row = {};
  for (const f of config.fields) {
    const v = row[f.name];
    switch (f.type) {
      case "number":
        out[f.name] = Number(v) || 0;
        break;
      case "localized":
      case "localizedText":
        out[f.name] = f.optional && isBlankLocalized(v) ? null : v;
        break;
      case "localizedList": {
        const list = v as Localized<string[]>;
        out[f.name] = Object.fromEntries(
          Object.entries(list).map(([lang, items]) => [lang, items.map((s) => s.trim()).filter(Boolean)]),
        );
        break;
      }
      case "details":
        out[f.name] = (v as { label: Localized; value: Localized | null }[]).map((d) => ({
          label: d.label,
          value: isBlankLocalized(d.value) ? null : d.value,
        }));
        break;
      case "education":
        out[f.name] = ((v as Education[] | null) ?? [])
          .filter((e) => !isBlankLocalized(e.school))
          .map((e) => ({
            school: e.school,
            field: isBlankLocalized(e.field) ? null : e.field,
            degree: e.degree || null,
            start: e.start?.trim() || null,
            end: e.status === "in_progress" ? null : e.end?.trim() || null,
            status: e.status,
          }));
        break;
      case "text":
      case "url":
      case "image": {
        const s = String(v ?? "").trim();
        out[f.name] = f.optional && !s ? null : s;
        break;
      }
      default:
        out[f.name] = v;
    }
  }
  return out;
}

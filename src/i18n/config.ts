export const locales = ["mn", "en", "ko"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "mn";

export const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);

export const localeNames: Record<Locale, string> = {
  mn: "Монгол",
  en: "English",
  ko: "한국어",
};

/** Хэл солих үед хадгалах cookie */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Нэг утгыг 3 хэлээр хадгалах төрөл. CMS/API-д шилжүүлэхэд ч ийм бүтэц хэвээр. */
export type Localized<T = string> = Record<Locale, T>;

/** Localized утгаас тухайн хэлийнхийг авна */
export const tr = <T,>(value: Localized<T>, lang: Locale): T => value[lang];

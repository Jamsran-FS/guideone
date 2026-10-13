const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * `override`-ийн утгуудыг `base` дээр гүнзгий нийлүүлнэ. Массивыг бүтнээр нь солино.
 * DB-д дутуу талбар байвал анхны (static) утга нь хэвээр үлдэнэ.
 */
export function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined) return base;
  if (!isPlainObject(base) || !isPlainObject(override)) return override as T;
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) result[key] = deepMerge(result[key], value);
  return result as T;
}

/**
 * Админ линкээр оруулсан гадны зураг (Supabase Storage-оос бусад) — next/image-ийн optimizer
 * зөвхөн next.config-ийн remotePatterns-д зөвшөөрнө, тиймээс эдгээрийг шууд браузераар ачаална.
 */
export const isExternalImage = (src: string) =>
  /^https?:\/\//.test(src) && !/^https:\/\/[^/]+\.supabase\.co\/storage\/v1\/object\/public\//.test(src);

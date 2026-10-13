import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, locales, type Locale } from "./i18n/config";
import { ACCESS_COOKIE, REFRESH_COOKIE, refreshSession, SESSION_COOKIE_NAMES, sessionCookies } from "./lib/session-cookies";

/** Нэвтэрсэн байх шаардлагатай замууд. Эрхийг (admin/student) хуудас өөрөө шалгана. */
const PROTECTED = /^\/(admin|teacher|(mn|en|ko)\/account)(\/|$)/;

/** cookie → браузерын хэл (Accept-Language) → монгол */
function pickLocale(req: NextRequest): Locale {
  const fromCookie = req.cookies.get(LOCALE_COOKIE)?.value;
  if (fromCookie && hasLocale(fromCookie)) return fromCookie;

  const accept = req.headers.get("accept-language") ?? "";
  const prefs = accept
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const p of prefs) if (hasLocale(p.lang)) return p.lang;
  return defaultLocale;
}

/** Access token дууссан бол refresh token-оор шинэчилнэ; боломжгүй бол нэвтрэх хуудас руу */
async function requireSession(req: NextRequest) {
  if (req.cookies.has(ACCESS_COOKIE)) return NextResponse.next();

  const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value;
  const session = refreshToken ? await refreshSession(refreshToken) : null;

  if (!session) {
    const { pathname } = req.nextUrl;
    const segment = pathname.split("/")[1];
    const url = req.nextUrl.clone();
    url.pathname = `/${hasLocale(segment) ? segment : pickLocale(req)}/login`;
    url.search = `?next=${encodeURIComponent(pathname)}`;
    const res = NextResponse.redirect(url);
    for (const name of SESSION_COOKIE_NAMES) res.cookies.delete(name);
    return res;
  }

  // Шинэ token-ийг энэ хүсэлтэд (server component-д) болон хөтөч рүү хоёуланд нь өгнө
  const cookies = sessionCookies(session);
  for (const c of cookies) req.cookies.set(c.name, c.value);
  const res = NextResponse.next({ request: { headers: req.headers } });
  for (const c of cookies) res.cookies.set(c.name, c.value, c.options);
  return res;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PROTECTED.test(pathname)) return requireSession(req);

  const hasPrefix = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasPrefix) return;

  req.nextUrl.pathname = `/${pickLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  // _next, api, static файлууд (цэгтэй замууд) дээр ажиллахгүй
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

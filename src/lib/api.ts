import "server-only";
import { API_URL } from "./session-cookies";

/** Backend-ээс ирсэн алдаа (ProblemDetails). `code` нь Supabase-ийн алдааны код, жишээ нь "invalid_credentials". */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
  ) {
    super(message);
  }
}

type ApiInit = Omit<RequestInit, "body"> & {
  /** Нэвтэрсэн хэрэглэгчийн access token */
  token?: string | null;
  /** JSON body */
  json?: unknown;
  /** FormData (файл upload) */
  form?: FormData;
};

/** .NET backend (GuideOne.Api)-г дуудна. Зөвхөн сервер талд — token хөтөч рүү гарахгүй. */
export async function api<T>(path: string, { token, json, form, headers, ...init }: ApiInit = {}): Promise<T> {
  const h = new Headers(headers);
  if (token) h.set("Authorization", `Bearer ${token}`);
  let body: BodyInit | undefined = form;
  if (json !== undefined) {
    h.set("Content-Type", "application/json");
    body = JSON.stringify(json);
  }

  const res = await fetch(`${API_URL}${path}`, { cache: "no-store", ...init, headers: h, body });
  if (!res.ok) {
    const problem = await res.json().catch(() => null);
    const firstError = problem?.errors && Object.values(problem.errors as Record<string, string[]>)[0]?.[0];
    throw new ApiError(res.status, problem?.detail ?? firstError ?? problem?.title ?? res.statusText, problem?.code);
  }
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

"use client";

import { CheckCircle2, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { saveSection } from "@/app/admin/actions";
import type { defaultSections } from "@/data/sections";
import { emailList, mapEmbedUrl } from "@/data/site";
import { LocalizedInput } from "./fields";
import { btn, input, label, Panel } from "./ui";

export type SiteSettings = typeof defaultSections.site;

const socialLabels: Record<keyof SiteSettings["socials"], string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
};

export default function ContactInfoForm({ initial }: { initial: SiteSettings }) {
  const [site, setSite] = useState<SiteSettings>(initial);
  // Газрын зургийн preview-г бичиж дуусахад шинэчилнэ (үсэг бүрт iframe дахин ачаалахгүй)
  const [mapPreview, setMapPreview] = useState(initial.mapQuery);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => setSite((s) => ({ ...s, [key]: value }));

  function save() {
    setMessage(null);
    const value: SiteSettings = {
      ...site,
      phones: site.phones.map((p) => p.trim()).filter(Boolean),
      email: emailList(site.email).join(", ") || null,
      mapQuery: site.mapQuery.trim(),
      socials: Object.fromEntries(Object.entries(site.socials).map(([k, v]) => [k, v.trim()])) as SiteSettings["socials"],
    };
    startTransition(async () => {
      const result = await saveSection("site", value);
      if (result.ok) setSite(value);
      setMessage(result.ok ? { ok: true, text: "Хадгалагдлаа. Сайт дээр шинэчлэгдсэн." } : { ok: false, text: result.error });
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <Panel className="divide-y divide-border">
        <Row title="Утаснууд" help="Дарахад шууд залгана. Эхний дугаар үйлчилгээний хуудсанд мөн харагдана.">
          <div className="space-y-2">
            {site.phones.map((p, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="tel"
                  value={p}
                  placeholder="+976 8606-3323"
                  onChange={(e) => set("phones", site.phones.map((x, j) => (j === i ? e.target.value : x)))}
                  className={`${input} max-w-xs`}
                />
                <button type="button" onClick={() => set("phones", site.phones.filter((_, j) => j !== i))} className={btn.small} aria-label="Устгах">
                  <Trash2 className="size-3.5" aria-hidden />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => set("phones", [...site.phones, ""])} className={btn.small}>
              <Plus className="size-3.5" aria-hidden /> Утас нэмэх
            </button>
          </div>
        </Row>

        <Row title="И-мэйл" optional help="Хэд хэдэн хаягийг таслалаар тусгаарлана. Хоосон бол сайт дээр харагдахгүй.">
          <input type="email" multiple value={site.email ?? ""} placeholder="info@guideone.mn" onChange={(e) => set("email", e.target.value)} className={`${input} max-w-md`} />
        </Row>

        <Row title="Facebook" optional help="Facebook хуудасны бүтэн холбоос. Хоосон бол харагдахгүй.">
          <input
            type="url"
            value={site.socials.facebook}
            placeholder="https://facebook.com/…"
            onChange={(e) => set("socials", { ...site.socials, facebook: e.target.value })}
            className={`${input} max-w-md`}
          />
        </Row>

        <Row title="Ажлын цаг" optional help={"Мөр бүрд нэг. Жишээ нь:\nДаваа–Баасан: 09:00–18:00\nБямба: 10:00–15:00"}>
          <LocalizedInput value={site.hours} onChange={(v) => set("hours", v)} multiline />
        </Row>

        <Row title="Оффисын хаяг">
          <LocalizedInput value={site.address} onChange={(v) => set("address", v)} multiline />
        </Row>

        <Row title="Хот" help="Footer-т харагдана.">
          <LocalizedInput value={site.city} onChange={(v) => set("city", v)} />
        </Row>

        <Row title="Газрын зураг" help="Google Maps дээр хайхад оффис олддог нэр, хаяг эсвэл координат. Жишээ нь: GD Plaza, Ulaanbaatar эсвэл 47.9135,106.9228">
          <div className="space-y-3">
            <input
              value={site.mapQuery}
              onChange={(e) => set("mapQuery", e.target.value)}
              onBlur={() => setMapPreview(site.mapQuery)}
              className={input}
            />
            {mapPreview.trim() && (
              <div className="relative h-64 overflow-hidden rounded-md border border-border">
                <iframe title="Газрын зургийн preview" src={mapEmbedUrl(mapPreview, "mn")} loading="lazy" className="absolute inset-0 h-full w-full" />
              </div>
            )}
          </div>
        </Row>

        <Row title="Бусад сошиал" optional help="Бүтэн холбоос. Хоосон бол харагдахгүй.">
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(socialLabels) as (keyof SiteSettings["socials"])[]).filter((k) => k !== "facebook").map((k) => (
              <label key={k} className="block">
                <span className="mb-1 block text-xs text-muted">{socialLabels[k]}</span>
                <input
                  type="url"
                  value={site.socials[k]}
                  placeholder="https://…"
                  onChange={(e) => set("socials", { ...site.socials, [k]: e.target.value })}
                  className={input}
                />
              </label>
            ))}
          </div>
        </Row>
      </Panel>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className={btn.primary}>
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Save className="size-4" aria-hidden />}
          Хадгалах
        </button>
        {message && (
          <p role="status" className={`flex items-center gap-1.5 text-sm ${message.ok ? "text-accent" : "text-signal"}`}>
            {message.ok && <CheckCircle2 className="size-4" aria-hidden />}
            {message.text}
          </p>
        )}
      </div>
    </form>
  );
}

function Row({ title, help, optional, children }: { title: string; help?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 p-5 lg:grid-cols-[200px_1fr] lg:gap-6">
      <div>
        <p className={label}>
          {title}
          {optional && <span className="ml-1.5 font-normal text-muted">(заавал биш)</span>}
        </p>
        {help && <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-muted">{help}</p>}
      </div>
      {children}
    </div>
  );
}

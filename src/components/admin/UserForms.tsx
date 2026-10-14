"use client";

import { CheckCircle2, Eye, EyeOff, Loader2, Save, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createUser, updateUser, type NewUserInput, type UserPatch } from "@/app/admin/actions";
import type { Profile, Role } from "@/lib/session-cookies";
import { AvatarInput } from "./fields";
import { btn, input, label, Panel } from "./ui";

const roleOptions: { value: Role; label: string; hint: string }[] = [
  { value: "student", label: "Суралцагч", hint: "Нийтийн сайтаар нэвтэрч өөрийн анги, материал, дүнгээ харна" },
  { value: "teacher", label: "Багш", hint: "Өөрийн ангийн материал, зар, шалгалтын дүн оруулна" },
  { value: "sysadmin", label: "Sysadmin", hint: "Сайтын контент, анги, төлбөр, хэрэглэгч бүгдийг удирдана" },
];

type Message = { ok: boolean; text: string } | null;

function Status({ message }: { message: Message }) {
  if (!message) return null;
  return (
    <p role="status" className={`flex items-center gap-1.5 text-sm ${message.ok ? "text-accent" : "text-signal"}`}>
      {message.ok && <CheckCircle2 className="size-4" aria-hidden />}
      {message.text}
    </p>
  );
}

function RolePicker({ value, onChange, disabled }: { value: Role; onChange: (r: Role) => void; disabled?: boolean }) {
  return (
    <fieldset disabled={disabled} className="grid gap-2 sm:grid-cols-3">
      {roleOptions.map((o) => (
        <label key={o.value} className="cursor-pointer">
          <input type="radio" name="role" value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="peer sr-only" />
          <span className="flex h-full flex-col rounded-md border border-border bg-surface px-4 py-3 transition peer-checked:border-accent peer-checked:bg-accent-soft peer-focus-visible:ring-4 peer-focus-visible:ring-accent/20 peer-disabled:opacity-60">
            <span className="text-sm font-semibold text-foreground">{o.label}</span>
            <span className="mt-0.5 text-xs text-muted">{o.hint}</span>
          </span>
        </label>
      ))}
    </fieldset>
  );
}

export function NewUserForm() {
  const router = useRouter();
  const [value, setValue] = useState<NewUserInput>({ email: "", password: "", fullName: "", phone: "", role: "teacher", avatarUrl: null });
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<Message>(null);
  const [pending, startTransition] = useTransition();
  const set = <K extends keyof NewUserInput>(k: K, v: NewUserInput[K]) => setValue((x) => ({ ...x, [k]: v }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setMessage(null);
        startTransition(async () => {
          const result = await createUser({ ...value, email: value.email.trim(), fullName: value.fullName.trim() });
          if (!result.ok) return setMessage({ ok: false, text: result.error });
          if (result.data.requiresConfirmation) {
            setMessage({ ok: true, text: "Бүртгэл үүслээ. Хэрэглэгч и-мэйлээ баталгаажуулсны дараа нэвтэрнэ." });
          } else {
            router.push("/admin/users");
          }
        });
      }}
    >
      <Panel className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
        <div className="sm:col-span-2">
          <p className={`${label} mb-2`}>Профайл зураг <span className="font-normal text-muted">(заавал биш)</span></p>
          <AvatarInput value={value.avatarUrl} name={value.fullName || value.email} onChange={(url) => set("avatarUrl", url)} />
        </div>
        <div className="sm:col-span-2">
          <p className={`${label} mb-2`}>Эрх</p>
          <RolePicker value={value.role} onChange={(r) => set("role", r)} />
        </div>
        <label className={label}>
          Овог, нэр
          <input required maxLength={120} value={value.fullName} onChange={(e) => set("fullName", e.target.value)} className={`${input} mt-1.5`} />
        </label>
        <label className={label}>
          Утас
          <input type="tel" maxLength={40} value={value.phone} onChange={(e) => set("phone", e.target.value)} className={`${input} mt-1.5`} />
        </label>
        <label className={label}>
          И-мэйл
          <input type="email" required value={value.email} onChange={(e) => set("email", e.target.value)} autoComplete="off" className={`${input} mt-1.5`} />
        </label>
        <label className={label}>
          Түр нууц үг (8+ тэмдэгт)
          <span className="relative mt-1.5 block">
            <input
              type={show ? "text" : "password"}
              required
              minLength={8}
              maxLength={72}
              value={value.password}
              onChange={(e) => set("password", e.target.value)}
              autoComplete="new-password"
              className={`${input} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Нууц үг нуух" : "Нууц үг харуулах"}
              className="absolute inset-y-0 right-2 grid place-items-center text-muted hover:text-foreground"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </span>
        </label>
      </Panel>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className={btn.primary}>
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <UserPlus className="size-4" aria-hidden />}
          Үүсгэх
        </button>
        <Status message={message} />
      </div>
    </form>
  );
}

export function UserEditForm({ user, isSelf }: { user: Profile; isSelf: boolean }) {
  const [value, setValue] = useState<Required<UserPatch>>({
    full_name: user.full_name,
    phone: user.phone,
    birth_date: user.birth_date,
    korean_level: user.korean_level,
    parent_name: user.parent_name,
    parent_phone: user.parent_phone,
    avatar_url: user.avatar_url ?? null,
    role: user.role,
  });
  const [message, setMessage] = useState<Message>(null);
  const [pending, startTransition] = useTransition();
  const set = <K extends keyof UserPatch>(k: K, v: UserPatch[K]) => setValue((x) => ({ ...x, [k]: v }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setMessage(null);
        // Өөрийнхөө эрхийг солихгүй — backend ч мөн хориглоно
        const { role, ...profile } = value;
        startTransition(async () => {
          const result = await updateUser(user.id, isSelf ? profile : { ...profile, role });
          setMessage(result.ok ? { ok: true, text: "Хадгалагдлаа." } : { ok: false, text: result.error });
        });
      }}
    >
      <Panel className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
        <div className="sm:col-span-2">
          <p className={`${label} mb-2`}>Профайл зураг</p>
          <AvatarInput value={value.avatar_url} name={value.full_name || user.email || ""} onChange={(url) => set("avatar_url", url)} />
        </div>
        <div className="sm:col-span-2">
          <p className={`${label} mb-2`}>Эрх {isSelf && <span className="font-normal text-muted">(өөрийнхөө эрхийг солих боломжгүй)</span>}</p>
          <RolePicker value={value.role} onChange={(r) => set("role", r)} disabled={isSelf} />
        </div>
        <label className={label}>
          Овог, нэр
          <input required maxLength={120} value={value.full_name} onChange={(e) => set("full_name", e.target.value)} className={`${input} mt-1.5`} />
        </label>
        <label className={label}>
          Утас
          <input type="tel" maxLength={40} value={value.phone} onChange={(e) => set("phone", e.target.value)} className={`${input} mt-1.5`} />
        </label>
        <label className={label}>
          И-мэйл
          <input value={user.email ?? ""} disabled className={`${input} mt-1.5 bg-background text-muted`} />
        </label>
        <label className={label}>
          Төрсөн огноо
          <input type="date" value={value.birth_date ?? ""} onChange={(e) => set("birth_date", e.target.value || null)} className={`${input} mt-1.5`} />
        </label>
        {value.role === "student" && (
          <>
            <label className={`${label} sm:col-span-2`}>
              Солонгос хэлний түвшин
              <input maxLength={60} value={value.korean_level} onChange={(e) => set("korean_level", e.target.value)} className={`${input} mt-1.5`} />
            </label>
            <label className={label}>
              Эцэг эх / асран хамгаалагчийн нэр
              <input maxLength={120} value={value.parent_name} onChange={(e) => set("parent_name", e.target.value)} className={`${input} mt-1.5`} />
            </label>
            <label className={label}>
              Эцэг эх / асран хамгаалагчийн утас
              <input type="tel" maxLength={40} value={value.parent_phone} onChange={(e) => set("parent_phone", e.target.value)} className={`${input} mt-1.5`} />
            </label>
          </>
        )}
      </Panel>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className={btn.primary}>
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Save className="size-4" aria-hidden />}
          Хадгалах
        </button>
        <Status message={message} />
      </div>
    </form>
  );
}

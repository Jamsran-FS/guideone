import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import { getAccessToken, getCurrentUser } from "@/lib/session";
import type { Profile } from "@/lib/session-cookies";
import { NewUserForm, UserEditForm } from "@/components/admin/UserForms";
import { PageHeader } from "@/components/admin/ui";

export default async function EditUser({ params }: PageProps<"/admin/users/[id]">) {
  const { id } = await params;

  if (id === "new") {
    return (
      <>
        <BackLink />
        <PageHeader title="Шинэ хэрэглэгч" description="Багш, суралцагч эсвэл sysadmin-ий бүртгэл үүсгэнэ. Түр нууц үгийг хэрэглэгчид өгч, нэвтэрсний дараа солихыг зөвлөнө үү." />
        <NewUserForm />
      </>
    );
  }

  const [users, me] = await Promise.all([api<Profile[]>("/api/admin/users", { token: await getAccessToken() }), getCurrentUser()]);
  const user = users.find((u) => u.id === id);
  if (!user) notFound();

  return (
    <>
      <BackLink />
      <PageHeader title={user.full_name || user.email || "Хэрэглэгч"} description={user.email ?? undefined} />
      <UserEditForm key={user.id} user={user} isSelf={user.id === me?.id} />
    </>
  );
}

function BackLink() {
  return (
    <Link href="/admin/users" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
      <ArrowLeft className="size-4" aria-hidden /> Хэрэглэгчид
    </Link>
  );
}

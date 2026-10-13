import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { tr, type Localized } from "@/i18n/config";
import { api } from "@/lib/api";
import type { Enrollment, Group } from "@/lib/lms";
import { getAccessToken } from "@/lib/session";
import type { Profile } from "@/lib/session-cookies";
import { EnrollmentTable } from "@/components/admin/Enrollments";
import GroupForm from "@/components/admin/GroupForm";
import { PageHeader } from "@/components/admin/ui";

type GroupDetail = Group & { enrollments: Enrollment[] };

export default async function EditGroup({ params }: PageProps<"/admin/groups/[id]">) {
  const { id } = await params;
  const token = await getAccessToken();
  const isNew = id === "new";

  const [group, users, courses] = await Promise.all([
    isNew ? null : api<GroupDetail>(`/api/admin/groups/${Number(id)}`, { token }).catch(() => null),
    api<Profile[]>("/api/admin/users", { token }),
    api<{ id: number; name: Localized }[]>("/api/admin/content/courses", { token }),
  ]);
  if (!isNew && !group) notFound();

  const teachers = users.filter((u) => u.role === "teacher").map((u) => ({ id: u.id, name: u.full_name || u.email || u.id }));
  const students = users.filter((u) => u.role === "student").map((u) => ({ id: u.id, name: u.full_name || u.email || u.id, email: u.email }));

  return (
    <>
      <Link href="/admin/groups" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="size-4" aria-hidden /> Ангиуд
      </Link>
      <PageHeader title={group?.name ?? "Шинэ анги"} />

      <GroupForm
        key={id}
        group={group}
        teachers={teachers}
        courses={courses.map((c) => ({ id: c.id, name: tr(c.name, "mn") }))}
      />

      {group && (
        <section className="mt-12">
          <h2 className="mb-1 font-display text-xl font-bold text-foreground">Суралцагчид ба төлбөр</h2>
          <p className="mb-5 text-sm text-muted">Төлөв, төлбөрийн мэдээллийг шууд засна. Багш төлбөрийн мэдээллийг харахгүй.</p>
          <EnrollmentTable
            groupId={group.id}
            enrollments={group.enrollments}
            candidates={students.filter((s) => !group.enrollments.some((e) => e.student_id === s.id))}
          />
        </section>
      )}
    </>
  );
}

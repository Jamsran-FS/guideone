import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, ExternalLink, Phone } from "lucide-react";
import { tr } from "@/i18n/config";
import { api } from "@/lib/api";
import { enrollmentStatusLabel, materialKindLabel, type Announcement, type Enrollment, type Exam, type Group, type Material } from "@/lib/lms";
import { getAccessToken } from "@/lib/session";
import { Empty, formatDate, PageHeader, Panel, Pill } from "@/components/admin/ui";
import { AnnouncementForm, DeleteButton, ExamForm, MaterialForm, ScoreSheet } from "@/components/teacher/forms";

type GroupDetail = {
  group: Group;
  students: Pick<Enrollment, "id" | "status" | "student">[];
  materials: Material[];
  announcements: Announcement[];
  exams: Exam[];
};

export default async function TeacherGroup({ params }: PageProps<"/teacher/groups/[id]">) {
  const { id } = await params;
  const groupId = Number(id);
  const data = await api<GroupDetail>(`/api/teacher/groups/${groupId}`, { token: await getAccessToken() }).catch(() => null);
  if (!data) notFound();

  const { group, materials, announcements, exams } = data;
  const students = data.students.filter((s) => s.student);
  const active = students.filter((s) => s.status === "active");
  const h2 = "font-display text-xl font-bold text-foreground";

  return (
    <>
      <Link href="/teacher" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="size-4" aria-hidden /> Миний ангиуд
      </Link>
      <PageHeader
        title={group.name}
        description={[group.course && tr(group.course.name, "mn"), group.start_date && `${group.start_date} – ${group.end_date ?? ""}`].filter(Boolean).join(" · ")}
      />

      <nav className="mb-8 flex flex-wrap gap-2 text-sm" aria-label="Хэсгүүд">
        {[
          ["#students", `Суралцагчид (${students.length})`],
          ["#materials", `Материал (${materials.length})`],
          ["#announcements", `Зар (${announcements.length})`],
          ["#exams", `Шалгалт (${exams.length})`],
        ].map(([href, label]) => (
          <a key={href} href={href} className="rounded-md border border-border bg-surface px-3.5 py-1.5 font-semibold text-foreground hover:border-primary/40">
            {label}
          </a>
        ))}
      </nav>

      {/* ── Суралцагчид ── */}
      <section id="students" className="scroll-mt-24">
        <h2 className={`${h2} mb-4`}>Суралцагчид</h2>
        {students.length === 0 ? (
          <Empty>Энэ ангид суралцагч элсээгүй байна.</Empty>
        ) : (
          <Panel className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border bg-background/70 text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold">Нэр</th>
                  <th className="px-5 py-3 font-semibold">Холбоо барих</th>
                  <th className="px-5 py-3 font-semibold">Эцэг эх</th>
                  <th className="px-5 py-3 font-semibold">Төлөв</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {students.map(({ id: enrollmentId, status, student }) => (
                  <tr key={enrollmentId}>
                    <td className="px-5 py-3">
                      <p className="font-semibold text-foreground">{student!.full_name || "—"}</p>
                      {student!.korean_level && <p className="text-xs text-muted">Түвшин: {student!.korean_level}</p>}
                    </td>
                    <td className="px-5 py-3">
                      <p>{student!.email}</p>
                      {student!.phone && (
                        <a href={`tel:${student!.phone.replace(/[\s-]/g, "")}`} className="inline-flex items-center gap-1 text-accent hover:underline">
                          <Phone className="size-3" aria-hidden /> {student!.phone}
                        </a>
                      )}
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {student!.parent_name || "—"} {student!.parent_phone}
                    </td>
                    <td className="px-5 py-3">
                      <Pill tone={status === "active" ? "green" : "gray"}>{enrollmentStatusLabel[status]}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        )}
      </section>

      {/* ── Материал ── */}
      <section id="materials" className="mt-14 scroll-mt-24">
        <h2 className={`${h2} mb-4`}>Сургалтын материал</h2>
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <Panel className="h-fit p-5">
            <MaterialForm groupId={groupId} />
          </Panel>
          {materials.length === 0 ? (
            <Empty>Материал оруулаагүй байна.</Empty>
          ) : (
            <Panel className="divide-y divide-border">
              {materials.map((m) => (
                <div key={m.id} className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill tone="green">{materialKindLabel[m.kind]}</Pill>
                      <p className="font-semibold text-foreground">{m.title}</p>
                    </div>
                    {m.description && <p className="mt-1 whitespace-pre-line text-sm text-muted">{m.description}</p>}
                    <div className="mt-2 flex flex-wrap gap-3 text-sm">
                      {m.file_url && (
                        <a href={m.file_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline">
                          <Download className="size-4" aria-hidden /> {m.file_name ?? "Файл"}
                        </a>
                      )}
                      {m.link_url && (
                        <a href={m.link_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline">
                          <ExternalLink className="size-4" aria-hidden /> Холбоос
                        </a>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted">{formatDate(m.created_at)}</p>
                  </div>
                  <DeleteButton kind="material" groupId={groupId} id={m.id} />
                </div>
              ))}
            </Panel>
          )}
        </div>
      </section>

      {/* ── Зар ── */}
      <section id="announcements" className="mt-14 scroll-mt-24">
        <h2 className={`${h2} mb-4`}>Зар мэдээ</h2>
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <Panel className="h-fit p-5">
            <AnnouncementForm groupId={groupId} />
          </Panel>
          {announcements.length === 0 ? (
            <Empty>Зар илгээгээгүй байна.</Empty>
          ) : (
            <Panel className="divide-y divide-border">
              {announcements.map((a) => (
                <div key={a.id} className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">{a.title}</p>
                    {a.body && <p className="mt-1 whitespace-pre-line text-sm text-foreground/85">{a.body}</p>}
                    <p className="mt-1 text-xs text-muted">{formatDate(a.created_at)}</p>
                  </div>
                  <DeleteButton kind="announcement" groupId={groupId} id={a.id} />
                </div>
              ))}
            </Panel>
          )}
        </div>
      </section>

      {/* ── Шалгалт ба дүн ── */}
      <section id="exams" className="mt-14 scroll-mt-24">
        <h2 className={`${h2} mb-4`}>Шалгалт ба дүн</h2>
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <Panel className="h-fit p-5">
            <ExamForm groupId={groupId} />
          </Panel>
          {exams.length === 0 ? (
            <Empty>Шалгалт үүсгээгүй байна.</Empty>
          ) : (
            <div className="space-y-4">
              {exams.map((exam) => (
                <Panel key={exam.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground">{exam.title}</p>
                      <p className="text-sm text-muted">
                        {exam.exam_date ?? "Огноо тодорхойгүй"} · Дээд оноо {exam.max_score}
                      </p>
                      {exam.description && <p className="mt-1 whitespace-pre-line text-sm text-foreground/85">{exam.description}</p>}
                    </div>
                    <DeleteButton kind="exam" groupId={groupId} id={exam.id} />
                  </div>
                  <ScoreSheet
                    groupId={groupId}
                    examId={exam.id}
                    maxScore={exam.max_score}
                    students={active.map((s) => ({ id: s.student!.id, name: s.student!.full_name || s.student!.email || "" }))}
                    results={exam.exam_results}
                  />
                </Panel>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

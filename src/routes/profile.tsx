import { createFileRoute } from "@tanstack/react-router";
import { Mail, GraduationCap, CalendarDays } from "lucide-react";
import { PageHeader, SampleBadge } from "@/components/AppShell";
import { clubs, participation, student } from "@/lib/sample-data";
import { pageMeta } from "@/lib/meta";
import { StatusPill } from "./index";

export const Route = createFileRoute("/profile")({
  head: () => pageMeta("Student Profile", "Student profile, clubs and participation history."),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div>
      <PageHeader title="Profile" subtitle="Your details and participation history." action={<SampleBadge label="Sample student" />} />
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card-surface p-6 text-center">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary font-display text-2xl font-bold text-primary-foreground">AS</span>
          <h2 className="mt-4 text-xl font-bold">{student.name}</h2>
          <p className="text-sm text-muted-foreground">{student.rollNo}</p>
          <div className="mt-5 space-y-2 text-left text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" />{student.program}, {student.year}</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" />{student.email}</p>
            <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" />Member since {student.joined}</p>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {clubs.filter((c) => c.joined).map((c) => <span key={c.id} className="rounded-full bg-sky-soft px-3 py-1 text-xs font-semibold text-primary">{c.name}</span>)}
          </div>
        </section>
        <section className="card-surface p-6 lg:col-span-2">
          <h2 className="mb-4 text-lg font-bold">Participation history</h2>
          <ol className="relative space-y-5 border-l pl-6">
            {participation.map((p) => (
              <li key={p.activity} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-card bg-primary" />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{p.activity}</p>
                  <StatusPill status={p.status} />
                </div>
                <p className="text-xs text-muted-foreground">{p.club} · {p.role} · {new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

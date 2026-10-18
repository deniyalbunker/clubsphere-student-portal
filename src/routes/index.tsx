import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, CalendarDays, Trophy, Award, ArrowRight, Megaphone } from "lucide-react";
import { SampleBadge } from "@/components/AppShell";
import { announcements, calendarItems, clubs, participation, student, certificates } from "@/lib/sample-data";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: () => pageMeta("Dashboard", "Your MSOT club stats, upcoming activities and announcements."),
  component: Dashboard,
});

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

function Dashboard() {
  const joined = clubs.filter((c) => c.joined).length;
  const stats = [
    { label: "Clubs joined", value: joined, icon: Users },
    { label: "Activities attended", value: participation.filter((p) => p.status === "Attended").length, icon: CalendarDays },
    { label: "Participation points", value: student.points, icon: Trophy },
    { label: "Certificates", value: certificates.length, icon: Award },
  ];
  return (
    <div className="space-y-6">
      <section className="hero-panel relative overflow-hidden p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-sm opacity-80">
          Welcome back <SampleBadge label="Sample student" />
        </div>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Hi, {student.name.split(" ")[0]} 👋</h1>
        <p className="mt-2 max-w-lg text-sm opacity-85">
          You have {calendarItems.filter((c) => c.type === "Deadline").length} deadlines and a Club Day coming up. Keep the streak going.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/calendar" className="rounded-xl bg-card px-4 py-2 text-sm font-semibold text-foreground">View calendar</Link>
          <Link to="/events" className="rounded-xl border border-primary-foreground/40 px-4 py-2 text-sm font-semibold">Explore events</Link>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card-surface p-5">
            <Icon className="h-5 w-5 text-primary" />
            <p className="mt-3 font-display text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card-surface p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Upcoming activities</h2>
            <Link to="/calendar" className="flex items-center gap-1 text-sm font-semibold text-primary">All <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <ul className="divide-y">
            {calendarItems.slice(0, 5).map((c) => (
              <li key={c.title} className="flex items-center gap-4 py-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky-soft text-center text-xs font-bold text-primary">{fmt(c.date)}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.club}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.type === "Deadline" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>{c.type}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-surface p-5">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold"><Megaphone className="h-4 w-4 text-primary" /> Announcements</h2>
          <ul className="space-y-4">
            {announcements.map((a) => (
              <li key={a.title} className="rounded-xl bg-muted p-3">
                <p className="text-sm font-semibold">{a.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.body}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">{a.time}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card-surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Recent participation</h2>
          <Link to="/profile" className="text-sm font-semibold text-primary">Full history</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="text-left text-xs text-muted-foreground">
              <tr><th className="pb-2">Activity</th><th className="pb-2">Club</th><th className="pb-2">Date</th><th className="pb-2">Status</th></tr>
            </thead>
            <tbody className="divide-y">
              {participation.slice(0, 4).map((p) => (
                <tr key={p.activity}>
                  <td className="py-3 font-medium">{p.activity}</td>
                  <td className="py-3 text-muted-foreground">{p.club}</td>
                  <td className="py-3 text-muted-foreground">{fmt(p.date)}</td>
                  <td className="py-3"><StatusPill status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone =
    status === "Attended" || status === "Reviewed" ? "bg-success/12 text-success"
    : status === "Missed" ? "bg-destructive/10 text-destructive"
    : status === "Submitted" ? "bg-sky-soft text-primary"
    : "bg-warning/15 text-foreground";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{status}</span>;
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader, SampleBadge } from "@/components/AppShell";
import { calendarItems } from "@/lib/sample-data";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/calendar")({
  head: () => pageMeta("Club Day Calendar", "Club Day activities, dates and submission deadlines."),
  component: CalendarPage,
});

const tone = { Activity: "bg-primary", Deadline: "bg-destructive", Event: "bg-success" } as const;

function CalendarPage() {
  const [month, setMonth] = useState(new Date(2026, 9, 1));
  const [selected, setSelected] = useState<string | null>(null);
  const y = month.getFullYear(), m = month.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const key = (d: number) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const monthItems = calendarItems.filter((c) => c.date.startsWith(key(1).slice(0, 7)));
  const shown = selected ? calendarItems.filter((c) => c.date === selected) : monthItems;

  return (
    <div>
      <PageHeader title="Club Day Calendar" subtitle="Activities, events and deadlines at a glance." action={<SampleBadge />} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section className="card-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <button aria-label="Previous month" onClick={() => { setMonth(new Date(y, m - 1, 1)); setSelected(null); }} className="rounded-lg border p-2"><ChevronLeft className="h-4 w-4" /></button>
            <h2 className="font-bold">{month.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</h2>
            <button aria-label="Next month" onClick={() => { setMonth(new Date(y, m + 1, 1)); setSelected(null); }} className="rounded-lg border p-2"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} className="py-2 font-semibold">{d}</div>)}
            {Array.from({ length: first }).map((_, i) => <div key={"e" + i} />)}
            {Array.from({ length: days }, (_, i) => i + 1).map((d) => {
              const items = calendarItems.filter((c) => c.date === key(d));
              const sel = selected === key(d);
              return (
                <button key={d} onClick={() => setSelected(sel ? null : key(d))}
                  className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-xl text-sm ${sel ? "bg-primary text-primary-foreground" : items.length ? "bg-sky-soft font-semibold text-foreground" : "text-foreground hover:bg-muted"}`}>
                  {d}
                  <span className="flex gap-0.5">{items.map((it) => <span key={it.title} className={`h-1.5 w-1.5 rounded-full ${tone[it.type]}`} />)}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
            {Object.entries(tone).map(([k, v]) => <span key={k} className="flex items-center gap-1.5"><span className={`h-2 w-2 rounded-full ${v}`} />{k}</span>)}
          </div>
        </section>
        <section className="card-surface p-5">
          <h2 className="mb-4 font-bold">{selected ? new Date(selected).toDateString() : "This month"}</h2>
          {shown.length === 0 && <p className="text-sm text-muted-foreground">Nothing scheduled.</p>}
          <ul className="space-y-3">
            {shown.map((c) => (
              <li key={c.title} className="flex gap-3 rounded-xl border p-3">
                <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${tone[c.type]}`} />
                <div>
                  <p className="text-sm font-semibold">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.club} · {c.type} · {new Date(c.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

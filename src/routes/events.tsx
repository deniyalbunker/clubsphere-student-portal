import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, SampleBadge } from "@/components/AppShell";
import { events } from "@/lib/sample-data";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/events")({
  head: () => pageMeta("Events", "Hackathon, Gambade, Cross Road and the International Conference at MSOT."),
  component: EventsPage,
});

function EventsPage() {
  const [interested, setInterested] = useState<string[]>([]);
  return (
    <div>
      <PageHeader title="Flagship Events" subtitle="The biggest moments of the MSOT year." action={<SampleBadge label="Sample dates" />} />
      <div className="grid gap-5 md:grid-cols-2">
        {events.map((e, i) => {
          const on = interested.includes(e.id);
          return (
            <article key={e.id} className="card-surface overflow-hidden">
              <div className={`p-6 ${i % 2 === 0 ? "hero-panel rounded-none" : "bg-sky-soft"}`}>
                <span className="text-xs font-semibold uppercase tracking-widest opacity-80">{e.tag}</span>
                <h3 className="mt-1 text-2xl font-bold">{e.name}</h3>
                <p className="mt-1 text-sm opacity-85">{e.tagline}</p>
              </div>
              <div className="space-y-2 p-5 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" />{e.date}</p>
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{e.venue}</p>
                <p className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" />{e.seats}</p>
                <button
                  onClick={() => { setInterested((s) => (on ? s.filter((x) => x !== e.id) : [...s, e.id])); toast(on ? "Removed from your interest list" : `Marked interest in ${e.name} (preview — registration not saved)`); }}
                  className={`mt-3 w-full rounded-xl py-2.5 font-semibold ${on ? "border text-foreground" : "bg-primary text-primary-foreground"}`}
                >
                  {on ? "Interested ✓" : "I'm interested"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

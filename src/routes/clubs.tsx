import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Users } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, SampleBadge } from "@/components/AppShell";
import { clubs, type ClubCategory } from "@/lib/sample-data";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/clubs")({
  head: () => pageMeta("Clubs", "Browse Tech, Entrepreneurship, Cultural and Sports clubs at MSOT."),
  component: ClubsPage,
});

const cats: ("All" | ClubCategory)[] = ["All", "Tech", "Entrepreneurship", "Cultural", "Sports"];

function ClubsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [joined, setJoined] = useState<Record<string, boolean>>(Object.fromEntries(clubs.map((c) => [c.id, c.joined])));
  const list = clubs.filter(
    (c) => (cat === "All" || c.category === cat) && (c.name + c.desc).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div>
      <PageHeader title="Clubs" subtitle="Find your people across 4 club categories." action={<SampleBadge />} />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-xl border bg-card px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search clubs…" className="w-full bg-transparent text-sm outline-none" />
        </label>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${cat === c ? "bg-primary text-primary-foreground" : "border bg-card text-muted-foreground"}`}>{c}</button>
          ))}
        </div>
      </div>
      {list.length === 0 && <p className="text-sm text-muted-foreground">No clubs match your search.</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <article key={c.id} className="card-surface flex flex-col p-5 transition-shadow hover:shadow-lift">
            <span className="w-fit rounded-full bg-sky-soft px-2.5 py-1 text-xs font-semibold text-primary">{c.category}</span>
            <h3 className="mt-3 text-lg font-bold">{c.name}</h3>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">{c.desc}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {c.members} members</span>
              <span>Lead: {c.lead}</span>
            </div>
            <button
              onClick={() => {
                setJoined((j) => ({ ...j, [c.id]: !j[c.id] }));
                toast(joined[c.id] ? `Left ${c.name} (preview only)` : `Join request for ${c.name} noted (preview only — not saved)`);
              }}
              className={`mt-4 rounded-xl py-2 text-sm font-semibold ${joined[c.id] ? "border text-foreground" : "bg-primary text-primary-foreground"}`}
            >
              {joined[c.id] ? "Joined ✓" : "Request to join"}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

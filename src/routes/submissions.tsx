import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Presentation, Upload } from "lucide-react";
import { toast } from "sonner";
import { Notice, PageHeader, SampleBadge } from "@/components/AppShell";
import { submissions as initial } from "@/lib/sample-data";
import { pageMeta } from "@/lib/meta";
import { StatusPill } from "./index";

export const Route = createFileRoute("/submissions")({
  head: () => pageMeta("Submissions", "Submit club assignments and presentations."),
  component: SubmissionsPage,
});

const tabs = ["All", "Pending", "Submitted", "Reviewed"] as const;

function SubmissionsPage() {
  const [items, setItems] = useState(initial);
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const list = items.filter((s) => tab === "All" || s.status === tab);
  return (
    <div>
      <PageHeader title="Submissions" subtitle="Assignments and presentations for your clubs." action={<SampleBadge />} />
      <Notice>File storage isn't connected. Selected files stay in your browser and are not uploaded.</Notice>
      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${tab === t ? "bg-primary text-primary-foreground" : "border bg-card text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((s) => {
          const Icon = s.kind === "Presentation" ? Presentation : FileText;
          return (
            <article key={s.id} className="card-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-soft text-primary"><Icon className="h-5 w-5" /></span>
                <StatusPill status={s.status} />
              </div>
              <h3 className="mt-3 font-bold">{s.title}</h3>
              <p className="text-xs text-muted-foreground">{s.club} · {s.kind} · Due {new Date(s.due).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
              {s.status === "Pending" ? (
                <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 py-3 text-sm font-semibold text-primary hover:bg-sky-soft">
                  <Upload className="h-4 w-4" /> Choose file
                  <input type="file" className="hidden" onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    setItems((all) => all.map((x) => (x.id === s.id ? { ...x, status: "Submitted" } : x)));
                    toast(`"${f.name}" marked as submitted locally (not uploaded).`);
                  }} />
                </label>
              ) : (
                <p className="mt-4 rounded-xl bg-muted px-3 py-2.5 text-center text-xs text-muted-foreground">{s.status === "Reviewed" ? "Feedback available from coordinator" : "Awaiting review"}</p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

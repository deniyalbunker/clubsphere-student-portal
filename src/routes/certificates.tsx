import { createFileRoute } from "@tanstack/react-router";
import { Award, Medal, Download } from "lucide-react";
import { toast } from "sonner";
import { Notice, PageHeader, SampleBadge } from "@/components/AppShell";
import { certificates, student } from "@/lib/sample-data";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/certificates")({
  head: () => pageMeta("Certificates & Achievements", "Your club certificates and achievements at MSOT."),
  component: CertificatesPage,
});

function CertificatesPage() {
  return (
    <div>
      <PageHeader title="Certificates & Achievements" subtitle="Recognition earned through your club journey." action={<SampleBadge />} />
      <Notice>These are sample certificates. They are not officially issued or verified.</Notice>
      <div className="grid gap-4 sm:grid-cols-2">
        {certificates.map((c) => {
          const Icon = c.kind === "Achievement" ? Medal : Award;
          return (
            <article key={c.title} className="card-surface relative overflow-hidden p-6">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-sky-soft" />
              <Icon className="relative h-8 w-8 text-primary" />
              <p className="relative mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{c.kind}</p>
              <h3 className="relative mt-1 text-lg font-bold">{c.title}</h3>
              <p className="relative text-sm text-muted-foreground">Awarded to {student.name} · {c.issuer} · {c.date}</p>
              <button onClick={() => toast("Downloads will be available once certificates are officially issued.")} className="relative mt-5 flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold">
                <Download className="h-4 w-4" /> Download
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}

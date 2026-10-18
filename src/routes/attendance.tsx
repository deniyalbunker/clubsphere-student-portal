import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QrCode, Camera, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { Notice, PageHeader, SampleBadge, StatusPill } from "@/components/AppShell";
import { participation } from "@/lib/sample-data";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/attendance")({
  head: () => pageMeta("Attendance", "Mark club activity attendance with a QR code."),
  component: AttendancePage,
});

function AttendancePage() {
  const [code, setCode] = useState("");
  const attended = participation.filter((p) => p.status === "Attended").length;
  const rate = Math.round((attended / participation.length) * 100);
  return (
    <div>
      <PageHeader title="Attendance" subtitle="Scan the session QR to check in." action={<SampleBadge />} />
      <Notice>QR verification is not connected yet. Scanning and code entry are interface previews only — no attendance is recorded.</Notice>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-surface flex flex-col items-center p-6 text-center">
          <div className="relative grid h-56 w-56 place-items-center rounded-3xl border-2 border-dashed border-primary/40 bg-sky-soft">
            <QrCode className="h-24 w-24 text-primary/60" />
            {["left-3 top-3 border-l-4 border-t-4", "right-3 top-3 border-r-4 border-t-4", "left-3 bottom-3 border-l-4 border-b-4", "right-3 bottom-3 border-r-4 border-b-4"].map((c) => (
              <span key={c} className={`absolute h-8 w-8 rounded-md border-primary ${c}`} />
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Point your camera at the QR shown by the club coordinator.</p>
          <button onClick={() => toast("Camera scanning isn't available in this preview version.")} className="mt-4 flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            <Camera className="h-4 w-4" /> Start scanning
          </button>
          <form className="mt-6 flex w-full max-w-sm gap-2" onSubmit={(e) => { e.preventDefault(); toast(`Code "${code}" not verified — verification isn't connected yet.`); setCode(""); }}>
            <label className="flex flex-1 items-center gap-2 rounded-xl border px-3">
              <KeyRound className="h-4 w-4 text-muted-foreground" />
              <input required value={code} onChange={(e) => setCode(e.target.value)} placeholder="Or enter session code" className="w-full bg-transparent py-2.5 text-sm outline-none" />
            </label>
            <button className="rounded-xl border px-4 text-sm font-semibold">Submit</button>
          </form>
        </section>
        <section className="card-surface p-6">
          <h2 className="font-bold">Your attendance</h2>
          <div className="mt-4 flex items-end gap-2"><span className="font-display text-4xl font-bold">{rate}%</span><span className="pb-1 text-sm text-muted-foreground">{attended}/{participation.length} sessions</span></div>
          <div className="mt-3 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${rate}%` }} /></div>
          <ul className="mt-6 divide-y">
            {participation.map((p) => (
              <li key={p.activity} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0"><p className="truncate text-sm font-semibold">{p.activity}</p><p className="text-xs text-muted-foreground">{p.club} · {p.date}</p></div>
                <StatusPill status={p.status} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard, Users, CalendarDays, QrCode, FileUp, Trophy, Award, UserRound, Menu, X, Sparkles,
} from "lucide-react";
import { student } from "@/lib/sample-data";

export const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/clubs", label: "Clubs", icon: Users },
  { to: "/calendar", label: "Club Day Calendar", icon: CalendarDays },
  { to: "/attendance", label: "Attendance", icon: QrCode },
  { to: "/submissions", label: "Submissions", icon: FileUp },
  { to: "/events", label: "Events", icon: Trophy },
  { to: "/certificates", label: "Certificates", icon: Award },
  { to: "/profile", label: "Profile", icon: UserRound },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {navItems.map(({ to, label, icon: Icon }) => {
        const active = path === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? "bg-sky-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Sparkles className="h-4 w-4" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base font-bold">ClubSphere</span>
        <span className="block text-[11px] text-muted-foreground">MSOT Student Portal</span>
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen w-full lg:flex">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-8 border-r bg-sidebar p-5 lg:flex">
        <Brand />
        <NavList />
        <div className="mt-auto rounded-2xl bg-sky-soft p-4 text-xs text-accent-foreground">
          <p className="font-semibold">Prototype preview</p>
          <p className="mt-1 text-muted-foreground">All data shown is sample data. Login and storage are not connected yet.</p>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-card/95 px-4 py-3 backdrop-blur lg:hidden">
        <Brand />
        <button aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-xl border p-2">
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-72 flex-col gap-6 bg-card p-5 shadow-lift">
            <div className="flex items-center justify-between">
              <Brand />
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-xl border p-2">
                <X className="h-4 w-4" />
              </button>
            </div>
            <NavList onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="hidden items-center justify-end gap-3 border-b bg-card px-8 py-3 lg:flex">
          <SampleBadge />
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">AS</span>
            <span className="text-sm font-medium">{student.name}</span>
          </div>
        </div>
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

export function SampleBadge({ label = "Sample data" }: { label?: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-warning/40 bg-warning/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-foreground">
      {label}
    </span>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 rounded-xl border border-primary/20 bg-sky-soft px-4 py-3 text-sm text-accent-foreground">{children}</div>
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Images,
  Globe2,
  Menu,
  X,
  LogOut,
  ExternalLink,
  Plane,
} from "lucide-react";
import Logo from "@/components/Logo";
import { logoutAction } from "@/app/dashboard/actions";

const nav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Inquiries", href: "/dashboard/inquiries", icon: MessageSquare },
  { label: "Blog", href: "/dashboard/blog", icon: FileText },
  { label: "Group tours", href: "/dashboard/tours", icon: Images },
  { label: "Visa catalogue", href: "/dashboard/visas", icon: Globe2 },
];

export default function DashboardShell({
  children,
  newInquiries,
}: {
  children: React.ReactNode;
  newInquiries: number;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname?.startsWith(href);

  const sidebar = (
    <div className="flex h-full flex-col bg-slate-950 text-white">
      <div className="flex items-center justify-between px-5 py-5">
        <Logo size="sm" variant="light" />
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mx-5 mb-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
          <Plane size={14} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold">AUZBIZ Studio</p>
          <p className="truncate text-[10px] text-white/60">Content &amp; tours</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Dashboard">
        {nav.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-amber-500 text-slate-950"
                  : "text-white/60 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <item.icon size={17} strokeWidth={2} />
              <span className="flex-1">{item.label}</span>
              {item.href === "/dashboard/inquiries" && newInquiries > 0 && (
                <span
                  className={`min-w-5 rounded-full px-1.5 py-0.5 text-center text-[10px] font-bold ${
                    active ? "bg-slate-950/15 text-slate-950" : "bg-amber-500 text-slate-950"
                  }`}
                >
                  {newInquiries}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/10 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <ExternalLink size={17} strokeWidth={2} />
          View website
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <LogOut size={17} strokeWidth={2} />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">{sidebar}</aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />
          <aside className="relative h-full w-72 max-w-[85vw] shadow-2xl">{sidebar}</aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-xl sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={19} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">AUZBIZ dashboard</p>
            <p className="truncate text-[11px] text-muted-foreground">
              Blog, group tours, and enquiries
            </p>
          </div>
          {pathname !== "/dashboard" && (
            <Link
              href="/dashboard/tours/new"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
            >
              <Images size={14} />
              <span className="hidden sm:inline">Add group tour</span>
              <span className="sm:hidden">Add tour</span>
            </Link>
          )}
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}

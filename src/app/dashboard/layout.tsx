"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FileText,
  MessageSquare,
  Plane,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  Globe,
} from "lucide-react";
import { useState } from "react";
import Logo from "@/components/Logo";

const nav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Inquiries", href: "/dashboard/inquiries", icon: MessageSquare },
  { label: "Packages", href: "/dashboard/packages", icon: Package },
  { label: "Visas", href: "/dashboard/visas", icon: Plane },
  { label: "Blog", href: "/dashboard/blog", icon: FileText },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname?.startsWith(href);

  const Sidebar = (
    <div className="flex flex-col h-full">
      <div className="px-4 py-5 border-b border-gray-100 dark:border-white/10">
        <Logo size="sm" variant="dark" href="/dashboard" />
        <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-2 font-medium">
          Admin console
        </p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-navy-800 text-gold-500"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
              }`}
            >
              <item.icon size={18} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-gray-100 dark:border-white/10 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5"
        >
          <Globe size={18} strokeWidth={1.75} />
          View website
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5"
        >
          <LogOut size={18} strokeWidth={1.75} />
          Sign out
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f5f7] dark:bg-[#0a0a1a] flex">
      <aside className="hidden md:flex w-60 shrink-0 flex-col bg-white dark:bg-[#12122a] border-r border-gray-200 dark:border-white/10 fixed inset-y-0 left-0 z-30">
        {Sidebar}
      </aside>

      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-[#12122a] shadow-xl">
            {Sidebar}
          </aside>
        </div>
      )}

      <div className="flex-1 md:ml-60 min-w-0 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 bg-white/90 dark:bg-[#12122a]/90 backdrop-blur border-b border-gray-200 dark:border-white/10 px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            type="button"
            className="md:hidden p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
            AUZBIZ Group · Operations
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-gray-400">Staff</span>
            <div className="w-8 h-8 rounded-full bg-navy-800 text-gold-500 flex items-center justify-center text-xs font-bold">
              AZ
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

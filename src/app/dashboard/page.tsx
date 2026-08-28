"use client";

import Link from "next/link";
import {
  MessageSquare,
  Package,
  Plane,
  TrendingUp,
  Users,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const kpis = [
  {
    label: "New inquiries",
    value: "24",
    change: "+6 this week",
    icon: MessageSquare,
    tone: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
  },
  {
    label: "Active packages",
    value: "12",
    change: "3 featured",
    icon: Package,
    tone: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  },
  {
    label: "Visa files open",
    value: "18",
    change: "5 urgent",
    icon: Plane,
    tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  },
  {
    label: "Clients served",
    value: "500+",
    change: "Lifetime",
    icon: Users,
    tone: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
  },
];

const recentInquiries = [
  {
    name: "Ahmed Raza",
    type: "Umrah · Family of 4",
    channel: "WhatsApp",
    time: "12 min ago",
    status: "New",
  },
  {
    name: "Sara Khan",
    type: "Schengen visa · Couple",
    channel: "Website",
    time: "1 hr ago",
    status: "In progress",
  },
  {
    name: "Fast Agro HR",
    type: "Corporate MICE · Thailand",
    channel: "Email",
    time: "3 hrs ago",
    status: "Quoted",
  },
  {
    name: "Bilal Hussain",
    type: "Uzbekistan tour · 8 pax",
    channel: "WhatsApp",
    time: "Yesterday",
    status: "New",
  },
];

const pipeline = [
  { label: "New leads", count: 9, color: "bg-blue-500" },
  { label: "Documents pending", count: 7, color: "bg-amber-500" },
  { label: "Submitted", count: 5, color: "bg-sky-500" },
  { label: "Approved / booked", count: 11, color: "bg-emerald-500" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Snapshot of inquiries, packages, and visa files.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#12122a] p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {k.label}
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {k.value}
                </p>
                <p className="mt-1 text-xs text-gray-400">{k.change}</p>
              </div>
              <div className={`p-2 rounded-lg ${k.tone}`}>
                <k.icon size={18} strokeWidth={1.75} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#12122a] overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-white">Recent inquiries</h2>
            <Link
              href="/dashboard/inquiries"
              className="text-xs font-medium text-navy-700 dark:text-gold-500 hover:underline inline-flex items-center gap-1"
            >
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <ul className="divide-y divide-gray-100 dark:divide-white/5">
            {recentInquiries.map((inq) => (
              <li key={inq.name} className="px-5 py-3.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                    {inq.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{inq.type}</p>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className={`inline-flex text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                      inq.status === "New"
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
                        : inq.status === "In progress"
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                    }`}
                  >
                    {inq.status}
                  </span>
                  <p className="text-[11px] text-gray-400 mt-1">{inq.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#12122a] p-5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Pipeline</h2>
          <div className="space-y-3">
            {pipeline.map((p) => (
              <div key={p.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">{p.label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{p.count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${p.color}`}
                    style={{ width: `${Math.min(100, p.count * 6)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <CheckCircle2 size={16} className="text-emerald-500" />
              11 closed this month
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <AlertCircle size={16} className="text-amber-500" />
              5 need follow-up today
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Clock size={16} className="text-sky-500" />
              Avg response < 2 hrs
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-navy-800 to-navy-900 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg">Quick actions</h3>
          <p className="text-sm text-white/70 mt-1">
            Jump to the tools you use most.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard/inquiries"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500 text-navy-900 text-sm font-semibold hover:bg-gold-400"
          >
            <MessageSquare size={16} /> Inquiries
          </Link>
          <Link
            href="/dashboard/packages"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/15"
          >
            <Package size={16} /> Packages
          </Link>
          <Link
            href="/dashboard/visas"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/15"
          >
            <Plane size={16} /> Visas
          </Link>
        </div>
      </div>
    </div>
  );
}

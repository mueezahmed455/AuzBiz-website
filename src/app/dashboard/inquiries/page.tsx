"use client";

import { useMemo, useState } from "react";
import { Search, Filter, MessageCircle, Mail, Globe } from "lucide-react";

type Inquiry = {
  id: string;
  name: string;
  contact: string;
  service: string;
  channel: "WhatsApp" | "Website" | "Email";
  status: "New" | "In progress" | "Quoted" | "Closed";
  created: string;
  note: string;
};

const seed: Inquiry[] = [
  {
    id: "INQ-1042",
    name: "Ahmed Raza",
    contact: "+92 300 1112233",
    service: "Umrah · Family of 4",
    channel: "WhatsApp",
    status: "New",
    created: "Today, 11:42",
    note: "Prefers Ramadan dates",
  },
  {
    id: "INQ-1041",
    name: "Sara Khan",
    contact: "sara.k@email.com",
    service: "Schengen visa · Couple",
    channel: "Website",
    status: "In progress",
    created: "Today, 10:15",
    note: "Spain + France itinerary",
  },
  {
    id: "INQ-1040",
    name: "Fast Agro HR",
    contact: "hr@fastagro.pk",
    service: "Corporate MICE · Thailand",
    channel: "Email",
    status: "Quoted",
    created: "Yesterday",
    note: "80 pax incentive tour",
  },
  {
    id: "INQ-1039",
    name: "Bilal Hussain",
    contact: "+92 321 9988776",
    service: "Uzbekistan tour · 8 pax",
    channel: "WhatsApp",
    status: "New",
    created: "Yesterday",
    note: "Halal meals required",
  },
  {
    id: "INQ-1038",
    name: "Nadia Iqbal",
    contact: "nadia@email.com",
    service: "UAE visit visa",
    channel: "Website",
    status: "Closed",
    created: "2 days ago",
    note: "Approved",
  },
];

const channelIcon = {
  WhatsApp: MessageCircle,
  Website: Globe,
  Email: Mail,
};

export default function InquiriesPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");

  const rows = useMemo(() => {
    return seed.filter((r) => {
      const matchQ =
        !q ||
        r.name.toLowerCase().includes(q.toLowerCase()) ||
        r.service.toLowerCase().includes(q.toLowerCase()) ||
        r.id.toLowerCase().includes(q.toLowerCase());
      const matchS = status === "all" || r.status === status;
      return matchQ && matchS;
    });
  }, [q, status]);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Inquiries
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Leads from WhatsApp, website form and email.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, service, ID…"
              className="pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#12122a] w-56 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#12122a] focus:outline-none focus:ring-2 focus:ring-gold-500/40"
          >
            <option value="all">All statuses</option>
            <option value="New">New</option>
            <option value="In progress">In progress</option>
            <option value="Quoted">Quoted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#12122a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-white/10 text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Channel</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {rows.map((r) => {
                const Icon = channelIcon[r.channel];
                return (
                  <tr
                    key={r.id}
                    className="hover:bg-gray-50/80 dark:hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{r.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 dark:text-white">{r.name}</p>
                      <p className="text-xs text-gray-400">{r.contact}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{r.service}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                        <Icon size={14} /> {r.channel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                          r.status === "New"
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
                            : r.status === "In progress"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                              : r.status === "Quoted"
                                ? "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                                : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{r.created}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <div className="px-4 py-12 text-center text-sm text-gray-400">
            No inquiries match your filters.
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400">
        Demo data — connect your CRM or form webhooks to make this live.
      </p>
    </div>
  );
}

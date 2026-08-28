"use client";

import { Building2, User } from "lucide-react";

const clients = [
  { name: "Fast Agro", type: "Corporate", files: 3, last: "2 days ago" },
  { name: "Ahmed Raza", type: "Individual", files: 1, last: "Today" },
  { name: "Sara Khan", type: "Individual", files: 2, last: "Yesterday" },
  { name: "Horizon Textiles", type: "Corporate", files: 5, last: "1 week ago" },
];

export default function DashboardClientsPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Clients</h1>
        <p className="text-sm text-gray-500 mt-1">Recent and active client records.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((c) => (
          <div
            key={c.name}
            className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#12122a] p-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy-800 text-gold-500 flex items-center justify-center">
                {c.type === "Corporate" ? <Building2 size={18} /> : <User size={18} />}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{c.name}</p>
                <p className="text-xs text-gray-500">{c.type}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-xs text-gray-500">
              <span>{c.files} open file{c.files > 1 ? "s" : ""}</span>
              <span>Last activity {c.last}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

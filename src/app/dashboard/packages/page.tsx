"use client";

import { useState } from "react";
import { Plus, Pencil, Eye, Search } from "lucide-react";
import Link from "next/link";

const packages = [
  { id: "PKG-01", title: "Umrah Economy", price: "PKR 185,000", nights: 14, status: "Published", featured: true },
  { id: "PKG-02", title: "Umrah Premium", price: "PKR 295,000", nights: 14, status: "Published", featured: true },
  { id: "PKG-03", title: "Uzbekistan 8 Days", price: "PKR 210,000", nights: 7, status: "Published", featured: false },
  { id: "PKG-04", title: "Turkey + Georgia", price: "PKR 320,000", nights: 10, status: "Draft", featured: false },
  { id: "PKG-05", title: "Dubai Family", price: "PKR 165,000", nights: 5, status: "Published", featured: true },
];

export default function DashboardPackagesPage() {
  const [q, setQ] = useState("");
  const rows = packages.filter(
    (p) => !q || p.title.toLowerCase().includes(q.toLowerCase()) || p.id.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Packages</h1>
          <p className="text-sm text-gray-500 mt-1">Manage tour and Umrah packages shown on the website.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-800 text-gold-500 text-sm font-semibold hover:bg-navy-700"
        >
          <Plus size={16} /> New package
        </button>
      </div>

      <div className="relative max-w-xs">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search packages…"
          className="pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#12122a] w-full focus:outline-none focus:ring-2 focus:ring-gold-500/40"
        />
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#12122a] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-white/10 text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Nights</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-white/5">
            {rows.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/80 dark:hover:bg-white/[0.03]">
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.id}</td>
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-900 dark:text-white">{p.title}</span>
                  {p.featured && (
                    <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-gold-500/15 text-amber-700 dark:text-gold-500">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{p.price}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{p.nights}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                      p.status === "Published"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                        : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button type="button" className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500" aria-label="Edit">
                      <Pencil size={14} />
                    </button>
                    <Link href="/packages" className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500" aria-label="View">
                      <Eye size={14} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import { visas } from "@/data/visas";
import Link from "next/link";
import { ExternalLink, Pencil } from "lucide-react";

export default function DashboardVisasPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Visas</h1>
          <p className="text-sm text-gray-500 mt-1">
            Visa services listed on the public Visas hub.
          </p>
        </div>
        <Link
          href="/visas"
          className="inline-flex items-center gap-2 text-sm font-medium text-navy-700 dark:text-gold-500 hover:underline"
        >
          View public page <ExternalLink size={14} />
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#12122a] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-white/10 text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="px-4 py-3 font-medium">Country</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Processing</th>
              <th className="px-4 py-3 font-medium">From</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-white/5">
            {visas.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50/80 dark:hover:bg-white/[0.03]">
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{v.country}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{v.type}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{v.processing}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{v.priceFrom}</td>
                <td className="px-4 py-3">
                  <button type="button" className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500" aria-label="Edit">
                    <Pencil size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

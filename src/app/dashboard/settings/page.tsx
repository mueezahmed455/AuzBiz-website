"use client";

import { Save } from "lucide-react";

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Site contact and operational defaults.</p>
      </div>

      <form
        className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#12122a] p-6 space-y-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
            Primary WhatsApp
          </label>
          <input
            defaultValue="+92 346 499 3122"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-gold-500/40"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
            Public email
          </label>
          <input
            defaultValue="info@auzbizgroup.com"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-gold-500/40"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
            Office address
          </label>
          <textarea
            defaultValue="Lahore, Pakistan"
            rows={2}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-gold-500/40"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-800 text-gold-500 text-sm font-semibold hover:bg-navy-700"
        >
          <Save size={16} /> Save changes
        </button>
      </form>

      <p className="text-xs text-gray-400">
        Demo form — wire to your CMS or env config for production.
      </p>
    </div>
  );
}

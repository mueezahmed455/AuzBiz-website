"use client";

import Link from "next/link";
import { Plane, Moon, IdCard, Globe, Hotel, GraduationCap } from "lucide-react";

const actions = [
  { label: "Visas", href: "/visas", icon: IdCard, hint: "UAE · Schengen · UK" },
  { label: "Umrah", href: "/packages#umrah", icon: Moon, hint: "Packages & ziyarat" },
  { label: "Group tours", href: "/packages", icon: Globe, hint: "Asia · Europe · PK" },
  { label: "Flights", href: "/services", icon: Plane, hint: "Domestic & intl" },
  { label: "Hotels", href: "/services", icon: Hotel, hint: "Verified stays" },
  { label: "Study abroad", href: "/services", icon: GraduationCap, hint: "Admissions & visas" },
];

/** Practical service shortcuts — travel-agency UX, not decorative */
export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
      {actions.map((a) => (
        <Link
          key={a.label}
          href={a.href}
          className="group flex flex-col items-start gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-3.5 hover:bg-white/[0.1] hover:border-gold-500/35 transition-colors"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500/15 text-gold-500 group-hover:bg-gold-500/25 transition-colors">
            <a.icon size={18} strokeWidth={1.75} />
          </span>
          <span className="text-sm font-semibold text-white leading-none">{a.label}</span>
          <span className="text-[11px] text-white/45 leading-tight">{a.hint}</span>
        </Link>
      ))}
    </div>
  );
}

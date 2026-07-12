"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Fast Agro Chemicals", abbr: "FAST AGRO" },
  { name: "Four Brothers Group", abbr: "FBG" },
  { name: "Global Crop Sciences", abbr: "GCS" },
  { name: "Leading FMCG Corporates", abbr: "FMCG" },
  { name: "Top Rack Seeds", abbr: "TRS" },
  { name: "Pharmaceutical Companies", abbr: "PHARMA" },
  { name: "Ali Akbar Group", abbr: "AAG" },
  { name: "Financial Sector Firms", abbr: "FINANCE" },
];

export default function Partners() {
  const doubled = [...partners, ...partners];

  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-white dark:from-[var(--surface)] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-white dark:from-[var(--surface)] to-transparent pointer-events-none" />
      <div className="flex animate-marquee">
        {doubled.map((partner, i) => (
          <motion.div
            key={`${partner.name}-${i}`}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex-shrink-0 mx-3 border rounded-xl px-6 py-4 flex items-center justify-center min-w-[140px] hover:border-gold-500/30 hover:shadow-md transition-colors duration-300 cursor-default"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}
          >
            <span className="text-xs font-bold tracking-wider text-navy-800/40 dark:text-white/30">
              {partner.abbr}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

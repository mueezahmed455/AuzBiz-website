"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

interface Deal {
  emoji: string;
  text: string;
  link: string;
  linkText: string;
  bg: string;
}

const deals: Deal[] = [
  {
    emoji: "🌙",
    text: "🌙 Ramadan Umrah Special — Book before July 2026 and save up to PKR 25,000!",
    link: "/packages#umrah",
    linkText: "View Umrah Packages",
    bg: "bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900",
  },
  {
    emoji: "🌍",
    text: "🌍 Early Bird: Uzbekistan Tour — PKR 165,000 only for groups of 10+!",
    link: "/packages#uzbekistan",
    linkText: "Book Now",
    bg: "bg-gradient-to-r from-gold-500/90 to-gold-500/80",
  },
  {
    emoji: "🇹🇭",
    text: "🇹🇭 Thailand Dual City — PKR 190,000 all-inclusive! Limited spots.",
    link: "/packages#thailand",
    linkText: "Grab the Deal",
    bg: "bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900",
  },
];

export default function DealBanner() {
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % deals.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const deal = deals[current];

  return (
    <AnimatePresence>
      {!dismissed && deal && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={deal.bg}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
            <Link
              href={deal.link}
              className="flex items-center gap-2 text-white text-[11px] sm:text-xs hover:opacity-90 transition-opacity flex-1 min-w-0"
            >
              <motion.span
                key={current}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="truncate"
              >
                {deal.text}
              </motion.span>
              <span className="text-gold-500 dark:text-navy-800 font-semibold whitespace-nowrap underline underline-offset-2">
                {deal.linkText}
              </span>
            </Link>

            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="hidden sm:flex gap-1">
                {deals.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "bg-white w-3" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setDismissed(true)}
                className="text-white/50 hover:text-white transition-colors p-1"
                aria-label="Dismiss"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

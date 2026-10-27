"use client";

import { motion } from "framer-motion";
import { Compass, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function MobileCTA() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-border dark:border-white/5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <Link
          href="/group-tours"
          className="flex-1 flex items-center justify-center gap-1.5 min-h-[44px] rounded-xl bg-slate-950 dark:bg-amber-500 dark:text-slate-950 text-white text-sm font-semibold touch-manipulation"
        >
          <Compass size={16} strokeWidth={2} />
          Tours
        </Link>
        <a
          href="https://wa.me/923464993122?text=Hi%20AUZBIZ!%20I%20need%20help%20with%20travel%20planning."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 min-h-[44px] rounded-xl bg-[#25D366] text-white text-sm font-semibold touch-manipulation"
        >
          <MessageCircle size={16} strokeWidth={2} />
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

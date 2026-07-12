"use client";

import { motion } from "framer-motion";
import { Package, MessageCircle } from "lucide-react";
import Button from "@/components/Button";

export default function MobileCTA() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#0a0a1a] border-t border-gray-100 dark:border-[#2a2a5e] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden"
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <Button href="/packages" size="sm" className="flex-1 justify-center">
          <Package size={14} strokeWidth={2} />
          View Packages
        </Button>
        <Button
          href="https://wa.me/923464993122?text=Hi%20AUZBIZ!%20I%20need%20help%20with%20travel%20planning."
          variant="whatsapp"
          size="sm"
          className="flex-1 justify-center"
        >
          <MessageCircle size={14} strokeWidth={2} />
          Chat Now
        </Button>
      </div>
    </motion.div>
  );
}

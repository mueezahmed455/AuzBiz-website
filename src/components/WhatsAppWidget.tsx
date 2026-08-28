"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "923464993122";

const presetMessages = [
  {
    label: "Hi AUZBIZ! I'd like to know more about your packages",
    msg: "Hi AUZBIZ! I'd like to know more about your travel packages.",
  },
  {
    label: "I'm interested in Umrah packages",
    msg: "Hi AUZBIZ! I'm interested in your Umrah packages. Can you share the details?",
  },
  {
    label: "I want to book a group tour",
    msg: "Hi AUZBIZ! I want to book a group tour. Please share available destinations.",
  },
  {
    label: "Corporate event inquiry",
    msg: "Hi AUZBIZ! I'd like to inquire about your corporate/MICE event services.",
  },
];

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  const openWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white dark:bg-[#1a1a3e] border border-gray-100 dark:border-[#2a2a5e] rounded-2xl shadow-xl overflow-hidden mb-2 w-[min(18rem,calc(100vw-2rem))] sm:w-80"
          >
            <div className="bg-[#25D366] px-4 py-3.5 flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white">
                <MessageCircle size={20} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm">AUZBIZ Support</p>
                <p className="text-white/70 text-[10px]">Typically replies within 2 hours</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="ml-auto text-white/70 hover:text-white transition-colors p-2 -mr-1"
                aria-label="Close"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <div className="p-3 space-y-1.5">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider px-1 mb-2">
                Quick replies
              </p>
              {presetMessages.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => openWhatsApp(item.msg)}
                  className="w-full text-left text-xs text-gray-600 dark:text-gray-300 px-3 py-3 rounded-xl hover:bg-[#25D366]/5 border border-transparent hover:border-[#25D366]/20 transition-all duration-200 min-h-[44px]"
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-gray-100 dark:border-[#2a2a5e] pt-2 mt-2">
                <button
                  type="button"
                  onClick={() => openWhatsApp("Hi AUZBIZ! I need help with:")}
                  className="w-full text-xs font-semibold text-[#25D366] px-3 py-3 hover:bg-[#25D366]/5 rounded-xl transition-colors text-center min-h-[44px]"
                >
                  Write your own message
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl transition-all duration-200 relative touch-manipulation"
        aria-label="Chat on WhatsApp"
      >
        {open ? (
          <X size={24} strokeWidth={2.5} />
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}

        {!open && (
          <motion.span
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white dark:border-[#0a0a1a]"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
}

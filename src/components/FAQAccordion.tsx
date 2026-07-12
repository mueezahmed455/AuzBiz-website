"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.06 }}
          className="bg-white border border-gray-100 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => toggle(idx)}
            className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-gray-50/50 transition-colors"
          >
            <span className="text-sm font-semibold text-navy-800 pr-2">{item.q}</span>
            <div className="w-6 h-6 rounded-full bg-navy-800/5 flex items-center justify-center flex-shrink-0 transition-all duration-200">
              {openIndex === idx ? (
                <Minus size={12} stroke="#1A2A6C" strokeWidth={2.5} />
              ) : (
                <Plus size={12} stroke="#1A2A6C" strokeWidth={2.5} />
              )}
            </div>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-0">
                  <div className="border-t border-gray-50 pt-4">
                    <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

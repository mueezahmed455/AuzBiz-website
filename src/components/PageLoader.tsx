"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(() => { if (typeof window !== 'undefined') { try { return !sessionStorage.getItem('auzbiz-loaded'); } catch { return true; } } return true; });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + Math.random() * 10 + 3, 100);
      });
    }, 80);

    // Fast loader — long splash felt like a hang on laptops
    const timer = setTimeout(() => {
      try { sessionStorage.setItem('auzbiz-loaded', '1'); } catch {}
      setTimeout(() => setLoading(false), 50);
    }, 600);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-navy-800 flex flex-col items-center justify-center"
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="34" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
              <ellipse cx="40" cy="40" rx="34" ry="11" stroke="rgba(212,175,55,0.15)" strokeWidth="0.8" />
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "40px 40px" }}
              >
                <ellipse cx="40" cy="40" rx="14" ry="34" stroke="rgba(212,175,55,0.18)" strokeWidth="0.8" />
              </motion.g>
              <motion.circle
                cx="54" cy="34" r="2" fill="#D4AF37"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </motion.div>
          <p className="text-gold-500 font-bold text-lg tracking-wide mb-2">AUZBIZ</p>
          <p className="text-white/40 text-xs mb-6">Dream Beyond Borders™</p>
          <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gold-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

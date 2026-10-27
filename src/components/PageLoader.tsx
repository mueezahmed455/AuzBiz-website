"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  // Always start visible so the server and client markup match. Repeat visits
  // are hidden before paint by the inline script in layout.tsx plus the
  // [data-page-loader] rule in globals.css; this effect then unmounts it.
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let alreadyLoaded = false;
    try {
      alreadyLoaded = sessionStorage.getItem("auzbiz-loaded") === "1";
    } catch {}

    if (alreadyLoaded) {
      window.setTimeout(() => setLoading(false), 0);
      return;
    }

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
      setLoading(false);
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
          data-page-loader
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center"
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="34" stroke="rgba(245,158,11,0.25)" strokeWidth="1" />
              <ellipse cx="40" cy="40" rx="34" ry="11" stroke="rgba(245,158,11,0.15)" strokeWidth="0.8" />
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "40px 40px" }}
              >
                <ellipse cx="40" cy="40" rx="14" ry="34" stroke="rgba(245,158,11,0.18)" strokeWidth="0.8" />
              </motion.g>
              <motion.circle
                cx="54" cy="34" r="2" fill="#f59e0b"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </motion.div>
          <p className="text-amber-400 font-bold text-lg tracking-wide mb-2">AUZBIZ</p>
          <p className="text-white/60 text-xs mb-6">Dream Beyond Borders</p>
          <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

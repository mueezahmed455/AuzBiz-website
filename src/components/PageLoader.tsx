"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
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

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

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
          {/* Wireframe globe */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              {/* Globe outline */}
              <circle cx="40" cy="40" r="34" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
              {/* Equator */}
              <ellipse cx="40" cy="40" rx="34" ry="11" stroke="rgba(212,175,55,0.15)" strokeWidth="0.8" />
              {/* Latitude lines */}
              <ellipse cx="40" cy="28" rx="28" ry="7" stroke="rgba(212,175,55,0.08)" strokeWidth="0.6" />
              <ellipse cx="40" cy="52" rx="28" ry="7" stroke="rgba(212,175,55,0.08)" strokeWidth="0.6" />
              {/* Rotating meridian 1 */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "40px 40px" }}
              >
                <ellipse cx="40" cy="40" rx="14" ry="34" stroke="rgba(212,175,55,0.18)" strokeWidth="0.8" />
              </motion.g>
              {/* Rotating meridian 2 */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "40px 40px" }}
              >
                <ellipse cx="40" cy="40" rx="24" ry="34" stroke="rgba(212,175,55,0.12)" strokeWidth="0.7" />
              </motion.g>
              {/* City pulse — Lahore */}
              <motion.circle
                cx="54" cy="34" r="2" fill="#D4AF37"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* City pulse — Dubai */}
              <motion.circle
                cx="52" cy="42" r="1.5" fill="#D4AF37"
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              />
            </svg>
          </motion.div>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-center"
          >
            <span className="text-gold-500 font-bold text-xl tracking-[0.2em] block">
              AUZBIZ
            </span>
            <span className="block text-white/30 text-[10px] tracking-[0.2em] uppercase mt-1.5">
              Dream Beyond Borders
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-40 h-px bg-white/10 mt-8 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-gold-500/50 rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.15 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

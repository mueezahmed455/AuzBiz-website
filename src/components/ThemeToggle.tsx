"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
          : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
        boxShadow: isDark
          ? "0 0 20px rgba(99, 102, 241, 0.3), inset 0 0 10px rgba(99, 102, 241, 0.1)"
          : "0 0 20px rgba(251, 191, 36, 0.4), inset 0 0 10px rgba(251, 191, 36, 0.2)",
      }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Stars background for dark mode */}
      <motion.div
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0"
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${15 + ((i * 15) % 70)}%`,
              top: `${10 + ((i * 20) % 80)}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Sun icon */}
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute"
        animate={{
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <circle cx="12" cy="12" r="5" fill="#1a2a6c" stroke="#1a2a6c" />
        <line x1="12" y1="1" x2="12" y2="3" stroke="#1a2a6c" />
        <line x1="12" y1="21" x2="12" y2="23" stroke="#1a2a6c" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#1a2a6c" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#1a2a6c" />
        <line x1="1" y1="12" x2="3" y2="12" stroke="#1a2a6c" />
        <line x1="21" y1="12" x2="23" y2="12" stroke="#1a2a6c" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#1a2a6c" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#1a2a6c" />
      </motion.svg>

      {/* Moon icon */}
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute"
        animate={{
          rotate: isDark ? 0 : -180,
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <path
          d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          fill="#e8d07d"
          stroke="#e8d07d"
        />
      </motion.svg>
    </motion.button>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isDark
              ? "bg-[#0a0a1a]/95 backdrop-blur-2xl shadow-2xl shadow-black/30 py-3 border-b border-white/[0.06]"
              : "bg-navy-800/95 backdrop-blur-2xl shadow-2xl shadow-navy-900/20 py-3"
            : isDark
            ? "bg-[#0a0a1a]/80 backdrop-blur-xl py-4"
            : "bg-navy-800 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col group">
            <motion.span
              className="text-gold-500 font-bold text-lg sm:text-xl tracking-wide leading-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              AUZBIZ
            </motion.span>
            <span className="text-gold-500/50 text-[9px] tracking-[0.15em] uppercase group-hover:text-gold-500/70 transition-colors">
              Dream Beyond Borders™
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm transition-colors duration-200 font-medium group ${
                    isActive
                      ? "text-gold-500"
                      : isDark
                      ? "text-white/70 hover:text-gold-500"
                      : "text-white/70 hover:text-gold-500"
                  }`}
                >
                  {link.label}
                  <motion.span
                    layout
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gold-500 rounded-full transition-all duration-500 ${
                      isActive ? "w-8" : "w-0 group-hover:w-4"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side: theme toggle + mobile hamburger */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 bg-white rounded-full"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-[72px] left-0 right-0 z-40 backdrop-blur-2xl border-t md:hidden overflow-hidden ${
              isDark
                ? "bg-[#0a0a1a]/98 border-white/[0.06]"
                : "bg-navy-800/98 border-white/[0.06]"
            }`}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3.5 px-4 rounded-xl text-white/75 hover:text-gold-500 hover:bg-white/5 rounded-lg transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed nav */}
      <div className="h-[64px] sm:h-[72px]" />
    </>
  );
}

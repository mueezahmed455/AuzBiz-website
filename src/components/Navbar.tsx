"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Visas", href: "/visas" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Hide public nav on dashboard routes
  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDark
              ? "bg-[#0a0a1a]/95 backdrop-blur-xl shadow-lg shadow-black/20 py-2.5 border-b border-white/[0.06]"
              : "bg-navy-800/95 backdrop-blur-xl shadow-lg shadow-navy-900/15 py-2.5"
            : isDark
              ? "bg-[#0a0a1a]/90 backdrop-blur-md py-3.5"
              : "bg-navy-800 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <Logo size="md" variant="light" />

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-gold-500"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-gold-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href="tel:+923464993122"
              className="hidden xl:inline-flex items-center gap-1.5 text-white/70 hover:text-gold-500 text-xs font-medium transition-colors"
              aria-label="Call AUZBIZ"
            >
              <Phone size={14} strokeWidth={2} />
              +92 346 4993122
            </a>
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-3.5 py-2 rounded-lg border border-gold-500/40 text-gold-500 text-xs font-semibold hover:bg-gold-500 hover:text-navy-800 transition-colors"
            >
              Get quote
            </Link>
            <a
              href="https://wa.me/923464993122"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1ebe57] transition-colors shadow-sm"
            >
              <MessageCircle size={14} strokeWidth={2.2} />
              WhatsApp
            </a>
            <ThemeToggle />
            <button
              type="button"
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="absolute top-0 right-0 bottom-0 w-[min(100%,320px)] bg-navy-800 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                <Logo size="sm" variant="light" />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-white/80 hover:text-white"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-gold-500/15 text-gold-500"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-white/10 space-y-2">
                <a
                  href="https://wa.me/923464993122"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white text-sm font-semibold"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
                <a
                  href="tel:+923464993122"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/20 text-white text-sm font-medium"
                >
                  <Phone size={16} /> Call us
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-[64px] sm:h-[68px]" />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
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
  const isDashboard = pathname?.startsWith("/dashboard");

  useEffect(() => {
    if (isDashboard) return;
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDashboard]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isDashboard) return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, isDashboard]);

  if (isDashboard) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDark
              ? "bg-[#0a0a1a]/95 backdrop-blur-xl shadow-lg shadow-black/20 py-2 border-b border-white/[0.06]"
              : "bg-navy-800/95 backdrop-blur-xl shadow-lg shadow-navy-900/15 py-2"
            : isDark
              ? "bg-[#0a0a1a]/90 backdrop-blur-md py-3"
              : "bg-navy-800 py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="sm:hidden">
              <Logo size="sm" variant="light" />
            </span>
            <span className="hidden sm:inline-flex">
              <Logo size="md" variant="light" />
            </span>
          </div>

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
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <ThemeToggle />
            <Link
              href="https://wa.me/923464993122"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20bd5a] transition-colors min-h-[40px]"
            >
              <MessageCircle size={14} /> WhatsApp
            </Link>
            <button
              type="button"
              className="lg:hidden text-white p-3 rounded-lg hover:bg-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
              onClick={() => setMobileOpen(!mobileOpen)}
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
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="absolute right-0 top-0 bottom-0 w-[min(20rem,88vw)] bg-navy-800 shadow-2xl flex flex-col pt-16"
            >
              <div className="flex-1 overflow-y-auto px-3 py-2">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname?.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center min-h-[48px] px-4 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? "bg-white/10 text-gold-500"
                          : "text-white/85 hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              <div className="p-4 border-t border-white/10 space-y-2 safe-area-pb">
                <a
                  href="https://wa.me/923464993122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 min-h-[48px] rounded-xl bg-[#25D366] text-white font-semibold text-sm"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center min-h-[48px] rounded-xl border border-white/20 text-white/90 text-sm font-medium"
                >
                  Contact us
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-14 sm:h-16" />
    </>
  );
}

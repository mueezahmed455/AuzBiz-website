"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  Menu,
  MessageCircle,
  Phone,
  Plane,
  Radar,
  X,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Tours", href: "/group-tours" },
  { label: "Visas", href: "/visas" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const flightLinks = [
  {
    label: "Ticket price analysis",
    href: "/ticket-analysis",
    description: "Compare sample fares by route, date, and cabin.",
    icon: BarChart3,
  },
  {
    label: "Trip status",
    href: "/live-tracking",
    description: "Request a private status check on an existing booking.",
    icon: Plane,
  },
  {
    label: "Plane radar",
    href: "/plane-tracking",
    description: "Live aircraft positions from OpenSky Network.",
    icon: Radar,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [flightsOpen, setFlightsOpen] = useState(false);
  const flightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    window.setTimeout(() => {
      setMobileOpen(false);
      setFlightsOpen(false);
    }, 0);
  }, [pathname]);

  useEffect(() => {
    if (!flightsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!flightsRef.current?.contains(event.target as Node)) {
        setFlightsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFlightsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [flightsOpen]);

  if (pathname?.startsWith("/dashboard")) return null;

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));
  const flightsActive = flightLinks.some((link) => isActive(link.href));

  return (
    <>
      <motion.nav
        initial={false}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-background/90 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-white/[0.06] dark:bg-slate-950/90 dark:shadow-black/20"
            : "border-b border-transparent bg-background dark:bg-slate-950"
        }`}
      >
        <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between gap-3 px-4 sm:h-[68px] sm:px-6 lg:px-8">
          <div className="shrink-0">
            <Logo size="md" variant="auto" />
          </div>

          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative inline-flex items-center px-2.5 py-2.5 text-[13px] font-medium tracking-wide transition-colors ${
                  isActive(link.href)
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div
              ref={flightsRef}
              className="relative"
              onMouseEnter={() => setFlightsOpen(true)}
              onMouseLeave={() => setFlightsOpen(false)}
            >
              <button
                type="button"
                aria-expanded={flightsOpen}
                aria-haspopup="true"
                onClick={() => setFlightsOpen((open) => !open)}
                className={`inline-flex items-center gap-1 px-2.5 py-2.5 text-[13px] font-medium tracking-wide transition-colors ${
                  flightsActive
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Flights
                <ChevronDown
                  size={13}
                  className={`transition-transform ${flightsOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {flightsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-2"
                  >
                    <div
                      role="menu"
                      aria-label="Flight tools"
                      className="overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-slate-900/10 dark:border-white/10"
                    >
                      {flightLinks.map((link) => (
                        <Link
                          key={link.href}
                          role="menuitem"
                          href={link.href}
                          onClick={() => setFlightsOpen(false)}
                          className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                            <link.icon size={15} strokeWidth={2} />
                          </span>
                          <span>
                            <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                              {link.label}
                              <ArrowUpRight size={12} className="text-muted-foreground" />
                            </span>
                            <span className="mt-0.5 block text-[11px] leading-relaxed text-muted-foreground">
                              {link.description}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative inline-flex items-center px-2.5 py-2.5 text-[13px] font-medium tracking-wide transition-colors ${
                  isActive(link.href)
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:+923464993122"
              className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground xl:inline-flex"
              aria-label="Call AUZBIZ"
            >
              <Phone size={13} strokeWidth={2} />
              +92 346 4993122
            </a>
            <Link
              href="/contact"
              className="hidden items-center rounded-lg border border-slate-950 bg-slate-950 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 sm:inline-flex"
            >
              Get a quote
            </Link>
            <ThemeToggle />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-surface lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
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
              className="absolute inset-y-0 right-0 flex w-[min(100%,340px)] flex-col border-l border-border bg-card shadow-2xl dark:border-white/5"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-4 dark:border-white/5">
                <Logo size="sm" variant="auto" />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <div className="space-y-0.5">
                  {navLinks.slice(0, 4).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        pathname === link.href
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                          : "text-muted-foreground hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <p className="px-4 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Flight tools
                </p>
                <div className="space-y-0.5">
                  {flightLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                          : "text-muted-foreground hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      <link.icon size={16} strokeWidth={2} />
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-4 space-y-0.5 border-t border-border pt-4 dark:border-white/5">
                  {navLinks.slice(4).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        pathname === link.href
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                          : "text-muted-foreground hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="space-y-2 border-t border-border p-4 dark:border-white/5">
                <a
                  href="https://wa.me/923464993122"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-700"
                >
                  <MessageCircle size={16} strokeWidth={2} />
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+923464993122"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
                >
                  <Phone size={16} strokeWidth={2} />
                  Call us
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

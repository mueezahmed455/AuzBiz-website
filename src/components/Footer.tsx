"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const services = [
  "Corporate Events & MICE",
  "Air Ticketing",
  "Group Tours",
  "Umrah Packages",
  "Hotel Bookings",
  "Visa Services",
  "Study Abroad",
  "End-to-End Management",
];

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`transition-colors duration-400 ${
        isDark ? "bg-[#0a0a1a] text-white border-t border-white/[0.06]" : "bg-navy-800 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-14">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-3">
              <span className="text-gold-500 font-bold text-xl tracking-wide">
                AUZBIZ
              </span>
              <span className="block text-gold-500/50 text-[9px] tracking-[0.15em] uppercase mt-0.5">
                Dream Beyond Borders™
              </span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              Pakistan&apos;s premium travel, events, and business facilitation agency.
              Serving individuals, families, and leading organisations with end-to-end
              excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-500/80 text-xs font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-gold-500 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold-500/80 text-xs font-semibold uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-white/50 hover:text-gold-500 text-sm transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} AUZBIZ — Dream Beyond Borders. All rights
            reserved. | DHA II (Rehbar) Lahore-Pakistan.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gold-500 text-xs">www.auzbizgroup.com</span>
            <span className="text-white/30 text-xs">
              auzbizpak@gmail.com | +92 346 4993122
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Facebook,
  Linkedin,
} from "lucide-react";
import Logo from "./Logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Visas", href: "/visas" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Umrah Packages", href: "/packages" },
  { label: "Group Tours", href: "/packages" },
  { label: "Visa Services", href: "/visas" },
  { label: "Corporate MICE", href: "/services" },
  { label: "Air Ticketing", href: "/services" },
  { label: "Study Abroad", href: "/services" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-800 text-white border-t border-white/[0.06] dark:bg-[#0a0a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo size="md" variant="light" href="/" className="mb-4" />
            <p className="text-white/55 text-sm leading-relaxed max-w-xs mt-3">
              Pakistan's premium travel, events and business facilitation
              agency. End-to-end excellence for individuals, families and
              organisations.
            </p>
          </div>

          <div>
            <h4 className="text-gold-500/90 text-xs font-semibold uppercase tracking-wider mb-4">
              Quick links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-gold-500 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold-500/90 text-xs font-semibold uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-white/50 hover:text-gold-500 text-sm transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold-500/90 text-xs font-semibold uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="shrink-0 mt-0.5 text-gold-500/80" />
                <span>DHA II (Rehbar), Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-gold-500/80" />
                <a href="tel:+923464993122" className="hover:text-gold-500">
                  +92 346 499 3122
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-gold-500/80" />
                <a
                  href="mailto:info@auzbizgroup.com"
                  className="hover:text-gold-500"
                >
                  info@auzbizgroup.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle size={16} className="shrink-0 text-gold-500/80" />
                <a
                  href="https://wa.me/923464993122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-500"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-gold-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-gold-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs text-center sm:text-left">
            © {year} AUZBIZ Group — Dream Beyond Borders. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">www.auzbizgroup.com</p>
        </div>
      </div>
    </footer>
  );
}

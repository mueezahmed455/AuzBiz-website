"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Logo from "./Logo";

const footerCols = [
  {
    heading: "Company",
    items: [
      { label: "About us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Group tours", href: "/group-tours" },
      { label: "Visa catalogue", href: "/visas" },
      { label: "Journal", href: "/blog" },
    ],
  },
  {
    heading: "Flight tools",
    items: [
      { label: "Ticket price analysis", href: "/ticket-analysis" },
      { label: "Trip status check", href: "/live-tracking" },
      { label: "Plane radar", href: "/plane-tracking" },
    ],
  },
  {
    heading: "Plan",
    items: [
      { label: "Start an enquiry", href: "/contact" },
      { label: "Build a custom quote", href: "/contact" },
      { label: "Talk on WhatsApp", href: "https://wa.me/923464993122" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-border bg-surface dark:border-white/5 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo size="md" variant="auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              End-to-end travel from Lahore — Umrah, group tours, visas, corporate
              MICE, and practical flight tools. Clear inclusions, honest
              timelines, one accountable desk.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                <span className="text-muted-foreground">DHA II (Rehbar), Lahore, Pakistan</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                <a href="tel:+923464993122" className="text-muted-foreground transition-colors hover:text-foreground">
                  +92 346 4993122
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                <a href="mailto:auzbizpak@gmail.com" className="text-muted-foreground transition-colors hover:text-foreground">
                  auzbizpak@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={16} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                <a
                  href="https://wa.me/923464993122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  WhatsApp the travel desk
                </a>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.facebook.com/auzbizpak"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/company/auzbiz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerCols.map((col) => (
              <div key={col.heading}>
                <h3 className="text-sm font-semibold tracking-tight text-foreground">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item) => {
                    const active = item.href === pathname;
                    const external = item.href.startsWith("http");
                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className={`text-sm transition-colors ${
                            active
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground dark:border-white/5 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AUZBIZ Group. All rights reserved.</p>
          <p className="max-w-md sm:text-right">
            Prices and availability are confirmed at the time of booking. Visa
            outcomes are decided by the relevant authority.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-semibold text-foreground transition-colors hover:text-amber-600 dark:hover:text-amber-400"
          >
            Start an enquiry <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

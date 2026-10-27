"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

interface CTAProps {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  showWhatsApp?: boolean;
}

export default function CTABar({
  title,
  subtitle,
  primaryLabel = "Plan your trip",
  primaryHref = "/contact",
  secondaryLabel = "Chat on WhatsApp",
  secondaryHref = "https://wa.me/923464993122",
  showWhatsApp = true,
}: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center lg:px-8 lg:py-16">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-sm leading-relaxed text-white/60">{subtitle}</p>
          )}
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {primaryLabel}
            <ArrowRight size={16} />
          </Link>
          {showWhatsApp && (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <MessageCircle size={16} />
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

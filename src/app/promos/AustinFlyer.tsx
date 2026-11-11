"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AUZPromoBanner from "@/components/promo/AUZPromoBanner";

export default function AustinFlyer() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-600 dark:text-amber-400">
        Homepage hero variant
      </p>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
        Try the AUZBIZ promo grid as a homepage hero
      </h2>
      <p className="mb-8 max-w-2xl text-base leading-7 text-muted-foreground">
        One controlled experiment: lead the homepage with the four-service promo grid,
        then measure whether it improves WhatsApp + enquiry starts versus the current
        editorial hero.
      </p>

      <AUZPromoBanner
        variant="umrah"
        href="/visas"
        key="umrah-flyer"
        className="max-w-2xl mx-auto w-full"
      />

      <div className="mt-8 flex flex-wrap items-center gap-3 justify-center">
        <Link
          href="/promos"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-amber-400"
        >
          See all promos <ArrowRight size={16} />
        </Link>
        <a
          href="https://wa.me/923464993122"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
        >
          WhatsApp the desk
        </a>
      </div>
    </section>
  );
}

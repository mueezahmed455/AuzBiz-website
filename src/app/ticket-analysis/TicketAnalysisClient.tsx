"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Info,
  MapPin,
  MessageCircle,
  Plane,
  Ticket,
  Users,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui";
import FlightSearchForm, {
  type FlightSearchParams,
} from "@/components/FlightSearchForm";
import FareResults from "@/components/FareResults";

const CABIN_LABELS: Record<string, string> = {
  economy: "Economy",
  premium: "Premium economy",
  business: "Business",
  first: "First",
};

export default function TicketAnalysisClient() {
  const [params, setParams] = useState<FlightSearchParams | null>(null);
  const [lastParams, setLastParams] = useState<FlightSearchParams | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = (next: FlightSearchParams) => {
    setLastParams(next);
    setParams(next);
  };

  useEffect(() => {
    if (!params) return;
    const frame = requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resultsRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [params]);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-amber-500/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[11px] text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70">Fare comparison</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300">
            <Info size={12} /> Sample data · not a booking engine
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Understand the fare
            <span className="block text-amber-400">before you commit.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            Compare indicative fare bands for your route, cabin and dates, see
            what moves the price, then ask the ticketing desk for the real
            quote. No fake live inventory, no pretend checkout.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 dark:bg-slate-950 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!params ? (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <FlightSearchForm onSearch={handleSearch} initial={lastParams} />

                <div className="mx-auto mt-8 grid max-w-5xl gap-3 sm:grid-cols-3">
                  {[
                    {
                      icon: Ticket,
                      title: "What you get",
                      body: "Three indicative fare bands — non-stop, Gulf hub and alternative hub — with the checks that change the real price.",
                    },
                    {
                      icon: Info,
                      title: "What this is not",
                      body: "Not live airline inventory and not a booking. Sample bands are calculated from route tier and cabin, not availability.",
                    },
                    {
                      icon: MessageCircle,
                      title: "What happens next",
                      body: "Send the route to the desk on WhatsApp. We confirm the live fare, baggage and change rules during office hours.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border bg-card p-5"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                        <item.icon size={16} strokeWidth={2} />
                      </span>
                      <h2 className="mt-3 text-sm font-semibold text-foreground">
                        {item.title}
                      </h2>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                ref={resultsRef}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid gap-8 lg:grid-cols-12">
                  <aside className="space-y-4 lg:col-span-4">
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-sm font-semibold text-foreground">
                          Your search
                        </h2>
                        <Badge variant="outline">Sample</Badge>
                      </div>

                      <p className="mt-4 text-lg font-bold tracking-tight text-foreground">
                        {params.originCode}
                        <span className="mx-2 text-amber-500">→</span>
                        {params.destinationCode}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {params.origin.split(" — ")[0]} to{" "}
                        {params.destination.split(" — ")[0]}
                      </p>

                      <dl className="mt-4 space-y-3 border-t border-border pt-4">
                        <div className="flex items-start gap-2.5">
                          <Calendar
                            size={14}
                            className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                          />
                          <div>
                            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                              Departure
                            </dt>
                            <dd className="text-xs font-medium text-foreground">
                              {params.departDate}
                            </dd>
                          </div>
                        </div>
                        {params.returnDate && (
                          <div className="flex items-start gap-2.5">
                            <Clock
                              size={14}
                              className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                            />
                            <div>
                              <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                Return
                              </dt>
                              <dd className="text-xs font-medium text-foreground">
                                {params.returnDate}
                              </dd>
                            </div>
                          </div>
                        )}
                        <div className="flex items-start gap-2.5">
                          <Users
                            size={14}
                            className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                          />
                          <div>
                            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                              Travellers
                            </dt>
                            <dd className="text-xs font-medium text-foreground">
                              {params.adults} adult
                              {params.adults === 1 ? "" : "s"}
                              {params.children > 0
                                ? ` · ${params.children} child${params.children === 1 ? "" : "ren"}`
                                : ""}
                              {params.infants > 0
                                ? ` · ${params.infants} infant${params.infants === 1 ? "" : "s"}`
                                : ""}
                            </dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Plane
                            size={14}
                            className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                          />
                          <div>
                            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                              Cabin
                            </dt>
                            <dd className="text-xs font-medium text-foreground">
                              {CABIN_LABELS[params.cabin] ?? params.cabin}
                            </dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <MapPin
                            size={14}
                            className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                          />
                          <div>
                            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                              Trip type
                            </dt>
                            <dd className="text-xs font-medium text-foreground">
                              {params.tripType === "round"
                                ? "Round trip"
                                : params.tripType === "one-way"
                                  ? "One way"
                                  : "Multi-city"}
                            </dd>
                          </div>
                        </div>
                      </dl>

                      <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setParams(null)}
                          className="w-full"
                        >
                          Change search
                        </Button>
                        <a
                          href="/contact?service=Air%20Ticketing"
                          className="inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Send a detailed enquiry <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>

                    {params.flexDates && (
                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
                        <p className="text-xs font-semibold text-amber-900 dark:text-amber-200">
                          Flexible dates selected
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-amber-800 dark:text-amber-200/80">
                          Shifting a day either side can change the band. Ask the
                          desk to compare ±3 days when you request the real
                          quote.
                        </p>
                      </div>
                    )}
                  </aside>

                  <div className="lg:col-span-8">
                    <FareResults
                      originCode={params.originCode}
                      destinationCode={params.destinationCode}
                      departDate={params.departDate}
                      returnDate={params.returnDate || undefined}
                      cabin={params.cabin}
                      adults={params.adults}
                      childrenCount={params.children}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

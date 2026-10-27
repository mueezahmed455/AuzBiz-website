import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  EyeOff,
  FileCheck2,
  Plane,
  Radar,
  ShieldCheck,
} from "lucide-react";
import TripStatusForm from "./TripStatusForm";

export const metadata: Metadata = {
  title: "Trip status",
  description:
    "Request a booking status check from the AUZBIZ travel desk in Lahore. We confirm ticket issuance, payments, documents and schedule changes privately on WhatsApp.",
};

const confirmations = [
  {
    icon: FileCheck2,
    title: "Ticket issued",
    body: "Whether the ticket has been issued and the e-ticket resent to you.",
  },
  {
    icon: ClipboardCheck,
    title: "Payment and documents",
    body: "Deposit received, balance due, and the status of your visa or travel documents.",
  },
  {
    icon: Plane,
    title: "Schedule changes",
    body: "Airline time changes, terminal updates, or a rebooking that needs your approval.",
  },
];

export default function LiveTrackingPage() {
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
              <li className="text-white/70">Trip status</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300">
            <ShieldCheck size={12} /> Private by design
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Your booking.
            <span className="block text-amber-400">Confirmed by a person.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            We do not publish live booking data. Send your reference and the
            travel desk will confirm ticket issuance, payments, documents and
            any schedule change on WhatsApp.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 dark:bg-slate-950 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
            <TripStatusForm />

            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-sm font-semibold text-foreground">
                  What the desk can confirm
                </h2>
                <ul className="mt-4 space-y-4">
                  {confirmations.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                        <item.icon size={16} strokeWidth={2} />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2">
                  <Radar
                    size={15}
                    className="text-amber-600 dark:text-amber-400"
                  />
                  <h2 className="text-sm font-semibold text-foreground">
                    Already flying?
                  </h2>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  The plane radar shows public aircraft positions from the
                  OpenSky Network. It is a live map of air traffic — not your
                  booking record.
                </p>
                <Link
                  href="/plane-tracking"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-foreground transition-colors hover:text-amber-600 dark:hover:text-amber-400"
                >
                  Open the plane radar <ArrowRight size={13} />
                </Link>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex items-center gap-2">
                  <EyeOff
                    size={14}
                    className="text-muted-foreground"
                  />
                  <p className="text-[11px] font-semibold text-foreground">
                    What we will not do
                  </p>
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                  We will not display a passenger name record, passport data or
                  another traveller&apos;s booking on a public page. If you need
                  a document resent, ask from the phone number on the booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

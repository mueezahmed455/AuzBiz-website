import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock,
  FileText,
  Globe2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { visas } from "@/data/visas";
import AUZPromoBanner from "@/components/promo/AUZPromoBanner";

export const metadata: Metadata = {
  title: "Visa services",
  description:
    "Visa documentation and advisory from AUZBIZ in Lahore — UAE, Schengen, UK, USA, Canada, Türkiye, Malaysia, Thailand and more. Clear requirements and honest timelines.",
};

export default function VisasPage() {
  const popular = visas.filter((visa) => visa.popular);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-amber-500/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-0 h-[26rem] w-[26rem] rounded-full bg-sky-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300">
            <ShieldCheck size={12} /> Visa documentation &amp; advisory
          </div>

          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <h1 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Clear requirements.<br />
                <span className="text-amber-400">Honest timelines.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                A Pakistani passport does not have to mean guesswork. We prepare the file,
                check it before submission, and tell you what the embassy actually asks for.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                Not sure where to start?
              </p>
              <p className="text-sm leading-relaxed text-white/70">
                Send us your passport nationality, destination, and travel month. We will
                confirm the category and the current document list before you pay anything.
              </p>
              <a
                href="https://wa.me/923464993122?text=Assalam%20o%20Alaikum%2C%20I%27d%20like%20help%20with%20a%20visa%20application."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
              >
                <MessageCircle size={15} /> Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Visa promo — AUZBIZ 2×2 identity, wired into the revenue surface */}
      <section className="bg-background dark:bg-slate-950 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AUZPromoBanner
            variant="visa"
            href="/contact?service=Visa%20Services"
            className="max-w-3xl"
          />
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                The catalogue
              </p>
              <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Visas we assist with
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Starting prices and processing estimates for the destinations we handle most
                often. Requirements change — we confirm the current list before you apply.
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {visas.length} destinations · {popular.length} popular
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visas.map((visa) => (
              <article
                key={visa.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-amber-400"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-xl">
                      {visa.flag}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{visa.country}</h3>
                      <p className="text-[11px] text-muted-foreground">{visa.type}</p>
                    </div>
                  </div>
                  {visa.popular && (
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                      Popular
                    </span>
                  )}
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-border py-3 text-xs">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      From
                    </dt>
                    <dd className="mt-1 font-bold text-foreground">{visa.priceFrom}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Processing
                    </dt>
                    <dd className="mt-1 flex items-start gap-1 text-foreground">
                      <Clock size={11} className="mt-0.5 shrink-0 text-amber-500" />
                      {visa.processing}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-3 space-y-1.5">
                  {visa.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2 text-[11px] leading-relaxed text-muted-foreground"
                    >
                      <Check size={11} strokeWidth={2.5} className="mt-0.5 shrink-0 text-emerald-500" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <details className="group mt-4 border-t border-border pt-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[11px] font-semibold text-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <FileText size={12} className="text-amber-500" /> Typical documents
                    </span>
                    <span className="text-muted-foreground transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <ul className="mt-2 space-y-1">
                    {visa.documents.map((document) => (
                      <li key={document} className="text-[11px] leading-relaxed text-muted-foreground">
                        · {document}
                      </li>
                    ))}
                  </ul>
                </details>

                <Link
                  href={`/contact?service=visa&destination=${encodeURIComponent(visa.country)}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 transition-colors hover:gap-2.5 dark:text-amber-400"
                >
                  Ask about this visa <ArrowRight size={13} />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
              <Globe2 size={13} className="mr-1.5 inline text-amber-500" />
              Prices and processing times are indicative and can change without notice.
              Approval is always at the discretion of the relevant embassy or immigration
              authority — no agency can guarantee a visa.
            </p>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
            >
              Start an application <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
              Applying as a family or group?
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              We prepare every file together, so the story matches.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
              Families, student groups, and corporate delegations — one checklist, one point
              of contact, and a pre-submission review for every applicant.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
          >
            Talk to the visa desk <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}

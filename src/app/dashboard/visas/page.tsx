import Link from "next/link";
import { ArrowLeft, ExternalLink, Globe2 } from "lucide-react";
import { visas } from "@/data/visas";
import { requireAdminPage } from "@/lib/auth";

export default async function DashboardVisasPage() {
  await requireAdminPage();

  return (
    <div className="space-y-7">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Visa catalogue
          </p>
          <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Visa services
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            These are the services and starting prices currently published on the website.
            This page is read-only; update <code className="rounded bg-surface px-1 py-0.5 text-[12px]">src/data/visas.ts</code>{" "}
            to change the catalogue.
          </p>
        </div>
        <Link
          href="/visas"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-amber-400"
        >
          Public page <ExternalLink size={14} />
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visas.map((visa) => (
          <article key={visa.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-lg">
                  {visa.flag}
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">{visa.country}</h2>
                  <p className="text-[11px] text-muted-foreground">{visa.type}</p>
                </div>
              </div>
              {visa.popular && (
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                  Popular
                </span>
              )}
            </div>

            <dl className="mt-4 space-y-2 border-t border-border pt-3 text-xs">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">From</dt>
                <dd className="font-semibold text-foreground">{visa.priceFrom}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Processing</dt>
                <dd className="text-right text-foreground">{visa.processing}</dd>
              </div>
            </dl>

            <ul className="mt-3 space-y-1">
              {visa.highlights.slice(0, 3).map((highlight) => (
                <li key={highlight} className="flex gap-2 text-[11px] leading-relaxed text-muted-foreground">
                  <Globe2 size={11} className="mt-0.5 shrink-0 text-amber-500" />
                  {highlight}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={15} /> Overview
      </Link>
    </div>
  );
}

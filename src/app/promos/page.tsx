import type { Metadata } from "next";
import { AUZPromoGrid } from "@/components/promo/AUZPromoBanner";
import AUZCampaignFlyer from "@/components/promo/AUZCampaignFlyer";

export const metadata: Metadata = {
  title: "AUZBIZ Promos — Umrah, Education, Group Tours & Visa",
  description:
    "AUZBIZ Group service promos: Sacred Umrah Journey, Global Education, Explore the World Together, and Experienced Visa Solutions.",
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

export default function PromosPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-600 dark:text-amber-400">
            AUZBIZ Group
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Dream Beyond Borders
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Four service-led promos, one brand line. Use these wherever you need a
            fast, on-brand service hook — homepage, dedicated pages, campaigns, or
            WhatsApp snippets.
          </p>
        </div>

        <AUZPromoGrid />

        <section className="mt-12 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
              Campaign variants
            </p>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
              WhatsApp-ready
            </span>
          </div>
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Drop any of these into a campaign page, email footer, or WhatsApp
            template. Each one opens a pre-filled WhatsApp message and links back
            to the matching service surface.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <AUZCampaignFlyer variant="umrah" />
            <AUZCampaignFlyer variant="education" />
            <AUZCampaignFlyer variant="group" />
            <AUZCampaignFlyer variant="visa" />
          </div>
        </section>

        <div className="mt-10 space-y-3 text-sm text-muted-foreground">
          <p>
            Each card links to the matching service surface. Swap the inline SVG
            background art for real departure photos through the dashboard upload
            flow when the desk has 4K photos ready.
          </p>
          <p>
            Variant keys: <code>umrah</code>, <code>education</code>,{" "}
            <code>group</code>, <code>visa</code>.
          </p>
        </div>
      </main>
    </div>
  );
}

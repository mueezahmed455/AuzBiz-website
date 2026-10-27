import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { requireAdminPage } from "@/lib/auth";
import { getContent } from "@/lib/content/store";
import { updateInquiryStatusAction } from "@/app/dashboard/actions";
import type { Inquiry, InquiryStatus } from "@/lib/content/types";

export const dynamic = "force-dynamic";

const statuses: { key: "all" | InquiryStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "quoted", label: "Quoted" },
  { key: "closed", label: "Closed" },
];

const statusTone: Record<InquiryStatus, string> = {
  new: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  contacted: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
  quoted: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
  closed: "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400",
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function whatsappHref(phone: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}`;
}

export default async function DashboardInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdminPage();
  const params = await searchParams;
  const active = statuses.find((status) => status.key === params.status)?.key ?? "all";

  let inquiries: Inquiry[] = [];
  let error = "";
  try {
    inquiries = (await getContent()).inquiries;
  } catch (readError) {
    error = readError instanceof Error ? readError.message : "Could not load enquiries.";
    inquiries = [];
  }

  const filtered = active === "all" ? inquiries : inquiries.filter((inquiry) => inquiry.status === active);
  const counts = {
    all: inquiries.length,
    new: inquiries.filter((inquiry) => inquiry.status === "new").length,
    contacted: inquiries.filter((inquiry) => inquiry.status === "contacted").length,
    quoted: inquiries.filter((inquiry) => inquiry.status === "quoted").length,
    closed: inquiries.filter((inquiry) => inquiry.status === "closed").length,
  };

  return (
    <div className="space-y-7">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
          Inquiries
        </p>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Website enquiries
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Messages from the contact page and quote builder. New enquiries are also emailed to
          the office inbox.
        </p>
      </header>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {statuses.map((status) => (
          <Link
            key={status.key}
            href={`/dashboard/inquiries${status.key === "all" ? "" : `?status=${status.key}`}`}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              active === status.key
                ? "bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {status.label} {counts[status.key]}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-muted-foreground">
            <MessageSquare size={22} />
          </span>
          <h2 className="mt-4 text-base font-semibold text-foreground">
            {inquiries.length === 0 ? "No enquiries yet" : "Nothing in this status"}
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            {inquiries.length === 0
              ? "When someone submits the contact form or quote builder, their message will appear here."
              : "Choose another status to see more messages."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((inquiry) => (
            <article key={inquiry.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusTone[inquiry.status]}`}>
                      {inquiry.status}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{formatDate(inquiry.createdAt)}</span>
                  </div>

                  <h2 className="mt-2 text-base font-semibold text-foreground">{inquiry.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {inquiry.service || "General enquiry"}
                    {inquiry.destination ? ` · ${inquiry.destination}` : ""}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
                    {inquiry.phone && (
                      <a href={`tel:${inquiry.phone}`} className="inline-flex items-center gap-1.5 text-foreground hover:text-amber-600 dark:hover:text-amber-400">
                        <Phone size={12} /> {inquiry.phone}
                      </a>
                    )}
                    {inquiry.email && (
                      <a href={`mailto:${inquiry.email}`} className="inline-flex items-center gap-1.5 text-foreground hover:text-amber-600 dark:hover:text-amber-400">
                        <Mail size={12} /> {inquiry.email}
                      </a>
                    )}
                    {inquiry.travelDates && (
                      <span className="text-muted-foreground">Travel: {inquiry.travelDates}</span>
                    )}
                    {inquiry.groupSize && (
                      <span className="text-muted-foreground">Group: {inquiry.groupSize}</span>
                    )}
                  </div>

                  {inquiry.message && (
                    <p className="mt-3 whitespace-pre-line rounded-xl bg-surface px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                      {inquiry.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 lg:w-52 lg:flex-col lg:items-stretch">
                  {inquiry.phone && (
                    <a
                      href={whatsappHref(inquiry.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-500"
                    >
                      <MessageCircle size={13} /> WhatsApp
                    </a>
                  )}
                  {inquiry.email && (
                    <a
                      href={`mailto:${inquiry.email}?subject=${encodeURIComponent("Your AUZBIZ travel enquiry")}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-amber-400"
                    >
                      <Send size={13} /> Reply by email
                    </a>
                  )}

                  <form action={updateInquiryStatusAction} className="flex items-center gap-1.5">
                    <input type="hidden" name="id" value={inquiry.id} />
                    <select
                      name="status"
                      defaultValue={inquiry.status}
                      aria-label={`Status for ${inquiry.name}`}
                      className="h-8 flex-1 rounded-lg border border-input bg-card px-2 text-xs text-foreground"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button
                      type="submit"
                      className="h-8 rounded-lg bg-slate-950 px-2.5 text-[11px] font-semibold text-white dark:bg-amber-500 dark:text-slate-950"
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={15} /> Overview
      </Link>
    </div>
  );
}

import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  Images,
  MessageSquare,
  Plus,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { getContent, getStorageMode, sortPosts } from "@/lib/content/store";
import type { SiteContent } from "@/lib/content/types";

export const dynamic = "force-dynamic";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default async function DashboardOverviewPage() {
  let content: SiteContent;
  let storageError = "";
  try {
    content = await getContent();
  } catch (error) {
    storageError = error instanceof Error ? error.message : "Could not read content.";
    content = {
      blogPosts: [],
      tours: [],
      inquiries: [],
      version: 1,
      updatedAt: "",
    };
  }

  const posts = sortPosts(content.blogPosts);
  const published = posts.filter((post) => post.status === "published").length;
  const drafts = posts.filter((post) => post.status === "draft").length;
  const liveTours = content.tours.filter((tour) => tour.status === "published").length;
  const tourDrafts = content.tours.filter((tour) => tour.status === "draft").length;
  const newInquiries = content.inquiries.filter((inquiry) => inquiry.status === "new").length;

  const stats = [
    {
      label: "Published articles",
      value: published,
      detail: `${drafts} draft${drafts === 1 ? "" : "s"}`,
      icon: FileText,
      href: "/dashboard/blog",
    },
    {
      label: "Live group tours",
      value: liveTours,
      detail: `${tourDrafts} draft${tourDrafts === 1 ? "" : "s"}`,
      icon: Images,
      href: "/dashboard/tours",
    },
    {
      label: "New inquiries",
      value: newInquiries,
      detail: `${content.inquiries.length} total`,
      icon: MessageSquare,
      href: "/dashboard/inquiries",
    },
  ];

  const recentInquiries = content.inquiries.slice(0, 5);
  const recentPosts = posts.slice(0, 4);
  const recentTours = [...content.tours]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Overview
          </p>
          <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Everything in one place
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Blog articles, group tour galleries, and enquiries from the website.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard/blog/new"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-amber-400"
          >
            <Plus size={15} /> New article
          </Link>
          <Link
            href="/dashboard/tours/new"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
          >
            <Plus size={15} /> New group tour
          </Link>
        </div>
      </header>

      {storageError && (
        <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Content storage needs attention</p>
            <p className="mt-1 leading-relaxed">{storageError}</p>
            {getStorageMode() === "unconfigured" && (
              <p className="mt-2 leading-relaxed">
                In Vercel: Storage → Blob → connect a store, then redeploy. The token is added
                automatically as <code className="font-mono text-[12px]">BLOB_READ_WRITE_TOKEN</code>.
              </p>
            )}
          </div>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-amber-600 dark:text-amber-400">
                <stat.icon size={18} />
              </span>
              <ArrowUpRight
                size={16}
                className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
            <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm font-medium text-foreground">{stat.label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{stat.detail}</p>
          </Link>
        ))}
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <section className="rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Recent enquiries</h2>
              <p className="text-[11px] text-muted-foreground">Newest messages from the website.</p>
            </div>
            <Link
              href="/dashboard/inquiries"
              className="text-xs font-semibold text-amber-600 hover:underline dark:text-amber-400"
            >
              View all
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <MessageSquare size={22} className="mx-auto text-muted-foreground" />
              <p className="mt-3 text-sm font-medium text-foreground">No enquiries yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Messages sent through the contact form will appear here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {recentInquiries.map((inquiry) => (
                <li key={inquiry.id} className="flex items-start gap-3 px-5 py-3.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate text-sm font-medium text-foreground">{inquiry.name}</p>
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {formatDate(inquiry.createdAt)}
                      </span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {inquiry.service || "General enquiry"} · {inquiry.phone}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
              <h2 className="text-sm font-semibold text-foreground">Recent articles</h2>
              <Link
                href="/dashboard/blog"
                className="text-xs font-semibold text-amber-600 hover:underline dark:text-amber-400"
              >
                Manage
              </Link>
            </div>
            {recentPosts.length === 0 ? (
              <p className="px-5 py-8 text-center text-xs text-muted-foreground">No articles yet.</p>
            ) : (
              <ul className="divide-y divide-border">
                {recentPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/dashboard/blog/${post.id}`}
                      className="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-surface"
                    >
                      <FileText size={15} className="mt-0.5 shrink-0 text-muted-foreground" />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium text-foreground">{post.title}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {post.status === "published" ? "Published" : "Draft"} · {post.category}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
              <h2 className="text-sm font-semibold text-foreground">Recent tours</h2>
              <Link
                href="/dashboard/tours"
                className="text-xs font-semibold text-amber-600 hover:underline dark:text-amber-400"
              >
                Manage
              </Link>
            </div>
            {recentTours.length === 0 ? (
              <p className="px-5 py-8 text-center text-xs text-muted-foreground">No tours yet.</p>
            ) : (
              <ul className="divide-y divide-border">
                {recentTours.map((tour) => (
                  <li key={tour.id}>
                    <Link
                      href={`/dashboard/tours/${tour.id}`}
                      className="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-surface"
                    >
                      <Images size={15} className="mt-0.5 shrink-0 text-muted-foreground" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{tour.title}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {tour.status === "published" ? "Live" : "Draft"} · {tour.gallery.length} gallery photo
                          {tour.gallery.length === 1 ? "" : "s"}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/tours/new"
          className="group flex items-center gap-4 rounded-2xl border border-dashed border-border bg-card px-5 py-5 transition-colors hover:border-amber-400"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
            <Images size={19} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">Upload group tour photos</p>
            <p className="text-xs text-muted-foreground">Create a page with a cover photo and gallery.</p>
          </div>
          <ArrowUpRight size={16} className="text-muted-foreground" />
        </Link>

        <Link
          href="/group-tours"
          target="_blank"
          className="group flex items-center gap-4 rounded-2xl border border-dashed border-border bg-card px-5 py-5 transition-colors hover:border-amber-400"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-muted-foreground">
            <ExternalLink size={19} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">See the public gallery</p>
            <p className="text-xs text-muted-foreground">What visitors see on auzbizgroup.com.</p>
          </div>
          <ArrowUpRight size={16} className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Pencil,
  Plus,
  Search,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { requireAdminPage } from "@/lib/auth";
import { getContent, sortPosts } from "@/lib/content/store";
import type { BlogPost } from "@/lib/content/types";
import { deletePostAction, togglePostStatusAction } from "@/app/dashboard/actions";
import ConfirmButton from "@/components/admin/ConfirmButton";

export const dynamic = "force-dynamic";

type Search = {
  saved?: string;
  deleted?: string;
  status?: string;
  q?: string;
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default async function DashboardBlogPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  await requireAdminPage();
  const params = await searchParams;

  let posts: BlogPost[] = [];
  let error = "";
  try {
    posts = sortPosts((await getContent()).blogPosts);
  } catch (readError) {
    error = readError instanceof Error ? readError.message : "Could not load articles.";
    posts = [];
  }

  const query = (params.q ?? "").trim().toLowerCase();
  const status = params.status === "published" || params.status === "draft" ? params.status : "all";

  const filtered = posts.filter((post) => {
    if (status !== "all" && post.status !== status) return false;
    if (!query) return true;
    return [post.title, post.excerpt, post.category, post.tags.join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const counts = {
    all: posts.length,
    published: posts.filter((post) => post.status === "published").length,
    draft: posts.filter((post) => post.status === "draft").length,
  };

  return (
    <div className="space-y-7">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Blog
          </p>
          <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Articles
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {counts.published} published · {counts.draft} draft
          </p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
        >
          <Plus size={15} /> New article
        </Link>
      </header>

      {params.saved && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
          <CheckCircle2 size={16} /> Article {params.saved === "created" ? "created" : "updated"} successfully.
        </div>
      )}
      {params.deleted && (
        <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          Article deleted.
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {[
            { key: "all", label: `All ${counts.all}` },
            { key: "published", label: `Published ${counts.published}` },
            { key: "draft", label: `Drafts ${counts.draft}` },
          ].map((tab) => (
            <Link
              key={tab.key}
              href={`/dashboard/blog${tab.key === "all" ? "" : `?status=${tab.key}`}`}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                status === tab.key
                  ? "bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <form className="relative w-full sm:max-w-xs" action="/dashboard/blog">
          {status !== "all" && <input type="hidden" name="status" value={status} />}
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            name="q"
            defaultValue={params.q}
            placeholder="Search articles…"
            className="h-10 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </form>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-muted-foreground">
            <FileText size={22} />
          </span>
          <h2 className="mt-4 text-base font-semibold text-foreground">
            {posts.length === 0 ? "No articles yet" : "No matching articles"}
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            {posts.length === 0
              ? "Publish the first travel guide — it will appear on the public blog immediately."
              : "Try a different search or clear the filters."}
          </p>
          <Link
            href="/dashboard/blog/new"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white dark:bg-amber-500 dark:text-slate-950"
          >
            <Plus size={15} /> Write an article
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <ul className="divide-y divide-border">
            {filtered.map((post) => (
              <li key={post.id} className="p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-surface sm:h-16 sm:w-24">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 96px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 text-amber-400">
                        <FileText size={18} />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          post.status === "published"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                        }`}
                      >
                        {post.status}
                      </span>
                      <span className="text-[11px] text-muted-foreground">{post.category}</span>
                      <span className="text-[11px] text-muted-foreground">· {post.readTime}</span>
                    </div>
                    <h2 className="mt-1.5 line-clamp-2 text-sm font-semibold text-foreground">
                      {post.title}
                    </h2>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      Updated {formatDate(post.updatedAt)} · {post.date}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    {post.status === "published" && (
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Eye size={13} /> View
                      </Link>
                    )}
                    <Link
                      href={`/dashboard/blog/${post.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-amber-400"
                    >
                      <Pencil size={13} /> Edit
                    </Link>
                    <form action={togglePostStatusAction}>
                      <input type="hidden" name="id" value={post.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {post.status === "published" ? <EyeOff size={13} /> : <Eye size={13} />}
                        {post.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                    <form action={deletePostAction}>
                      <input type="hidden" name="id" value={post.id} />
                      <ConfirmButton
                        message={`Delete “${post.title}”? This cannot be undone.`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                      >
                        <Trash2 size={13} /> Delete
                      </ConfirmButton>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={15} /> Overview
        </Link>
        <Link
          href="/blog"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Public blog <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}

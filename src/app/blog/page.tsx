import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Search, Sparkles } from "lucide-react";
import { getPublishedPosts, sortPosts } from "@/lib/content/store";
import { categoryLabel, categorySlug } from "@/lib/content/format";
import BlogCard, { BlogFilters } from "@/components/BlogCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Travel journal",
  description:
    "Destination guides, visa updates, Umrah checklists, and honest travel notes from the AUZBIZ team in Lahore.",
};

type SearchParams = { category?: string; q?: string };

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const activeCategory = (params.category ?? "").trim();

  const allPosts = sortPosts(await getPublishedPosts());

  const categories = Array.from(
    allPosts.reduce((map, post) => {
      const slug = categorySlug(post.category);
      const current = map.get(slug) ?? { label: categoryLabel(post.category), slug, count: 0 };
      current.count += 1;
      map.set(slug, current);
      return map;
    }, new Map<string, { label: string; slug: string; count: number }>()),
  ).map(([, value]) => value);

  const filtered = allPosts.filter((post) => {
    if (activeCategory && categorySlug(post.category) !== activeCategory) return false;
    if (!query) return true;
    return [post.title, post.excerpt, post.category, post.tags.join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase());
  });

  const isFiltered = Boolean(query || activeCategory);
  const featured = !isFiltered ? filtered.find((post) => post.featured) ?? filtered[0] : undefined;
  const gridPosts = featured ? filtered.filter((post) => post.id !== featured.id) : filtered;

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-amber-500/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300">
            <Sparkles size={12} /> The AUZBIZ journal
          </div>

          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div>
              <h1 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Notes from the road,<br />
                <span className="text-amber-400">written for travellers.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                Visa changes, destination guides, Umrah checklists, and the small details
                that make a trip easier. No filler.
              </p>
            </div>

            <form action="/blog" className="w-full">
              {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
              <label htmlFor="blog-search" className="sr-only">
                Search the journal
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-1.5 backdrop-blur">
                <Search size={17} className="ml-2.5 shrink-0 text-white/60" />
                <input
                  id="blog-search"
                  name="q"
                  defaultValue={query}
                  placeholder="Search guides, visas, destinations…"
                  className="h-10 min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-amber-500 px-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
                >
                  Search <ArrowRight size={14} />
                </button>
              </div>
              <p className="mt-2.5 text-[11px] text-white/35">
                {allPosts.length} articles · updated by the AUZBIZ team
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <BlogFilters categories={categories} active={activeCategory || "all"} query={query} />
            {isFiltered && (
              <Link
                href="/blog"
                className="text-xs font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Clear filters
              </Link>
            )}
          </div>

          {query && (
            <p className="mb-6 text-sm text-muted-foreground">
              {filtered.length} result{filtered.length === 1 ? "" : "s"} for{" "}
              <span className="font-semibold text-foreground">“{query}”</span>
            </p>
          )}

          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-20 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-muted-foreground">
                <Compass size={24} />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-foreground">Nothing here yet</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Try a different search, or ask us directly — we answer visa and itinerary
                questions on WhatsApp every day.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/blog"
                  className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:border-amber-400"
                >
                  Browse all articles
                </Link>
                <a
                  href="https://wa.me/923464993122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white dark:bg-amber-500 dark:text-slate-950"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <>
              {featured && (
                <div className="mb-10">
                  <BlogCard post={featured} featured />
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Planning something specific?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us the route and dates — we will send options with real prices.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
          >
            Get a quote <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}

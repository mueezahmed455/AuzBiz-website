import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/content/types";
import { categoryLabel, readingTime } from "@/lib/content/format";
import PostArtwork from "./PostArtwork";

export default function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group grid overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-2xl lg:grid-cols-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-surface lg:aspect-auto lg:min-h-[22rem]">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              priority
            />
          ) : (
            <PostArtwork title={post.title} category={categoryLabel(post.category)} />
          )}
          <span className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300 backdrop-blur">
            Featured
          </span>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            {categoryLabel(post.category)}
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
            {post.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} /> {readingTime(post.readTime)}
            </span>
            <span className="ml-auto inline-flex items-center gap-1 font-semibold text-foreground">
              Read <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.imageAlt || post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <PostArtwork title={post.title} category={categoryLabel(post.category)} compact />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
          {categoryLabel(post.category)}
        </p>
        <h2 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-foreground">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-[11px] text-muted-foreground">
          <span>{post.date}</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={11} /> {readingTime(post.readTime)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogFilters({
  categories,
  active,
  query,
}: {
  categories: { label: string; slug: string; count: number }[];
  active: string;
  query: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Link
        href={`/blog${query ? `?q=${encodeURIComponent(query)}` : ""}`}
        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
          active === "all"
            ? "bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950"
            : "border border-border bg-card text-muted-foreground hover:border-amber-400 hover:text-foreground"
        }`}
      >
        All
      </Link>
      {categories.map((category) => {
        const params = new URLSearchParams();
        params.set("category", category.slug);
        if (query) params.set("q", query);
        return (
          <Link
            key={category.slug}
            href={`/blog?${params.toString()}`}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              active === category.slug
                ? "bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950"
                : "border border-border bg-card text-muted-foreground hover:border-amber-400 hover:text-foreground"
            }`}
          >
            {category.label}
            <span className={`ml-1.5 ${active === category.slug ? "text-white/60 dark:text-slate-950/60" : "text-muted-foreground/60"}`}>
              {category.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

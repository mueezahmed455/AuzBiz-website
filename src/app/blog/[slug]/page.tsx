import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  MessageCircle,
  Tag,
  UserRound,
} from "lucide-react";
import { getPostBySlug, getRelatedPosts } from "@/lib/content/store";
import { categoryLabel, categorySlug, readingTime } from "@/lib/content/format";
import RichText from "@/components/RichText";
import BlogCard from "@/components/BlogCard";
import PostArtwork from "@/components/PostArtwork";

export const dynamic = "force-dynamic";

const SITE = "https://www.auzbizgroup.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.sortDate,
      tags: post.tags,
      images: post.image ? [{ url: post.image, alt: post.imageAlt || post.title }] : undefined,
    },
    alternates: { canonical: `${SITE}/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.slug, post.category, 3);
  const shareUrl = `${SITE}/blog/${post.slug}`;
  const shareText = `${post.title} — ${shareUrl}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.sortDate,
    dateModified: post.sortDate,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "AUZBIZ Group",
      logo: { "@type": "ImageObject", url: `${SITE}/favicon.svg` },
    },
    mainEntityOfPage: shareUrl,
    image: post.image ? [post.image] : undefined,
    articleSection: categoryLabel(post.category),
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="border-b border-border bg-surface">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[11px] text-muted-foreground sm:px-6 lg:px-8"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Journal
          </Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-foreground">{post.title}</span>
        </nav>
      </div>

      <article>
        <header className="relative overflow-hidden bg-slate-950 pb-28 pt-14 text-white sm:pb-32 sm:pt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-32 h-[30rem] w-[30rem] rounded-full bg-amber-500/15 blur-3xl"
          />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 text-[11px]">
              <Link
                href={`/blog?category=${categorySlug(post.category)}`}
                className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-bold uppercase tracking-[0.16em] text-amber-300 transition-colors hover:bg-amber-400/20"
              >
                {categoryLabel(post.category)}
              </Link>
              <span className="inline-flex items-center gap-1.5 text-white/60">
                <CalendarDays size={12} /> {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/60">
                <Clock size={12} /> {readingTime(post.readTime)}
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/60 sm:text-lg">
              {post.excerpt}
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-amber-300">
                <UserRound size={15} />
              </span>
              <div>
                <p className="text-xs font-semibold text-white">{post.author}</p>
                <p className="text-[11px] text-white/60">AUZBIZ Group · Lahore</p>
              </div>
            </div>
          </div>
        </header>

        <div className="relative mx-auto -mt-16 max-w-5xl px-4 sm:-mt-20 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl sm:rounded-3xl">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.imageAlt || post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            ) : (
              <PostArtwork title={post.title} category={categoryLabel(post.category)} />
            )}
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <RichText blocks={post.content} />

          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-6">
              <Tag size={14} className="text-muted-foreground" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Found this useful?</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Send it to someone planning the same trip.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-emerald-400 hover:text-emerald-500"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-sky-400 hover:text-sky-500"
              >
                Facebook
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-sky-500 hover:text-sky-600"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={15} /> All articles
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:underline dark:text-amber-400"
            >
              Plan this trip <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-surface py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                  Keep reading
                </p>
                <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground">
                  Related articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((entry) => (
                <BlogCard key={entry.id} post={entry} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Need help applying this to your trip?</h2>
            <p className="mt-1.5 text-sm text-white/55">
              Send your route, dates, and traveller count. We will reply with real options.
            </p>
          </div>
          <a
            href="https://wa.me/923464993122"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
          >
            <MessageCircle size={16} /> Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

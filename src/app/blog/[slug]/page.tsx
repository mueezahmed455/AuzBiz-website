import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/data/blog-posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | AUZBIZ Travel Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-gray-50 border-b border-gray-100 dark:bg-[#12122a] dark:border-[#2a2a5e]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gold-500 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-500 truncate max-w-[200px]">{post.title}</span>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <article>
        <header className="bg-navy-800 dark:bg-[#0a0a1a] relative overflow-hidden py-12 sm:py-16">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block bg-gold-500/15 text-gold-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-white/40 text-xs">{post.date}</span>
              <span className="text-white/40 text-xs">·</span>
              <span className="text-white/40 text-xs">{post.readTime} read</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </header>

        {/* Article Content */}
        <div className="py-10 sm:py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-sm sm:prose-base max-w-none prose-headings:text-navy-800 prose-p:text-gray-600 prose-a:text-gold-500 dark:prose-headings:text-white dark:prose-p:text-gray-400">
              {post.content.map((paragraph, i) => (
                <p key={i} className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-[#2a2a5e]">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-gray-500 dark:bg-[#1a1a3e] dark:border-[#2a2a5e]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs text-gray-400 font-medium">Share this article:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://www.auzbizgroup.com/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:bg-[#166fe5] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out this article: ${post.title} - https://www.auzbizgroup.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:bg-[#20bd5a] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=https://www.auzbizgroup.com/blog/${post.slug}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center text-white hover:bg-[#0959a8] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#F9F9FB] dark:bg-[#12122a] py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-navy-800 dark:text-white mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="bg-white dark:bg-[#1a1a3e] border border-gray-100 dark:border-[#2a2a5e] rounded-xl overflow-hidden hover:border-gold-500/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="bg-navy-800 px-5 py-5">
                    <span className="inline-block text-[9px] font-bold px-2.5 py-1 bg-gold-500/15 text-gold-500 rounded-full uppercase tracking-wider mb-2.5">
                      {rp.category}
                    </span>
                    <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-gold-500 transition-colors">
                      {rp.title}
                    </h3>
                  </div>
                  <div className="px-5 py-3 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">{rp.date} · {rp.readTime}</span>
                    <span className="text-[10px] font-semibold text-navy-800 dark:text-gold-500 group-hover:text-gold-500 transition-colors">
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="bg-gold-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-navy-800 font-semibold text-base sm:text-lg">
              Ready to plan your next journey?
            </p>
            <p className="text-navy-800/60 text-sm">Free consultation · No obligation</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/packages"
              className="bg-navy-800 text-gold-500 text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-navy-700 transition-colors"
            >
              View Packages
            </Link>
            <Link
              href="https://wa.me/923464993122"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#20bd5a] transition-colors inline-flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              Chat Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

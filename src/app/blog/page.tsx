"use client";

import { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui";
import TiltCard from "@/components/TiltCard";
import HeroParticles from "@/components/HeroParticles";
import CTABar from "@/components/CTABar";
import { blogPosts, categories, allTags } from "@/data/blog-posts";

const ITEMS_PER_PAGE = 6;

function BlogContent() {
  const searchParams = useSearchParams();
  const activeCategoryParam = searchParams.get("category")?.toLowerCase().replace(/\s+/g, "-") || "all";

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberContact, setSubscriberContact] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [subError, setSubError] = useState("");

  const filteredPosts = useMemo(() => {
    if (activeCategoryParam === "all") return blogPosts;
    return blogPosts.filter(
      (p) => p.category.toLowerCase().replace(/\s+/g, "-") === activeCategoryParam
    );
  }, [activeCategoryParam]);

  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const hasMore = visibleCount < filteredPosts.length;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberName || !subscriberContact) {
      setSubError("Please enter your name and contact info.");
      return;
    }
    setSubStatus("loading");
    setSubError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: subscriberName, contact: subscriberContact }),
      });
      if (!res.ok) throw new Error();
      setSubStatus("success");
      setSubscriberName("");
      setSubscriberContact("");
    } catch {
      setSubStatus("error");
      setSubError("Could not subscribe. Please try again.");
    }
  };

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 dark:bg-[#0a0a1a] relative overflow-hidden">
        <HeroParticles />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20">
          <FadeInView>
            <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
              Blog — Travel Insights, Visa Updates & Study Abroad Guidance
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-3">
              Travel Tips, Visa News
              <span className="block text-gold-500">& Destination Guides.</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl">
              Stay informed with the latest travel updates, visa policy changes, destination
              guides, and study abroad tips — curated for Pakistani travellers and families.
            </p>
          </FadeInView>
        </div>
        <div className="h-1 bg-gold-500" />
      </section>

      {/* Category bar */}
      <section className="bg-gray-50 border-b border-gray-100 dark:bg-[#12122a] dark:border-[#2a2a5e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex gap-2 flex-wrap">
          <Link
            href="/blog"
            className={`text-xs px-3.5 py-2 rounded-full border font-medium transition-colors ${
              activeCategoryParam === "all"
                ? "bg-navy-800 text-gold-500 border-navy-800"
                : "bg-white text-gray-500 border-gray-200 hover:border-gold-500 hover:text-gold-500 dark:bg-[#1a1a3e] dark:border-[#2a2a5e]"
            }`}
          >
            All Posts
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog?category=${cat.slug}`}
              className={`text-xs px-3.5 py-2 rounded-full border font-medium transition-colors ${
                activeCategoryParam === cat.slug
                  ? "bg-navy-800 text-gold-500 border-navy-800"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gold-500 hover:text-gold-500 dark:bg-[#1a1a3e] dark:border-[#2a2a5e]"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured article */}
          <FadeInView>
            <span className="text-xs font-semibold text-gold-500 uppercase tracking-wider block mb-3">
              Featured Article
            </span>
          </FadeInView>

          <FadeInView delay={0.1}>
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="bg-white dark:bg-[#1a1a3e] border border-gray-100 dark:border-[#2a2a5e] rounded-2xl overflow-hidden shadow-sm mb-10 hover:border-gold-500/30 hover:shadow-lg transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="bg-navy-800 px-6 sm:px-8 py-10 flex flex-col justify-between min-h-[240px]">
                    <div>
                      <span className="inline-block bg-gold-500 text-navy-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                        {featuredPost.category}
                      </span>
                      <h2 className="text-white font-bold text-lg sm:text-xl leading-snug group-hover:text-gold-500 transition-colors">
                        {featuredPost.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3 mt-6">
                      <span className="text-gold-500/60 text-[11px]">{featuredPost.date}</span>
                      <span className="text-white/40 text-[11px]">{featuredPost.readTime} read</span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                      {featuredPost.excerpt}
                    </p>
                    <ul className="space-y-2.5 mb-6">
                      {[
                        "Visa-free or e-visa on arrival for Pakistani passport holders",
                        "Significantly more affordable than Southeast Asian destinations",
                        "Predominantly Muslim country — halal food widely available",
                        "World-class Islamic heritage: Registan, Bibi-Khanym, Kalon Mosque",
                        "Direct & one-stop flights available from Lahore",
                      ].map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-gray-500 dark:text-gray-400">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="#D4AF37" className="mt-0.5 flex-shrink-0">
                            <circle cx="12" cy="12" r="4" />
                          </svg>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-gold-500/5 border border-gold-500/20 rounded-xl p-3 mb-4">
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">📦 Related package</p>
                      <Link href="/packages#uzbekistan" className="text-xs font-semibold text-navy-800 dark:text-gold-500 hover:text-gold-500 transition-colors inline-flex items-center gap-1">
                        Uzbekistan Discovery Tour — PKR 185,000 →
                      </Link>
                    </div>
                    <span className="inline-block bg-navy-800 text-gold-500 text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-navy-700 transition-colors">
                      Read Full Article →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </FadeInView>

          {/* Main content + sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
            {/* Posts grid */}
            <div>
              <FadeInView>
                <span className="text-xs font-semibold text-gold-500 uppercase tracking-wider block mb-1">
                  {activeCategoryParam === "all" ? "Latest Articles" : `${categories.find(c => c.slug === activeCategoryParam)?.name || "Articles"}`}
                </span>
                <h3 className="text-xl font-bold text-navy-800 dark:text-white mb-6">
                  {activeCategoryParam === "all"
                    ? "Travel updates, visa news & destination guides"
                    : `${filteredPosts.length} article${filteredPosts.length !== 1 ? "s" : ""} in this category`}
                </h3>
              </FadeInView>

              {filteredPosts.length === 0 && (
                <div className="text-center py-10">
                  <div className="text-3xl mb-3">🔍</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">No articles found in this category.</p>
                  <Link href="/blog" className="text-xs text-gold-500 hover:underline">
                    View all articles
                  </Link>
                </div>
              )}

              <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {visiblePosts.map((post) => (
                  <StaggerItem key={post.slug}>
                    <TiltCard tiltAmount={3} scale={1.015}>
                      <Link href={`/blog/${post.slug}`} className="block bg-white dark:bg-[#1a1a3e] border border-gray-100 dark:border-[#2a2a5e] rounded-xl overflow-hidden hover:border-gold-500/30 hover:shadow-lg transition-all duration-300 h-full group">
                        <div className="bg-navy-800 px-5 py-5">
                          <span className="inline-block text-[9px] font-bold px-2.5 py-1 bg-gold-500/15 text-gold-500 rounded-full uppercase tracking-wider mb-2.5">
                            {post.category}
                          </span>
                          <h4 className="text-white font-semibold text-sm leading-snug group-hover:text-gold-500 transition-colors">
                            {post.title}
                          </h4>
                        </div>
                        <div className="px-5 py-4">
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-400">{post.date} · {post.readTime}</span>
                            <span className="text-[10px] font-semibold text-navy-800 dark:text-gold-500 group-hover:text-gold-500 transition-colors">
                              Read more →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </TiltCard>
                  </StaggerItem>
                ))}
              </StaggerChildren>

              {hasMore && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                    className="bg-navy-800 text-gold-500 text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-navy-700 transition-colors"
                  >
                    Load More Articles ({filteredPosts.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <FadeInView>
                <div className="bg-white dark:bg-[#1a1a3e] border border-gray-100 dark:border-[#2a2a5e] rounded-xl p-5">
                  <h4 className="text-xs font-semibold text-navy-800 dark:text-white pb-3 mb-3 border-b border-gray-100 dark:border-[#2a2a5e]">
                    Browse by category
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/blog"
                        className={`flex items-center justify-between text-sm cursor-pointer hover:text-gold-500 transition-colors ${
                          activeCategoryParam === "all" ? "text-gold-500" : "text-gray-500"
                        }`}
                      >
                        <span>All Posts</span>
                        <span className="text-[10px] bg-gray-50 dark:bg-[#12122a] px-2 py-0.5 rounded-full text-gray-400">{blogPosts.length}</span>
                      </Link>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/blog?category=${cat.slug}`}
                          className={`flex items-center justify-between text-sm cursor-pointer hover:text-gold-500 transition-colors ${
                            activeCategoryParam === cat.slug ? "text-gold-500" : "text-gray-500"
                          }`}
                        >
                          <span>{cat.name}</span>
                          <span className="text-[10px] bg-gray-50 dark:bg-[#12122a] px-2 py-0.5 rounded-full text-gray-400">{cat.count}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInView>

              <FadeInView delay={0.05}>
                <div className="bg-white dark:bg-[#1a1a3e] border border-gray-100 dark:border-[#2a2a5e] rounded-xl p-5">
                  <h4 className="text-xs font-semibold text-navy-800 dark:text-white pb-3 mb-3 border-b border-gray-100 dark:border-[#2a2a5e]">
                    Popular tags
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {allTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-1.5 bg-gray-50 dark:bg-[#12122a] border border-gray-100 dark:border-[#2a2a5e] rounded-full text-gray-500 dark:text-gray-400 cursor-pointer hover:border-gold-500 hover:text-gold-500 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeInView>

              <FadeInView delay={0.1}>
                <div className="bg-navy-800 rounded-xl p-5">
                  <h4 className="text-gold-500 font-bold text-sm mb-1.5">Get travel alerts</h4>
                  <p className="text-white/55 text-xs leading-relaxed mb-4">
                    Weekly visa news, travel deals, and destination guides — direct to your inbox.
                  </p>
                  <form onSubmit={handleSubscribe}>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={subscriberName}
                      onChange={(e) => setSubscriberName(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-white/8 border border-white/10 text-white placeholder:text-white/30 mb-2 focus:outline-none focus:border-gold-500/50"
                    />
                    <input
                      type="text"
                      placeholder="Email or WhatsApp number"
                      value={subscriberContact}
                      onChange={(e) => setSubscriberContact(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-white/8 border border-white/10 text-white placeholder:text-white/30 mb-3 focus:outline-none focus:border-gold-500/50"
                    />
                    {subStatus === "success" && (
                      <p className="text-[10px] text-[#1D9E75] mb-2 text-center">✓ You&apos;re subscribed! Welcome to AUZBIZ.</p>
                    )}
                    {subError && <p className="text-[10px] text-red-400 mb-2 text-center">{subError}</p>}
                    <button
                      type="submit"
                      disabled={subStatus === "loading"}
                      className="w-full bg-gold-500 text-navy-800 text-xs font-semibold py-2.5 rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-50"
                    >
                      {subStatus === "loading" ? "Subscribing..." : "Subscribe Free"}
                    </button>
                  </form>
                </div>
              </FadeInView>

              <FadeInView delay={0.15}>
                <div className="bg-white dark:bg-[#1a1a3e] border border-gray-100 dark:border-[#2a2a5e] rounded-xl p-5">
                  <h4 className="text-xs font-semibold text-navy-800 dark:text-white mb-2">Need travel advice?</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                    Talk to our team — free consultation on any package, visa, or study abroad enquiry.
                  </p>
                  <Link
                    href="https://wa.me/923464993122"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full bg-[#25D366] text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-[#20bd5a] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
                    Chat on WhatsApp
                  </Link>
                </div>
              </FadeInView>
            </div>
          </div>
        </div>
      </section>

      <CTABar
        title="Ready to turn your travel dreams into reality?"
        subtitle="Browse our packages or speak to the AUZBIZ team today — free, no-obligation consultation."
      />
    </>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-800 animate-pulse" />}>
      <BlogContent />
    </Suspense>
  );
}

'use client';

import Link from 'next/link';
import { blogPosts } from '../data/blog-posts';

export function BlogSection() {
  // Get latest 3 posts (or featured ones)
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);
  const postsToShow = featuredPosts.length > 0 ? featuredPosts : blogPosts.slice(0, 3);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-navy-900 mb-6">
          Travel Insights
        </h2>
        <p className="text-center text-navy-600/80 max-w-3xl mx-auto mb-12">
          Latest travel tips, destination guides, and industry news.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {postsToShow.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl bg-white dark:bg-card-bg border border-card-border shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Image placeholder */}
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <>
                      {/* Category badge */}
                      <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-navy-800/90 text-gold-300 rounded-md">
                        {post.category}
                      </span>
                      {/* Placeholder gradient */}
                      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/20 to-transparent"></div>
                      <img
                        src={`https://source.unsplash.com/random/800x450?${encodeURIComponent(
                          post.title.split(' ')[0]
                        )},travel`}
                        alt={post.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </>
                  )}
                </div>

                <div className="p-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-text text-xs font-medium bg-gold-500/20 text-gold-500 mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-semibold text-navy-900 dark:text-gray-100 mb-3 line-clamp-2 hover:text-gold-500 transition-colors duration-200 group-hover:group">
                    {post.title}
                  </h3>
                  <p className="text-navy-600/80 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-navy-500 dark:text-gray-500">
                    <span>
                      <span className="mr-1">📅</span> {post.date}
                    </span>
                    <span>
                      <span className="mr-1">⏱️</span> {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all button */}
        <div className="mt-8 flex justify-center">
          <Link href="/blog" className="inline-flex items-center px-6 py-3 bg-navy-800 text-gold-500 rounded-xl font-medium hover:bg-navy-700 hover:shadow-lg transition-all duration-300">
            View All Blogs
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { ExternalLink, FileText } from "lucide-react";

export default function DashboardBlogPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Blog</h1>
          <p className="text-sm text-gray-500 mt-1">Articles published on the site.</p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-navy-700 dark:text-gold-500 hover:underline"
        >
          View public blog <ExternalLink size={14} />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {blogPosts.slice(0, 8).map((post) => (
          <div
            key={post.slug}
            className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#12122a] p-4 flex gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-navy-800/10 dark:bg-white/5 flex items-center justify-center shrink-0">
              <FileText size={18} className="text-navy-700 dark:text-gold-500" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{post.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{post.date}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-xs text-navy-700 dark:text-gold-500 hover:underline mt-1 inline-block"
              >
                Open
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

function Shimmer({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className={`bg-gray-200 rounded ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Shimmer className="w-10 h-10 rounded-lg" />
        <div className="space-y-2 flex-1">
          <Shimmer className="h-4 w-2/3" />
          <Shimmer className="h-3 w-1/3" />
        </div>
      </div>
      <div className="space-y-2">
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-5/6" />
        <Shimmer className="h-3 w-4/6" />
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="bg-navy-800 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <Shimmer className="h-4 w-64 bg-white/10" />
        <Shimmer className="h-10 w-96 bg-white/10" />
        <Shimmer className="h-10 w-72 bg-gold-500/20" />
        <Shimmer className="h-4 w-80 bg-white/10" />
        <div className="flex gap-3 pt-2">
          <Shimmer className="h-10 w-36 bg-gold-500/30 rounded-lg" />
          <Shimmer className="h-10 w-36 bg-white/10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer
          key={i}
          className={`h-3 ${i === lines - 1 ? "w-3/4" : "w-full"}`}
        />
      ))}
    </div>
  );
}

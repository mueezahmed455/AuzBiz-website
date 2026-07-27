"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  center?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  light = false,
  center = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={center ? "text-center" : ""}
    >
      <span
        className={`text-xs font-semibold tracking-[0.2em] uppercase mb-3 block ${
          light ? "text-gold-500" : "text-gold-500"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight tracking-tight ${
          light ? "text-white" : "text-navy-800 dark:text-white"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
            center ? "mx-auto" : ""
          } ${light ? "text-white/60" : "text-gray-500 dark:text-gray-400"}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

export function FadeInView({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

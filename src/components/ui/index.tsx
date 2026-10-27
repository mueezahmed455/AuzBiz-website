"use client";

import { motion } from "framer-motion";
import React, { ReactNode } from "react";

// ── Section header ──────────────────────────────────────────────────────────

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  center = false,
  className = "",
  light = false,
}: SectionHeaderProps) {
  const accent = light ? "text-amber-400" : "text-amber-600 dark:text-amber-400";
  const titleColor = light ? "text-white" : "text-foreground";
  const descColor = light ? "text-white/60" : "text-muted-foreground";

  return (
    <div className={`mb-10 ${center ? "text-center mx-auto max-w-3xl" : ""} ${className}`}>
      {eyebrow && (
        <span className={`inline-block text-[11px] font-semibold tracking-[0.22em] uppercase mb-3 block ${accent}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg ${descColor} leading-relaxed max-w-xl`}>
          {description}
        </p>
      )}
    </div>
  );
}

// ── Reveal utilities ────────────────────────────────────────────────────────

interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeInView({ children, className = "", delay = 0 }: FadeInViewProps) {
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

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerChildren({
  children,
  className = "",
  staggerDelay = 0.08,
}: StaggerChildrenProps) {
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

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
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

// ── Card ────────────────────────────────────────────────────────────────────

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
}: CardProps) {
  const padClasses: Record<string, string> = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={[
        "rounded-2xl bg-card border border-card-border transition-all duration-300",
        hover ? "hover-card" : "",
        padClasses[padding],
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}
export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={["flex flex-col space-y-1.5 pb-4", className].join(" ")}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}
export function CardTitle({ children, className = "" }: CardTitleProps) {
  return (
    <h3 className={["text-lg font-semibold text-foreground mb-1", className].join(" ")}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}
export function CardDescription({ children, className = "" }: CardDescriptionProps) {
  return (
    <p className={["text-sm text-muted-foreground leading-relaxed", className].join(" ")}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}
export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={className}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}
export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={["mt-6 flex items-center gap-2 pt-4 border-t border-card-border", className].join(" ")}>
      {children}
    </div>
  );
}

// ── Form controls ───────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className = "", ...props }, ref) {
    return (
      <input
        ref={ref}
        className={[
          "flex h-11 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        ].join(" ")}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}
export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={[
        "flex w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}
export function Select({ className = "", ...props }: SelectProps) {
  return (
    <select
      className={[
        "flex h-11 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}
export function Label({ className = "", ...props }: LabelProps) {
  return (
    <label
      className={["text-sm font-medium text-foreground mb-1.5 block", className].join(" ")}
      {...props}
    />
  );
}

interface BadgeProps {
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
  children: ReactNode;
}
export function Badge({
  variant = "default",
  className = "",
  children,
}: BadgeProps) {
  const variants: Record<string, string> = {
    default: "bg-slate-900 text-white dark:bg-white dark:text-slate-900",
    secondary: "bg-surface text-foreground border border-border",
    destructive: "bg-red-600 text-red-600/10 text-red-600 border border-red-600/20",
    outline: "border border-border bg-transparent text-foreground",
  };
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border",
        "transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
        variants[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}
export function Divider({
  className = "",
  orientation = "horizontal",
}: DividerProps) {
  return (
    <div
      className={[
        orientation === "horizontal"
          ? "relative w-full flex items-center border-t border-border"
          : "relative h-full flex items-center border-l border-border",
        className,
      ].join(" ")}
    />
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

interface SkeletonProps {
  className?: string;
  variant?: "text" | "text-lg" | "circle" | "card";
}
export function Skeleton({ className = "", variant = "text" }: SkeletonProps) {
  const base = variant === "card"
    ? "rounded-2xl bg-card border border-card-border animate-shimmer-bar"
    : variant === "circle"
      ? "w-10 h-10 rounded-full skeleton-circle"
      : variant === "text-lg"
        ? "h-[1.125rem] rounded skeleton-text-lg"
        : "h-[0.875rem] rounded skeleton-text";

  return <div className={`${base} ${className}`} />;
}

// ── Skip link (accessibility) ─────────────────────────────────────────────────

export function SkipLink({ href = "#main-content", label = "Skip to main content" }: { href?: string; label?: string }) {
  return (
    <a href={href} className="skip-link">
      {label}
    </a>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────

interface ToastProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  action?: ReactNode;
}
export function Toast({ open, onClose, title, description, action }: ToastProps) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 right-6 z-50 w-full max-w-md flex items-start gap-3 rounded-2xl bg-card border border-card-border shadow-xl p-4 dark:border-white/5"
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-50 dark:bg-amber-500/10 shrink-0">
        <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">{title}</h4>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <button onClick={onClose} className="text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline">
          {action}
        </button>
      )}
      <button
        onClick={onClose}
        className="w-6 h-6 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-surface dark:hover:bg-white/5 transition-colors"
        aria-label="Dismiss"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}


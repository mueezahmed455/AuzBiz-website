"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  target?: string;
  rel?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-sm",
  secondary: "bg-surface text-foreground hover:bg-card-hover dark:bg-slate-800 dark:hover:bg-slate-700 border border-transparent",
  outline: "border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground dark:border-border dark:text-foreground dark:hover:bg-accent dark:hover:text-accent-foreground",
  ghost: "text-foreground hover:bg-accent hover:text-accent-foreground dark:text-foreground dark:hover:bg-accent dark:hover:text-accent-foreground",
  destructive: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 shadow-sm",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-8 py-3.5 text-base gap-2",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  target,
  rel,
  icon: Icon,
  iconPosition = "left",
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-[0.97]",
    "disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  const content = (
    <>
      {loading && (
        <span className="flex items-center gap-1">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </span>
      )}
      {Icon && iconPosition === "left" && !loading && (
        <Icon size={size === "sm" ? 14 : size === "lg" ? 20 : 16} strokeWidth={2} />
      )}
      {children}
      {Icon && iconPosition === "right" && !loading && (
        <Icon size={size === "sm" ? 14 : size === "lg" ? 20 : 16} strokeWidth={2} />
      )}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("https://wa.me");
    return (
      <Link
        href={href}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        className={classes}
        onClick={onClick}
        aria-disabled={disabled || loading}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {content}
    </button>
  );
}

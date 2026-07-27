"use client";

import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "whatsapp" | "outline";
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
  target?: string;
  rel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-800 text-gold-500 hover:bg-navy-700 dark:bg-gold-500 dark:text-navy-800 dark:hover:bg-gold-400",
  secondary:
    "bg-transparent border-2 border-white/30 text-white hover:border-gold-500 hover:text-gold-500",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#20bd5a]",
  outline:
    "bg-transparent border-2 border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-gold-500 dark:border-gold-500 dark:text-gold-500 dark:hover:bg-gold-500 dark:hover:text-navy-800",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-sm",
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
  target,
  rel,
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 active:scale-[0.97] hover:shadow-lg hover:shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={classes}
        onClick={onClick}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}

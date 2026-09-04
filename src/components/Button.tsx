"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "whatsapp" | "outline" | "gold";
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
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-800 text-gold-500 hover:bg-navy-700 dark:bg-gold-500 dark:text-navy-800 dark:hover:bg-gold-400 shadow-sm",
  secondary:
    "bg-transparent border border-white/25 text-white hover:border-gold-500 hover:text-gold-500 hover:bg-white/5",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-sm shadow-[#25D366]/25",
  outline:
    "bg-transparent border border-navy-800/20 text-navy-800 hover:border-navy-800 hover:bg-navy-800 hover:text-gold-500 dark:border-gold-500/40 dark:text-gold-500 dark:hover:bg-gold-500 dark:hover:text-navy-800",
  gold:
    "bg-gold-500 text-navy-800 hover:bg-gold-400 shadow-sm shadow-gold-500/20",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-xs gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-sm gap-2",
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
  icon: Icon,
  iconPosition = "left",
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200",
    "active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon size={size === "sm" ? 14 : 16} strokeWidth={2.2} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={size === "sm" ? 14 : 16} strokeWidth={2.2} />}
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
        aria-disabled={disabled}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}

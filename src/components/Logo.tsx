"use client";

import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "light" | "dark" | "auto";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
};

const heights = { sm: 36, md: 44, lg: 56 };

export default function Logo({
  variant = "light",
  size = "md",
  href = "/",
  className = "",
}: LogoProps) {
  const h = heights[size];
  const onDark = variant === "light";

  const inner = (
    <span
      className={`inline-flex items-center ${className}`}
      style={
        onDark
          ? {
              background: "rgba(255,255,255,0.96)",
              borderRadius: 10,
              padding: "6px 10px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
            }
          : undefined
      }
    >
      <Image
        src="/logo.svg"
        alt="AUZBIZ Group — Dream Beyond Borders"
        width={Math.round(h * 2.4)}
        height={h}
        className="object-contain"
        style={{ height: h, width: "auto", maxWidth: size === "sm" ? 120 : size === "md" ? 150 : 190 }}
        priority
        unoptimized
      />
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg"
      >
        {inner}
      </Link>
    );
  }
  return inner;
}

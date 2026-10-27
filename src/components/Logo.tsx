"use client";

import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  /**
   * `dark`  — dark wordmark for light backgrounds.
   * `light` — light wordmark for dark backgrounds.
   * `auto`  — switches with the site theme.
   */
  variant?: "light" | "dark" | "auto";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
};

const heights = { sm: 36, md: 44, lg: 56 };
const maxWidths = { sm: 130, md: 160, lg: 200 };

export default function Logo({
  variant = "auto",
  size = "md",
  href = "/",
  className = "",
}: LogoProps) {
  const h = heights[size];
  const maxWidth = maxWidths[size];

  const mark = (src: string, extraClass = "") => (
    <Image
      src={src}
      alt="AUZBIZ Group — Dream Beyond Borders"
      width={Math.round(h * 2.4)}
      height={h}
      className={`object-contain ${extraClass}`}
      style={{ height: h, width: "auto", maxWidth }}
      priority
      unoptimized
    />
  );

  const inner = (
    <span className={`inline-flex items-center ${className}`}>
      {variant === "auto" ? (
        <>
          {mark("/logo.svg", "dark:hidden")}
          {mark("/logo-dark.svg", "hidden dark:block")}
        </>
      ) : (
        mark(variant === "light" ? "/logo-dark.svg" : "/logo.svg")
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {inner}
      </Link>
    );
  }
  return inner;
}

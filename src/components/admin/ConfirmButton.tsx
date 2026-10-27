"use client";

import type { ReactNode } from "react";

export default function ConfirmButton({
  children,
  message,
  className = "",
  label,
}: {
  children: ReactNode;
  message: string;
  className?: string;
  /** Accessible name for icon-only buttons. */
  label?: string;
}) {
  return (
    <button
      type="submit"
      aria-label={label}
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * Lightweight CSS hero background by default.
 * Optionally loads 3D globe only on large screens with WebGL support.
 * Prevents blank-page / laptop crashes from Three.js.
 */
const CityGlobe = dynamic(() => import("@/components/3d/CityGlobe"), {
  ssr: false,
  loading: () => null,
});

function hasWebGL(): boolean {
  try {
    if (typeof window === "undefined") return false;
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export default function SafeHeroBackground({
  enable3D = true,
}: {
  enable3D?: boolean;
}) {
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    if (!enable3D) return;
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isWide = window.matchMedia("(min-width: 1024px)").matches;
    if (!prefersReduced && isWide && hasWebGL()) {
      const t = window.setTimeout(() => setShow3D(true), 800);
      return () => clearTimeout(t);
    }
  }, [enable3D]);

  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gold-500/5 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-white/[0.03] blur-2xl" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(1.5px 1.5px at 20% 30%, rgba(212,175,55,0.5), transparent), radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.4), transparent), radial-gradient(1.5px 1.5px at 80% 60%, rgba(212,175,55,0.35), transparent), radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 10% 80%, rgba(212,175,55,0.25), transparent)",
            backgroundSize: "100% 100%",
          }}
        />
      </div>

      {show3D && (
        <div className="absolute right-0 top-0 w-3/5 h-full hidden lg:block pointer-events-none">
          <CityGlobe />
        </div>
      )}
    </>
  );
}

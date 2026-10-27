"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

export default function Gallery({
  images,
  label = "Group tour photo",
}: {
  images: string[];
  label?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(() => {
    setIndex((current) => (current === null ? null : (current + 1) % images.length));
  }, [images.length]);
  const previous = useCallback(() => {
    setIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (index === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, next, previous]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, imageIndex) => (
          <button
            key={image}
            type="button"
            onClick={() => setIndex(imageIndex)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface"
            aria-label={`Open ${label} ${imageIndex + 1}`}
          >
            <Image
              src={image}
              alt={`${label} ${imageIndex + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-slate-950/0 text-white opacity-0 transition-all duration-300 group-hover:bg-slate-950/30 group-hover:opacity-100">
              <Expand size={20} />
            </span>
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} viewer`}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <p className="text-xs font-medium text-white/60">
              {index + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={close}
              autoFocus
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close gallery"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative flex-1">
            <Image
              src={images[index]}
              alt={`${label} ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain p-3 sm:p-6"
              unoptimized
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previous}
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:left-5"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:right-5"
                  aria-label="Next photo"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          <p className="px-4 py-4 text-center text-xs text-white/60">
            Use arrow keys to browse · Esc to close
          </p>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { animate, utils } from "animejs";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeLeft" | "fadeRight" | "scaleUp" | "rotateIn";
  delay?: number;
  duration?: number;
  stagger?: number;
  easing?: string;
}

export default function ScrollReveal({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  duration = 800,
  stagger = 0,
  easing = "outExpo",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial state using anime.js v4 utils.set
    const initialStates: Record<string, Record<string, number>> = {
      fadeUp: { opacity: 0, translateY: 40 },
      fadeLeft: { opacity: 0, translateX: -40 },
      fadeRight: { opacity: 0, translateX: 40 },
      scaleUp: { opacity: 0, scale: 0.85 },
      rotateIn: { opacity: 0, rotate: -8, scale: 0.95 },
    };

    utils.set(el, initialStates[animation]);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = stagger > 0 ? Array.from(el.children) : el;

            // Build animation params based on animation type
            const params: Record<string, unknown> = {
              opacity: [0, 1],
              duration,
              ease: easing,
            };

            if (animation === "fadeUp") params.translateY = [40, 0];
            if (animation === "fadeLeft") params.translateX = [-40, 0];
            if (animation === "fadeRight") params.translateX = [40, 0];
            if (animation === "scaleUp") params.scale = [0.85, 1];
            if (animation === "rotateIn") {
              params.rotate = [-8, 0];
              params.scale = [0.95, 1];
            }

            if (stagger > 0) {
              params.delay = utils.stagger(stagger, { start: delay });
            } else {
              params.delay = delay;
            }

            animate(targets as HTMLElement, params);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "-40px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [animation, delay, duration, stagger, easing]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

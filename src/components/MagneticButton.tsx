"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { animate } from "animejs";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
  [key: string]: unknown;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as = "button",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    // Use anime.js v4 for smooth spring-back
    animate(el, {
      translateX: 0,
      translateY: 0,
      duration: 600,
      ease: "outElastic(1, .5)",
    });
    setPosition({ x: 0, y: 0 });
  };

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

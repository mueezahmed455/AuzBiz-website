"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cleanupFns = useRef<Array<() => void>>([]);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    cleanupFns.current.push(
      () => window.removeEventListener("mousemove", handleMouseMove),
      () => document.removeEventListener("mouseenter", handleMouseEnter),
      () => document.removeEventListener("mouseleave", handleMouseLeave)
    );

    // Detect hovering over interactive elements
    const hoverTargets = document.querySelectorAll(
      "a, button, [role='button'], input, select, textarea, .magnetic"
    );
    const enterHandlers: Array<() => void> = [];
    hoverTargets.forEach((el) => {
      const onEnter = () => setIsHovering(true);
      const onLeave = () => setIsHovering(false);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      enterHandlers.push(
        () => el.removeEventListener("mouseenter", onEnter),
        () => el.removeEventListener("mouseleave", onLeave)
      );
    });
    cleanupFns.current.push(...enterHandlers);

    return () => {
      cleanupFns.current.forEach((fn) => fn());
      cleanupFns.current = [];
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main glow */}
      <motion.div
        className="fixed pointer-events-none z-[9998] mix-blend-screen"
        animate={{
          x: position.x - (isHovering ? 24 : 16),
          y: position.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      {/* Trailing glow */}
      <motion.div
        className="fixed pointer-events-none z-[9997]"
        animate={{
          x: position.x - 80,
          y: position.y - 80,
          opacity: isVisible ? 0.15 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 1,
        }}
        style={{
          width: 160,
          height: 160,
          background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
    </>
  );
}

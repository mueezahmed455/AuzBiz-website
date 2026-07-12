"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
  scale?: number;
}

export default function TiltCard({
  children,
  className = "",
  tiltAmount = 8,
  glareEnabled = true,
  scale = 1.02,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -tiltAmount);
    setRotateY(((x - centerX) / centerX) * tiltAmount);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div ref={ref} className={`perspective-[800px] ${className}`}>
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? scale : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        {glareEnabled && isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-10 rounded-xl"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(212,175,55,0.12) 0%, transparent 60%)`,
            }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
  colorIdx: number;
}

/** Safe 2D canvas particles — skipped on mobile / reduced-motion / failures */
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (reduced || isMobile) return;
      setEnabled(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let alive = true;
    const particles: Particle[] = [];
    const count = 48;
    const particleColors = [
      () => `rgba(212, 175, 55, `,
      () => `rgba(255, 255, 255, `,
      () => `rgba(100, 149, 237, `,
    ];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 400,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          vz: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.45 + 0.1,
          colorIdx: Math.floor(Math.random() * particleColors.length),
        });
      }
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    try {
      resize();
      createParticles();
      window.addEventListener("resize", resize, { passive: true });
      window.addEventListener("mousemove", onMouse, { passive: true });

      const animate = () => {
        if (!alive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const m = mouseRef.current;
        m.x += (m.targetX - m.x) * 0.08;
        m.y += (m.targetY - m.y) * 0.08;
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          if (p.z < 0 || p.z > 400) p.vz *= -1;
          const scale = 0.5 + (p.z / 400) * 0.5;
          const size = p.size * scale;
          const colorFn = particleColors[p.colorIdx];
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `${colorFn()}${p.opacity * scale})`;
          ctx.fill();
        }
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
    } catch {
      /* fail silent */
    }

    return () => {
      alive = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

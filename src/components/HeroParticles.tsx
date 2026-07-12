"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const count = 120;
    const particleColors = [
      () => `rgba(212, 175, 55, `,  // gold
      () => `rgba(255, 255, 255, `,  // white
      () => `rgba(100, 149, 237, `,  // cornflower blue
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
        const colorIdx = Math.floor(Math.random() * particleColors.length);
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 400,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          vz: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 3 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          colorIdx,
        } as Particle & { colorIdx: number });
      }
    };

    resize();
    createParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse tracking
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.08;
      m.y += (m.targetY - m.y) * 0.08;

      // Draw ambient glow
      const glow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.6
      );
      glow.addColorStop(0, "rgba(212, 175, 55, 0.03)");
      glow.addColorStop(0.5, "rgba(26, 42, 108, 0.02)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pColor = p as Particle & { colorIdx: number };
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Mouse repulsion
        const dx = p.x - m.x;
        const dy = p.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180 * 1.2;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Wrap
        const margin = 40;
        if (p.x < -margin) p.x = canvas.width + margin;
        if (p.x > canvas.width + margin) p.x = -margin;
        if (p.y < -margin) p.y = canvas.height + margin;
        if (p.y > canvas.height + margin) p.y = -margin;
        if (p.z < 0) p.z = 400;
        if (p.z > 400) p.z = 0;

        // 3D projection
        const perspective = 300;
        const scale = perspective / (perspective + p.z);
        const px = canvas.width / 2 + (p.x - canvas.width / 2) * scale;
        const py = canvas.height / 2 + (p.y - canvas.height / 2) * scale;
        const pSize = p.size * scale;

        // Glow effect for larger particles
        if (pSize > 1.5) {
          ctx.beginPath();
          ctx.arc(px, py, pSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${0.04 * scale})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        const colorFn = particleColors[pColor.colorIdx];
        ctx.fillStyle = `${colorFn()}${p.opacity * scale})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ddx = p.x - p2.x;
          const ddy = p.y - p2.y;
          const ddz = p.z - p2.z;
          const d = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);

          if (d < 120) {
            const p2Scale = perspective / (perspective + p2.z);
            const p2x = canvas.width / 2 + (p2.x - canvas.width / 2) * p2Scale;
            const p2y = canvas.height / 2 + (p2.y - canvas.height / 2) * p2Scale;

            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(p2x, p2y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.08 * (1 - d / 120) * scale})`;
            ctx.lineWidth = 0.4 * scale;
            ctx.stroke();
          }
        }
      }

      // Draw occasional shooting stars
      const t = Date.now() * 0.001;
      if (Math.sin(t * 0.3) > 0.95) {
        const sx = ((t * 50) % (canvas.width + 200)) - 100;
        const sy = ((t * 50 * 0.3) % (canvas.height * 0.5)) + 50;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx - 40, sy - 20);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    animate();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ opacity: 1, cursor: "default" }}
    />
  );
}

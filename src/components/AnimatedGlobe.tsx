"use client";

import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function AnimatedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let rotationY = 0;
    const rotationX = 0.3;
    const radius = 120;
    const points: Point3D[] = [];
    const connections: [number, number][] = [];

    // Generate globe points (latitude/longitude grid)
    const latLines = 12;
    const lonLines = 18;

    for (let lat = 0; lat <= latLines; lat++) {
      const theta = (lat / latLines) * Math.PI;
      for (let lon = 0; lon < lonLines; lon++) {
        const phi = (lon / lonLines) * Math.PI * 2;
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.cos(theta);
        const z = radius * Math.sin(theta) * Math.sin(phi);
        points.push({ x, y, z });
      }
    }

    // Generate connections
    for (let lat = 0; lat <= latLines; lat++) {
      for (let lon = 0; lon < lonLines; lon++) {
        const idx = lat * lonLines + lon;
        const nextLon = lat * lonLines + ((lon + 1) % lonLines);
        connections.push([idx, nextLon]);

        if (lat < latLines) {
          const nextLat = (lat + 1) * lonLines + lon;
          connections.push([idx, nextLat]);
        }
      }
    }

    // Add some "city" highlight points
    const cities = [
      { lat: 31.5, lon: 74.3 },   // Lahore
      { lat: 21.4, lon: 39.8 },   // Makkah
      { lat: 41.3, lon: 69.3 },   // Tashkent
      { lat: 13.7, lon: 100.5 },  // Bangkok
      { lat: 41.0, lon: 28.9 },   // Istanbul
      { lat: 3.1, lon: 101.7 },   // KL
    ];

    const project = (point: Point3D): { x: number; y: number; scale: number } => {
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);

      const x = point.x * cosY - point.z * sinY;
      const z = point.x * sinY + point.z * cosY;
      const y = point.y * cosX - z * sinX;
      const z2 = point.y * sinX + z * cosX;

      const scale = (z2 + radius * 2) / (radius * 3);
      return {
        x: canvas.width / 2 + x * scale,
        y: canvas.height / 2 + y * scale,
        scale,
      };
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotationY += 0.003;

      // Draw connections
      for (const [i, j] of connections) {
        const p1 = project(points[i]);
        const p2 = project(points[j]);
        const avgScale = (p1.scale + p2.scale) / 2;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(212, 175, 55, ${avgScale * 0.15})`;
        ctx.lineWidth = avgScale * 0.8;
        ctx.stroke();
      }

      // Draw points
      for (const point of points) {
        const p = project(point);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.scale * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.scale * 0.4})`;
        ctx.fill();
      }

      // Draw city markers
      for (const city of cities) {
        const theta = ((90 - city.lat) / 180) * Math.PI;
        const phi = (city.lon / 180) * Math.PI;
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.cos(theta);
        const z = radius * Math.sin(theta) * Math.sin(phi);

        const p = project({ x, y, z });
        if (p.scale > 0.4) {
          // Glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.scale * 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${p.scale * 0.15})`;
          ctx.fill();

          // Dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.scale * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${p.scale * 0.8})`;
          ctx.fill();
        }
      }

      // Draw ring
      ctx.beginPath();
      ctx.ellipse(
        canvas.width / 2,
        canvas.height / 2,
        radius * 1.3,
        radius * 0.3,
        rotationX,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = "rgba(212, 175, 55, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

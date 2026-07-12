"use client";

import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function EnhancedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let rotationY = 0;
    const rotationX = 0.4;
    const radius = 220;
    const points: Point3D[] = [];
    const connections: [number, number][] = [];

    // Globe grid (higher density for sharper look)
    const latLines = 20;
    const lonLines = 30;
    for (let lat = 0; lat <= latLines; lat++) {
      const theta = (lat / latLines) * Math.PI;
      for (let lon = 0; lon < lonLines; lon++) {
        const phi = (lon / lonLines) * Math.PI * 2;
        points.push({
          x: radius * Math.sin(theta) * Math.cos(phi),
          y: radius * Math.cos(theta),
          z: radius * Math.sin(theta) * Math.sin(phi),
        });
      }
    }
    for (let lat = 0; lat <= latLines; lat++) {
      for (let lon = 0; lon < lonLines; lon++) {
        const idx = lat * lonLines + lon;
        connections.push([idx, lat * lonLines + ((lon + 1) % lonLines)]);
        if (lat < latLines) connections.push([idx, (lat + 1) * lonLines + lon]);
      }
    }

    // Cities with accurate real-world coordinates
    const cities: { lat: number; lon: number; name: string }[] = [
      { lat: 31.55, lon: 74.35, name: "Lahore" },
      { lat: 21.39, lon: 39.83, name: "Makkah" },
      { lat: 24.47, lon: 39.61, name: "Madinah" },
      { lat: 41.30, lon: 69.28, name: "Tashkent" },
      { lat: 39.65, lon: 66.96, name: "Samarkand" },
      { lat: 13.76, lon: 100.50, name: "Bangkok" },
      { lat: 7.88, lon: 98.39, name: "Phuket" },
      { lat: 41.01, lon: 28.98, name: "Istanbul" },
      { lat: 3.14, lon: 101.69, name: "Kuala Lumpur" },
      { lat: 35.68, lon: 139.69, name: "Tokyo" },
      { lat: 51.51, lon: -0.13, name: "London" },
      { lat: 25.20, lon: 55.27, name: "Dubai" },
      { lat: 34.05, lon: -118.24, name: "Los Angeles" },
      { lat: 40.71, lon: -74.01, name: "New York" },
      { lat: 48.86, lon: 2.35, name: "Paris" },
      { lat: 27.20, lon: 77.50, name: "Agra" },
      { lat: 28.61, lon: 77.23, name: "Delhi" },
      { lat: 24.86, lon: 67.01, name: "Karachi" },
      { lat: 33.68, lon: 73.06, name: "Islamabad" },
      { lat: 34.02, lon: 71.55, name: "Peshawar" },
    ];

    // Flight routes (city index pairs)
    const routes: [number, number][] = [
      [0, 1], [0, 2], [0, 3], [0, 5], [0, 7], [0, 11], [0, 16], [0, 17], [0, 18], [0, 19],
      [1, 2], [1, 11], [3, 4], [5, 6], [5, 8],
      [7, 8], [7, 10], [7, 11], [8, 9], [9, 13], [10, 13],
      [11, 5], [11, 1], [11, 7], [11, 8],
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

    // Convert lat/lon to 3D sphere coordinates
    const latLonTo3D = (lat: number, lon: number): Point3D => {
      const theta = ((90 - lat) / 180) * Math.PI;
      const phi = (lon / 180) * Math.PI;
      return {
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.cos(theta),
        z: radius * Math.sin(theta) * Math.sin(phi),
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

      // Outer glow - more prominent
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, radius * 1.6
      );
      gradient.addColorStop(0, "rgba(212, 175, 55, 0.06)");
      gradient.addColorStop(0.4, "rgba(212, 175, 55, 0.03)");
      gradient.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid connections - sharper lines
      for (const [i, j] of connections) {
        const p1 = project(points[i]);
        const p2 = project(points[j]);
        const avgScale = (p1.scale + p2.scale) / 2;
        if (avgScale < 0.05) continue;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(212, 175, 55, ${avgScale * 0.15})`;
        ctx.lineWidth = avgScale * 0.7;
        ctx.stroke();
      }

      // Grid points - sharper
      for (const point of points) {
        const p = project(point);
        if (p.scale < 0.05) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.scale * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.scale * 0.35})`;
        ctx.fill();
      }

      // City markers with labels - bigger and more prominent
      for (const city of cities) {
        const pos = latLonTo3D(city.lat, city.lon);
        const p = project(pos);
        if (p.scale > 0.3) {
          // Outer glow ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.scale * 14, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${p.scale * 0.12})`;
          ctx.fill();
          // Medium pulse
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.scale * 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${p.scale * 0.6})`;
          ctx.fill();
          // Inner bright dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.scale * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${p.scale * 0.95})`;
          ctx.fill();
          // White core
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.scale * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.scale * 0.8})`;
          ctx.fill();
          // City name label
          if (p.scale > 0.55) {
            ctx.font = `bold ${Math.round(p.scale * 10 + 8)}px system-ui, sans-serif`;
            ctx.fillStyle = `rgba(255, 255, 255, ${p.scale * 0.85})`;
            ctx.textAlign = "center";
            ctx.fillText(city.name, p.x, p.y - p.scale * 16);
          }
        }
      }

      // Flight routes with animated dots
      const time = Date.now() * 0.001;
      for (const [from, to] of routes) {
        const c1 = cities[from];
        const c2 = cities[to];
        if (!c1 || !c2) continue;
        const p1 = project(latLonTo3D(c1.lat, c1.lon));
        const p2 = project(latLonTo3D(c2.lat, c2.lon));
        const avgS = (p1.scale + p2.scale) / 2;
        if (avgS < 0.3) continue;

        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2 - 25 * avgS;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
        ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * avgS})`;
        ctx.lineWidth = avgS * 1;
        ctx.setLineDash([4, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        const progress = (time * 0.1 + from * 0.3) % 1;
        const dotX =
          (1 - progress) * (1 - progress) * p1.x +
          2 * (1 - progress) * progress * midX +
          progress * progress * p2.x;
        const dotY =
          (1 - progress) * (1 - progress) * p1.y +
          2 * (1 - progress) * progress * midY +
          progress * progress * p2.y;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3 * avgS, 0, Math.PI * 2);
        const dotGlow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 6 * avgS);
        dotGlow.addColorStop(0, `rgba(212, 175, 55, ${0.9 * avgS})`);
        dotGlow.addColorStop(1, `rgba(212, 175, 55, 0)`);
        ctx.fillStyle = dotGlow;
        ctx.fill();
      }

      // Outer ring - cleaner
      ctx.beginPath();
      ctx.ellipse(
        canvas.width / 2,
        canvas.height / 2,
        radius * 1.3,
        radius * 0.35,
        rotationX,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = "rgba(212, 175, 55, 0.08)";
      ctx.lineWidth = 1.2;
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
      style={{ opacity: 0.95 }}
    />
  );
}

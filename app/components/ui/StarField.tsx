"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    const stars: Star[] = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      delay: Math.random() * 4000,
      duration: 2500 + Math.random() * 3000,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    let startTime = performance.now();
    let rafId: number;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        const elapsed = (now - startTime + star.delay) % star.duration;
        const t = elapsed / star.duration;
        const pulse = Math.sin(t * Math.PI * 2);
        const alpha = star.opacity + pulse * 0.25;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 176, 232, ${Math.max(0, Math.min(1, alpha))})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame((now) => {
      startTime = now;
      draw(now);
    });

    const handleResize = () => { setSize(); };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="stars-layer"
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

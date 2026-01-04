"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Smooth follow animation
    const animate = () => {
      const dx = targetRef.current.x - mouseRef.current.x;
      const dy = targetRef.current.y - mouseRef.current.y;
      
      mouseRef.current.x += dx * 0.1; // Smooth lerp
      mouseRef.current.y += dy * 0.1;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create highbeam spotlight effect
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        400
      );

      // Highbeam color - electric blue glow
      gradient.addColorStop(0, "rgba(0, 194, 255, 0.15)"); // Center bright
      gradient.addColorStop(0.3, "rgba(0, 194, 255, 0.08)");
      gradient.addColorStop(0.6, "rgba(0, 194, 255, 0.03)");
      gradient.addColorStop(1, "rgba(0, 194, 255, 0)"); // Fade out

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add secondary glow (like DRL accent)
      const secondaryGradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        200
      );

      secondaryGradient.addColorStop(0, "rgba(255, 184, 0, 0.1)"); // Amber accent
      secondaryGradient.addColorStop(0.5, "rgba(255, 184, 0, 0.05)");
      secondaryGradient.addColorStop(1, "rgba(255, 184, 0, 0)");

      ctx.fillStyle = secondaryGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

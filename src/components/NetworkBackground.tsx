"use client";

import { useEffect, useRef } from "react";

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouse = { x: -1000, y: -1000 };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const particleCount = 80;
    const connectionDistance = 120;
    const mouseInteractionRadius = 150;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      isThreat: boolean;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.isThreat = Math.random() < 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

        let currentOpacity = 0.15;
        if (distanceToMouse < mouseInteractionRadius) {
          currentOpacity =
            0.15 + (1 - distanceToMouse / mouseInteractionRadius) * 0.3;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);

        if (this.isThreat) {
          ctx.fillStyle = `rgba(239, 68, 68, ${currentOpacity})`;
        } else {
          ctx.fillStyle = `rgba(6, 182, 212, ${currentOpacity})`;
        }

        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            if (
              distance < 50 &&
              particles[i].isThreat !== particles[j].isThreat
            ) {
              particles[i].isThreat = false;
              particles[j].isThreat = false;
            }

            const avgX = (particles[i].x + particles[j].x) / 2;
            const avgY = (particles[i].y + particles[j].y) / 2;
            const distToMouse = Math.sqrt(
              Math.pow(mouse.x - avgX, 2) + Math.pow(mouse.y - avgY, 2),
            );

            let lineOpacity = 0.05;
            if (distToMouse < mouseInteractionRadius) {
              lineOpacity =
                0.05 + (1 - distToMouse / mouseInteractionRadius) * 0.15;
            }

            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineOpacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}

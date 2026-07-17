'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  hue: number; life: number; maxLife: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const createParticle = (x: number, y: number, isMouse: boolean): Particle => ({
      x: isMouse ? x + (Math.random() - 0.5) * 20 : Math.random() * canvas.width,
      y: isMouse ? y + (Math.random() - 0.5) * 20 : Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (isMouse ? 1.5 : 0.3),
      vy: isMouse ? -(Math.random() * 2 + 1) : -(Math.random() * 0.5 + 0.1),
      size: Math.random() * (isMouse ? 4 : 2.5) + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      hue: [340, 45, 260, 30][Math.floor(Math.random() * 4)],
      life: 0,
      maxLife: isMouse ? 60 + Math.random() * 40 : 200 + Math.random() * 300,
    });

    // Initial ambient particles
    for (let i = 0; i < 80; i++) {
      particles.push(createParticle(0, 0, false));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn mouse trail particles
      if (mouseX > 0 && mouseY > 0) {
        for (let i = 0; i < 2; i++) {
          particles.push(createParticle(mouseX, mouseY, true));
        }
      }

      // Spawn ambient particles
      if (particles.length < 120 && Math.random() > 0.9) {
        particles.push(createParticle(0, 0, false));
      }

      particles = particles.filter(p => p.life < p.maxLife);

      for (const p of particles) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.05;

        const lifeRatio = p.life / p.maxLife;
        const fade = lifeRatio < 0.1 ? lifeRatio * 10 : lifeRatio > 0.7 ? (1 - lifeRatio) / 0.3 : 1;
        const alpha = p.opacity * fade;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${alpha})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${alpha * 0.15})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

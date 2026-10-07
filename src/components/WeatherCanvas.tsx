import React, { useEffect, useRef } from 'react';

export type WeatherType = 'sakura' | 'rain' | 'snow' | 'mist' | 'clear';

export interface WeatherCanvasProps {
  weather: WeatherType;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  length: number;
  opacity: number;
  baseOpacity: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  swayPhase: number;
  swaySpeed: number;
  colorType: number;
}

interface Splash {
  x: number;
  y: number;
  rx: number;
  ry: number;
  opacity: number;
  maxRx: number;
}

export const WeatherCanvas: React.FC<WeatherCanvasProps> = ({ weather, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Color palettes
    const petalColors = [
      'rgba(224, 35, 28, ',   // Kage Vermilion (#e0231c)
      'rgba(235, 75, 70, ',   // Warm red-rose
      'rgba(255, 160, 175, ', // Kyoto sakura blush
      'rgba(180, 25, 20, ',   // Deep lacquer red
      'rgba(255, 190, 200, ', // Delicate cherry bloom
    ];

    let particles: Particle[] = [];
    let splashes: Splash[] = [];
    let windTime = 0;

    const initParticles = () => {
      particles = [];
      splashes = [];

      if (weather === 'clear') return;

      const area = width * height;

      if (weather === 'sakura') {
        const count = Math.min(42, Math.max(18, Math.floor(area / 26000)));
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0.3 + Math.random() * 0.9,
            vy: 0.6 + Math.random() * 1.1,
            size: 9 + Math.random() * 8,
            length: 0,
            opacity: 0.25 + Math.random() * 0.45,
            baseOpacity: 0.25 + Math.random() * 0.45,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            flip: Math.random() * Math.PI,
            flipSpeed: 0.015 + Math.random() * 0.02,
            swayPhase: Math.random() * Math.PI * 2,
            swaySpeed: 0.01 + Math.random() * 0.02,
            colorType: Math.floor(Math.random() * petalColors.length),
          });
        }
      } else if (weather === 'rain') {
        const count = Math.min(95, Math.max(35, Math.floor(area / 14000)));
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * (width + 100) - 50,
            y: Math.random() * height,
            vx: -1.2 + (Math.random() - 0.5) * 0.4,
            vy: 14 + Math.random() * 9,
            size: 1 + Math.random() * 1.2,
            length: 18 + Math.random() * 18,
            opacity: 0.22 + Math.random() * 0.35,
            baseOpacity: 0.22 + Math.random() * 0.35,
            rotation: 0,
            rotationSpeed: 0,
            flip: 0,
            flipSpeed: 0,
            swayPhase: 0,
            swaySpeed: 0,
            colorType: 0,
          });
        }
      } else if (weather === 'snow') {
        const count = Math.min(65, Math.max(25, Math.floor(area / 18000)));
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: 0.7 + Math.random() * 1.3,
            size: 2 + Math.random() * 4.5,
            length: 0,
            opacity: 0.35 + Math.random() * 0.45,
            baseOpacity: 0.35 + Math.random() * 0.45,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.015,
            flip: 0,
            flipSpeed: 0,
            swayPhase: Math.random() * Math.PI * 2,
            swaySpeed: 0.012 + Math.random() * 0.02,
            colorType: 0,
          });
        }
      } else if (weather === 'mist') {
        const count = Math.min(16, Math.max(8, Math.floor(area / 75000)));
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0.15 + Math.random() * 0.35,
            vy: (Math.random() - 0.5) * 0.12,
            size: 140 + Math.random() * 180,
            length: 0,
            opacity: 0.4 + Math.random() * 0.4,
            baseOpacity: 0.4 + Math.random() * 0.4,
            rotation: 0,
            rotationSpeed: 0,
            flip: 0,
            flipSpeed: 0,
            swayPhase: Math.random() * Math.PI * 2,
            swaySpeed: 0.005 + Math.random() * 0.008,
            colorType: i % 3, // alternate subtle vermilion tint
          });
        }
      }
    };

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (weather === 'clear') {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      windTime += 0.008;
      const globalWind = Math.sin(windTime) * 0.6 + 0.4;

      if (weather === 'sakura') {
        // --- SAKURA PETALS ---
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y += p.vy;
          p.x += p.vx + globalWind * 0.8;
          p.rotation += p.rotationSpeed;
          p.flip += p.flipSpeed;

          if (p.y > height + 25) {
            p.y = -25;
            p.x = Math.random() * (width + 100) - 50;
          }
          if (p.x > width + 30) {
            p.x = -30;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.scale(1, Math.sin(p.flip));

          const baseColor = petalColors[p.colorType];
          ctx.fillStyle = `${baseColor}${p.opacity})`;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(
            -p.size * 0.45,
            -p.size * 0.5,
            -p.size * 0.55,
            -p.size * 0.9,
            0,
            -p.size * 1.1
          );
          ctx.bezierCurveTo(
            p.size * 0.55,
            -p.size * 0.9,
            p.size * 0.45,
            -p.size * 0.5,
            0,
            0
          );
          ctx.fill();
          ctx.restore();
        }
      } else if (weather === 'rain') {
        // --- TEMPLE LIGHT RAIN & SPLASHES ---
        // Render rain streaks
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y += p.vy;
          p.x += p.vx + globalWind * 0.3;

          // If reached bottom, occasionally spawn ripple
          if (p.y > height) {
            if (Math.random() < 0.28) {
              splashes.push({
                x: p.x,
                y: height - Math.random() * 25,
                rx: 1,
                ry: 0.4,
                opacity: 0.35,
                maxRx: 12 + Math.random() * 8,
              });
            }
            p.y = -p.length - Math.random() * 40;
            p.x = Math.random() * (width + 120) - 60;
          }

          const grad = ctx.createLinearGradient(p.x, p.y, p.x + p.vx * 3, p.y + p.length);
          grad.addColorStop(0, 'rgba(215, 230, 245, 0)');
          grad.addColorStop(0.6, `rgba(225, 238, 250, ${p.opacity * 0.7})`);
          grad.addColorStop(1, `rgba(240, 248, 255, ${p.opacity})`);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 2.5, p.y + p.length);
          ctx.stroke();
        }

        // Render expanding ripple splashes
        for (let j = splashes.length - 1; j >= 0; j--) {
          const sp = splashes[j];
          sp.rx += 0.55;
          sp.ry += 0.22;
          sp.opacity -= 0.016;

          if (sp.opacity <= 0 || sp.rx >= sp.maxRx) {
            splashes.splice(j, 1);
            continue;
          }

          ctx.strokeStyle = `rgba(224, 235, 248, ${sp.opacity * 0.45})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.ellipse(sp.x, sp.y, sp.rx, sp.ry, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (weather === 'snow') {
        // --- FALLING TEMPLE SNOW ---
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.swayPhase += p.swaySpeed;
          p.y += p.vy;
          p.x += Math.sin(p.swayPhase) * 0.8 + globalWind * 0.4;
          p.rotation += p.rotationSpeed;

          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;

          ctx.save();
          ctx.translate(p.x, p.y);

          // Soft crystalline snowflake
          if (p.size > 4) {
            // Larger flake with soft halo
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
            grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`);
            grad.addColorStop(0.4, `rgba(235, 245, 255, ${p.opacity * 0.7})`);
            grad.addColorStop(1, 'rgba(230, 240, 255, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Crisp gentle snow dot
            ctx.fillStyle = `rgba(240, 246, 255, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.75, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      } else if (weather === 'mist') {
        // --- SACRED TEMPLE MIST / ATMOSPHERIC FOG ---
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.swayPhase += p.swaySpeed;
          p.x += p.vx;
          p.y += Math.sin(p.swayPhase) * 0.25;

          if (p.x - p.size > width) {
            p.x = -p.size;
            p.y = Math.random() * height;
          }

          const breathing = 1 + Math.sin(p.swayPhase * 0.8) * 0.12;
          const currentSize = p.size * breathing;

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize);
          
          if (p.colorType === 0) {
            // Subtle lantern glow touch (warm vermilion reflection in fog)
            grad.addColorStop(0, `rgba(224, 35, 28, ${p.opacity * 0.06})`);
            grad.addColorStop(0.35, `rgba(230, 235, 240, ${p.opacity * 0.05})`);
            grad.addColorStop(0.7, `rgba(215, 225, 230, ${p.opacity * 0.02})`);
            grad.addColorStop(1, 'rgba(5, 7, 10, 0)');
          } else {
            // Pure temple mountain vapor
            grad.addColorStop(0, `rgba(235, 242, 248, ${p.opacity * 0.08})`);
            grad.addColorStop(0.4, `rgba(220, 230, 238, ${p.opacity * 0.04})`);
            grad.addColorStop(0.75, `rgba(200, 215, 225, ${p.opacity * 0.015})`);
            grad.addColorStop(1, 'rgba(5, 7, 10, 0)');
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [weather]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-20 w-full h-full ${className}`}
      style={{
        opacity: weather === 'clear' ? 0 : 0.88,
        mixBlendMode: weather === 'mist' ? 'screen' : 'screen',
        transition: 'opacity 0.6s ease',
      }}
      aria-hidden="true"
    />
  );
};

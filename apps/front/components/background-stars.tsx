'use client';
import { type HTMLAttributes, useEffect, useRef } from 'react';

interface Star {
  radius: number;
  pos: { x: number; y: number };
  moveTo: { x: number; y: number };
  bigger: boolean;
  speed: number;
}

export const BackgroundStars = (props: HTMLAttributes<HTMLCanvasElement>) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  let stars: Star[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const createStar = (): Star => {
      return {
        radius: Math.random() * (2 - 0.3) + 0.3,
        pos: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        },
        moveTo: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        },
        bigger: Math.random() < 0.5,
        speed: Math.random() * (canvas.width / canvas.height / 30),
      };
    };

    const createStars = () => {
      const baseDensity = 0.0001;
      const screenArea = canvas.width * canvas.height;
      const densityFactor = window.innerWidth < 768 ? 0.5 : 1;

      let numStars = Math.floor(screenArea * baseDensity * densityFactor);
      numStars = Math.max(50, Math.min(numStars, 500));

      stars = Array.from({ length: numStars }, () => createStar());
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const previousWidth = canvas.width;
      const previousHeight = canvas.height;

      canvas.width = rect.width;
      canvas.height = rect.height;

      stars.forEach(star => {
        star.pos.x = (star.pos.x / previousWidth) * canvas.width;
        star.pos.y = (star.pos.y / previousHeight) * canvas.height;
        star.moveTo.x = (star.moveTo.x / previousWidth) * canvas.width;
        star.moveTo.y = (star.moveTo.y / previousHeight) * canvas.height;
      });

      createStars();
    };
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
    };

    const drawStar = (star: Star) => {
      ctx.fillStyle = '#a1a1a1';
      ctx.beginPath();
      ctx.arc(star.pos.x, star.pos.y, star.radius, 0, Math.PI * 2);
      ctx.fill();

      if (star.bigger) {
        star.radius += 0.01;
        if (star.radius >= 2) star.bigger = false;
      } else {
        star.radius -= 0.01;
        if (star.radius <= 0.3) star.bigger = true;
      }
      if (
        star.moveTo.x >= star.pos.x - 10 &&
        star.moveTo.x <= star.pos.x + 10
      ) {
        star.moveTo.x = Math.random() * canvas.width;
      } else if (star.moveTo.x < star.pos.x) {
        star.pos.x -= star.speed;
      } else {
        star.pos.x += star.speed;
      }

      if (
        star.moveTo.y >= star.pos.y - 10 &&
        star.moveTo.y <= star.pos.y + 10
      ) {
        star.moveTo.y = Math.random() * canvas.height;
      } else if (star.moveTo.y < star.pos.y) {
        star.pos.y -= star.speed;
      } else {
        star.pos.y += star.speed;
      }

      starsRef.current.forEach(otherStar => {
        if (
          star !== otherStar &&
          Math.sqrt(
            (star.pos.x - otherStar.pos.x) ** 2 +
              (star.pos.y - otherStar.pos.y) ** 2,
          ) < 75
        ) {
          ctx.beginPath();
          ctx.moveTo(star.pos.x, star.pos.y);
          ctx.lineTo(otherStar.pos.x, otherStar.pos.y);
          ctx.strokeStyle = '#bbb';
          ctx.lineWidth = 0.025;
          ctx.stroke();
        }
      });

      const distanceX = mouseRef.current.x - star.pos.x;
      const distanceY = mouseRef.current.y - star.pos.y;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < 150) {
        ctx.beginPath();
        ctx.moveTo(star.pos.x, star.pos.y);
        ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 0.15;
        ctx.stroke();
      }

      stars.forEach(otherStar => {
        if (
          star !== otherStar &&
          Math.sqrt(
            (star.pos.x - otherStar.pos.x) ** 2 +
              (star.pos.y - otherStar.pos.y) ** 2,
          ) < 75
        ) {
          ctx.beginPath();
          ctx.moveTo(star.pos.x, star.pos.y);
          ctx.lineTo(otherStar.pos.x, otherStar.pos.y);
          ctx.strokeStyle = '#bbb';
          ctx.lineWidth = 0.025;
          ctx.stroke();
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(drawStar);
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

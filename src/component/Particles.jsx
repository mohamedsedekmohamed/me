import { useEffect, useRef } from "react";

const Particles = ({
  particleCount = 80,
  particleSpread = 12,
  speed = 0.08,
  particleColors = ["#60a5fa", "#818cf8", "#a78bfa", "#ffffff"],
  moveParticlesOnHover = true,
  particleHoverFactor = 1.5,
  alphaParticles = true,
  particleBaseSize = 120,
  sizeRandomness = 0.8,
  cameraDistance = 25,
  disableRotation = false,
  className = "",
}) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Create particles
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * cameraDistance,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      size: particleBaseSize * (1 - sizeRandomness * Math.random()),
      alpha: alphaParticles ? Math.random() * 0.7 + 0.3 : 1,
    }));

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left - width / 2,
        y: e.clientY - rect.top - height / 2,
      };
    };

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (!disableRotation) angle += speed * 0.1;

      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Hover repulsion
        if (moveParticlesOnHover) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            p.x += (dx / dist) * particleHoverFactor;
            p.y += (dy / dist) * particleHoverFactor;
          }
        }

        // Wrap around
        if (p.x > width / 2) p.x = -width / 2;
        if (p.x < -width / 2) p.x = width / 2;
        if (p.y > height / 2) p.y = -height / 2;
        if (p.y < -height / 2) p.y = height / 2;

        // Project 3D -> 2D
        const perspective = cameraDistance / (cameraDistance + p.z);
        const px = p.x * perspective + width / 2;
        const py = p.y * perspective + height / 2;
        const size = (p.size / 100) * perspective;

        ctx.beginPath();
        ctx.arc(px, py, Math.max(size, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * perspective;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [particleCount, particleSpread, speed, particleColors, moveParticlesOnHover, particleHoverFactor, alphaParticles, particleBaseSize, sizeRandomness, cameraDistance, disableRotation]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ display: "block" }}
    />
  );
};

export default Particles;

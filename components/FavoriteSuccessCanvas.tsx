"use client";
import { useEffect, useRef, useCallback } from "react";

type Props = {
  visible: boolean;
  onClose?: () => void;
  duration?: number;
  heartCount?: number;
};

export default function FavoriteSuccessCanvas({
  visible,
  onClose,
  duration = 3000,
  heartCount: count = 28,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const cancelledRef = useRef(false);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const { innerWidth: w, innerHeight: h } = window;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  useEffect(() => {
    if (!visible) return;
    cancelledRef.current = false;
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [visible, resize]);

  // Heart path centered at x,y size s
  function drawHeartPath(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    s: number
  ) {
    // s -> scale; draw heart with bezier curves
    const topCurveHeight = s * 0.3;
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.25);
    ctx.bezierCurveTo(
      x + s * 0.5,
      y - topCurveHeight,
      x + s * 1.2,
      y + s * 0.6,
      x,
      y + s * 1.3
    );
    ctx.bezierCurveTo(
      x - s * 1.2,
      y + s * 0.6,
      x - s * 0.5,
      y - topCurveHeight,
      x,
      y + s * 0.25
    );
    ctx.closePath();
  }

  // Particle type
  type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotate: number;
    spin: number;
    life: number; // 0..1
    delay: number; // ms before appearing
    alpha: number;
  };

  // spawn particles with small random velocity around center
  function createParticles(
    cx: number,
    cy: number,
    radius: number,
    n: number
  ): Particle[] {
    const colors = [
      "#FF5A8F",
      "#FF6B6B",
      "#FF8C94",
      "#FFB6C1",
      "#FF9A9E",
      "#FF4D6D",
      "#FF2D55",
      "#FFD166",
      "#F6864A",
      "#C9F38E",
    ];
    const particles: Particle[] = [];
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.5;
      const speed = 0.6 + Math.random() * 1.6;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 0.2 - Math.random() * 0.8;
      const size = 8 + Math.random() * 10;
      const rotate = Math.random() * Math.PI * 2;
      const spin = (Math.random() - 0.5) * 0.12;
      const delay = Math.random() * 220;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: cx + (Math.random() - 0.5) * radius * 0.4,
        y: cy + (Math.random() - 0.5) * radius * 0.4,
        vx,
        vy,
        size,
        color,
        rotate,
        spin,
        life: 0,
        delay,
        alpha: 1,
      });
    }
    return particles;
  }

  useEffect(() => {
    if (!visible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);
    const cx = w / 2;
    const cy = h / 2 - Math.min(80, h * 0.06);

    const bigHeartMaxSize = Math.min(160, Math.min(w, h) * 0.18); // responsive
    const bigHeartMinSize = bigHeartMaxSize * 0.6;

    const particles = createParticles(
      cx,
      cy - bigHeartMaxSize * 0.15,
      bigHeartMaxSize * 0.9,
      count
    );

    const start = performance.now();
    startRef.current = start;

    // phases:
    // 0 - grow in (0..growMs)
    // 1 - burst / float (growMs..duration - fadeMs)
    // 2 - fade out (last fadeMs)
    const growMs = Math.min(350, duration * 0.25);
    const fadeMs = Math.min(450, duration * 0.3);
    const sustainMs = Math.max(0, duration - growMs - fadeMs);

    function drawFrame(now: number) {
      if (!ctx) return;
      if (cancelledRef.current) {
        // clear and return
        ctx.clearRect(0, 0, w, h);
        onClose?.();
        return;
      }

      const t = now - start;
      // clear
      ctx.clearRect(0, 0, w, h);

      // global fade depending on end phase
      let globalAlpha = 1;
      if (t >= growMs + sustainMs) {
        const fadeT = Math.min(1, (t - (growMs + sustainMs)) / fadeMs);
        globalAlpha = 1 - fadeT;
      }

      ctx.save();
      ctx.globalAlpha = globalAlpha;

      // background overlay soft radial glow (subtle)
      const grd = ctx.createRadialGradient(
        cx,
        cy,
        10,
        cx,
        cy,
        Math.max(w, h) * 0.8
      );
      grd.addColorStop(0, "rgba(255, 100, 120, 0.06)");
      grd.addColorStop(1, "rgba(255, 100, 120, 0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // big heart scale interpolation
      const growProgress = Math.min(1, Math.max(0, t / growMs));
      // ease out elastic-ish small bounce
      const easeOutBack = (p: number) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
      };
      const bigScale = growProgress < 1 ? easeOutBack(growProgress) : 1;

      const bigSize =
        bigHeartMinSize + (bigHeartMaxSize - bigHeartMinSize) * bigScale;

      // draw big heart (red)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.sin(t / 400) * 0.02); // subtle wobble
      ctx.translate(-cx, -cy);
      ctx.fillStyle = "#FF2D55";
      ctx.strokeStyle = "rgba(0,0,0,0.08)";
      ctx.lineWidth = 1;
      drawHeartPath(ctx, cx, cy - bigSize * 0.22, bigSize);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // spawn & animate particles (small hearts)
      for (const p of particles) {
        if (t < p.delay) continue;
        const pt = (t - p.delay) / duration;
        // life is 0..1 based on time relative to total
        const lifeDuration = duration - p.delay;
        const life = Math.min(1, Math.max(0, (t - p.delay) / lifeDuration));
        // update position with some easing
        const drag = 0.995;
        // apply slight gravity upward bias already in vy
        p.vx *= drag;
        p.vy *= drag;
        p.x += p.vx * (1 + 0.4 * life);
        p.y += p.vy * (1 + 0.4 * life);
        p.rotate += p.spin;

        // alpha reduces as life approaches 1
        p.alpha = 1 - life * 0.9;

        ctx.save();
        ctx.globalAlpha = p.alpha * globalAlpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotate);
        // draw a small heart as filled path
        ctx.fillStyle = p.color;
        drawHeartPath(
          ctx,
          0,
          0,
          p.size * (0.85 + 0.3 * Math.sin(t / 200 + p.size))
        );
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();

      // end condition
      if (t >= duration) {
        // final clear / callback after small delay to let fade finish
        ctx.clearRect(0, 0, w, h);
        onClose?.();
        return;
      }

      rafRef.current = requestAnimationFrame(drawFrame);
    }

    rafRef.current = requestAnimationFrame(drawFrame);

    // safety: force end after duration + small buffer
    const finalTimeout = window.setTimeout(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      onClose?.();
    }, duration + 80);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.clearTimeout(finalTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, duration, count, onClose, resize]);

  useEffect(() => {
    if (!visible) return;
    const handler = () => {
      cancelledRef.current = true;
      // call onClose in animation loop
    };
    window.addEventListener("pointerdown", handler, { once: true });
    return () => {
      window.removeEventListener("pointerdown", handler);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-live="polite"
      role="status"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100vh",
          touchAction: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          pointerEvents: "none",
          width: "min(88vw, 640px)",
          textAlign: "center",
          marginTop: "40vh",
          visibility: "hidden",
        }}
      >
        <div
          style={{
            fontSize: "1.05rem",
            fontWeight: 600,
            color: "#111827",
            textShadow: "0 1px 0 rgba(255,255,255,0.6)",
            marginBottom: 6,
          }}
        >
          Item added to favorites{" "}
        </div>
      </div>
    </div>
  );
}

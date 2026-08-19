import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface LoadingSequenceProps {
  onComplete: () => void;
}

export default function LoadingSequence({ onComplete }: LoadingSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const steps = [
    "INITIALIZING COGNITIVE SERVICES...",
    "ESTABLISHING SECURE NAIROBI & LAGOS ENCLAVES...",
    "MOUNTING SAP BUSINESS ONE INTEGRATION MIDDLEWARE...",
    "SYNCHRONIZING MULTI-DEPOT WMS LEDGERS...",
    "CALIBRATING AI DECISION ENGINE...",
    "SYSTEM SECURE. BOOTING EXECUTIVE CONSOLE..."
  ];

  // System logs typing cycle
  useEffect(() => {
    if (stepIndex < steps.length - 1) {
      const timer = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      const enterTimer = setTimeout(() => {
        setFadeOut(true);
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 800);
        return () => clearTimeout(completeTimer);
      }, 1000);
      return () => clearTimeout(enterTimer);
    }
  }, [stepIndex, onComplete]);

  // Digital particles on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle structure
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    const particleCount = 65;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle network lines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Motion update
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      // Animated central concentric rings to represent mainframe calibration
      ctx.strokeStyle = "rgba(226, 176, 66, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 160 + Math.sin(Date.now() / 400) * 10, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 100 - Math.sin(Date.now() / 500) * 8, 0, Math.PI * 2);
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      id="loading-portal"
      className="fixed inset-0 bg-[#040814] z-50 flex flex-col items-center justify-center text-white overflow-hidden"
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Central Identity Module */}
      <div className="relative z-10 flex flex-col items-center max-w-lg px-6 text-center">
        {/* Modern Geometric Logo Formation */}
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          {/* Glowing outer orbit rings */}
          <motion.div
            className="absolute inset-0 rounded-xl border border-blue-500/30"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-3 rounded-full border border-gold-400/20"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          />

          {/* Central Logo Hexagon/Diamond with custom 'A' */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-16 h-16 bg-gradient-to-br from-blue-600 to-navy-900 border-2 border-gold-400/80 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20"
          >
            <span className="font-display font-bold text-3xl tracking-tighter text-white glow-gold">A</span>
          </motion.div>
        </div>

        {/* Brand Callout */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-display font-bold text-3xl tracking-[0.25em] text-white uppercase mb-2"
        >
          AXION
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="font-mono text-xs tracking-widest text-gold-400 font-medium uppercase mb-10"
        >
          Enterprise Technology Ltd.
        </motion.p>

        {/* Live system output monitor */}
        <div className="w-80 h-16 flex flex-col justify-end bg-black/40 border border-blue-900/40 rounded px-4 py-2 font-mono text-[10px] text-blue-400/90 text-left backdrop-blur-md">
          <div className="text-gray-500">SYSTEM FEED: ACTIVE</div>
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="truncate text-white"
          >
            &gt; {steps[stepIndex]}
          </motion.div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-[2px] bg-blue-950 rounded-full mt-6 overflow-hidden relative">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-gold-400 to-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.8, ease: "easeInOut" }}
          />
        </div>

        <button
          onClick={onComplete}
          className="mt-8 font-mono text-[10px] text-gray-500 hover:text-gold-400 transition-colors uppercase tracking-widest bg-transparent border border-gray-800 hover:border-gold-500/30 rounded px-3 py-1 cursor-pointer"
        >
          Skip Intro Sequence
        </button>
      </div>
    </motion.div>
  );
}

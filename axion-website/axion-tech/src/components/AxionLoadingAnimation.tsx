import React from "react";
import { motion } from "motion/react";

interface AxionLoadingAnimationProps {
  size?: number;           // Size of the loading icon
  className?: string;
  isDarkMode?: boolean;
}

export function AxionLoadingAnimation({
  size = 48,
  className = "",
  isDarkMode = true,
}: AxionLoadingAnimationProps) {
  // Container standard transition
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  // Individual block pulsing transition (opacity & scale)
  const blockVariants = {
    initial: { opacity: 0.35, scale: 0.9 },
    animate: {
      opacity: [0.35, 1, 0.35],
      scale: [0.9, 1.05, 0.9],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 gap-1.5"
        style={{ width: size, height: size }}
      >
        {/* Top Left Block (#4DA3FF) */}
        <motion.div
          variants={blockVariants}
          style={{
            background: "linear-gradient(135deg, #7ACCFF 0%, #4DA3FF 100%)",
            borderRadius: `${(size / 48) * 6}px`,
            boxShadow: "0 0 12px rgba(77, 163, 255, 0.25)",
          }}
          className="w-full h-full"
        />

        {/* Top Right Block (#0D3B8F) */}
        <motion.div
          variants={blockVariants}
          style={{
            background: "linear-gradient(135deg, #1B5AE0 0%, #0D3B8F 100%)",
            borderRadius: `${(size / 48) * 6}px`,
            boxShadow: "0 0 12px rgba(13, 59, 143, 0.15)",
          }}
          className="w-full h-full"
        />

        {/* Bottom Left Block (#0D3B8F) */}
        <motion.div
          variants={blockVariants}
          style={{
            background: "linear-gradient(135deg, #1B5AE0 0%, #0D3B8F 100%)",
            borderRadius: `${(size / 48) * 6}px`,
            boxShadow: "0 0 12px rgba(13, 59, 143, 0.15)",
          }}
          className="w-full h-full"
        />

        {/* Bottom Right Block (#4DA3FF) */}
        <motion.div
          variants={blockVariants}
          style={{
            background: "linear-gradient(135deg, #7ACCFF 0%, #4DA3FF 100%)",
            borderRadius: `${(size / 48) * 6}px`,
            boxShadow: "0 0 12px rgba(77, 163, 255, 0.25)",
          }}
          className="w-full h-full"
        />
      </motion.div>

      {/* Subtle indicator text */}
      <span
        className={`font-mono text-[9px] uppercase tracking-[0.25em] font-semibold ${
          isDarkMode ? "text-slate-500" : "text-slate-400"
        }`}
      >
        Processing
      </span>
    </div>
  );
}

export default AxionLoadingAnimation;

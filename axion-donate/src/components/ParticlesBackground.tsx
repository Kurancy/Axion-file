import React from 'react';

export const ParticlesBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {/* Radial Gradient Glows */}
      <div
        className={`absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-30 transition-colors duration-700 ${
          isDark ? 'bg-indigo-600' : 'bg-blue-300'
        }`}
      />
      <div
        className={`absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full blur-3xl opacity-20 transition-colors duration-700 ${
          isDark ? 'bg-emerald-600' : 'bg-emerald-200'
        }`}
      />
      <div
        className={`absolute -bottom-40 left-1/4 h-96 w-96 rounded-full blur-3xl opacity-25 transition-colors duration-700 ${
          isDark ? 'bg-purple-800' : 'bg-purple-200'
        }`}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-all duration-1000 animate-pulse ${
              isDark ? 'bg-white/20' : 'bg-slate-400/30'
            }`}
            style={{
              width: `${(i % 3) + 3}px`,
              height: `${(i % 3) + 3}px`,
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              animationDuration: `${(i % 5) + 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

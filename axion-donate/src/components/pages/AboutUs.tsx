import React from 'react';
import { motion } from 'motion/react';
import {
  HeartHandshake, ShieldCheck, Eye, Users, Ban, Lock, CheckCircle2, ArrowRight
} from 'lucide-react';

const principles = [
  {
    icon: HeartHandshake,
    title: 'Direct Giving',
    description: 'Donations flow directly from donor to beneficiary. No pooled funds, no delays — your money goes exactly where you intend.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'Every campaign shows real bank details, crypto wallets, and verified proof submissions — open and verifiable by anyone.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Beneficiaries',
    description: 'Campaign beneficiaries are reviewed by administrators before going live. Unverified causes are never published.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: Ban,
    title: 'Zero Platform Fees',
    description: 'We never take a cut. 100% of the money you transfer reaches the beneficiary — not a middleman.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
  },
  {
    icon: Lock,
    title: 'Secure Transfers',
    description: 'All payment instructions use verified beneficiary accounts. We never store or handle funds ourselves.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    icon: CheckCircle2,
    title: 'Accountability',
    description: 'Donation proofs are reviewed and approved by administrators. Approved supporters are displayed publicly, building trust.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
  },
];

// Animated glowing heart/network nodes
const NetworkNode: React.FC<{ cx: number; cy: number; r: number; delay: number; color: string }> = ({
  cx, cy, r, delay, color,
}) => (
  <motion.circle
    cx={cx}
    cy={cy}
    r={r}
    fill={color}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.15, 1] }}
    transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

export const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-violet-600/6 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                About Axion Donate
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
                Technology That{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Connects People
                </span>
                <br />
                With Impact.
              </h1>
              <p className="text-base text-slate-400 leading-relaxed mb-8">
                Axion Donate is a transparent, direct-donation platform designed to connect donors with verified beneficiaries — eliminating inefficiency and maximizing the impact of every contribution.
              </p>
              <div className="flex items-center gap-2 text-sm text-emerald-400 font-semibold">
                <HeartHandshake className="w-4 h-4" />
                <span>Direct. Verified. Transparent.</span>
              </div>
            </motion.div>

            {/* Animated Network Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative w-72 h-72">
                {/* Glow pulse behind SVG */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-violet-600/20 blur-2xl"
                />
                <svg viewBox="0 0 280 280" className="w-full h-full relative z-10">
                  {/* Connection lines */}
                  {[
                    [140, 140, 60, 60],
                    [140, 140, 220, 60],
                    [140, 140, 60, 220],
                    [140, 140, 220, 220],
                    [140, 140, 140, 40],
                    [140, 140, 140, 240],
                    [140, 140, 40, 140],
                    [140, 140, 240, 140],
                  ].map(([x1, y1, x2, y2], i) => (
                    <motion.line
                      key={i}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="#10b981" strokeWidth="1" strokeOpacity="0.3"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: i * 0.1 }}
                    />
                  ))}

                  {/* Satellite nodes */}
                  <NetworkNode cx={60} cy={60} r={10} delay={0} color="#10b981" />
                  <NetworkNode cx={220} cy={60} r={8} delay={0.4} color="#14b8a6" />
                  <NetworkNode cx={60} cy={220} r={9} delay={0.8} color="#6366f1" />
                  <NetworkNode cx={220} cy={220} r={11} delay={1.2} color="#8b5cf6" />
                  <NetworkNode cx={140} cy={40} r={7} delay={0.2} color="#22d3ee" />
                  <NetworkNode cx={140} cy={240} r={8} delay={0.6} color="#34d399" />
                  <NetworkNode cx={40} cy={140} r={9} delay={1.0} color="#a78bfa" />
                  <NetworkNode cx={240} cy={140} r={10} delay={1.4} color="#2dd4bf" />

                  {/* Center heart */}
                  <motion.g
                    transform="translate(115, 115)"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <circle cx="25" cy="25" r="30" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5" />
                    <text x="12" y="31" fontSize="24" fill="#10b981">♥</text>
                  </motion.g>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl bg-gradient-to-br from-emerald-950/50 to-slate-900/80 border border-emerald-900/40 p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                "To make charitable giving more direct, transparent, and accessible by connecting people who want to help with verified causes that need support."
              </p>
              <div className="mt-8 inline-flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <ArrowRight className="w-4 h-4" />
                No complexity. Just impact.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principles Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Core Principles</h2>
            <p className="text-sm text-slate-400">
              The values that guide every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="group rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 transition-all hover:shadow-xl"
                >
                  <div className={`w-11 h-11 rounded-xl ${p.bg} border ${p.border} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${p.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

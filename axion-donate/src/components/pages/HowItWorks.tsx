import React from 'react';
import { motion } from 'motion/react';
import { Search, Send, Upload, TrendingUp, CheckCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Choose a Campaign',
    description:
      'Browse our collection of verified campaigns and select the cause you want to support. Every campaign has been reviewed and authenticated by our team.',
    color: 'from-emerald-500 to-teal-400',
    glow: 'shadow-emerald-500/30',
    bgGlow: 'from-emerald-500/10',
  },
  {
    number: '02',
    icon: Send,
    title: 'Send Your Donation',
    description:
      'Transfer your donation directly to the beneficiary using their bank account or supported TRC20 cryptocurrency wallet — no intermediary holds your funds.',
    color: 'from-teal-400 to-cyan-500',
    glow: 'shadow-cyan-500/30',
    bgGlow: 'from-cyan-500/10',
  },
  {
    number: '03',
    icon: Upload,
    title: 'Submit Donation Proof',
    description:
      'Upload your payment receipt or transaction screenshot directly from your device. Our team reviews each submission to maintain full transparency.',
    color: 'from-cyan-500 to-indigo-500',
    glow: 'shadow-indigo-500/30',
    bgGlow: 'from-indigo-500/10',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Track the Impact',
    description:
      'Follow campaign progress, see verified donation updates, and watch how your contribution creates real change for verified beneficiaries.',
    color: 'from-indigo-500 to-violet-500',
    glow: 'shadow-violet-500/30',
    bgGlow: 'from-violet-500/10',
  },
];

const principles = [
  { icon: ShieldCheck, label: 'Verified Beneficiaries' },
  { icon: Zap, label: 'Instant Transfers' },
  { icon: CheckCircle, label: '0% Platform Fees' },
  { icon: TrendingUp, label: 'Real-Time Tracking' },
];

export const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6">
              <CheckCircle className="w-3.5 h-3.5" />
              Simple. Transparent. Direct.
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              How Your Donation
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Creates Impact.
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Simple, direct, and transparent giving. Your contribution travels directly to the people who need it most — no middlemen, no hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className="relative group"
                >
                  {/* Connector line for desktop */}
                  {index < steps.length - 1 && index % 2 === 0 && (
                    <div className="hidden lg:block absolute top-12 left-full w-8 h-px bg-gradient-to-r from-slate-700 to-transparent z-10" />
                  )}

                  <div className="relative rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-8 transition-all duration-300 hover:shadow-2xl overflow-hidden h-full">
                    {/* Background glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Step number + icon row */}
                    <div className="flex items-start gap-5 relative z-10">
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} p-px shadow-xl ${step.glow}`}>
                          <div className="w-full h-full bg-slate-900 rounded-[15px] flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-5xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent leading-none opacity-30`}>
                            {step.number}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Visual Flow Connector */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="my-16 flex items-center justify-center gap-3"
          >
            {steps.map((step, i) => (
              <React.Fragment key={step.number}>
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-xs font-black shadow-lg`}>
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex items-center gap-1">
                    <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-slate-600 to-slate-600" />
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800 p-10 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Built on Core Principles</h2>
            <p className="text-sm text-slate-400 mb-10">
              Every process decision is designed to protect donors and maximize impact.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {principles.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-xs font-semibold text-slate-300 text-center">{p.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

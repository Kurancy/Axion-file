import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Heart,
  Sparkles,
  Building2,
  Coins,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Lock,
  Zap,
  Users,
  Award,
  CreditCard,
  QrCode,
  TrendingUp
} from 'lucide-react';
import { Language, PlatformAnalytics } from '../types';
import { translations } from '../lib/translations';

interface HeroProps {
  language: Language;
  analytics: PlatformAnalytics | null;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onExploreClick: () => void;
  onOpenGlobalProofModal: () => void;
}

export const Hero: React.FC<HeroProps> = React.memo(({
  language,
  analytics,
  selectedCategory,
  onSelectCategory,
  onExploreClick,
  onOpenGlobalProofModal,
}) => {
  const t = translations[language];

  const categories: { label: string; value: string; icon: string }[] = [
    { label: t.allCategories, value: 'All', icon: '🌟' },
    { label: 'Medical', value: 'Medical', icon: '🏥' },
    { label: 'Emergency Relief', value: 'Emergency Relief', icon: '🚨' },
    { label: 'Education', value: 'Education', icon: '🎓' },
    { label: 'Environment', value: 'Environment', icon: '🌱' },
    { label: 'Community', value: 'Community', icon: '🤝' },
  ];

  const trustBadges = [
    '100% Direct Transfers',
    'Zero Platform Fees',
    'Verified Beneficiaries',
    'Bank & TRC20 Support',
    'Complete Transparency',
  ];

  return (
    <section className="relative overflow-hidden py-8 lg:py-12 select-none">
      
      {/* Background Animated Light Beams & Mesh Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Screen Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[65vh]">
          
          {/* Left Side (~45% on desktop -> col-span-5 or col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Direct Verification Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shadow-sm backdrop-blur-md"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>Direct Bank & TRC20 Transfers</span>
              <span className="text-slate-400 dark:text-slate-500">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">0% Commission</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]"
            >
              Every Donation <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-500">
                Changes a Life.
              </span>{' '}
              Directly.
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl"
            >
              Axion Donate connects generous people directly with verified beneficiaries through secure bank transfers and cryptocurrency. Every donation reaches the recipient—with zero platform fees and 100% complete transparency.
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={onExploreClick}
                className="group relative flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.03] active:scale-[0.98] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                <span>Donate Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenGlobalProofModal}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 dark:bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700/80 shadow-lg backdrop-blur-md transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Submit Donation Proof</span>
              </button>
            </motion.div>

            {/* Trust Badges Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80"
            >
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                {trustBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✔</span>
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Side (~55% on desktop -> col-span-6) Animated Hero Visual */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Floating Background Aura & Particle Lines */}
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              
              {/* Outer Glowing Pulsing Rings */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-emerald-500/20 dark:border-emerald-500/30"
              />

              <motion.div
                animate={{ scale: [1.05, 0.95, 1.05] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-emerald-500/10 via-teal-500/15 to-indigo-500/10 blur-2xl pointer-events-none"
              />

              {/* Central Premium Glass Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-full max-w-sm rounded-3xl bg-white/80 dark:bg-slate-900/85 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl backdrop-blur-xl relative z-10 space-y-5"
              >
                
                {/* Card Header: Live Transfer Channel */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25">
                      <Heart className="w-5 h-5 fill-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Direct Transfer Stream
                      </h4>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Verified Peer-to-Peer
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    100% DIRECT
                  </span>
                </div>

                {/* Animated Transfer Visualizer */}
                <div className="relative py-3 space-y-4">
                  
                  {/* Donor Node */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-xs">
                        🤝
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">Generous Supporter</p>
                        <p className="text-[10px] text-slate-500">SWIFT / TRC20 Crypto</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-500">+ $1,000,000</span>
                  </div>

                  {/* Flow Arrow */}
                  

                  {/* Beneficiary Node */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs">
                        🏥
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">Emergency Medical Cause</p>
                        <p className="text-[10px] text-slate-500">Verified Account</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-500">100% Received</span>
                  </div>

                </div>

                {/* Micro Guarantee Footer */}
                <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-950/70 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Zero Middleman Fees</span>
                  </div>
                  <span className="font-mono text-emerald-500 font-bold">0.00 %</span>
                </div>

              </motion.div>

              {/* Floating Widget 1: TRC20 Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-2 z-20 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md flex items-center gap-2.5"
              >
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 font-bold">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">USDT TRC20 Direct</p>
                  <p className="text-[10px] text-slate-500">Instant Global Crypto</p>
                </div>
              </motion.div>

              {/* Floating Widget 2: SWIFT Bank Badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-2 z-20 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md flex items-center gap-2.5"
              >
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 font-bold">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Direct SWIFT Bank</p>
                  <p className="text-[10px] text-slate-500">Account Wire Transfer</p>
                </div>
              </motion.div>

              {/* Floating Widget 3: Live Verification */}
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                
              >
               
              </motion.div>

            </div>

          </div>

        </div>

        {/* Compact Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            {
              label: 'Total Raised',
              value: analytics ? `$${analytics.totalDonationsAmount.toLocaleString()}` : '$205,600+',
              icon: <Coins className="w-5 h-5 text-emerald-500" />,
              subText: '100% to beneficiaries',
            },
            {
              label: 'Active Campaigns',
              value: analytics ? `${analytics.activeCampaigns} Verified` : '8 Active',
              icon: <Heart className="w-5 h-5 text-rose-500" />,
              subText: 'Emergency & Medical',
            },
            {
              label: 'Global Donors',
              value: analytics ? analytics.totalVisitors.toLocaleString() : '4,850+',
              icon: <Users className="w-5 h-5 text-indigo-500" />,
              subText: 'Direct benefactors',
            },
            {
              label: 'Countries Supported',
              value: '34 Nations',
              icon: <Globe2 className="w-5 h-5 text-teal-500" />,
              subText: 'Global reach & impact',
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{stat.label}</span>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                {stat.subText}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Pill Filters Bar */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-105'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
});

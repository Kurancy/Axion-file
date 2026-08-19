import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Share2, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { Campaign, Language } from '../types';
import { translations } from '../lib/translations';

interface CampaignCardProps {
  campaign: Campaign;
  language: Language;
  onSelect: (campaign: Campaign) => void;
  onShare: (campaign: Campaign) => void;
  onQuickDonate: (campaign: Campaign) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = React.memo(({
  campaign,
  language,
  onSelect,
  onShare,
  onQuickDonate,
}) => {
  const t = translations[language];

  const percent = Math.min(100, Math.round((campaign.currentAmount / campaign.targetAmount) * 100));

  // Days remaining calculation
  const now = new Date().getTime();
  const end = new Date(campaign.endDate).getTime();
  const daysLeft = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));

  const statusColors = {
    Urgent: 'bg-rose-500 text-white shadow-rose-500/20',
    Active: 'bg-emerald-500 text-white shadow-emerald-500/20',
    Completed: 'bg-blue-600 text-white shadow-blue-600/20',
    Draft: 'bg-slate-500 text-white',
    Archived: 'bg-amber-600 text-white',
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-emerald-500/40 transition-all"
    >
      {/* Cover Image Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={campaign.coverImage}
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
            {campaign.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase shadow-sm ${statusColors[campaign.status]}`}>
            {campaign.status === 'Urgent' ? t.urgent : campaign.status === 'Completed' ? t.completed : t.active}
          </span>
        </div>

        {/* Bottom Image Overlay: Location & Days Left */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 font-medium">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{campaign.location}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{daysLeft} {t.daysRemaining}</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Beneficiary Header */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{campaign.beneficiaryName}</span>
          </div>

          <h3
            onClick={() => onSelect(campaign)}
            className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-emerald-500 transition-colors cursor-pointer leading-snug"
          >
            {campaign.title}
          </h3>

          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {campaign.shortDescription}
          </p>
        </div>

        {/* Progress & Target Section */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-end justify-between text-xs mb-2">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Raised</span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                ${campaign.currentAmount.toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Goal</span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                ${campaign.targetAmount.toLocaleString()} {campaign.currency}
              </span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={`h-full rounded-full ${
                percent >= 100
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                  : campaign.status === 'Urgent'
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-400'
              }`}
            />
          </div>

          <div className="mt-1.5 flex justify-between items-center text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <span>{percent}% Funded</span>
            <span>${Math.max(0, campaign.targetAmount - campaign.currentAmount).toLocaleString()} Needed</span>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="mt-6 flex items-center gap-2">
          <button
            onClick={() => onQuickDonate(campaign)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition-all"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{t.donateNow}</span>
          </button>

          <button
            onClick={() => onSelect(campaign)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            title={t.viewDetails}
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onShare(campaign)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            title={t.shareCampaign}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Copy, Check, Share2, Send } from 'lucide-react';
import { Campaign, Language } from '../types';
import { translations } from '../lib/translations';
import { shareCampaign } from '../lib/api';

interface ShareModalProps {
  campaign: Campaign | null;
  language: Language;
  onClose: () => void;
  onCopySuccess: (text: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  campaign,
  language,
  onClose,
  onCopySuccess,
}) => {
  if (!campaign) return null;

  const t = translations[language];
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location.href;
  const shareText = `Support "${campaign.title}" on Axion Donate! 100% direct bank & crypto donation platform with zero fees.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${currentUrl}#campaign-${campaign.id}`);
    setCopied(true);
    onCopySuccess(t.copied);
    shareCampaign(campaign.id).catch(() => {});
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    {
      name: 'WhatsApp',
      color: 'bg-emerald-600 hover:bg-emerald-500',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`,
    },
    {
      name: 'Telegram',
      color: 'bg-sky-500 hover:bg-sky-400',
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'X (Twitter)',
      color: 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-500',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.shareCampaign}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
          <span className="font-bold text-slate-900 dark:text-white block truncate">{campaign.title}</span>
          <span className="text-slate-500 line-clamp-2 mt-0.5">{campaign.shortDescription}</span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => shareCampaign(campaign.id).catch(() => {})}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold text-xs shadow-md transition-all hover:scale-[1.02] ${p.color}`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{p.name}</span>
            </a>
          ))}
        </div>

        {/* Direct Link Copy Bar */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Or Copy Direct Campaign Link
          </span>
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <input
              type="text"
              readOnly
              value={`${currentUrl}#campaign-${campaign.id}`}
              className="flex-1 bg-transparent px-2 text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.copied : 'Copy'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

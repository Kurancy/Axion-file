import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Campaign, Language, CampaignCategory, CampaignStatus } from '../../types';
import { getCampaigns } from '../../lib/api';
import { CampaignCard } from '../CampaignCard';
import { DonationProofModal } from '../DonationProofModal';
import { ShareModal } from '../ShareModal';
import { translations } from '../../lib/translations';
import confetti from 'canvas-confetti';

const CATEGORIES: Array<{ value: string; label: string }> = [
  { value: 'All', label: 'All Categories' },
  { value: 'Medical', label: 'Medical' },
  { value: 'Emergency Relief', label: 'Emergency Relief' },
  { value: 'Education', label: 'Education' },
  { value: 'Environment', label: 'Environment' },
  { value: 'Community', label: 'Community' },
  { value: 'Disaster', label: 'Disaster' },
];

const STATUSES: Array<{ value: string; label: string }> = [
  { value: 'All', label: 'All Statuses' },
  { value: 'Active', label: 'Active' },
  { value: 'Urgent', label: 'Urgent' },
  { value: 'Completed', label: 'Completed' },
];

interface CampaignsPageProps {
  language: Language;
  onShowProof: (c: Campaign) => void;
  onToast: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

export const CampaignsPage: React.FC<CampaignsPageProps> = ({ language, onShowProof, onToast }) => {
  const navigate = useNavigate();
  const t = translations[language];
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [shareTargetCampaign, setShareTargetCampaign] = useState<Campaign | null>(null);
  const [showProofModal, setShowProofModal] = useState(false);
  const [proofTargetCampaign, setProofTargetCampaign] = useState<Campaign | null>(null);

  const loadCampaigns = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCampaigns({
        category: selectedCategory,
        search: searchQuery,
      });
      // Filter by status client-side if needed
      const filtered = selectedStatus === 'All'
        ? data
        : data.filter((c) => c.status === selectedStatus);
      setCampaigns(filtered);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery, selectedStatus]);

  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
  };

  const hasFilters = searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Page Header */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Explore{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Verified Campaigns
              </span>
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Browse active causes and send your donation directly to verified beneficiaries.
            </p>
          </motion.div>

          {/* Search + Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaigns..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 text-sm transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-4 pr-9 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-sm w-full sm:w-auto transition-all"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none pl-4 pr-9 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-sm w-full sm:w-auto transition-all"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Clear Filters */}
            {hasFilters && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </motion.div>

          {/* Result count */}
          <div className="mt-4 text-center">
            <span className="text-xs text-slate-500">
              {loading ? 'Loading...' : `Showing ${campaigns.length} campaign${campaigns.length !== 1 ? 's' : ''}`}
            </span>
          </div>
        </div>
      </section>

      {/* Campaign Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[26rem] rounded-2xl bg-slate-900/50 animate-pulse" />
              ))}
            </div>
          ) : campaigns.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center rounded-2xl bg-slate-900 border border-slate-800"
            >
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="text-lg font-bold text-white mb-2">No campaigns match your search</h3>
              <p className="text-xs text-slate-500 mb-6">Try adjusting your filters or search keyword.</p>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  language={language}
                  onSelect={(c) => navigate(`/campaigns/${c.id}`)}
                  onShare={(c) => setShareTargetCampaign(c)}
                  onQuickDonate={(c) => {
                    setProofTargetCampaign(c);
                    setShowProofModal(true);
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {showProofModal && (
          <DonationProofModal
            campaigns={campaigns}
            preselectedCampaign={proofTargetCampaign}
            language={language}
            onClose={() => setShowProofModal(false)}
            onSuccessSubmitted={() => {
              confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
              onToast('Proof Submitted!', 'Our admins will review your submission shortly.', 'success');
              loadCampaigns();
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shareTargetCampaign && (
          <ShareModal
            campaign={shareTargetCampaign}
            language={language}
            onClose={() => setShareTargetCampaign(null)}
            onCopySuccess={(msg) => onToast('Copied!', msg, 'success')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

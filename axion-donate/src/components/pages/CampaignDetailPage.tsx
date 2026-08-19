import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Building2, QrCode, Copy, Check, Share2, ShieldCheck,
  Calendar, MapPin, Sparkles, FileCheck2, Users, ChevronLeft
} from 'lucide-react';
import { Campaign, Language, CampaignUpdate, ApprovedSupporter } from '../../types';
import { translations } from '../../lib/translations';
import { getCampaignById, getCampaignUpdates, getCampaignSupporters, generateQrCode } from '../../lib/api';
import { DonationProofModal } from '../DonationProofModal';
import { ShareModal } from '../ShareModal';
import confetti from 'canvas-confetti';

interface CampaignDetailPageProps {
  language: Language;
  onToast: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

export const CampaignDetailPage: React.FC<CampaignDetailPageProps> = ({ language, onToast }) => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const t = translations[language];

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [updates, setUpdates] = useState<CampaignUpdate[]>([]);
  const [supporters, setSupporters] = useState<ApprovedSupporter[]>([]);
  const [bankQr, setBankQr] = useState<string>('');
  const [cryptoQr, setCryptoQr] = useState<string>('');
  const [activeImage, setActiveImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'details' | 'updates' | 'supporters'>('details');
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedCrypto, setCopiedCrypto] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [shareTarget, setShareTarget] = useState<Campaign | null>(null);

  useEffect(() => {
    if (!campaignId) return;
    setLoading(true);
    getCampaignById(campaignId)
      .then((c) => {
        setCampaign(c);
        setActiveImage(c.coverImage);
        return Promise.all([
          getCampaignUpdates(c.id),
          getCampaignSupporters(c.id),
          generateQrCode(`BANK:${c.bankAccount.bankName};ACC:${c.bankAccount.accountNumber};NAME:${c.bankAccount.accountName}`),
          generateQrCode(c.cryptoWallet.address),
        ]);
      })
      .then(([u, s, bQr, cQr]) => {
        setUpdates(u);
        setSupporters(s);
        setBankQr(bQr);
        setCryptoQr(cQr);
      })
      .catch(() => {
        onToast('Error', 'Campaign not found.', 'error');
        navigate('/campaigns');
      })
      .finally(() => setLoading(false));
  }, [campaignId]);

  const copyToClipboard = (text: string, type: 'bank' | 'crypto') => {
    navigator.clipboard.writeText(text);
    onToast('Copied!', t.copied, 'success');
    if (type === 'bank') {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    } else {
      setCopiedCrypto(true);
      setTimeout(() => setCopiedCrypto(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          <span className="text-slate-400 text-sm">Loading campaign...</span>
        </div>
      </div>
    );
  }

  if (!campaign) return null;

  const percent = Math.min(100, Math.round((campaign.currentAmount / campaign.targetAmount) * 100));
  const daysLeft = Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / 86400000));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Back button + breadcrumb */}
      <div className="pt-24 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/campaigns')}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Campaigns
          </button>
        </div>
      </div>

      <div className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left: Image + Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-800"
              >
                <img src={activeImage} alt={campaign.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {campaign.location}
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white font-medium">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {daysLeft} days left
                  </div>
                </div>
              </motion.div>

              {/* Gallery thumbnails */}
              {campaign.galleryImages?.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {[campaign.coverImage, ...campaign.galleryImages].map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${activeImage === img ? 'border-emerald-500 scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Title + Badges */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {campaign.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    campaign.status === 'Urgent' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    campaign.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug mb-3">
                  {campaign.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{campaign.beneficiaryName} · {campaign.beneficiaryType}</span>
                </div>
              </motion.div>

              {/* Tabs */}
              <div className="flex border-b border-slate-800 gap-6">
                {[
                  { key: 'details', label: 'Campaign Details', icon: FileCheck2 },
                  { key: 'updates', label: `Updates (${updates.length})`, icon: Sparkles },
                  { key: 'supporters', label: `Supporters (${supporters.length})`, icon: Users },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`pb-3 text-sm font-semibold flex items-center gap-2 transition-colors ${
                        activeTab === tab.key
                          ? 'text-emerald-400 border-b-2 border-emerald-500'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'details' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white">About This Campaign</h3>
                      <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                        {campaign.fullDescription}
                      </p>
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-emerald-500/10">
                          <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider block">
                            Verified Beneficiary ({campaign.beneficiaryType})
                          </span>
                          <h4 className="text-base font-bold text-white">{campaign.beneficiaryName}</h4>
                          <p className="text-xs text-emerald-400 font-medium">Direct Transfer Authorized · Zero Admin Fee</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'updates' && (
                    <div className="space-y-4">
                      {updates.length === 0 ? (
                        <div className="py-12 text-center text-sm text-slate-500 bg-slate-900 rounded-xl border border-slate-800">
                          No updates yet for this campaign.
                        </div>
                      ) : updates.map((update) => (
                        <div key={update.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white">{update.title}</span>
                            <span className="text-slate-500">{new Date(update.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{update.content}</p>
                          {update.imageUrl && (
                            <img src={update.imageUrl} alt="" className="w-full h-40 object-cover rounded-lg" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'supporters' && (
                    <div className="space-y-3">
                      {supporters.length === 0 ? (
                        <div className="py-12 text-center text-sm text-slate-500 bg-slate-900 rounded-xl border border-slate-800">
                          No verified supporters yet. Be the first to donate!
                        </div>
                      ) : supporters.map((sup) => (
                        <div key={sup.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                          <div className="h-9 w-9 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                            {sup.donorName[0].toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-bold text-white">{sup.isAnonymous ? 'Anonymous Donor' : sup.donorName}</h5>
                              <span className="text-xs font-extrabold text-emerald-400">+${sup.amount.toLocaleString()} {sup.currency}</span>
                            </div>
                            {sup.message && <p className="text-xs text-slate-400 mt-1 italic">"{sup.message}"</p>}
                            <span className="text-[10px] text-slate-500 mt-1 block">Verified {new Date(sup.approvedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Funding + Payment */}
            <div className="lg:col-span-5 space-y-5">
              {/* Funding Progress */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-1">Total Raised</span>
                    <span className="text-3xl font-extrabold text-white">${campaign.currentAmount.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-1">Target Goal</span>
                    <span className="text-sm font-bold text-slate-300">${campaign.targetAmount.toLocaleString()} {campaign.currency}</span>
                  </div>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>{percent}% Funded</span>
                  <span>${Math.max(0, campaign.targetAmount - campaign.currentAmount).toLocaleString()} Needed</span>
                </div>

                <button
                  onClick={() => setShowProofModal(true)}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
                >
                  <FileCheck2 className="w-4 h-4" />
                  Submit Donation Proof
                </button>
              </motion.div>

              {/* Bank Account */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-500/10"><Building2 className="w-5 h-5 text-blue-400" /></div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Bank Transfer</h4>
                      <span className="text-[11px] text-slate-500">{campaign.bankAccount.bankName}</span>
                    </div>
                  </div>
                  {bankQr && <img src={bankQr} alt="Bank QR" className="w-12 h-12 rounded-lg border border-slate-700 p-0.5" />}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Account Name:</span>
                    <span className="font-bold text-white">{campaign.bankAccount.accountName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Account Number:</span>
                    <span className="font-mono font-bold text-emerald-400">{campaign.bankAccount.accountNumber}</span>
                  </div>
                  {campaign.bankAccount.swiftCode && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">SWIFT/BIC:</span>
                      <span className="font-mono text-slate-300">{campaign.bankAccount.swiftCode}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => copyToClipboard(campaign.bankAccount.accountNumber, 'bank')}
                  className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedBank ? 'Copied!' : 'Copy Account Number'}
                </button>
              </motion.div>

              {/* Crypto Wallet */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-amber-500/10"><QrCode className="w-5 h-5 text-amber-400" /></div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Crypto Transfer</h4>
                      <span className="text-[11px] font-semibold text-emerald-400">{campaign.cryptoWallet.network}</span>
                    </div>
                  </div>
                  {cryptoQr && <img src={cryptoQr} alt="Crypto QR" className="w-12 h-12 rounded-lg border border-slate-700 p-0.5" />}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Wallet Address ({campaign.cryptoWallet.network})</span>
                  <p className="font-mono text-emerald-400 font-bold break-all">{campaign.cryptoWallet.address}</p>
                </div>

                <button
                  onClick={() => copyToClipboard(campaign.cryptoWallet.address, 'crypto')}
                  className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedCrypto ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedCrypto ? 'Copied!' : 'Copy Wallet Address'}
                </button>
              </motion.div>

              {/* Share */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-semibold text-slate-400">Help spread the word</span>
                <button
                  onClick={() => setShareTarget(campaign)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs hover:bg-emerald-500/20 transition-colors border border-emerald-500/20"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share Campaign
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showProofModal && (
          <DonationProofModal
            campaigns={[campaign]}
            preselectedCampaign={campaign}
            language={language}
            onClose={() => setShowProofModal(false)}
            onSuccessSubmitted={() => {
              confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
              onToast('Proof Submitted!', 'Our admins will review your submission shortly.', 'success');
              setShowProofModal(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shareTarget && (
          <ShareModal
            campaign={shareTarget}
            language={language}
            onClose={() => setShareTarget(null)}
            onCopySuccess={(msg) => onToast('Copied!', msg, 'success')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Building2,
  QrCode,
  Copy,
  Check,
  Share2,
  ShieldCheck,
  Heart,
  Calendar,
  MapPin,
  Sparkles,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  FileCheck2,
  Users
} from 'lucide-react';
import { Campaign, Language, CampaignUpdate, ApprovedSupporter } from '../types';
import { translations } from '../lib/translations';
import { getCampaignUpdates, getCampaignSupporters, generateQrCode, shareCampaign } from '../lib/api';

interface CampaignDetailModalProps {
  campaign: Campaign | null;
  language: Language;
  onClose: () => void;
  onOpenProofModal: (campaign: Campaign) => void;
  onShare: (campaign: Campaign) => void;
  onCopySuccess: (text: string) => void;
}

export const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({
  campaign,
  language,
  onClose,
  onOpenProofModal,
  onShare,
  onCopySuccess,
}) => {
  if (!campaign) return null;

  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'details' | 'updates' | 'supporters'>('details');
  const [updates, setUpdates] = useState<CampaignUpdate[]>([]);
  const [supporters, setSupporters] = useState<ApprovedSupporter[]>([]);
  const [bankQr, setBankQr] = useState<string>('');
  const [cryptoQr, setCryptoQr] = useState<string>('');
  const [activeImage, setActiveImage] = useState<string>(campaign.coverImage);
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedCrypto, setCopiedCrypto] = useState(false);

  useEffect(() => {
    if (campaign) {
      setActiveImage(campaign.coverImage);
      getCampaignUpdates(campaign.id).then(setUpdates).catch(() => {});
      getCampaignSupporters(campaign.id).then(setSupporters).catch(() => {});

      // Generate Bank QR String
      const bankString = `BANK:${campaign.bankAccount.bankName};ACC:${campaign.bankAccount.accountNumber};NAME:${campaign.bankAccount.accountName}`;
      generateQrCode(bankString).then(setBankQr).catch(() => {});

      // Generate Crypto QR String
      generateQrCode(campaign.cryptoWallet.address).then(setCryptoQr).catch(() => {});
    }
  }, [campaign]);

  const copyToClipboard = (text: string, type: 'bank' | 'crypto') => {
    navigator.clipboard.writeText(text);
    onCopySuccess(t.copied);
    if (type === 'bank') {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    } else {
      setCopiedCrypto(true);
      setTimeout(() => setCopiedCrypto(false), 2000);
    }
  };

  const percent = Math.min(100, Math.round((campaign.currentAmount / campaign.targetAmount) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
              {campaign.category}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {campaign.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Main Visual & Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Image Viewer & Story */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Featured Main Image */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                <img
                  src={activeImage}
                  alt={campaign.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{campaign.location}</span>
                </div>
              </div>

              {/* Thumbnail Gallery Row */}
              {campaign.galleryImages && campaign.galleryImages.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {[campaign.coverImage, ...campaign.galleryImages].map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        activeImage === imgUrl
                          ? 'border-emerald-500 scale-105 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
                {[
                  { key: 'details', label: t.viewDetails, icon: <FileCheck2 className="w-4 h-4" /> },
                  { key: 'updates', label: `${t.campaignUpdates} (${updates.length})`, icon: <Sparkles className="w-4 h-4" /> },
                  { key: 'supporters', label: `${t.recentSupporters} (${supporters.length})`, icon: <Users className="w-4 h-4" /> },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`pb-3 text-sm font-semibold flex items-center gap-2 transition-colors relative ${
                      activeTab === tab.key
                        ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab 1: Full Description & Story */}
              {activeTab === 'details' && (
                <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    About This Campaign
                  </h3>
                  <p className="whitespace-pre-line">{campaign.fullDescription}</p>

                  {/* Beneficiary Card */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        Verified Beneficiary ({campaign.beneficiaryType})
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {campaign.beneficiaryName}
                      </h4>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        Direct Transfer Authorized • Zero Admin Fee
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Campaign Updates */}
              {activeTab === 'updates' && (
                <div className="space-y-4">
                  {updates.length === 0 ? (
                    <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                      {t.noUpdates}
                    </div>
                  ) : (
                    updates.map((update) => (
                      <div
                        key={update.id}
                        className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3"
                      >
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-bold text-slate-900 dark:text-white">{update.title}</span>
                          <span>{new Date(update.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {update.content}
                        </p>
                        {update.imageUrl && (
                          <img
                            src={update.imageUrl}
                            alt=""
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 3: Verified Supporters */}
              {activeTab === 'supporters' && (
                <div className="space-y-3">
                  {supporters.length === 0 ? (
                    <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                      {t.noSupporters}
                    </div>
                  ) : (
                    supporters.map((sup) => (
                      <div
                        key={sup.id}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
                      >
                        <div className="h-9 w-9 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xs shrink-0">
                          {sup.donorName[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {sup.isAnonymous ? t.anonymousDonor : sup.donorName}
                            </h5>
                            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                              +${sup.amount.toLocaleString()} {sup.currency}
                            </span>
                          </div>
                          {sup.message && (
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 italic">
                              "{sup.message}"
                            </p>
                          )}
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            Verified on {new Date(sup.approvedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>

            {/* Right Column: Funding Progress & Direct Payment Methods */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Progress & Target Box */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
                      Total Raised
                    </span>
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      ${campaign.currentAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
                      Target Goal
                    </span>
                    <span className="text-base font-bold text-slate-700 dark:text-slate-300">
                      ${campaign.targetAmount.toLocaleString()} {campaign.currency}
                    </span>
                  </div>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-semibold">
                  <span>{percent}% Completed</span>
                  <span>${Math.max(0, campaign.targetAmount - campaign.currentAmount).toLocaleString()} Remaining</span>
                </div>

                {/* Primary CTA Button: Submit Proof */}
                <button
                  onClick={() => onOpenProofModal(campaign)}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>{t.confirmDonation}</span>
                </button>
              </div>

              {/* Direct Payment Method 1: Bank Account */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                        {t.bankTransfer}
                      </h4>
                      <span className="text-[11px] text-slate-500">{campaign.bankAccount.bankName}</span>
                    </div>
                  </div>
                  {bankQr && (
                    <img src={bankQr} alt="Bank QR" className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-700 p-0.5" />
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                    <span>Account Name:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{campaign.bankAccount.accountName}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                    <span>Account Number:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{campaign.bankAccount.accountNumber}</span>
                  </div>
                  {campaign.bankAccount.swiftCode && (
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                      <span>SWIFT/BIC Code:</span>
                      <span className="font-mono font-semibold">{campaign.bankAccount.swiftCode}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => copyToClipboard(campaign.bankAccount.accountNumber, 'bank')}
                  className="w-full py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBank ? t.copied : t.copyAccount}</span>
                </button>
              </div>

              {/* Direct Payment Method 2: TRC20 Crypto Wallet */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                        {t.cryptoTransfer}
                      </h4>
                      <span className="text-[11px] font-semibold text-emerald-500">{campaign.cryptoWallet.network}</span>
                    </div>
                  </div>
                  {cryptoQr && (
                    <img src={cryptoQr} alt="Crypto QR" className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-700 p-0.5" />
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">
                    Wallet Address ({campaign.cryptoWallet.network})
                  </span>
                  <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold break-all">
                    {campaign.cryptoWallet.address}
                  </p>
                </div>

                <button
                  onClick={() => copyToClipboard(campaign.cryptoWallet.address, 'crypto')}
                  className="w-full py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedCrypto ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCrypto ? t.copied : t.copyAddress}</span>
                </button>
              </div>

              {/* Social Sharing */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {t.shareCampaign}
                </span>
                <button
                  onClick={() => onShare(campaign)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs hover:bg-emerald-500/20 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Campaign</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
};

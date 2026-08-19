import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { X, Upload, CheckCircle2, ShieldCheck, Heart, FileCheck, Image as ImageIcon } from 'lucide-react';
import { Campaign, Language } from '../types';
import { translations } from '../lib/translations';
import { submitDonationProof } from '../lib/api';

interface DonationProofModalProps {
  campaigns: Campaign[];
  preselectedCampaign?: Campaign | null;
  language: Language;
  onClose: () => void;
  onSuccessSubmitted: () => void;
}

export const DonationProofModal: React.FC<DonationProofModalProps> = ({
  campaigns,
  preselectedCampaign,
  language,
  onClose,
  onSuccessSubmitted,
}) => {
  const t = translations[language];

  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(
    preselectedCampaign ? preselectedCampaign.id : (campaigns[0]?.id || '')
  );
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [amount, setAmount] = useState('100');
  const [currency, setCurrency] = useState('USD');
  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer' | 'Crypto (TRC20)' | 'Crypto (Other)'>('Bank Transfer');
  const [transactionId, setTransactionId] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [screenshotPreview, setScreenshotPreview] = useState<string>('');
  
  const [loading, setLoading] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [refToken, setRefToken] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    setLoading(true);
    try {
      const res = await submitDonationProof({
        campaignId: selectedCampaignId,
        donorName: isAnonymous ? 'Anonymous Donor' : (donorName || 'Generous Supporter'),
        donorEmail,
        amount: Number(amount),
        currency,
        paymentMethod,
        transactionId,
        proofScreenshotUrl: screenshotPreview || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
        message,
        isAnonymous,
      });

      if (res.success) {
        setSubmittedSuccess(true);
        setRefToken(res.submission.id);

        // Confetti Burst!
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });

        onSuccessSubmitted();
      }
    } catch (err) {
      console.error('Failed to submit proof:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.confirmDonationTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.confirmDonationSub}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedSuccess ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {t.proofSubmittedSuccess}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                {t.proofSubmittedDesc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 max-w-sm mx-auto text-xs space-y-1">
              <span className="text-slate-400 uppercase font-semibold block text-[10px]">
                Verification Reference Token
              </span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                {refToken}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-full max-w-xs py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all mx-auto"
            >
              {t.close}
            </button>
          </div>
        ) : (
          /* Proof Submission Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            
            {/* Campaign Selection Dropdown */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">
                Target Campaign *
              </label>
              <select
                value={selectedCampaignId}
                onChange={(e) => setSelectedCampaignId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} (${c.currentAmount.toLocaleString()} / ${c.targetAmount.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            {/* Donor Name & Anonymous Checkbox */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  {t.yourName}
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  disabled={isAnonymous}
                  placeholder={isAnonymous ? t.anonymousDonor : 'e.g. Alex Morgan'}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  {t.yourEmail}
                </label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="anonymous-check"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="anonymous-check" className="text-slate-600 dark:text-slate-300 cursor-pointer font-medium">
                {t.donateAnonymously}
              </label>
            </div>

            {/* Amount, Currency & Payment Method */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  {t.amountDonated} *
                </label>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  {t.currency}
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="Naira">Naira (₦)</option>
                  <option value="USDT">USDT (TRC20)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  {t.paymentMethod}
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Crypto (TRC20)">Crypto (TRC20)</option>
                  <option value="Crypto (Other)">Crypto (Other)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  {t.txId}
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="e.g. FT2026889100 / 0x8f99a..."
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
            </div>

            {/* Screenshot / Receipt Picker */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                {t.uploadReceipt}
              </label>
              <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                {screenshotPreview ? (
                  <div className="flex items-center justify-center gap-3">
                    <img src={screenshotPreview} alt="Preview" className="h-12 w-12 object-cover rounded-lg border border-emerald-500" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Screenshot Attached ✓</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5 text-slate-500">
                    <Upload className="w-5 h-5 text-emerald-500" />
                    <span className="font-semibold text-xs">Click or Drag transfer receipt image here</span>
                    <span className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 10MB</span>
                  </div>
                )}
              </div>
            </div>

            {/* Personal Encouragement Message */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                {t.personalMessage}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                placeholder="Leave a kind note for the beneficiary or team..."
                className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Submitting Verification...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.submitProofBtn}</span>
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

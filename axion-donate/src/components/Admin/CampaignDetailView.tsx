import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  Edit2,
  Trash2,
  ShieldCheck,
  Building2,
  QrCode,
  FileCheck2,
  Users,
  Sparkles,
  Grid,
  BarChart3,
  Settings,
  CheckCircle2,
  XCircle,
  Share2,
  Calendar,
  MapPin,
  Plus,
  ExternalLink,
  Copy,
  Check,
  TrendingUp
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Campaign, DonorSubmission, CampaignUpdate, ApprovedSupporter, Language } from '../../types';
import { getCampaignUpdates, getCampaignSupporters, postCampaignUpdate, updateCampaign, deleteCampaign, generateQrCode } from '../../lib/api';

interface CampaignDetailViewProps {
  campaign: Campaign;
  submissions: DonorSubmission[];
  language: Language;
  onBack: () => void;
  onRefreshData: () => void;
  onToast: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
  onApproveProof: (id: string) => void;
  onRejectProof: (id: string) => void;
}

export const CampaignDetailView: React.FC<CampaignDetailViewProps> = ({
  campaign,
  submissions,
  language,
  onBack,
  onRefreshData,
  onToast,
  onApproveProof,
  onRejectProof,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'donations' | 'proofs' | 'updates' | 'gallery' | 'analytics' | 'settings'>('overview');
  
  const [updates, setUpdates] = useState<CampaignUpdate[]>([]);
  const [supporters, setSupporters] = useState<ApprovedSupporter[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Form states for updates
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [updateImage, setUpdateImage] = useState('');

  // Edit Settings state
  const [editForm, setEditForm] = useState<Partial<Campaign>>(campaign);

  // Filtered submissions for this campaign
  const campaignSubmissions = submissions.filter((s) => s.campaignId === campaign.id);

  useEffect(() => {
    setEditForm(campaign);
    getCampaignUpdates(campaign.id).then(setUpdates).catch(() => {});
    getCampaignSupporters(campaign.id).then(setSupporters).catch(() => {});
  }, [campaign]);

  const percent = Math.min(100, Math.round((campaign.currentAmount / campaign.targetAmount) * 100));
  const remaining = Math.max(0, campaign.targetAmount - campaign.currentAmount);

  const handlePostUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateTitle || !updateContent) return;
    try {
      await postCampaignUpdate(campaign.id, updateTitle, updateContent, updateImage);
      onToast('Update Published!', 'Campaign milestone report updated.', 'success');
      setUpdateTitle('');
      setUpdateContent('');
      setUpdateImage('');
      getCampaignUpdates(campaign.id).then(setUpdates);
    } catch (err: any) {
      onToast('Error', err.message, 'error');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCampaign(campaign.id, editForm);
      onToast('Campaign Updated', 'Campaign settings saved successfully.', 'success');
      onRefreshData();
    } catch (err: any) {
      onToast('Error Saving Settings', err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Navigation & Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400">
                {campaign.category}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                campaign.status === 'Urgent' ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {campaign.status}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white mt-1 truncate max-w-xl">
              {campaign.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('settings')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Campaign</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Tabs & Workspace (8 cols) + Right Summary Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Columns Workspace */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
            {[
              { id: 'overview', label: 'Overview', icon: <FileCheck2 className="w-4 h-4" /> },
              { id: 'donations', label: `Donations (${campaignSubmissions.length})`, icon: <Users className="w-4 h-4" /> },
              { id: 'proofs', label: `Payment Proofs (${campaignSubmissions.filter(s => s.status === 'Pending').length})`, icon: <CheckCircle2 className="w-4 h-4" /> },
              { id: 'updates', label: `Updates (${updates.length})`, icon: <Sparkles className="w-4 h-4" /> },
              { id: 'gallery', label: 'Gallery', icon: <Grid className="w-4 h-4" /> },
              { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === t.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Campaign Cover Banner */}
              <div className="relative aspect-[16/8] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                <img src={campaign.coverImage} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{campaign.location}</span>
                    </span>
                    <h3 className="text-lg font-bold text-white">{campaign.beneficiaryName}</h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-slate-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
                    {campaign.beneficiaryType}
                  </span>
                </div>
              </div>

              {/* Story & Description */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Campaign Story & Details</h4>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{campaign.fullDescription}</p>
              </div>

              {/* Beneficiary Direct Payment Credentials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-blue-400 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    <span>Bank Transfer Credentials</span>
                  </span>
                  <div className="text-slate-300 space-y-1 font-mono">
                    <p>Bank: {campaign.bankAccount.bankName}</p>
                    <p>Account Name: {campaign.bankAccount.accountName}</p>
                    <p className="text-emerald-400 font-bold">Account No: {campaign.bankAccount.accountNumber}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <QrCode className="w-4 h-4" />
                    <span>TRC20 Wallet Address</span>
                  </span>
                  <div className="text-slate-300 space-y-1 font-mono">
                    <p>Network: {campaign.cryptoWallet.network}</p>
                    <p className="text-emerald-400 font-bold break-all">{campaign.cryptoWallet.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DONATIONS */}
          {activeTab === 'donations' && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white">Campaign Donations Directory</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Donor</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Method</th>
                      <th className="p-3">Tx ID</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {campaignSubmissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-white">{sub.donorName}</td>
                        <td className="p-3 font-mono font-bold text-emerald-400">+${sub.amount.toLocaleString()}</td>
                        <td className="p-3">{sub.paymentMethod}</td>
                        <td className="p-3 font-mono text-slate-400 truncate max-w-[120px]">{sub.transactionId || 'N/A'}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            sub.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENT PROOFS QUEUE */}
          {activeTab === 'proofs' && (
            <div className="space-y-4">
              {campaignSubmissions.map((sub) => (
                <div key={sub.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {sub.proofScreenshotUrl && (
                      <img
                        src={sub.proofScreenshotUrl}
                        alt=""
                        onClick={() => setPreviewImage(sub.proofScreenshotUrl!)}
                        className="w-14 h-14 rounded-lg object-cover cursor-pointer hover:opacity-80 border border-slate-700"
                      />
                    )}
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-white block">{sub.donorName}</span>
                      <span className="font-mono text-emerald-400 font-bold">+${sub.amount.toLocaleString()} ({sub.paymentMethod})</span>
                      {sub.message && <p className="text-slate-400 italic">"{sub.message}"</p>}
                    </div>
                  </div>

                  {sub.status === 'Pending' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onApproveProof(sub.id)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onRejectProof(sub.id)}
                        className="px-3 py-2 rounded-xl bg-rose-500/10 text-rose-400 font-bold text-xs"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400">
                      {sub.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: POST UPDATES */}
          {activeTab === 'updates' && (
            <div className="space-y-6">
              <form onSubmit={handlePostUpdate} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
                <h4 className="text-sm font-bold text-white">Post Progress Update for Donors</h4>
                <input
                  type="text"
                  placeholder="Update Headline Title"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold"
                />
                <textarea
                  placeholder="Write the milestone story..."
                  value={updateContent}
                  onChange={(e) => setUpdateContent(e.target.value)}
                  rows={4}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none"
                />
                <input
                  type="text"
                  placeholder="Photo URL (optional)"
                  value={updateImage}
                  onChange={(e) => setUpdateImage(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold"
                >
                  Publish Progress Report
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[campaign.coverImage, ...(campaign.galleryImages || [])].map((img, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden bg-slate-800 aspect-[16/10] border border-slate-700">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white">Campaign Views & Engagement Metrics</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-xl bg-slate-800/60">
                  <span className="text-xs text-slate-400 block">Total Views</span>
                  <span className="text-xl font-bold text-white">{campaign.viewsCount || 420}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/60">
                  <span className="text-xs text-slate-400 block">Social Shares</span>
                  <span className="text-xl font-bold text-emerald-400">{campaign.sharesCount || 85}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/60">
                  <span className="text-xs text-slate-400 block">Donor Conversion</span>
                  <span className="text-xl font-bold text-indigo-400">18.5%</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
              <h4 className="text-sm font-bold text-white">Manage Campaign Configuration</h4>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Goal Amount ($)</label>
                <input
                  type="number"
                  value={editForm.targetAmount}
                  onChange={(e) => setEditForm({ ...editForm, targetAmount: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold"
                />
              </div>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold">
                Save Campaign Settings
              </button>
            </form>
          )}

        </div>

        {/* Right 4 Columns Summary Panel */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Progress Summary Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Campaign Funding Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-2xl font-extrabold text-white">${campaign.currentAmount.toLocaleString()}</span>
                <span className="text-xs font-bold text-emerald-400">{percent}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${percent}%` }} />
              </div>
              <div className="flex justify-between text-xs text-slate-400 font-semibold">
                <span>Remaining: ${remaining.toLocaleString()}</span>
                <span>Goal: ${campaign.targetAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Recent Campaign Supporters Feed */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified Benefactors</h4>
            <div className="space-y-2 text-xs">
              {supporters.slice(0, 4).map((sup) => (
                <div key={sup.id} className="p-2.5 rounded-xl bg-slate-800/40 flex items-center justify-between">
                  <span className="font-bold text-white">{sup.donorName}</span>
                  <span className="font-mono font-bold text-emerald-400">+${sup.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Screenshot Lightbox Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-slate-900 rounded-2xl p-4 border border-slate-800">
            <button onClick={() => setPreviewImage(null)} className="absolute top-4 right-4 text-white">
              <X className="w-6 h-6" />
            </button>
            <img src={previewImage} alt="Proof" className="w-full h-auto max-h-[80vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};

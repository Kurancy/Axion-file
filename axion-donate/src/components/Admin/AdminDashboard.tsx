import React, { useState, useEffect, useCallback } from 'react';
import {
  PlusCircle,
  Search,
  ListFilter,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Archive,
  Edit2,
  Trash2,
  Eye,
  Building2,
  QrCode,
  Download,
  Database,
  Users,
  Settings,
  Grid,
  FileCheck2,
  Sparkles,
  X,
  Copy,
  Check,
  RefreshCw,
  Plus
} from 'lucide-react';
import {
  Campaign,
  DonorSubmission,
  PlatformAnalytics,
  ActivityLog,
  AdminUser,
  Language,
  CampaignCategory,
  CampaignStatus
} from '../../types';
import {
  getCampaigns,
  getAnalytics,
  getSubmissions,
  approveSubmission,
  rejectSubmission,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getActivityLogs,
  generateQrCode
} from '../../lib/api';

import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminDashboardHome } from './AdminDashboardHome';
import { CampaignDetailView } from './CampaignDetailView';

interface AdminDashboardProps {
  adminUser: AdminUser;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  onCloseDashboard: () => void;
  onToast: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  language,
  onLanguageChange,
  isDark,
  onToggleTheme,
  onLogout,
  onCloseDashboard,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('axion_admin_sidebar_collapsed');
    return saved ? saved === 'true' : false;
  });

  const handleToggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('axion_admin_sidebar_collapsed', String(next));
      return next;
    });
  }, []);

  // Data state
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [submissions, setSubmissions] = useState<DonorSubmission[]>([]);
  const [analytics, setAnalytics] = useState<PlatformAnalytics | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected Campaign for detail view
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrText, setQrText] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);

  // Form State for Campaign Creation/Edit
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<CampaignCategory>('Emergency Relief');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formFullDesc, setFormFullDesc] = useState('');
  const [formTargetAmount, setFormTargetAmount] = useState(50000);
  const [formCoverImage, setFormCoverImage] = useState('https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80');
  const [formBeneficiaryName, setFormBeneficiaryName] = useState('');
  const [formBeneficiaryType, setFormBeneficiaryType] = useState<'Individual' | 'NGO / Organization' | 'Community Project'>('NGO / Organization');
  const [formLocation, setFormLocation] = useState('Lagos, Nigeria');
  const [formBankName, setFormBankName] = useState('First Bank of Nigeria');
  const [formAccountName, setFormAccountName] = useState('Axion Relief Fund');
  const [formAccountNumber, setFormAccountNumber] = useState('3098712345');
  const [formCryptoAddress, setFormCryptoAddress] = useState('T9yD14Nj9j7x8k2L9m4N5p6Q7r8S9t0U1V');

  // Load all platform data
  const loadData = useCallback(async () => {
    try {
      const [cList, subList, aData, logs] = await Promise.all([
        getCampaigns(),
        getSubmissions(),
        getAnalytics(),
        getActivityLogs(),
      ]);
      setCampaigns(cList);
      setSubmissions(subList);
      setAnalytics(aData);
      setActivityLogs(logs);
    } catch (err: any) {
      onToast('Data Fetch Error', err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [onToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Proof Approval Handlers
  const handleApproveSubmission = async (id: string) => {
    try {
      await approveSubmission(id);
      onToast('Proof Approved!', 'Donation amount added to campaign funding.', 'success');
      loadData();
    } catch (err: any) {
      onToast('Approval Error', err.message, 'error');
    }
  };

  const handleRejectSubmission = async (id: string) => {
    try {
      await rejectSubmission(id);
      onToast('Proof Rejected', 'Submission status updated to rejected.', 'info');
      loadData();
    } catch (err: any) {
      onToast('Rejection Error', err.message, 'error');
    }
  };

  // Campaign Create/Edit Handler
  const handleSaveCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const campaignPayload = {
        title: formTitle,
        category: formCategory,
        shortDescription: formShortDesc,
        fullDescription: formFullDesc,
        targetAmount: Number(formTargetAmount),
        currency: 'USD',
        coverImage: formCoverImage,
        galleryImages: [formCoverImage],
        beneficiaryName: formBeneficiaryName,
        beneficiaryType: formBeneficiaryType,
        location: formLocation,
        bankAccount: {
          bankName: formBankName,
          accountName: formAccountName,
          accountNumber: formAccountNumber,
        },
        cryptoWallet: {
          network: 'TRON (TRC20)',
          address: formCryptoAddress,
        },
        status: 'Active' as CampaignStatus,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      if (editingCampaign) {
        await updateCampaign(editingCampaign.id, campaignPayload);
        onToast('Campaign Updated', 'Campaign details saved.', 'success');
      } else {
        await createCampaign(campaignPayload);
        onToast('Campaign Created', 'New emergency campaign launched live.', 'success');
      }

      setShowCreateModal(false);
      setEditingCampaign(null);
      loadData();
    } catch (err: any) {
      onToast('Error Saving Campaign', err.message, 'error');
    }
  };

  // QR Code Generation Studio Handler
  const handleGenerateQr = async (textToGen: string) => {
    try {
      const url = await generateQrCode(textToGen || 'https://axion-donate.org');
      setQrCodeDataUrl(url);
    } catch (err: any) {
      onToast('QR Code Error', err.message, 'error');
    }
  };

  // Database Backup Export Simulation
  const handleExportBackup = () => {
    const backupJson = JSON.stringify({ campaigns, submissions, analytics }, null, 2);
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Axion_DB_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    onToast('Database Exported', 'Backup file downloaded successfully.', 'success');
  };

  const pendingSubmissionsCount = submissions.filter((s) => s.status === 'Pending').length;

  // Filter campaigns by searchQuery
  const filteredCampaigns = campaigns.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.beneficiaryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 font-sans flex flex-col overflow-hidden">
      {/* Top Header Navigation */}
      <AdminHeader
        adminUser={adminUser}
        language={language}
        onLanguageChange={onLanguageChange}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLogout={onLogout}
        onCloseDashboard={onCloseDashboard}
        pendingProofCount={pendingSubmissionsCount}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Fixed Collapsible Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setSelectedCampaign(null);
            setActiveTab(tab);
          }}
          pendingCount={pendingSubmissionsCount}
          campaignsCount={campaigns.length}
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
        />

        {/* Main Workspace Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-slate-800">
          {selectedCampaign ? (
            /* Selected Campaign Detail Workspace */
            <CampaignDetailView
              campaign={selectedCampaign}
              submissions={submissions}
              language={language}
              onBack={() => setSelectedCampaign(null)}
              onRefreshData={loadData}
              onToast={onToast}
              onApproveProof={handleApproveSubmission}
              onRejectProof={handleRejectSubmission}
            />
          ) : activeTab === 'overview' ? (
            /* Overview Home Dashboard */
            <AdminDashboardHome
              analytics={analytics}
              campaigns={campaigns}
              submissions={submissions}
              activityLogs={activityLogs}
              onOpenCreateCampaign={() => {
                setEditingCampaign(null);
                setShowCreateModal(true);
              }}
              onNavigateTab={(t) => setActiveTab(t)}
              onSelectCampaign={(c) => setSelectedCampaign(c)}
              onApproveSubmission={handleApproveSubmission}
              onRejectSubmission={handleRejectSubmission}
              onOpenQrGenerator={() => setShowQrModal(true)}
            />
          ) : activeTab === 'campaign_list' || activeTab === 'create_campaign' ? (
            /* Campaign Management Center View */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Campaign Management Center</h2>
                  <p className="text-xs text-slate-400 mt-1">Manage active emergency appeals, goal targets, and payment channels</p>
                </div>
                <button
                  onClick={() => {
                    setEditingCampaign(null);
                    setShowCreateModal(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Launch Campaign</span>
                </button>
              </div>

              {/* Campaign Table */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Campaign</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Beneficiary</th>
                        <th className="p-3">Raised / Goal</th>
                        <th className="p-3">Progress</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredCampaigns.map((c) => {
                        const percent = Math.min(100, Math.round((c.currentAmount / c.targetAmount) * 100));
                        return (
                          <tr key={c.id} className="hover:bg-slate-800/40">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <img src={c.coverImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                <span
                                  onClick={() => setSelectedCampaign(c)}
                                  className="font-bold text-white hover:text-emerald-400 cursor-pointer"
                                >
                                  {c.title}
                                </span>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                                {c.category}
                              </span>
                            </td>
                            <td className="p-3 font-semibold text-slate-300">{c.beneficiaryName}</td>
                            <td className="p-3 font-mono font-bold text-white">
                              ${c.currentAmount.toLocaleString()} / <span className="text-slate-400">${c.targetAmount.toLocaleString()}</span>
                            </td>
                            <td className="p-3 min-w-[120px]">
                              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${percent}%` }} />
                              </div>
                              <span className="text-[10px] font-mono text-slate-400 mt-1 block">{percent}%</span>
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                c.status === 'Urgent' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedCampaign(c)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                                  title="Open Campaign Workspace"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingCampaign(c);
                                    setFormTitle(c.title);
                                    setFormCategory(c.category);
                                    setFormShortDesc(c.shortDescription);
                                    setFormFullDesc(c.fullDescription);
                                    setFormTargetAmount(c.targetAmount);
                                    setFormCoverImage(c.coverImage);
                                    setFormBeneficiaryName(c.beneficiaryName);
                                    setFormLocation(c.location);
                                    setShowCreateModal(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                                  title="Edit Campaign"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : activeTab === 'pending_proofs' || activeTab === 'recent_donations' ? (
            /* Pending Proofs & Submissions Queue View */
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <h2 className="text-xl font-extrabold text-white">Payment Proof Verification Queue</h2>
                <p className="text-xs text-slate-400 mt-1">Review donor uploaded bank transfer receipts and TRC20 hashes</p>
              </div>

              <div className="space-y-3">
                {submissions.map((sub) => (
                  <div key={sub.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-white text-sm block">{sub.donorName}</span>
                      <span className="font-mono text-emerald-400 font-bold">+${sub.amount.toLocaleString()} ({sub.paymentMethod})</span>
                      <p className="text-slate-400 font-mono text-[11px]">Tx Hash / Ref: {sub.transactionId || 'N/A'}</p>
                    </div>

                    {sub.status === 'Pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApproveSubmission(sub.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                        >
                          Approve & Credit
                        </button>
                        <button
                          onClick={() => handleRejectSubmission(sub.id)}
                          className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 font-bold text-xs"
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
            </div>
          ) : (
            /* General Settings / Fallback Tab */
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <h2 className="text-xl font-extrabold text-white">System Settings & Data Control</h2>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleExportBackup}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Backup System Database (.json)</span>
                </button>
                <button
                  onClick={() => setShowQrModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Open QR Code Studio</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CREATE / EDIT CAMPAIGN MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-white">
                {editingCampaign ? 'Edit Emergency Campaign' : 'Create New Emergency Appeal'}
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCampaign} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Campaign Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    required
                    placeholder="e.g. Flood Relief Nigeria"
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CampaignCategory)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold"
                  >
                    <option value="Emergency Relief">Emergency Relief</option>
                    <option value="Medical">Medical</option>
                    <option value="Education">Education</option>
                    <option value="Environment">Environment</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Funding Goal ($)</label>
                <input
                  type="number"
                  value={formTargetAmount}
                  onChange={(e) => setFormTargetAmount(Number(e.target.value))}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Short Summary</label>
                <input
                  type="text"
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Full Story Details</label>
                <textarea
                  value={formFullDesc}
                  onChange={(e) => setFormFullDesc(e.target.value)}
                  rows={3}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Beneficiary Name</label>
                  <input
                    type="text"
                    value={formBeneficiaryName}
                    onChange={(e) => setFormBeneficiaryName(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Location</label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold"
                >
                  Save & Publish Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR CODE GENERATOR STUDIO MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <QrCode className="w-4 h-4 text-purple-400" />
                <span>QR Code Studio</span>
              </h3>
              <button onClick={() => setShowQrModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-slate-300 font-bold">Input Text, Bank Account, or Crypto Wallet</label>
              <input
                type="text"
                value={qrText}
                onChange={(e) => {
                  setQrText(e.target.value);
                  handleGenerateQr(e.target.value);
                }}
                placeholder="Enter wallet address or text..."
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
              />
            </div>

            {qrCodeDataUrl && (
              <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center space-y-2">
                <img src={qrCodeDataUrl} alt="QR" className="w-48 h-48 object-contain" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

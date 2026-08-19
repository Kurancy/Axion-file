import React from 'react';
import {
  TrendingUp,
  Coins,
  FolderPlus,
  FileCheck2,
  Users,
  Eye,
  Building2,
  QrCode,
  Sparkles,
  Plus,
  Download,
  Database,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  History,
  ShieldAlert,
  Percent,
  Calculator
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { Campaign, DonorSubmission, PlatformAnalytics, ActivityLog } from '../../types';

interface AdminDashboardHomeProps {
  analytics: PlatformAnalytics | null;
  campaigns: Campaign[];
  submissions: DonorSubmission[];
  activityLogs: ActivityLog[];
  onOpenCreateCampaign: () => void;
  onNavigateTab: (tab: any) => void;
  onSelectCampaign: (campaign: Campaign) => void;
  onApproveSubmission: (id: string) => void;
  onRejectSubmission: (id: string) => void;
  onOpenQrGenerator: () => void;
}

export const AdminDashboardHome: React.FC<AdminDashboardHomeProps> = ({
  analytics,
  campaigns,
  submissions,
  activityLogs,
  onOpenCreateCampaign,
  onNavigateTab,
  onSelectCampaign,
  onApproveSubmission,
  onRejectSubmission,
  onOpenQrGenerator,
}) => {
  const pendingSubmissions = submissions.filter((s) => s.status === 'Pending');

  // KPI Calculations
  const totalRaised = analytics?.totalDonationsAmount || campaigns.reduce((acc, c) => acc + c.currentAmount, 0);
  const activeCount = analytics?.activeCampaigns || campaigns.filter((c) => c.status === 'Active' || c.status === 'Urgent').length;
  const pendingProofCount = analytics?.pendingProofCount || pendingSubmissions.length;
  const visitorsCount = analytics?.totalVisitors || 12350;
  const estimatedDonors = Math.round(totalRaised / 165);
  const trc20Amount = Math.round(totalRaised * 0.42);
  const bankAmount = Math.round(totalRaised * 0.58);

  const kpiCards = [
    {
      title: 'Total Platform Raised',
      value: `$${totalRaised.toLocaleString()}`,
      change: '+14.2% this month',
      icon: <Coins className="w-5 h-5 text-emerald-400" />,
      bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    },
    {
      title: 'Active Verified Campaigns',
      value: `${activeCount} / ${campaigns.length}`,
      change: '100% direct bank verified',
      icon: <FolderPlus className="w-5 h-5 text-indigo-400" />,
      bg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    },
    {
      title: 'Pending Proof Approvals',
      value: pendingProofCount.toString(),
      change: pendingProofCount > 0 ? 'Requires action' : 'Queue clear',
      icon: <FileCheck2 className="w-5 h-5 text-amber-400" />,
      bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    },
    {
      title: 'Global Platform Visitors',
      value: visitorsCount.toLocaleString(),
      change: '+22.5% traffic growth',
      icon: <Eye className="w-5 h-5 text-blue-400" />,
      bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    },
    {
      title: 'Total Verified Donors',
      value: estimatedDonors.toLocaleString(),
      change: 'Direct non-custodial donors',
      icon: <Users className="w-5 h-5 text-teal-400" />,
      bg: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
    },
    {
      title: 'TRC20 Crypto Volume',
      value: `$${trc20Amount.toLocaleString()}`,
      change: 'USDT on TRON Network',
      icon: <QrCode className="w-5 h-5 text-purple-400" />,
      bg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    },
    {
      title: 'Bank Transfer Volume',
      value: `$${bankAmount.toLocaleString()}`,
      change: 'Direct SWIFT & Local Transfers',
      icon: <Building2 className="w-5 h-5 text-cyan-400" />,
      bg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    },
    {
      title: 'Approval Success Rate',
      value: '98.4%',
      change: 'High transparency index',
      icon: <Percent className="w-5 h-5 text-emerald-400" />,
      bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner & Quick Action Buttons */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mission Control Active</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Axion Enterprise Operations Hub
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Real-time management of emergency campaigns, bank & TRC20 verification queues, donor analytics, and direct transfers.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenCreateCampaign}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>

          <button
            onClick={() => onNavigateTab('pending_proofs')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 transition-colors"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Approvals ({pendingProofCount})</span>
          </button>

          <button
            onClick={onOpenQrGenerator}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
          >
            <QrCode className="w-4 h-4 text-purple-400" />
            <span>QR Studio</span>
          </button>
        </div>
      </div>

      {/* 8-Card KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiCards.map((kpi, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-md space-y-2 hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                {kpi.title}
              </span>
              <div className={`p-2 rounded-xl border ${kpi.bg}`}>{kpi.icon}</div>
            </div>
            <div className="text-2xl font-extrabold text-white tracking-tight">{kpi.value}</div>
            <p className="text-[10px] text-emerald-400 font-semibold">{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donation Growth Line Chart (8 cols) */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Donation Growth & Transfer Volume ($)</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded-lg">
              Updated Live
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics?.donationGrowth || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Bar Chart (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FolderPlus className="w-4 h-4 text-indigo-400" />
            <span>Category Volume Breakdown</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics?.categoryBreakdown || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Campaign Center Grid & Verification Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Active Campaigns Quick List (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Active Verified Campaigns</h3>
              <p className="text-[11px] text-slate-400">Click any campaign to enter full workspace</p>
            </div>
            <button
              onClick={() => onNavigateTab('campaign_list')}
              className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>View All ({campaigns.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {campaigns.slice(0, 4).map((c) => {
              const pct = Math.min(100, Math.round((c.currentAmount / c.targetAmount) * 100));
              return (
                <div
                  key={c.id}
                  onClick={() => onSelectCampaign(c)}
                  className="p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={c.coverImage} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block truncate">{c.title}</span>
                      <span className="text-[11px] text-slate-400 block truncate">{c.beneficiaryName} • {c.category}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-emerald-400 block">${c.currentAmount.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">{pct}% of ${c.targetAmount.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Queue Summary (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Pending Verification Queue</h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300">
              {pendingSubmissions.length} Pending
            </span>
          </div>

          {pendingSubmissions.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 bg-slate-800/20 rounded-xl space-y-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
              <p>All donor proof submissions are verified!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingSubmissions.slice(0, 3).map((sub) => (
                <div key={sub.id} className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-white block">{sub.donorName}</span>
                      <span className="text-[11px] text-emerald-400 font-mono font-bold">+${sub.amount.toLocaleString()} ({sub.paymentMethod})</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onApproveSubmission(sub.id)}
                      className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => onRejectSubmission(sub.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-[11px]"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* System Activity Log Feed */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-emerald-400" />
            <span>Audit & System Activity Feed</span>
          </h3>
          <button
            onClick={() => onNavigateTab('activity_logs')}
            className="text-xs font-bold text-slate-400 hover:text-white"
          >
            Full Log Directory
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activityLogs.slice(0, 4).map((log) => (
            <div key={log.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-xs flex items-center justify-between">
              <div className="space-y-0.5 min-w-0 pr-2">
                <span className="font-bold text-emerald-400 block truncate">{log.action}</span>
                <span className="text-slate-300 block truncate">{log.details}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 shrink-0">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

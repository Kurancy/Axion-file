import React, { useState } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  FolderPlus,
  ListFilter,
  PlusCircle,
  Clock,
  Archive,
  Tags,
  HeartHandshake,
  FileCheck2,
  CheckCircle,
  XCircle,
  UserCheck,
  Users,
  Award,
  Repeat,
  Building2,
  QrCode,
  History,
  ShieldAlert,
  Image as ImageIcon,
  FileSpreadsheet,
  Video,
  Grid,
  Newspaper,
  MessageSquare,
  HelpCircle,
  UserCog,
  ShieldCheck,
  Lock,
  Settings,
  CreditCard,
  Globe,
  BellRing,
  Key,
  Database,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AdminUser, Language } from '../../types';

export type AdminTab =
  | 'overview'
  | 'analytics'
  | 'reports'
  | 'campaign_list'
  | 'create_campaign'
  | 'draft_campaigns'
  | 'archived_campaigns'
  | 'campaign_categories'
  | 'recent_donations'
  | 'pending_proofs'
  | 'approved_donations'
  | 'rejected_donations'
  | 'anonymous_donations'
  | 'donor_list'
  | 'top_donors'
  | 'bank_transfers'
  | 'trc20_transactions'
  | 'verification_queue'
  | 'media_gallery'
  | 'qr_codes'
  | 'campaign_updates'
  | 'activity_logs'
  | 'administrators'
  | 'general_settings'
  | 'security';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  pendingCount: number;
  campaignsCount: number;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  pendingCount,
  campaignsCount,
  collapsed,
  onToggleCollapse,
}) => {
  const [openSection, setOpenSection] = useState<string>('campaigns');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const navSections = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4 text-emerald-400" />,
      items: [
        { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
        { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-3.5 h-3.5" /> },
        { id: 'reports', label: 'Reports', icon: <FileText className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'campaigns',
      title: 'Campaign Center',
      icon: <FolderPlus className="w-4 h-4 text-indigo-400" />,
      badge: campaignsCount,
      items: [
        { id: 'campaign_list', label: 'Campaign List', icon: <ListFilter className="w-3.5 h-3.5" />, count: campaignsCount },
        { id: 'create_campaign', label: 'Create Campaign', icon: <PlusCircle className="w-3.5 h-3.5 text-emerald-400" /> },
        { id: 'draft_campaigns', label: 'Drafts', icon: <Clock className="w-3.5 h-3.5" /> },
        { id: 'archived_campaigns', label: 'Archived', icon: <Archive className="w-3.5 h-3.5" /> },
        { id: 'campaign_categories', label: 'Categories', icon: <Tags className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'donations',
      title: 'Donations & Proofs',
      icon: <HeartHandshake className="w-4 h-4 text-rose-400" />,
      badge: pendingCount > 0 ? pendingCount : undefined,
      badgeColor: 'bg-rose-500',
      items: [
        { id: 'pending_proofs', label: 'Pending Approvals', icon: <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />, count: pendingCount },
        { id: 'recent_donations', label: 'Recent Donations', icon: <History className="w-3.5 h-3.5" /> },
        { id: 'approved_donations', label: 'Approved Donations', icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> },
        { id: 'rejected_donations', label: 'Rejected Donations', icon: <XCircle className="w-3.5 h-3.5 text-rose-400" /> },
      ],
    },
    {
      id: 'donors',
      title: 'Donors',
      icon: <Users className="w-4 h-4 text-teal-400" />,
      items: [
        { id: 'donor_list', label: 'Donor Directory', icon: <Users className="w-3.5 h-3.5" /> },
        { id: 'top_donors', label: 'Top Benefactors', icon: <Award className="w-3.5 h-3.5 text-amber-400" /> },
      ],
    },
    {
      id: 'payments',
      title: 'Payment Channels',
      icon: <CreditCard className="w-4 h-4 text-blue-400" />,
      items: [
        { id: 'bank_transfers', label: 'Bank Transfers', icon: <Building2 className="w-3.5 h-3.5" /> },
        { id: 'trc20_transactions', label: 'TRC20 Wallet', icon: <QrCode className="w-3.5 h-3.5 text-emerald-400" /> },
        { id: 'verification_queue', label: 'Verification Queue', icon: <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" /> },
      ],
    },
    {
      id: 'media',
      title: 'Media & Assets',
      icon: <ImageIcon className="w-4 h-4 text-purple-400" />,
      items: [
        { id: 'media_gallery', label: 'Media Library', icon: <Grid className="w-3.5 h-3.5" /> },
        { id: 'qr_codes', label: 'QR Code Studio', icon: <QrCode className="w-3.5 h-3.5 text-emerald-400" /> },
      ],
    },
    {
      id: 'content',
      title: 'Content & Updates',
      icon: <Newspaper className="w-4 h-4 text-amber-400" />,
      items: [
        { id: 'campaign_updates', label: 'Campaign Updates', icon: <Sparkles className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'system',
      title: 'System & Security',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      items: [
        { id: 'administrators', label: 'Administrators', icon: <UserCog className="w-3.5 h-3.5" /> },
        { id: 'activity_logs', label: 'Audit Activity Logs', icon: <History className="w-3.5 h-3.5" /> },
        { id: 'general_settings', label: 'General Settings', icon: <Settings className="w-3.5 h-3.5" /> },
        { id: 'security', label: 'Security & API Keys', icon: <Lock className="w-3.5 h-3.5" /> },
      ],
    },
  ];

  return (
    <aside
      className={`relative z-20 bg-slate-900/95 border-r border-slate-800 transition-all duration-300 flex flex-col shrink-0 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-white text-xs tracking-tight block">
                Axion Admin OS
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                v2.6 Enterprise
              </span>
            </div>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors mx-auto"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
        {navSections.map((sec) => (
          <div key={sec.id} className="space-y-1">
            {!collapsed ? (
              <div
                onClick={() => toggleSection(sec.id)}
                className="flex items-center justify-between px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  {sec.icon}
                  <span>{sec.title}</span>
                </div>
                {sec.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold text-white ${
                      sec.badgeColor || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {sec.badge}
                  </span>
                )}
              </div>
            ) : (
              <div className="w-full flex justify-center py-2 text-slate-400" title={sec.title}>
                {sec.icon}
              </div>
            )}

            {(openSection === sec.id || collapsed) && (
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id as AdminTab)}
                      className={`w-full flex items-center ${
                        collapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
                      } rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 font-bold'
                          : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.icon}
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {!collapsed && item.count !== undefined && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-300">Backend Synced</span>
          </div>
          <span className="font-mono text-[10px]">API 200 OK</span>
        </div>
      )}
    </aside>
  );
};

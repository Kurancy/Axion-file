import React, { useState } from 'react';
import {
  Search,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  Globe,
  Settings,
  LogOut,
  ShieldCheck,
  User,
  ExternalLink,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { AdminUser, Language } from '../../types';

interface AdminHeaderProps {
  adminUser: AdminUser;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLogout: () => void;
  onCloseDashboard: () => void;
  pendingProofCount: number;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  adminUser,
  language,
  onLanguageChange,
  isDark,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  onLogout,
  onCloseDashboard,
  pendingProofCount,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const mockNotifications = [
    {
      id: '1',
      title: 'New Donation Proof Uploaded',
      desc: '$2,500 Bank Transfer for Cardiac Surgery Unit',
      time: '5m ago',
      unread: true,
    },
    {
      id: '2',
      title: 'TRC20 Wallet Payment Verified',
      desc: '$1,000 USDT added to Clean Solar Water Well',
      time: '18m ago',
      unread: true,
    },
    {
      id: '3',
      title: 'Campaign Milestone Reached',
      desc: 'Flood Relief Nigeria hit 75% goal target',
      time: '1h ago',
      unread: false,
    },
  ];

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 px-4 md:px-6 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4">
      {/* Search Input Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search campaigns, donor names, tx hashes, bank accounts..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
        </div>
      </div>

      {/* Right Controls Bar */}
      <div className="flex items-center gap-3 shrink-0">
        
        {/* Back to Public Site */}
        <button
          onClick={onCloseDashboard}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/60 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          <span>Public Portal</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors relative"
            title="System Alerts"
          >
            <Bell className="w-4 h-4" />
            {pendingProofCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                {pendingProofCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-white">System Notifications</span>
                <span className="text-[10px] text-emerald-400 font-semibold">{pendingProofCount} pending</span>
              </div>
              <div className="space-y-2">
                {mockNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl text-xs space-y-1 transition-colors ${
                      n.unread ? 'bg-slate-800/80 border border-emerald-500/20' : 'bg-slate-950/40'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-300">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Language Switcher */}
        <div className="relative group hidden md:block">
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700/60">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="uppercase">{language}</span>
          </button>
          <div className="absolute right-0 top-full mt-1 hidden group-hover:block w-32 rounded-xl bg-slate-900 border border-slate-800 p-1 shadow-xl z-50">
            {['en', 'es', 'fr', 'ar'].map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang as Language)}
                className={`w-full text-left px-3 py-1.5 text-xs rounded-lg uppercase ${
                  language === lang ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Dark/Light Mode */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Toggle Theme Mode"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Admin Profile Info & Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/60 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-xs shrink-0">
              {adminUser.name[0]}
            </div>
            <div className="text-left hidden lg:block">
              <span className="text-xs font-bold text-white block leading-tight truncate max-w-[120px]">
                {adminUser.name}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono block">
                {adminUser.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 space-y-1">
              <div className="p-3 border-b border-slate-800 text-xs">
                <span className="font-bold text-white block">{adminUser.name}</span>
                <span className="text-[10px] text-slate-400 block truncate">{adminUser.email}</span>
                <span className="text-[10px] text-slate-500 mt-1 block font-mono">
                  {currentDateFormatted}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out Admin</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  HeartHandshake, Sun, Moon, Globe, Shield, Search, LogOut,
  LayoutDashboard, Menu, X, ChevronRight
} from 'lucide-react';
import { Language, AdminUser } from '../types';
import { translations } from '../lib/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  adminUser: AdminUser | null;
  onLogoutAdmin: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const navLinks = [
  { label: 'Explore Campaigns', to: '/campaigns' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  isDark,
  onToggleTheme,
  adminUser,
  onLogoutAdmin,
  searchQuery,
  onSearchChange,
}) => {
  const t = translations[language];
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const activeClass = 'text-emerald-400 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-500 after:rounded-full';
  const inactiveClass = 'text-slate-400 hover:text-slate-200 relative';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 w-full backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-indigo-600 p-0.5 shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
              Axion <span className="text-emerald-500">Donate</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-lg transition-colors pb-2 ${isActive ? activeClass : inactiveClass}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right-side Controls */}
          <div className="flex items-center gap-2">
            {/* Desktop Search */}
            <div className="hidden md:block relative w-52">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => navigate('/campaigns')}
                placeholder="Search campaigns..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-full bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all"
              />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearch((v) => !v)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Selector */}
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-800 transition-colors border border-slate-800">
                <Globe className="w-3.5 h-3.5 text-emerald-500" />
                <span className="uppercase">{language}</span>
              </button>
              <div className="absolute right-0 top-full mt-1 hidden group-hover:block w-32 rounded-xl bg-slate-900 border border-slate-800 shadow-xl p-1 z-50">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'es', label: 'Español' },
                  { code: 'fr', label: 'Français' },
                  { code: 'ar', label: 'العربية' },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code as Language)}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${
                      language === lang.code
                        ? 'bg-emerald-950/60 text-emerald-400 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-800 transition-colors border border-slate-800"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Admin Dashboard Button */}
            {adminUser ? (
              <div className="hidden sm:flex items-center gap-2">
                <NavLink
                  to="/admin"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-semibold transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
                  Dashboard
                </NavLink>
                <button
                  onClick={onLogoutAdmin}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <NavLink
                to="/admin"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-semibold transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                Admin
              </NavLink>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setShowMobileMenu((v) => !v)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => { navigate('/campaigns'); }}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none"
                autoFocus
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-30 pt-16" onClick={() => setShowMobileMenu(false)}>
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
          <div
            className="absolute top-0 right-0 w-72 h-full bg-slate-950 border-l border-slate-800 pt-4 px-4 pb-8 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 pt-2">
              <span className="text-sm font-bold text-white">Navigation</span>
              <button onClick={() => setShowMobileMenu(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1 flex-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setShowMobileMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </NavLink>
              ))}

              <div className="pt-3 border-t border-slate-800 mt-3">
                <NavLink
                  to="/admin"
                  onClick={() => setShowMobileMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-800/40'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-400" />
                    Admin Dashboard
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </NavLink>
              </div>
            </nav>

            {/* Lang + Theme at bottom */}
            <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
              <div className="flex gap-2">
                {['en', 'es', 'fr', 'ar'].map((code) => (
                  <button
                    key={code}
                    onClick={() => onLanguageChange(code as Language)}
                    className={`px-2 py-1 rounded-md text-xs font-semibold uppercase transition-colors ${
                      language === code ? 'bg-emerald-900/60 text-emerald-400' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-lg bg-slate-900 text-slate-300"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

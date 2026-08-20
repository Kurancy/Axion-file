import { useState } from "react";
import { Globe, Menu, X, ChevronDown, Zap, Lock } from "lucide-react";
import { ActivePage, Language } from "../types";
import { translations } from "../data/mockData";
import AxionLogo from "./AxionLogo";


interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

export default function Header({
  activePage,
  setActivePage,
  language,
  setLanguage,
  isDarkMode,
  setIsDarkMode,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const t = translations[language];

  const navItems: { id: ActivePage; label: string }[] = [
    { id: "home",      label: t.navHome },
    { id: "services",  label: t.navServices },
    { id: "industries",label: t.navIndustries },
    { id: "solutions", label: t.navSolutions },
    { id: "portfolio", label: t.navPortfolio },
    { id: "company",   label: t.navCompany },
    { id: "timeline",  label: t.navTimeline },
    { id: "contact",   label: t.navContact },
  ];

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  return (
    <header
      id="axion-header"
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-xl border-b ${
        isDarkMode
          ? "bg-brand-dark/85 border-blue-950/60"
          : "bg-white/95 border-slate-200/80"
      }`}
      style={{ boxShadow: isDarkMode ? "0 1px 32px rgba(37,99,235,0.07)" : "0 1px 16px rgba(0,0,0,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── Brand Logo ── */}
          <div
            id="axion-brand-logo"
            className="flex items-center gap-3 cursor-pointer shrink-0"
            onClick={() => setActivePage("home")}
            role="button"
            aria-label="Axion Technologies Ltd. Home"
          >
            {/* Desktop Logo Height: 44px */}
            <div className="hidden sm:block">
              <AxionLogo logoSize={44} isDarkMode={isDarkMode} glow={true} interactive={true} />
            </div>
            {/* Mobile Logo Height: 36px */}
            <div className="block sm:hidden">
              <AxionLogo logoSize={36} isDarkMode={isDarkMode} glow={true} interactive={true} />
            </div>
          </div>

          {/* ── Desktop Navigation ── */}
          <nav id="axion-desktop-nav" className="hidden xl:flex items-center gap-1 mx-4">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActivePage(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? isDarkMode
                        ? "text-blue-400 bg-blue-950/60"
                        : "text-blue-600 bg-blue-50"
                      : isDarkMode
                      ? "text-slate-400 hover:text-slate-100 hover:bg-slate-800/40"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-blue-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">

            {/* Language Selector */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium border transition-all cursor-pointer ${
                  isDarkMode
                    ? "text-slate-400 bg-slate-900/60 border-slate-700/50 hover:border-slate-600 hover:text-slate-300"
                    : "text-slate-600 bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase font-mono">{language}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isLangDropdownOpen && (
                <div
                  id="language-dropdown"
                  className={`absolute right-0 mt-2 w-36 rounded-xl shadow-2xl border py-1 z-50 ${
                    isDarkMode
                      ? "bg-slate-900 border-slate-700 text-slate-300"
                      : "bg-white border-slate-200 text-slate-700"
                  }`}
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}
                >
                  {(["en", "fr", "sw"] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      className={`w-full text-left px-4 py-2.5 text-[12px] font-medium transition-colors ${
                        language === lang
                          ? "text-blue-400 bg-blue-950/40 font-semibold"
                          : isDarkMode
                          ? "hover:bg-slate-800 hover:text-white"
                          : "hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {lang === "en" ? "English" : lang === "fr" ? "Français" : "Kiswahili"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle theme"
              className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                isDarkMode
                  ? "bg-slate-900/60 border-slate-700/50 text-amber-400 hover:border-amber-400/30 hover:bg-amber-950/20"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Admin Portal Button */}
            <button
              id="header-admin-btn"
              onClick={() => setActivePage("admin")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-mono font-semibold border transition-all cursor-pointer ${
                activePage === "admin"
                  ? "bg-blue-600 text-white border-blue-500 shadow-md"
                  : isDarkMode
                  ? "bg-slate-900/80 border-blue-900/50 text-blue-300 hover:bg-blue-950/60 hover:border-blue-700"
                  : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>Admin Portal</span>
            </button>

            {/* Primary CTA */}
            <button
              id="header-cta-btn"
              onClick={() => setActivePage("consultation-hub")}
              className="btn-primary-axion flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-blue-200" />
              {t.navConsultation}
            </button>
          </div>

          {/* ── Mobile Controls ── */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border ${
                isDarkMode ? "bg-slate-900/60 border-slate-700/50 text-amber-400" : "bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className={`p-2 rounded-lg ${isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className={`xl:hidden px-4 pt-2 pb-6 border-t ${
            isDarkMode ? "bg-brand-dark/98 border-blue-950/60" : "bg-white border-slate-100"
          }`}
        >
          <div className="space-y-1 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setIsMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${
                  activePage === item.id
                    ? isDarkMode ? "bg-blue-950/60 text-blue-400" : "bg-blue-50 text-blue-600"
                    : isDarkMode ? "text-slate-400 hover:bg-slate-800/60 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className={`pt-4 border-t ${isDarkMode ? "border-slate-800" : "border-slate-100"} space-y-3`}>
            <div className="flex items-center justify-between px-2">
              <span className={`text-[12px] ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>Language:</span>
              <div className="flex gap-2">
                {(["en", "fr", "sw"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={`px-3 py-1 text-[11px] font-semibold uppercase rounded-lg border transition-all ${
                      language === lang
                        ? "bg-blue-600 border-blue-600 text-white"
                        : isDarkMode ? "bg-slate-900 border-slate-700 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-600"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setActivePage("admin"); setIsMobileMenuOpen(false); }}
                className="flex-1 py-3 rounded-xl text-[13px] font-mono font-semibold text-blue-300 bg-slate-900 border border-blue-800 text-center flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>Admin Portal</span>
              </button>
              <button
                onClick={() => { setActivePage("consultation-hub"); setIsMobileMenuOpen(false); }}
                className="btn-primary-axion flex-1 py-3 rounded-xl text-[13px] font-semibold text-white text-center"
              >
                {t.navConsultation}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

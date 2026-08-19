import { useState } from "react";
import { Globe, Menu, X, Cpu, Sparkles } from "lucide-react";
import { ActivePage, Language } from "../types";
import { translations } from "../data/mockData";

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
    { id: "home", label: t.navHome },
    { id: "services", label: t.navServices },
    { id: "industries", label: t.navIndustries },
    { id: "portfolio", label: t.navPortfolio },
    { id: "company", label: t.navCompany },
    { id: "timeline", label: t.navTimeline },
    { id: "container-telemetry", label: t.navContainerTelemetry },
    { id: "contact", label: t.navContact },
  ];

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  return (
    <header
      id="synapse-header"
      className={`sticky top-0 z-50 transition-colors duration-300 backdrop-blur-md border-b ${
        isDarkMode
          ? "bg-brand-dark/90 border-slate-800/80"
          : "bg-white/95 border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity Logo */}
          <div
            id="brand-logo-container"
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActivePage("home")}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr from-brand-blue to-cyan-500 text-white shadow-md shadow-brand-blue/20">
              <Cpu className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -inset-0.5 rounded-lg bg-brand-blue/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <span className={`text-xl font-bold tracking-tight font-display flex items-center ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}>
                SYNAPSE
                <span className="text-brand-blue-light ml-1 font-normal text-sm tracking-widest uppercase bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/20">
                  ENTERPRISE
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Toggles */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActivePage(item.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? isDarkMode
                        ? "text-brand-blue-light bg-slate-800/60 shadow-inner"
                        : "text-brand-blue bg-blue-50"
                      : isDarkMode
                      ? "text-slate-400 hover:text-white hover:bg-slate-800/35"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Center (Lang, Dark Mode, CTA) */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Multi-language Selector */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className={`p-2 rounded-md flex items-center gap-1.5 text-sm font-medium border transition-colors ${
                  isDarkMode
                    ? "text-slate-300 hover:text-white bg-slate-800/40 border-slate-700/60 hover:bg-slate-800"
                    : "text-slate-700 hover:text-slate-950 bg-slate-50 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Globe className="w-4.5 h-4.5" />
                <span className="uppercase">{language}</span>
              </button>

              {isLangDropdownOpen && (
                <div
                  id="language-dropdown"
                  className={`absolute right-0 mt-2 w-32 rounded-md shadow-lg py-1 border ring-1 ring-black ring-opacity-5 z-50 ${
                    isDarkMode
                      ? "bg-slate-900 border-slate-800 text-slate-300"
                      : "bg-white border-slate-200 text-slate-700"
                  }`}
                >
                  <button
                    onClick={() => toggleLanguage("en")}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-brand-blue/10 hover:text-brand-blue-light ${
                      language === "en" ? "font-bold text-brand-blue-light" : ""
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => toggleLanguage("fr")}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-brand-blue/10 hover:text-brand-blue-light ${
                      language === "fr" ? "font-bold text-brand-blue-light" : ""
                    }`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => toggleLanguage("sw")}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-brand-blue/10 hover:text-brand-blue-light ${
                      language === "sw" ? "font-bold text-brand-blue-light" : ""
                    }`}
                  >
                    Kiswahili
                  </button>
                </div>
              )}
            </div>

            {/* Premium Theme Switcher Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-md border transition-all ${
                isDarkMode
                  ? "bg-slate-800/40 hover:bg-slate-800 border-slate-700/60 text-yellow-400"
                  : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"
              }`}
              title="Toggle Theme Mode"
            >
              {isDarkMode ? (
                /* Sun Icon */
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                /* Moon Icon */
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* AI Assistant Core CTA */}
            <button
              id="header-cta-btn"
              onClick={() => setActivePage("consultation-hub")}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold bg-brand-blue hover:bg-brand-blue-light text-white shadow-md shadow-brand-blue/20 hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
              {t.navConsultation}
            </button>
          </div>

          {/* Mobile Menu Toggle button */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-md border ${
                isDarkMode ? "bg-slate-800/40 border-slate-700/60 text-yellow-400" : "bg-slate-50 border-slate-200 text-slate-800"
              }`}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className={`lg:hidden px-4 pt-2 pb-6 space-y-2 border-t ${
            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-100"
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-md text-base font-medium transition-colors ${
                activePage === item.id
                  ? isDarkMode
                    ? "bg-slate-800 text-brand-blue-light"
                    : "bg-blue-50 text-brand-blue"
                  : isDarkMode
                  ? "text-slate-400 hover:bg-slate-900 hover:text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-800/50 flex flex-col gap-3">
            <div className="flex items-center justify-between px-4">
              <span className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Select Language:</span>
              <div className="flex gap-2">
                {(["en", "fr", "sw"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={`px-3 py-1 text-xs font-semibold uppercase rounded border ${
                      language === lang
                        ? "bg-brand-blue border-brand-blue text-white"
                        : isDarkMode
                        ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                        : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                setActivePage("consultation-hub");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center py-3 rounded-lg text-sm font-semibold bg-brand-blue hover:bg-brand-blue-light text-white shadow"
            >
              {t.navConsultation}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

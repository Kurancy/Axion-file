import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Language, Campaign, AdminUser, PlatformAnalytics } from './types';
import { translations } from './lib/translations';
import { getCampaigns, getAnalytics, getAdminMe, clearAdminToken } from './lib/api';

// Layout
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ParticlesBackground } from './components/ParticlesBackground';
import { ToastContainer, ToastMessage } from './components/Toast';

// Modals
import { DonationProofModal } from './components/DonationProofModal';
import { ShareModal } from './components/ShareModal';

// Pages
import { Hero } from './components/Hero';
import { CampaignCard } from './components/CampaignCard';
import { CampaignDetailModal } from './components/CampaignDetailModal';
import { HowItWorks } from './components/pages/HowItWorks';
import { AboutUs } from './components/pages/AboutUs';
import { ContactPage } from './components/pages/ContactPage';
import { CampaignsPage } from './components/pages/CampaignsPage';
import { CampaignDetailPage } from './components/pages/CampaignDetailPage';

// Admin
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { AdminLoginModal } from './components/Admin/AdminLoginModal';

// ─── Shared app state passed down as props ───────────────────────────────────
interface AppState {
  language: Language;
  setLanguage: (l: Language) => void;
  isDark: boolean;
  setIsDark: (v: boolean) => void;
  adminUser: AdminUser | null;
  setAdminUser: (u: AdminUser | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  campaigns: Campaign[];
  analytics: PlatformAnalytics | null;
  toasts: ToastMessage[];
  addToast: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  loadPublicData: () => void;
  handleAdminLogout: () => void;
}

// ─── Admin Route Shell ──────────────────────────────────────────────────────
function AdminRoute(props: AppState) {
  const navigate = useNavigate();
  const {
    language, setLanguage, isDark, setIsDark, adminUser, setAdminUser,
    addToast, loadPublicData, toasts, removeToast, handleAdminLogout,
  } = props;

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden relative">
      {adminUser ? (
        <AdminDashboard
          adminUser={adminUser}
          language={language}
          onLanguageChange={setLanguage}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onLogout={handleAdminLogout}
          onCloseDashboard={() => navigate('/')}
          onToast={(title, desc, type) => {
            addToast(title, desc, type);
            loadPublicData();
          }}
        />
      ) : (
        <div className="h-screen w-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
          <ParticlesBackground isDark={true} />
          <AdminLoginModal
            language={language}
            onClose={() => navigate('/')}
            onLoginSuccess={(user) => {
              setAdminUser(user);
              addToast('Authenticated!', `Welcome back, ${user.name}`, 'success');
            }}
          />
        </div>
      )}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

// ─── Public Layout Wrapper ──────────────────────────────────────────────────
function PublicLayout(props: AppState) {
  const location = useLocation();
  const {
    language, setLanguage, isDark, setIsDark, adminUser,
    handleAdminLogout, searchQuery, setSearchQuery,
    campaigns, analytics, toasts, removeToast, addToast, loadPublicData,
  } = props;

  const [showProofModal, setShowProofModal] = useState(false);
  const [proofTargetCampaign, setProofTargetCampaign] = useState<Campaign | null>(null);

  const handleOpenGlobalProofModal = useCallback(() => {
    setProofTargetCampaign(null);
    setShowProofModal(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans relative transition-colors duration-300 flex flex-col selection:bg-emerald-500 selection:text-white">
      <ParticlesBackground isDark={isDark} />

      <Header
        language={language}
        onLanguageChange={setLanguage}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        adminUser={adminUser}
        onLogoutAdmin={handleAdminLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <HomePage
                    language={language}
                    analytics={analytics}
                    campaigns={campaigns}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    addToast={addToast}
                    loadPublicData={loadPublicData}
                    onOpenGlobalProofModal={handleOpenGlobalProofModal}
                  />
                }
              />
              <Route
                path="/campaigns"
                element={
                  <CampaignsPage
                    language={language}
                    onShowProof={(c) => {
                      setProofTargetCampaign(c);
                      setShowProofModal(true);
                    }}
                    onToast={addToast}
                  />
                }
              />
              <Route
                path="/campaigns/:campaignId"
                element={<CampaignDetailPage language={language} onToast={addToast} />}
              />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer language={language} onOpenProofModal={handleOpenGlobalProofModal} />

      <AnimatePresence>
        {showProofModal && (
          <DonationProofModal
            campaigns={campaigns}
            preselectedCampaign={proofTargetCampaign}
            language={language}
            onClose={() => setShowProofModal(false)}
            onSuccessSubmitted={() => {
              confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
              addToast('Proof Submitted!', 'Our admins will review your submission shortly.', 'success');
              loadPublicData();
            }}
          />
        )}
      </AnimatePresence>

      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

// ─── Home Page ──────────────────────────────────────────────────────────────
interface HomePageProps {
  language: Language;
  analytics: PlatformAnalytics | null;
  campaigns: Campaign[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  addToast: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
  loadPublicData: () => void;
  onOpenGlobalProofModal: () => void;
}

function HomePage({
  language, analytics, campaigns, searchQuery, setSearchQuery,
  addToast, loadPublicData, onOpenGlobalProofModal,
}: HomePageProps) {
  const t = translations[language];
  const [loading, setLoading] = useState(campaigns.length === 0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [localCampaigns, setLocalCampaigns] = useState<Campaign[]>(campaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [shareTargetCampaign, setShareTargetCampaign] = useState<Campaign | null>(null);
  const [showProofModal, setShowProofModal] = useState(false);
  const [proofTargetCampaign, setProofTargetCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    setLoading(true);
    getCampaigns({ category: selectedCategory, search: searchQuery })
      .then(setLocalCampaigns)
      .finally(() => setLoading(false));
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Hero
        language={language}
        analytics={analytics}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onExploreClick={() => {
          const el = document.getElementById('campaigns');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenGlobalProofModal={onOpenGlobalProofModal}
      />

      <section id="campaigns" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {selectedCategory === 'All' ? 'Active Verified Campaigns' : `${selectedCategory} Causes`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Direct transfers directly to beneficiary bank and TRC20 crypto wallets.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
            Showing {localCampaigns.length} Causes
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[26rem] rounded-2xl bg-slate-200/50 dark:bg-slate-800/50 animate-pulse" />
            ))}
          </div>
        ) : localCampaigns.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-3xl">🔍</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No campaigns match your search</h3>
            <p className="text-xs text-slate-500">Try searching for another keyword or clearing category filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {localCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                language={language}
                onSelect={(c) => setSelectedCampaign(c)}
                onShare={(c) => setShareTargetCampaign(c)}
                onQuickDonate={(c) => {
                  setProofTargetCampaign(c);
                  setShowProofModal(true);
                }}
              />
            ))}
          </div>
        )}
      </section>

      <AnimatePresence>
        {selectedCampaign && (
          <CampaignDetailModal
            campaign={selectedCampaign}
            language={language}
            onClose={() => setSelectedCampaign(null)}
            onOpenProofModal={(c) => {
              setSelectedCampaign(null);
              setProofTargetCampaign(c);
              setShowProofModal(true);
            }}
            onShare={(c) => setShareTargetCampaign(c)}
            onCopySuccess={(msg) => addToast('Copied!', msg, 'success')}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProofModal && (
          <DonationProofModal
            campaigns={localCampaigns}
            preselectedCampaign={proofTargetCampaign}
            language={language}
            onClose={() => setShowProofModal(false)}
            onSuccessSubmitted={() => {
              confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
              addToast('Proof Submitted!', 'Our admins will review your submission shortly.', 'success');
              loadPublicData();
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shareTargetCampaign && (
          <ShareModal
            campaign={shareTargetCampaign}
            language={language}
            onClose={() => setShareTargetCampaign(null)}
            onCopySuccess={(msg) => addToast('Copied!', msg, 'success')}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Root App (State lives here, inside BrowserRouter) ─────────────────────
function AppInner() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('axion_theme');
    return saved ? saved === 'dark' : true;
  });
  const [language, setLanguage] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [analytics, setAnalytics] = useState<PlatformAnalytics | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('axion_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('axion_theme', 'light');
    }
  }, [isDark]);

  const addToast = useCallback(
    (title: string, description?: string, type: 'success' | 'error' | 'info' = 'success') => {
      const id = Date.now().toString();
      setToasts((prev) => [...prev, { id, title, description, type }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const loadPublicData = useCallback(async () => {
    try {
      const [cList, aData] = await Promise.all([getCampaigns(), getAnalytics()]);
      setCampaigns(cList);
      setAnalytics(aData);
    } catch (err) {
      console.error('Error fetching public data:', err);
    }
  }, []);

  useEffect(() => { loadPublicData(); }, [loadPublicData]);

  useEffect(() => {
    getAdminMe().then(setAdminUser).catch(() => setAdminUser(null));
  }, []);

  const handleAdminLogout = useCallback(() => {
    clearAdminToken();
    setAdminUser(null);
    addToast('Signed Out', 'Admin session terminated.', 'info');
  }, [addToast]);

  const appState: AppState = {
    language, setLanguage,
    isDark, setIsDark,
    adminUser, setAdminUser,
    searchQuery, setSearchQuery,
    campaigns, analytics,
    toasts, addToast, removeToast,
    loadPublicData, handleAdminLogout,
  };

  return (
    <Routes>
      {/* Fully isolated admin shell */}
      <Route path="/admin" element={<AdminRoute {...appState} />} />
      {/* All public pages share header + footer */}
      <Route path="/*" element={<PublicLayout {...appState} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

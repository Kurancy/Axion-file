import { useState, useEffect, FormEvent } from "react";
import {
  ArrowRight,
  Sparkles,
  Cpu,
  Database,
  Package,
  Code,
  TrendingUp,
  Factory,
  LayoutGrid,
  Truck,
  GraduationCap,
  Activity,
  Rocket,
  Users,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Quote,
  Loader2,
  Zap,
  BarChart3,
  ShieldCheck,
  Globe2,
  Layers
} from "lucide-react";

import { ActivePage, Language } from "./types";
import {
  translations,
  servicesData,
  industriesData,
  caseStudiesData,
  timelineEvents,
  blogPosts
} from "./data/mockData";

import Header from "./components/Header";
import Footer from "./components/Footer";
import InteractiveMap from "./components/InteractiveMap";
import DashboardPreview from "./components/DashboardPreview";
import ArchitectureDiagram from "./components/ArchitectureDiagram";
import ConsultationAssistant from "./components/ConsultationAssistant";
import ROICalculator from "./components/ROICalculator";
import AxionSplashScreen from "./components/AxionSplashScreen";
import AxionFavicon from "./components/AxionFavicon";
import CaseStudyShowcase from "./components/CaseStudyShowcase";
import SolutionsShowcase from "./components/SolutionsShowcase";
import AxionAIAssistant from "./components/AxionAIAssistant";

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>("home");
  const [language, setLanguage] = useState<Language>("en");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Filter state for Portfolio page
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Contact page form states
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    org: "",
    need: "AI Automation",
    msg: ""
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  const t = translations[language];
  const [showEntrance, setShowEntrance] = useState(true);

  // Force scroll to top on section transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    // Simulate real enterprise database insertion lag
    setTimeout(() => {
      setContactLoading(false);
      setContactSuccess(true);
      setContactForm({ name: "", email: "", org: "", need: "AI Automation", msg: "" });
    }, 1500);
  };

  return (
    <>
      <AxionFavicon />
      {showEntrance && (
        <AxionSplashScreen isDarkMode={isDarkMode} onComplete={() => setShowEntrance(false)} />
      )}
      <div
        id="axion-master-container"
        className={`min-h-screen flex flex-col transition-colors duration-300 ${
          isDarkMode ? "bg-brand-dark text-slate-100" : "bg-slate-50 text-slate-800"
        }`}
      >
      {/* Global Header / Navbar */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Core View Area */}
      <main id="view-backplane" className="flex-grow">
        
        {/* =========================================
            SECTION 1: LANDING / HOME PAGE
            ========================================= */}
        {activePage === "home" && (
          <div id="home-view" className="space-y-16 pb-16">
            
            {/* ── Hero Section ── */}
            <section id="axion-hero" className="relative pt-24 pb-20 overflow-hidden">
              {/* Animated grid background */}
              <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
              {/* Radial gradient glow */}
              <div className="absolute inset-0 axion-hero-gradient pointer-events-none" />
              {/* Orb accents */}
              <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none float-slow" />
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400/8 rounded-full blur-2xl pointer-events-none" style={{animationDelay:"2s"}} />

              {/* Hero Network SVG — dynamic tech ecosystem */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 select-none" viewBox="0 0 1200 600" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8" />
                  </linearGradient>
                  
                  <filter id="glowHero" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Connective Paths: Manufacturing -> ERP -> AI Automation -> Analytics Dashboard */}
                {/* 1. Manufacturing (Left) -> ERP (Top Left) */}
                <path d="M 150 320 Q 300 200 450 180" fill="none" stroke={isDarkMode ? "#0f2040" : "#cbd5e1"} strokeWidth="1.5" strokeDasharray="5 5" />
                <path d="M 150 320 Q 300 200 450 180" fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" 
                  strokeDasharray="40 180" className="network-line" style={{ animationDuration: "5s" }} />

                {/* 2. ERP (Top Left) -> AI Automation (Bottom Right) */}
                <path d="M 450 180 Q 600 320 750 440" fill="none" stroke={isDarkMode ? "#0f2040" : "#cbd5e1"} strokeWidth="1.5" strokeDasharray="5 5" />
                <path d="M 450 180 Q 600 320 750 440" fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" 
                  strokeDasharray="40 220" className="network-line" style={{ animationDuration: "6s", animationDelay: "1s" }} />

                {/* 3. AI Automation (Bottom Right) -> Analytics Dashboard (Right) */}
                <path d="M 750 440 Q 920 300 1050 240" fill="none" stroke={isDarkMode ? "#0f2040" : "#cbd5e1"} strokeWidth="1.5" strokeDasharray="5 5" />
                <path d="M 750 440 Q 920 300 1050 240" fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" 
                  strokeDasharray="40 200" className="network-line" style={{ animationDuration: "5s", animationDelay: "2.5s" }} />

                {/* Nodes with pulsing rings and labels */}
                {/* WMS Node */}
                <g filter="url(#glowHero)">
                  <circle cx="150" cy="320" r="7" fill="#3b82f6" />
                  <circle cx="150" cy="320" r="14" fill="#3b82f6" fillOpacity="0.15" className="animate-ping" style={{ animationDuration: "3s" }} />
                </g>
                <text x="150" y="350" fill={isDarkMode ? "#94a3b8" : "#475569"} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">MANUFACTURING / WMS</text>
                
                {/* SAP/ERP Node */}
                <g filter="url(#glowHero)">
                  <circle cx="450" cy="180" r="7" fill="#f59e0b" />
                  <circle cx="450" cy="180" r="14" fill="#f59e0b" fillOpacity="0.15" className="animate-ping" style={{ animationDuration: "3.5s" }} />
                </g>
                <text x="450" y="150" fill={isDarkMode ? "#94a3b8" : "#475569"} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">ERP (SAP SYSTEMS)</text>

                {/* Intelligent AI Node */}
                <g filter="url(#glowHero)">
                  <circle cx="750" cy="440" r="7" fill="#3b82f6" />
                  <circle cx="750" cy="440" r="14" fill="#3b82f6" fillOpacity="0.15" className="animate-ping" style={{ animationDuration: "2.8s" }} />
                </g>
                <text x="750" y="470" fill={isDarkMode ? "#94a3b8" : "#475569"} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">AI AUTOMATION AGENTS</text>

                {/* Live Analytics Dashboard */}
                <g filter="url(#glowHero)">
                  <circle cx="1050" cy="240" r="7" fill="#10b981" />
                  <circle cx="1050" cy="240" r="14" fill="#10b981" fillOpacity="0.15" className="animate-ping" style={{ animationDuration: "4s" }} />
                </g>
                <text x="1050" y="210" fill={isDarkMode ? "#94a3b8" : "#475569"} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">LIVE ANALYTICS</text>
              </svg>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                {/* Eyebrow badge */}
                <div className="axion-fade-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
                  style={{background:"rgba(37,99,235,0.1)",border:"1px solid rgba(59,130,246,0.25)"}}>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-[11px] font-mono font-semibold text-blue-300 tracking-widest uppercase">
                    Africa's Premier Enterprise Technology Partner
                  </span>
                </div>

                <h1 className="axion-fade-up delay-100 gradient-text-hero text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight font-display max-w-4xl mx-auto leading-[1.12] mb-6">
                  {t.heroTitle}
                </h1>

                <p className={`axion-fade-up delay-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}>
                  {t.heroSub}
                </p>

                <div className="axion-fade-up delay-300 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => setActivePage("consultation-hub")}
                    className="btn-primary-axion w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-[14px] text-white cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-blue-200" />
                    {t.ctaConsultation}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActivePage("solutions")}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[14px] border transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                      isDarkMode
                        ? "border-slate-700 text-slate-300 bg-slate-900/50 hover:bg-slate-800/80 hover:border-blue-700/50"
                        : "border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
                    }`}
                  >
                    {t.ctaExplore}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Trust badges */}
                <div className="axion-fade-up delay-400 mt-12 flex flex-wrap items-center justify-center gap-6">
                  {[
                    {icon:ShieldCheck, label:"ISO 27001 Certified", color:"text-blue-400"},
                    {icon:Globe2,      label:"SAP Gold Partner",    color:"text-amber-400"},
                    {icon:CheckCircle2,label:"GDPR / NDPR Compliant",color:"text-emerald-400"},
                  ].map(({icon:Icon,label,color},i)=>(
                    <div key={i} className={`flex items-center gap-2 text-[11px] font-mono font-semibold ${color} opacity-80`}>
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Dashboard Showcase ── */}
            <section id="axion-dashboard-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="section-eyebrow">Axion Enterprise Intelligence Platform</span>
                <h2 className={`text-2xl sm:text-3xl font-extrabold font-display mt-3 ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}>
                  Real-time Business Operations Dashboard
                </h2>
                <p className={`text-sm mt-3 max-w-lg mx-auto ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}>
                  Live AI automation workflows, ERP integration status, warehouse tracking, and business analytics — unified on one intelligent platform.
                </p>
              </div>
              <DashboardPreview isDarkMode={isDarkMode} />
            </section>

            {/* ── Impact Stats ── */}
            <section id="axion-impact-stats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { value: "90%",    label: "Reduction in Processing Time",   desc: "AI automation eliminating manual admin backlogs" },
                  { value: "$10M+",  label: "Client Cost Savings Delivered",    desc: "Documented ROI across enterprise deployments" },
                  { value: "100%",   label: "SAP Integration Accuracy",         desc: "Real-time transaction verification" },
                  { value: "99.99%", label: "Platform Uptime SLA",              desc: "Enterprise-grade high availability infrastructure" }
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`axion-card p-6 rounded-2xl border text-center ${
                      isDarkMode
                        ? "bg-brand-navy/80 border-blue-950/60"
                        : "bg-white border-slate-200 shadow-sm"
                    }`}
                  >
                    <span className="gradient-text-blue text-3xl sm:text-4xl font-extrabold font-display block">
                      {stat.value}
                    </span>
                    <span className={`text-[11px] font-bold font-mono tracking-wide mt-3 block ${
                      isDarkMode ? "text-slate-300" : "text-slate-800"
                    }`}>
                      {stat.label}
                    </span>
                    <span className={`text-[10px] mt-1.5 block leading-relaxed ${
                      isDarkMode ? "text-slate-500" : "text-slate-500"
                    }`}>
                      {stat.desc}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Africa Presence Map ── */}
            <section id="axion-africa-network" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="section-eyebrow">Continental Presence</span>
                <h2 className={`text-2xl sm:text-3xl font-extrabold font-display mt-3 ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}>Our Pan-African Coverage</h2>
                <p className={`text-sm mt-3 max-w-md mx-auto ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}>
                  Active support offices and delivery nodes across West, East, and Southern Africa — serving enterprise clients at scale.
                </p>
              </div>
              <InteractiveMap isDarkMode={isDarkMode} />
            </section>

            {/* ── Architecture Diagram ── */}
            <section id="axion-architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="section-eyebrow">Technology Architecture</span>
                <h2 className={`text-2xl sm:text-3xl font-extrabold font-display mt-3 ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}>Enterprise Automation Stack</h2>
                <p className={`text-sm mt-3 max-w-md mx-auto ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}>
                  Click on any system node to explore the telemetry and integration capabilities of our secure data processing pipeline.
                </p>
              </div>
              <ArchitectureDiagram isDarkMode={isDarkMode} />
            </section>

            {/* ── Client Testimonials ── */}
            <section id="axion-testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-12">
                <span className="section-eyebrow">Client Success Stories</span>
                <h2 className={`text-2xl sm:text-3xl font-extrabold font-display mt-3 ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}>Trusted by Enterprise Organizations</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    quote: "Axion Technologies' AI invoice processor completely transformed our finance division. We went from processing backlogs taking days down to minutes, with zero ledger entry failures. They deliver like IBM with Accenture-grade speed.",
                    author: "Musa Ibrahim, VP of Operations",
                    company: "Zenith East Africa Distributors",
                    metric: "62% cost reduction"
                  },
                  {
                    quote: "Our warehouse was plagued with manual stock reconciliations. Axion engineered an offline-first WMS that eliminated stock shrinkage and reduced border delays by 36 hours. A truly investor-ready technology partner.",
                    author: "Chidi Okoro, Chief Logistics Officer",
                    company: "Safeland Freight Logistics",
                    metric: "99.96% fulfillment accuracy"
                  }
                ].map((test, index) => (
                  <div
                    key={index}
                    className={`axion-card p-8 rounded-2xl border relative flex flex-col justify-between ${
                      isDarkMode ? "bg-brand-navy/80 border-blue-950/60" : "bg-white border-slate-200 shadow-sm"
                    }`}
                  >
                    <Quote className="absolute right-6 top-6 w-10 h-10 opacity-10 text-blue-400 pointer-events-none" />
                    <div className="mb-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold text-emerald-400" style={{background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.2)"}}>
                      <CheckCircle2 className="w-3 h-3" />
                      {test.metric}
                    </div>
                    <p className={`text-[14px] leading-relaxed italic mb-6 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                      &ldquo;{test.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-blue-300 font-bold text-sm font-display" style={{background:"rgba(37,99,235,0.15)",border:"1px solid rgba(59,130,246,0.25)"}}>
                        {test.author.charAt(0)}
                      </div>
                      <div>
                        <div className={`text-[13px] font-semibold font-display ${isDarkMode ? "text-white" : "text-slate-900"}`}>{test.author}</div>
                        <span className="text-[11px] text-blue-400 font-mono">{test.company}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Blog Insights ── */}
            <section id="axion-insights" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
              <div className={`flex justify-between items-end border-b pb-4 mb-8 ${
                isDarkMode ? "border-slate-800/60" : "border-slate-200"
              }`}>
                <div>
                  <span className="section-eyebrow">Industry Insights</span>
                  <h2 className={`text-xl sm:text-2xl font-bold font-display mt-2 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}>Technology & Transformation</h2>
                </div>
                <button
                  onClick={() => setActivePage("company")}
                  className="text-[12px] font-mono font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                >
                  View Company <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className={`p-5 rounded-xl border flex flex-col justify-between ${
                      isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mb-3">
                        <span>{post.category}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h4 className="text-sm font-bold leading-snug font-display text-white mb-2 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className={`text-xs line-clamp-3 leading-relaxed mb-4 ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}>
                        {post.excerpt}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-brand-blue-light block">
                      Written by {post.author.split(",")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* =========================================
            SECTION 2: SERVICES VIEW
            ========================================= */}
        {activePage === "services" && (
          <section id="services-detailed-matrix" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-blue-light uppercase block">
                Enterprise Solutions Matrix
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display mt-1 text-white">
                Core Digital Transformation Capabilities
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                We orchestrate cloud infrastructure, cognitive models, and localized logic systems to help mid-to-large scale African enterprises digitize operational loops.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {servicesData.map((serv) => {
                const isAI = serv.id === "ai-automation";
                const isERP = serv.id === "erp-solutions";
                return (
                  <div
                    key={serv.id}
                    id={`service-card-${serv.id}`}
                    className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
                      isDarkMode
                        ? "bg-slate-900 border-slate-800 hover:border-slate-700/80"
                        : "bg-white border-slate-200 shadow hover:shadow-lg"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-xl text-white bg-gradient-to-tr ${
                          isAI ? "from-brand-blue to-cyan-500" : isERP ? "from-brand-gold to-yellow-600" : "from-brand-blue to-blue-800"
                        }`}>
                          {serv.icon === "Cpu" && <Cpu className="w-6 h-6" />}
                          {serv.icon === "Database" && <Database className="w-6 h-6" />}
                          {serv.icon === "Package" && <Package className="w-6 h-6" />}
                          {serv.icon === "Code" && <Code className="w-6 h-6" />}
                          {serv.icon === "TrendingUp" && <TrendingUp className="w-6 h-6" />}
                        </div>
                        <span className="text-[10px] font-mono tracking-widest uppercase bg-brand-blue/10 text-brand-blue-light border border-brand-blue/15 px-2.5 py-1 rounded font-bold">
                          {serv.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-display text-white mb-3">
                        {serv.title}
                      </h3>
                      <p className={`text-xs leading-relaxed mb-6 ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}>
                        {serv.description}
                      </p>

                      <div className="border-t border-slate-800/50 pt-5 mb-6">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-3">
                          Architectural Scope
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {serv.details.map((detail, index) => (
                            <li key={index} className="flex items-center gap-2 text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue-light shrink-0" />
                              <span className="line-clamp-1">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-slate-800/50 pt-5 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500">Target Efficiency ROI:</span>
                      <span className="text-green-400 font-bold">{serv.metrics}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive ROI Calculator Widget */}
            <ROICalculator isDarkMode={isDarkMode} setActivePage={setActivePage} />

            {/* AI Sandbox call-to-action bar */}
            <div className="mt-16 bg-gradient-to-r from-slate-950 to-brand-navy border border-brand-blue/20 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold font-display text-white">
                  Need a Customized Solution Design for Your Business?
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-lg">
                  Access our secure interactive digital transformation sandbox powered by Gemini. Generate a detailed, print-ready systems roadmap in seconds.
                </p>
              </div>
              <button
                onClick={() => setActivePage("consultation-hub")}
                className="px-6 py-3 rounded-lg text-xs font-bold text-slate-950 bg-brand-gold hover:bg-yellow-400 cursor-pointer flex items-center gap-1.5 font-sans"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                Launch AI Blueprint Engine
              </button>
            </div>
          </section>
        )}

        {/* =========================================
            SECTION 3: INDUSTRIES SHOWCASE
            ========================================= */}
        {activePage === "industries" && (
          <section id="target-industries-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-blue-light uppercase block">
                Industry Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display mt-1 text-white">
                Engineered for Regional Scale
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Every industry vertical has unique micro-conditions. We design system integrations that respect local supply structures, physical warehousing delays, and localized tax compliances.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industriesData.map((ind) => {
                return (
                  <div
                    key={ind.id}
                    id={`industry-card-${ind.id}`}
                    className={`p-6 rounded-2xl border flex flex-col justify-between ${
                      isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-lg bg-brand-blue/10 text-brand-blue-light">
                          {ind.icon === "Factory" && <Factory className="w-5 h-5" />}
                          {ind.icon === "LayoutGrid" && <LayoutGrid className="w-5 h-5" />}
                          {ind.icon === "Truck" && <Truck className="w-5 h-5" />}
                          {ind.icon === "GraduationCap" && <GraduationCap className="w-5 h-5" />}
                          {ind.icon === "Activity" && <Activity className="w-5 h-5" />}
                          {ind.icon === "Rocket" && <Rocket className="w-5 h-5" />}
                        </div>
                        <h3 className="font-bold text-sm tracking-tight font-display text-white">
                          {ind.title}
                        </h3>
                      </div>

                      <p className={`text-xs leading-relaxed mb-4 ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}>
                        {ind.description}
                      </p>

                      <div className="bg-slate-950/40 rounded-lg p-3.5 border border-slate-800/40 mb-4">
                        <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block mb-1">
                          Enterprise Case Study Preview:
                        </span>
                        <p className="text-[11px] leading-relaxed text-slate-300">
                          {ind.detailedCase}
                        </p>
                      </div>

                      <div className="mb-4">
                        <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1.5">Key Core Benefits:</span>
                        <ul className="space-y-1.5 text-[11px]">
                          {ind.keyBenefits.map((ben, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-slate-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-light" />
                              {ben}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-slate-800/50 pt-4 mt-2 flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-500">Target Metric:</span>
                      <span className="text-green-400 font-bold">{ind.stats}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* =========================================
            SECTION 4: PORTFOLIO & CASE STUDIES
            ========================================= */}
        {activePage === "portfolio" && (
          <section id="portfolio-case-studies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-blue-light uppercase block">
                Proven Deliveries
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display mt-1 text-white">
                Enterprise Business Case Studies
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Quantitative reports detailing localized operational audits, solution system architectures, and client return on investments.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {["All", "AI Automation", "ERP Solutions", "Warehouse Solutions"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all ${
                    selectedCategory === cat
                      ? "bg-brand-blue text-white shadow"
                      : isDarkMode
                      ? "bg-slate-900 hover:bg-slate-800 text-slate-400"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Case Studies Grid */}
            <div className="space-y-12">
              {caseStudiesData
                .filter((study) => selectedCategory === "All" || study.category === selectedCategory)
                .map((study) => (
                  <div
                    key={study.id}
                    id={`case-study-${study.id}`}
                    className={`rounded-2xl border overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch ${
                      isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow"
                    }`}
                  >
                    {/* Left Column: Visual graphic backdrop */}
                    <div className="lg:col-span-5 relative min-h-[220px] bg-slate-950 overflow-hidden">
                      <img
                        src={study.image}
                        alt={study.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-crop opacity-15 hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent lg:bg-gradient-to-r pointer-events-none" />
                      
                      {/* Dynamic Product Showcase */}
                      <CaseStudyShowcase studyId={study.id} isDarkMode={isDarkMode} />

                      {/* Floating Key metric badge */}
                      <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 backdrop-blur z-10">
                        <span className="text-3xl font-extrabold text-brand-gold font-mono block">
                          {study.statValue}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">
                          {study.statLabel}
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Case study description details */}
                    <div className="lg:col-span-7 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-800/50">
                          <span className="text-xs font-mono uppercase text-brand-blue-light font-bold">
                            Client: {study.client}
                          </span>
                          <span className="text-[10px] font-mono uppercase bg-brand-blue/10 border border-brand-blue/15 px-2 py-0.5 rounded text-brand-blue-light">
                            {study.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold font-display text-white mb-4">
                          {study.title}
                        </h3>

                        <div className="space-y-4 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono block mb-1">
                              Corporate Friction (The Problem)
                            </span>
                            <p className={`leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                              {study.problem}
                            </p>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono block mb-1">
                              Solution Architecture Deployed
                            </span>
                            <p className={`leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                              {study.solution}
                            </p>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono block mb-1">
                              Documented ROI (Business Impact)
                            </span>
                            <p className="leading-relaxed text-green-400 font-medium">
                              {study.impact}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tech stack badges */}
                      <div className="border-t border-slate-800/50 pt-5 mt-6 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500 mr-2 uppercase">Tech Core:</span>
                        {study.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400 px-2.5 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* =========================================
            SECTION 5: COMPANY VIEW
            ========================================= */}
        {activePage === "company" && (
          <div id="company-profile" className="space-y-16 py-16 pb-20">
            
            {/* Mission / Vision banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                
                {/* Mission Card */}
                <div className={`p-8 rounded-2xl border flex flex-col justify-between ${
                  isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                }`}>
                  <div>
                    <div className="p-3 rounded-xl bg-brand-blue/10 text-brand-blue-light w-max mb-6">
                      <Cpu className="w-8 h-8 text-brand-blue" />
                    </div>
                    <h3 className="text-2xl font-bold font-display text-white mb-4">
                      {t.missionTitle}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                      {t.missionDesc}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-brand-blue-light uppercase tracking-widest mt-8 block">
                    Established 2026
                  </span>
                </div>

                {/* Vision Card */}
                <div className={`p-8 rounded-2xl border flex flex-col justify-between ${
                  isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                }`}>
                  <div>
                    <div className="p-3 rounded-xl bg-brand-gold/10 text-brand-gold w-max mb-6">
                      <TrendingUp className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h3 className="text-2xl font-bold font-display text-white mb-4">
                      {t.visionTitle}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                      {t.visionDesc}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-brand-gold uppercase tracking-widest mt-8 block">
                    Continental Focus 2030
                  </span>
                </div>

              </div>
            </section>

            {/* Corporate values */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-mono font-bold tracking-widest text-brand-blue-light uppercase block">
                  Corporate DNA
                </span>
                <h2 className="text-3xl font-extrabold font-display mt-1 text-white">
                  {t.coreValuesTitle}
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  {t.coreValuesSub}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { title: "Innovation", icon: Rocket, desc: "Leveraging state-of-the-art cognitive models, offline-first networks, and microservice stacks." },
                  { title: "Integrity", icon: CheckCircle2, desc: "Absolute compliance-ready ledger integrations with rigorous security, preventing errors." },
                  { title: "Excellence", icon: Sparkles, desc: "Providing world-class SLA targets, robust documentation, and high-performance database writes." },
                  { title: "Partnership", icon: Users, desc: "Operating as trusted advisors to regional ministries, manufacturers, and scale retail SME networks." },
                  { title: "Continuous Learning", icon: GraduationCap, desc: "Iterating on modern data tools, custom protocols, and emerging continental trade policies." }
                ].map((val, idx) => {
                  const Icon = val.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-6 rounded-xl border ${
                        isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="p-2.5 rounded-lg bg-brand-blue/10 text-brand-blue-light w-max mb-4">
                        <Icon className="w-5 h-5 text-brand-blue-light" />
                      </div>
                      <h4 className="font-bold text-sm tracking-tight font-display text-white mb-2">
                        {val.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        )}

        {/* =========================================
            SECTION 6: FUTURE VISION (TIMELINE)
            ========================================= */}
        {activePage === "timeline" && (
          <section id="axion-timeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-eyebrow">Executive Roadmap</span>
              <h2 className={`text-3xl sm:text-4xl font-extrabold font-display mt-3 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}>Strategic Growth Timeline</h2>
              <p className={`text-sm mt-3 leading-relaxed ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
                Axion Technologies' milestones and targets from regional advisory to becoming Africa's premier enterprise technology backbone.
              </p>
            </div>

            {/* Vertical timeline flow */}
            <div className="relative border-l border-slate-800 max-w-3xl mx-auto pl-8 space-y-12">
              {timelineEvents.map((event, idx) => {
                const isActive = event.year === "2026";
                return (
                  <div key={idx} className="relative">
                    {/* Pulsing indicator node */}
                    <div className={`absolute -left-[41px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      isActive
                        ? "bg-slate-950 border-brand-gold text-brand-gold"
                        : "bg-slate-950 border-slate-800 text-slate-500"
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${isActive ? "bg-brand-gold animate-pulse" : "bg-slate-800"}`} />
                    </div>

                    <div
                      className={`p-6 rounded-2xl border ${
                        isActive
                          ? "bg-gradient-to-r from-slate-900 to-brand-navy border-brand-blue/30"
                          : isDarkMode
                          ? "bg-slate-900/55 border-slate-800"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/50">
                        <span className="text-2xl font-extrabold font-mono tracking-tight text-white block">
                          {event.year}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono ${
                          isActive
                            ? "bg-brand-gold/15 text-brand-gold font-bold border border-brand-gold/25"
                            : isDarkMode
                            ? "bg-slate-950 text-slate-400"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {event.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold font-display text-white mb-2">
                        {event.title}
                      </h3>
                      
                      <p className={`text-xs leading-relaxed mb-4 ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}>
                        {event.description}
                      </p>

                      <div className="border-t border-slate-800/40 pt-4 mt-2 flex justify-between items-center text-xs font-mono">
                        <span className="text-slate-500">Corporate KPI Target:</span>
                        <span className="text-brand-blue-light font-bold">{event.metrics}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* =========================================
            SECTION 7: CONTACT / MEETING VIEW
            ========================================= */}
        {activePage === "contact" && (
          <section id="contact-advisory-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-blue-light uppercase block">
                Initiate Engagement
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display mt-1 text-white">
                Consult with our Enterprise Advisors
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Connect directly with our regional consulting units to plan custom system evaluations and digital transformation integrations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Left Column: Form submissions */}
              <div className="lg:col-span-7 flex">
                <div className={`w-full rounded-2xl border p-8 flex flex-col justify-between ${
                  isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                }`}>
                  {contactSuccess ? (
                    <div id="contact-success-banner" className="h-full flex flex-col items-center justify-center text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold font-display text-white">
                        Consultation Request Logged
                      </h3>
                      <p className="text-xs text-slate-400 max-w-sm mt-2 leading-relaxed">
                        Thank you for reaching out. A Senior Partner from our localized sector division will evaluate your bottleneck inputs and follow up within 24 business hours.
                      </p>
                      <button
                        onClick={() => setContactSuccess(false)}
                        className="mt-8 px-6 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                      >
                        Submit another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="e.g. Abdullahi Abubakar"
                            className={`w-full px-3 py-2.5 text-xs rounded-lg border transition-colors outline-none ${
                              isDarkMode
                                ? "bg-slate-950 border-slate-800 text-white focus:border-brand-blue"
                                : "bg-slate-50 border-slate-200 text-slate-800 focus:border-brand-blue"
                            }`}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                            Corporate Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="e.g. executive@yourcompany.com"
                            className={`w-full px-3 py-2.5 text-xs rounded-lg border transition-colors outline-none ${
                              isDarkMode
                                ? "bg-slate-950 border-slate-800 text-white focus:border-brand-blue"
                                : "bg-slate-50 border-slate-200 text-slate-800 focus:border-brand-blue"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                            Organization Name
                          </label>
                          <input
                            type="text"
                            value={contactForm.org}
                            onChange={(e) => setContactForm({ ...contactForm, org: e.target.value })}
                            placeholder="e.g. West African Mills Ltd"
                            className={`w-full px-3 py-2.5 text-xs rounded-lg border transition-colors outline-none ${
                              isDarkMode
                                ? "bg-slate-950 border-slate-800 text-white focus:border-brand-blue"
                                : "bg-slate-50 border-slate-200 text-slate-800 focus:border-brand-blue"
                            }`}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                            Primary System Focus
                          </label>
                          <select
                            value={contactForm.need}
                            onChange={(e) => setContactForm({ ...contactForm, need: e.target.value })}
                            className={`w-full px-3 py-2.5 text-xs rounded-lg border transition-colors outline-none ${
                              isDarkMode
                                ? "bg-slate-950 border-slate-800 text-white focus:border-brand-blue"
                                : "bg-slate-50 border-slate-200 text-slate-800 focus:border-brand-blue"
                            }`}
                          >
                            <option value="AI Automation">AI Automation (OCR / Document parsing)</option>
                            <option value="ERP Solutions">SAP Business One / ERP Integrations</option>
                            <option value="Warehouse Solutions">Warehouse Tracking & WMS Platform</option>
                            <option value="Software Engineering">Bespoke Enterprise Applications</option>
                            <option value="Digital Transformation">Strategy & Data BI Analytics</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                          Description of Bottleneck / Ingestion Scope *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={contactForm.msg}
                          onChange={(e) => setContactForm({ ...contactForm, msg: e.target.value })}
                          placeholder="Provide details on manual repeat tasks, database sizes, or specific logistics delays you intend to resolve..."
                          className={`w-full px-3 py-2.5 text-xs rounded-lg border transition-colors outline-none ${
                            isDarkMode
                              ? "bg-slate-950 border-slate-800 text-white focus:border-brand-blue"
                              : "bg-slate-50 border-slate-200 text-slate-800 focus:border-brand-blue"
                          }`}
                        />
                      </div>

                      <button
                        type="submit"
                        id="submit-contact-form-btn"
                        disabled={contactLoading}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-brand-blue hover:bg-brand-blue-light transition-colors cursor-pointer"
                      >
                        {contactLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Routing Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Formal Inquiry Proposal</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Column: Office coordinates directories */}
              <div className="lg:col-span-5 h-full">
                <div className="flex flex-col gap-6 h-full justify-between">
                  
                  {/* WhatsApp Hub Call-to-action */}
                  <div className={`p-6 rounded-2xl border flex items-center gap-4 ${
                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                  }`}>
                    <div className="p-3 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center">
                      {/* Standard Phone/Chat icon */}
                      <Phone className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold uppercase font-mono tracking-wider text-slate-400">
                        Rapid Direct Consulting Channel
                      </h4>
                      <h3 className="text-base font-bold text-white font-display mt-0.5">
                        WhatsApp Live Link
                      </h3>
                      <a
                        href="https://wa.me/234800SYNAPSE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand-blue-light font-semibold hover:underline flex items-center gap-1 mt-1 font-mono"
                      >
                        Chat with our Desk Officer <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Locations List Directory */}
                  <div className={`p-6 rounded-2xl border flex-grow ${
                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                  }`}>
                    <h3 className="text-base font-bold font-display text-white mb-4">
                      Regional Support Directories
                    </h3>
                    
                    <div className="space-y-4 text-xs">
                      {[
                        { city: "Lagos, Nigeria", role: "HQ & AI Ingress Core", address: "Twin Towers, Tower B, Level 14, Victoria Island" },
                        { city: "Nairobi, Kenya", role: "East Africa Hub", address: "Landmark Plaza, Argwings Kodhek Road" },
                        { city: "Johannesburg, South Africa", role: "Southern Africa Hub", address: "Capital Corporate Hill, Sandton" },
                        { city: "Abidjan, Côte d'Ivoire", role: "Francophone Expansion Node", address: "Espace Avenue Boulevard, Plateau" },
                        { city: "Kigali, Rwanda", role: "Sandbox & Research Node", address: "Kigali Heights, Level 4, Gasabo District" }
                      ].map((loc, idx) => (
                        <div key={idx} className="border-l-2 border-brand-blue-light pl-3">
                          <h4 className="font-bold text-white tracking-tight">{loc.city}</h4>
                          <span className="text-[10px] text-brand-gold font-mono uppercase block mt-0.5">{loc.role}</span>
                          <span className="text-slate-400 text-[11px] block mt-1">{loc.address}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </section>
        )}

        {/* =========================================
            SECTION 8: AI CONSULTATION HUB (SANDBOX)
            ========================================= */}
        {activePage === "solutions" && (
          <section id="axion-solutions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="section-eyebrow">Technology Solutions</span>
              <h2 className={`text-3xl sm:text-4xl font-extrabold font-display mt-3 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}>End-to-End Enterprise Solutions</h2>
              <p className={`text-sm mt-3 leading-relaxed ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
                Axion Technologies delivers integrated technology solutions across AI, ERP, logistics, and digital transformation — purpose-built for African enterprises.
              </p>
            </div>

            {/* Premium Interactive Solution Showcase */}
            <div className="mb-16">
              <SolutionsShowcase isDarkMode={isDarkMode} setActivePage={setActivePage} />
            </div>

            {/* Solutions CTA */}
            <div
              className="rounded-2xl p-10 text-center"
              style={{background: isDarkMode ? "linear-gradient(135deg,rgba(10,22,40,0.9),rgba(15,32,64,0.9))" : "linear-gradient(135deg,#eff6ff,#dbeafe)", border: "1px solid rgba(37,99,235,0.25)"}}
            >
              <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                style={{background:"linear-gradient(135deg,#1a56db,#2563eb)"}}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-2xl font-bold font-display mb-3 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}>Ready to Transform Your Business?</h3>
              <p className={`text-sm mb-8 max-w-xl mx-auto ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
                Speak with an Axion Technologies enterprise advisor and receive a tailored digital transformation roadmap within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setActivePage("consultation-hub")}
                  className="btn-primary-axion flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white text-[14px] cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-blue-200" />
                  Book AI Consultation
                </button>
                <button
                  onClick={() => setActivePage("contact")}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-[14px] border transition-all cursor-pointer ${
                    isDarkMode ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Contact Our Team
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        )}

        {activePage === "consultation-hub" && (
          <section id="axion-ai-consultation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-eyebrow">AI Consultation Hub</span>
              <h2 className={`text-3xl sm:text-4xl font-extrabold font-display mt-3 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}>Axion AI Blueprint Engine</h2>
              <p className={`text-sm mt-3 leading-relaxed ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
                Connect with our AI-powered solutions architect. Describe your business challenges and receive a tailored technology roadmap, system scope, and projected ROI — instantly.
              </p>
            </div>
            <ConsultationAssistant language={language} isDarkMode={isDarkMode} />
          </section>
        )}

      </main>

      {/* Global Footer */}
      <Footer setActivePage={setActivePage} language={language} isDarkMode={isDarkMode} />

      {/* World-Class Floating Enterprise AI Assistant */}
      <AxionAIAssistant setActivePage={setActivePage} isDarkMode={isDarkMode} />
    </div>
    </>
  );
}

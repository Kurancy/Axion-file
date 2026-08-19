import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import {
  BrainCircuit,
  Database,
  Box,
  Cpu,
  LineChart,
  Factory,
  Truck,
  Warehouse,
  GraduationCap,
  Layers,
  HeartPulse,
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
  Shield,
  Globe,
  Building,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Download,
  CheckCircle,
  Clock,
  Briefcase
} from "lucide-react";

import { translations, services, industries, caseStudies, teamMembers, coreValues, timelineSteps } from "./data";
import { Language } from "./types";

// Import custom sections
import LoadingSequence from "./components/LoadingSequence";
import EnterpriseDashboard from "./components/EnterpriseDashboard";
import AIArchitect from "./components/AIArchitect";
import ContactConsultation from "./components/ContactConsultation";
import CountUpMetric from "./components/CountUpMetric";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const techDescriptions: Record<string, string> = {
  "React": "Powers the high-performance administrative single-page console with smooth data binding.",
  "Express Backend": "Handles server-side logic, API proxy routing, and coordinates document analysis pipelines safely.",
  "Python Vision Engine": "Handles multi-threaded OCR, image normalization, and custom layout analysis.",
  "Gemini 3.5 AI": "Understands unstructured documents, extracting key fields and schemas autonomously.",
  "SAP HANA Gateway": "Synchronizes transaction payloads directly with the secure SAP relational ERP ledger.",
  "React Portal": "Offers supervisors a fast, modular control room workspace with live telemetry charts.",
  "Kotlin Android App": "Provides a robust, native handheld QR scanning experience for rugged warehouse environments.",
  "Node.js Server": "Handles ultra-low latency real-time WebSocket signals and database sync sessions.",
  "PostgreSQL": "Serves as the primary ACID-compliant transactional warehouse stock relational database.",
  "Redis cache": "Provides fast sub-millisecond key-value storage for active session tracking.",
  "Node.js Edge Client": "Runs local machine signal listeners, queuing events in the event of regional connectivity outages.",
  "Express API Cluster": "Scalable web server array ingestion endpoint designed for high-throughput industrial telemetry.",
  "SAP Business One SDK": "A specialized software kit enabling compliant ledger operations and invoice injection.",
  "React Canvas Charts": "Visualizes thousands of high-speed machine data streams without UI lag.",
  "D3.js": "Performs custom data layout calculations and SVG curve scaling for precise factory twin overlays."
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>("en");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIndustryIdx, setActiveIndustryIdx] = useState(0);
  const [caseStudyFilter, setCaseStudyFilter] = useState<"All" | "Logistics" | "Manufacturing">("All");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const t = translations[language];

  const filteredCaseStudies = caseStudies.filter((cs) => {
    if (caseStudyFilter === "All") return true;
    if (caseStudyFilter === "Logistics") {
      return (
        cs.industry.toLowerCase().includes("logistics") ||
        cs.industry.toLowerCase().includes("warehousing") ||
        cs.industry.toLowerCase().includes("fmcg")
      );
    }
    if (caseStudyFilter === "Manufacturing") {
      return cs.industry.toLowerCase().includes("manufacturing");
    }
    return true;
  });

  // Helper to map icon name to Lucide components
  const getIcon = (name: string, isLightBg: boolean = false) => {
    const iconClass = isLightBg ? "text-blue-600" : "text-blue-400";
    switch (name) {
      case "BrainCircuit": return <BrainCircuit className={iconClass} />;
      case "Database": return <Database className={iconClass} />;
      case "Box": return <Box className={iconClass} />;
      case "Cpu": return <Cpu className={iconClass} />;
      case "LineChart": return <LineChart className={iconClass} />;
      case "Factory": return <Factory className={iconClass} />;
      case "Truck": return <Truck className={iconClass} />;
      case "Warehouse": return <Warehouse className={iconClass} />;
      case "GraduationCap": return <GraduationCap className={iconClass} />;
      case "Layers": return <Layers className={iconClass} />;
      case "HeartPulse": return <HeartPulse className={iconClass} />;
      default: return <Briefcase className={iconClass} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingSequence onComplete={() => setLoading(false)} />
      ) : (
        <div
          id="app-root"
          className={`min-h-screen font-sans transition-colors duration-300 ${
            isDarkMode ? "bg-[#040814] text-gray-200" : "bg-slate-50 text-slate-900"
          }`}
        >
          {/* TOP HEADER / EXECUTIVE NAVIGATION BAR */}
          <header
            className={`sticky top-0 z-40 backdrop-blur-md border-b ${
              isDarkMode ? "bg-[#040814]/80 border-blue-950/60" : "bg-white/80 border-slate-200"
            }`}
          >
            {/* Scroll Progress Indicator */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-gold-400 to-gold-500 origin-left z-50"
              style={{ scaleX }}
            />

            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              {/* Corporate Logo Identity */}
              <a href="#hero" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-navy-900 border border-gold-400/80 rounded flex items-center justify-center font-display font-bold text-white shadow-lg shadow-blue-500/15">
                  A
                </div>
                <div className="flex flex-col">
                  <span className={`font-display font-bold text-sm tracking-[0.2em] uppercase ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                    AXION
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase font-bold">
                    TECHNOLOGIES
                  </span>
                </div>
              </a>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider uppercase font-medium">
                <a href="#services" className="hover:text-gold-400 transition-colors">Capabilities</a>
                <a href="#industries" className="hover:text-gold-400 transition-colors">Industries</a>
                <a href="#architect-consulting" className="hover:text-gold-400 transition-colors text-blue-400">AI Architect</a>
                <a href="#case-studies" className="hover:text-gold-400 transition-colors">Case Studies</a>
                <a href="#company" className="hover:text-gold-400 transition-colors">Company</a>
                <a href="#contact" className="hover:text-gold-400 transition-colors">Contact</a>
              </nav>

              {/* Header Right Action Panel */}
              <div className="hidden lg:flex items-center gap-5">
                {/* Language Toggler */}
                <div className="flex items-center gap-1 border border-blue-950/20 bg-blue-950/10 rounded px-2.5 py-1 text-[10px] font-mono">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <button onClick={() => setLanguage("en")} className={`px-1.5 cursor-pointer hover:text-white ${language === "en" ? "text-gold-400 font-bold" : "text-gray-500"}`}>EN</button>
                  <span className="text-gray-700">|</span>
                  <button onClick={() => setLanguage("fr")} className={`px-1.5 cursor-pointer hover:text-white ${language === "fr" ? "text-gold-400 font-bold" : "text-gray-500"}`}>FR</button>
                  <span className="text-gray-700">|</span>
                  <button onClick={() => setLanguage("sw")} className={`px-1.5 cursor-pointer hover:text-white ${language === "sw" ? "text-gold-400 font-bold" : "text-gray-500"}`}>SW</button>
                </div>

                {/* Dark/Light Toggler */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded border transition-colors cursor-pointer ${
                    isDarkMode ? "border-blue-950/50 bg-[#050b18] hover:bg-blue-950/40 text-gold-400" : "border-slate-200 bg-slate-100 hover:bg-slate-200 text-blue-600"
                  }`}
                  aria-label="Toggle Theme"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                {/* Main consultation brief CTA */}
                <a
                  href="#contact"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-mono font-bold text-[10px] uppercase tracking-wider py-2.5 px-4 rounded transition-all cursor-pointer shadow-lg shadow-blue-500/10"
                >
                  {t.ctaBook}
                </a>
              </div>

              {/* Mobile Menu Action Icon */}
              <div className="flex items-center gap-3 lg:hidden">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded border transition-colors ${
                    isDarkMode ? "border-blue-950/50 bg-[#050b18] text-gold-400" : "border-slate-200 bg-slate-100 text-blue-600"
                  }`}
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-2 rounded border ${
                    isDarkMode ? "border-blue-950/50 text-white" : "border-slate-200 text-slate-900"
                  }`}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Expandable Menu */}
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={`lg:hidden border-t px-6 py-6 space-y-4 font-mono text-xs tracking-wider uppercase ${
                  isDarkMode ? "bg-[#040814] border-blue-950/60" : "bg-white border-slate-200"
                }`}
              >
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-gold-400">Capabilities</a>
                <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-gold-400">Industries</a>
                <a href="#architect-consulting" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-blue-400">AI Architect</a>
                <a href="#case-studies" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-gold-400">Case Studies</a>
                <a href="#company" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-gold-400">Company</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-gold-400">Contact</a>
                
                <div className="border-t pt-4 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">Language Select:</span>
                  <div className="flex gap-3 text-[10px] font-bold">
                    <button onClick={() => setLanguage("en")} className={language === "en" ? "text-gold-400" : "text-gray-500"}>EN</button>
                    <button onClick={() => setLanguage("fr")} className={language === "fr" ? "text-gold-400" : "text-gray-500"}>FR</button>
                    <button onClick={() => setLanguage("sw")} className={language === "sw" ? "text-gold-400" : "text-gray-500"}>SW</button>
                  </div>
                </div>
              </motion.div>
            )}
          </header>

          {/* HERO SECTION WITH MAP/AI AMBIENT BACKGROUND */}
          <section id="hero" className="relative min-h-[85vh] flex items-center overflow-hidden py-16 px-6">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
              {/* Hero Copywriting block */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-950/40 border border-blue-900/30 px-3 py-1.5 rounded-full text-xs font-mono text-blue-400 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span>Pan-African Digital Leader</span>
                </div>
                
                <h2 className={`font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none ${
                  isDarkMode ? "text-white" : "text-slate-950"
                }`}>
                  {t.headline}
                </h2>

                <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl font-light">
                  {t.subheadline}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href="#contact"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-mono font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded transition-all cursor-pointer shadow-lg shadow-blue-500/15"
                  >
                    {t.ctaBook}
                  </a>
                  <a
                    href="#decision-console"
                    className={`font-mono font-semibold text-xs uppercase tracking-widest py-3.5 px-6 rounded border transition-all cursor-pointer ${
                      isDarkMode ? "border-gray-800 text-gray-300 bg-transparent hover:bg-blue-950/20" : "border-slate-300 text-slate-800 bg-transparent hover:bg-slate-100"
                    }`}
                  >
                    {t.ctaExplore}
                  </a>
                </div>
              </div>

              {/* Dynamic Abstract Interactive World Mesh on Right */}
              <div className="lg:col-span-5 flex justify-center relative">
                <div className={`w-80 h-80 rounded-2xl border flex flex-col justify-center items-center p-6 text-center ${
                  isDarkMode ? "bg-gradient-to-br from-[#060c1d] to-[#040814] border-blue-950/60 shadow-2xl shadow-blue-500/5" : "bg-white border-slate-200 shadow-xl"
                }`}>
                  {/* Geometric Wireframe Grid */}
                  <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                    <motion.div
                      className="absolute inset-0 rounded-full border border-blue-500/20"
                      animate={{ scale: [1, 1.15, 1], rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-4 rounded-xl border border-gold-400/20"
                      animate={{ scale: [1.1, 1, 1.1], rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    />
                    <Globe className="w-10 h-10 text-blue-400" />
                  </div>

                  <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest mb-1 font-semibold">Active Operational Grid</span>
                  <h4 className={`font-display font-bold text-lg leading-snug ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                    Nairobi ➔ Lagos ➔ JHB
                  </h4>
                  <p className="text-xs text-gray-400 mt-2 max-w-xs font-light">
                    Continuous pipeline validation matching financial records to supply chain nodes instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Scroll down indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
              <motion.a
                href="#decision-console"
                className={`flex items-center justify-center w-9 h-9 rounded-full border cursor-pointer transition-all ${
                  isDarkMode
                    ? "border-blue-950/80 bg-[#040814]/80 text-gold-400 hover:border-gold-400 hover:text-white"
                    : "border-slate-200 bg-white/80 text-blue-600 hover:border-blue-500 hover:text-blue-700"
                }`}
                animate={{
                  y: [0, 6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                title="Scroll to Dashboard"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.a>
              <motion.div
                className="absolute w-11 h-11 rounded-full border border-gold-400/20 -z-10"
                style={{ top: "-4px" }}
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Mesh pattern overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />
          </section>

          {/* REALTIME SYSTEM TELEMETRY WIDGET CONSOLE */}
          <section id="decision-console" className="max-w-7xl mx-auto px-6 pb-20 relative">
            <EnterpriseDashboard />
          </section>

          {/* CAPABILITIES / SERVICES SECTION */}
          <section id="services" className={`py-20 px-6 border-t ${isDarkMode ? "border-blue-950/40 bg-[#030610]" : "border-slate-200 bg-white"}`}>
            <div className="max-w-7xl mx-auto">
              <div className="max-w-3xl mb-12">
                <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">{t.servicesTitle}</span>
                <h3 className={`font-display font-semibold text-3xl md:text-4xl tracking-tight mt-1 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                  Modernizing the Operational Core of African Industry
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`border rounded-xl p-6 transition-all duration-300 relative group flex flex-col justify-between ${
                      isDarkMode
                        ? "bg-[#050b18] border-blue-950/60 hover:border-blue-800/60 hover:shadow-lg hover:shadow-blue-500/5"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    <div>
                      {/* Icon Container */}
                      <div className={`p-2.5 w-fit rounded-lg mb-5 border ${
                        isDarkMode ? "bg-blue-950/40 border-blue-900/30 text-blue-400" : "bg-blue-100 border-blue-200 text-blue-600"
                      }`}>
                        {getIcon(service.iconName, !isDarkMode)}
                      </div>

                      <h4 className={`font-display font-bold text-lg mb-3 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                        {service.title}
                      </h4>
                      
                      <p className="text-xs text-gray-400 leading-relaxed font-light mb-6">
                        {service.description}
                      </p>
                    </div>

                    <ul className="space-y-2 border-t border-blue-950/40 pt-4 text-[11px] font-mono">
                      {service.bulletPoints.map((bullet, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* INDUSTRIES SHOWCASE SECTION */}
          <section id="industries" className="py-20 px-6 relative">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-3xl mb-12">
                <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">{t.industriesTitle}</span>
                <h3 className={`font-display font-semibold text-3xl md:text-4xl tracking-tight mt-1 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                  Industry Showcases & Live Operational Mapping
                </h3>
              </div>

              {/* Layout: Sidebar list of industries, large visualization on right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Sidebar Industry selector */}
                <div className="lg:col-span-4 space-y-2.5">
                  {industries.map((industry, index) => (
                    <button
                      key={industry.id}
                      onClick={() => setActiveIndustryIdx(index)}
                      className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        index === activeIndustryIdx
                          ? isDarkMode
                            ? "bg-[#060c1d] border-gold-400/80 text-white shadow-lg"
                            : "bg-blue-50 border-blue-500 text-blue-950"
                          : isDarkMode
                          ? "bg-transparent border-blue-950/40 text-gray-400 hover:text-white hover:bg-blue-950/10"
                          : "bg-transparent border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="shrink-0">{getIcon(industry.iconName, !isDarkMode)}</div>
                        <span className="font-display font-bold text-sm">{industry.name}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${index === activeIndustryIdx ? "rotate-90 text-gold-400" : "text-gray-600"}`} />
                    </button>
                  ))}
                </div>

                {/* Right Visualization panel */}
                <div className={`lg:col-span-8 border rounded-2xl p-6 md:p-8 relative overflow-hidden ${
                  isDarkMode ? "bg-black/40 border-blue-950/60" : "bg-white border-slate-200 shadow-xl"
                }`}>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Active Modernization Model</span>
                  <h4 className={`font-display font-semibold text-xl md:text-2xl mt-1.5 mb-4 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                    {industries[activeIndustryIdx].name} Focus Showcase
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-xl font-light mb-8">
                    {industries[activeIndustryIdx].description}
                  </p>

                  {/* Flow Map Visualizer inside active industry */}
                  <div className="bg-[#030610] border border-blue-950 rounded-xl p-5 mb-8">
                    <span className="font-mono text-[10px] text-gold-400 uppercase tracking-wider block mb-3 font-semibold">Operational Chain Mapping</span>
                    <div className="text-[11px] font-mono text-blue-400 font-semibold mb-2">
                      {industries[activeIndustryIdx].visualLabel}
                    </div>
                    <div className="w-full h-[1.5px] bg-blue-950 relative rounded-full overflow-hidden mb-2">
                      <motion.div
                        className="absolute h-full bg-gradient-to-r from-blue-500 via-gold-400 to-blue-500"
                        animate={{ left: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        style={{ width: "35%", position: "absolute" }}
                      />
                    </div>
                  </div>

                  {/* Step-by-Step modernizations list */}
                  <div className="space-y-4">
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block font-semibold">Integrations we implement</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {industries[activeIndustryIdx].operationalSteps.map((step, idx) => (
                        <div key={idx} className="bg-blue-950/10 border border-blue-950/50 p-4 rounded text-xs text-gray-300">
                          <div className="font-mono font-bold text-gold-400 mb-1.5 uppercase">0{idx + 1}. Step</div>
                          <p className="text-gray-400 leading-normal">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* INSTANT ENTERPRISE CONSULTING BLUEPRINT ENGINE */}
          <section id="architect-consulting" className={`py-20 px-6 border-t ${isDarkMode ? "border-blue-950/40 bg-[#030610]" : "border-slate-200 bg-white"}`}>
            <div className="max-w-7xl mx-auto">
              <div className="max-w-3xl mb-12">
                <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">{t.consultingTitle}</span>
                <h3 className={`font-display font-semibold text-3xl md:text-4xl tracking-tight mt-1 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                  Axion AI-Driven IT Blueprint Generator
                </h3>
                <p className="text-sm text-gray-400 mt-2 max-w-xl font-light">
                  {t.consultingSubtitle}
                </p>
              </div>

              <AIArchitect />
            </div>
          </section>

          {/* PORTFOLIO / CASE STUDIES SECTION */}
          <section id="case-studies" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-3xl mb-8">
                <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">{t.portfolioTitle}</span>
                <h3 className={`font-display font-semibold text-3xl md:text-4xl tracking-tight mt-1 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                  Proven Performance in Multi-Region Enterprise Operations
                </h3>
                <p className="text-sm text-gray-400 mt-1 max-w-xl font-light">
                  {t.portfolioSubtitle}
                </p>
              </div>

              {/* Sector Filtering Controls */}
              <div className="flex flex-wrap gap-2.5 mb-12 font-mono text-[10px]">
                {(["All", "Logistics", "Manufacturing"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setCaseStudyFilter(filter)}
                    className={`px-4 py-2 border rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                      caseStudyFilter === filter
                        ? isDarkMode
                          ? "bg-blue-950 border-gold-400 text-white font-bold"
                          : "bg-blue-100 border-blue-600 text-blue-950 font-bold"
                        : isDarkMode
                        ? "bg-transparent border-blue-950/60 text-gray-500 hover:text-gray-300 hover:border-blue-900"
                        : "bg-transparent border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300"
                    }`}
                  >
                    {filter === "All" ? "All Sectors" : filter}
                  </button>
                ))}
              </div>

              {/* Grid of Case Studies */}
              <motion.div
                className="space-y-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {filteredCaseStudies.map((cs) => (
                  <motion.div
                    key={cs.id}
                    variants={itemVariants}
                    className={`case-study-card border rounded-2xl p-6 md:p-8 relative transition-all duration-300 hover:scale-[1.02] ${
                      isDarkMode
                        ? "bg-gradient-to-br from-[#050b18] to-black border-blue-950/60 hover:border-blue-800/80 hover:shadow-2xl hover:shadow-blue-500/10"
                        : "bg-white border-slate-200 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 hover:border-slate-300"
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left: Case study content */}
                      <div className="lg:col-span-8 space-y-5">
                        <div>
                          <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest font-semibold">{cs.industry}</span>
                          <h4 className={`font-display font-bold text-2xl mt-1 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                            {cs.title}
                          </h4>
                        </div>

                        <div className="space-y-4 text-sm leading-relaxed text-gray-300">
                          <div>
                            <span className="text-xs font-mono text-gray-500 uppercase font-bold block mb-1">The Challenge:</span>
                            <p className="font-light text-gray-400">{cs.problem}</p>
                          </div>
                          <div className="border-t border-blue-950/40 pt-4">
                            <span className="text-xs font-mono text-gray-500 uppercase font-bold block mb-1">Axion Solution:</span>
                            <p className="font-light text-gray-400">{cs.solution}</p>
                          </div>
                        </div>

                        {/* Interactive Architecture Steps */}
                        <div className="border-t border-blue-950/40 pt-4">
                          <span className="text-xs font-mono text-gray-500 uppercase font-bold block mb-3">System Dataflow Architecture:</span>
                          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                            {cs.architecture.map((step, sIdx) => (
                              <div key={sIdx} className="bg-blue-950/15 border border-blue-950 p-2.5 rounded text-[10px] font-mono text-gray-300">
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Technical Stats, ROI & Tools */}
                      <div className="lg:col-span-4 space-y-6">
                        {/* High-Impact ROI Widget Board */}
                        <div className="bg-[#030610] border border-blue-950 p-5 rounded-xl">
                          <span className="font-mono text-[10px] text-gold-400 uppercase tracking-wider block mb-4 font-semibold">Verified ROI Metrics</span>
                          <div className="space-y-4">
                            {cs.roiMetrics.map((m, mIdx) => (
                              <div key={mIdx} className="border-b border-blue-950/50 pb-3 last:border-0 last:pb-0">
                                <span className="text-[10px] text-gray-500 uppercase font-mono">{m.label}</span>
                                <div className="text-2xl font-display font-bold text-white flex items-baseline">
                                  <CountUpMetric value={m.value} />
                                  <span className="text-xs text-blue-400 ml-0.5 font-sans font-normal">{m.suffix}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Stack used badge list */}
                        <div className="space-y-2">
                          <span className="text-xs font-mono text-gray-500 uppercase font-bold block">Technologies Deployed:</span>
                          <div className="flex flex-wrap gap-2">
                            {cs.techUsed.map((tech) => (
                              <div
                                key={tech}
                                className="relative group/tech cursor-help"
                              >
                                <span className="bg-blue-950/30 border border-blue-900/40 text-blue-300 font-mono text-[10px] px-2.5 py-1 rounded block transition-colors group-hover/tech:border-blue-700 group-hover/tech:text-gold-400">
                                  {tech}
                                </span>
                                {/* Hover Tooltip box */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 rounded bg-slate-900 border border-blue-900 text-[10px] text-gray-300 font-sans shadow-xl opacity-0 scale-95 pointer-events-none group-hover/tech:opacity-100 group-hover/tech:scale-100 group-hover/tech:pointer-events-auto transition-all duration-200 z-30 leading-normal">
                                  {techDescriptions[tech] || "Specialized technology module integrated into our cloud data architecture."}
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* COMPANY / VALUES, LEADERSHIP & MISSION */}
          <section id="company" className={`py-20 px-6 border-t ${isDarkMode ? "border-blue-950/40 bg-[#030610]" : "border-slate-200 bg-white"}`}>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                <div className="lg:col-span-5">
                  <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Our Governance</span>
                  <h3 className={`font-display font-semibold text-3xl md:text-4xl tracking-tight mt-1 mb-4 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                    Built on Trust, Built for Continuous Enterprise Scale
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    Axion Technologies is not a startup. We operate with standard, rigorous corporate governance frameworks, catering exclusively to the modernization of complex enterprise operations across the African continent.
                  </p>
                </div>

                {/* Bento layout for Mission & Vision */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Mission */}
                  <div className={`p-6 border rounded-xl ${isDarkMode ? "bg-[#050b18] border-blue-950/60" : "bg-slate-50 border-slate-200"}`}>
                    <h4 className="font-display font-bold text-lg text-white mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-gold-400" />
                      {t.missionTitle}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">{t.missionText}</p>
                  </div>

                  {/* Vision */}
                  <div className={`p-6 border rounded-xl ${isDarkMode ? "bg-[#050b18] border-blue-950/60" : "bg-slate-50 border-slate-200"}`}>
                    <h4 className="font-display font-bold text-lg text-white mb-3 flex items-center gap-2">
                      <Building className="w-5 h-5 text-gold-400" />
                      {t.visionTitle}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">{t.visionText}</p>
                  </div>
                </div>
              </div>

              {/* Leadership portraits section */}
              <div className="space-y-6">
                <h4 className="font-display font-semibold text-xl text-white mb-6 uppercase tracking-widest font-mono text-gray-400">
                  Executive Committee
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {teamMembers.map((member) => (
                    <div
                      key={member.name}
                      className={`border rounded-xl p-5 flex items-center gap-4 transition-all ${
                        isDarkMode ? "bg-black/40 border-blue-950/60 hover:border-blue-900" : "bg-white border-slate-200 shadow"
                      }`}
                    >
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-full object-cover border border-gold-400/30"
                      />
                      <div>
                        <h5 className="font-display font-bold text-sm text-white">{member.name}</h5>
                        <p className="text-[10px] text-gold-400 font-mono mt-0.5">{member.role}</p>
                        <p className="text-[11px] text-gray-500 mt-1 font-light leading-snug">{member.background}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* DYNAMIC FUTURE VISION EXPANSION ROADMAP TIMELINE */}
          <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">{t.timelineTitle}</span>
              <h3 className={`font-display font-semibold text-3xl md:text-4xl tracking-tight mt-1 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                Axion Strategic Growth Horizon
              </h3>
            </div>

            {/* Timeline Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {timelineSteps.map((step, idx) => (
                <div
                  key={step.year}
                  className={`border rounded-xl p-5 relative flex flex-col justify-between ${
                    isDarkMode ? "bg-[#050b18] border-blue-950/60" : "bg-white border-slate-200 shadow"
                  }`}
                >
                  <div>
                    <span className="font-display font-black text-3xl text-gold-400 font-mono block mb-2">{step.year}</span>
                    <h4 className="font-display font-bold text-sm text-white mb-2">{step.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* QUICK INVESTOR RELATIONS & CAPITAL PROJECTS SUMMARY PANEL */}
          <section className={`py-12 px-6 border-y ${isDarkMode ? "bg-[#030610] border-blue-950/40" : "bg-slate-100 border-slate-200"}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-mono">
              <div className="lg:col-span-7">
                <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest block mb-1">Investor Relations</span>
                <h4 className={`font-display font-bold text-lg text-white ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  Accelerating Capital Project Deployments across SADC & ECOWAS
                </h4>
                <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed max-w-xl">
                  Axion Technologies Ltd. is fully capitalized through institutional private placement. Review our strategic performance metrics, regional expansion budgets, and compliance guidelines.
                </p>
              </div>

              {/* Stats & Actions */}
              <div className="lg:col-span-5 flex flex-wrap gap-4 items-center justify-start lg:justify-end">
                <div className="bg-[#050b18] border border-blue-950 rounded px-4 py-3 min-w-[120px]">
                  <span className="text-[9px] text-gray-500 uppercase">Capital Funding</span>
                  <div className="text-sm font-bold text-white mt-1">$4.2M USD</div>
                </div>
                <div className="bg-[#050b18] border border-blue-950 rounded px-4 py-3 min-w-[120px]">
                  <span className="text-[9px] text-gray-500 uppercase">Active Audits</span>
                  <div className="text-sm font-bold text-white mt-1">100% Perfect</div>
                </div>
                <button
                  onClick={() => alert("Corporate Fact Sheet & Presentation Deck requested. Inbound link delivered to liaison terminal.")}
                  className="bg-transparent border border-blue-900 hover:border-gold-500 text-blue-400 hover:text-gold-400 text-xs py-3 px-4 rounded flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Fact Sheet
                </button>
              </div>
            </div>
          </section>

          {/* CONTACT & OFFICE CHANNELS CENTER */}
          <section className="py-20 px-6 max-w-7xl mx-auto">
            <ContactConsultation />
          </section>

          {/* CORPORATE FOOTER */}
          <footer className={`border-t py-12 px-6 text-xs text-gray-500 ${isDarkMode ? "bg-[#02050c] border-blue-950/40" : "bg-white border-slate-200"}`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-950 border border-gold-500/50 rounded flex items-center justify-center font-bold text-white text-xs">
                  A
                </div>
                <div>
                  <span className="font-bold text-gray-300 tracking-widest block text-[10px]">AXION TECHNOLOGIES LTD</span>
                  <span className="text-[9px] text-gray-500 font-light">Transforming African Commerce Through Intelligent Systems</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-[10px] uppercase">
                <a href="#services" className="hover:text-white">Capabilities</a>
                <a href="#industries" className="hover:text-white">Industries</a>
                <a href="#case-studies" className="hover:text-white">Case Studies</a>
                <a href="#company" className="hover:text-white">Company Governance</a>
              </div>

              <div className="text-center md:text-right text-[9px] font-light max-w-xs text-gray-500">
                © 2026 Axion Technologies Ltd. All rights reserved. Pan-African IT modernization frameworks and SAP implementations conform to regional country trade protocols.
              </div>
            </div>
          </footer>
        </div>
      )}
    </AnimatePresence>
  );
}

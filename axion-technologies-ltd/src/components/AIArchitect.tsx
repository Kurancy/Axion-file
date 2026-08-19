import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Sparkles, Building, Briefcase, FileSpreadsheet, MapPin, Loader2, ArrowRight, CheckCircle2, ChevronRight, Layers, FileText, TrendingUp, AlertCircle, RefreshCw } from "lucide-react";
import { ArchitectReport } from "../types";

export default function AIArchitect() {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "Logistics & Supply Chain",
    size: "Regional Enterprise (100 - 500 employees)",
    challenges: "Manual invoice ingestion delays, stock tracking leakages, and lack of real-time centralized dashboard insights.",
    country: "Kenya"
  });

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [report, setReport] = useState<ArchitectReport | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "roadmap" | "stack" | "architecture" | "roi">("summary");

  const industriesList = [
    "Logistics & Supply Chain",
    "Heavy Manufacturing",
    "Warehousing & FMCG Distribution",
    "High-Growth SMEs",
    "Healthcare Systems",
    "Higher Education"
  ];

  const sizesList = [
    "SME (under 100 employees)",
    "Regional Enterprise (100 - 500 employees)",
    "Multinational Enterprise (500+ employees)"
  ];

  const loadingSteps = [
    "AUDITING OPERATIONAL CHANNELS...",
    "MAPPING siloed LEDGERS AND TRANSACTION CHANNELS...",
    "CONSTRUCTING OPTIMAL DATAFLOW TOPOLOGY...",
    "COMPILING STRATEGIC ROADMAP AND CALCULATING ESTIMATED BUSINESS ROI..."
  ];

  const runLoadingSequence = (callback: () => void) => {
    setLoading(true);
    setLoadingStep(0);
    
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          callback();
          return prev;
        }
      });
    }, 900);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName.trim()) {
      alert("Please specify your Organization Name.");
      return;
    }

    runLoadingSequence(async () => {
      try {
        const response = await fetch("/api/architect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        setReport(data);
        setActiveTab("summary");
      } catch (err) {
        console.error("Failed to connect to AI consulting engine:", err);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="w-full bg-[#050b18] border border-blue-900/20 rounded-xl p-6 md:p-8 relative">
      {/* Sparkle background details */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gold-500/10 rounded-lg text-gold-400 border border-gold-500/20">
          <Brain className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-xl md:text-2xl text-white flex items-center gap-2">
            Axion AI Consulting Engine
          </h3>
          <p className="text-xs text-gray-500">
            Generate an instant, high-fidelity modernization blueprint tailored to your operational parameters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* LEFT COLUMN: Input Form */}
        <form onSubmit={handleGenerate} className="lg:col-span-5 space-y-4 bg-black/40 border border-blue-950/60 rounded-xl p-5 md:p-6 h-fit">
          <h4 className="font-display font-medium text-sm text-white mb-3 uppercase tracking-wider font-mono text-gray-400">
            Organization Parameters
          </h4>

          {/* Company Name */}
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-500" /> Organization Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Nairobi Coffee Distributing Co."
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full bg-[#040814] border border-blue-950/80 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gold-500/60"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-500" /> Sector of Operations
            </label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="w-full bg-[#040814] border border-blue-950/80 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gold-500/60 cursor-pointer"
            >
              {industriesList.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Size */}
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-500" /> Business Scale
            </label>
            <select
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              className="w-full bg-[#040814] border border-blue-950/80 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gold-500/60 cursor-pointer"
            >
              {sizesList.map((sz) => (
                <option key={sz} value={sz}>{sz}</option>
              ))}
            </select>
          </div>

          {/* Operating Country */}
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-500" /> Operating Country / Node
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Kenya, Nigeria, South Africa"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full bg-[#040814] border border-blue-950/80 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gold-500/60"
            />
          </div>

          {/* Challenges Textarea */}
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5 flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-500" /> Key Bottlenecks & Challenges
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe manual steps, siloed sheets, stock leakage, invoice lag, etc."
              value={formData.challenges}
              onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
              className="w-full bg-[#040814] border border-blue-950/80 rounded px-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gold-500/60 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-xs py-3 rounded uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/10 border border-blue-500/25"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing Parameters...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-gold-400" />
                Generate Blueprint
              </>
            )}
          </button>
        </form>

        {/* RIGHT COLUMN: Loading / Output */}
        <div className="lg:col-span-7 flex flex-col justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* 1. INITIAL state */}
            {!loading && !report && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center p-8 bg-blue-950/10 border border-blue-950 rounded-xl h-full flex flex-col justify-center items-center"
              >
                <div className="w-16 h-16 bg-blue-950/40 rounded-full flex items-center justify-center mb-4 border border-blue-900/30">
                  <Sparkles className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="font-display font-medium text-lg text-white mb-2">Engine Awaiting Input</h4>
                <p className="text-sm text-gray-500 max-w-sm">
                  Specify your enterprise metrics on the left, and click **Generate Blueprint** to kickstart our consulting analyzer.
                </p>
              </motion.div>
            )}

            {/* 2. LOADING state */}
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-8 h-full flex flex-col justify-center items-center font-mono"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full border border-blue-900/20 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-gold-400 animate-spin" />
                  </div>
                  <div className="absolute inset-0 border border-t-blue-500 rounded-full animate-pulse" />
                </div>
                <h5 className="text-xs text-blue-400 uppercase tracking-widest mb-1.5">Axion Engine Processing</h5>
                <motion.p
                  key={loadingStep}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-xs max-w-md font-semibold"
                >
                  &gt; {loadingSteps[loadingStep]}
                </motion.p>
              </motion.div>
            )}

            {/* 3. REPORT OUTPUT state */}
            {!loading && report && (
              <motion.div
                key="report"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black/40 border border-blue-950 rounded-xl overflow-hidden flex flex-col h-full"
              >
                {/* Engine Source Badge */}
                <div className="bg-[#050915] px-4 py-3 border-b border-blue-950 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                    <span className="font-mono text-[10px] text-gray-400 tracking-wider uppercase">
                      Analysis Module: {report.isLocalEngine ? "Axion Deterministic Engine" : "Gemini 3.5 Executive Ingress"}
                    </span>
                  </div>
                  <button
                    onClick={() => setReport(null)}
                    className="font-mono text-[10px] text-gray-500 hover:text-gold-400 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Clear Results
                  </button>
                </div>

                {/* Tabs selection */}
                <div className="flex border-b border-blue-950 overflow-x-auto text-xs font-mono bg-blue-950/10">
                  {(["summary", "roadmap", "stack", "architecture", "roi"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 capitalize transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                        activeTab === tab
                          ? "text-gold-400 border-gold-400 bg-blue-950/30"
                          : "text-gray-500 border-transparent hover:text-gray-300"
                      }`}
                    >
                      {tab === "roi" ? "ROI Analysis" : tab}
                    </button>
                  ))}
                </div>

                {/* Tab content space */}
                <div className="p-5 md:p-6 flex-grow overflow-y-auto max-h-[420px]">
                  {/* Summary Tab */}
                  {activeTab === "summary" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-gold-400" />
                        <h4 className="font-display font-medium text-white text-base">Strategic Corporate Assessment</h4>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-300">
                        {report.consultingSummary}
                      </p>
                      <div className="bg-blue-950/20 border border-blue-900/30 p-3.5 rounded text-xs text-blue-400">
                        <span className="font-bold">Lead Consultant Note:</span> This digital pipeline is designed specifically to comply with operating systems in {formData.country}. All systems scale naturally with traffic peaks.
                      </div>
                    </div>
                  )}

                  {/* Roadmap Tab */}
                  {activeTab === "roadmap" && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <Layers className="w-5 h-5 text-gold-400" />
                        <h4 className="font-display font-medium text-white text-base">Modernization Timeline</h4>
                      </div>
                      <div className="space-y-4 font-sans text-sm">
                        {report.roadmap.map((phase, idx) => (
                          <div key={idx} className="border-l-2 border-blue-900 pl-4 py-1 relative">
                            {/* Chrono Indicator */}
                            <div className="absolute -left-[5px] top-2 w-2 h-2 bg-gold-400 rounded-full" />
                            <div className="flex justify-between items-start flex-wrap gap-2 mb-1.5">
                              <h5 className="font-display font-bold text-white text-sm">{phase.title}</h5>
                              <span className="bg-blue-950 border border-blue-900 text-blue-400 text-[10px] font-mono px-2 py-0.5 rounded">{phase.duration}</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-2">{phase.description}</p>
                            <ul className="space-y-1">
                              {phase.milestones.map((ms, mIdx) => (
                                <li key={mIdx} className="text-xs text-gray-300 flex items-center gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                  <span>{ms}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stack Tab */}
                  {activeTab === "stack" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Layers className="w-5 h-5 text-gold-400" />
                        <h4 className="font-display font-medium text-white text-base">Target Enterprise Tech Stack</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {report.techStack.map((item, idx) => (
                          <div key={idx} className="bg-[#050914] border border-blue-950 p-4 rounded-lg flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{item.category}</span>
                              <h5 className="font-display font-bold text-white text-sm mt-1">{item.tech}</h5>
                            </div>
                            <p className="text-xs text-gray-400 mt-2 border-t border-blue-950/50 pt-2">{item.purpose}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Architecture Tab */}
                  {activeTab === "architecture" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ChevronRight className="w-5 h-5 text-gold-400" />
                        <h4 className="font-display font-medium text-white text-base">Custom Dataflow Topology</h4>
                      </div>

                      {/* Custom SVG Architecture Nodes Connecting */}
                      <div className="relative w-full bg-[#050914] border border-blue-950 rounded-lg p-4 flex flex-col items-center">
                        <div className="w-full space-y-3 font-mono text-xs">
                          {report.architectureDiagram.map((node, index) => (
                            <div key={index} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-3 bg-black/40 border border-blue-950/60 rounded">
                              <span className="bg-blue-950 border border-blue-800 text-blue-400 text-[10px] px-2 py-0.5 rounded uppercase font-bold shrink-0 text-center w-24">
                                {node.type}
                              </span>
                              <div>
                                <div className="text-white font-bold">{node.label}</div>
                                <div className="text-[10px] text-gray-500 mt-0.5">{node.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ROI Tab */}
                  {activeTab === "roi" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-gold-400" />
                        <h4 className="font-display font-medium text-white text-base">Financial Impact & ROI Analysis</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {report.roiMetrics.map((metric, idx) => (
                          <div key={idx} className="bg-[#050914] border border-blue-950 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-gray-400 font-medium">{metric.label}</span>
                              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-900/10 px-2 py-0.5 rounded">
                                {metric.improvement}
                              </span>
                            </div>
                            <div className="text-2xl font-display font-bold text-white mb-2">{metric.value}</div>
                            <p className="text-xs text-gray-500 leading-relaxed border-t border-blue-950/40 pt-2">{metric.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer action button */}
                <div className="bg-[#050915] p-4 border-t border-blue-950 flex items-center justify-between flex-wrap gap-4">
                  <p className="text-xs text-gray-500">
                    Draft proposal valid for 30 business days.
                  </p>
                  <a
                    href="#contact"
                    className="bg-gold-500 hover:bg-gold-600 text-navy-950 text-[11px] uppercase tracking-wider font-bold py-2.5 px-4 rounded transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-gold-500/5"
                  >
                    Schedule Consultation Briefing
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Sparkles, Loader2, Copy, FileText, Send, AlertTriangle, ShieldCheck } from "lucide-react";
import { Language } from "../types";

interface ConsultationAssistantProps {
  language: Language;
  isDarkMode: boolean;
}

export default function ConsultationAssistant({ language, isDarkMode }: ConsultationAssistantProps) {
  const [form, setForm] = useState({
    businessName: "",
    industry: "Manufacturing",
    size: "100-500 Employees (Mid-to-Large)",
    bottleneck: "",
    targetTech: "AI Automation (OCR / Document Processing)",
  });

  // Check for pre-calculated ROI parameters from interactive calculator
  useEffect(() => {
    try {
      const stored = localStorage.getItem("synapse_roi_preset");
      if (stored) {
        const data = JSON.parse(stored);
        setForm({
          businessName: data.businessName || "",
          industry: data.industry || "Manufacturing",
          size: data.size || "100-500 Employees (Mid-to-Large)",
          bottleneck: data.bottleneck || "",
          targetTech: data.targetTech || "AI Automation (OCR / Document Processing)",
        });
        // Clear after reading so it doesn't persist forever
        localStorage.removeItem("synapse_roi_preset");
      }
    } catch (e) {
      console.error("Failed to restore ROI calculations", e);
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Reassuring enterprise status logs during long-running API generation cycles
  const loadingMessages = [
    "Analyzing corporate bottlenecks and operational matrices...",
    "Evaluating regional distribution factors & supply chain logistics...",
    "Synthesizing customized SAP and Oracle database integration bridges...",
    "Designing cognitive AI agent workflows with Gemini intelligence cores...",
    "Compiling enterprise-grade security configurations (AES-256 TLS 1.3)..."
  ];

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const triggerSynthesis = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.bottleneck.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setLoadingStep(0);

    // Stagger loading messages for an immersive high-tech consulting experience
    const messageInterval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 1500);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: form.businessName,
          industry: form.industry,
          size: form.size,
          bottleneck: form.bottleneck,
          targetTech: form.targetTech,
          language: language,
        })
      });

      const data = await response.json();
      clearInterval(messageInterval);

      if (response.ok && data.roadmap) {
        setResult(data.roadmap);
      } else {
        throw new Error(data.error || "Internal roadmap synthesis failure.");
      }
    } catch (err: any) {
      clearInterval(messageInterval);
      console.error(err);
      setError(err.message || "An unexpected error occurred during blueprint generation.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple, elegant, high-contrast visual markdown-to-HTML parser for clean card formatting
  const parseMarkdownToReact = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      // Headers
      if (trimmed.startsWith("###")) {
        return (
          <h4 key={idx} className="text-base font-bold font-display text-white mt-5 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-brand-blue-light rounded" />
            {trimmed.replace("###", "").trim()}
          </h4>
        );
      }
      if (trimmed.startsWith("####")) {
        return (
          <h5 key={idx} className="text-sm font-semibold tracking-wide uppercase font-mono text-brand-gold mt-4 mb-2">
            {trimmed.replace("####", "").trim()}
          </h5>
        );
      }
      if (trimmed.startsWith("##")) {
        return (
          <h3 key={idx} className="text-lg font-bold font-display text-brand-blue-light mt-6 mb-3 pb-1 border-b border-slate-800/60">
            {trimmed.replace("##", "").trim()}
          </h3>
        );
      }
      
      // List items
      if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        // Parse simple bold markers inside lists
        const listText = trimmed.substring(1).trim();
        return (
          <li key={idx} className="text-xs leading-relaxed text-slate-300 ml-4 list-disc mb-1.5">
            {parseBoldMarkers(listText)}
          </li>
        );
      }

      // Normal paragraphs
      if (trimmed.length > 0) {
        return (
          <p key={idx} className="text-xs leading-relaxed text-slate-300 mb-3">
            {parseBoldMarkers(trimmed)}
          </p>
        );
      }

      return <div key={idx} className="h-2" />;
    });
  };

  const parseBoldMarkers = (text: string) => {
    const parts = text.split("**");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="text-white font-semibold">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div id="ai-consulting-assistant-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      {/* Left Side: Form Configuration */}
      <div className="lg:col-span-5 flex">
        <div className={`w-full rounded-2xl border p-6 flex flex-col justify-between ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}>
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue-light">
                <Sparkles className="w-5 h-5 text-brand-gold animate-pulse" />
              </div>
              <div>
                <h3 className={`text-lg font-bold font-display ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  AI Transformation Engine
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  Secured Advisory Core
                </span>
              </div>
            </div>

            <p className={`text-xs mb-6 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Input your organization's criteria to trigger a real-time system audit and blueprint synthesis mapping our custom core integration layers.
            </p>

            <form onSubmit={triggerSynthesis} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                  Business Name (Optional)
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={form.businessName}
                  onChange={handleFormChange}
                  placeholder="e.g. AfriFreight Distribution"
                  className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors outline-none ${
                    isDarkMode
                      ? "bg-slate-950 border-slate-800 text-white focus:border-brand-blue"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-brand-blue"
                  }`}
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                  Sector / Target Vertical
                </label>
                <select
                  name="industry"
                  value={form.industry}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors outline-none ${
                    isDarkMode
                      ? "bg-slate-950 border-slate-800 text-white focus:border-brand-blue"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-brand-blue"
                  }`}
                >
                  <option value="Manufacturing">Manufacturing & Heavy Industry</option>
                  <option value="Warehousing & Storage">Warehousing & Storage</option>
                  <option value="Logistics & Freight">Logistics & Cross-Border Freight</option>
                  <option value="Higher Education">Higher Education & Institutions</option>
                  <option value="Healthcare">Healthcare Clinics & Pharma Networks</option>
                  <option value="Retail & SMEs">High-Growth SMEs & Aggregators</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                  Organization Scale
                </label>
                <select
                  name="size"
                  value={form.size}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors outline-none ${
                    isDarkMode
                      ? "bg-slate-950 border-slate-800 text-white focus:border-brand-blue"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-brand-blue"
                  }`}
                >
                  <option value="SME (Under 50 Employees)">SME (Under 50 Employees)</option>
                  <option value="Mid-Scale Corporate (50-200 Employees)">Mid-Scale Corporate (50-200 Employees)</option>
                  <option value="Large Enterprise (200-1000 Employees)">Large Enterprise (200-1000 Employees)</option>
                  <option value="Multi-National / Sovereign (1000+ Employees)">Multi-National / Sovereign (1000+ Employees)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                  Core Bottleneck / Process Friction
                </label>
                <input
                  type="text"
                  name="bottleneck"
                  required
                  value={form.bottleneck}
                  onChange={handleFormChange}
                  placeholder="e.g. manual paper-based invoice data entry, stock auditing shrinkage"
                  className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors outline-none ${
                    isDarkMode
                      ? "bg-slate-950 border-slate-800 text-white focus:border-brand-blue"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-brand-blue"
                  }`}
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                  Desired Technical Core integration
                </label>
                <select
                  name="targetTech"
                  value={form.targetTech}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors outline-none ${
                    isDarkMode
                      ? "bg-slate-950 border-slate-800 text-white focus:border-brand-blue"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-brand-blue"
                  }`}
                >
                  <option value="AI Automation (OCR / Document Processing)">AI Automation (OCR & Cognitive workflows)</option>
                  <option value="SAP / ERP Legacy System Integrations">SAP / ERP Legacy System Integrations</option>
                  <option value="Warehouse Tracking (Barcode & IoT WMS)">Warehouse Tracking (Barcode & IoT WMS)</option>
                  <option value="High-Load Bespoke Cloud Platforms">High-Load Bespoke Cloud Platforms</option>
                  <option value="Comprehensive Big Data BI Dashboards">Comprehensive Big Data BI Dashboards</option>
                </select>
              </div>

              <button
                type="submit"
                id="submit-consultation-btn"
                disabled={loading || !form.bottleneck.trim()}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs text-white bg-brand-blue hover:bg-brand-blue-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Synthesizing Architecture...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Execute Architecture Synthesis</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 border-t border-slate-800/40 pt-4 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>Audit Node: SYNAPSE-COGNITIVE-v3.5</span>
            <span className="flex items-center gap-1 text-green-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure Channel
            </span>
          </div>
        </div>
      </div>

      {/* Right Side: Generated Roadmap Result Terminus */}
      <div className="lg:col-span-7 flex flex-col">
        <div className={`w-full h-full rounded-2xl border flex flex-col justify-between overflow-hidden ${
          isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
        }`}>
          {/* Top Bar controls */}
          <div className={`px-6 py-4 border-b flex items-center justify-between ${
            isDarkMode ? "bg-slate-900/55 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
              System Blueprint Terminal
            </span>
            {result && (
              <div className="flex items-center gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-[10px] font-mono border border-slate-700/60"
                  title="Copy Blueprint text"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-[10px] font-mono border border-slate-700/60"
                  title="Save or Print Blueprint"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Print
                </button>
              </div>
            )}
          </div>

          {/* Core Body Container */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[500px]">
            {loading ? (
              /* High-tech Loading Matrix Screen */
              <div id="blueprint-loading-screen" className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="relative flex items-center justify-center w-16 h-16 mb-6">
                  <span className="absolute inset-0 rounded-full bg-brand-blue/15 animate-ping" />
                  <Loader2 className="w-10 h-10 animate-spin text-brand-blue-light" />
                </div>
                <h4 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">
                  Synthesizing Custom Integration Layers
                </h4>
                <p className="text-xs text-brand-gold font-mono mt-2 h-8 max-w-sm">
                  {loadingMessages[loadingStep]}
                </p>
                <div className="w-48 h-1 bg-slate-800 rounded-full mt-4 overflow-hidden">
                  <div
                    style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                    className="h-full bg-brand-blue transition-all duration-1000"
                  />
                </div>
              </div>
            ) : error ? (
              /* Error notice board */
              <div className="h-full flex flex-col items-center justify-center text-center py-20 text-red-400">
                <AlertTriangle className="w-12 h-12 mb-4 animate-bounce text-red-500" />
                <h4 className="text-sm font-bold uppercase font-mono">System Synthesis Interrupt</h4>
                <p className="text-xs max-w-sm mt-2 text-slate-400 leading-relaxed">
                  {error}
                </p>
                <button
                  onClick={() => setError(null)}
                  className="mt-6 px-4 py-2 rounded bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                >
                  Dismiss & Re-configure
                </button>
              </div>
            ) : result ? (
              /* Synthesized Custom PDF Output Terminal */
              <div id="synthesized-blueprint-output" className="text-left font-sans space-y-4 pr-2">
                {parseMarkdownToReact(result)}
              </div>
            ) : (
              /* Awaiting User input banner */
              <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-50">
                <Sparkles className="w-12 h-12 text-slate-600 mb-4 animate-pulse" />
                <h4 className="text-sm font-semibold text-slate-400 tracking-wide uppercase font-mono">
                  Awaiting Blueprint Parameters
                </h4>
                <p className="text-xs max-w-xs mt-2 text-slate-500 leading-relaxed">
                  Provide bottleneck diagnostics and operational vertical profiles in the configuration panel to map system architectures.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

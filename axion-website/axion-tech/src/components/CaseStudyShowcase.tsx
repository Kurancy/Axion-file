import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Database, Cpu, CheckCircle2, AlertCircle, RefreshCw, BarChart2, Server, FileText, ArrowRight, Layers, LayoutGrid, Box
} from "lucide-react";

interface CaseStudyShowcaseProps {
  studyId: string;
  isDarkMode: boolean;
}

export default function CaseStudyShowcase({ studyId, isDarkMode }: CaseStudyShowcaseProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      {studyId === "wms-logistics" && <WmsShowcase />}
      {studyId === "ai-invoice" && <AiInvoiceShowcase />}
      {studyId === "manufacturing-erp" && <ErpShowcase />}
      {studyId === "enterprise-ai-assistant" && <AiAssistantShowcase />}
    </div>
  );
}

// ─── 1. WMS LOGISTICS DASHBOARD SHOWCASE ───
function WmsShowcase() {
  const [stockLevel, setStockLevel] = useState([74, 52, 91]);
  const [lastActivity, setLastActivity] = useState("BAY-4 RACK-A DISPATCHED");

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate inventory fluctuations
      setStockLevel(prev => prev.map(val => {
        const delta = Math.floor(Math.random() * 9) - 4;
        return Math.min(100, Math.max(15, val + delta));
      }));

      // Random activity feed logs
      const activities = [
        "BAY-4 RACK-A DISPATCHED",
        "INBOUND PALLET #892 RECORDED",
        "BAY-1 RE-ALLOCATION COMPLETE",
        "ROUTE-3 DISPATCH TRIGGERED",
        "LOADER COMPLIANCE SYNCED"
      ];
      setLastActivity(activities[Math.floor(Math.random() * activities.length)]);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 font-mono text-[9px] text-slate-300 relative overflow-hidden select-none">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06)_0%,transparent_75%)]" />
      
      {/* Dashboard Top Frame */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-slate-400 tracking-wider">AXION-WMS-v2.1</span>
        </div>
        <div className="text-slate-500 font-bold">SYSTEM ACTIVE</div>
      </div>

      {/* Main Core Content Grid */}
      <div className="flex-grow flex flex-col justify-center space-y-2">
        {/* Animated Inventory bars */}
        <div className="space-y-1.5">
          <div className="text-slate-500 flex justify-between font-bold">
            <span>INVENTORY LEVEL CAPACITY</span>
            <span>AVG: 72%</span>
          </div>
          {stockLevel.map((lvl, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-8 sticky text-slate-400 text-[8px] font-bold">ZONE {String.fromCharCode(65 + index)}</span>
              <div className="flex-grow h-2.5 bg-slate-900 border border-slate-800/60 rounded-sm overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400"
                  style={{ width: `${lvl}%` }}
                  transition={{ type: "spring", stiffness: 45 }}
                />
              </div>
              <span className="w-6 text-right font-bold text-blue-400">{lvl}%</span>
            </div>
          ))}
        </div>

        {/* Live SVG mini sparkline */}
        <div className="pt-1.5">
          <span className="text-slate-500 font-bold block mb-1">REAL-TIME THROUGHPUT PATH</span>
          <div className="h-10 border border-slate-900 bg-slate-950/40 rounded flex items-center relative overflow-hidden">
            <svg className="w-full h-6 absolute bottom-1 text-blue-500" viewBox="0 0 100 24" preserveAspectRatio="none">
              <motion.path
                d="M0,12 Q15,4 30,16 T60,8 T90,20 L100,12"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            </svg>
            <div className="absolute top-1 right-2 inline-flex items-center gap-1 text-[8px] text-emerald-400 bg-emerald-950/40 px-1 border border-emerald-900 rounded">
              <BarChart2 className="w-2.5 h-2.5 animate-pulse" />
              <span>+45% OPT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Event Logging */}
      <div className="border-t border-slate-800/70 pt-2 mt-2 shrink-0 flex items-center justify-between text-[8px] text-slate-500">
        <span className="truncate max-w-[170px] uppercase font-bold text-brand-gold">LOG // {lastActivity}</span>
        <span className="flex items-center gap-1 font-bold"><RefreshCw className="w-2.5 h-2.5 animate-spin" style={{animationDuration:"6s"}} /> SYNCED</span>
      </div>
    </div>
  );
}

// ─── 2. AI INVOICE OCR ENGINE SHOWCASE ───
function AiInvoiceShowcase() {
  const [flowState, setFlowState] = useState<"ingestion" | "ocr" | "verified" | "sap">("ingestion");
  
  useEffect(() => {
    const sequence = () => {
      setFlowState("ingestion");
      setTimeout(() => setFlowState("ocr"), 1400);
      setTimeout(() => setFlowState("verified"), 2800);
      setTimeout(() => setFlowState("sap"), 4200);
    };

    sequence();
    const interval = setInterval(sequence, 5800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 font-mono text-[9px] text-slate-300 relative overflow-hidden select-none">
      {/* Scanline Sweep overlay during OCR Scan */}
      {flowState === "ocr" && (
        <div className="absolute inset-x-0 h-0.5 bg-brand-gold blur-sm shadow-md animate-bounce opacity-70" style={{top: "40%", animationDuration: "1.8s"}} />
      )}

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-brand-blue-light" />
          <span className="font-bold text-slate-400 tracking-wider">AXION-OCR COGNITIVE</span>
        </div>
        <div className="font-bold text-slate-500">v3.5 PIPELINE</div>
      </div>

      {/* Flow Steps View */}
      <div className="flex-grow flex flex-col justify-center space-y-1.5 py-1">
        {[
          { key: "ingestion", label: "PDF Document Ingested", icon: FileText, desc: "JSON Parser loaded" },
          { key: "ocr", label: "Deep-Learning Layer scan", icon: Cpu, desc: "Reading tax headers" },
          { key: "verified", label: "Ledger Line-Items Verified", icon: CheckCircle2, desc: "SLA threshold checks passed" },
          { key: "sap", label: "SAP Ledger Entry Committed", icon: Database, desc: "Index stored: OK" }
        ].map((step, idx) => {
          const Icon = step.icon;
          const isActive = flowState === step.key;
          const isDone = 
            (flowState === "ocr" && idx < 1) ||
            (flowState === "verified" && idx < 2) ||
            (flowState === "sap" && idx < 3);

          return (
            <div 
              key={step.key}
              className={`flex items-center gap-3 p-1.5 rounded transition-all duration-300 ${
                isActive 
                  ? "bg-brand-blue/15 border border-brand-blue/30" 
                  : "bg-slate-900/10 border border-transparent"
              }`}
            >
              <div className={`p-1 rounded ${
                isActive 
                  ? "bg-brand-blue text-white" 
                  : isDone 
                  ? "bg-emerald-950 text-emerald-400" 
                  : "bg-slate-900 text-slate-600"
              }`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-grow">
                <div className={`font-bold ${isActive ? "text-slate-100" : isDone ? "text-slate-300" : "text-slate-500"}`}>
                  {step.label}
                </div>
                <div className={`text-[8px] ${isActive ? "text-brand-blue-glow font-bold" : "text-slate-600"}`}>
                  {step.desc}
                </div>
              </div>
              <div>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {isActive && <RefreshCw className="w-3 h-3 text-brand-blue animate-spin" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* System Watermark */}
      <div className="border-t border-slate-800/70 pt-2 mt-1 shrink-0 flex items-center justify-between text-[8px] text-slate-500">
        <span className="font-bold">ACCENTURE COMPLIANT INTEGRATORS</span>
        <span className="text-emerald-400 font-bold flex items-center gap-0.5"><CheckCircle2 className="w-2.5 h-2.5" /> 100% LEDGER ACCURACY</span>
      </div>
    </div>
  );
}

// ─── 3. CEMENT MANUFACTURING ERP DIGITAL TACTICAL VIEW ───
function ErpShowcase() {
  const [dataActivity, setDataActivity] = useState<string>("WAITING INT");

  useEffect(() => {
    const logs = [
      "KILN #4 FLOW VELOCITY OK",
      "ORACLE CLOUD LEDGER UPDATE",
      "UNIT MARGIN METRIC TON RE-CALC",
      "BULK ORDER #899 SYNCED TO LEDGER",
      "MATERIAL CONSUMPTION AUDIT OK"
    ];
    const interval = setInterval(() => {
      setDataActivity(logs[Math.floor(Math.random() * logs.length)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 font-mono text-[9px] text-slate-300 relative overflow-hidden select-none">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-brand-gold" />
          <span className="font-bold text-slate-400 tracking-wider">AEROCEMENT-ORACLE-BACKPLANE</span>
        </div>
        <div className="font-bold text-slate-500">SYNC ACTIVE</div>
      </div>

      {/* Schema Block Model representing systems links */}
      <div className="flex-grow flex items-center justify-center relative">
        {/* Core database cylindrical visualization */}
        <div className="absolute w-12 h-14 bg-slate-900 border border-brand-gold/45 rounded-lg flex flex-col items-center justify-center gap-1 glow-blue-sm">
          <Server className="w-5 h-5 text-brand-gold animate-pulse" />
          <span className="text-[7px] text-slate-400 font-bold">ORACLE</span>
        </div>

        {/* Floating modules around database */}
        {/* Kiln Floors */}
        <div className="absolute top-2 left-3 p-1.5 bg-slate-950 border border-slate-800 rounded flex items-center gap-1">
          <Layers className="w-3 h-3 text-blue-400" />
          <span>KILN FLOOR</span>
        </div>
        {/* Bulk sales */}
        <div className="absolute top-2 right-3 p-1.5 bg-slate-950 border border-slate-800 rounded flex items-center gap-1">
          <BarChart2 className="w-3 h-3 text-emerald-400" />
          <span>LEDGER</span>
        </div>
        {/* Logistics */}
        <div className="absolute bottom-2 left-6 p-1.5 bg-slate-950 border border-slate-800 rounded flex items-center gap-1">
          <Box className="w-3 h-3 text-brand-blue-light" />
          <span>SILOS</span>
        </div>

        {/* Lines pointing to database */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 120">
          {/* Top Left -> Center */}
          <motion.line x1="50" y1="28" x2="84" y2="52" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3"
            animate={{ strokeDashoffset: [-20, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
          {/* Top Right -> Center */}
          <motion.line x1="140" y1="28" x2="114" y2="52" stroke="#10b981" strokeWidth="1"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
          {/* Bottom Left -> Center */}
          <motion.line x1="60" y1="92" x2="86" y2="68" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 2"
            animate={{ strokeDashoffset: [20, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
        </svg>
      </div>

      {/* Footer Activity Logs */}
      <div className="border-t border-slate-800/70 pt-2 mt-2 shrink-0 flex items-center justify-between text-[8px] text-slate-500">
        <span className="font-bold text-brand-gold uppercase truncate max-w-[180px]">UPDATE // {dataActivity}</span>
        <span className="text-slate-400 font-bold">100% SYNC</span>
      </div>
    </div>
  );
}

// ─── 4. COGNITIVE AI ASSISTANT SHOWCASE ───
function AiAssistantShowcase() {
  const [queryState, setQueryState] = useState<string>("ASK: What is the loan credit check margin?");
  const [status, setStatus] = useState<"query" | "retrieving" | "answering">("query");

  useEffect(() => {
    const cycle = () => {
      setStatus("query");
      setQueryState("ASKING: 'Is compliance check mandatory for credit v1.5?'");
      
      setTimeout(() => {
        setStatus("retrieving");
        setQueryState("RETRIEVING: Scanning internal PDF compliance files...");
      }, 1600);

      setTimeout(() => {
        setStatus("answering");
        setQueryState("RESOLVED: Yes, compliance checkpoint v1.5 requires AXION cognitive audit.");
      }, 3400);
    };

    cycle();
    const interval = setInterval(cycle, 5600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 font-mono text-[9px] text-slate-300 relative overflow-hidden select-none">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-bold text-slate-400 tracking-wider">AXION-COGNITIVE-RAG-v3.5</span>
        </div>
        <div className="font-bold text-slate-500">LATENCY: 1.5s</div>
      </div>

      {/* Interactive Visual Search Representation */}
      <div className="flex-grow flex flex-col justify-center space-y-3">
        {/* Input Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded p-2 text-[8px] text-slate-300 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-bold leading-normal truncate">{queryState}</span>
        </div>

        {/* Vector DB Nodes matching retrieved matches */}
        <div className="flex items-center justify-between px-2">
          {[
            { id: 1, text: "Sovereign Link", active: status === "retrieving" },
            { id: 2, text: "Compliance Policy v5", active: status === "answering" || status === "retrieving" },
            { id: 3, text: "Credit Guidelines", active: status === "answering" }
          ].map((node) => (
            <div 
              key={node.id}
              className={`p-1.5 rounded text-[7px] text-center border transition-all duration-300 ${
                node.active 
                  ? "bg-brand-blue/20 border-brand-blue text-brand-blue-glow glow-blue-sm font-boldScale" 
                  : "bg-slate-950 border-slate-900 text-slate-600"
              }`}
            >
              NODE {node.id}
            </div>
          ))}
        </div>

        {/* Action log message */}
        <div className="text-[7px] text-slate-500 flex justify-between">
          <span>COGNITIVE CACHE HIT</span>
          <span className="font-bold text-emerald-400">99.8% RECALL ACCURACY</span>
        </div>
      </div>

      {/* Footer status link */}
      <div className="border-t border-slate-800/70 pt-2 mt-1 shrink-0 flex items-center justify-between text-[8px] text-slate-500">
        <span className="font-bold">DATABASE CONNECTIVITY: STABLE</span>
        <span className="text-brand-gold font-bold flex items-center gap-0.5"><CheckCircle2 className="w-2.5 h-2.5 text-brand-gold" /> ACCREDITED AI ENGINE</span>
      </div>
    </div>
  );
}

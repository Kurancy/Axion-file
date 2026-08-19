import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Shield, Radio, Activity, CheckCircle, AlertTriangle, ArrowRight, Server, FileText, BarChart3, Archive } from "lucide-react";

export default function EnterpriseDashboard() {
  const [invoiceCount, setInvoiceCount] = useState(145028);
  const [warehouseStock, setWarehouseStock] = useState(82310);
  const [apiGatewayCalls, setApiGatewayCalls] = useState(2495810);
  const [activeNode, setActiveNode] = useState(0); // For active pipeline highlight
  const [sysLogs, setSysLogs] = useState<string[]>([]);

  // Telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setInvoiceCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
      setWarehouseStock((prev) => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3));
      setApiGatewayCalls((prev) => prev + Math.floor(Math.random() * 15) + 5);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Active step highlighter
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // System log simulation
  useEffect(() => {
    const logPool = [
      "AI_INVOICE_PROCESSED: IDP extracted $42,500 manifest. Confidence 99.8%",
      "WMS_STOCK_SCAN: Item #NBO-7798 allocated to Bin C-12, Nairobi Hub 2",
      "ERP_SAP_HANA_SYNC: Successfully reconciled ledger accounts in 450ms",
      "API_GATEWAY_AUTHENTICATED: Inbound token verified from Johannesburg VPC",
      "AI_DOCUMENT_OCR: Processing structured billing PDF. Metadata categorized.",
      "WMS_ROUTING_ALERT: Freight carrier routed to optimized border terminal",
      "SYSTEM_HEALTH: Master nodes operating at 12% memory usage"
    ];

    setSysLogs([
      "BOOT_SEQUENCE: Decision intelligence console activated.",
      "VPC_TUNNEL: Established secure multi-region enclaves.",
      logPool[0],
      logPool[1]
    ]);

    const interval = setInterval(() => {
      const newLog = logPool[Math.floor(Math.random() * logPool.length)];
      const timestamp = new Date().toLocaleTimeString();
      setSysLogs((prev) => {
        const next = [`[${timestamp}] ${newLog}`, ...prev];
        return next.slice(0, 5); // Keep last 5
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const pipelineSteps = [
    { title: "Physical Asset", desc: "Warehouse Scanner / Factory Floor", icon: Archive },
    { title: "Axion Edge Gateway", desc: "Secure API Ingest Router", icon: Server },
    { title: "AI Cognitive IDP", desc: "Gemini Vision Parsing Core", icon: FileText },
    { title: "SAP / ERP Ledger", desc: "HANA Database Verification", icon: Shield },
    { title: "Decision Console", desc: "Executive Analytics Panel", icon: BarChart3 }
  ];

  return (
    <div id="decision-console" className="w-full bg-[#030712] border border-blue-900/30 rounded-xl p-6 md:p-8 text-gray-300 font-sans shadow-2xl relative overflow-hidden">
      {/* Absolute ambient grid/neon accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Console Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-blue-950 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="font-mono text-xs text-emerald-500 tracking-widest uppercase">System: Operational (Pan-African Grid)</span>
          </div>
          <h3 className="font-display font-semibold text-xl md:text-2xl text-white">
            Enterprise Decision Intelligence Console
          </h3>
          <p className="text-xs text-gray-500 mt-1 max-w-xl">
            Live process telemetry mapping active document parsing, ERP database synchronization, and multi-depot logistics.
          </p>
        </div>

        {/* Server Node Status Indicators */}
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0 font-mono text-[11px]">
          <div className="bg-blue-950/40 border border-blue-900/30 px-3 py-1.5 rounded flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-blue-400" />
            <span>NBO-1: <span className="text-emerald-400">99.9%</span></span>
          </div>
          <div className="bg-blue-950/40 border border-blue-900/30 px-3 py-1.5 rounded flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-blue-400" />
            <span>LOS-2: <span className="text-emerald-400">99.8%</span></span>
          </div>
          <div className="bg-blue-950/40 border border-blue-900/30 px-3 py-1.5 rounded flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-blue-400" />
            <span>JNB-1: <span className="text-emerald-400">100%</span></span>
          </div>
        </div>
      </div>

      {/* Grid of Telemetry Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Widget 1: AI Doc Processing */}
        <div className="bg-[#060b18] border border-blue-950 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Cognitive Processing</span>
            <span className="bg-blue-950 border border-blue-800 text-blue-400 font-mono text-[10px] px-2 py-0.5 rounded uppercase">Active</span>
          </div>
          <div className="text-3xl font-display font-bold text-white mb-1">
            {invoiceCount.toLocaleString()}
          </div>
          <p className="text-xs text-gray-400 mb-4">Invoices Analyzed (Automated)</p>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-500">Avg. Processing Velocity:</span>
              <span className="text-blue-400 font-semibold">1.2 seconds</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Extraction Confidence:</span>
              <span className="text-emerald-400 font-semibold">99.82%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">API Queue Load:</span>
              <span className="text-amber-500 font-semibold">0.4%</span>
            </div>
          </div>
        </div>

        {/* Widget 2: Warehouse Logistics Dispatch */}
        <div className="bg-[#060b18] border border-blue-950 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Multi-Hub Logistics</span>
            <span className="bg-blue-950 border border-blue-800 text-blue-400 font-mono text-[10px] px-2 py-0.5 rounded uppercase">Reconciled</span>
          </div>
          <div className="text-3xl font-display font-bold text-white mb-1">
            {warehouseStock.toLocaleString()}
          </div>
          <p className="text-xs text-gray-400 mb-4">Allocated Storage Bins (Active)</p>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-500">Current Picking Pace:</span>
              <span className="text-blue-400 font-semibold">185 items/hr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Discrepancy Alarm Status:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Nominal
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Border Manifest Pre-clear:</span>
              <span className="text-blue-400 font-semibold">Enabled</span>
            </div>
          </div>
        </div>

        {/* Widget 3: SAP ERP DB core Sync */}
        <div className="bg-[#060b18] border border-blue-950 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">SAP Database Core</span>
            <span className="bg-blue-950 border border-blue-800 text-blue-400 font-mono text-[10px] px-2 py-0.5 rounded uppercase">Synced</span>
          </div>
          <div className="text-3xl font-display font-bold text-white mb-1">
            {apiGatewayCalls.toLocaleString()}
          </div>
          <p className="text-xs text-gray-400 mb-4">API Operations Secure Transits</p>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-500">HANA Ledger Sync Delay:</span>
              <span className="text-blue-400 font-semibold">410ms (Realtime)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Gateway Encryption:</span>
              <span className="text-emerald-400 font-semibold">TLS 1.3 AES-256</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Operational Integrity:</span>
              <span className="text-emerald-400 font-semibold">100.0% Perfect</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Data Pipeline Flow Visualizer */}
      <div className="mb-8">
        <h4 className="font-display font-medium text-sm text-white mb-4 uppercase tracking-widest font-mono text-gray-400">
          Intelligent Data Flow Pipeline
        </h4>
        
        {/* Responsive Horizontal Stack on Desktop, Vertical on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            const isHighlight = idx === activeNode;
            return (
              <div key={idx} className="relative flex flex-col items-center">
                <motion.div
                  className={`w-full p-4 rounded-lg border text-center transition-all duration-300 ${
                    isHighlight
                      ? "bg-blue-950/70 border-gold-400/80 shadow-lg shadow-blue-500/10 scale-[1.03]"
                      : "bg-[#050914] border-blue-950"
                  }`}
                  animate={isHighlight ? { y: -2 } : { y: 0 }}
                >
                  <div className="flex justify-center mb-2">
                    <div className={`p-2 rounded-full ${isHighlight ? "bg-gold-500/20 text-gold-400" : "bg-blue-950 text-blue-400"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className={`text-xs font-mono font-bold ${isHighlight ? "text-gold-400" : "text-white"}`}>
                    {idx + 1}. {step.title}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">{step.desc}</div>
                </motion.div>

                {/* Arrow Connector on desktop */}
                {idx < 4 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-blue-900/60">
                    <ArrowRight className={`w-4 h-4 ${isHighlight ? "text-gold-400 animate-pulse" : ""}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SVG Performance Chart & Live Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Widget */}
        <div className="bg-[#050914] border border-blue-950 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display font-medium text-xs uppercase tracking-wider text-white font-mono">
              Process Automation Rate (Quarterly)
            </h4>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/20">Target Rate Exceeded</span>
          </div>

          {/* Simple Custom SVG Chart */}
          <div className="relative w-full h-44">
            <svg viewBox="0 0 400 160" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="380" y2="20" stroke="#0e1e3f" strokeWidth="0.5" strokeDasharray="4,4" />
              <line x1="40" y1="60" x2="380" y2="60" stroke="#0e1e3f" strokeWidth="0.5" strokeDasharray="4,4" />
              <line x1="40" y1="100" x2="380" y2="100" stroke="#0e1e3f" strokeWidth="0.5" strokeDasharray="4,4" />
              <line x1="40" y1="140" x2="380" y2="140" stroke="#0e1e3f" strokeWidth="1" />

              {/* Chart Labels Y-axis */}
              <text x="15" y="24" fill="#6b7280" fontSize="8" fontFamily="monospace">100%</text>
              <text x="15" y="64" fill="#6b7280" fontSize="8" fontFamily="monospace">80%</text>
              <text x="15" y="104" fill="#6b7280" fontSize="8" fontFamily="monospace">60%</text>
              <text x="15" y="144" fill="#6b7280" fontSize="8" fontFamily="monospace">0%</text>

              {/* SVG Area Fill */}
              <path
                d="M 40 140 L 40 90 L 110 50 L 180 35 L 250 25 L 320 22 L 380 21 L 380 140 Z"
                fill="url(#gradient)"
                opacity="0.15"
              />

              {/* Chart Curve */}
              <path
                d="M 40 90 Q 75 70 110 50 T 180 35 T 250 25 T 320 22 T 380 21"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data Node Dots */}
              <circle cx="40" cy="90" r="4" fill="#040814" stroke="#e2b042" strokeWidth="2" />
              <circle cx="110" cy="50" r="4" fill="#040814" stroke="#3b82f6" strokeWidth="2" />
              <circle cx="180" cy="35" r="4" fill="#040814" stroke="#3b82f6" strokeWidth="2" />
              <circle cx="250" cy="25" r="4" fill="#040814" stroke="#e2b042" strokeWidth="2" />
              <circle cx="320" cy="22" r="4" fill="#040814" stroke="#3b82f6" strokeWidth="2" />
              <circle cx="380" cy="21" r="4" fill="#040814" stroke="#3b82f6" strokeWidth="2" />

              {/* Labels X-axis */}
              <text x="40" y="154" fill="#6b7280" fontSize="8" textAnchor="middle" fontFamily="monospace">Q1-25</text>
              <text x="110" y="154" fill="#6b7280" fontSize="8" textAnchor="middle" fontFamily="monospace">Q2-25</text>
              <text x="180" y="154" fill="#6b7280" fontSize="8" textAnchor="middle" fontFamily="monospace">Q3-25</text>
              <text x="250" y="154" fill="#6b7280" fontSize="8" textAnchor="middle" fontFamily="monospace">Q4-25</text>
              <text x="320" y="154" fill="#6b7280" fontSize="8" textAnchor="middle" fontFamily="monospace">Q1-26</text>
              <text x="380" y="154" fill="#6b7280" fontSize="8" textAnchor="middle" fontFamily="monospace">LIVE</text>

              {/* Gradients Definitions */}
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Live Relational Sync Logs Monitor */}
        <div className="bg-[#050914] border border-blue-950 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display font-medium text-xs uppercase tracking-wider text-white font-mono">
                System Log Terminal (Reconciliation Ledger)
              </h4>
              <Activity className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            </div>

            {/* Logs stack */}
            <div className="space-y-2 h-28 overflow-y-auto pr-2 font-mono text-[10px] text-gray-400">
              {sysLogs.map((log, index) => (
                <div key={index} className="flex gap-2 border-b border-blue-950/40 pb-1 last:border-0 truncate">
                  <span className="text-blue-500 font-semibold">[SECURE]</span>
                  <span className="text-gray-300">{log}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-blue-950 pt-3 mt-4 flex items-center justify-between text-[10px] text-gray-500 font-mono">
            <span>DATABASE ENCRYPTION: active</span>
            <span className="text-blue-400 font-medium">AWS SA-EAST NODE 1 ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

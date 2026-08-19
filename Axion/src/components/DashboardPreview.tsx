import { useState, useEffect } from "react";
import { Play, Pause, RefreshCw, Cpu, Database, Package, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";

interface LogEntry {
  id: string;
  time: string;
  module: "AI" | "ERP" | "WMS" | "SEC";
  message: string;
  status: "success" | "pending" | "alert";
  latency: string;
}

export default function DashboardPreview({ isDarkMode }: { isDarkMode: boolean }) {
  const [isRunning, setIsRunning] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "ai" | "erp" | "wms">("overview");
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "log-1", time: "11:24:02", module: "AI", message: "IDP: OCR Invoice validation successful (Tax Ref ID #NG-490)", status: "success", latency: "2.1s" },
    { id: "log-2", time: "11:23:58", module: "ERP", message: "SAP: Account reconciliation auto-pushed to regional ledger", status: "success", latency: "0.8s" },
    { id: "log-3", time: "11:23:51", module: "WMS", message: "WMS: Optimum picking path updated for forklift zone C", status: "success", latency: "1.2s" },
    { id: "log-4", time: "11:23:40", module: "SEC", message: "SEC: Encrypted API authentication token rotate successful", status: "success", latency: "0.1s" },
    { id: "log-5", time: "11:23:12", module: "AI", message: "AI Agent: Dispatch advisory synthesized for Lagos depot", status: "success", latency: "4.5s" }
  ]);
  
  const [metrics, setMetrics] = useState({
    cpuUtilization: 38,
    activeAgents: 14,
    totalProcessed: 28405,
    systemIntegrity: 100,
    dailyTransactions: 4920
  });

  // Simulator initialization and loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const triggerRefresh = () => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  // Dynamic simulation loop for live statistics and logging feeds
  useEffect(() => {
    if (!isRunning || isLoading) return;

    const interval = setInterval(() => {
      // Rotate metrics within bounded ranges
      setMetrics(prev => ({
        ...prev,
        cpuUtilization: Math.floor(30 + Math.random() * 20),
        activeAgents: prev.activeAgents + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0),
        totalProcessed: prev.totalProcessed + 1,
        dailyTransactions: prev.dailyTransactions + 1
      }));

      // Randomly append new operational log entries
      if (Math.random() > 0.6) {
        const modules: Array<"AI" | "ERP" | "WMS" | "SEC"> = ["AI", "ERP", "WMS", "SEC"];
        const mod = modules[Math.floor(Math.random() * modules.length)];
        
        const messages = {
          AI: [
            "IDP: Cognitive scanner processed bill of lading (Mombasa Port)",
            "AI Agent: Local Swahili transcript translation completed",
            "Cognitive: Predicted warehouse safety congestion trigger avoided"
          ],
          ERP: [
            "SAP: Material stock ledger sync initiated",
            "ERP Consult: Profit analysis generated for executive board",
            "SAP Business One: Dispatch order generated"
          ],
          WMS: [
            "WMS: Automated barcode batch print job triggered",
            "WMS: Re-routing inventory due to dock door #4 load congestion",
            "Supply Chain: Logistics transit threshold warning resolved"
          ],
          SEC: [
            "SEC: Real-time fraud detection sweep completed (0 flagged)",
            "SEC: Database replica read state synchronized",
            "SEC: Multi-factor token rotation successful"
          ]
        };

        const randomMessage = messages[mod][Math.floor(Math.random() * messages[mod].length)];
        const stamp = new Date().toLocaleTimeString("en-US", { hour12: false });
        
        const newLog: LogEntry = {
          id: `log-${Date.now()}`,
          time: stamp,
          module: mod,
          message: randomMessage,
          status: Math.random() > 0.95 ? "alert" : "success",
          latency: `${(Math.random() * 3 + 0.2).toFixed(1)}s`
        };

        setLogs(prev => [newLog, ...prev.slice(0, 7)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isRunning, isLoading]);

  return (
    <div
      id="dashboard-telemetry-panel"
      className={`rounded-2xl border overflow-hidden shadow-2xl transition-all duration-300 ${
        isDarkMode
          ? "bg-slate-900 border-slate-800 text-slate-100"
          : "bg-white border-slate-200 text-slate-800"
      }`}
    >
      {/* Control Title Bar */}
      <div className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4 ${
        isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="relative w-3 h-3">
            <span className={`absolute inset-0 rounded-full bg-green-500 ${isRunning && !isLoading ? "animate-ping" : ""}`} />
            <span className={`relative block w-3 h-3 rounded-full ${isLoading ? "bg-amber-400" : "bg-green-500"}`} />
          </div>
          <span className="font-mono text-xs tracking-wider uppercase font-bold text-slate-400">
            {isLoading ? "Synchronizing Telemetry Backplane..." : "Synapse Operations Backplane Telemetry"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Active module buttons */}
          <div className={`p-1 rounded-lg flex text-xs font-mono border ${
            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
          }`}>
            {(["overview", "ai", "erp", "wms"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  if (!isLoading) {
                    setActiveTab(tab);
                    triggerRefresh();
                  }
                }}
                disabled={isLoading}
                className={`px-3 py-1.5 rounded-md capitalize transition-all ${
                  activeTab === tab
                    ? isDarkMode
                      ? "bg-slate-800 text-brand-blue-light font-bold"
                      : "bg-white text-brand-blue font-bold shadow-sm"
                    : "text-slate-400 hover:text-slate-200 disabled:opacity-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={triggerRefresh}
            disabled={isLoading}
            className={`p-2 rounded-lg border transition-colors ${
              isDarkMode
                ? "hover:bg-slate-800 border-slate-800 text-slate-300 disabled:text-slate-600"
                : "hover:bg-slate-100 border-slate-200 text-slate-700 disabled:text-slate-400"
            }`}
            title="Sync Telemetry Backplane"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-brand-gold" : ""}`} />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            disabled={isLoading}
            className={`p-2 rounded-lg border transition-colors ${
              isDarkMode
                ? "hover:bg-slate-800 border-slate-800 text-slate-300 disabled:opacity-50"
                : "hover:bg-slate-100 border-slate-200 text-slate-700 disabled:opacity-50"
            }`}
            title={isRunning ? "Pause Feed" : "Resume Live Feed"}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div id="dashboard-skeleton-container" className="p-6 space-y-6">
          {/* 4 Stat Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border flex items-center gap-4 ${
                  isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg shrink-0 ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                <div className="flex-1 space-y-2">
                  <div className={`h-2.5 w-1/2 rounded ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                  <div className={`h-5 w-3/4 rounded ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Columns Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column Skeleton */}
            <div className="lg:col-span-5 flex flex-col">
              <div className={`p-5 rounded-xl border flex-1 flex flex-col justify-between ${
                isDarkMode ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className={`h-3 w-1/3 rounded ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                    <div className={`h-2.5 w-12 rounded ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                  </div>
                  <div className={`h-5 w-3/4 rounded ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                  <div className={`h-3 w-5/6 rounded ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                </div>

                <div className="my-6 space-y-5">
                  {[1, 2, 3].map((bar) => (
                    <div key={bar} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className={`h-2.5 w-1/2 rounded ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                        <div className={`h-2.5 w-8 rounded ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                      </div>
                      <div className={`h-2 w-full rounded-full ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                    </div>
                  ))}
                </div>

                <div className={`p-3 rounded-lg flex items-center gap-3 ${isDarkMode ? "shimmer-dark" : "shimmer-light"} h-10`} />
              </div>
            </div>

            {/* Right Column Terminal Skeleton */}
            <div className="lg:col-span-7">
              <div className={`p-5 rounded-xl border h-full flex flex-col justify-between ${
                isDarkMode ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="flex justify-between items-center pb-3 border-b border-slate-800/50 mb-4">
                  <div className={`h-3 w-1/3 rounded ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                  <div className={`h-3 w-20 rounded ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                </div>

                <div className="space-y-3.5 flex-1">
                  {[1, 2, 3, 4, 5].map((row) => (
                    <div
                      key={row}
                      className={`p-2.5 rounded border flex items-center justify-between gap-4 ${
                        isDarkMode ? "bg-slate-900 border-slate-800/60" : "bg-white border-slate-100"
                      }`}
                    >
                      <div className={`h-2.5 w-12 rounded ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                      <div className={`h-3.5 w-8 rounded ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                      <div className={`h-2.5 flex-1 rounded ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                      <div className={`h-2.5 w-8 rounded ${isDarkMode ? "shimmer-dark" : "shimmer-light"}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Grid Content */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">

        
        {/* Core Statistic Counter #1 */}
        <div className={`p-4 rounded-xl border flex items-center gap-4 ${
          isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200"
        }`}>
          <div className="p-3 rounded-lg bg-brand-blue/10 text-brand-blue-light">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold block">Cognitive Nodes</span>
            <span className="text-2xl font-bold font-display tracking-tight text-white block">
              {metrics.activeAgents} <span className="text-xs text-green-400 font-mono font-normal">Active</span>
            </span>
          </div>
        </div>

        {/* Core Statistic Counter #2 */}
        <div className={`p-4 rounded-xl border flex items-center gap-4 ${
          isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200"
        }`}>
          <div className="p-3 rounded-lg bg-brand-gold/10 text-brand-gold">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold block">SAP Synced Items</span>
            <span className="text-2xl font-bold font-display tracking-tight text-white block">
              {metrics.totalProcessed.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Core Statistic Counter #3 */}
        <div className={`p-4 rounded-xl border flex items-center gap-4 ${
          isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200"
        }`}>
          <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold block">Daily Freight Batches</span>
            <span className="text-2xl font-bold font-display tracking-tight text-white block">
              {metrics.dailyTransactions.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Core Statistic Counter #4 */}
        <div className={`p-4 rounded-xl border flex items-center gap-4 ${
          isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200"
        }`}>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold block">Backplane Health</span>
            <span className="text-2xl font-bold font-display tracking-tight text-emerald-400 block">
              {metrics.systemIntegrity}% <span className="text-xs text-slate-400 font-mono font-normal">Secure</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Board Detail */}
      <div className="px-6 pb-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Grid: Visual Charts / Active Status of Modules */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className={`p-5 rounded-xl border flex-1 flex flex-col justify-between ${
            isDarkMode ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-200"
          }`}>
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">System Activity</span>
                <span className="text-xs text-slate-500">Live Load</span>
              </div>
              <h4 className="text-lg font-bold font-display text-white">Dynamic Central Processor Load</h4>
              <p className="text-xs text-slate-400 mt-1">Reflecting live cloud execution cycles across localized microservice clusters.</p>
            </div>

            {/* Simulated Live Bar Chart */}
            <div className="my-6 space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>AI Cognitive Inference Core</span>
                  <span>{metrics.cpuUtilization}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${metrics.cpuUtilization}%` }}
                    className="h-full bg-gradient-to-r from-brand-blue to-cyan-400 rounded-full transition-all duration-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>SAP Application Layer Integrator</span>
                  <span>45%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[45%] bg-brand-gold rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Sovereign Security Gateway</span>
                  <span>12%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[12%] bg-emerald-400 rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 bg-brand-blue/5 border border-brand-blue/15 p-3 rounded-lg">
              <Sparkles className="w-4 h-4 text-brand-gold animate-bounce" />
              <span>Synapse AI Engine currently processing under <b>2.4s SLA latency</b>.</span>
            </div>
          </div>
        </div>

        {/* Right Grid: Real-Time Event Logs Output Terminal */}
        <div className="lg:col-span-7">
          <div className={`p-5 rounded-xl border h-full flex flex-col ${
            isDarkMode ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-200"
          }`}>
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-800/50">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Live Transaction Telemetry Feed</span>
              <span className="text-xs font-mono text-green-400 bg-green-500/5 border border-green-500/10 px-2 py-0.5 rounded">
                STREAMING LIVE
              </span>
            </div>

            {/* Simulated Live Terminal Feed */}
            <div className="flex-1 overflow-y-auto space-y-3 font-mono text-xs max-h-[250px] pr-2">
              {logs.map((log) => {
                const isAlert = log.status === "alert";
                return (
                  <div
                    key={log.id}
                    className={`p-2.5 rounded border flex items-start gap-3 transition-all duration-300 ${
                      isAlert
                        ? "bg-red-500/5 border-red-500/20 text-red-200"
                        : isDarkMode
                        ? "bg-slate-900 border-slate-800/60 text-slate-300 hover:bg-slate-800"
                        : "bg-white border-slate-100 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-slate-500 whitespace-nowrap">{log.time}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      log.module === "AI" ? "bg-brand-blue/10 text-brand-blue-light" :
                      log.module === "ERP" ? "bg-brand-gold/10 text-brand-gold" :
                      log.module === "WMS" ? "bg-cyan-500/10 text-cyan-400" :
                      "bg-emerald-500/10 text-emerald-400"
                    }`}>
                      {log.module}
                    </span>
                    <span className="flex-1 leading-relaxed text-left text-white">{log.message}</span>
                    <span className="text-[10px] text-slate-500">{log.latency}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </>
    )}
    </div>
  );
}

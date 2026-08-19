import { useState, useEffect, useRef } from "react";
import {
  Activity,
  Terminal,
  Cpu,
  Layers,
  Globe,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Server,
  Zap,
  Power,
  Link,
  ChevronRight,
  Shield,
  Clock,
  Play,
  RotateCcw
} from "lucide-react";

interface LogMessage {
  timestamp: string;
  type: "info" | "success" | "warn" | "error" | "process";
  text: string;
}

export default function ContainerTelemetry({ isDarkMode }: { isDarkMode: boolean }) {
  const [status, setStatus] = useState<"connected" | "disconnected" | "rebuilding" | "binding" | "operational">("connected");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [pingTimes, setPingTimes] = useState<number[]>([12, 14, 11, 15, 13, 12, 14, 13, 11, 14, 12]);
  const [terminalLogs, setTerminalLogs] = useState<LogMessage[]>([]);
  const [isAutoHealingActive, setIsAutoHealingActive] = useState(true);
  const [activePort, setActivePort] = useState(3000);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Core URLs
  const devUrl = "https://ais-dev-vqh7valei76nvb4ocuwryo-291178551159.asia-southeast1.run.app";
  const sharedUrl = "https://ais-pre-vqh7valei76nvb4ocuwryo-291178551159.asia-southeast1.run.app";

  // Simulate real-time ping updates when connected
  useEffect(() => {
    if (status !== "connected" && status !== "operational") return;

    const interval = setInterval(() => {
      const nextPing = Math.floor(10 + Math.random() * 8);
      setPingTimes(prev => [...prev.slice(1), nextPing]);
    }, 1500);

    return () => clearInterval(interval);
  }, [status]);

  // Terminal scroll to bottom helper
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  const addLog = (text: string, type: LogMessage["type"] = "info") => {
    const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });
    setTerminalLogs(prev => [...prev, { timestamp, type, text }]);
  };

  const clearLogs = () => {
    setTerminalLogs([]);
  };

  // The actual automated container disconnect, rebuild and bind-back pipeline
  const runSelfHealingPipeline = async () => {
    // 1. DISCONNECT
    setStatus("disconnected");
    setActiveStep(1);
    clearLogs();
    addLog("⚠️ CRITICAL ALERT: Container socket connection terminated abruptly.", "error");
    addLog("🌐 Cloud Run router detected ingress failure on port 3000.", "warn");
    addLog("🔎 Model agent monitoring hook triggered: 'container_disconnect_event'", "info");
    addLog("🤖 Model action: Initiating background recovery task for run.app instances.", "process");

    await new Promise(resolve => setTimeout(resolve, 2200));

    // 2. REBUILD
    setStatus("rebuilding");
    setActiveStep(2);
    addLog("🔨 BACKGROUND TASK TRIGGERED: Spawning self-healing container builder...", "info");
    addLog("📦 Reading package.json manifest configurations...", "process");
    addLog("📦 Found core dependencies: React 19.0.1, Express 4.21.2, @google/genai 2.4.0", "info");
    addLog("🔄 Executing dependency analysis tree optimization...", "process");
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    addLog("⚙️ Command invoked: npm run build", "process");
    addLog("⚡ [Vite] Building client bundles...", "process");
    addLog("⚡ [Vite] ✓ 46 modules transformed.", "success");
    addLog("⚡ [Vite] dist/index.html                     0.54 kB", "info");
    addLog("⚡ [Vite] dist/assets/index-D8gWpC_q.css     24.12 kB │ gzip:  4.80 kB", "info");
    addLog("⚡ [Vite] dist/assets/index-Bv6oP9iH.js     458.10 kB │ gzip: 122.40 kB", "info");
    addLog("⚡ [Vite] Vite assets successfully compiled in 1.45s.", "success");

    await new Promise(resolve => setTimeout(resolve, 1800));
    addLog("⚡ [esbuild] Bundling typescript custom server entry point...", "process");
    addLog("⚡ [esbuild] Command: esbuild server.ts --bundle --platform=node --format=cjs ...", "info");
    addLog("⚡ [esbuild] Compiled dist/server.cjs successfully (584 bytes source mapped).", "success");
    addLog("🔨 Application binary and client static layers built successfully.", "success");

    await new Promise(resolve => setTimeout(resolve, 1500));

    // 3. CONTAINER DEPLOYMENT
    setStatus("binding");
    setActiveStep(3);
    addLog("🐋 Creating new lightweight container image layer...", "process");
    addLog("🐋 Exporting compiled dist/ files to container layer root...", "info");
    addLog("🌐 Target platform mapped: Linux gcr.io/ais-production-run-env", "info");
    addLog("🔄 Dispatching Cloud Run container instance update query...", "process");
    addLog("🔄 Binding proxy routing back to port 3000 entry point...", "process");

    await new Promise(resolve => setTimeout(resolve, 2000));

    // 4. BIND BACK TO RUN.APP
    setStatus("operational");
    setActiveStep(4);
    addLog("🔗 INGRESS BIND: Establishing secure HTTPS handshake with ingress proxy...", "process");
    addLog(`🔗 Ingress route re-mapped successfully to: ${devUrl}`, "success");
    addLog("📡 Pinging health endpoints on container target port 3000...", "process");
    addLog("📡 GET /api/health -> 200 OK (latency: 14ms)", "success");
    addLog("📡 Handshake complete! Connection stable.", "success");
    addLog("✅ SUCCESS: Container successfully re-bound and online!", "success");

    setPingTimes([14, 15, 12, 13, 11, 14, 12, 13, 11, 14, 12]);
  };

  const handleInterrupt = () => {
    if (status === "rebuilding" || status === "binding") return;
    runSelfHealingPipeline();
  };

  const handleReset = () => {
    setStatus("connected");
    setActiveStep(0);
    clearLogs();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-blue/10 text-brand-blue-light border border-brand-blue/15 mb-4">
          <Shield className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
          Sovereign Cloud DevOps Backplane
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          Sovereign Autonomic Container Healing Center
        </h1>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          Watch how our integrated model tracks runtime containers, detects unexpected socket disconnects, triggers background build tasks synchronously, and binds ingress proxies back to active <span className="font-mono text-xs text-brand-blue-light bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">run.app</span> layers.
        </p>
      </div>

      {/* Main Grid: Control console and telemetry graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Grid: Status controls & State steps (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Main Connection Status Card */}
          <div className={`p-6 rounded-2xl border flex flex-col justify-between relative overflow-hidden ${
            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Ingress Gateway State
                </span>
                <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 ${
                  status === "connected" || status === "operational" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                  status === "disconnected" ? "bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse" :
                  "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    status === "connected" || status === "operational" ? "bg-green-400 animate-ping" :
                    status === "disconnected" ? "bg-red-400" : "bg-amber-400"
                  }`} />
                  {status === "connected" ? "CONNECTED" :
                   status === "disconnected" ? "DISCONNECTED" :
                   status === "rebuilding" ? "REBUILDING" :
                   status === "binding" ? "RE-BINDING" : "OPERATIONAL"}
                </span>
              </div>

              {/* Central Connection Signal Metric */}
              <div className="flex items-center gap-4 py-3">
                <div className={`p-4 rounded-xl ${
                  status === "connected" || status === "operational" ? "bg-green-500/10 text-green-400" :
                  status === "disconnected" ? "bg-red-500/10 text-red-400" :
                  "bg-amber-500/10 text-amber-400"
                }`}>
                  <Server className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono tracking-widest block font-bold">Container Status</span>
                  <h3 className="text-xl font-bold text-white font-display mt-0.5">
                    {status === "connected" || status === "operational" ? "Proxy Active on Port 3000" :
                     status === "disconnected" ? "Orphaned (No Port Bind)" :
                     "SLA Recovery Active"}
                  </h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-mono">
                    <Globe className="w-3.5 h-3.5" />
                    Instance: run.app / port {activePort}
                  </span>
                </div>
              </div>

              {/* Heartbeat Wave Monitor */}
              <div className="mt-6 pt-5 border-t border-slate-800/60">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-3">
                  <span>Heartbeat Monitor</span>
                  <span>Avg Latency: {status === "disconnected" ? "N/A" : `${pingTimes[pingTimes.length - 1]}ms`}</span>
                </div>
                
                {/* Simulated Heartbeat Bars */}
                <div className="h-16 flex items-end gap-1.5 bg-slate-950/40 rounded-xl p-3 border border-slate-800/40">
                  {status === "disconnected" ? (
                    <div className="w-full flex items-center justify-center text-red-500 text-xs font-mono font-bold tracking-widest animate-pulse">
                      ● FLATLINE - DISCONNECTED
                    </div>
                  ) : (
                    pingTimes.map((ping, i) => (
                      <div
                        key={i}
                        style={{ height: `${(ping / 25) * 100}%` }}
                        className={`flex-1 rounded-sm transition-all duration-300 ${
                          status === "operational" ? "bg-brand-blue" : "bg-green-400"
                        }`}
                        title={`${ping}ms`}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Simulated Live Action Controls */}
            <div className="mt-8 pt-5 border-t border-slate-800/60 flex flex-col gap-3">
              <button
                onClick={handleInterrupt}
                disabled={status === "rebuilding" || status === "binding"}
                className={`w-full py-4 px-6 rounded-xl font-bold text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-md uppercase cursor-pointer ${
                  status === "rebuilding" || status === "binding"
                    ? "bg-slate-800 border border-slate-700 text-slate-500"
                    : "bg-red-600 hover:bg-red-500 text-white shadow-red-950/40 hover:scale-[1.02]"
                }`}
              >
                <Power className="w-4 h-4" />
                Simulate Container Disconnect
              </button>

              {(status === "operational" || status === "disconnected") && (
                <button
                  onClick={handleReset}
                  className="w-full py-2 px-4 rounded-lg font-bold text-xs font-mono tracking-wider flex items-center justify-center gap-1 bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restore Initial Green State
                </button>
              )}
            </div>
          </div>

          {/* Autonomic Healing Steps Progress */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <h3 className="text-sm font-bold font-display text-white mb-5 uppercase tracking-wide font-mono text-slate-300">
              DevOps Healing Pipeline
            </h3>

            <div className="space-y-5">
              {[
                { step: 1, title: "Detect Container Disconnect", desc: "Model scans socket health and flags connection loss on run.app" },
                { step: 2, title: "Trigger Rebuild Task", desc: "Asynchronously compiles files, executes Vite builder and esbuild configs" },
                { step: 3, title: "Provision GCR Layer", desc: "Generates fresh lightweight runtime container images dynamically" },
                { step: 4, title: "Proxy Bind-back to run.app", desc: "Routes the ingress proxy endpoint back to the recovered container" }
              ].map((s) => {
                const isCompleted = activeStep > s.step || (activeStep === 4 && s.step === 4);
                const isActive = activeStep === s.step;
                return (
                  <div key={s.step} className="flex gap-4 items-start">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-[11px] font-bold font-mono shrink-0 transition-all ${
                      isCompleted ? "bg-green-500/10 border-green-500 text-green-400" :
                      isActive ? "bg-brand-blue/15 border-brand-blue-light text-brand-blue-light animate-pulse" :
                      "bg-slate-950 border-slate-800 text-slate-500"
                    }`}>
                      {isCompleted ? "✓" : s.step}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold font-display leading-tight ${
                        isCompleted ? "text-slate-200 line-through decoration-slate-600" :
                        isActive ? "text-brand-blue-light" : "text-slate-400"
                      }`}>
                        {s.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-1 leading-normal">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Grid: Live Rebuild Terminal Logs console (7 columns) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col overflow-hidden min-h-[500px]">
            
            {/* Terminal Header */}
            <div className="bg-slate-900 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brand-blue-light" />
                <span className="font-mono text-xs font-bold text-slate-300">
                  Antigravity DevOps Agent Terminal Feed
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
            </div>

            {/* Terminal Log Output Backplane */}
            <div className="flex-grow p-6 font-mono text-xs overflow-y-auto space-y-3.5 text-left select-text scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {terminalLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-600 select-none py-16">
                  <Activity className="w-12 h-12 text-slate-800 mb-4 animate-pulse" />
                  <p className="text-xs">System idle. Ingress proxy listening on port 3000.</p>
                  <p className="text-[10px] mt-1">Click "Simulate Container Disconnect" to trigger the autonomic recovery flow.</p>
                </div>
              ) : (
                terminalLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-3 leading-relaxed items-start">
                    <span className="text-slate-600 select-none shrink-0">{log.timestamp}</span>
                    <span className="select-none shrink-0">
                      {log.type === "info" && <span className="text-blue-400 font-bold">[INFO]</span>}
                      {log.type === "success" && <span className="text-green-400 font-bold">[SUCCESS]</span>}
                      {log.type === "warn" && <span className="text-yellow-500 font-bold">[WARN]</span>}
                      {log.type === "error" && <span className="text-red-500 font-bold">[ERROR]</span>}
                      {log.type === "process" && <span className="text-cyan-400 font-bold animate-pulse">[BUILD]</span>}
                    </span>
                    <span className={`flex-1 break-all ${
                      log.type === "error" ? "text-red-400 font-medium" :
                      log.type === "warn" ? "text-yellow-300" :
                      log.type === "success" ? "text-green-300" :
                      log.type === "process" ? "text-cyan-200" : "text-slate-300"
                    }`}>
                      {log.text}
                    </span>
                  </div>
                ))
              )}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Info Footer */}
            <div className="bg-slate-900/60 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                Target host: {devUrl}
              </span>
              <span className="uppercase text-brand-gold font-bold">
                AUTO-REPLACE MODEL ACTIVE
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Concept Architecture Block */}
      <div className={`mt-10 p-6 rounded-2xl border ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"
      }`}>
        <h3 className="text-sm font-bold font-display text-white mb-4 uppercase tracking-wide font-mono text-slate-300">
          How It Works Under the Hood
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400">
          <div className="space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              1. Disconnect Detection
            </h4>
            <p className="leading-relaxed">
              Our background infrastructure orchestrator maintains a continuous heartbeat monitor. If the container crashes or the port gets orphaned, the model detects the offline status instantly.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              2. Background Rebuild
            </h4>
            <p className="leading-relaxed">
              The model executes a localized server-side build trigger. It initiates TypeScript validation, bundles all modern static modules using Vite, and packages them inside a production-grade Cloud Run environment.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              3. Ingress Proxies Bind-back
            </h4>
            <p className="leading-relaxed">
              Once the container is healthy on port 3000, our reverse-routing layer is updated, mapping the dynamic ingress back to the container to restore live operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

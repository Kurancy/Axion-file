import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Cpu,
  Database,
  Package,
  Code,
  BarChart3,
  Layers,
  CheckCircle2,
  Workflow,
  Network,
  Server,
  LineChart,
  FileText,
  Terminal,
  ArrowRight,
  Shield,
  Activity,
  Zap
} from "lucide-react";

interface SolutionsShowcaseProps {
  isDarkMode: boolean;
  setActivePage: (page: string) => void;
}

export default function SolutionsShowcase({ isDarkMode, setActivePage }: SolutionsShowcaseProps) {
  // Telemetry simulators
  const [telemetry, setTelemetry] = useState({
    aiProcessingSpeed: 87.5,
    aiInvoicesQueued: 4,
    aiAccuracy: 99.98,
    sapSyncCount: 14209,
    sapLag: 24,
    wmsPayload: 92,
    wmsPickerSpeed: 4.8,
    secUptime: 99.998,
    secThroughput: 8432,
    biMargin: 22.4,
    biPredictions: 1204,
    transPercent: 78.4,
    transMigrationSpeed: 1.2
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry((prev) => ({
        aiProcessingSpeed: +(85 + Math.random() * 5).toFixed(1),
        aiInvoicesQueued: Math.floor(Math.random() * 8),
        aiAccuracy: +(99.95 + Math.random() * 0.04).toFixed(3),
        sapSyncCount: prev.sapSyncCount + Math.floor(Math.random() * 3),
        sapLag: Math.floor(20 + Math.random() * 10),
        wmsPayload: Math.floor(88 + Math.random() * 8),
        wmsPickerSpeed: +(4.5 + Math.random() * 0.6).toFixed(1),
        secUptime: +(99.997 + Math.random() * 0.002).toFixed(4),
        secThroughput: prev.secThroughput + Math.floor(Math.random() * 15) - 7,
        biMargin: +(22.1 + Math.random() * 0.6).toFixed(1),
        biPredictions: prev.biPredictions + (Math.random() > 0.5 ? 1 : 0),
        transPercent: prev.transPercent + (prev.transPercent < 99 ? 0.05 : -10),
        transMigrationSpeed: +(1.0 + Math.random() * 0.4).toFixed(2)
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const solutions = [
    {
      id: "ai-automation",
      title: "Enterprise AI & Intelligent Agents",
      eyebrow: "Cognitive Processing Hub",
      description:
        "Orchestrate intelligent document processing (IDP) pipelines, agentic workflows, and self-improving robotic process loops. Configured to automatically ingest, read, classify, and audit corporate document flows directly into target transaction layers.",
      icon: Cpu,
      metrics: [
        { label: "Document Accuracy", value: `${telemetry.aiAccuracy}%` },
        { label: "Average Extraction Speed", value: "2.4 seconds" },
        { label: "Processing Speedup", value: "10x Multiplier" }
      ],
      outcomes: [
        "90% reduction in document audit lag",
        "Autonomous matching for three-way cross-referencing",
        "Deep multi-lingual invoice field classification"
      ],
      techStack: ["CoreOCR", "PyTorch", "Kubernetes", "gRPC", "FastAPI"],
      diagram: ["Document Feed", "Agentic OCR Layer", "Validating Engine", "System Ledgers"],
      bgText: "COGNITIVE MODEL INFERENCE ENGINE V3.5",
      livePanel: (
        <div className="w-full h-full font-mono text-[11px] text-slate-300 flex flex-col justify-between p-5 bg-slate-950/80 rounded-2xl border border-blue-500/20 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 flex gap-1.5 items-center">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider">Telemetry Live</span>
          </div>

          <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span className="font-bold text-slate-100 uppercase tracking-widest text-[10px]">AI Pipeline Monitor</span>
          </div>

          <div className="space-y-3.5 my-4">
            <div className="flex justify-between items-center bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/40">
              <span className="text-slate-400">Classifier Influx:</span>
              <span className="text-blue-300 font-bold">{telemetry.aiProcessingSpeed} docs/min</span>
            </div>
            <div className="flex justify-between items-center bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/40">
              <span className="text-slate-400">Active Queue Size:</span>
              <span className="text-amber-400 font-bold">{telemetry.aiInvoicesQueued} pending</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-widest">
                <span>Ingestion Confidence Threshold:</span>
                <span className="text-emerald-400">92%</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full"
                  animate={{ width: "92%" }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-3">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2 font-bold">System Log Stream:</span>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-[10px] h-24 overflow-y-auto space-y-1 text-slate-400 leading-relaxed scrollbar-thin">
              <div className="flex items-center gap-2"><span className="text-emerald-400">SUCCESS</span><span>doc_39402: Ingested (Invoice audit aligned)</span></div>
              <div className="flex items-center gap-2"><span className="text-emerald-400">SUCCESS</span><span>doc_39403: Extracted metadata with 99.98% conf</span></div>
              <div className="flex items-center gap-2"><span className="text-blue-400">PENDING</span><span>doc_39404: Running multi-agent ledger validation...</span></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "erp-sap-systems",
      title: "ERP & SAP Unified Integrations",
      eyebrow: "Enterprise Ledger Gateway",
      description:
        "Orchestrate transactional alignment across multi-regional subsidiaries. Map physical stock and financial bookkeeping to standard SAP Business One and Oracle Cloud nodes, eliminating manual reconciliation overhead entirely.",
      icon: Database,
      metrics: [
        { label: "Sync Core Accuracy", value: "100.0%" },
        { label: "Pipeline Latency", value: `${telemetry.sapLag}ms` },
        { label: "Total Synced Packets", value: telemetry.sapSyncCount.toLocaleString() }
      ],
      outcomes: [
        "Elimination of manual accounting entry matching",
        "Direct connection gateways to tax authorities (FIRS/KRA)",
        "Automated bulk account reconciliations"
      ],
      techStack: ["SAP SDK", "Oracle DB", "Kafka", "Java Spring Boot", "Apache Camel"],
      diagram: ["Database Feeders", "Unified REST Core", "Axion middleware", "Oracle/SAP ERP"],
      bgText: "LEDGER SYNCHRONIZATION PIPELINE V2.1",
      livePanel: (
        <div className="w-full h-full font-mono text-[11px] text-slate-300 flex flex-col justify-between p-5 bg-slate-950/80 rounded-2xl border border-amber-500/20 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 flex gap-1.5 items-center">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">Sync Active</span>
          </div>

          <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
            <Server className="w-4 h-4 text-amber-500" />
            <span className="font-bold text-slate-100 uppercase tracking-widest text-[10px]">ERP Integration Broker</span>
          </div>

          <div className="space-y-4 my-4">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>API Connection Latency:</span>
                <span className="text-amber-400 font-bold">{telemetry.sapLag} ms</span>
              </div>
              <div className="flex gap-1 h-10 items-end">
                {[42, 38, 55, 30, 24, telemetry.sapLag - 5, telemetry.sapLag, telemetry.sapLag + 3].map((val, idx) => (
                  <motion.div
                    key={idx}
                    className="flex-1 bg-amber-500/35 border border-amber-500/50 rounded-sm"
                    animate={{ height: `${(val / 60) * 100}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/60 p-2 border border-slate-800/40 rounded-lg text-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Broker State</span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase mt-1 block">Operational</span>
              </div>
              <div className="bg-slate-900/60 p-2 border border-slate-800/40 rounded-lg text-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Fail Safe mode</span>
                <span className="text-[10px] text-blue-400 font-bold uppercase mt-1 block">Active</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-3">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2 font-bold">Ledger Transactions:</span>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 space-y-1.5 text-[9px] text-slate-400">
              <div className="flex justify-between">
                <span>TX_1048_SYNC: ERP Account balanced</span>
                <span className="text-emerald-400">OK</span>
              </div>
              <div className="flex justify-between">
                <span>TX_1049_WRITE: Inventory batch updated</span>
                <span className="text-emerald-400">OK</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "warehouse-management",
      title: "Logistics & Warehouse Management",
      eyebrow: "Cognitive Supply Chains",
      description:
        "Trace stock levels, distribution lanes, and storage optimization matrices. Seamlessly links handheld barcode readers, RFID scanners, and spatial sensor networks to a responsive local control center.",
      icon: Package,
      metrics: [
        { label: "Fulfillment Accuracy", value: "99.96%" },
        { label: "Stock lookup", value: "Under 10s" },
        { label: "Transit Time Slashed", value: "36 hrs" }
      ],
      outcomes: [
        "Virtual duplicate warehouse models to optimize pick lines",
        "Integrated dynamic threshold replenishment systems",
        "Automated customs audit documentation generation"
      ],
      techStack: ["NodeJS", "GraphQL", "MQTT", "PostgreSQL", "React Native"],
      diagram: ["Physical Ingress", "Edge RFID Gateways", "Central WMS Server", "API integrations"],
      bgText: "LOGISTICS ARCHITECTURE HUB WMS",
      livePanel: (
        <div className="w-full h-full font-mono text-[11px] text-slate-300 flex flex-col justify-between p-5 bg-slate-950/80 rounded-2xl border border-emerald-500/20 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 flex gap-1.5 items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Gateways Active</span>
          </div>

          <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
            <Network className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-100 uppercase tracking-widest text-[10px]">WMS Node Diagnostics</span>
          </div>

          <div className="my-4 space-y-3">
            <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg border border-slate-800/40">
              <span className="text-slate-400 text-[10px]">Inventory Flow Rate:</span>
              <span className="text-emerald-400 font-bold">{telemetry.wmsPayload} units/hr</span>
            </div>

            <div>
              <span className="text-[9px] text-slate-400 uppercase tracking-widest block mb-1">Storage Utilization Heatmap:</span>
              <div className="grid grid-cols-6 gap-1 p-2 bg-slate-950 rounded-lg border border-slate-900/80">
                {[...Array(12)].map((_, idx) => (
                  <motion.div
                    key={idx}
                    className={`h-4 rounded-sm border ${
                      idx % 3 === 0
                        ? "bg-emerald-500/80 border-emerald-400/50"
                        : idx % 4 === 0
                        ? "bg-amber-400/80 border-amber-300/50"
                        : "bg-slate-900 border-slate-800"
                    }`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 4, delay: idx * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px]">
            <span className="text-slate-400">Avg picker velocity:</span>
            <span className="text-emerald-400 font-bold">{telemetry.wmsPickerSpeed} km/h</span>
          </div>
        </div>
      )
    },
    {
      id: "software-engineering",
      title: "Bespoke Enterprise Software",
      eyebrow: "Robust Custom Architectures",
      description:
        "High-performance transactional architectures built on secure distributed databases. Designed from the ground up for extreme concurrency, offline autonomy, and regional regulatory compliance.",
      icon: Code,
      metrics: [
        { label: "Assured Uptime", value: `${telemetry.secUptime}%` },
        { label: "Telemetry Load", value: `${telemetry.secThroughput} req/s` },
        { label: "Data Safety SLA", value: "Zero Leakage" }
      ],
      outcomes: [
        "Highly auditable microservices using military-grade security frameworks",
        "Robust offline-first databases sync algorithms",
        "Strict identity gateways preventing fraudulent transactions"
      ],
      techStack: ["Golang", "Docker", "Kubernetes", "gRPC", "Redis", "Postgres"],
      diagram: ["Client Gateway", "Kubernetes Mesh", "Redis Cache Layer", "PostgreSQL Clusters"],
      bgText: "DISTRIBUTED CLOUD MICROSERVICES MESH",
      livePanel: (
        <div className="w-full h-full font-mono text-[11px] text-slate-300 flex flex-col justify-between p-5 bg-slate-950/80 rounded-2xl border border-purple-500/20 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 flex gap-1.5 items-center">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            <span className="text-[9px] text-purple-400 font-bold uppercase tracking-wider">Secured</span>
          </div>

          <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="font-bold text-slate-100 uppercase tracking-widest text-[10px]">Gateway Protection System</span>
          </div>

          <div className="my-4 space-y-3.5">
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-slate-900/60 p-2.5 border border-slate-800/40 rounded-lg">
                <span className="text-[9px] text-slate-500 block">TLS Handshake</span>
                <span className="text-[10px] text-emerald-400 font-bold mt-1 block">ACTIVE (V1.3)</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 border border-slate-800/40 rounded-lg">
                <span className="text-[9px] text-slate-500 block">DDOS Filter</span>
                <span className="text-[10px] text-emerald-400 font-bold mt-1 block">ESTABLISHED</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>Ingress Data Rate:</span>
                <span className="text-purple-300 font-bold">{telemetry.secThroughput} req/s</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full"
                  animate={{ width: "84%" }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px]">
            <span className="text-slate-500">System Registry Status:</span>
            <span className="text-emerald-400 font-bold">COMPLIANT (ISO 27001)</span>
          </div>
        </div>
      )
    },
    {
      id: "business-intelligence",
      title: "Business Intelligence & BI",
      eyebrow: "Predictive Decision Engines",
      description:
        "Mine large-scale unstructured databases for operational insights. Present clean, granular telemetry to C-team members mapping regional margins, shipping timelines, and multi-currency processing.",
      icon: BarChart3,
      metrics: [
        { label: "Margin Optimization Target", value: `+${telemetry.biMargin}%` },
        { label: "Data Nodes Configured", value: telemetry.biPredictions.toLocaleString() },
        { label: "Query Resolution", value: "Sub-Second" }
      ],
      outcomes: [
        "Executive analytics dashboard updating in real-time",
        "Machine learning models forecasting cargo transport lags",
        "Single source of truth matching all regional logs"
      ],
      techStack: ["Snowflake", "DBT", "Python", "Airflow", "Recharts", "BigQuery"],
      diagram: ["Transactional Logs", "DBT Transformations", "Snowflake Analytics", "BI Dashboard"],
      bgText: "PREDICTIVE REALTIME ANALYTICAL FABRIC",
      livePanel: (
        <div className="w-full h-full font-mono text-[11px] text-slate-300 flex flex-col justify-between p-5 bg-slate-950/80 rounded-2xl border border-cyan-500/20 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 flex gap-1.5 items-center">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">Models Loaded</span>
          </div>

          <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
            <LineChart className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-100 uppercase tracking-widest text-[10px]">Business Analytics & BI</span>
          </div>

          <div className="my-4 space-y-4">
            <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/40">
              <span className="text-slate-400 text-[10px]">YoY Net Revenue Projection:</span>
              <span className="text-cyan-300 font-bold">+{telemetry.biMargin}%</span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Predictive Confidence Index:</span>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full"
                  animate={{ width: "94.6%" }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px]">
            <span className="text-slate-500">Active models processed:</span>
            <span className="text-cyan-400 font-bold">14 Deep Nets</span>
          </div>
        </div>
      )
    },
    {
      id: "digital-transformation",
      title: "Digital Transformation Consulting",
      eyebrow: "Enterprise Modernization Strategy",
      description:
        "Modernize legacy setups by replacing outdated on-prem systems, setting clear automation milestones, and ensuring rigorous compliance with international security standards like ISO 27001.",
      icon: Layers,
      metrics: [
        { label: "Audited Pipeline Systems", value: "48 Core Modules" },
        { label: "Audit Compliance Rate", value: "100.0%" },
        { label: "Security Realignment", value: "Completed" }
      ],
      outcomes: [
        "Milestones mapping organizational agility transitions",
        "Replacing legacy ledger nodes without runtime operational disruptions",
        "Executive staff realignment training modules"
      ],
      techStack: ["AWS Cloud", "Azure", "Terraform", "Security Audits", "ITILv4"],
      diagram: ["Friction Analysis", "Architecture Redesign", "Zero-lag Migration", "API Operations"],
      bgText: "ENTERPRISE TRANSFORMATION ROADMAP V1",
      livePanel: (
        <div className="w-full h-full font-mono text-[11px] text-slate-300 flex flex-col justify-between p-5 bg-slate-950/80 rounded-2xl border border-rose-500/20 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 flex gap-1.5 items-center">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-[9px] text-rose-400 font-bold uppercase tracking-wider">Migration Live</span>
          </div>

          <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
            <Activity className="w-4 h-4 text-rose-400" />
            <span className="font-bold text-slate-100 uppercase tracking-widest text-[10px]">Monolith Decommissioning</span>
          </div>

          <div className="my-4 space-y-4">
            <div>
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>Migration Progress:</span>
                <span className="text-rose-400 font-bold">{telemetry.transPercent.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="bg-gradient-to-r from-rose-500 to-amber-400 h-full"
                  style={{ width: `${telemetry.transPercent}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg border border-slate-800/40">
              <span className="text-slate-400 text-[10px]">Average Ingress Rate:</span>
              <span className="text-rose-300 font-bold">{telemetry.transMigrationSpeed} GB/s</span>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px]">
            <span className="text-slate-500">Sandbox state:</span>
            <span className="text-emerald-400 font-bold">CLEAN MIGRATION CORE</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div id="axion-solutions-showcase" className="relative space-y-24 py-12">
      {solutions.map((sol, index) => {
        const isListLeft = index % 2 === 0;

        return (
          <section
            key={sol.id}
            id={`solution-block-${sol.id}`}
            className="min-h-[75vh] flex items-center justify-center relative py-16 scroll-mt-20 border-b border-slate-900 last:border-0"
          >
            {/* Layered Lighting Effects / Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 transition-colors duration-500 ${
                  index % 3 === 0
                    ? "bg-blue-500 -left-64"
                    : index % 3 === 1
                    ? "bg-amber-500 -right-64"
                    : "bg-emerald-500 -left-64"
                }`}
              />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Visual Dashboard Block */}
                <div
                  className={`lg:col-span-6 w-full flex justify-center order-2 ${
                    isListLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative w-full max-w-lg aspect-[4/3] rounded-3xl p-4 bg-slate-900/30 border border-slate-800/80 shadow-2xl glassmorphism-panel group overflow-hidden"
                  >
                    {/* SVG Particle Connections Overlay background */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                        
                        {/* Animated connector path */}
                        <motion.path
                          d="M10,80 Q100,20 200,80 T380,10"
                          fill="none"
                          stroke={index % 3 === 0 ? "#3b82f6" : index % 3 === 1 ? "#f59e0b" : "#10b981"}
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          animate={{ strokeDashoffset: [0, -40] }}
                          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        />
                      </svg>
                    </div>

                    {/* Render Interactive Live Board */}
                    {sol.livePanel}

                    {/* Overlay Grid lines watermark */}
                    <div className="absolute bottom-2 right-4 text-[7px] font-mono text-slate-600 uppercase tracking-widest pointer-events-none select-none">
                      {sol.bgText}
                    </div>
                  </motion.div>
                </div>

                {/* Content Block */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center order-1 ${
                    isListLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isListLeft ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-[10px] font-bold font-mono tracking-widest uppercase text-blue-400 block mb-2">
                        {sol.eyebrow}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
                        {sol.title}
                      </h2>
                    </div>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {sol.description}
                    </p>

                    {/* Architecture diagram nodes preview: horizontal pill badges */}
                    <div className="bg-slate-950/40 p-4 border border-slate-900 rounded-2xl">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-3">
                        Deployment Architecture Path
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {sol.diagram.map((node, stepIdx) => (
                          <React.Fragment key={stepIdx}>
                            <span className="text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              {node}
                            </span>
                            {stepIdx < sol.diagram.length - 1 && (
                              <ArrowRight className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Real-time KPI Counters */}
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-3">
                        Dynamic Operations KPIs
                      </span>
                      <div className="grid grid-cols-3 gap-4">
                        {sol.metrics.map((met, keyIdx) => (
                          <div key={keyIdx} className="bg-slate-900/30 border border-slate-800/40 rounded-xl p-3.5 text-center">
                            <span className="text-base sm:text-lg font-extrabold text-blue-300 font-mono block">
                              {met.value}
                            </span>
                            <span className="text-[9.5px] text-slate-500 mt-1 block uppercase tracking-wider leading-tight">
                              {met.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Business Outcomes list */}
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2.5">
                        Strategic Outcomes Delivered
                      </span>
                      <ul className="space-y-2 text-xs">
                        {sol.outcomes.map((out, outIdx) => (
                          <li key={outIdx} className="flex items-start gap-2.5 text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{out}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technology Stack Badges */}
                    <div className="border-t border-slate-900 pt-5 mt-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase mr-1">Stack:</span>
                        {sol.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[9.5px] font-mono bg-blue-950/40 border border-blue-900/35 text-blue-300/80 px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Consultation Link */}
                    <div className="pt-2">
                      <button
                        onClick={() => setActivePage("consultation-hub")}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 cursor-pointer group"
                      >
                        <span>Configure Solution Sandbox</span>
                        <motion.span
                          className="inline-block"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </motion.span>
                      </button>
                    </div>
                  </motion.div>
                </div>

              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

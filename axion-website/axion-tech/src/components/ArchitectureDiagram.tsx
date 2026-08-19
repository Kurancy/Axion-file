import { useState } from "react";
import { ArrowRight, ChevronRight, CheckCircle2, Shield, Settings, Server, FileCode, Users } from "lucide-react";

interface Node {
  id: string;
  title: string;
  category: "Ingestion" | "Cognitive" | "Integration" | "Ledger";
  icon: string;
  desc: string;
  protocols: string[];
  latency: string;
  detailedAudit: string;
}

const architecturalNodes: Node[] = [
  {
    id: "step-1",
    title: "Inbound Ingestion Gateway",
    category: "Ingestion",
    icon: "Users",
    desc: "Captures multi-channel client document feeds, mobile warehouse inventory changes, or cross-border shipping manifests.",
    protocols: ["HTTPS REST API", "gRPC Pipelines", "Offline Sync Syncs"],
    latency: "< 25ms ingestion speed",
    detailedAudit: "Integrates specialized multi-channel input endpoints (including mobile barcode captures, legacy spreadsheet file transfers, and secure client SFTP file drop-off boxes) into a singular ingress system queue."
  },

  
  {
    id: "step-2",
    title: "Cognitive AI Processing Layer",
    category: "Cognitive",
    icon: "Settings",
    desc: "Decodes scanned sheets, extracts text values, matches regulatory rules, and filters transactional frauds.",
    protocols: ["Gemini Extraction Model", "IDP OCR Algorithms", "Cognitive Verification"],
    latency: "< 2.4s AI reasoning",
    detailedAudit: "Processes unstructured PDFs, handwritten slips, and low-res barcode images. Translates languages dynamically and executes business confidence checks to avoid ledger pollution."
  },
  {
    id: "step-3",
    title: "Secure Enterprise Connector Gateways",
    category: "Integration",
    icon: "Server",
    desc: "Normalizes validated transactions and formats payloads to execute native SAP and database sync operations.",
    protocols: ["SAP Business One Connectors", "Oracle NetSuite API", "OAuth 2.0 Gateways"],
    latency: "< 120ms sync latency",
    detailedAudit: "Acts as a secure enterprise bridge. Formats complex payloads to align with target relational schemas, preventing database lockout during peak traffic spikes."
  },
  {
    id: "step-4",
    title: "Sovereign Ledger & Core Databases",
    category: "Ledger",
    icon: "FileCode",
    desc: "Saves fully trace-compliant audit lines in robust, high-performance PostgreSQL or Cloud SQL databases.",
    protocols: ["PostgreSQL Replication", "Supabase Storage Core", "Encrypted Backups"],
    latency: "Under 1.5ms database write",
    detailedAudit: "Stores transactional records with full encryption-at-rest. Triggers instant real-time websocket pushes to client analytics control rooms."
  }
];

export default function ArchitectureDiagram({ isDarkMode }: { isDarkMode: boolean }) {
  const [activeNode, setActiveNode] = useState<Node>(architecturalNodes[1]); // Default to AI Layer

  return (
    <div
      id="enterprise-architecture-diagram"
      className={`rounded-2xl border p-6 overflow-hidden ${
        isDarkMode ? "bg-slate-900/45 border-slate-800/80" : "bg-slate-50 border-slate-200"
      }`}
    >
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        
        {/* Left Hand: Interactive Flow Pathway */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-6">
            <span className={`text-[10px] font-bold tracking-widest font-mono uppercase ${
              isDarkMode ? "text-brand-blue-light" : "text-brand-blue"
            }`}>
              Interactive Architecture Blueprints
            </span>
            <h3 className={`text-xl font-bold font-display mt-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              End-to-End Enterprise Automation Pipeline
            </h3>
            <p className={`text-sm mt-1 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Click on each step of the digital transformation pipeline below to inspect operational protocols.
            </p>
          </div>

          {/* Steps Horizontal/Vertical Flow */}
          <div className="space-y-4">
            {architecturalNodes.map((node, index) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div key={node.id} className="flex items-center gap-3">
                  {/* Step Button */}
                  <button
                    id={`architecture-node-${node.id}`}
                    onClick={() => setActiveNode(node)}
                    className={`flex-1 text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between gap-4 group cursor-pointer ${
                      isSelected
                        ? "bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/15 scale-[1.02]"
                        : isDarkMode
                        ? "bg-slate-950 border-slate-800/80 text-slate-300 hover:bg-slate-900"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Step Number Badge */}
                      <span className={`w-6 h-6 rounded-full text-xs font-bold font-mono flex items-center justify-center ${
                        isSelected
                          ? "bg-white text-brand-blue"
                          : "bg-slate-800 text-slate-400"
                      }`}>
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="font-semibold text-sm tracking-tight">{node.title}</h4>
                        <span className={`text-[10px] font-mono tracking-wider ${
                          isSelected ? "text-blue-100" : "text-slate-500"
                        }`}>
                          {node.category.toUpperCase()} STAGE
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold ${
                        isSelected ? "text-blue-200" : "text-green-400"
                      }`}>
                        {node.latency}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        isSelected ? "translate-x-1" : "group-hover:translate-x-0.5"
                      }`} />
                    </div>
                  </button>

                  {/* Flow Arrow (not on last step) */}
                  {index < architecturalNodes.length - 1 && (
                    <div className="hidden md:flex flex-col items-center justify-center">
                      <div className="h-4 w-[2px] bg-slate-800" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Hand: Inspection Telemetry terminal */}
        <div className="md:w-[350px] flex">
          <div
            className={`w-full rounded-xl border p-5 flex flex-col justify-between ${
              isDarkMode ? "bg-slate-950/80 border-slate-800" : "bg-white border-slate-200"
            }`}
          >
            <div>
              <div className="flex items-center gap-2 text-brand-gold mb-3">
                <Shield className="w-5 h-5" />
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold">
                  Stage Audit Log
                </span>
              </div>

              <h4 className={`text-base font-bold font-display ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                {activeNode.title}
              </h4>
              <p className={`text-xs mt-2.5 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                {activeNode.detailedAudit}
              </p>

              {/* Protocol Specs */}
              <div className="mt-5 border-t border-slate-800/40 pt-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono font-bold block mb-2">
                  System Protocol Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeNode.protocols.map((protocol) => (
                    <span
                      key={protocol}
                      className="text-[10px] font-semibold bg-brand-blue/10 text-brand-blue-light border border-brand-blue/15 px-2 py-0.5 rounded font-mono"
                    >
                      {protocol}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom SLA Confirmation */}
            <div className="mt-6 border-t border-slate-800/40 pt-4 flex items-center justify-between text-xs">
              <span className="text-slate-500">Security Standard:</span>
              <span className="font-semibold text-green-400 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                AES-256 TLS 1.3
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

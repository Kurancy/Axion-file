import { useState, useEffect } from "react";
import { MapPin, Globe, Activity, ShieldCheck } from "lucide-react";

interface Hub {
  id: string;
  name: string;
  region: string;
  country: string;
  role: string;
  established: string;
  coordinates: { x: number; y: number }; // Percentage coords on a relative container
  latency: string;
  activeContracts: number;
}

const hubsData: Hub[] = [
  {
    id: "lagos",
    name: "Synapse West Hub",
    region: "West Africa",
    country: "Nigeria (Lagos)",
    role: "AI & IDP Ingestion Systems Core",
    established: "2026",
    coordinates: { x: 38, y: 48 },
    latency: "12ms",
    activeContracts: 8,
  },
  {
    id: "nairobi",
    name: "Synapse East Hub",
    region: "East Africa",
    country: "Kenya (Nairobi)",
    role: "SAP Business One Integration Core",
    established: "2026",
    coordinates: { x: 67, y: 55 },
    latency: "8ms",
    activeContracts: 11,
  },
  {
    id: "jo_burg",
    name: "Synapse Southern Hub",
    region: "Southern Africa",
    country: "South Africa (Johannesburg)",
    role: "Cloud-Native WMS Systems",
    established: "2026",
    coordinates: { x: 55, y: 88 },
    latency: "15ms",
    activeContracts: 6,
  },
  {
    id: "abidjan",
    name: "Francophone Expansion Node",
    region: "West Africa (Francophone)",
    country: "Côte d'Ivoire (Abidjan)",
    role: "Digital Consulting & Strategy",
    established: "Strategic 2027",
    coordinates: { x: 26, y: 49 },
    latency: "24ms",
    activeContracts: 3,
  },
  {
    id: "kigali",
    name: "Innovation & Sandbox Lab",
    region: "East Africa (Central)",
    country: "Rwanda (Kigali)",
    role: "AI Agents & RAG Architecture Lab",
    established: "Upcoming 2027",
    coordinates: { x: 60, y: 58 },
    latency: "10ms",
    activeContracts: 4,
  }
];

export default function InteractiveMap({ isDarkMode }: { isDarkMode: boolean }) {
  const [selectedHub, setSelectedHub] = useState<Hub>(hubsData[1]); // Default to Nairobi
  const [activeSignal, setActiveSignal] = useState(0);

  // Periodic visual ping animation to simulate live satellite network data transfers
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSignal((prev) => (prev + 1) % hubsData.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="interactive-network-grid"
      className={`relative w-full rounded-2xl border overflow-hidden p-6 shadow-xl ${
        isDarkMode
          ? "bg-slate-900/60 border-slate-800/80"
          : "bg-slate-50/90 border-slate-200"
      }`}
    >
      {/* Background Grid Pattern Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 grid-bg-pulse" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Africa map canvas container */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="mb-4 text-center lg:text-left w-full">
            <h4 className={`text-xs font-bold tracking-widest uppercase font-mono flex items-center justify-center lg:justify-start gap-2 ${
              isDarkMode ? "text-brand-blue-light" : "text-brand-blue"
            }`}>
              <Globe className="w-4 h-4 animate-spin-slow" />
              Sovereign Grid Architecture
            </h4>
            <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Interactive telemetry mapping Synapse Core Integration nodes.
            </p>
          </div>

          {/* SVG Map Canvas Container */}
          <div className="relative w-full max-w-[360px] h-[380px] flex items-center justify-center">
            {/* Minimal SVG Path Outlines representing Africa */}
            <svg
              className={`w-full h-full object-contain ${
                isDarkMode ? "text-slate-800" : "text-slate-300"
              }`}
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Simplified high-density polygon representation of African Continent */}
              <path
                d="M 32,15 
                   C 36,12 45,10 52,11 
                   C 60,12 70,14 74,17 
                   C 76,18 81,21 82,23 
                   C 83,25 80,31 82,34 
                   C 84,36 86,37 87,41 
                   C 88,44 82,47 80,49 
                   C 79,50 78,52 78,54 
                   C 77,56 75,58 74,60 
                   C 72,62 70,64 69,67 
                   C 67,71 63,74 61,78 
                   C 59,82 58,88 56,92 
                   C 55,94 54,96 52,95 
                   C 51,94 51,89 50,87 
                   C 48,82 45,79 43,76 
                   C 41,73 39,71 39,68 
                   C 38,65 39,62 38,59 
                   C 37,56 36,54 34,53 
                   C 31,52 27,51 25,50 
                   C 23,49 20,48 18,47 
                   C 16,46 15,44 14,42 
                   C 13,40 12,38 13,36 
                   C 14,34 18,34 20,33 
                   C 23,32 25,30 26,27 
                   C 27,24 28,21 30,18 Z"
                className="transition-colors duration-300 fill-current opacity-20"
              />
            </svg>

            {/* Simulated Live Interconnecting Optical Pipelines (Bridges between nodes) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {hubsData.map((hub, idx) => {
                const nextHub = hubsData[(idx + 1) % hubsData.length];
                return (
                  <path
                    key={`line-${hub.id}`}
                    d={`M ${hub.coordinates.x} ${hub.coordinates.y} Q ${(hub.coordinates.x + nextHub.coordinates.x) / 2} ${(hub.coordinates.y + nextHub.coordinates.y) / 2 - 8}, ${nextHub.coordinates.x} ${nextHub.coordinates.y}`}
                    fill="none"
                    stroke={
                      activeSignal === idx
                        ? "#e5c158"
                        : idx % 2 === 0
                        ? "#0052cc"
                        : "#38bdf8"
                    }
                    strokeWidth={activeSignal === idx ? "1.5" : "0.5"}
                    strokeDasharray={activeSignal === idx ? "none" : "3, 3"}
                    className="transition-all duration-500 opacity-60"
                  />
                );
              })}
            </svg>

            {/* Glowing Map Pins & Pings */}
            {hubsData.map((hub, idx) => {
              const isSelected = selectedHub.id === hub.id;
              const isPulsing = activeSignal === idx;
              return (
                <div
                  key={hub.id}
                  id={`map-pin-${hub.id}`}
                  style={{
                    left: `${hub.coordinates.x}%`,
                    top: `${hub.coordinates.y}%`,
                  }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                  onClick={() => setSelectedHub(hub)}
                >
                  {/* Ping Waves */}
                  {isPulsing && (
                    <span className="absolute -inset-4 rounded-full bg-brand-blue-light/30 animate-ping" />
                  )}
                  {isSelected && (
                    <span className="absolute -inset-3 rounded-full bg-brand-gold/30 animate-pulse" />
                  )}

                  {/* Core Node Marker Dot */}
                  <div
                    className={`w-4.5 h-4.5 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                      isSelected
                        ? "bg-brand-gold text-slate-950 scale-125 ring-4 ring-brand-gold/20"
                        : isPulsing
                        ? "bg-brand-blue-light text-white ring-2 ring-brand-blue-light/30"
                        : "bg-slate-700 hover:bg-brand-blue text-slate-200"
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* Tiny floating text for hover indicator */}
                  <span
                    className={`absolute left-6 top-1/2 -translate-y-1/2 bg-slate-950 text-slate-100 text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap shadow border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                  >
                    {hub.country}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Node Diagnostics Panel */}
        <div id="diagnostics-panel" className="lg:col-span-5 h-full">
          <div
            className={`rounded-xl border p-5 ${
              isDarkMode ? "bg-slate-950/80 border-slate-800/80" : "bg-white border-slate-200"
            }`}
          >
            <div className="flex justify-between items-start border-b border-slate-800/50 pb-4 mb-4">
              <div>
                <h3 className={`text-lg font-bold font-display ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  {selectedHub.name}
                </h3>
                <p className="text-xs text-brand-blue-light font-mono mt-0.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 animate-pulse text-green-400" />
                  Telemetry Node: {selectedHub.id.toUpperCase()}-AFRICA
                </p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                isDarkMode ? "bg-slate-900 text-slate-300" : "bg-slate-100 text-slate-700"
              }`}>
                {selectedHub.region}
              </span>
            </div>

            {/* Spec Matrix List */}
            <div className="space-y-3.5 text-sm">
              <div>
                <span className="text-xs text-slate-500 block uppercase tracking-wider font-mono">Location Domain</span>
                <span className={`font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                  {selectedHub.country}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 block uppercase tracking-wider font-mono">Primary Core Function</span>
                <span className={`font-medium ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                  {selectedHub.role}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-500 block uppercase tracking-wider font-mono">Backplane Latency</span>
                  <span className="font-semibold text-green-400 font-mono">
                    {selectedHub.latency}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block uppercase tracking-wider font-mono">Operational Focus</span>
                  <span className="font-semibold text-brand-blue-light font-mono">
                    {selectedHub.established}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-800/50 pt-4 mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-gold" />
                  <span className="text-xs text-slate-400">SLA Standard Compliance</span>
                </div>
                <span className="text-xs font-bold text-slate-300">99.99% Guaranteed</span>
              </div>
            </div>

            {/* Interactive Selector Carousel */}
            <div className="mt-5 border-t border-slate-800/50 pt-4">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono block mb-2">Switch Telemetry Node:</span>
              <div className="flex flex-wrap gap-1.5">
                {hubsData.map((hub) => (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedHub(hub)}
                    className={`px-2.5 py-1 text-xs rounded transition-all ${
                      selectedHub.id === hub.id
                        ? "bg-brand-blue text-white shadow font-semibold"
                        : isDarkMode
                        ? "bg-slate-900 hover:bg-slate-800 text-slate-400"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    {hub.id.charAt(0).toUpperCase() + hub.id.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

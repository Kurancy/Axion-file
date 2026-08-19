import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Calculator,
  TrendingUp,
  Clock,
  Briefcase,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  Layers,
  ChevronRight,
  Info
} from "lucide-react";

interface ROICalculatorProps {
  isDarkMode: boolean;
  setActivePage: (page: any) => void;
}

type Currency = "USD" | "KES" | "NGN" | "ZAR" | "GHS";

interface CurrencyConfig {
  symbol: string;
  ratePerUSD: number;
  minRate: number;
  maxRate: number;
  defaultRate: number;
  step: number;
}

const currencyConfigs: Record<Currency, CurrencyConfig> = {
  USD: { symbol: "$", ratePerUSD: 1, minRate: 5, maxRate: 150, defaultRate: 25, step: 1 },
  KES: { symbol: "KSh", ratePerUSD: 130, minRate: 500, maxRate: 20000, defaultRate: 3200, step: 100 },
  NGN: { symbol: "₦", ratePerUSD: 1500, minRate: 2000, maxRate: 220000, defaultRate: 37500, step: 500 },
  ZAR: { symbol: "R", ratePerUSD: 18, minRate: 80, maxRate: 2700, defaultRate: 450, step: 10 },
  GHS: { symbol: "GH₵", ratePerUSD: 15, minRate: 50, maxRate: 2200, defaultRate: 375, step: 5 },
};

interface IndustryPreset {
  id: string;
  name: string;
  defaultTime: number;
  defaultVolume: number;
  techCore: string;
  bottleneck: string;
}

const industryPresets: IndustryPreset[] = [
  {
    id: "ap-automation",
    name: "Invoice & AP Processing",
    defaultTime: 0.6,
    defaultVolume: 1200,
    techCore: "AI Automation (OCR / Document Processing)",
    bottleneck: "manual paper-based invoice data entry, document validation checks, and email sorting friction"
  },
  {
    id: "erp-reconciliation",
    name: "ERP Data Synchronization",
    defaultTime: 1.8,
    defaultVolume: 350,
    techCore: "SAP / ERP Legacy System Integrations",
    bottleneck: "reconciling physical warehousing ledgers, manual stock records, and syncing with legacy ERP databases"
  },
  {
    id: "inventory-tracking",
    name: "WMS Inventory Auditing",
    defaultTime: 2.2,
    defaultVolume: 180,
    techCore: "Warehouse Tracking (Barcode & IoT WMS)",
    bottleneck: "manual inventory tracking, barcode auditing updates, and stock shrinkage verification delays"
  },
  {
    id: "logistics-dispatch",
    name: "Dispatch & Route Optimization",
    defaultTime: 0.8,
    defaultVolume: 1600,
    techCore: "High-Load Bespoke Cloud Platforms",
    bottleneck: "manual cross-border route planning, driver dispatch assignments, and fuel slip logging"
  }
];

export default function ROICalculator({ isDarkMode, setActivePage }: ROICalculatorProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("USD");
  const [timeSpent, setTimeSpent] = useState<number>(1.5);
  const [volume, setVolume] = useState<number>(800);
  const [laborRate, setLaborRate] = useState<number>(25);
  const [efficiencyLevel, setEfficiencyLevel] = useState<number>(0.85); // 85% default (Gold)
  const [activePreset, setActivePreset] = useState<string>("custom");

  const config = currencyConfigs[selectedCurrency];

  // Handle currency change - scale rate proportionally to prevent crazy slider jumps
  const handleCurrencyChange = (curr: Currency) => {
    const oldConfig = currencyConfigs[selectedCurrency];
    const newConfig = currencyConfigs[curr];
    setSelectedCurrency(curr);
    
    // Scale current labor rate from old currency to new currency using the ratios
    const rateInUSD = laborRate / oldConfig.ratePerUSD;
    const scaledRate = Math.round(rateInUSD * newConfig.ratePerUSD);
    
    // Clamp inside new bounds
    const clampedRate = Math.max(newConfig.minRate, Math.min(newConfig.maxRate, scaledRate));
    setLaborRate(clampedRate);
  };

  // Apply Industry Preset
  const applyPreset = (preset: IndustryPreset) => {
    setActivePreset(preset.id);
    setTimeSpent(preset.defaultTime);
    setVolume(preset.defaultVolume);
    // Reset labor rate to default for currency
    setLaborRate(config.defaultRate);
  };

  // Calculations
  const currentMonthlyCost = volume * timeSpent * laborRate;
  const currentAnnualCost = currentMonthlyCost * 12;
  
  const projectedMonthlyCost = currentMonthlyCost * (1 - efficiencyLevel);
  const projectedAnnualCost = projectedMonthlyCost * 12;
  
  const annualSavings = currentAnnualCost - projectedAnnualCost;
  const monthlySavings = currentMonthlyCost - projectedMonthlyCost;
  const annualHoursSaved = volume * timeSpent * efficiencyLevel * 12;
  const fteReclaimed = Math.round((annualHoursSaved / 2000) * 10) / 10;

  // Format currency output nicely
  const formatCurrency = (value: number) => {
    return `${config.symbol} ${Math.round(value).toLocaleString()}`;
  };

  // Export current ROI context to localstorage and route to Consultation AI Hub
  const handleExportToAI = () => {
    const matchedPreset = industryPresets.find(p => p.id === activePreset);
    const targetTech = matchedPreset ? matchedPreset.techCore : "AI Automation (OCR / Document Processing)";
    const bottleneckDesc = matchedPreset ? matchedPreset.bottleneck : "manual data entry and process coordination bottlenecks";

    const roiContext = {
      industry: matchedPreset ? (matchedPreset.id === "ap-automation" ? "Warehousing & Storage" : "Manufacturing") : "Manufacturing",
      targetTech,
      bottleneck: `Process bottleneck: ${bottleneckDesc}. Current volume: ${volume}/month, average manual processing time per task: ${timeSpent} hrs. Utilizing an hourly rate of ${formatCurrency(laborRate)}. Goal: Mitigate these bottlenecks using Axion's solutions to save ${Math.round(efficiencyLevel * 100)}% of labor, representing ${formatCurrency(annualSavings)} saved annually.`,
      size: volume > 1000 ? "Large Enterprise (200-1000 Employees)" : "Mid-Scale Corporate (50-200 Employees)",
    };

    localStorage.setItem("axion_roi_preset", JSON.stringify(roiContext));
    
    // Trigger tab switch
    setActivePage("consultation-hub");
  };

  return (
    <section id="interactive-roi-calculator" className="w-full mt-20 scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold tracking-widest text-brand-gold uppercase block">
          Strategic Assessment
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display mt-1 text-white">
          Interactive Operational ROI Calculator
        </h2>
        <p className={`text-sm mt-2 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
          Benchmark your legacy manual workflows. Calculate exactly how much money, time, and administrative friction you can reclaim with Axion automated system integrations.
        </p>
      </div>

      <div className={`rounded-2xl border overflow-hidden ${
        isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-xl"
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Interactive Parametric Controls */}
          <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-800/60">
            
            {/* Step 1: Presets & Currency Selection */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue-light font-bold">
                  Step 1: Select Industry Template
                </span>
                
                {/* Currency selector pill */}
                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Region/Currency:</span>
                  <div className="flex rounded-md bg-slate-950/80 p-0.5 border border-slate-800">
                    {(Object.keys(currencyConfigs) as Currency[]).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => handleCurrencyChange(curr)}
                        className={`px-1.5 py-0.5 text-[9px] font-mono font-bold rounded transition-all cursor-pointer ${
                          selectedCurrency === curr
                            ? "bg-brand-blue text-white"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>


              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {industryPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer select-none ${
                      activePreset === preset.id
                        ? "bg-brand-blue/10 border-brand-blue text-white"
                        : isDarkMode
                        ? "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-300"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 shadow-sm"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase font-bold block text-brand-gold mb-1">
                      {preset.id === "ap-automation" ? "AP Automation" : preset.id === "erp-reconciliation" ? "ERP Sync" : preset.id === "inventory-tracking" ? "WMS Inventory" : "Dispatch Log"}
                    </span>
                    <span className="text-[11px] font-semibold leading-tight block line-clamp-2">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>

              {activePreset !== "custom" && (
                <button
                  onClick={() => setActivePreset("custom")}
                  className="text-[10px] text-brand-blue-light font-mono mt-2 hover:underline flex items-center gap-1"
                >
                  Switch to Custom Manual Calibration
                </button>
              )}
            </div>

            {/* Step 2: Slider Adjustments */}
            <div className="space-y-5 border-t border-slate-800/40 pt-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue-light font-bold block mb-1">
                Step 2: Calibrate Process Parameters
              </span>

              {/* Time Spent Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-slate-400 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-blue-light" />
                    Manual Time spent per Task
                  </label>
                  <span className="font-mono text-white font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {timeSpent} hours
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="8.0"
                  step="0.1"
                  value={timeSpent}
                  onChange={(e) => {
                    setTimeSpent(parseFloat(e.target.value));
                    setActivePreset("custom");
                  }}
                  className="w-full h-1.5 rounded-lg bg-slate-950 appearance-none cursor-pointer accent-brand-blue focus:outline-none"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>0.1 hrs (6 mins)</span>
                  <span>4 hrs</span>
                  <span>8.0 hrs (Full Day)</span>
                </div>
              </div>

              {/* Monthly Volume Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-slate-400 font-medium flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-brand-blue-light" />
                    Monthly Process Volume
                  </label>
                  <span className="font-mono text-white font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {volume.toLocaleString()} tasks/mo
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="5000"
                  step="10"
                  value={volume}
                  onChange={(e) => {
                    setVolume(parseInt(e.target.value));
                    setActivePreset("custom");
                  }}
                  className="w-full h-1.5 rounded-lg bg-slate-950 appearance-none cursor-pointer accent-brand-blue focus:outline-none"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>10 tasks</span>
                  <span>2,500 tasks</span>
                  <span>5,000+ tasks</span>
                </div>
              </div>

              {/* Labor Rate Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-slate-400 font-medium flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-brand-blue-light" />
                    Average Blended Hourly Labor Cost
                  </label>
                  <span className="font-mono text-white font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {formatCurrency(laborRate)}/hr
                  </span>
                </div>
                <input
                  type="range"
                  min={config.minRate}
                  max={config.maxRate}
                  step={config.step}
                  value={laborRate}
                  onChange={(e) => {
                    setLaborRate(parseFloat(e.target.value));
                    setActivePreset("custom");
                  }}
                  className="w-full h-1.5 rounded-lg bg-slate-950 appearance-none cursor-pointer accent-brand-blue focus:outline-none"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>{formatCurrency(config.minRate)}</span>
                  <span>{formatCurrency(config.maxRate / 2)}</span>
                  <span>{formatCurrency(config.maxRate)}</span>
                </div>
              </div>
            </div>

            {/* Step 3: Axion Automation Tier */}
            <div className="mt-6 border-t border-slate-800/40 pt-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue-light font-bold block mb-3">
                Step 3: Select Axion Architecture Tier
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { level: 0.70, name: "Sovereign Link", desc: "Automate raw syncing", rate: "70% Savings" },
                  { level: 0.85, name: "Advanced AI Agent", desc: "Cognitive validation", rate: "85% Savings" },
                  { level: 0.95, name: "Axion Core Unified", desc: "Full end-to-end loops", rate: "95% Savings" }
                ].map((tier) => (
                  <button
                    key={tier.level}
                    onClick={() => setEfficiencyLevel(tier.level)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer select-none flex flex-col justify-between ${
                      efficiencyLevel === tier.level
                        ? "bg-brand-gold/10 border-brand-gold text-white"
                        : isDarkMode
                        ? "bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-300"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold block">{tier.name}</span>
                      <span className="text-[10px] text-slate-500 block leading-normal mt-0.5">{tier.desc}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-green-400 block mt-2.5">
                      {tier.rate} Target
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Projected Savings Dashboard */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-gradient-to-b from-slate-950 to-brand-navy flex flex-col justify-between">
            
            {/* Top Stats Section */}
            <div>
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-800/50">
                <Calculator className="w-5 h-5 text-brand-gold" />
                <h3 className="font-mono text-xs font-bold tracking-widest uppercase text-slate-400">
                  Savings Diagnostic
                </h3>
              </div>

              {/* Dynamic Big ROI Header */}
              <div className="text-center py-4 bg-slate-900/40 rounded-2xl border border-slate-800/60 p-4 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5">
                  Projected Annual Labor Savings
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-brand-gold block font-mono">
                  {formatCurrency(annualSavings)}
                </span>
                <span className="text-xs text-green-400 font-mono font-bold mt-1 block">
                  Reclaiming {Math.round(efficiencyLevel * 100)}% of Manual Cost
                </span>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4 text-xs font-sans">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Monthly Cost Saved:</span>
                  <span className="font-mono text-white font-bold">{formatCurrency(monthlySavings)} / mo</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Reclaimed Productive Hours:</span>
                  <span className="font-mono text-white font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-blue-light" />
                    {Math.round(annualHoursSaved).toLocaleString()} hrs / yr
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">FTE Employee Capacity Restored:</span>
                  <span className="font-mono text-brand-gold font-bold">
                    ~ {fteReclaimed} FTEs
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Operational Payback Period:</span>
                  <span className="font-mono text-green-400 font-bold">
                    &lt; 14 Days (Instant)
                  </span>
                </div>
              </div>

              {/* Side-by-Side Visual Bar Comparisons */}
              <div className="mt-6 pt-5 border-t border-slate-800/50 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Comparison: Annual Resource Costs
                </span>
                
                {/* Legacy Manual Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Legacy Manual Ingestion</span>
                    <span>{formatCurrency(currentAnnualCost)}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-950 overflow-hidden relative border border-slate-800/40">
                    <motion.div
                      className="h-full bg-slate-700"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>

                {/* Axion Automated Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-brand-gold font-bold">
                    <span>Axion Integrated</span>
                    <span>{formatCurrency(projectedAnnualCost)}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-950 overflow-hidden relative border border-slate-800/40">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand-blue to-brand-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(5, (1 - efficiencyLevel) * 100)}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Call to Action Card */}
            <div className="mt-8 pt-6 border-t border-slate-800/50">
              <div className="bg-slate-950/60 rounded-xl p-4 border border-brand-blue/15 space-y-3.5">
                <div className="flex gap-2.5 items-start">
                  <Sparkles className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    <strong>Sovereign AI Blueprint Integration:</strong> Ready to turn these parameters into a formalized system roadmap? Inject this diagnostic directly into our server-side AI architect.
                  </p>
                </div>
                
                <button
                  onClick={handleExportToAI}
                  className="w-full py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-brand-gold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-1.5 cursor-pointer select-none font-sans"
                >
                  <span>Inject into AI Blueprint Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

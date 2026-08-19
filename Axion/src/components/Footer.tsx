import { Cpu, Mail, Phone, MapPin, ExternalLink, ShieldCheck } from "lucide-react";
import { ActivePage, Language } from "../types";
import { translations } from "../data/mockData";

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  language: Language;
  isDarkMode: boolean;
}

export default function Footer({ setActivePage, language, isDarkMode }: FooterProps) {
  const t = translations[language];

  return (
    <footer
      id="synapse-global-footer"
      className={`border-t transition-colors duration-300 ${
        isDarkMode
          ? "bg-slate-950 border-slate-800 text-slate-400"
          : "bg-slate-50 border-slate-200 text-slate-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800/60">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActivePage("home")}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue to-cyan-500 text-white flex items-center justify-center">
                <Cpu className="w-4.5 h-4.5" />
              </div>
              <span className={`text-base font-bold tracking-tight font-display ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                SYNAPSE <span className="text-brand-blue-light font-normal text-xs uppercase bg-brand-blue/10 px-1.5 py-0.5 rounded border border-brand-blue/20">ENTERPRISE</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              Africa's leading digital transformation and enterprise automation company. We design high-load client backplanes, deploy cognitive AI agents, and resolve warehouse tracking bottlenecks at continental scale.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-gold font-mono font-bold">
              <ShieldCheck className="w-4 h-4" />
              Sovereign Sovereign Cloud Ingress
            </div>
          </div>

          {/* Column 2: System Quick-Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-widest font-mono ${isDarkMode ? "text-slate-300" : "text-slate-900"}`}>
              Platform Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage("services")} className="hover:text-brand-blue-light transition-colors text-left cursor-pointer">
                  AI & ERP Services Matrix
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage("industries")} className="hover:text-brand-blue-light transition-colors text-left cursor-pointer">
                  Target Verticals Solution Suite
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage("portfolio")} className="hover:text-brand-blue-light transition-colors text-left cursor-pointer">
                  Enterprise Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage("timeline")} className="hover:text-brand-blue-light transition-colors text-left cursor-pointer">
                  2026 - 2030 Corporate Future Timeline
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage("consultation-hub")} className="hover:text-brand-blue-light font-bold text-brand-gold transition-colors text-left cursor-pointer flex items-center gap-1">
                  AI Solution Architect <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="md:col-span-4 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-widest font-mono ${isDarkMode ? "text-slate-300" : "text-slate-900"}`}>
              Continental Contact channels
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-blue-light" />
                <a href="mailto:advisory@synapse-enterprise.com" className="hover:text-brand-blue-light transition-colors">
                  advisory@synapse-enterprise.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-blue-light" />
                <a href="https://wa.me/234800SYNAPSE" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue-light transition-colors">
                  +234 (0) 800-SYNAPSE (WhatsApp Hub)
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-blue-light mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  Headquarters: Twin Towers, Victoria Island, Lagos, Nigeria<br />
                  East Hub: Landmark Plaza, Argwings Kodhek Rd, Nairobi, Kenya
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits / Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono">
          <div className="text-center md:text-left">
            <span>© 2026 Synapse Enterprise Technology Group. All Rights Reserved.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-blue-light" />ISO 27001 Certified
            </span>
            <span>GDPR / NDPR Compliant Gateways</span>
            <span>Accredited SAP Gold Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

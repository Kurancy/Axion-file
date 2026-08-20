import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Globe2 } from "lucide-react";
import { ActivePage, Language } from "../types";
import { translations } from "../data/mockData";
import AxionLogo from "./AxionLogo";


interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  language: Language;
  isDarkMode: boolean;
}

export default function Footer({ setActivePage, language, isDarkMode }: FooterProps) {
  const t = translations[language];

  const quickLinks: { id: ActivePage; label: string }[] = [
    { id: "services",   label: t.navServices },
    { id: "industries", label: t.navIndustries },
    { id: "solutions",  label: t.navSolutions },
    { id: "portfolio",  label: t.navPortfolio },
    { id: "timeline",   label: t.navTimeline },
    { id: "contact",    label: t.navContact },
  ];

  return (
    <footer
      id="axion-global-footer"
      className={`border-t ${
        isDarkMode
          ? "bg-brand-navy border-blue-950/60 text-slate-400"
          : "bg-slate-50 border-slate-200 text-slate-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-blue-950/40">

          {/* Column 1: Brand Identity */}
          <div className="md:col-span-5 space-y-5">
            <div
              className="flex items-center gap-3 cursor-pointer w-max"
              onClick={() => setActivePage("home")}
              role="button"
              aria-label="Axion Technologies Ltd."
            >
              <AxionLogo logoSize={40} isDarkMode={isDarkMode} glow={false} interactive={true} />
            </div>

            <p className="text-[13px] leading-relaxed max-w-sm">
              Africa's trusted enterprise technology partner. We deliver AI automation, SAP ERP solutions, 
              warehouse management systems, and digital transformation strategies to organizations across the continent.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-blue-400 font-mono font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                ISO 27001 Certified
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-mono font-semibold">
                <Globe2 className="w-3.5 h-3.5" />
                SAP Gold Partner
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className={`text-[11px] font-bold uppercase tracking-widest font-mono ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
              Company
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => setActivePage(link.id)}
                    className="text-[13px] hover:text-blue-400 transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setActivePage("admin")}
                  className="text-[13px] text-blue-400 hover:text-blue-300 font-semibold transition-colors text-left cursor-pointer flex items-center gap-1"
                >
                  Admin Portal (Shared Inbox) <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("consultation-hub")}
                  className="text-[13px] text-blue-400 hover:text-blue-300 font-semibold transition-colors text-left cursor-pointer flex items-center gap-1"
                >
                  Book AI Consultation <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-4 space-y-4">
            <h4 className={`text-[11px] font-bold uppercase tracking-widest font-mono ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-[13px]">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:info@axiontech.ltd" className="hover:text-blue-400 transition-colors font-mono">
                  info@axion.ng
                </a>
              </li>
              <li className="flex items-center gap-3 text-[13px]">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:+2348001234567" className="hover:text-blue-400 transition-colors font-mono">
                  +84 829457278 / whatsapp
                </a>
              </li>
              <li className="flex items-start gap-3 text-[13px]">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  HQ: Twin Towers, Victoria Island, Abuja, Nigeria<br />
                  East Hub: Landmark Plaza, Nairobi, Kenya<br />
                  South Hub: Capital Hill, Sandton, South Africa
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono">
          <span className="text-center md:text-left">
            © 2026 Axion Technologies Ltd. All Rights Reserved. Registered in Nigeria.
          </span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-500">
            <span>GDPR / NDPR Compliant</span>
            <span>Accredited SAP Gold Partner</span>
            <span>ISO 27001 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, Lock, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../lib/translations';

interface FooterProps {
  language: Language;
  onOpenProofModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenProofModal }) => {
  const t = translations[language];

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">

          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-indigo-600 p-0.5 shadow-lg shadow-teal-500/20">
                <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Axion <span className="text-emerald-500">Donate</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {t.tagline}. Direct bank and cryptocurrency donation infrastructure serving verified beneficiaries worldwide.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Direct Transfer • 0% Platform Fees</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Donor Quick Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenProofModal}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Submit Transfer Proof</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-emerald-400 transition-colors">
                  Explore Verified Causes
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-emerald-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & Security */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform Administration</h4>
            <p className="text-xs text-slate-400">
              Only verified administrators can publish or edit campaign funds. Visitors do not require accounts.
            </p>
            <Link
              to="/admin"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 text-xs font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.adminPortal}</span>
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Axion Technologies. All rights reserved. Built for direct impact.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit SSL Encrypted</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

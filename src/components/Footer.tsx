import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  ArrowUp, 
  FolderArchive,
  Database,
  MessageCircle
} from 'lucide-react';
import { CHURCH_INFO } from '../data/mockChurchData';
import { GEM_CHURCH_LOGO } from '../assets/logo';
import { CHURCH_WHATSAPP_PRIMARY } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenLocalSync: () => void;
  onOpenDatabase?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLocalSync, onOpenDatabase }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#011712] text-slate-300 border-t border-[#065f46] text-xs">
      {/* Top Banner Statement */}
      <div className="bg-[#043e32] py-8 border-b border-[#065f46]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-cinzel text-lg sm:text-xl font-bold text-[#fbbf24] tracking-wide mb-1">
            Glorious Evangelical Ministries (GEM Church Tuty)
          </p>
          <p className="font-scripture italic text-sm text-emerald-100">
            {CHURCH_INFO.tagline}
          </p>
          <p className="text-xs text-emerald-200/90 mt-1">
            “Pure and undefiled religion before God the Father is this: to care for orphans and widows in their distress, and to keep oneself unstained by the world.” — James 1:27
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Pastors */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#fbbf24] shadow-md flex-shrink-0 bg-white p-0.5">
                <img 
                  src={GEM_CHURCH_LOGO} 
                  alt="Glorious Evangelical Ministries Logo" 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-cinzel text-base font-bold text-white tracking-wider block">
                  GEM CHURCH TUTY
                </span>
                <span className="text-[10px] text-[#fbbf24] font-semibold tracking-wider uppercase">
                  Glorious Evangelical Ministries
                </span>
              </div>
            </div>
            <p className="text-emerald-100/80 text-xs leading-relaxed">
              Walking in love, holiness, and service. Carrying the light of Jesus to Tuticorin and mission fields across India, Nepal, and Bhutan.
            </p>
            <div className="pt-2 text-[11px] text-emerald-100/90">
              <span className="font-semibold text-white block">Pastoral Leadership:</span>
              <span className="text-[#fbbf24]">{CHURCH_INFO.leadPastor}</span>
            </div>
          </div>

          {/* Col 2: Service Times */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-[#fbbf24] uppercase tracking-wider mb-3">
              Weekly Gatherings
            </h4>
            <ul className="space-y-2 text-slate-300">
              {CHURCH_INFO.serviceTimes.map((service, idx) => (
                <li key={idx} className="border-b border-[#065f46]/40 pb-1.5 last:border-0">
                  <span className="font-semibold text-white block text-xs">{service.name}</span>
                  <span className="text-[11px] text-emerald-300">{service.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-[#fbbf24] uppercase tracking-wider mb-3">
              Church Life & Missions
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              {[
                { id: 'home', label: 'HOME SANCTUARY' },
                { id: 'sermons', label: 'SERMONS & NOTES' },
                { id: 'live', label: 'LIVE BROADCAST' },
                { id: 'missions', label: 'GLOBAL & NATIONAL MISSIONS' },
                { id: 'celebrations', label: 'BELIEVER CELEBRATIONS & REMINDERS' },
                { id: 'events', label: 'UPCOMING GATHERINGS' },
                { id: 'prayer', label: 'PRAYER WALL' },
                { id: 'devotional', label: 'DAILY DEVOTIONAL' },
                { id: 'ministries', label: 'CHURCH MINISTRIES' },
                { id: 'giving', label: 'ONLINE GIVING & TITHES' },
                { id: 'connect', label: 'CONTACT SANCTUARY' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      scrollToTop();
                    }}
                    className="hover:text-[#fbbf24] transition-colors cursor-pointer text-left uppercase text-[11px] font-medium"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-2.5">
            <h4 className="font-cinzel text-xs font-bold text-[#fbbf24] uppercase tracking-wider mb-3">
              Contact & Sanctuary
            </h4>
            <div className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-[#fbbf24] flex-shrink-0 mt-0.5" />
              <span>7V/6B SundaravelPuram, Tuticorin – 628002</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-[#fbbf24] flex-shrink-0" />
              <span>+91 99943 01540</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-[#fbbf24] flex-shrink-0" />
              <span>+91 99946 45090</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-[#fbbf24] flex-shrink-0" />
              <span>{CHURCH_INFO.email}</span>
            </div>

            <div className="pt-3 space-y-2">
              <a
                href={`https://api.whatsapp.com/send?phone=${CHURCH_WHATSAPP_PRIMARY}&text=Praise%20the%20Lord%20Pastor!%20I%20am%20contacting%20GEM%20Church%20Tuticorin`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Sanctuary</span>
              </a>

              {onOpenDatabase && (
                <button
                  onClick={onOpenDatabase}
                  className="w-full py-2 px-3 rounded-lg bg-[#043e32] hover:bg-[#065f46] text-[#fbbf24] border border-[#065f46] text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Church Directory & Database</span>
                </button>
              )}

              <button
                onClick={onOpenLocalSync}
                className="w-full py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-300 text-[11px] font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <FolderArchive className="w-3 h-3" />
                <span>Sync GEM Project Files</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#065f46]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-emerald-200/60">
          <p>© 2026 Glorious Evangelical Ministries (GEM Church Tuty). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-[#fbbf24] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

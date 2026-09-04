import React, { useState } from 'react';
import { 
  Tv, 
  Calendar, 
  BookOpen, 
  Menu, 
  X, 
  FolderArchive,
  PhoneCall,
  MapPin,
  Heart,
  Users,
  Flame,
  Radio,
  Clock,
  Sparkles,
  Globe2,
  Cake,
  Database,
  MessageCircle
} from 'lucide-react';
import { CHURCH_INFO } from '../data/mockChurchData';
import { GEM_CHURCH_LOGO } from '../assets/logo';
import { CHURCH_WHATSAPP_PRIMARY } from '../utils/whatsapp';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLocalSync: () => void;
  onOpenDatabase?: () => void;
  isLiveNow?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenLocalSync,
  onOpenDatabase,
  isLiveNow = false 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME', icon: Sparkles },
    { id: 'sermons', label: 'SERMONS', icon: BookOpen },
    { id: 'live', label: 'LIVE SANCTUARY', icon: Tv, badge: isLiveNow ? 'LIVE' : undefined },
    { id: 'missions', label: 'MISSIONS', icon: Globe2 },
    { id: 'celebrations', label: 'CELEBRATIONS', icon: Cake, badge: 'TODAY' },
    { id: 'events', label: 'EVENTS', icon: Calendar },
    { id: 'prayer', label: 'PRAYER WALL', icon: Flame },
    { id: 'devotional', label: 'DAILY WORD', icon: BookOpen },
    { id: 'ministries', label: 'MINISTRIES', icon: Users },
    { id: 'giving', label: 'GIVING', icon: Heart },
    { id: 'connect', label: 'CONNECT', icon: MapPin }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 shadow-xl shadow-black/25 w-full font-sans">
      {/* Refined Dignified Top Announcement & Quick-Info Bar */}
      <div className="bg-[#011712] border-b border-[#065f46]/50 text-slate-200 text-xs py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Location, Contact & Direct WhatsApp */}
          <div className="flex items-center gap-3 text-[11px] sm:text-xs truncate">
            <div className="flex items-center gap-1.5 text-emerald-200/90 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#fbbf24] flex-shrink-0" />
              <span className="hidden sm:inline truncate">Sanctuary: 7V/6B SundaravelPuram,</span>
              <span className="font-semibold text-white truncate">Tuticorin</span>
            </div>
            <span className="hidden md:inline text-[#065f46]">|</span>
            <a 
              href="tel:+919994301540" 
              className="hidden md:flex items-center gap-1.5 text-emerald-200/90 hover:text-[#fbbf24] transition-colors flex-shrink-0"
            >
              <PhoneCall className="w-3 h-3 text-[#fbbf24]" />
              <span>Prayer: <strong className="text-white font-medium">+91 99943 01540</strong></span>
            </a>
            <span className="hidden lg:inline text-[#065f46]">|</span>
            <a
              href={`https://api.whatsapp.com/send?phone=${CHURCH_WHATSAPP_PRIMARY}&text=Praise%20the%20Lord%20Pastor!%20I%20am%20contacting%20GEM%20Church%20Tuticorin`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 text-[11px] font-semibold text-[#25D366] hover:text-emerald-300 transition-colors flex-shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Sanctuary</span>
            </a>
          </div>

          {/* Right: Worship Timings, Database Provision & Language Badge */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs flex-shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-200/90">
              <Clock className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>Sunday: <strong className="text-white font-medium">6:00 AM & 8:00 AM</strong></span>
            </div>

            {onOpenDatabase && (
              <button
                onClick={onOpenDatabase}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-[#043e32] hover:bg-[#065f46] text-[#fbbf24] border border-[#065f46] transition-colors cursor-pointer shadow-xs"
                title="Church Directory & Database Manager"
              >
                <Database className="w-3 h-3" />
                <span>Database</span>
              </button>
            )}

            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#043e32] text-[#fbbf24] border border-[#065f46] whitespace-nowrap">
              தமிழ் & English
            </span>
            <button
              onClick={onOpenLocalSync}
              className="p-1 rounded text-emerald-300/70 hover:text-[#fbbf24] hover:bg-white/5 transition-colors cursor-pointer flex-shrink-0"
              title="Project Files & Synchronization"
              aria-label="Project Backup & Local Sync"
            >
              <FolderArchive className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Sanctuary Navigation Bar - Refined Font Weight & Balanced Alignment */}
      <div className="bg-[#034335] backdrop-blur-md border-b border-[#065f46]/50 text-white w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
            {/* Church Emblem Brand Logo */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group flex-shrink-0"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-md shadow-black/40 border-2 border-[#fbbf24] group-hover:scale-105 transition-transform duration-300 bg-white flex-shrink-0">
                <img 
                  src={GEM_CHURCH_LOGO} 
                  alt="GEM Church Emblem" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="font-cinzel text-base sm:text-xl font-extrabold tracking-wider text-white group-hover:text-[#fbbf24] transition-colors leading-none">
                    GEM CHURCH
                  </span>
                  <span className="px-1 py-0.2 text-[8px] sm:text-[9px] font-bold rounded bg-[#011712] text-[#fbbf24] border border-[#065f46] uppercase tracking-widest leading-none">
                    TUTY
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-emerald-200/90 font-medium tracking-wide mt-0.5 sm:mt-1 truncate max-w-[140px] sm:max-w-none">
                  Glorious Evangelical Ministries
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links - Refined Weight (font-medium), Clean Spacing & Alignment */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wider rounded-lg transition-all duration-150 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? 'text-[#fbbf24] font-semibold bg-[#022c22] border border-[#fbbf24]/50 shadow-xs'
                        : 'text-emerald-100/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge === 'LIVE' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                    )}
                    {item.badge === 'TODAY' && (
                      <span className="px-1 py-0.2 rounded-full text-[8px] font-semibold bg-[#fbbf24]/25 text-[#fbbf24] border border-[#fbbf24]/40">
                        Today
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Medium screen Nav (lg to xl) */}
            <nav className="hidden lg:flex xl:hidden items-center gap-1">
              {navItems.slice(0, 6).map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-2 py-1 text-[10.5px] font-medium uppercase tracking-wider rounded-md transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-[#fbbf24] font-semibold bg-[#022c22] border border-[#fbbf24]/50'
                        : 'text-emerald-100/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#fbbf24] bg-white/10 rounded-md cursor-pointer hover:bg-white/20"
              >
                MORE ▾
              </button>
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <button
                id="header-live-btn"
                onClick={() => handleNavClick('live')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-[#fbbf24]/60 transition-all cursor-pointer shadow-xs"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span>WATCH LIVE</span>
              </button>

              <button
                id="header-give-btn"
                onClick={() => handleNavClick('giving')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] text-[#043e32] shadow-md shadow-black/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-[#043e32]" />
                <span>GIVE ONLINE</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden flex items-center gap-1.5">
              <button
                id="header-mobile-give-btn"
                onClick={() => handleNavClick('giving')}
                className="sm:hidden px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#fbbf24] text-[#043e32]"
              >
                GIVE
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#011712] border-b border-[#065f46] text-white px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#043e32] text-[#fbbf24] border border-[#fbbf24]/50 font-semibold shadow-inner'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#fbbf24]' : 'text-emerald-300/70'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      item.badge === 'LIVE' ? 'bg-rose-500 text-white' : 'bg-[#fbbf24]/20 text-[#fbbf24]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Contact & Worship Timing Strip in Mobile */}
          <div className="pt-3 border-t border-[#065f46]/60 space-y-2 text-xs">
            <div className="flex items-center justify-between text-emerald-200/80 text-[11px] px-1">
              <span>Sunday: 6:00 AM & 8:00 AM (Tamil/English)</span>
              <span className="text-[#fbbf24]">Tuticorin Sanctuary</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`https://api.whatsapp.com/send?phone=${CHURCH_WHATSAPP_PRIMARY}&text=Praise%20the%20Lord%20Pastor!%20`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-semibold border border-[#25D366]/40 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Pastor</span>
              </a>
              {onOpenDatabase && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDatabase();
                  }}
                  className="flex items-center justify-center gap-2 py-2 rounded-xl bg-[#043e32] hover:bg-[#065f46] text-[#fbbf24] text-xs font-semibold border border-[#065f46] transition-colors"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Church Database</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:+919994301540"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Call Prayer Line</span>
              </a>
              <button
                onClick={() => handleNavClick('giving')}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#fbbf24] hover:bg-[#f59e0b] text-[#043e32] text-xs font-bold transition-colors shadow"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-[#043e32]" />
                <span>Online Giving</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};


import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Calendar, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Heart,
  BookOpen
} from 'lucide-react';
import { CHURCH_INFO, INITIAL_SERMONS } from '../data/mockChurchData';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  onSelectSermon: (sermonId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onSelectSermon }) => {
  // Countdown to next service (Sunday 9:00 AM)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const latestSermon = INITIAL_SERMONS[0];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#043e32] via-[#02241d] to-[#011712] text-slate-100">
      {/* Dynamic ambient church green and gold glow backdrops */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#043e32]/50 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-20 right-1/4 translate-x-1/2 w-96 h-96 bg-[#fbbf24]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#065f46]/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 relative z-10">
        {/* Upper Welcome Badge (without repeating logo) */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#02241d]/90 border border-[#fbbf24]/40 text-[#fbbf24] text-xs font-semibold backdrop-blur-sm shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span className="uppercase tracking-wider text-[11px] font-bold">Glorious Evangelical Ministries • GEM Church Tuty</span>
          </div>
        </div>

        {/* Central Display Typography */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Walking in Love, <br />
            <span className="bg-gradient-to-r from-[#fbbf24] via-amber-200 to-emerald-200 bg-clip-text text-transparent">
              Holiness, and Service
            </span>
          </h1>
          <p className="font-scripture italic text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            “Pure and undefiled religion before God the Father is this: to care for orphans and widows in their distress, and to keep oneself unstained by the world.”
            <span className="block text-xs font-sans not-italic text-[#fbbf24] font-semibold tracking-wider uppercase mt-1">
              — James 1:27
            </span>
          </p>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto mt-4 font-normal">
            Welcome to Glorious Evangelical Ministries (GEM Church), founded by Rev. L. Navaratnam. Spreading the Gospel across Tuticorin, Nepal, Bhutan, Darjeeling, Siliguri, and all nations.
          </p>

          {/* Tamil Blessing Greeting */}
          <div className="mt-4 inline-block px-4 py-1.5 rounded-lg bg-[#043e32]/80 border border-[#065f46] text-emerald-200 text-xs font-medium">
            கிறிஸ்துவுக்குள் மிகவும் பிரியமானவர்களே! அன்பின் வாழ்த்துக்கள்!
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              id="hero-watch-latest-btn"
              onClick={() => {
                onSelectSermon(latestSermon.id);
                onNavigate('sermons');
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#fbbf24] hover:bg-[#f59e0b] text-[#043e32] font-bold text-sm shadow-lg shadow-black/30 hover:shadow-[#fbbf24]/20 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch Latest Sermon</span>
            </button>
            <button
              id="hero-plan-visit-btn"
              onClick={() => onNavigate('connect')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all cursor-pointer shadow-sm"
            >
              <span>Visit Us in Tuticorin</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>
            <button
              id="hero-prayer-btn"
              onClick={() => onNavigate('prayer')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#032a22] hover:bg-[#043e32] text-[#fbbf24] font-medium text-sm border border-[#065f46] transition-all cursor-pointer shadow-sm"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Request Prayer</span>
            </button>
          </div>
        </div>

        {/* Live Service Countdown Bar */}
        <div className="max-w-4xl mx-auto bg-[#02241d]/90 border border-[#065f46] rounded-2xl p-6 shadow-2xl backdrop-blur-md mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-xl bg-[#043e32] border border-[#fbbf24]/40 flex items-center justify-center text-[#fbbf24] flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[#fbbf24]">
                  Next Worship Gathering
                </div>
                <div className="text-base font-bold text-white mt-0.5">
                  Sunday Celebration Service (தமிழ் ஆராதனை)
                </div>
                <div className="text-xs text-emerald-200/80 flex items-center justify-center md:justify-start gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>Main Sanctuary, Tuticorin & Online Live • 9:00 AM</span>
                </div>
              </div>
            </div>

            {/* Countdown timer numbers */}
            <div className="flex items-center gap-3">
              <div className="text-center px-3 py-2 bg-[#011712] border border-[#065f46] rounded-lg min-w-[56px] shadow-inner">
                <div className="text-xl font-bold font-mono text-[#fbbf24]">{timeLeft.days}</div>
                <div className="text-[10px] uppercase tracking-wider text-emerald-200">Days</div>
              </div>
              <span className="text-emerald-500 font-mono text-lg font-bold">:</span>
              <div className="text-center px-3 py-2 bg-[#011712] border border-[#065f46] rounded-lg min-w-[56px] shadow-inner">
                <div className="text-xl font-bold font-mono text-[#fbbf24]">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-emerald-200">Hours</div>
              </div>
              <span className="text-emerald-500 font-mono text-lg font-bold">:</span>
              <div className="text-center px-3 py-2 bg-[#011712] border border-[#065f46] rounded-lg min-w-[56px] shadow-inner">
                <div className="text-xl font-bold font-mono text-[#fbbf24]">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-emerald-200">Mins</div>
              </div>
              <span className="text-emerald-500 font-mono text-lg font-bold">:</span>
              <div className="text-center px-3 py-2 bg-[#011712] border border-[#065f46] rounded-lg min-w-[56px] shadow-inner">
                <div className="text-xl font-bold font-mono text-[#fbbf24]">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-emerald-200">Secs</div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('live')}
              className="px-4 py-2.5 rounded-lg bg-[#043e32] hover:bg-[#065f46] text-[#fbbf24] text-xs font-semibold border border-[#065f46] transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            >
              Service Details
            </button>
          </div>
        </div>

        {/* 3 Quick Overview Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Pillar 1 */}
          <div 
            onClick={() => onNavigate('sermons')}
            className="group bg-[#02241d]/80 hover:bg-[#032f26] border border-[#065f46] hover:border-[#fbbf24]/60 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-lg"
          >
            <div className="w-10 h-10 rounded-lg bg-[#043e32] border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24] mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#fbbf24] transition-colors">
              Inspiring Sermons
            </h3>
            <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
              Explore systematic series through God’s Word with messages from Rev. L. Navaratnam, sermon notes, and scripture outlines.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#fbbf24] transition-colors">
              <span>Listen & Study</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 2 */}
          <div 
            onClick={() => onNavigate('events')}
            className="group bg-[#02241d]/80 hover:bg-[#032f26] border border-[#065f46] hover:border-[#fbbf24]/60 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-lg"
          >
            <div className="w-10 h-10 rounded-lg bg-[#043e32] border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24] mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#fbbf24] transition-colors">
              Upcoming Gatherings
            </h3>
            <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
              Join Sunday services, midweek prayer meetings, all-night prayer watches, and mission conventions in Tuticorin.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#fbbf24] transition-colors">
              <span>View Church Calendar</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 3 */}
          <div 
            onClick={() => onNavigate('prayer')}
            className="group bg-[#02241d]/80 hover:bg-[#032f26] border border-[#065f46] hover:border-[#fbbf24]/60 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-lg"
          >
            <div className="w-10 h-10 rounded-lg bg-[#043e32] border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24] mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#fbbf24] transition-colors">
              Intercessory Prayer Wall
            </h3>
            <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
              You never have to walk through seasons alone. Submit your prayer requests to our prayer warriors and pastors.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#fbbf24] transition-colors">
              <span>Join Prayer Chain</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

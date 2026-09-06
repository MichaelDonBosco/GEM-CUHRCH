import React, { useState } from 'react';
import { 
  Tv, 
  Sparkles, 
  Heart, 
  Send, 
  MessageSquare, 
  Users, 
  Volume2, 
  Share2, 
  Clock, 
  Flame, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { CHURCH_INFO } from '../data/mockChurchData';
import { GEM_CHURCH_LOGO } from '../assets/logo';

export const LiveServiceSection: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [amenCount, setAmenCount] = useState(148);
  const [praiseCount, setPraiseCount] = useState(212);
  const [hasAmened, setHasAmened] = useState(false);
  const [liveChatMessages, setLiveChatMessages] = useState([
    { id: 1, user: 'Sister Ruth', text: 'Watching from London, grace and peace to the GEM family!', time: '11:18 AM' },
    { id: 2, user: 'Brother Marcus', text: 'Amen pastor!! The joy of the Lord is truly our strength!', time: '11:22 AM' },
    { id: 3, user: 'David & Lisa', text: 'Lifting our hands in living room worship!', time: '11:25 AM' },
    { id: 4, user: 'Elder Thomas', text: 'Welcome all first-time guests joining our online sanctuary today.', time: '11:26 AM' },
  ]);
  const [newChatInput, setNewChatInput] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatInput.trim()) return;
    setLiveChatMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        user: 'You',
        text: newChatInput.trim(),
        time: 'Just now'
      }
    ]);
    setNewChatInput('');
  };

  const handleAmen = () => {
    setAmenCount(prev => prev + 1);
    setHasAmened(true);
    setTimeout(() => setHasAmened(false), 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Live Sanctuary Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#043e32]/10 text-[#043e32] border border-[#043e32]/20 mb-3">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>GEM Church Online Service • Tuticorin</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#043e32]">
          Worship With Us Live
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          Experience the tangible presence of God wherever you are. Participate in fellowship, lift praises, and receive the living Word.
        </p>
      </div>

      {/* Main Broadcast and Interactive Chat Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        {/* Broadcast Stream Player (8 cols) */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="relative aspect-video bg-[#011712] rounded-2xl overflow-hidden shadow-2xl border border-[#065f46] flex items-center justify-center">
            {/* Ambient Sanctuary Stage backdrop */}
            <img 
              src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1400&q=80" 
              alt="Sanctuary stage worship" 
              className="absolute inset-0 w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#011712] via-[#043e32]/40 to-transparent" />

            {/* Overlaid Live Status */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-600 text-white flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                LIVE BROADCAST
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#02241d]/85 backdrop-blur text-emerald-100 border border-[#065f46] flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#fbbf24]" />
                428 Online Worshippers
              </span>
            </div>

            {/* Top Right Channel Watermark with GEM Logo */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-[#02241d]/90 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-[#fbbf24] shadow-lg">
              <img 
                src={GEM_CHURCH_LOGO} 
                alt="GEM Church Logo" 
                className="w-5 h-5 rounded-full object-cover" 
                referrerPolicy="no-referrer"
              />
              <span className="font-cinzel text-[11px] font-bold text-[#fbbf24] tracking-wider pr-1">GEM CHURCH</span>
            </div>

            {/* Stream Center Play / Audio Overlay */}
            <div className="relative z-20 text-center px-6">
              <div className="w-16 h-16 rounded-full bg-[#fbbf24] text-[#043e32] flex items-center justify-center mx-auto mb-3 shadow-xl hover:scale-105 transition-transform cursor-pointer">
                <Tv className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-1">
                Sunday Celebration Worship Service (தமிழ் ஆராதனை)
              </h3>
              <p className="text-xs sm:text-sm text-[#fbbf24] font-medium">
                Message & Ministry • Rev. L. Navaratnam (Senior Pastor)
              </p>
            </div>

            {/* Bottom Stream Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex items-center justify-between text-xs text-slate-300 bg-gradient-to-t from-[#011712] to-transparent">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-300" />
                <span>1080p HD • Glorious Evangelical Ministries Broadcast</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('connect')}
                  className="px-3 py-1.5 rounded-lg bg-[#fbbf24]/20 hover:bg-[#fbbf24]/30 text-[#fbbf24] border border-[#fbbf24]/40 text-xs font-semibold transition-colors cursor-pointer"
                >
                  First Time Guest?
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Reactions Bar Below Player */}
          <div className="mt-4 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAmen}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#043e32]/10 hover:bg-[#043e32]/20 text-[#043e32] border border-[#043e32]/20 font-semibold text-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#fbbf24]" />
                <span>Say Amen! ({amenCount})</span>
              </button>

              <button
                onClick={() => setPraiseCount(prev => prev + 1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 font-semibold text-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                <span>Hallelujah ({praiseCount})</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('prayer')}
                className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
              >
                Request Live Prayer
              </button>
              <button
                onClick={() => onNavigate('giving')}
                className="px-4 py-2 rounded-lg bg-[#fbbf24] hover:bg-[#f59e0b] text-[#043e32] font-bold text-xs shadow transition-colors cursor-pointer"
              >
                Online Offering
              </button>
            </div>
          </div>
        </div>

        {/* Live Sanctuary Fellowship Chat (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-lg flex flex-col h-[520px] overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#043e32]" />
              <h4 className="text-sm font-bold text-[#043e32]">
                Church Live Fellowship
              </h4>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Moderated</span>
          </div>

          {/* Messages scroll area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {liveChatMessages.map((msg) => (
              <div key={msg.id} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#043e32]">{msg.user}</span>
                  <span className="text-[10px] text-slate-400">{msg.time}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Chat input form */}
          <form onSubmit={handleSendChat} className="p-3 border-t border-slate-200 bg-slate-50">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Share a word of encouragement..."
                value={newChatInput}
                onChange={(e) => setNewChatInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#043e32]"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-[#fbbf24] hover:bg-[#f59e0b] text-[#043e32] font-bold transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[10px] text-slate-400 mt-1.5 text-center">
              Keep comments respectful and Christ-centered.
            </div>
          </form>
        </div>
      </div>

      {/* Order of Service & Schedule Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order of Worship */}
        <div className="bg-stone-50 rounded-xl border border-stone-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-amber-600" />
            <h3 className="font-cinzel text-lg font-bold text-stone-900">
              Order of Worship Service
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { time: '11:15 AM', item: 'Prelude & Opening Call to Worship', status: 'completed' },
              { time: '11:25 AM', item: 'Praise & Congregational Worship', status: 'completed' },
              { time: '11:45 AM', item: 'Pastoral Greetings & Ministry Announcements', status: 'current' },
              { time: '11:55 AM', item: 'Sermon: Unshakable Faith in Shifting Times', status: 'upcoming' },
              { time: '12:35 PM', item: 'Ministry at the Altar & Corporate Prayer', status: 'upcoming' },
              { time: '12:45 PM', item: 'Benediction & Postlude', status: 'upcoming' },
            ].map((step, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-stone-200 last:border-0">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${
                    step.status === 'completed' ? 'bg-emerald-500' :
                    step.status === 'current' ? 'bg-amber-500 animate-ping' : 'bg-stone-300'
                  }`} />
                  <span className={`font-medium ${step.status === 'current' ? 'text-amber-900 font-bold' : 'text-stone-700'}`}>
                    {step.item}
                  </span>
                </div>
                <span className="font-mono text-stone-400 text-[11px]">{step.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Broadcast Schedule */}
        <div className="bg-stone-50 rounded-xl border border-stone-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-amber-600" />
            <h3 className="font-cinzel text-lg font-bold text-stone-900">
              Broadcast Times & Locations
            </h3>
          </div>
          <div className="space-y-3 text-xs">
            {CHURCH_INFO.serviceTimes.map((service, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-stone-200">
                <div className="font-bold text-stone-900">{service.name}</div>
                <div className="text-amber-700 font-medium mt-0.5">{service.time}</div>
                <div className="text-stone-500 text-[11px] mt-0.5">{service.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

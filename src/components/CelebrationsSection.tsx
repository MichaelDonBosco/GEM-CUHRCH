import React, { useState, useEffect } from 'react';
import { 
  Cake, 
  Heart, 
  Bell, 
  Phone, 
  MessageCircle, 
  Plus, 
  Search, 
  Calendar, 
  Sparkles, 
  Check, 
  User, 
  MapPin, 
  Share2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { BelieverCelebration } from '../types';
import { INITIAL_CELEBRATIONS } from '../data/mockChurchData';

const STORAGE_KEY = 'gem_church_believer_celebrations_v1';
const NOTIF_STORAGE_KEY = 'gem_church_celebrations_reminder_enabled';

export const CelebrationsSection: React.FC = () => {
  const [celebrations, setCelebrations] = useState<BelieverCelebration[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CELEBRATIONS;
  });

  const [reminderEnabled, setReminderEnabled] = useState<boolean>(() => {
    return localStorage.getItem(NOTIF_STORAGE_KEY) === 'true';
  });

  const [filterView, setFilterView] = useState<'today' | 'week' | 'month' | 'all'>('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [justBlessedId, setJustBlessedId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    type: 'birthday' as 'birthday' | 'anniversary',
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    year: '',
    phone: '',
    area: '',
    spouseName: '',
    notes: ''
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(celebrations));
    } catch (e) {
      console.error(e);
    }
  }, [celebrations]);

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Helper to check if celebration is today
  const isToday = (cel: BelieverCelebration) => cel.month === currentMonth && cel.day === currentDay;

  // Filter celebrations
  const todayCelebrations = celebrations.filter(isToday);

  const filteredCelebrations = celebrations.filter((cel) => {
    const matchesSearch = 
      cel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cel.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cel.spouseName && cel.spouseName.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterView === 'today') {
      return isToday(cel);
    }
    if (filterView === 'week') {
      // within next 7 days in same month or next
      const diff = cel.day - currentDay;
      return cel.month === currentMonth && diff >= 0 && diff <= 7;
    }
    if (filterView === 'month') {
      return cel.month === currentMonth;
    }
    return true;
  });

  // Enable mobile reminders
  const handleToggleReminder = async () => {
    if (!reminderEnabled) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          new Notification('GEM Church Celebrations Reminder Active! 🔔', {
            body: `You will be notified of church believer birthdays and wedding anniversaries every morning. Today there are ${todayCelebrations.length} celebrations!`,
            icon: '/favicon.ico'
          });
          setReminderEnabled(true);
          localStorage.setItem(NOTIF_STORAGE_KEY, 'true');
        } else {
          alert('Please enable notifications in your mobile browser settings to receive daily birthday reminders.');
        }
      } else {
        setReminderEnabled(true);
        localStorage.setItem(NOTIF_STORAGE_KEY, 'true');
      }
    } else {
      setReminderEnabled(false);
      localStorage.setItem(NOTIF_STORAGE_KEY, 'false');
    }
  };

  // Add new celebration
  const handleAddCelebration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newEntry: BelieverCelebration = {
      id: `cel-user-${Date.now()}`,
      name: formData.name.trim(),
      type: formData.type,
      month: Number(formData.month),
      day: Number(formData.day),
      year: formData.year ? Number(formData.year) : undefined,
      phone: formData.phone.trim() || '+91 99943 01540',
      area: formData.area.trim() || 'Tuticorin',
      spouseName: formData.type === 'anniversary' ? formData.spouseName.trim() : undefined,
      notes: formData.notes.trim(),
      wishesCount: 1,
      isRegisteredByUser: true
    };

    setCelebrations(prev => [newEntry, ...prev]);
    setShowAddModal(false);
    setFormData({
      name: '',
      type: 'birthday',
      month: currentMonth,
      day: currentDay,
      year: '',
      phone: '',
      area: '',
      spouseName: '',
      notes: ''
    });
  };

  // Bless / Send Wish counter
  const handleBless = (id: string) => {
    setCelebrations(prev => prev.map(c => c.id === id ? { ...c, wishesCount: c.wishesCount + 1 } : c));
    setJustBlessedId(id);
    setTimeout(() => setJustBlessedId(null), 2500);
  };

  // Generate WhatsApp Message
  const getWhatsAppLink = (cel: BelieverCelebration) => {
    const cleanPhone = cel.phone.replace(/[^0-9]/g, '');
    const greeting = cel.type === 'birthday' 
      ? `🎉 Blessed Birthday Greetings from GEM Church Tuticorin!`
      : `💍 Happy Wedding Anniversary Greetings from GEM Church Tuticorin!`;
    const verse = `"The LORD bless thee, and keep thee: The LORD make his face shine upon thee..." — Numbers 6:24-26\n\nMay God fill your home with peace, health, and abundant joy. Prayers from Rev. L. Navaratnam & church family!`;
    const message = encodeURIComponent(`${greeting}\n\nDear ${cel.name},\n\n${verse}`);
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  return (
    <section className="py-12 bg-[#011712] text-slate-100 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute -top-24 left-1/3 w-96 h-96 bg-[#043e32]/40 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#fbbf24]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#043e32] border border-[#fbbf24]/40 text-[#fbbf24] text-xs font-bold uppercase tracking-wider mb-3">
            <Cake className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Church Family Care & Fellowship</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wide">
            Believer Birthday & Anniversary Reminders
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl mx-auto">
            Remembering and lifting up our GEM Church family on their special day. Send WhatsApp prayers, make pastoral calls, or register member dates.
          </p>

          {/* Action Bar: Mobile Reminder & Add Provision */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={handleToggleReminder}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                reminderEnabled
                  ? 'bg-emerald-600 text-white border border-emerald-400'
                  : 'bg-[#02241d] text-[#fbbf24] border border-[#065f46] hover:bg-[#032f26]'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>{reminderEnabled ? 'Mobile Reminder Active ✓' : 'Turn On Mobile Reminder'}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fbbf24] hover:bg-[#f59e0b] text-[#043e32] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Member Date</span>
            </button>
          </div>
        </div>

        {/* Today's Spotlight Banner */}
        <div className="mb-10 bg-gradient-to-r from-[#043e32] via-[#02241d] to-[#043e32] rounded-2xl p-6 border-2 border-[#fbbf24]/50 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#065f46] pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fbbf24] text-[#043e32] flex items-center justify-center font-bold flex-shrink-0">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#fbbf24]">
                  TODAY'S CHURCH CELEBRATIONS • {today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  {todayCelebrations.length > 0 
                    ? `${todayCelebrations.length} Believer Celebrations Today!` 
                    : 'No church birthdays or anniversaries recorded for today'}
                </h3>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700">
              Send pastoral wishes & blessings
            </span>
          </div>

          {/* Today Celebrants Cards */}
          {todayCelebrations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todayCelebrations.map((cel) => (
                <div 
                  key={cel.id}
                  className="bg-[#011712]/90 rounded-xl p-4 border border-[#065f46] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#fbbf24]/60 transition-all shadow-inner"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#fbbf24] bg-stone-800 flex-shrink-0">
                      {cel.photoUrl ? (
                        <img src={cel.photoUrl} alt={cel.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#fbbf24]">
                          <User className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          cel.type === 'birthday' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
                        }`}>
                          {cel.type === 'birthday' ? '🎂 Birthday Today' : '💍 Wedding Anniversary'}
                        </span>
                      </div>
                      <h4 className="font-cinzel text-base font-bold text-white mt-1">
                        {cel.name}
                      </h4>
                      <p className="text-xs text-emerald-200/80 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#fbbf24]" />
                        <span>{cel.area}</span>
                      </p>
                      {cel.notes && <p className="text-[11px] text-slate-400 mt-0.5 italic">{cel.notes}</p>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto">
                    <a
                      href={getWhatsAppLink(cel)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${cel.phone}`}
                      className="flex-1 sm:flex-none py-1.5 px-3 rounded-lg bg-[#043e32] hover:bg-[#065f46] text-[#fbbf24] text-xs font-bold uppercase tracking-wider border border-[#065f46] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                    <button
                      onClick={() => handleBless(cel.id)}
                      className="py-1 px-2 text-[10px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Heart className={`w-3 h-3 ${justBlessedId === cel.id ? 'fill-rose-500 text-rose-500 scale-125' : 'text-rose-400'}`} />
                      <span>{cel.wishesCount} Blessings</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-2">
              Use the "Add Member Date" button above to register believer birthdays and anniversaries.
            </p>
          )}
        </div>

        {/* Directory Controls & Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-[#02241d] p-1 rounded-xl border border-[#065f46] overflow-x-auto w-full sm:w-auto">
            {(['today', 'week', 'month', 'all'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setFilterView(view)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  filterView === view
                    ? 'bg-[#043e32] text-[#fbbf24] shadow-sm border border-[#fbbf24]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {view === 'today' && "Today's"}
                {view === 'week' && 'This Week'}
                {view === 'month' && 'This Month'}
                {view === 'all' && 'All Believers'}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search member or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-[#02241d] border border-[#065f46] text-white placeholder-slate-400 focus:outline-none focus:border-[#fbbf24]"
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCelebrations.map((item) => (
            <div 
              key={item.id}
              className="bg-[#02241d]/90 rounded-xl p-4 border border-[#065f46] hover:border-[#fbbf24]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    item.type === 'birthday' ? 'bg-amber-400/20 text-amber-300' : 'bg-rose-400/20 text-rose-300'
                  }`}>
                    {item.type === 'birthday' ? '🎂 Birthday' : '💍 Anniversary'}
                  </span>
                  <span className="text-xs font-bold text-[#fbbf24] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(2026, item.month - 1, item.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </span>
                </div>

                <h4 className="font-cinzel text-base font-bold text-white">{item.name}</h4>
                {item.spouseName && (
                  <div className="text-xs text-rose-200">With {item.spouseName}</div>
                )}
                <div className="text-xs text-emerald-200/80 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-[#fbbf24]" />
                  <span>{item.area}</span>
                </div>
                {item.notes && <p className="text-[11px] text-slate-400 mt-1 italic">{item.notes}</p>}
              </div>

              <div className="mt-4 pt-3 border-t border-[#065f46]/60 flex items-center justify-between gap-2">
                <a
                  href={getWhatsAppLink(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-2 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1 transition-colors"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Wish</span>
                </a>
                <a
                  href={`tel:${item.phone}`}
                  className="py-1.5 px-3 rounded-lg bg-[#043e32] hover:bg-[#065f46] text-[#fbbf24] text-[11px] font-bold border border-[#065f46] flex items-center justify-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Add Member Modal Provision */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#02241d] rounded-2xl max-w-md w-full p-6 border border-[#fbbf24]/40 shadow-2xl text-white">
              <h3 className="font-cinzel text-xl font-bold text-[#fbbf24] uppercase tracking-wider mb-1">
                Register Believer Date
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Add church member's birthday or wedding anniversary for pastoral prayers and mobile reminders.
              </p>

              <form onSubmit={handleAddCelebration} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Event Type *</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'birthday' })}
                      className={`py-2 rounded-lg border font-bold uppercase tracking-wider ${
                        formData.type === 'birthday' ? 'bg-[#fbbf24] text-[#043e32] border-[#fbbf24]' : 'bg-[#011712] text-slate-300 border-[#065f46]'
                      }`}
                    >
                      Birthday
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'anniversary' })}
                      className={`py-2 rounded-lg border font-bold uppercase tracking-wider ${
                        formData.type === 'anniversary' ? 'bg-[#fbbf24] text-[#043e32] border-[#fbbf24]' : 'bg-[#011712] text-slate-300 border-[#065f46]'
                      }`}
                    >
                      Anniversary
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Member Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bro. David Navamani"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#011712] border border-[#065f46] text-white focus:outline-none focus:border-[#fbbf24]"
                  />
                </div>

                {formData.type === 'anniversary' && (
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Spouse Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sis. Esther Rathnam"
                      value={formData.spouseName}
                      onChange={(e) => setFormData({ ...formData, spouseName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#011712] border border-[#065f46] text-white focus:outline-none focus:border-[#fbbf24]"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Month *</label>
                    <select
                      value={formData.month}
                      onChange={(e) => setFormData({ ...formData, month: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-[#011712] border border-[#065f46] text-white focus:outline-none focus:border-[#fbbf24]"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                        <option key={m} value={m}>
                          {new Date(2026, m - 1, 1).toLocaleDateString('en-US', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Day *</label>
                    <select
                      value={formData.day}
                      onChange={(e) => setFormData({ ...formData, day: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-[#011712] border border-[#065f46] text-white focus:outline-none focus:border-[#fbbf24]"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mobile / WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="+91 99943 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#011712] border border-[#065f46] text-white focus:outline-none focus:border-[#fbbf24]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Area / Cell Group</label>
                  <input
                    type="text"
                    placeholder="e.g. SundaravelPuram, Tuticorin"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#011712] border border-[#065f46] text-white focus:outline-none focus:border-[#fbbf24]"
                  />
                </div>

                <div className="pt-3 border-t border-[#065f46] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#fbbf24] text-[#043e32] font-bold uppercase tracking-wider hover:bg-[#f59e0b] cursor-pointer"
                  >
                    Save Date
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

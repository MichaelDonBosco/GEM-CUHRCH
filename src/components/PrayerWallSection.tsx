import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Plus, 
  Filter,
  MessageCircle
} from 'lucide-react';
import { PrayerRequest } from '../types';

interface PrayerWallSectionProps {
  prayers: PrayerRequest[];
  onAddPrayer: (prayer: PrayerRequest) => void;
  onTogglePrayed: (id: string) => void;
}

export const PrayerWallSection: React.FC<PrayerWallSectionProps> = ({
  prayers,
  onAddPrayer,
  onTogglePrayed
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [authorName, setAuthorName] = useState<string>('');
  const [requestCategory, setRequestCategory] = useState<PrayerRequest['category']>('Healing');
  const [requestContent, setRequestContent] = useState<string>('');
  const [confidentialOnly, setConfidentialOnly] = useState<boolean>(false);
  const [submittedNotification, setSubmittedNotification] = useState<boolean>(false);

  const categories = ['All', 'Healing', 'Family', 'Faith & Guidance', 'Financial & Provision', 'Thanksgiving'];

  const filteredPrayers = prayers.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  const handleSubmitPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestContent.trim()) return;

    const newPrayer: PrayerRequest = {
      id: `prayer-${Date.now()}`,
      author: isAnonymous ? 'Anonymous Believer' : (authorName.trim() || 'A Member of GEM'),
      isAnonymous,
      category: requestCategory,
      content: requestContent.trim(),
      timestamp: 'Just now',
      prayersCount: 1,
      hasPrayed: true,
      isAnswered: requestCategory === 'Thanksgiving'
    };

    onAddPrayer(newPrayer);
    setAuthorName('');
    setRequestContent('');
    setIsAnonymous(false);
    setShowSubmitModal(false);
    setSubmittedNotification(true);
    setTimeout(() => setSubmittedNotification(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#043e32]/10 text-[#043e32] mb-2">
            <Heart className="w-3.5 h-3.5 text-[#043e32] fill-[#043e32]/30" />
            <span>Standing In The Gap</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#043e32]">
            Community Prayer Wall
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            “Bear one another’s burdens, and so fulfill the law of Christ.” — Galatians 6:2
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#fbbf24] hover:bg-[#f59e0b] text-[#043e32] font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Post Prayer Request</span>
        </button>
      </div>

      {/* Success Banner */}
      {submittedNotification && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <span className="font-bold">Your prayer request has been received!</span> Our pastoral intercession team and church family are joining in prayer with you.
          </div>
        </div>
      )}

      {/* Categories Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        <Filter className="w-4 h-4 text-stone-400 mr-1 flex-shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#043e32] text-[#fbbf24] font-semibold shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prayer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrayers.map((prayer) => (
          <div
            key={prayer.id}
            className={`bg-white rounded-xl border p-6 shadow-sm flex flex-col justify-between transition-all ${
              prayer.isAnswered
                ? 'border-emerald-300 bg-emerald-50/20'
                : 'border-stone-200 hover:border-amber-400/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                    prayer.isAnswered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {prayer.isAnswered ? 'Answered Praise' : prayer.category}
                  </span>
                  {prayer.isAnswered && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Praise Report
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-stone-400">{prayer.timestamp}</span>
              </div>

              <div className="text-xs font-bold text-stone-900 mb-2">
                {prayer.author}
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-scripture italic">
                “{prayer.content}”
              </p>

              {prayer.answeredTestimony && (
                <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900">
                  <span className="font-bold block mb-0.5">Testimony:</span>
                  {prayer.answeredTestimony}
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onTogglePrayed(prayer.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    prayer.hasPrayed
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${prayer.hasPrayed ? 'fill-rose-600 text-rose-600' : 'text-stone-500'}`} />
                  <span>{prayer.hasPrayed ? 'Prayed' : 'I Prayed For This'}</span>
                </button>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `🕊️ *Prayer Request from GEM Church Community*\n\n"${prayer.content}"\n— ${prayer.author} (${prayer.category})\n\nJoin us in lifting this prayer: https://gemchurch.org`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] transition-colors"
                  title="Share Prayer Request on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>

              <span className="text-xs text-stone-500 font-medium">
                {prayer.prayersCount} prayers lifted
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Prayer Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-cinzel text-2xl font-bold text-stone-900 mb-2">
              Submit a Prayer Request
            </h3>
            <p className="text-xs text-stone-600 mb-6">
              Our pastoral staff and intercession team pray over each request with faith and reverence.
            </p>

            <form onSubmit={handleSubmitPrayer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={requestCategory}
                  onChange={(e) => setRequestCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Healing">Healing & Health</option>
                  <option value="Family">Family & Relationships</option>
                  <option value="Faith & Guidance">Faith & Spiritual Guidance</option>
                  <option value="Financial & Provision">Financial & Provision</option>
                  <option value="Thanksgiving">Thanksgiving & Praise Report</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. John D. (or leave blank if anonymous)"
                  value={authorName}
                  disabled={isAnonymous}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                />
                <label htmlFor="anonCheck" className="text-xs text-stone-600 cursor-pointer select-none">
                  Keep my name completely anonymous on the community wall
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Prayer Need or Praise Report
                </label>
                <textarea
                  required
                  rows={4}
                  value={requestContent}
                  onChange={(e) => setRequestContent(e.target.value)}
                  placeholder="Share details of what you are trusting God for..."
                  className="w-full p-3 text-xs rounded-lg border border-stone-300 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 bg-stone-50 p-3 rounded-lg border border-stone-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-[11px] text-stone-600">
                  All requests are reviewed with respect, love, and discretion.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#fbbf24] hover:bg-[#f59e0b] text-[#043e32] font-bold text-xs shadow transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

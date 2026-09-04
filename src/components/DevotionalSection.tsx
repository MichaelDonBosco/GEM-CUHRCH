import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Heart, 
  Bookmark, 
  Calendar, 
  Search,
  Quote
} from 'lucide-react';
import { Devotional } from '../types';

interface DevotionalSectionProps {
  devotionals: Devotional[];
}

const TOPICAL_VERSES = [
  {
    theme: 'Grace',
    ref: 'Ephesians 2:8-9',
    verse: '“For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.”'
  },
  {
    theme: 'Peace',
    ref: 'Philippians 4:6-7',
    verse: '“Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.”'
  },
  {
    theme: 'Strength',
    ref: 'Isaiah 40:31',
    verse: '“But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.”'
  },
  {
    theme: 'Wisdom',
    ref: 'James 1:5',
    verse: '“If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.”'
  },
  {
    theme: 'Healing',
    ref: 'Jeremiah 17:14',
    verse: '“Heal me, Lord, and I will be healed; save me and I will be saved, for you are the one I praise.”'
  },
  {
    theme: 'Provision',
    ref: 'Matthew 6:33',
    verse: '“But seek first his kingdom and his righteousness, and all these things will be given to you as well.”'
  }
];

export const DevotionalSection: React.FC<DevotionalSectionProps> = ({ devotionals }) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [copiedVerse, setCopiedVerse] = useState<string | null>(null);

  const activeDevotional = devotionals[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVerse(id);
    setTimeout(() => setCopiedVerse(null), 2000);
  };

  const filteredVerses = selectedTheme === 'All' 
    ? TOPICAL_VERSES 
    : TOPICAL_VERSES.filter(v => v.theme === selectedTheme);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left border-b border-stone-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#043e32]/10 text-[#043e32] mb-2">
          <BookOpen className="w-3.5 h-3.5 text-[#043e32]" />
          <span>Daily Bread & Scripture</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#043e32]">
          Daily Devotional & Scripture Anchor
        </h2>
        <p className="text-stone-600 text-sm mt-1">
          Start each morning anchored in God’s infallible Word and Spirit-filled reflections.
        </p>
      </div>

      {/* Featured Today's Devotional Card */}
      <div className="bg-[#011712] text-stone-100 rounded-2xl overflow-hidden shadow-xl border border-[#065f46] p-6 sm:p-10 mb-12 relative">
        <div className="max-w-4xl relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/30">
              {activeDevotional.theme} • {activeDevotional.date}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(`${activeDevotional.scriptureReference}\n${activeDevotional.scriptureVerse}\n\n${activeDevotional.reflection}\n\nPrayer:\n${activeDevotional.prayer}`, 'featured')}
                className="p-2 rounded-lg bg-[#02241d] hover:bg-[#065f46] text-slate-200 hover:text-[#fbbf24] text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-[#065f46]"
              >
                {copiedVerse === 'featured' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedVerse === 'featured' ? 'Copied' : 'Copy Devotional'}</span>
              </button>
            </div>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-4">
            {activeDevotional.title}
          </h3>

          {/* Scripture Verse Quote Card */}
          <div className="bg-[#02241d] border-l-4 border-[#fbbf24] rounded-r-xl p-5 sm:p-6 mb-6">
            <Quote className="w-6 h-6 text-[#fbbf24]/60 mb-2" />
            <p className="font-scripture italic text-lg sm:text-xl text-emerald-100 leading-relaxed">
              {activeDevotional.scriptureVerse}
            </p>
            <div className="text-right text-xs font-bold uppercase tracking-wider text-[#fbbf24] mt-2">
              — {activeDevotional.scriptureReference}
            </div>
          </div>

          {/* Reflection Body */}
          <div className="mb-6 space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#fbbf24] mb-1">
              Spiritual Reflection
            </h4>
            <p>{activeDevotional.reflection}</p>
          </div>

          {/* Guided Prayer */}
          <div className="p-4 bg-[#02241d] rounded-xl border border-[#065f46] mb-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#fbbf24] mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Prayer for Today
            </div>
            <p className="font-scripture italic text-xs sm:text-sm text-emerald-100 leading-relaxed">
              {activeDevotional.prayer}
            </p>
          </div>

          <div className="text-[11px] text-emerald-200/70 font-medium">
            Written by {activeDevotional.author} • GEM Church Pastoral Team
          </div>
        </div>
      </div>

      {/* Scripture by Topic Explorer */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-cinzel text-2xl font-bold text-[#043e32]">
              Scripture Promises by Topic
            </h3>
            <p className="text-xs text-stone-600">
              Find encouraging verses tailored for whatever circumstance you are walking through today.
            </p>
          </div>

          {/* Theme Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {['All', 'Grace', 'Peace', 'Strength', 'Wisdom', 'Healing', 'Provision'].map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedTheme === theme
                    ? 'bg-[#043e32] text-[#fbbf24] font-semibold shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVerses.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm hover:border-amber-400/60 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                    {item.theme}
                  </span>
                  <button
                    onClick={() => handleCopy(`${item.verse} (${item.ref})`, `verse-${idx}`)}
                    className="p-1 rounded text-stone-400 hover:text-amber-700 transition-colors cursor-pointer"
                    title="Copy verse"
                  >
                    {copiedVerse === `verse-${idx}` ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="font-scripture italic text-sm text-stone-800 leading-relaxed mb-3">
                  {item.verse}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 text-right">
                <span className="text-xs font-bold text-amber-800">
                  {item.ref}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

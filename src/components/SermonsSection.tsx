import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Bookmark, 
  Download, 
  Copy, 
  Check, 
  Share2, 
  BookOpen, 
  Filter, 
  Clock, 
  Calendar, 
  Sparkles,
  Search
} from 'lucide-react';
import { Sermon } from '../types';

interface SermonsSectionProps {
  sermons: Sermon[];
  selectedSermonId?: string;
  onSelectSermon: (id: string) => void;
}

export const SermonsSection: React.FC<SermonsSectionProps> = ({
  sermons,
  selectedSermonId,
  onSelectSermon
}) => {
  const [activeSeries, setActiveSeries] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [userNotes, setUserNotes] = useState<string>('');
  const [copiedNotes, setCopiedNotes] = useState<boolean>(false);

  const activeSermon = sermons.find(s => s.id === selectedSermonId) || sermons[0];

  const seriesList = ['All', ...Array.from(new Set(sermons.map(s => s.series)))];

  const filteredSermons = sermons.filter(sermon => {
    const matchesSeries = activeSeries === 'All' || sermon.series === activeSeries;
    const matchesSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sermon.scripture.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeries && matchesSearch;
  });

  const handleCopyNotes = () => {
    const fullNotes = `GEM CHURCH SERMON NOTES\n` +
      `Title: ${activeSermon.title}\n` +
      `Speaker: ${activeSermon.speaker} (${activeSermon.speakerRole})\n` +
      `Date: ${activeSermon.date}\n` +
      `Scripture: ${activeSermon.scripture}\n\n` +
      `Key Points:\n` +
      activeSermon.keyPoints.map((kp, i) => `${i + 1}. ${kp}`).join('\n') +
      `\n\nPersonal Notes:\n${userNotes || '(No personal notes added)'}`;

    navigator.clipboard.writeText(fullNotes);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
  };

  const handleDownloadNotes = () => {
    const fullNotes = `GEM CHURCH SERMON NOTES\n` +
      `Title: ${activeSermon.title}\n` +
      `Speaker: ${activeSermon.speaker} (${activeSermon.speakerRole})\n` +
      `Date: ${activeSermon.date}\n` +
      `Scripture: ${activeSermon.scripture}\n\n` +
      `Key Points:\n` +
      activeSermon.keyPoints.map((kp, i) => `${i + 1}. ${kp}`).join('\n') +
      `\n\nPersonal Notes:\n${userNotes || '(No personal notes added)'}`;

    const blob = new Blob([fullNotes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeSermon.title.replace(/\s+/g, '_')}_Notes.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Title Header */}
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#043e32]/10 text-[#043e32] mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#043e32]" />
            <span>Spiritual Nourishment</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#043e32]">
            Sermon Archive & Messages
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Immerse in biblically grounded teachings by Rev. L. Navaratnam and the GEM pastoral team.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search speaker, topic, verse..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-stone-300 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#043e32] focus:border-transparent"
          />
        </div>
      </div>

      {/* Featured Sermon Player & Digital Notepad */}
      <div className="bg-[#011712] text-stone-100 rounded-2xl overflow-hidden shadow-2xl border border-[#065f46] mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Media Player Column (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#065f46]/70">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/30">
                  {activeSermon.series} Series
                </span>
                <span className="text-xs text-emerald-200/70 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeSermon.date}
                </span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-2 leading-snug">
                {activeSermon.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-[#fbbf24] font-medium mb-4">
                <span>By {activeSermon.speaker}</span>
                <span>•</span>
                <span className="text-emerald-100/70">{activeSermon.speakerRole}</span>
              </div>

              {/* Scripture Highlight Box */}
              <div className="bg-[#02241d] border border-[#065f46] rounded-xl p-4 mb-6">
                <div className="text-[11px] uppercase tracking-wider text-[#fbbf24] font-semibold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Scripture Anchor
                </div>
                <div className="font-scripture text-lg text-emerald-100 italic">
                  {activeSermon.scripture}
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                {activeSermon.description}
              </p>

              {/* Key Highlights */}
              <div className="mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-200/80 mb-2">
                  Key Takeaways
                </div>
                <ul className="space-y-1.5">
                  {activeSermon.keyPoints.map((point, index) => (
                    <li key={index} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#fbbf24]/20 text-[#fbbf24] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Audio Simulation Controls */}
            <div className="bg-[#02241d] p-4 rounded-xl border border-[#065f46] mt-4">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#043e32] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer font-bold"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {isPlaying ? 'Playing Audio Sermon...' : 'Listen to Message Audio'}
                    </div>
                    <div className="text-[11px] text-emerald-200/70 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{activeSermon.duration}</span>
                      <span>•</span>
                      <span>Audio High Fidelity</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {[1, 1.25, 1.5].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2 py-1 rounded text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                        playbackSpeed === spd
                          ? 'bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#011712] h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#fbbf24] h-full rounded-full transition-all duration-300"
                  style={{ width: isPlaying ? '42%' : '0%' }}
                />
              </div>
            </div>
          </div>

          {/* Digital Sermon Notepad (5 cols) */}
          <div className="lg:col-span-5 bg-[#021f19]/90 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#fbbf24]" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Interactive Sermon Notepad
                  </h4>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleCopyNotes}
                    className="p-1.5 rounded hover:bg-[#065f46] text-slate-400 hover:text-[#fbbf24] transition-colors cursor-pointer"
                    title="Copy full notes"
                  >
                    {copiedNotes ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleDownloadNotes}
                    className="p-1.5 rounded hover:bg-[#065f46] text-slate-400 hover:text-[#fbbf24] transition-colors cursor-pointer"
                    title="Download notes file"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-emerald-100/70 mb-3">
                Jot down Holy Spirit revelations, personal insights, and commitments during this message:
              </p>

              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder={`Type your notes here...\n\nExample:\n• What God spoke to my heart today\n• Action item for this week\n• People to pray for`}
                className="w-full h-64 p-3.5 bg-[#011712] border border-[#065f46] rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#fbbf24]/50 resize-none font-mono leading-relaxed"
              />
            </div>

            <div className="pt-4 border-t border-[#065f46] flex items-center justify-between text-xs text-slate-400">
              <span>Auto-saved in browser</span>
              <button
                onClick={handleCopyNotes}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fbbf24] hover:bg-[#f59e0b] text-[#043e32] font-semibold text-xs transition-colors cursor-pointer"
              >
                {copiedNotes ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#043e32]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Notes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Series Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        <Filter className="w-4 h-4 text-stone-400 mr-1 flex-shrink-0" />
        {seriesList.map((series) => (
          <button
            key={series}
            onClick={() => setActiveSeries(series)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeSeries === series
                ? 'bg-stone-900 text-amber-400 shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
          >
            {series}
          </button>
        ))}
      </div>

      {/* Sermons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSermons.map((sermon) => {
          const isSelected = sermon.id === activeSermon.id;
          return (
            <div
              key={sermon.id}
              onClick={() => {
                onSelectSermon(sermon.id);
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className={`group bg-white rounded-xl border p-5 shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                  : 'border-stone-200 hover:border-stone-300 hover:shadow'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] text-stone-500 mb-2">
                  <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {sermon.series}
                  </span>
                  <span>{sermon.date}</span>
                </div>

                <h4 className="font-cinzel text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                  {sermon.title}
                </h4>

                <p className="text-xs font-medium text-stone-700 mt-1">
                  {sermon.speaker}
                </p>

                <p className="font-scripture italic text-xs text-amber-800 mt-2 line-clamp-1">
                  {sermon.scripture}
                </p>

                <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                  {sermon.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {sermon.duration}
                </span>
                <span className="font-semibold text-amber-700 group-hover:underline flex items-center gap-1">
                  {isSelected ? 'Currently Loaded' : 'Listen / Notes'}
                  <Play className="w-3 h-3 fill-current" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

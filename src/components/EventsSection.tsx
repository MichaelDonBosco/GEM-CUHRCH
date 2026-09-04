import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Check, 
  Plus, 
  Share2, 
  Sparkles, 
  Filter,
  Users,
  Bell
} from 'lucide-react';
import { ChurchEvent } from '../types';

interface EventsSectionProps {
  events: ChurchEvent[];
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [rsvpedEvents, setRsvpedEvents] = useState<Record<string, boolean>>({});
  const [rsvpCounts, setRsvpCounts] = useState<Record<string, number>>(
    events.reduce((acc, ev) => ({ ...acc, [ev.id]: ev.rsvpCount }), {})
  );

  const categories = ['All', 'Worship', 'Youth', 'Prayer', 'Community', 'Bible Study'];

  const filteredEvents = events.filter(ev => 
    selectedCategory === 'All' || ev.category === selectedCategory
  );

  const handleToggleRsvp = (eventId: string) => {
    const isCurrentlyRsvped = !!rsvpedEvents[eventId];
    setRsvpedEvents(prev => ({ ...prev, [eventId]: !isCurrentlyRsvped }));
    setRsvpCounts(prev => ({
      ...prev,
      [eventId]: (prev[eventId] || 0) + (isCurrentlyRsvped ? -1 : 1)
    }));
  };

  const handleAddToCalendar = (ev: ChurchEvent) => {
    const icsContent = 
      `BEGIN:VCALENDAR\n` +
      `VERSION:2.0\n` +
      `PRODID:-//GEM Church//Event//EN\n` +
      `BEGIN:VEVENT\n` +
      `SUMMARY:${ev.title}\n` +
      `DESCRIPTION:${ev.description}\n` +
      `LOCATION:${ev.location}\n` +
      `END:VEVENT\n` +
      `END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ev.title.replace(/\s+/g, '_')}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const featuredEvent = events.find(e => e.featured) || events[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#043e32]/10 text-[#043e32] mb-2">
            <Calendar className="w-3.5 h-3.5 text-[#043e32]" />
            <span>Fellowship & Ministry</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#043e32]">
            Upcoming Church Gatherings
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Grow deeper in faith, connect with community, and serve together in Tuticorin and mission fields.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#043e32] text-[#fbbf24] font-semibold shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Banner Event */}
      {featuredEvent && (
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#011712] via-[#043e32] to-[#011712] text-white p-6 sm:p-10 mb-12 shadow-xl border border-[#065f46]">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/30 uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
              Featured Gathering of the Season
            </div>
            <h3 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white mb-3">
              {featuredEvent.title}
            </h3>
            <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed mb-6">
              {featuredEvent.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-xs text-stone-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#fbbf24]" />
                <span>{featuredEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#fbbf24]" />
                <span>{featuredEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#fbbf24]" />
                <span>{featuredEvent.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleToggleRsvp(featuredEvent.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  rsvpedEvents[featuredEvent.id]
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-[#fbbf24] hover:bg-[#f59e0b] text-[#043e32]'
                }`}
              >
                {rsvpedEvents[featuredEvent.id] ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>You’re Registered!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Reserve Free Seat</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleAddToCalendar(featuredEvent)}
                className="px-4 py-2.5 rounded-xl bg-[#02241d] hover:bg-[#065f46] text-emerald-100 text-xs font-medium border border-[#065f46] transition-colors cursor-pointer flex items-center gap-2"
              >
                <Bell className="w-4 h-4 text-[#fbbf24]" />
                <span>Add to Calendar</span>
              </button>

              <span className="text-xs text-emerald-200/80 font-medium ml-2">
                {rsvpCounts[featuredEvent.id]} Attending
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((ev) => {
          const isRsvped = !!rsvpedEvents[ev.id];
          return (
            <div
              key={ev.id}
              className="bg-white rounded-xl border border-stone-200 hover:border-amber-400/60 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    {ev.category}
                  </span>
                  <span className="text-[11px] text-stone-500 flex items-center gap-1 font-medium">
                    <Users className="w-3.5 h-3.5 text-stone-400" />
                    {rsvpCounts[ev.id] || ev.rsvpCount} Attending
                  </span>
                </div>

                <h4 className="font-cinzel text-lg font-bold text-stone-900 mb-2 leading-snug">
                  {ev.title}
                </h4>

                <p className="text-xs text-stone-600 mb-4 line-clamp-3 leading-relaxed">
                  {ev.description}
                </p>

                <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span className="font-medium">{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span className="truncate">{ev.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-amber-600" />
                    <span className="truncate">Led by {ev.lead}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-stone-100">
                <button
                  onClick={() => handleToggleRsvp(ev.id)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    isRsvped
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-stone-900 hover:bg-stone-800 text-stone-100'
                  }`}
                >
                  {isRsvped ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>RSVP Confirmed</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>RSVP Free</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleAddToCalendar(ev)}
                  className="p-2 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
                  title="Add to Calendar (.ics)"
                >
                  <Calendar className="w-4 h-4 text-stone-700" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

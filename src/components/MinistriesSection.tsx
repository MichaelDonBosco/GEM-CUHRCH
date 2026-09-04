import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Send
} from 'lucide-react';
import { Ministry } from '../types';

interface MinistriesSectionProps {
  ministries: Ministry[];
}

export const MinistriesSection: React.FC<MinistriesSectionProps> = ({ ministries }) => {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [interestName, setInterestName] = useState('');
  const [interestEmail, setInterestEmail] = useState('');
  const [interestPhone, setInterestPhone] = useState('');
  const [interestSubmitted, setInterestSubmitted] = useState(false);

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInterestSubmitted(true);
    setTimeout(() => {
      setInterestSubmitted(false);
      setSelectedMinistry(null);
      setInterestName('');
      setInterestEmail('');
      setInterestPhone('');
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left border-b border-stone-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#043e32]/10 text-[#043e32] mb-2">
          <Users className="w-3.5 h-3.5 text-[#043e32]" />
          <span>Body of Christ in Action</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#043e32]">
          Ministries & Life Groups
        </h2>
        <p className="text-stone-600 text-sm mt-1">
          Every member has a God-given gift. Discover where your passion intersects with church ministry.
        </p>
      </div>

      {/* Ministries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {ministries.map((min) => (
          <div
            key={min.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md hover:border-[#043e32]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#043e32]/5 text-[#043e32] border border-[#043e32]/20">
                {min.category}
              </span>

              <h3 className="font-cinzel text-xl font-bold text-[#043e32] mt-2 mb-1">
                {min.name}
              </h3>

              <p className="text-xs font-semibold text-emerald-800 mb-3">
                {min.tagline}
              </p>

              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {min.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 mb-4">
                {min.keyHighlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Meeting Info */}
              <div className="space-y-1 text-xs text-stone-500 border-t border-stone-100 pt-3 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#043e32]" />
                  <span>{min.meetingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#043e32]" />
                  <span>{min.location}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedMinistry(min)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#043e32] hover:bg-[#065f46] text-[#fbbf24] text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Get Connected</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Get Connected Interest Modal */}
      {selectedMinistry && (
        <div className="fixed inset-0 z-50 bg-[#011712]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
            {interestSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-cinzel text-xl font-bold text-[#043e32] mb-1">
                  Thank You for Connecting!
                </h3>
                <p className="text-xs text-stone-600">
                  {selectedMinistry.leader} from {selectedMinistry.name} will reach out to you shortly with upcoming gathering dates and welcoming info.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-cinzel text-xl font-bold text-[#043e32] mb-1">
                  Connect with {selectedMinistry.name}
                </h3>
                <p className="text-xs text-stone-600 mb-6">
                  Led by {selectedMinistry.leader}. Fill out this brief form to join our group chats and meeting reminders.
                </p>

                <form onSubmit={handleInterestSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={interestName}
                      onChange={(e) => setInterestName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#043e32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={interestEmail}
                      onChange={(e) => setInterestEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#043e32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 99943 00000"
                      value={interestPhone}
                      onChange={(e) => setInterestPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#043e32]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setSelectedMinistry(null)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-[#fbbf24] hover:bg-[#f59e0b] text-[#043e32] font-bold text-xs shadow transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

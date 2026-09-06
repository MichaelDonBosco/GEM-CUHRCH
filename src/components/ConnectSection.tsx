import React, { useState } from 'react';
import { 
  HeartHandshake, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Send, 
  Sparkles,
  Users,
  ShieldCheck
} from 'lucide-react';
import { CHURCH_INFO } from '../data/mockChurchData';
import { PASTOR_PHOTO_URL } from '../assets/logo';

export const ConnectSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attendeeStatus, setAttendeeStatus] = useState('first_time');
  const [contactPreference, setContactPreference] = useState('email');
  const [interests, setInterests] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const interestOptions = [
    'Join a Small Life Group',
    'Water Baptism & New Believers Class',
    'Serve on Worship & Tech Crew',
    'GEM Youth / Kids Ministry',
    'Speak with a Pastor for Counseling',
    'Volunteer at Food Pantry Outreach'
  ];

  const toggleInterest = (opt: string) => {
    setInterests(prev => 
      prev.includes(opt) ? prev.filter(item => item !== opt) : [...prev, opt]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#043e32]/10 text-[#043e32] mb-2">
          <HeartHandshake className="w-3.5 h-3.5 text-[#043e32]" />
          <span>Connect & Fellowship</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#043e32]">
          Welcome Home to GEM Church Tuty
        </h2>
        <p className="text-stone-600 text-sm mt-2">
          Whether you are exploring faith for the very first time or searching for a church home, our doors and hearts are wide open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Connect Card Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-10 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-[#043e32] mb-2">
                We Can’t Wait to Connect With You!
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
                Thank you for filling out our digital connect card, {fullName}. Our welcome team and pastoral staff will reach out via {contactPreference} with a warm greeting and next steps.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFullName('');
                  setEmail('');
                  setPhone('');
                  setNotes('');
                  setInterests([]);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#043e32] hover:bg-[#065f46] text-[#fbbf24] text-xs font-semibold transition-colors cursor-pointer"
              >
                Submit Another Connect Card
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="font-cinzel text-lg font-bold text-[#043e32]">
                  Digital Connect Card
                </h3>
                <p className="text-xs text-stone-500">
                  Let us know how we can best welcome and pray for you.
                </p>
              </div>

              {/* Status Radio */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  I am a...
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'first_time', label: 'First-Time Guest' },
                    { id: 'regular', label: 'Regular Attendee' },
                    { id: 'seeking_home', label: 'Looking for a Church Home' },
                  ].map((status) => (
                    <button
                      key={status.id}
                      type="button"
                      onClick={() => setAttendeeStatus(status.id)}
                      className={`p-2.5 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                        attendeeStatus === status.id
                          ? 'bg-amber-50 text-amber-900 border-amber-400 font-semibold'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Phone / Mobile
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Preferred Follow-Up
                  </label>
                  <select
                    value={contactPreference}
                    onChange={(e) => setContactPreference(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="text">Text Message</option>
                  </select>
                </div>
              </div>

              {/* Interests Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  I’d Like More Information About:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {interestOptions.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => toggleInterest(opt)}
                      className={`p-2.5 rounded-lg border text-xs transition-all cursor-pointer flex items-center gap-2 select-none ${
                        interests.includes(opt)
                          ? 'bg-amber-50 text-amber-900 border-amber-300 font-medium'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={interests.includes(opt)}
                        onChange={() => {}}
                        className="rounded text-amber-600 focus:ring-amber-500 pointer-events-none"
                      />
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prayer or Personal Note */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  How can our pastors pray for you or support you?
                </label>
                <textarea
                  rows={3}
                  placeholder="Feel free to share any prayer needs or questions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-[#fbbf24] hover:bg-[#f59e0b] text-[#043e32] font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Connect Card</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Location, Pastoral Leadership, Service Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pastoral Welcome Card */}
          <div className="bg-[#021f19] text-stone-100 rounded-2xl p-6 border border-[#065f46] shadow-sm">
            <h4 className="font-cinzel text-lg font-bold text-white mb-2">
              A Personal Welcome from Pastor
            </h4>
            <p className="font-scripture italic text-emerald-100/90 text-xs sm:text-sm leading-relaxed mb-4">
              “We believe with all our hearts that you didn’t stumble upon GEM Church by accident. God has divine purpose, joy, and refreshing fellowship prepared for your life.”
            </p>
            <div className="flex items-center gap-3.5 pt-3 border-t border-[#065f46]">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#fbbf24] flex-shrink-0 shadow-md">
                <img 
                  src={PASTOR_PHOTO_URL} 
                  alt="Rev. L. Navaratnam" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="text-xs font-bold text-white">{CHURCH_INFO.leadPastor}</div>
                <div className="text-[11px] text-[#fbbf24]">Founder & Senior Pastor • GEM Church Tuty</div>
              </div>
            </div>
          </div>

          {/* Location & Times Details */}
          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4 text-xs text-stone-700">
            <h4 className="font-cinzel text-base font-bold text-[#043e32]">
              Church Location & Contacts
            </h4>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#043e32] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-stone-900">Church Address</div>
                <div className="text-stone-600">7V/6B SundaravelPuram, Tuticorin – 628002</div>
                <div className="text-[11px] text-[#043e32] font-semibold mt-0.5">Tuticorin, Tamil Nadu, India</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#043e32] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-stone-900">Sunday Gatherings</div>
                <div className="text-stone-600">Morning 1st Service: 6:00 AM – 7:30 AM</div>
                <div className="text-stone-600">Morning 2nd Service: 8:00 AM – 10:00 AM</div>
                <div className="text-stone-600">Evening Service: 6:30 PM – 8:30 PM</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#043e32] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-stone-900">Office & Prayer Lines</div>
                <div className="text-stone-600 font-medium">+91 99943 01540 / +91 99946 45090</div>
                <div className="text-stone-500 text-[11px]">{CHURCH_INFO.officeHours}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#043e32] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-stone-900">General Inquiries</div>
                <div className="text-stone-600">{CHURCH_INFO.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

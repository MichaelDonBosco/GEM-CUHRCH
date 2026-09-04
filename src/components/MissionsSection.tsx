import React, { useState } from 'react';
import { Globe2, MapPin, Heart, Sparkles, Users, Calendar, ArrowRight, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MISSION_FIELDS } from '../data/mockChurchData';
import { MissionField } from '../types';

interface MissionsSectionProps {
  onSupportField?: (fieldName: string) => void;
}

export const MissionsSection: React.FC<MissionsSectionProps> = ({ onSupportField }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activeModalField, setActiveModalField] = useState<MissionField | null>(null);

  const regions = [
    { id: 'all', label: 'All Mission Fields' },
    { id: 'Nepal', label: 'Nepal' },
    { id: 'Bhutan', label: 'Bhutan' },
    { id: 'India', label: 'India Fields' },
    { id: 'Tamil Nadu', label: 'Tuticorin Sanctuary' }
  ];

  const filteredFields = selectedRegion === 'all' 
    ? MISSION_FIELDS 
    : MISSION_FIELDS.filter(f => f.country.includes(selectedRegion) || f.region.includes(selectedRegion));

  return (
    <section className="py-12 bg-stone-50 text-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#043e32]/10 border border-[#043e32]/20 text-[#043e32] text-xs font-bold uppercase tracking-wider mb-3">
            <Globe2 className="w-3.5 h-3.5 text-[#043e32]" />
            <span>Glorious Evangelical Missions (Est. 1994)</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#043e32] uppercase tracking-wide">
            Global & National Mission Fields
          </h2>
          <p className="text-stone-600 text-sm mt-2 max-w-2xl mx-auto">
            Founded by Rev. L. Navaratnam upon surrendering to full-time ministry with a deep burden for the unreached. Reaching Nepal, Bhutan, Darjeeling, Siliguri, Punjab, Andhra Pradesh, Odisha, and beyond.
          </p>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {regions.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedRegion === tab.id
                    ? 'bg-[#043e32] text-[#fbbf24] shadow-md'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mission Fields Grid with Pictures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFields.map((field) => (
            <div
              key={field.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-52 w-full overflow-hidden bg-stone-900">
                  <img
                    src={field.photoUrl}
                    alt={field.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#043e32]/90 text-[#fbbf24] border border-[#fbbf24]/40 shadow-sm backdrop-blur-sm">
                    Est. {field.establishedYear} • {field.country}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-cinzel text-lg font-bold leading-snug drop-shadow-md">
                      {field.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-200/90 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#fbbf24] flex-shrink-0" />
                      <span className="truncate">{field.region}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                    {field.overview}
                  </p>

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-2 gap-2 bg-stone-50 rounded-xl p-2.5 border border-stone-100 text-center mb-4">
                    <div>
                      <div className="text-xs text-stone-500 font-medium">Fellowships</div>
                      <div className="text-sm font-bold text-[#043e32]">{field.churchesCount} Churches</div>
                    </div>
                    <div>
                      <div className="text-xs text-stone-500 font-medium">Reached</div>
                      <div className="text-sm font-bold text-emerald-700">{field.believersReached}</div>
                    </div>
                  </div>

                  {/* Active Projects */}
                  <div className="space-y-1.5 mb-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Key Projects:</div>
                    {field.keyProjects.slice(0, 2).map((proj, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#043e32] flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{proj}</span>
                      </div>
                    ))}
                  </div>

                  {field.urgentNeed && (
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 font-medium mb-2">
                      <strong className="text-amber-800">Urgent Prayer:</strong> {field.urgentNeed}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setActiveModalField(field)}
                  className="flex-1 py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  Field Report
                </button>
                {onSupportField && (
                  <button
                    onClick={() => onSupportField(field.name)}
                    className="py-2 px-4 rounded-xl bg-[#043e32] hover:bg-[#065f46] text-[#fbbf24] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Support</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Founder's Vision Callout */}
        <div className="mt-12 bg-gradient-to-r from-[#011712] via-[#043e32] to-[#011712] rounded-2xl p-6 sm:p-8 text-white border border-[#065f46] shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#fbbf24] uppercase tracking-wider mb-2">
              The Apostolic Heart of Rev. L. Navaratnam
            </h3>
            <p className="font-scripture italic text-base sm:text-lg text-emerald-100 mb-4">
              “How shall they hear without a preacher? And how shall they preach, except they be sent?”
              <span className="block text-xs font-sans not-italic text-[#fbbf24] font-bold mt-1">— Romans 10:14-15</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Every month, GEM Church sends native missionary support, builds mountain prayer halls, provides clothing and food in winter, and cares for orphans and widows across India, Nepal, and Bhutan.
            </p>
          </div>
        </div>

        {/* Field Details Modal */}
        {activeModalField && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
              <div className="relative h-64 w-full">
                <img
                  src={activeModalField.photoUrl}
                  alt={activeModalField.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <button
                  onClick={() => setActiveModalField(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#fbbf24] text-[#043e32]">
                    {activeModalField.country}
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold mt-1">{activeModalField.name}</h3>
                  <p className="text-xs text-emerald-200">{activeModalField.leadMissionary}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h4 className="font-cinzel text-sm font-bold uppercase tracking-wider text-[#043e32]">Overview</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{activeModalField.overview}</p>
                </div>

                {activeModalField.recentReport && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      Latest Field Report ({activeModalField.recentReport.date})
                    </div>
                    <div className="font-bold text-stone-900 mt-0.5">{activeModalField.recentReport.title}</div>
                    <p className="text-stone-600 mt-1">{activeModalField.recentReport.summary}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#043e32] mb-2">
                    Prayer Needs for this Field:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {activeModalField.prayerNeeds.map((need, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#fbbf24] font-bold">•</span>
                        <span>{need}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                  <button
                    onClick={() => setActiveModalField(null)}
                    className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                  >
                    Close
                  </button>
                  {onSupportField && (
                    <button
                      onClick={() => {
                        const name = activeModalField.name;
                        setActiveModalField(null);
                        onSupportField(name);
                      }}
                      className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#043e32] text-[#fbbf24] hover:bg-[#065f46] rounded-lg cursor-pointer flex items-center gap-1.5"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>Support This Mission</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

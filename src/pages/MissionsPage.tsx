import { useState, useEffect } from 'react';
import { Globe, MapPin, ChevronRight, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { MissionReport, MissionField } from '../types';
import { storage } from '../services/storage';

export const MissionsPage = () => {
  const [reports, setReports] = useState<MissionReport[]>([]);
  const [missionFields, setMissionFields] = useState<MissionField[]>([]);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<MissionReport | null>(null);
  const [settings, setSettings] = useState(storage.getSettings());

  useEffect(() => {
    setReports(storage.getMissions());
    setMissionFields(storage.getMissionFields());
    setSettings(storage.getSettings());
  }, []);

  const getSubFieldNames = (fieldName: string): string[] => {
    const field = missionFields.find(f => f.name === fieldName);
    if (!field) return [];
    const subFields = missionFields.filter(f => f.parent_id === field._id);
    return [fieldName, ...subFields.map(sf => sf.name)];
  };

  const filteredReports = selectedField 
    ? reports.filter(r => {
        const relevantFields = getSubFieldNames(selectedField);
        return relevantFields.some(f => f.trim().toLowerCase() === r.region.trim().toLowerCase());
      })
    : reports;

  const topLevelFields = missionFields.filter(f => !f.parent_id);
  const currentFieldObj = selectedField ? missionFields.find(f => f.name === selectedField) : null;
  const subFieldsOfSelected = currentFieldObj ? missionFields.filter(f => f.parent_id === currentFieldObj._id) : [];

  return (
    <div className="pt-20">
      <section className="relative py-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={settings.missions_hero_image} 
            alt="Missions Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-church-green/90"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6 text-white">{settings.missions_hero_title}</h1>
          <p className="text-xl text-green-100 max-w-2xl">{settings.missions_hero_subtitle}</p>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-church-green mb-4 uppercase tracking-widest">Regions</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setSelectedField(null)}
                      className={`block w-full text-left px-6 py-3 rounded-xl border transition-all shadow-sm ${
                        selectedField === null ? 'bg-church-green text-white border-church-green' : 'bg-white border-slate-200 text-slate-600 hover:border-church-accent'
                      }`}
                    >
                      All Regions
                    </button>
                    {topLevelFields.map((field) => (
                      <button 
                        key={field._id} 
                        onClick={() => setSelectedField(field.name)}
                        className={`block w-full text-left px-6 py-3 rounded-xl border transition-all shadow-sm ${
                          selectedField === field.name || missionFields.find(f => f.name === selectedField)?.parent_id === field._id
                            ? 'bg-church-green text-white border-church-green' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-church-accent'
                        }`}
                      >
                        {field.name}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedField && (currentFieldObj?.parent_id || subFieldsOfSelected.length > 0) && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">Sub-Regions</h3>
                    <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                      {/* If a subfield is selected, show its parent and siblings */}
                      {(() => {
                        const parent = currentFieldObj?.parent_id 
                          ? missionFields.find(f => f._id === currentFieldObj.parent_id)
                          : currentFieldObj;
                        
                        const siblings = missionFields.filter(f => f.parent_id === parent?._id);
                        
                        return (
                          <>
                            <button 
                              onClick={() => setSelectedField(parent?.name || null)}
                              className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                                selectedField === parent?.name ? 'font-bold text-church-green' : 'text-slate-500 hover:text-church-accent'
                              }`}
                            >
                              Overview
                            </button>
                            {siblings.map(sf => (
                              <button 
                                key={sf._id}
                                onClick={() => setSelectedField(sf.name)}
                                className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                                  selectedField === sf.name ? 'font-bold text-church-green' : 'text-slate-500 hover:text-church-accent'
                                }`}
                              >
                                {sf.name}
                              </button>
                            ))}
                          </>
                        );
                      })()}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-12">
              {selectedField && missionFields.find(f => f.name === selectedField) && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-church-green rounded-[2rem] overflow-hidden shadow-2xl text-white mb-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="h-64 md:h-auto">
                      <img 
                        src={missionFields.find(f => f.name === selectedField)?.image_url} 
                        alt={selectedField}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <h2 className="text-3xl font-bold mb-4">{selectedField}</h2>
                      <p className="text-green-100 leading-relaxed">
                        {missionFields.find(f => f.name === selectedField)?.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentFieldObj?.sections && currentFieldObj.sections.filter(s => s.image_url || s.content).length > 0 && (
                <div className="space-y-12 mb-12">
                  {currentFieldObj.sections.filter(s => s.image_url || s.content).map((section, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100"
                    >
                      <div className={`grid grid-cols-1 ${section.image_url && section.content ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                        {section.image_url && (
                          <div className={`h-64 md:h-auto ${idx % 2 === 1 && section.content ? 'md:order-2' : ''}`}>
                            <img 
                              src={section.image_url} 
                              alt="" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                        {section.content && (
                          <div className={`p-8 md:p-12 flex flex-col justify-center ${idx % 2 === 1 && section.image_url ? 'md:order-1' : ''}`}>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                              {section.content}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {subFieldsOfSelected.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Sub-Regions in {selectedField}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subFieldsOfSelected.map(sf => (
                      <div 
                        key={sf._id} 
                        onClick={() => setSelectedField(sf.name)}
                        className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 cursor-pointer hover:border-church-accent transition-all group"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-lg font-bold text-church-green mb-2 group-hover:text-church-accent">{sf.name}</h4>
                            <p className="text-slate-500 text-sm line-clamp-2">{sf.description}</p>
                          </div>
                          <ChevronRight className="text-slate-300 group-hover:text-church-accent" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-800">
                  {selectedField ? `Reports from ${selectedField}` : 'All Mission Reports'}
                </h3>
                <span className="px-4 py-1 bg-slate-100 text-slate-500 rounded-full text-sm font-medium">
                  {filteredReports.length} {filteredReports.length === 1 ? 'Report' : 'Reports'}
                </span>
              </div>

              {filteredReports.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                  <Globe size={48} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-slate-500">No mission reports available for this region yet.</p>
                </div>
              ) : (
                filteredReports.map((report) => (
                  <motion.div 
                    key={report._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 cursor-pointer hover:shadow-2xl transition-shadow group"
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="h-64 md:h-auto overflow-hidden">
                        <img 
                          src={report.image_url || `https://picsum.photos/seed/${report.region}/800/600`} 
                          alt={report.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-8 md:p-12">
                        <div className="flex items-center space-x-2 text-church-accent text-xs font-bold uppercase tracking-widest mb-4">
                          <MapPin size={14} />
                          <span>{report.region}</span>
                          <span className="mx-2 text-slate-300">•</span>
                          <span>{format(new Date(report.date), 'MMMM d, yyyy')}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-church-green mb-4 group-hover:text-church-accent transition-colors">{report.title}</h3>
                        <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">{report.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex -space-x-2">
                              {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                  <img src={`https://picsum.photos/seed/person-${i}/100/100`} alt="Supporter" referrerPolicy="no-referrer" />
                                </div>
                              ))}
                            </div>
                            <span className="text-xs text-slate-400 font-medium">Supported by the community</span>
                          </div>
                          <div className="text-church-accent font-bold flex items-center space-x-1 text-sm">
                            <span>Read Full Report</span>
                            <ChevronRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Report Detail Modal */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReport(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedReport(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/20"
              >
                <X size={24} />
              </button>

              <div className="flex-grow overflow-y-auto">
                <div className="relative h-64 sm:h-96">
                  <img 
                    src={selectedReport.image_url || `https://picsum.photos/seed/${selectedReport.region}/1200/800`} 
                    alt={selectedReport.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 sm:p-12">
                    <div className="flex items-center space-x-3 text-church-accent text-sm font-bold uppercase tracking-widest mb-4">
                      <MapPin size={16} />
                      <span>{selectedReport.region}</span>
                      <span className="mx-2 text-white/30">•</span>
                      <Calendar size={16} />
                      <span>{format(new Date(selectedReport.date), 'MMMM d, yyyy')}</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold text-white">{selectedReport.title}</h2>
                  </div>
                </div>

                <div className="p-8 sm:p-12">
                  <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {selectedReport.content}
                  </div>
                  
                  <div className="mt-12 pt-12 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                            <img src={`https://picsum.photos/seed/supporter-${i}/100/100`} alt="Supporter" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-slate-500 font-medium">
                        Join <span className="text-church-green font-bold">120+ others</span> supporting this mission.
                      </p>
                    </div>
                    <button className="w-full sm:w-auto px-8 py-4 bg-church-green text-white rounded-full font-bold hover:bg-church-green/90 transition-all shadow-lg shadow-church-green/20">
                      Support This Mission
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

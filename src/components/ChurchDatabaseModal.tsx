/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  X, 
  Search, 
  Plus, 
  Download, 
  Upload, 
  Trash2, 
  Check, 
  MessageCircle, 
  Phone, 
  Calendar, 
  Heart, 
  Globe, 
  BookOpen, 
  Users, 
  RefreshCw,
  Gift
} from 'lucide-react';
import { churchDb, DbCollectionName } from '../services/db';
import { BelieverCelebration, PrayerRequest, ChurchEvent, MissionField } from '../types';
import { generateCelebrationWhatsAppMessage, createWhatsAppUrl, CHURCH_WHATSAPP_PRIMARY } from '../utils/whatsapp';

interface ChurchDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCollection?: DbCollectionName;
}

export const ChurchDatabaseModal: React.FC<ChurchDatabaseModalProps> = ({
  isOpen,
  onClose,
  defaultCollection = 'believers'
}) => {
  const [activeCollection, setActiveCollection] = useState<DbCollectionName>(defaultCollection);
  const [items, setItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New Believer Form state
  const [newBeliever, setNewBeliever] = useState({
    name: '',
    type: 'birthday' as 'birthday' | 'anniversary',
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    year: 1990,
    phone: '',
    spouseName: '',
    area: 'SundaravelPuram, Tuticorin',
    notes: ''
  });

  // Load items from churchDb
  const refreshItems = () => {
    const data = churchDb.getAll(activeCollection);
    setItems(data);
  };

  useEffect(() => {
    if (isOpen) {
      refreshItems();
    }
  }, [isOpen, activeCollection]);

  // Subscribe to reactive updates
  useEffect(() => {
    const unsubscribe = churchDb.subscribe(activeCollection, (_, data) => {
      setItems(data);
    });
    return () => unsubscribe();
  }, [activeCollection]);

  if (!isOpen) return null;

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleDelete = (id: string, name?: string) => {
    if (window.confirm(`Are you sure you want to remove ${name || 'this record'} from the database?`)) {
      churchDb.delete(activeCollection, id);
      showStatus('Record deleted successfully');
    }
  };

  const handleExport = () => {
    const jsonStr = churchDb.exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GEM_Church_Database_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showStatus('Church database exported successfully!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string;
        const result = churchDb.importBackup(text);
        if (result.success) {
          showStatus('Database successfully restored from backup!');
          refreshItems();
        } else {
          showStatus(result.message, 'error');
        }
      } catch (err: any) {
        showStatus('Failed to parse backup file', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSaveBeliever = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBeliever.name.trim() || !newBeliever.phone.trim()) {
      showStatus('Please provide believer name and phone number', 'error');
      return;
    }

    churchDb.add('believers', {
      name: newBeliever.name.trim(),
      type: newBeliever.type,
      month: Number(newBeliever.month),
      day: Number(newBeliever.day),
      year: newBeliever.year ? Number(newBeliever.year) : undefined,
      phone: newBeliever.phone.trim(),
      spouseName: newBeliever.type === 'anniversary' ? newBeliever.spouseName.trim() : undefined,
      area: newBeliever.area.trim() || 'Tuticorin',
      notes: newBeliever.notes.trim(),
      wishesCount: 0,
      isRegisteredByUser: true
    });

    setIsAddModalOpen(false);
    setNewBeliever({
      name: '',
      type: 'birthday',
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      year: 1990,
      phone: '',
      spouseName: '',
      area: 'SundaravelPuram, Tuticorin',
      notes: ''
    });
    showStatus('New Believer celebration registered in church database!');
  };

  const filteredItems = items.filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.author && item.author.toLowerCase().includes(q)) ||
      (item.phone && item.phone.includes(q)) ||
      (item.area && item.area.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-emerald-900/30 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header with Church Logo Colors */}
        <div className="bg-[#043e32] text-white px-6 py-4 flex items-center justify-between border-b border-[#065f46]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-[#fbbf24] flex items-center justify-center text-[#fbbf24]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
                  Sanctuary Church Database
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#fbbf24] text-[#043e32]">
                  LIVE REPOSITORY
                </span>
              </div>
              <p className="text-emerald-200/90 text-xs">
                Manage Believers Directory, Celebrations, Prayers, Sermons & Missions Data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-emerald-100 transition-colors cursor-pointer border border-white/15"
              title="Download full database backup"
            >
              <Download className="w-3.5 h-3.5 text-[#fbbf24]" />
              Export Backup
            </button>

            <label className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-emerald-100 transition-colors cursor-pointer border border-white/15">
              <Upload className="w-3.5 h-3.5 text-[#fbbf24]" />
              Restore
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status banner */}
        {statusMessage && (
          <div className={`px-6 py-2 text-xs font-semibold flex items-center justify-between ${
            statusMessage.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
          }`}>
            <span>{statusMessage.text}</span>
            <button onClick={() => setStatusMessage(null)}>×</button>
          </div>
        )}

        {/* Collections Tab Bar */}
        <div className="bg-[#022c22] px-6 py-2.5 flex items-center gap-2 overflow-x-auto border-b border-[#065f46]/50">
          {[
            { id: 'believers', label: 'Believers Celebrations', icon: Gift, count: churchDb.getAll('believers').length },
            { id: 'prayers', label: 'Prayer Wall', icon: Heart, count: churchDb.getAll('prayers').length },
            { id: 'events', label: 'Church Gatherings', icon: Calendar, count: churchDb.getAll('events').length },
            { id: 'sermons', label: 'Sermons Library', icon: BookOpen, count: churchDb.getAll('sermons').length },
            { id: 'missions', label: 'Mission Fields', icon: Globe, count: churchDb.getAll('missions').length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCollection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCollection(tab.id as DbCollectionName);
                  setSearchQuery('');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#fbbf24] text-[#022c22] font-semibold shadow'
                    : 'text-emerald-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? 'bg-[#022c22] text-[#fbbf24]' : 'bg-white/10 text-emerald-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Actions Bar */}
        <div className="px-6 py-3 bg-[#faf8f5] border-b border-emerald-950/10 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-emerald-800/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${activeCollection} by name, phone, keyword...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-emerald-900/20 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#043e32]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {activeCollection === 'believers' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#043e32] text-white hover:bg-[#065f46] transition-colors cursor-pointer shadow-sm border border-[#fbbf24]/50"
              >
                <Plus className="w-3.5 h-3.5 text-[#fbbf24]" />
                Add New Believer Date
              </button>
            )}

            <button
              onClick={() => {
                if (window.confirm('Reset this database collection to official default records?')) {
                  churchDb.resetToDefault();
                  refreshItems();
                  showStatus('Database reset to defaults');
                }
              }}
              className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors text-xs"
              title="Reset to default seed data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content Table / List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#faf8f5]">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-emerald-900/20">
              <Database className="w-10 h-10 text-emerald-800/30 mx-auto mb-2" />
              <p className="font-semibold text-stone-700 text-sm">No records found</p>
              <p className="text-stone-500 text-xs mt-1">Try a different search query or add a new entry.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeCollection === 'believers' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(filteredItems as BelieverCelebration[]).map((believer) => {
                    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    const dateStr = `${months[believer.month - 1]} ${believer.day}`;
                    const waMessage = generateCelebrationWhatsAppMessage({
                      memberName: believer.name,
                      type: believer.type,
                      spouseName: believer.spouseName
                    });
                    const waUrl = createWhatsAppUrl(believer.phone, waMessage);

                    return (
                      <div 
                        key={believer.id}
                        className="bg-white rounded-xl p-4 border border-emerald-950/15 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-stone-900 text-sm">
                                {believer.name}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                believer.type === 'anniversary'
                                  ? 'bg-rose-100 text-rose-700'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {believer.type}
                              </span>
                            </div>
                            {believer.spouseName && (
                              <p className="text-xs text-stone-500 mt-0.5">
                                Spouse: <span className="font-medium text-stone-700">{believer.spouseName}</span>
                              </p>
                            )}
                            <p className="text-xs text-emerald-800 font-medium mt-1 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#fbbf24]" />
                              <span>{dateStr}</span>
                              <span className="text-stone-300">•</span>
                              <span>{believer.area}</span>
                            </p>
                          </div>

                          <button
                            onClick={() => handleDelete(believer.id, believer.name)}
                            className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                            title="Delete believer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {believer.notes && (
                          <p className="text-[11px] text-stone-500 italic mb-3 bg-stone-50 p-2 rounded-lg border border-stone-100">
                            "{believer.notes}"
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-stone-100 mt-auto">
                          <div className="flex items-center gap-1 text-xs text-stone-500">
                            <Phone className="w-3 h-3 text-emerald-700" />
                            <span>{believer.phone}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <a
                              href={`tel:${believer.phone}`}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1 transition-colors"
                            >
                              <Phone className="w-3 h-3" />
                              Call
                            </a>
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 rounded-lg text-[11px] font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center gap-1.5 transition-colors shadow-sm"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeCollection === 'prayers' && (
                <div className="space-y-3">
                  {(filteredItems as PrayerRequest[]).map((prayer) => (
                    <div 
                      key={prayer.id}
                      className="bg-white rounded-xl p-4 border border-emerald-950/15 shadow-sm flex items-start justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-stone-900 text-sm">
                            {prayer.author} {prayer.isAnonymous && <span className="text-stone-400 text-xs">(Anonymous)</span>}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            {prayer.category}
                          </span>
                          <span className="text-[11px] text-stone-400">
                            {prayer.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-stone-700 leading-relaxed mb-2">
                          {prayer.content}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-stone-500">
                          <span className="flex items-center gap-1 font-semibold text-emerald-800">
                            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                            {prayer.prayersCount} believers praying
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(prayer.id, `Prayer from ${prayer.author}`)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Delete prayer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeCollection === 'events' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(filteredItems as ChurchEvent[]).map((event) => (
                    <div 
                      key={event.id}
                      className="bg-white rounded-xl p-4 border border-emerald-950/15 shadow-sm flex items-start justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-stone-900 text-sm">{event.title}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {event.category}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-900 font-semibold mb-1">
                          {event.date} • {event.time}
                        </p>
                        <p className="text-xs text-stone-500 mb-1">{event.location}</p>
                        <p className="text-xs text-stone-600 leading-relaxed">{event.description}</p>
                      </div>

                      <button
                        onClick={() => handleDelete(event.id, event.title)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeCollection === 'missions' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(filteredItems as MissionField[]).map((field) => (
                    <div 
                      key={field.id}
                      className="bg-white rounded-xl p-4 border border-emerald-950/15 shadow-sm flex items-start justify-between gap-3"
                    >
                      <img 
                        src={field.photoUrl} 
                        alt={field.name}
                        className="w-16 h-16 rounded-xl object-cover border border-emerald-900/20 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-sm">{field.name}</span>
                          <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            {field.country}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-900 font-medium">Missionary: {field.leadMissionary}</p>
                        <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">{field.overview}</p>
                        <p className="text-[11px] text-emerald-800 font-semibold mt-1">
                          Churches: {field.churchesCount} | Believers: {field.believersReached}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDelete(field.id, field.name)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 py-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Local Database Active • Changes persist across all sessions</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://api.whatsapp.com/send?phone=${CHURCH_WHATSAPP_PRIMARY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-700 font-semibold hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              WhatsApp Sanctuary Help
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>

      {/* Add Believer Submodal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-emerald-900/20">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h4 className="font-cinzel text-base font-bold text-stone-900">
                Register Believer Celebration Date
              </h4>
              <button onClick={() => setIsAddModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBeliever} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Celebration Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewBeliever({ ...newBeliever, type: 'birthday' })}
                    className={`py-2 rounded-xl border text-center font-bold transition-colors ${
                      newBeliever.type === 'birthday'
                        ? 'bg-[#043e32] text-white border-[#043e32]'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    🎂 Birthday
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewBeliever({ ...newBeliever, type: 'anniversary' })}
                    className={`py-2 rounded-xl border text-center font-bold transition-colors ${
                      newBeliever.type === 'anniversary'
                        ? 'bg-rose-700 text-white border-rose-700'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    💍 Wedding Anniversary
                  </button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Believer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Samuel"
                  value={newBeliever.name}
                  onChange={(e) => setNewBeliever({ ...newBeliever, name: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#043e32] focus:outline-none"
                />
              </div>

              {newBeliever.type === 'anniversary' && (
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Spouse Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rachel Samuel"
                    value={newBeliever.spouseName}
                    onChange={(e) => setNewBeliever({ ...newBeliever, spouseName: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#043e32] focus:outline-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Month</label>
                  <select
                    value={newBeliever.month}
                    onChange={(e) => setNewBeliever({ ...newBeliever, month: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#043e32] focus:outline-none"
                  >
                    {['January','February','March','April','May','June','July','August','September','October','November','December'].map((m, i) => (
                      <option key={i} value={i + 1}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Day</label>
                  <select
                    value={newBeliever.day}
                    onChange={(e) => setNewBeliever({ ...newBeliever, day: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#043e32] focus:outline-none"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={newBeliever.phone}
                  onChange={(e) => setNewBeliever({ ...newBeliever, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#043e32] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Area / Ward in Tuticorin</label>
                <input
                  type="text"
                  placeholder="e.g. SundaravelPuram, Tuticorin"
                  value={newBeliever.area}
                  onChange={(e) => setNewBeliever({ ...newBeliever, area: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#043e32] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 font-semibold hover:bg-stone-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#043e32] text-white font-bold hover:bg-[#065f46] transition-colors shadow-sm"
                >
                  Save to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

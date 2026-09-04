/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SermonsSection } from './components/SermonsSection';
import { LiveServiceSection } from './components/LiveServiceSection';
import { EventsSection } from './components/EventsSection';
import { PrayerWallSection } from './components/PrayerWallSection';
import { DevotionalSection } from './components/DevotionalSection';
import { MinistriesSection } from './components/MinistriesSection';
import { MissionsSection } from './components/MissionsSection';
import { CelebrationsSection } from './components/CelebrationsSection';
import { GivingSection } from './components/GivingSection';
import { ConnectSection } from './components/ConnectSection';
import { Footer } from './components/Footer';
import { LocalImportModal } from './components/LocalImportModal';
import { ChurchDatabaseModal } from './components/ChurchDatabaseModal';
import { churchDb } from './services/db';

import { 
  INITIAL_SERMONS, 
  INITIAL_EVENTS, 
  INITIAL_DEVOTIONALS, 
  MINISTRIES 
} from './data/mockChurchData';
import { PrayerRequest } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedSermonId, setSelectedSermonId] = useState<string>(INITIAL_SERMONS[0].id);
  const [prayers, setPrayers] = useState<PrayerRequest[]>(() => churchDb.getAll<PrayerRequest>('prayers'));
  const [isLocalSyncModalOpen, setIsLocalSyncModalOpen] = useState<boolean>(false);
  const [isDatabaseModalOpen, setIsDatabaseModalOpen] = useState<boolean>(false);

  // Subscribe to prayers database changes
  React.useEffect(() => {
    const unsub = churchDb.subscribe('prayers', (_, data) => {
      setPrayers(data);
    });
    return () => unsub();
  }, []);

  const handleSelectSermon = (id: string) => {
    setSelectedSermonId(id);
  };

  const handleAddPrayer = (newPrayer: PrayerRequest) => {
    churchDb.add('prayers', newPrayer);
  };

  const handleTogglePrayed = (id: string) => {
    const existing = prayers.find(p => p.id === id);
    if (!existing) return;
    const hasPrayed = !existing.hasPrayed;
    churchDb.update<PrayerRequest>('prayers', id, {
      hasPrayed,
      prayersCount: existing.prayersCount + (hasPrayed ? 1 : -1)
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-[#fbbf24] selection:text-[#043e32] font-sans antialiased">
      {/* Primary Sticky Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenLocalSync={() => setIsLocalSyncModalOpen(true)}
        onOpenDatabase={() => setIsDatabaseModalOpen(true)}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div className="space-y-12">
            <HeroSection 
              onNavigate={setActiveTab} 
              onSelectSermon={handleSelectSermon}
            />

            {/* Featured Sermons Preview */}
            <div className="border-t border-stone-200/80">
              <SermonsSection 
                sermons={INITIAL_SERMONS}
                selectedSermonId={selectedSermonId}
                onSelectSermon={handleSelectSermon}
              />
            </div>

            {/* Believer Birthday & Anniversary Daily Reminders */}
            <div className="border-t border-[#065f46]/40">
              <CelebrationsSection />
            </div>

            {/* Global & National Missions Fields */}
            <div className="border-t border-stone-200/80">
              <MissionsSection onSupportField={() => setActiveTab('giving')} />
            </div>

            {/* Upcoming Gatherings Calendar Preview */}
            <div className="border-t border-stone-200/80 bg-stone-100/50">
              <EventsSection events={INITIAL_EVENTS} />
            </div>

            {/* Prayer Wall Preview */}
            <div className="border-t border-stone-200/80">
              <PrayerWallSection 
                prayers={prayers}
                onAddPrayer={handleAddPrayer}
                onTogglePrayed={handleTogglePrayed}
              />
            </div>

            {/* Daily Word Devotional */}
            <div className="border-t border-stone-200/80 bg-stone-100/50">
              <DevotionalSection devotionals={INITIAL_DEVOTIONALS} />
            </div>

            {/* Ministries Showcase */}
            <div className="border-t border-stone-200/80">
              <MinistriesSection ministries={MINISTRIES} />
            </div>

            {/* Giving Section */}
            <div className="border-t border-stone-200/80 bg-stone-100/50">
              <GivingSection />
            </div>

            {/* Connect Section */}
            <div className="border-t border-stone-200/80">
              <ConnectSection />
            </div>
          </div>
        )}

        {activeTab === 'sermons' && (
          <SermonsSection 
            sermons={INITIAL_SERMONS}
            selectedSermonId={selectedSermonId}
            onSelectSermon={handleSelectSermon}
          />
        )}

        {activeTab === 'live' && (
          <LiveServiceSection onNavigate={setActiveTab} />
        )}

        {activeTab === 'missions' && (
          <MissionsSection onSupportField={() => setActiveTab('giving')} />
        )}

        {activeTab === 'celebrations' && (
          <CelebrationsSection />
        )}

        {activeTab === 'events' && (
          <EventsSection events={INITIAL_EVENTS} />
        )}

        {activeTab === 'prayer' && (
          <PrayerWallSection 
            prayers={prayers}
            onAddPrayer={handleAddPrayer}
            onTogglePrayed={handleTogglePrayed}
          />
        )}

        {activeTab === 'devotional' && (
          <DevotionalSection devotionals={INITIAL_DEVOTIONALS} />
        )}

        {activeTab === 'ministries' && (
          <MinistriesSection ministries={MINISTRIES} />
        )}

        {activeTab === 'giving' && (
          <GivingSection />
        )}

        {activeTab === 'connect' && (
          <ConnectSection />
        )}
      </main>

      {/* Global Footer */}
      <Footer 
        onNavigate={setActiveTab} 
        onOpenLocalSync={() => setIsLocalSyncModalOpen(true)}
        onOpenDatabase={() => setIsDatabaseModalOpen(true)}
      />

      {/* Church Local Database & Directory Modal */}
      <ChurchDatabaseModal
        isOpen={isDatabaseModalOpen}
        onClose={() => setIsDatabaseModalOpen(false)}
      />

      {/* Local Project Sync & File Import Modal */}
      <LocalImportModal 
        isOpen={isLocalSyncModalOpen} 
        onClose={() => setIsLocalSyncModalOpen(false)} 
      />
    </div>
  );
}

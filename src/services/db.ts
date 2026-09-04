/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BelieverCelebration, PrayerRequest, Sermon, ChurchEvent, MissionField } from '../types';
import { 
  INITIAL_SERMONS, 
  INITIAL_EVENTS, 
  INITIAL_PRAYERS, 
  INITIAL_CELEBRATIONS, 
  MISSION_FIELDS 
} from '../data/mockChurchData';

export interface GivingRecord {
  id: string;
  donorName: string;
  donorPhone?: string;
  amount: number;
  fundId: string;
  fundTitle: string;
  date: string;
  paymentMethod: string;
  referenceId?: string;
  notes?: string;
}

export type DbCollectionName = 
  | 'believers' 
  | 'prayers' 
  | 'sermons' 
  | 'events' 
  | 'missions' 
  | 'giving_records';

const DB_STORAGE_PREFIX = 'gem_church_db_';
const DB_VERSION_KEY = 'gem_church_db_initialized_v2';

type ListenerCallback = (collection: DbCollectionName, data: any[]) => void;

class ChurchDatabase {
  private listeners: Map<DbCollectionName, Set<ListenerCallback>> = new Map();

  constructor() {
    this.initializeDefaultsIfNeeded();
  }

  private getKey(collection: DbCollectionName): string {
    return `${DB_STORAGE_PREFIX}${collection}`;
  }

  /**
   * Initialize local database with starter records if empty
   */
  public initializeDefaultsIfNeeded(): void {
    try {
      const isInitialized = localStorage.getItem(DB_VERSION_KEY);
      if (!isInitialized) {
        if (!localStorage.getItem(this.getKey('believers'))) {
          localStorage.setItem(this.getKey('believers'), JSON.stringify(INITIAL_CELEBRATIONS));
        }
        if (!localStorage.getItem(this.getKey('prayers'))) {
          localStorage.setItem(this.getKey('prayers'), JSON.stringify(INITIAL_PRAYERS));
        }
        if (!localStorage.getItem(this.getKey('sermons'))) {
          localStorage.setItem(this.getKey('sermons'), JSON.stringify(INITIAL_SERMONS));
        }
        if (!localStorage.getItem(this.getKey('events'))) {
          localStorage.setItem(this.getKey('events'), JSON.stringify(INITIAL_EVENTS));
        }
        if (!localStorage.getItem(this.getKey('missions'))) {
          localStorage.setItem(this.getKey('missions'), JSON.stringify(MISSION_FIELDS));
        }
        if (!localStorage.getItem(this.getKey('giving_records'))) {
          localStorage.setItem(this.getKey('giving_records'), JSON.stringify([]));
        }
        localStorage.setItem(DB_VERSION_KEY, 'true');
      }
    } catch (e) {
      console.warn('Storage initialization fallback', e);
    }
  }

  /**
   * Retrieve all items from a collection
   */
  public getAll<T = any>(collection: DbCollectionName): T[] {
    try {
      const raw = localStorage.getItem(this.getKey(collection));
      if (!raw) {
        // Fallback to initial seeds
        switch (collection) {
          case 'believers': return INITIAL_CELEBRATIONS as unknown as T[];
          case 'prayers': return INITIAL_PRAYERS as unknown as T[];
          case 'sermons': return INITIAL_SERMONS as unknown as T[];
          case 'events': return INITIAL_EVENTS as unknown as T[];
          case 'missions': return MISSION_FIELDS as unknown as T[];
          default: return [];
        }
      }
      return JSON.parse(raw) as T[];
    } catch (err) {
      console.error(`Error reading ${collection} from database:`, err);
      return [];
    }
  }

  /**
   * Save entire collection
   */
  private setAll<T = any>(collection: DbCollectionName, items: T[]): void {
    try {
      localStorage.setItem(this.getKey(collection), JSON.stringify(items));
      this.notifyListeners(collection, items);
    } catch (err) {
      console.error(`Error saving ${collection} to database:`, err);
    }
  }

  /**
   * Add a new item to a collection
   */
  public add<T extends Record<string, any>>(collection: DbCollectionName, item: T): T {
    const items = this.getAll<T>(collection);
    const newItem = {
      ...item,
      id: item.id || `gem_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newItem, ...items];
    this.setAll(collection, updated);
    return newItem as unknown as T;
  }

  /**
   * Update an existing item
   */
  public update<T extends Record<string, any>>(collection: DbCollectionName, id: string, updates: Partial<T>): T | null {
    const items = this.getAll<T>(collection);
    let updatedItem: T | null = null;
    const updated = items.map(item => {
      if (item.id === id) {
        updatedItem = { ...item, ...updates };
        return updatedItem;
      }
      return item;
    });

    if (updatedItem) {
      this.setAll(collection, updated);
    }
    return updatedItem;
  }

  /**
   * Delete an item
   */
  public delete(collection: DbCollectionName, id: string): boolean {
    const items = this.getAll<{ id: string }>(collection);
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length !== items.length) {
      this.setAll(collection, filtered);
      return true;
    }
    return false;
  }

  /**
   * Increment counter on an item (e.g. prayer count, celebration wishes count)
   */
  public incrementCounter(collection: DbCollectionName, id: string, field: string, by: number = 1): void {
    const items = this.getAll<any>(collection);
    const updated = items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [field]: (Number(item[field]) || 0) + by
        };
      }
      return item;
    });
    this.setAll(collection, updated);
  }

  /**
   * Subscribe to collection updates
   */
  public subscribe(collection: DbCollectionName, callback: ListenerCallback): () => void {
    if (!this.listeners.has(collection)) {
      this.listeners.set(collection, new Set());
    }
    this.listeners.get(collection)!.add(callback);

    // Return unbind function
    return () => {
      this.listeners.get(collection)?.delete(callback);
    };
  }

  private notifyListeners(collection: DbCollectionName, data: any[]): void {
    const subs = this.listeners.get(collection);
    if (subs) {
      subs.forEach(cb => {
        try {
          cb(collection, data);
        } catch (e) {
          console.error(e);
        }
      });
    }
  }

  /**
   * Export all database records as JSON string
   */
  public exportBackup(): string {
    const backup: Record<string, any> = {
      exportedAt: new Date().toISOString(),
      church: 'Glorious Evangelical Ministries (GEM Church Tuticorin)',
      version: '2.0',
      collections: {
        believers: this.getAll('believers'),
        prayers: this.getAll('prayers'),
        sermons: this.getAll('sermons'),
        events: this.getAll('events'),
        missions: this.getAll('missions'),
        giving_records: this.getAll('giving_records'),
      }
    };
    return JSON.stringify(backup, null, 2);
  }

  /**
   * Import database backup
   */
  public importBackup(jsonString: string): { success: boolean; message: string; counts?: Record<string, number> } {
    try {
      const data = JSON.parse(jsonString);
      const cols = data.collections || data;
      const counts: Record<string, number> = {};

      if (Array.isArray(cols.believers)) {
        this.setAll('believers', cols.believers);
        counts.believers = cols.believers.length;
      }
      if (Array.isArray(cols.prayers)) {
        this.setAll('prayers', cols.prayers);
        counts.prayers = cols.prayers.length;
      }
      if (Array.isArray(cols.sermons)) {
        this.setAll('sermons', cols.sermons);
        counts.sermons = cols.sermons.length;
      }
      if (Array.isArray(cols.events)) {
        this.setAll('events', cols.events);
        counts.events = cols.events.length;
      }
      if (Array.isArray(cols.missions)) {
        this.setAll('missions', cols.missions);
        counts.missions = cols.missions.length;
      }
      if (Array.isArray(cols.giving_records)) {
        this.setAll('giving_records', cols.giving_records);
        counts.giving_records = cols.giving_records.length;
      }

      return {
        success: true,
        message: 'Church database restored successfully!',
        counts
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || 'Invalid JSON format'
      };
    }
  }

  /**
   * Reset database back to default seed data
   */
  public resetToDefault(): void {
    localStorage.removeItem(DB_VERSION_KEY);
    this.setAll('believers', INITIAL_CELEBRATIONS);
    this.setAll('prayers', INITIAL_PRAYERS);
    this.setAll('sermons', INITIAL_SERMONS);
    this.setAll('events', INITIAL_EVENTS);
    this.setAll('missions', MISSION_FIELDS);
    this.setAll('giving_records', []);
    localStorage.setItem(DB_VERSION_KEY, 'true');
  }
}

export const churchDb = new ChurchDatabase();

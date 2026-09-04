export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  date: string;
  series: string;
  duration: string;
  scripture: string;
  description: string;
  thumbnailUrl: string;
  videoEmbedId?: string;
  audioDuration?: string;
  keyPoints: string[];
  notesTemplate?: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  category: 'Worship' | 'Youth' | 'Prayer' | 'Community' | 'Bible Study';
  date: string;
  time: string;
  location: string;
  description: string;
  lead: string;
  rsvpCount: number;
  featured?: boolean;
}

export interface PrayerRequest {
  id: string;
  author: string;
  isAnonymous: boolean;
  category: 'Healing' | 'Family' | 'Faith & Guidance' | 'Financial & Provision' | 'Thanksgiving';
  content: string;
  timestamp: string;
  prayersCount: number;
  hasPrayed?: boolean;
  isAnswered?: boolean;
  answeredTestimony?: string;
}

export interface Ministry {
  id: string;
  name: string;
  category: string;
  tagline: string;
  leader: string;
  meetingTime: string;
  location: string;
  description: string;
  keyHighlights: string[];
  contactEmail: string;
}

export interface Devotional {
  id: string;
  title: string;
  scriptureReference: string;
  scriptureVerse: string;
  reflection: string;
  prayer: string;
  date: string;
  author: string;
  theme: string;
}

export interface GivingFund {
  id: string;
  title: string;
  description: string;
  targetGoal?: number;
  raisedAmount?: number;
  isPopular?: boolean;
}

export interface ConnectCardSubmission {
  fullName: string;
  email: string;
  phone: string;
  attendeeType: 'first_time' | 'regular' | 'seeking_home';
  preferredContact: 'email' | 'phone' | 'text';
  interests: string[];
  prayerNeed?: string;
}

export interface MissionField {
  id: string;
  name: string;
  region: string;
  country: string;
  photoUrl: string;
  leadMissionary: string;
  establishedYear: string;
  tagline: string;
  overview: string;
  churchesCount: number;
  believersReached: string;
  keyProjects: string[];
  prayerNeeds: string[];
  urgentNeed?: string;
  recentReport?: {
    date: string;
    title: string;
    summary: string;
  };
}

export interface BelieverCelebration {
  id: string;
  name: string;
  type: 'birthday' | 'anniversary';
  month: number; // 1 - 12
  day: number; // 1 - 31
  year?: number; // birth year or marriage year
  phone: string; // for WhatsApp wishes & call
  area: string; // e.g. SundaravelPuram, Tuticorin
  spouseName?: string; // if anniversary
  notes?: string;
  wishesCount: number;
  photoUrl?: string;
  isRegisteredByUser?: boolean;
}

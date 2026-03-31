import { Member, Event, MissionReport, Announcement, Finance, Leader, MissionField, SiteSettings } from '../types';

const STORAGE_KEYS = {
  MEMBERS: 'gem_members',
  EVENTS: 'gem_events',
  MISSIONS: 'gem_missions',
  FINANCES: 'gem_finances',
  ANNOUNCEMENTS: 'gem_announcements',
  LEADERS: 'gem_leaders',
  MISSION_FIELDS: 'gem_mission_fields',
  AUTH: 'gem_auth',
  SETTINGS: 'gem_settings'
};

const DEFAULT_SETTINGS: SiteSettings = {
  // Home Page
  home_hero_title: 'Walking in Love, Holiness, and Service.',
  home_hero_subtitle: 'A Pentecostal community committed to the truth of God\'s word and caring for those in need.',
  home_hero_image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1920&q=80',
  home_gospel_quote: 'GOSPEL is about GOD’S LOVE for us expressed through JESUS.',
  home_gospel_verse: '“Pure and undefiled religion before God the Father is this: to care for orphans and widows in their distress, and to keep oneself unstained by the world.” — James 1:27',
  tamil_section_image: 'https://picsum.photos/seed/tamil-service/800/600',
  tamil_section_title: 'கிறிஸ்துவுக்குள் மிகவும் பிரியமானவர்களே!',
  tamil_section_content: 'ஆண்டவரும் இரட்சகருமான இயேசு கிறிஸ்துவின் நாமத்தில் அன்பின் வாழ்த்துக்கள்!\n\nநேரலையில் கலந்துகொள்ளும் அனைவரும் பயபக்தியுடன் ஆராதனையில் கலந்து கொண்டு தேவ ஆசீர்வாதம் பெற்றுக்கொள்ளுங்கள்.',
  live_service_url: '#',
  
  // About Page
  about_hero_image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1920&q=80',
  about_story_title: 'Our Story',
  about_story_content: 'Glorious Evangelical Ministries (GEM) is a Pentecostal community dedicated to spreading the message of love, holiness, and service. Founded with a vision to reach the unreached, we have grown into a vibrant family of believers committed to making a difference in the world.',
  about_vision_content: 'To see communities transformed by the power of the Gospel and the love of Christ, where every individual experiences spiritual growth and social dignity.',
  about_mission_content: 'To preach the Gospel of Jesus Christ, plant churches in unreached areas, and provide holistic care to the marginalized, especially orphans and widows.',
  
  // Missions Page
  missions_hero_title: 'Our Mission Fields',
  missions_hero_subtitle: 'Spreading the gospel and serving communities across India and beyond.',
  
  // Leadership Page
  leadership_hero_title: 'Our Leadership',
  leadership_hero_subtitle: 'Meet the dedicated team leading our ministry with faith and vision.',
  
  // Donate Page
  donate_title: 'Support Our Mission',
  donate_content: 'Your generosity enables us to reach more communities, support more orphans, and spread the message of hope. Every contribution, no matter the size, makes a significant impact.',
  bank_account_name: 'Glorious Evangelical Ministries',
  bank_account_number: '1234567890',
  bank_ifsc: 'ABCD0123456',
  bank_branch: 'Main Branch, Chennai'
};

const get = <T>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

const set = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const storage = {
  getMembers: () => get<Member[]>(STORAGE_KEYS.MEMBERS, []),
  saveMember: (member: Omit<Member, '_id'> & { _id?: string }) => {
    const members = storage.getMembers();
    if (member._id) {
      const index = members.findIndex(m => m._id === member._id);
      if (index !== -1) {
        members[index] = member as Member;
        set(STORAGE_KEYS.MEMBERS, members);
        return members[index];
      }
    }
    const newMember = { ...member, _id: crypto.randomUUID() } as Member;
    set(STORAGE_KEYS.MEMBERS, [...members, newMember]);
    return newMember;
  },
  deleteMember: (id: string) => {
    const members = storage.getMembers().filter(m => m._id !== id);
    set(STORAGE_KEYS.MEMBERS, members);
  },

  getEvents: () => get<Event[]>(STORAGE_KEYS.EVENTS, []),
  saveEvent: (event: Omit<Event, '_id'> & { _id?: string }) => {
    const events = storage.getEvents();
    if (event._id) {
      const index = events.findIndex(e => e._id === event._id);
      if (index !== -1) {
        events[index] = event as Event;
        set(STORAGE_KEYS.EVENTS, events);
        return events[index];
      }
    }
    const newEvent = { ...event, _id: crypto.randomUUID() } as Event;
    set(STORAGE_KEYS.EVENTS, [...events, newEvent]);
    return newEvent;
  },
  deleteEvent: (id: string) => {
    const events = storage.getEvents().filter(e => e._id !== id);
    set(STORAGE_KEYS.EVENTS, events);
  },

  getMissions: () => get<MissionReport[]>(STORAGE_KEYS.MISSIONS, []),
  saveMission: (mission: Omit<MissionReport, '_id'> & { _id?: string }) => {
    const missions = storage.getMissions();
    if (mission._id) {
      const index = missions.findIndex(m => m._id === mission._id);
      if (index !== -1) {
        missions[index] = mission as MissionReport;
        set(STORAGE_KEYS.MISSIONS, missions);
        return missions[index];
      }
    }
    const newMission = { ...mission, _id: crypto.randomUUID() } as MissionReport;
    set(STORAGE_KEYS.MISSIONS, [...missions, newMission]);
    return newMission;
  },
  deleteMission: (id: string) => {
    const missions = storage.getMissions().filter(m => m._id !== id);
    set(STORAGE_KEYS.MISSIONS, missions);
  },

  getFinances: () => get<Finance[]>(STORAGE_KEYS.FINANCES, []),
  saveFinance: (finance: Omit<Finance, '_id'> & { _id?: string }) => {
    const finances = storage.getFinances();
    if (finance._id) {
      const index = finances.findIndex(f => f._id === finance._id);
      if (index !== -1) {
        finances[index] = finance as Finance;
        set(STORAGE_KEYS.FINANCES, finances);
        return finances[index];
      }
    }
    const newFinance = { ...finance, _id: crypto.randomUUID() } as Finance;
    set(STORAGE_KEYS.FINANCES, [...finances, newFinance]);
    return newFinance;
  },
  deleteFinance: (id: string) => {
    const finances = storage.getFinances().filter(f => f._id !== id);
    set(STORAGE_KEYS.FINANCES, finances);
  },

  getAnnouncements: () => get<Announcement[]>(STORAGE_KEYS.ANNOUNCEMENTS, []),
  saveAnnouncement: (announcement: Omit<Announcement, '_id'> & { _id?: string }) => {
    const announcements = storage.getAnnouncements();
    if (announcement._id) {
      const index = announcements.findIndex(a => a._id === announcement._id);
      if (index !== -1) {
        announcements[index] = announcement as Announcement;
        set(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
        return announcements[index];
      }
    }
    const newAnnouncement = { ...announcement, _id: crypto.randomUUID() } as Announcement;
    set(STORAGE_KEYS.ANNOUNCEMENTS, [...announcements, newAnnouncement]);
    return newAnnouncement;
  },
  deleteAnnouncement: (id: string) => {
    const announcements = storage.getAnnouncements().filter(a => a._id !== id);
    set(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
  },

  getLeaders: () => get<Leader[]>(STORAGE_KEYS.LEADERS, []),
  saveLeader: (leader: Omit<Leader, '_id'> & { _id?: string }) => {
    const leaders = storage.getLeaders();
    if (leader._id) {
      const index = leaders.findIndex(l => l._id === leader._id);
      if (index !== -1) {
        leaders[index] = leader as Leader;
        set(STORAGE_KEYS.LEADERS, leaders);
        return leaders[index];
      }
    }
    const newLeader = { ...leader, _id: crypto.randomUUID() } as Leader;
    set(STORAGE_KEYS.LEADERS, [...leaders, newLeader]);
    return newLeader;
  },
  deleteLeader: (id: string) => {
    const leaders = storage.getLeaders().filter(l => l._id !== id);
    set(STORAGE_KEYS.LEADERS, leaders);
  },

  getMissionFields: () => get<MissionField[]>(STORAGE_KEYS.MISSION_FIELDS, []),
  saveMissionField: (field: Omit<MissionField, '_id'> & { _id?: string }) => {
    const fields = storage.getMissionFields();
    if (field._id) {
      const index = fields.findIndex(f => f._id === field._id);
      if (index !== -1) {
        fields[index] = field as MissionField;
        set(STORAGE_KEYS.MISSION_FIELDS, fields);
        return fields[index];
      }
    }
    const newField = { ...field, _id: crypto.randomUUID() } as MissionField;
    set(STORAGE_KEYS.MISSION_FIELDS, [...fields, newField]);
    return newField;
  },
  deleteMissionField: (id: string) => {
    const fields = storage.getMissionFields().filter(f => f._id !== id);
    set(STORAGE_KEYS.MISSION_FIELDS, fields);
  },

  getGreetings: () => {
    const members = storage.getMembers();
    const today = new Date();
    const todayStr = `${today.getMonth() + 1}-${today.getDate()}`;
    
    return {
      birthdays: members.filter(m => {
        if (!m.birthday) return false;
        const d = new Date(m.birthday);
        return `${d.getMonth() + 1}-${d.getDate()}` === todayStr;
      }),
      anniversaries: members.filter(m => {
        if (!m.anniversary) return false;
        const d = new Date(m.anniversary);
        return `${d.getMonth() + 1}-${d.getDate()}` === todayStr;
      })
    };
  },
  
  getSettings: () => get<SiteSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS),
  saveSettings: (settings: SiteSettings) => set(STORAGE_KEYS.SETTINGS, settings)
};

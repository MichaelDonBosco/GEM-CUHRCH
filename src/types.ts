export interface Member {
  _id: string;
  name: string;
  phone: string;
  birthday: string;
  address?: string;
  anniversary?: string;
  role?: string;
}

export interface Event {
  _id: string;
  title: string;
  event_date: string;
  location: string;
  image_url?: string;
  description?: string;
}

export interface MissionReport {
  _id: string;
  region: string;
  title: string;
  content: string;
  date: string;
  image_url?: string;
}

export interface Announcement {
  _id: string;
  content: string;
  date: string;
}

export interface Finance {
  _id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description?: string;
}

export interface Leader {
  _id: string;
  name: string;
  role: string;
  image_url: string;
  order: number;
}

export interface MissionField {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  parent_id?: string;
  sections?: {
    image_url: string;
    content: string;
  }[];
}

export interface SiteSettings {
  // Home Page
  home_hero_title: string;
  home_hero_subtitle: string;
  home_hero_image: string;
  home_gospel_quote: string;
  home_gospel_verse: string;
  tamil_section_image: string;
  tamil_section_title: string;
  tamil_section_content: string;
  live_service_url: string;
  
  // About Page
  about_hero_image: string;
  about_story_title: string;
  about_story_content: string;
  about_vision_content: string;
  about_mission_content: string;
  
  // Missions Page
  missions_hero_title: string;
  missions_hero_subtitle: string;
  
  // Leadership Page
  leadership_hero_title: string;
  leadership_hero_subtitle: string;
  
  // Donate Page
  donate_title: string;
  donate_content: string;
  bank_account_name: string;
  bank_account_number: string;
  bank_ifsc: string;
  bank_branch: string;
}
